class Sidebar {

    private XHR: XHR;

    constructor() {
        this.XHR = XHR.getInstance();

        Helpers.registerOnClick("sidebar", () => this.toggle());
        Helpers.registerOnClick("closeSidebar", () => this.close());

        Helpers.registerOnClick("board", (event: any) => this.goToBoard(event.target));

        console.log('Sidebar');
    }

    public async loadSidebar() {
        let data = {
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
                    elements: []
                });
            });

        }, error => {
            console.warn(error);
        });

        return boards;
    }

    public goToBoard(target: any) {
        let clickedBoard = $(target);

        if (clickedBoard.data('board-id') == null)
            return;

        alert('Clicked on board: ' + clickedBoard.data('board-id'));
        // TODO: Set and route to new board.
    }

    public toggle() {
        const sidebar = $("#sidebar .side-nav");

        if (! sidebar.is(':visible')) {
            $(".side-nav").show();
            $(".side-nav").removeClass("slideOutRight");
            $(".side-nav").addClass("slideInRight");
        }
        else {
            this.close();
        }
    }

    public close() {
        const sidebar = $("#sidebar .side-nav");

        if (sidebar.is(':visible')) {
            $(".side-nav").removeClass("slideInRight");
            $(".side-nav").addClass("slideOutRight");

            setTimeout(function () {
                $(".side-nav").hide();
            }, 300);
        }
    }

}
