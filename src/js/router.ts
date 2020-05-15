import { Authorize } from "./authorize";
import { JWT } from "./jwt";
import { Alert, AlertType } from "./alert";
import { ErrorPage } from "../pages/error/error";

export class Router {

    /**
     * The singleton instance of this Router class.
     */
    private static instance: Router;

    private routes: any = {};
    private element: HTMLElement = null;
    private authorize: Authorize;
    private JWT: JWT;
    private alert: Alert;

    private constructor() {
        this.authorize = Authorize.getInstance();
        this.JWT = JWT.getInstance();
        this.alert = new Alert();

        let router = this;

        window.addEventListener('popstate', function () {
            router.resolveRoute();
        });
        window.addEventListener('load', function () {
            router.resolveRoute();
        });
    }

    /**
     * Returns the singleton instance of this Router class.
     */
    public static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router();
        }

        return Router.instance;
    }

    public route(path: string, controller: object, role: string) {
        this.routes[path] = { controller: controller, role: role };
    }

    public resolveRoute() {

        this.element = this.element || document.getElementById('view');
        var url = location.pathname || '/';
        var route = this.routes[url];

        if (this.element && route) {

            if (route.role == "guest" && this.authorize.isLoggedIn() == false) {

                new route.controller();
            }
            else if (this.authorize.isLoggedIn() == false) {

                if (this.JWT.isTokenExpired()) {
                    this.redirectWithAlert('/login', AlertType.Warning, 'Your session has expired. Please log in again.');
                }
                else {
                    this.redirect('/login');
                }
            }
            else if ((this.authorize.hasRole(route.role) || route.role == null) && route.role != "guest") {
                new route.controller();
            }
            else if (route.role == "guest" && this.authorize.isLoggedIn()) {
                this.redirect('/home');
            }
            else {
                new ErrorPage(401, "Unauthorized.");
            }

        } else {
            new ErrorPage(404, "Page not found.");
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

    public redirectWithAlert(route: string, controller: AlertType, message: string) {
        if (this.redirect(route)) {
            this.alert.show(controller, message);
        }

    }
}
