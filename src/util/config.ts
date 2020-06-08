import { singleton } from "tsyringe";

@singleton()
export class Config {

    siteName = "GeoBoard";

    /**
     * API URL without trailing slash.
     */
    // apiUrl = "https://localhost:5001";
    // apiUrl = "https://api.geoboard.ga";

    apiUrl = process.env.API_URL;
}
