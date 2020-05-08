class Routes {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.route('/login', Loginpage, 'guest');
        this.router.route('/register', 'Register', 'guest');
        this.router.route('/register/email-confirmation', 'EmailConfirmation', 'guest');
        this.router.route('/register/activate', 'Activate', 'guest');
        this.router.route('/', 'Home', 'User');
        this.router.route('/home', 'Home', 'User');
    }
}
