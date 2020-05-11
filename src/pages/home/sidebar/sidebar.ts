class Sidebar {

    private XHR: XHR;
    private boardHub: BoardHub;

    constructor() {
        this.XHR = XHR.getInstance();
        this.boardHub = BoardHub.getInstance();

        Helpers.registerOnClick("sidebar", () => this.toggle());
        Helpers.registerOnClick("closeSidebar", () => this.close());

        Helpers.registerOnClick("createBoard", () => this.createBoard());

        // TODO: Dit moet een route worden. Heeft ook als voordeel dat je een bord direct kunt benaderen.
        Helpers.registerOnClick("board", (event: any) => this.goToBoard(event.target));

        this.boardHub.getConnection().on('boardCreated', (response: any) => {
            console.log('From hub: ', response);
        });
    }

    public async loadSidebar() {
        let data = {
            selectedBoard: localStorage.getItem('board'),
            myBoards: await this.loadMyBoards(),
            activeBoards: [] as string[],
            snapshots: [] as string[]
        }

        console.log(data);

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

    public goToBoard(target: any) {
        const clickedBoard = $(target);
        const currentBoard = localStorage.getItem('board');

        if (clickedBoard.data('board-id') == null || clickedBoard.data('board-id') == currentBoard)
            return;

        this.boardHub.getConnection().invoke("switchBoard", currentBoard, clickedBoard.data('board-id')).then((response: BoardViewModel) => {
            console.log(response);

            localStorage.setItem('board', response.id);

            $('.board-list-item.active').removeClass('active');
            $(clickedBoard).addClass('active');

        }).catch((err: any) => console.log(err));

        this.boardHub.getConnection().on('BoardNotFound', (response: any) => {
            console.warn('BoardNotFound', response);
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

    public toggle() {
        const sidebar = $("#sidebar .side-nav");

        if (! sidebar.is(':visible')) {
            sidebar.show();
            sidebar.removeClass("slideOutRight");
            sidebar.addClass("slideInRight");
        }
        else {
            this.close();
        }
    }

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
