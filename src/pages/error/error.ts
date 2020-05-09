class ErrorPage extends Page {
    constructor(errorCode: number, errorMessage: string) {
        super();

        this.template.setLayout("base_layout");
        this.template.loadhtml("error", { error_code: errorCode, error_message: errorMessage });

    }
}
