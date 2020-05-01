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
        App.Helpers.redirect("/login");
    }

    const register = function () {
        let formData = App.FormHelper.getFormData("#registerForm");
        App.FormHelper.clearErrors();

        console.log(formData);

        formData.notCompletedFields.forEach(field => {
            App.FormHelper.highlightField(`#${field}`);
        });

        // if (formData.formCompleted == false) {
        //     App.FormHelper.showError("Please fill in every field.");
        //     return;
        // }

        if (formData.fields.password != formData.fields["password-confirm"]) {
            App.FormHelper.showError('password-confirm', 'Please make sure the passwords match.');
            App.FormHelper.highlightField("#password");
            App.FormHelper.highlightField("#password-confirm");

            return;
        }

        if (!formData.fields.terms) {
            App.FormHelper.showError('terms', 'Please accept the terms of service to continue.');
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

            } else {
                App.FormHelper.showError(error.responseText);
                console.warn(error);
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
