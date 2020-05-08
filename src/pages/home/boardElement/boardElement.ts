class BoardElement {

    constructor() {

    }

    public newElement(element: BoardElementViewModel) {
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
