const App = (function () {

    let configMap = {
        //API url without trailing slash
        apiUrl: "https://localhost:5001"
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
