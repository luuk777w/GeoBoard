class HomePage extends Page {

    private element: BoardElement;

    private sidebar: Sidebar;

    constructor() {
        super();

        this.element = new BoardElement();
        this.sidebar = new Sidebar();

        this.template.setLayout("base_layout");
        this.template.loadhtml("home");
        this.template.setPageTitle("{boardname}");

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
        Helpers.registerOnClick("createBoard", () => this.createBoard());

        this.loadBoardElements();
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

    public createBoard() {
        let boardName = prompt('What is the name of this new board?');

        if (boardName.trim() != "") {
            console.info(`Nieuwe board: ${boardName}`);

            let data = {
                name: boardName
            };

            this.XHR.postWithAuthorization(`/boards`, JSON.stringify(data)).then(result => {

                alert("Board created");

            }, error => {
                console.warn(error);
            });
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
                    // user: data.user.username,
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

