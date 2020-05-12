class Board {

    private XHR: XHR;

    private element: BoardElement;

    constructor() {
        this.XHR = XHR.getInstance();

        this.element = new BoardElement();
    }

    public async loadBoard(): Promise<any> {
        return new Promise(async (resolve, reject) => {

            if (localStorage.getItem('board')) {
                // Get the board ID from the localstorage if available
                const boardId = localStorage.getItem('board');

                // Attemp to fetch the board info.
                await this.XHR.getWithAuthorization(`/boards/${boardId}`)
                    .then((response: BoardViewModel) => resolve(response))
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

    public loadElements(boardId: string) {

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
}
