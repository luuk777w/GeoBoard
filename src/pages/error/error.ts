import { Page } from "../page";

export class ErrorPage extends Page {
    constructor(errorCode: number, errorMessage: string) {
        super();

        this.template.setLayout("base_layout");
        this.template.loadHtml("error", { error_code: errorCode, error_message: errorMessage });

    }
}
