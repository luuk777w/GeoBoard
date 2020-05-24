import { singleton, container } from "tsyringe";
import { Config } from "./config.service";
import $ from 'jquery';

@singleton()
export class HttpService {

    private config: Config;

    constructor() {
        this.config = container.resolve(Config);
    }

    public async get<T>(url: string): Promise<T> {
        return await $.ajax({
            type: "get",
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async post<T>(url: string, data?: T): Promise<T> {
        return await $.ajax({
            type: "post",
            data: data,
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async put<T>(url: string, data?: T): Promise<T> {
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
