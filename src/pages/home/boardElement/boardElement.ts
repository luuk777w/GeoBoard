class BoardElement {

    constructor() {

    }

    public newElement(element: BoardElementViewModel) {
        let out = (window as any).Handlebars.compile((window as any).Templates["boardElement"](element));
        $(".board-elements").prepend(out());

        $(`[data-element-id="${element.id}"]`).find('[data-target="remove"]').click(() => this.removeElement(element.id));
    }

    public removeElement(id: string) {
        $(`[data-element-id="${id}"]`).slideUp(200, () => {
            $(`[data-element-id="${id}"]`).remove();
        });
    }

}
