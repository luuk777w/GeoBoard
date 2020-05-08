class App {

    /**
     * The singleton instance of this App class.
     */
    private static instance: App;

    private router: Router;

    constructor() {
        let config = new Config();
        console.log(config.siteName);

        this.router = new Router();
        new Routes(this.router);
    }

    /**
     * Returns the singleton instance of this App class.
     */
    public static getInstance() {
        if (! App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }
}

