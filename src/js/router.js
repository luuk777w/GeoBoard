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

            if (route.role == "guest" && App.Authorize.IsLoggedIn() == false) {
                App[route.controller].init();
            }
            else if ((App.Authorize.HasRole(route.role) || route.role == null) && route.role != "guest") {
                App[route.controller].init();
            }
            else if (App.Authorize.IsLoggedIn() == false) {
                App.Router.redirect('/login');
            }
            else if (route.role == "guest" && App.Authorize.IsLoggedIn()) {
                App.Router.redirect('/home');
            }
            else {
                App.Error.init("401", "Unauthorized.");
            }

        } else {
            App.Error.init("404", "page not found.");
        }
    }

    const redirect = function (route) {
        if (route != location.pathname) {
            window.history.pushState("", "", route);
            App.Router.resolveRoute();

            return true;
        }

        return false;
    }

    const redirectWithAlert = function (route, className, message)
    {
        if (redirect(route)) {
            App.Alert.show(className, message);
        }

    }

    return {
        init: _init,
        route,
        resolveRoute,
        redirect,
        redirectWithAlert
    }
})();
