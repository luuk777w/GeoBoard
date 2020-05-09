class App {

    /**
     * The singleton instance of this App class.
     */
    private static instance: App;

    private router: Router;

    private constructor() {
        let config = new Config();

        this.router = Router.getInstance();
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

