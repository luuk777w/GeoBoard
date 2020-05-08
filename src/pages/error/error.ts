class ErrorPage extends Page {
    constructor(router: Router, errorCode: number, errorMessage: string) {
        super(router);

        console.log("Error!!");
        this.template.setLayout("base_layout");
        this.template.loadhtml("error", { error_code: errorCode, error_message: errorMessage });

    }
}
