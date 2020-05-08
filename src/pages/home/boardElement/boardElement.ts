class BoardElement {

    constructor() {

    }

    public newElement(element: BoardElementModel) {
        let out = (window as any).Handlebars.compile((window as any).Templates["element"](element));
        $(".board-elements").prepend(out());
        $(`#${element.id}`).find('[data-target="remove"]').click(() => this.removeElement(element.id));
    }

    public removeElement(id: string) {
        $(`#${id}`).slideUp(200, () => {
            $(`#${id}`).remove();
        });
    }

}

interface BoardElementModel {
    id: string,
    number: number,
    user: string,
    isImage: boolean,
    content: string,
    direction: Direction,
    timeStamp: string
}

enum Direction {
    North = 0,
    NorthEast = 1,
    East = 2,
    SouthEast = 3,
    South = 4,
    SouthWest = 5,
    West = 6,
    NorthWest = 7
}
