import { Router } from "./router";
import { Config } from "./config";
import { Routes } from "./routes";

export class App {

    /**
     * The singleton instance of this App class.
     */
    private static instance: App;

    private router: Router;

    private constructor() {
        let config = Config.getInstance();

        this.router = Router.getInstance();
        new Routes(this.router);
    }

    /**
     * Returns the singleton instance of this App class.
     */
    public static start() {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }
}

App.start();
