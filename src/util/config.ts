import { singleton } from "tsyringe";

@singleton()
export class Config {

    siteName = "GeoBoard";

    /**
     * API URL without trailing slash.
     */
    apiUrl = process.env.API_URL;
}
