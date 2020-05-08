class Router {

    private routes = {};
    private element = null;
    private authorize: Authorize;
    private JWT: JWT;
    private alert: Alert;

    constructor() {
        console.log("routing the shizzles");
        this.authorize = new Authorize();
        this.JWT = new JWT();
        this.alert = new Alert();
    }

    public route(path: string, className: any, role: string) {
        this.routes[path] = { className: className, role: role };
    }

    public resolveRoute() {

        this.element = this.element || document.getElementById('view');
        var url = location.pathname || '/';
        var route = this.routes[url];
        if (this.element && route) {

            if (route.role == "guest" && this.authorize.isLoggedIn() == false) {

                new route.controller(this)
            }
            else if (this.authorize.isLoggedIn() == false) {

                if (this.JWT.isTokenExpired()) {
                    this.redirectWithAlert('/login', 'alert-warning', 'Your session has expired. Please log in again.');
                }
                else {
                    this.redirect('/login');
                }
            }
            else if ((this.authorize.hasRole(route.role) || route.role == null) && route.role != "guest") {
                App[route.controller].init();
            }
            else if (route.role == "guest" && this.authorize.isLoggedIn()) {
                this.redirect('/home');
            }
            else {
                new ErrorPage(this, "401", "Unauthorized.");
            }

        } else {
            new ErrorPage(this, "404", "Page not found.");
        }
    }

    public redirect(route: string) {
        if (route != location.pathname) {
            window.history.pushState("", "", route);
            this.resolveRoute();

            return true;
        }
        return false;
    }

    public redirectWithAlert(route: string, className: string, message: string) {
        if (this.redirect(route)) {
            this.alert.show(className, message);
        }

    }
}
