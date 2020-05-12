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
        this.loadTheme();

        // Register the click events.
        Helpers.registerOnClick("logout", () => this.logout());
        Helpers.registerOnClick("theme", () => this.toggleTheme());

        // Load the board information from the server if available.
        this.board.loadBoard().then((board: BoardViewModel) => {
            this.template.loadHtml("home", { currentBoard: board.name });
            this.template.setPageTitle(board.name);

            this.board.show(board.id);

            // Board selected; return true for usage later in this chain.
            return true;
        })
        .catch((error) => {
            // Load the home page without setting the board info.
            this.template.loadHtml("home");

            // Show the "Select a board instruction" by setting the board to null.
            this.board.show(null);

            // No baord selected; return false for usage later in this chain.
            return false;
        })
        .then(async (boardSelected: boolean) => {
            // Load the sidebar when everything is finished.
            // The sidebar must wait on the loadHTML to finish.
            await this.sidebar.loadSidebar();

            // Toggle the sidebar when there is no board selected.
            if (! boardSelected) {
                this.sidebar.toggle();
            }
        });

        // Listen to the on SwitchedBoard event.
        this.boardHub.getConnection().on('SwitchedBoard', (response: BoardViewModel) => {
            this.template.setPageTitle(response.name);
            $('.board-info-name').text(response.name);

            this.board.show(response.id);
        });

        // TODO: Call autosize when the 'new element' panel is shown
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

