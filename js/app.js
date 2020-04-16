const App = (function () {

    let configMap = {
        apiUrl: "URL"
    }

    // init
    const _init = function (callbackFuntion) {

        console.log(configMap.apiUrl);
        callbackFuntion();
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: _init,
        configMap
    }
})();

function afterInit() {

    console.log("App init done");

    App.Router.init();
}