import { BoardHub } from "../../../js/hubs/BoardHub";
import { BoardElementViewModel } from "../../../js/models/BoardElementViewModel";
import * as Handlebars from 'handlebars';
import * as $ from 'jquery';

export class BoardElement {

    private boardHub: BoardHub;
    private templates: any;

    constructor() {
        this.boardHub = BoardHub.getInstance();
        this.templates = require('../../../../dist/js/templates');
    }

    public newElement(element: BoardElementViewModel) {
        let out = Handlebars.compile(this.templates["boardElement"](element));
        $(".board-elements").prepend(out({}));

        $(`[data-element-id="${element.id}"]`).find('[data-target="remove"]').click(() => this.removeElement(element.id));
    }

    public removeElement(id: string) {
        $(`[data-element-id="${id}"]`).slideUp(200, () => {
            $(`[data-element-id="${id}"]`).remove();
        });
    }

    public upload() {
        console.log("upload");
    }

}
