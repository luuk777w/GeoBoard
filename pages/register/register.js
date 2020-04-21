App.Register = (function () {

    // init
    const _init = function () {
        console.log("register");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("register");
    }

    return {
        init: _init
    }
})();
