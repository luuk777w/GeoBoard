class Board {

    private XHR: XHR;

    private element: BoardElement;

    constructor() {
        this.XHR = XHR.getInstance();

        this.element = new BoardElement();
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
     * Show the given board and load the elements.
     *
     * @param boardId The ID of the board to show.
     */
    public show(boardId: string) {
        // Read the board template.
        let out = (window as any).Handlebars.compile((window as any).Templates["board"]());
        $("#board-container").html(out());

        // Load the elements.
        this.loadElements(boardId);
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
