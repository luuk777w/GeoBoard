class App {

    private router: Router;

    constructor() {
        let config = new Config();
        console.log(config.siteName);

        this.router = new Router();
        new Routes(this.router);
    }
}

