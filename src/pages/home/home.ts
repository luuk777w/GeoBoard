class HomePage extends Page {

    private sidebar: Sidebar;
    private board: Board;

    private boardHub: BoardHub;

    constructor() {
        super();

        this.sidebar = new Sidebar();
        this.board = new Board();

        this.boardHub = BoardHub.getInstance();

        this.template.setLayout("base_layout");

        // Load the board information from the server if available.
        this.board.loadBoard().then((board: BoardViewModel) => {
            this.template.loadhtml("home", { currentBoard: board.name });
            this.template.setPageTitle(board.name);

            let out = (window as any).Handlebars.compile((window as any).Templates["board"]());
            $("#board-container").html(out());

            this.board.loadElements(board.id);
        })
        .catch((error) => {
            // Load the home page without setting the board info.
            this.template.loadhtml("home");
        });

        this.loadTheme();
        this.sidebar.loadSidebar();

        Helpers.registerOnClick("logout", () => this.logout());
        Helpers.registerOnClick("theme", () => this.toggleTheme());

        this.boardHub.getConnection().on('SwitchedBoard', (response: BoardViewModel) => {
            this.template.setPageTitle(response.name);
            $('.board-info-name').text(response.name);

            let out = (window as any).Handlebars.compile((window as any).Templates["board"]());
            $("#board-container").html(out());

            this.board.loadElements(response.id);
        });

        // TODO: Call autosize when the 'new element' panel is shown
        // TODO: Dit is lelijk hier in de constructor. Moet verplaatst worden.
        $('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
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

    public logout() {
        this.JWT.clear();

        this.router.redirect("/login");
    }
}

