import { singleton, container } from "tsyringe";
import { Config } from "./config";
import $ from 'jquery';

// https://github.com/microsoft/tsyringe
@singleton()
export class HttpService {

    private config: Config;

    constructor() {
        console.log("Hallo HttpService");

        this.config = container.resolve(Config);
    }

    public async get(url: string) {
        return await $.ajax({
            type: "get",
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async post(url: string, data: any = null) {
        return await $.ajax({
            type: "post",
            data: data,
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async put(url: string, data: any = null) {
        return await $.ajax({
            type: "put",
            data: data,
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async delete(url: string) {
        return await $.ajax({
            type: "delete",

            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    // TODO: Add AJAX actions with authorization

}
