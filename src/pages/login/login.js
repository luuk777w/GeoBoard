App.Login = (function () {

    // init
    const _init = function () {
        console.log("login");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("login");
        App.Template.setPageTitle("Login");
    }

    const goToRegister = function () {
        App.Helpers.redirect("/register");
    }

    const login = function () {

        let formData = App.FormHelper.getFormData("#loginForm");
        App.FormHelper.clearErrors();

        formData.notCompletedFields.forEach(field => {
            App.FormHelper.highlightField(`#${field}`);
        });

        if (formData.formCompleted == false) {
            App.Alert.show("alert-error", "Username or password not filled in.")
            return;
        }

        App.Authorize.Login(formData.fields.username, formData.fields.password, formData.fields.remember).then(result => {

            if (result.token != null && result.token != "") {
                App.JWT.set(result.token);

                App.XHR.getWithAuthorization("/user/profile/get").then(result => {

                    App.Helpers.redirect("/home");
                }, error => {
                    App.Alert.show("An unknown error occurred. Please try again.");
                });

            } else {
                App.Alert.show("An unknown error occurred. Please try again.");
            }

        }, error => {

            if (error.responseJSON.errors != null) {

                $.each(error.responseJSON.errors, function (element, errors) {
                    App.FormHelper.showError(element.toLowerCase(), errors);
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
        goToRegister,
        login
    }
})();

$(document).on('submit', '#loginForm', function (event) {
    event.preventDefault();

    App.Login.login();
});

$('#view').on('click', '[data-target="register"]', App.Login.goToRegister);
