import { Router } from "./router";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { EmailConfirmationPage } from "../pages/emailConfirmation/emailConfirmation";
import { ActivatePage } from "../pages/activate/activate";
import { HomePage } from "../pages/home/home";

export class Routes {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.route('/login', LoginPage, 'guest');
        this.router.route('/register', RegisterPage, 'guest');
        this.router.route('/register/email-confirmation', EmailConfirmationPage, 'guest');
        this.router.route('/register/activate', ActivatePage, 'guest');
        this.router.route('/', HomePage, 'User');
        this.router.route('/home', HomePage, 'User');
    }
}
