App.EmailConfirmation = (function () {

    // init
    const _init = function () {
        console.log("emailConfirmation");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("emailConfirmation");
    }

    return {
        init: _init
    }
})();
