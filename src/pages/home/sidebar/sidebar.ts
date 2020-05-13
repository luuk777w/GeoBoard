class Sidebar {

    private XHR: XHR;
    private boardHub: BoardHub;

    private alert: Alert;

    constructor() {
        this.XHR = XHR.getInstance();
        this.boardHub = BoardHub.getInstance();

        this.alert = new Alert('.side-nav-body');

        Helpers.registerOnClick("sidebar", () => this.toggle());
        Helpers.registerOnClick("closeSidebar", () => this.close());

        Helpers.registerOnClick("createBoard", () => this.createBoard());

        // TODO: Dit moet een route worden. Heeft ook als voordeel dat je een bord direct kunt benaderen.
        Helpers.registerOnClick("board", (event: any) => this.goToBoard(event.target));

        // TODO: Moet verplaatst worden naar een betere plek (als dat nog van toepassing is).
        this.boardHub.getConnection().on('boardCreated', (response: any) => {
            console.log('From hub: ', response);
        });
    }

    /**
     * Load the data needed for the sidebar and compile / show the sidebar HTML after.
     */
    public async loadSidebar() {
        let data = {
            selectedBoard: localStorage.getItem('board'),
            myBoards: await this.loadMyBoards(),
            activeBoards: [] as string[],
            snapshots: [] as string[]
        }

        let out = (window as any).Handlebars.compile((window as any).Templates["sidebar"](data));
        $("#sidebar").html(out());
    }

    /**
     * Load the boards owned by the current user.
     */
    private async loadMyBoards(): Promise<Array<BoardViewModel>> {
        let boards: Array<BoardViewModel> = [];

        await this.XHR.getWithAuthorization(`/boards`).then((data) => {

            $.each(data, (index: number, data) => {
                boards.push({
                    id: data.id,
                    name: data.name,
                    userId: data.userId,
                    createdAt: data.createdAt,
                    isLocked: data.isLocked,
                    elements: [],
                });
            });

        }, error => {
            console.warn(error);
        });

        return boards;
    }

    /**
     * Go to the clicked board.
     *
     * @param target The clicked board item.
     */
    public goToBoard(target: any) {
        // The board item in the sidebar.
        const clickedBoardItem = $(target);

        // The curent board the user is viewing (if any).
        const currentBoard = localStorage.getItem('board');

        // The board-id of the clicked board.
        const requstedBoard = clickedBoardItem.data('board-id')

        // Prevent null or duplicate switch to board.
        if (requstedBoard == null || requstedBoard == currentBoard)
            return;

        // Attemp to switch to the clicked board.
        this.boardHub.getConnection().invoke("SwitchBoard", currentBoard, requstedBoard)
            .then((response: BoardViewModel) => {
                console.log(response);

                if (response == null)
                    return;

                // Store the new board id.
                localStorage.setItem('board', response.id);

                // Toggle the previous and active board.
                $('.board-list-item.active').removeClass('active');
                $(clickedBoardItem).addClass('active');

                this.alert.hide(true);

            }).catch((error: any) => {
                console.warn('Something went wrong while switching to the requested board', error);

                this.alert.show(AlertType.Error, "Something went wrong. Please try again.", true);
            });

        // When a board is not found or the user is not allowed to access the board...
        this.boardHub.getConnection().on('BoardNotFound', (response: any) => {
            console.warn('BoardNotFound', response);

            this.alert.show(AlertType.Error, "Board not found.", true);
        });
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

    /**
     * Toggle the visibility of the sidebar.
     */
    public toggle() {
        const sidebar = $("#sidebar .side-nav");

        if (!sidebar.is(':visible')) {
            sidebar.show();
            sidebar.removeClass("slideOutRight");
            sidebar.addClass("slideInRight");
        }
        else {
            this.close();
        }
    }

    /**
     * Close the sidebar (if open).
     */
    public close() {
        const sidebar = $("#sidebar .side-nav");

        if (sidebar.is(':visible')) {
            sidebar.removeClass("slideInRight");
            sidebar.addClass("slideOutRight");

            setTimeout(function () {
                $(".side-nav").hide();
            }, 300);
        }
    }

}
