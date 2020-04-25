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
        let username = $("#username").val();
        let password = $("#password").val();

        App.Authorize.Login(username, password).then(result => {

            if (result.token != null && result.token != "") {
                App.JWT.set(result.token);

                App.XHR.getWithAuthorization("/user/profile/get").then(result => {

                    App.Helpers.redirect("/home");
                }, error => {
                    //loginError("An unknown error occurred. Please try again.");
                });

            } else {
                //loginError("An unknown error occurred. Please try again.");
            }

        }, error => {
            if (error.responseJSON.errors != null) {
                loginError(error.responseJSON.errors[0]);
            } else {
                //loginError("An unknown error occurred. Please try again.");
            }
        });
    }

    return {
        init: _init,
        goToRegister,
        login
    }
})();

$('#view').on('click', '[data-target="login"]', App.Login.login);
$('#view').on('click', '[data-target="register"]', App.Login.goToRegister);
