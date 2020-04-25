App.Router = (function () {

    let configMap = {
    }

    let routes = {};

    const _init = function () {
        console.log("routing the shizzles");
    }

    const route = function (path, controller, role) {
        routes[path] = { controller: controller, role: role };
    }

    let element = null;
    const resolveRoute = function () {

        element = element || document.getElementById('view');
        var url = location.pathname || '/';
        var route = routes[url];
        if (element && route) {

            if (route.role == "anonymous" && App.Authorize.IsLoggedIn() == false) {
                App[route.controller].init();
            } else if ((App.Authorize.HasRole(route.role) || route.role == null) && route.role != "anonymous") {
                App[route.controller].init();
            } else if (App.Authorize.IsLoggedIn() == false) {
                App.Helpers.redirect('/login');
            } else if (route.role == "anonymous" && App.Authorize.IsLoggedIn()) {
                App.Helpers.redirect('/home');
            } else {
                App.Error.init("401", "Unauthorized.");
            }

        } else {
            App.Error.init("404", "page not found.");
        }
    }

    return {
        init: _init,
        route,
        resolveRoute
    }
})();