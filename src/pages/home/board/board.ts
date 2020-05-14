class Board {

    /**
     * The singleton instance of this Board class.
     */
    private static instance: Board;

    private XHR: XHR;

    private element: BoardElement;

    private constructor() {
        this.XHR = XHR.getInstance();

        this.element = new BoardElement();
    }

    /**
     * Returns the singleton instance of this Board class.
     */
    public static getInstance() {
        if (!Board.instance) {
            Board.instance = new Board();
        }

        return Board.instance;
    }

    /**
     * Load the board that is currently selected (if any).
     * Returns a promise.
     */
    public async loadBoard(): Promise<any> {
        return new Promise(async (resolve, reject) => {

            if (localStorage.getItem('board')) {
                // Get the board ID from the localstorage if available
                const boardId = localStorage.getItem('board');

                // Attemp to fetch the board info.
                await this.XHR.getWithAuthorization(`/boards/${boardId}?includeElements=true`)
                    .then((response: BoardViewModel) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.warn('Something went wrong while loading the current board', error);

                        reject(error);
                    });
            }
            else {
                reject();
            }
        });
    }

    /**
     * Show the given board and load the elements when a board is selected.
     * When no board is selected, an instruction will be shown.
     *
     * @param boardId The ID of the board to show.
     */
    public show(boardId?: string) {
        // Read the board template.
        let out = (window as any).Handlebars.compile((window as any).Templates["board"]({
            boardSelected: (boardId != null)
        }));

        $("#board-container").html(out());

        // Only load when a board is selected.
        if (boardId != null) {
            // Load the elements.
            this.loadElements(boardId);
        }
    }

    public loadElements(boardId: string) {

        this.XHR.getWithAuthorization(`/boards/${boardId}/elements`).then(data => {

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
}
