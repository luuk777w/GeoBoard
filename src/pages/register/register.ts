class RegisterPage extends Page {

    private formHelper: FormHelper;
    private alert: Alert;

    constructor() {
        super();

        this.formHelper = new FormHelper();
        this.alert = new Alert();

        Helpers.registerOnClick("login", () => this.goToLogin());

        this.template.setLayout("auth_layout");
        this.template.loadHtml("register");
        this.template.setPageTitle("Create an account");
    }

    public showRegistrationSuccesful() {
        let formData = this.formHelper.getFormData("#registerForm");

        this.router.redirect("/register/email-confirmation?email=" + formData.fields.email);
    }

    public goToLogin() {
        this.router.redirect("/login");
    }

    public register() {
        let formData: formData<RegisterFormData> = this.formHelper.getFormData("#registerForm");
        this.formHelper.clearErrors();

        // if (formData.formCompleted == false) {
        //     App.FormHelper.showError("Please fill in every field.");
        //     return;
        // }

        if (!formData.fields.terms) {
            this.formHelper.showError('terms', 'Please accept the terms of service to continue.');
            return;
        }

        formData.notCompletedFields.forEach(field => {
            this.formHelper.highlightField(`#${field}`);
        });

        if (formData.fields.password != formData.fields["password-confirm"]) {
            this.formHelper.showError('password-confirm', 'Please make sure the passwords match.');
            this.formHelper.highlightField("#password");
            this.formHelper.highlightField("#password-confirm");

            return;
        }

        Helpers.toggleLoadingButton(`button[data-target="register"]`, true);

        this.authorize.register(formData.fields.username, formData.fields.email, formData.fields.password).then((result) => {

            this.showRegistrationSuccesful();

        }, (error) => {

            Helpers.toggleLoadingButton(`button[data-target="register"]`, false);

            if (error.status == 0) {
                this.alert.show("alert-error", "Could not reach the server. Please try again later.");
                return;
            }

            if (error.responseJSON.errors != null) {

                $.each(error.responseJSON.errors, function (element: string, errors) {
                    this.formHelper.showError(element.toLowerCase(), errors);
                });

            } else if (error.responseJSON.message != null) {
                this.alert.show("alert-error", error.responseJSON.message);
            } else {
                this.alert.show("alert-error", "An unknown error occurred. Please try again.");
            }
        });
    }
}

interface RegisterFormData {
    username: string;
    password: string;
    "password-confirm": string;
    email: string;
    terms: string;
}
