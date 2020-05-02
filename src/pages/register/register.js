App.Register = (function () {

    // init
    const _init = function () {
        console.log("register");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("register");
        App.Template.setPageTitle("Create an account");

        App.FormHelper.init();
    }

    const goToLogin = function () {
        App.Helpers.redirect("/register/email-confirmation");
    }

    const register = function () {
        let formData = App.FormHelper.getFormData("#registerForm");
        App.FormHelper.clearErrors();

        // if (formData.formCompleted == false) {
        //     App.FormHelper.showError("Please fill in every field.");
        //     return;
        // }

        if (!formData.fields.terms) {
            App.FormHelper.showError('terms', 'Please accept the terms of service to continue.');
            return;
        }

        formData.notCompletedFields.forEach(field => {
            App.FormHelper.highlightField(`#${field}`);
        });

        if (formData.fields.password != formData.fields["password-confirm"]) {
            App.FormHelper.showError('password-confirm', 'Please make sure the passwords match.');
            App.FormHelper.highlightField("#password");
            App.FormHelper.highlightField("#password-confirm");

            return;
        }

        App.Authorize.Register(formData.fields.username, formData.fields.email, formData.fields.password).then((result) => {

            goToLogin();

        }, (error) => {

            console.log(error);

            if (error.responseJSON.errors != null) {

                $.each(error.responseJSON.errors, function (element, errors) {
                    App.FormHelper.showError(element.toLowerCase(), errors[0]);
                });

            } else if (error.responseJSON.message != null) {
                App.Alert.show("alert-error", error.responseJSON.message);
            } else {
                App.Alert.show("alert-error", "An unknown error occurred. Please try again.");
            }

        });
    }

    return {
        init: _init,
        goToLogin,
        register
    }
})();

$(document).on('submit', '#registerForm', function (event) {
    event.preventDefault();

    App.Register.register();
});
$('#view').on('click', '[data-target="login"]', App.Register.goToLogin);
