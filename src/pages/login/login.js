App.Login = (function () {

    // init
    const _init = function () {
        console.log("login");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("login");
    }

    const goToRegister = function () {
        App.Helpers.redirect("/register");
    }

    const login = function () {

        let formData = App.FormHelper.getFormData("#loginForm");

        formData.notCompletedFields.forEach(field => {
            App.FormHelper.highlightField(`#${field}`);
        });

        if (formData.formCompleted == false) {
            App.FormHelper.showError("Username or password not filled in.");
            return;
        }

        console.log(formData.fields.username);
        console.log(formData.fields.password);

        App.Authorize.Login(formData.fields.username, formData.fields.password, formData.fields.remember).then(result => {

            if (result.token != null && result.token != "") {
                App.JWT.set(result.token);

                App.XHR.getWithAuthorization("/user/profile/get").then(result => {

                    App.Helpers.redirect("/home");
                }, error => {
                    App.FormHelper.showError("An unknown error occurred. Please try again.");
                });

            } else {
                App.FormHelper.showError("An unknown error occurred. Please try again.");
            }

        }, error => {
            if (error.responseJSON.errors != null) {
                App.FormHelper.showError(error.responseJSON.errors[0]);
            } else {
                App.FormHelper.showError("An unknown error occurred. Please try again.");
            }
        });
    }

    return {
        init: _init,
        goToRegister,
        login
    }
})();

$(document).on('submit', '#loginForm', function (event) {
    event.preventDefault();

    App.Login.login();
});

$('#view').on('click', '[data-target="register"]', App.Login.goToRegister);
