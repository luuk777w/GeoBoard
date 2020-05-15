import { Page } from "../page";
import { AlertType } from "../../js/alert";

export class ActivatePage extends Page {
    constructor() {
        super();

        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let email = urlParams.get('email');
        let token = urlParams.get('token');

        this.authorize.activate(email, encodeURIComponent(token)).then(() => {

            this.router.redirectWithAlert("/login", AlertType.Success, "Your account has been activated succesfully!");

        }, () => {
            this.template.setLayout("auth_layout");
            this.template.loadHtml("activate");
        });
    }
}
