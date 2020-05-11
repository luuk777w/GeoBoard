class HomePage extends Page {

    private element: BoardElement;

    private sidebar: Sidebar;

    private boardHub: BoardHub;

    constructor() {
        super();

        this.element = new BoardElement();
        this.sidebar = new Sidebar();

        this.boardHub = BoardHub.getInstance();

        this.template.setLayout("base_layout");

        // Load the board information from the server if available.
        const boardLoaded = new Promise(async (resolve) => {
            if (localStorage.getItem('board')) {
                // Get the board ID from the localstorage if available
                const boardId = localStorage.getItem('board');

                // Attemp to fetch the board info.
                await this.XHR.getWithAuthorization(`/boards/${boardId}`).then((response) => {
                    this.template.loadhtml("home", { currentBoard: response.name });
                    this.template.setPageTitle(response.name);
                })
                .catch((error) => {
                    console.warn(error);
                    this.template.loadhtml("home");
                });
            }
            else
            {
                // Load the home HTML without setting the board name.
                this.template.loadhtml("home");
            }

            // Resolve the promise.
            resolve();
        });

        // When the board fetch is finished.
        boardLoaded.then(() => {
            this.loadTheme();
            this.sidebar.loadSidebar();

            // TODO: Call autosize when the 'new element' panel is shown
            // TODO: Dit is lelijk hier in de constructor. Moet verplaatst worden.

            $('textarea').each(function () {
                this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
            }).on('input', function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });

            Helpers.registerOnClick("logout", () => this.logout());
            Helpers.registerOnClick("theme", () => this.toggleTheme());

            this.loadBoardElements();

            this.boardHub.getConnection().on('SwitchedBoard', (response: BoardViewModel) => {
                this.template.setPageTitle(response.name);
                $('.board-info-name').text(response.name);
            });
        });
    }

    public toggleTheme() {
        let currentTheme = localStorage.getItem('theme') ?? 'light';

        if (currentTheme == 'light')
            currentTheme = 'dark';
        else
            currentTheme = 'light';

        localStorage.setItem('theme', currentTheme);

        this.loadTheme();
    }

    public loadTheme() {
        const currentTheme = localStorage.getItem('theme') ?? 'light';
        const view = $('.home-view');

        if (currentTheme == 'dark') {
            view.addClass('dark-theme');
            $('.logo-dark').hide();
            $('.logo-light').show();

            $('[data-target="theme"]').html(`<i class="far fa-sun fa-lg fa-fw"></i>`);
        }
        else {
            view.removeClass('dark-theme');
            $('.logo-light').hide();
            $('.logo-dark').show();
            $('[data-target="theme"]').html(`<i class="fas fa-moon fa-lg fa-fw"></i>`);
        }
    }

    public loadBoardElements() {
        let boardId = '14ce2a15-1374-4fd9-aae2-08d7f1085836';

        this.XHR.getWithAuthorization(`/boards/${boardId}/elements`).then(data => {

            // console.log(data);
            $.each(data, (index: number, data) => {

                let element: BoardElementViewModel = {
                    id: data.id,
                    number: index + 1,
                    boardId: data.boardId,
                    user: data.user,
                    userId: data.userId,
                    imagePath: data.imagePath,
                    note: data.note,
                    direction: data.direction,
                    createdAt: data.createdAt
                };

                this.element.newElement(element);
            })

        }, error => {
            console.warn(error);
        });
    }

    public logout() {
        this.JWT.clear();

        this.router.redirect("/login");
    }
}

