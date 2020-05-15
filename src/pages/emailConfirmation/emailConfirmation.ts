import { Page } from "../page";
import { Alert, AlertType } from "../../js/alert";
import { Helpers } from "../../js/helpers";

export class EmailConfirmationPage extends Page {

    private alert: Alert;

    constructor() {
        super();

        this.alert = new Alert();

        Helpers.registerOnClick("resendEmail", () => this.resendEmail());

        this.template.setLayout("auth_layout");
        this.template.loadHtml("emailConfirmation");

        let email = this.getEmailFromUrl();
        if (email == null || email == "") {
            this.router.redirect('/login');
        }
    }

    resendEmail() {

        let email = this.getEmailFromUrl();
        console.log(email);

        Helpers.toggleLoadingButton("button", true);

        this.authorize.resendActivationEmail(email).then(() => {

            this.alert.show(AlertType.Success, 'A new activation email has been sent.');
            Helpers.toggleLoadingButton(`button`, false);

        }, () => {
            this.router.redirectWithAlert('/login', AlertType.Error, 'Something went wrong while sending the confirmation email. Your account may be activated already.');
        });
    }

    getEmailFromUrl() {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);

        return urlParams.get('email');
    }


}

