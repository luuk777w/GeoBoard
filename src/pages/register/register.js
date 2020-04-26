App.Register = (function () {

    // init
    const _init = function () {
        console.log("register");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("register");
        App.Template.setPageTitle("Create an account");
    }

    const goToLogin = function () {
        App.Helpers.redirect("/login");
    }

    return {
        init: _init,
        goToLogin
    }
})();

$('#view').on('click', '[data-target="login"]', App.Register.goToLogin);
