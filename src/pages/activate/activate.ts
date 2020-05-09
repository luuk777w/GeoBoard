class ActivatePage extends Page {
    constructor() {
        super();

        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let email = urlParams.get('email');
        let token = urlParams.get('token');

        this.authorize.activate(email, encodeURIComponent(token)).then(result => {

            this.router.redirectWithAlert("/login", "alert-success", "Your account has been activated succesfully!");

        }, error => {
            this.template.setLayout("auth_layout");
            this.template.loadhtml("activate");
        });
    }
}
