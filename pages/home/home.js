App.home = (function () {

	// init
    const _init = function () {
        console.log("home");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("home");
    }

    return {
        init: _init
    }
})();
