App.Error = (function () {

    // init
    const _init = function (errorCode, errorMessage) {
        console.log("Error!!");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("error", { error_code: errorCode, error_message: errorMessage });
    }

    return {
        init: _init
    }
})();