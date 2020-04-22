App.Register = (function () {

    // init
    const _init = function () {
        console.log("register");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("register");
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