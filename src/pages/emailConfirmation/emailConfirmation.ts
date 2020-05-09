class EmailConfirmationPage extends Page {

    private alert: Alert;

    constructor() {
        super();

        this.alert = new Alert();

        Helpers.registerOnClick("resendEmail", () => this.resendEmail());

        this.template.setLayout("auth_layout");
        this.template.loadhtml("emailConfirmation");

        let email = this.getEmailFromUrl();
        if (email == null || email == "") {
            this.router.redirect('/login');
        }
    }

    resendEmail() {

        let email = this.getEmailFromUrl();
        console.log(email);

        Helpers.toggleLoadingButton("button", true);

        this.authorize.resendActivationEmail(email).then(result => {

            this.alert.show('alert-success', 'A new activation email has been sent.');
            Helpers.toggleLoadingButton(`button`, false);

        }, error => {
            this.router.redirectWithAlert('/login', 'alert-error', 'Something went wrong while sending the confirmation email. Your account may be activated already.');
        });


        console.log("hoi");
    }

    getEmailFromUrl() {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);

        return urlParams.get('email');
    }


}

