class Config {

    /**
     * The singleton instance of this Config class.
     */
    private static instance: Config;

    private constructor() {
        //
    }

    /**
     * Returns the singleton instance of this Config class.
     */
    public static getInstance() {
        if (! Config.instance) {
            Config.instance = new Config();
        }

        return Config.instance;
    }

    // Site name
    siteName = "GeoBoard";

    // API url without trailing slash
    apiUrl = "https://localhost:5001";
}
