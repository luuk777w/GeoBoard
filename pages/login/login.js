App.Login = (function () {

    // init
    const _init = function () {
        console.log("login");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("login");
    }

    const goToRegister = function () {
        App.Helpers.redirect("/register");
    }

    return {
        init: _init,
        goToRegister
    }
})();

$('#view').on('click', '[data-target="register"]', App.Login.goToRegister);