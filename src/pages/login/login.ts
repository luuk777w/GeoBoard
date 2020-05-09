class LoginPage extends Page {

    private formHelper: FormHelper;
    private alert: Alert;

    constructor() {
        super();

        this.formHelper = new FormHelper();
        this.alert = new Alert();

        this.template.setLayout("auth_layout");
        this.template.loadhtml("login");
        this.template.setPageTitle("Login");

        let login = this;

        $(document).on('submit', '#loginForm', function (event) {
            event.preventDefault();
            login.login();
        });

        Helpers.registerOnClick("register", () => this.goToRegister());
    }

    public goToRegister() {
        this.router.redirect("/register");
    }

    public login() {

        let formData: formData<LoginFormData> = this.formHelper.getFormData("#loginForm");
        this.formHelper.clearErrors();

        formData.notCompletedFields.forEach(field => {
            this.formHelper.highlightField(`#${field}`);
        });

        if (formData.formCompleted == false) {
            this.alert.show("alert-error", "Username or password not filled in.")
            return;
        }

        Helpers.toggleLoadingButton(`button[type="submit"]`, true);

        this.authorize.login(formData.fields.username, formData.fields.password, formData.fields.remember).then(result => {

            if (result.token != null && result.token != "") {
                this.JWT.set(result.token);

                this.XHR.getWithAuthorization("/user/profile/get").then(result => {

                    this.router.redirect("/home");
                }, error => {
                    this.alert.show("alert-error", "An unknown error occurred. Please try again.");
                    Helpers.toggleLoadingButton(`button[type="submit"]`, false);
                });

            } else {
                this.alert.show("alert-error", "An unknown error occurred. Please try again.");
                Helpers.toggleLoadingButton(`button[type="submit"]`, false);
            }

        }, error => {

            Helpers.toggleLoadingButton(`button[type="submit"]`, false);

            if (error.status == 0) {
                this.alert.show("alert-error", "Could not reach the server. Please try again later.");
                return;
            }

            if (error.responseJSON.errors != null) {

                let formhelper = this.formHelper;

                $.each(error.responseJSON.errors, function (element: string, errors) {
                    formhelper.showError(element.toLowerCase(), errors);
                });

            } else if (error.responseJSON.message != null) {
                this.alert.show("alert-error", error.responseJSON.message);
            } else {
                this.alert.show("alert-error", "An unknown error occurred. Please try again.");
            }
        });
    }
}

interface LoginFormData {
    username: string;
    password: string;
    remember: boolean;
}
