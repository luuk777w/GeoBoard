import { singleton, container } from "tsyringe";
import { Config } from "../util/config";
import $ from 'jquery';
import { JWTService } from "./jwt.service";

@singleton()
export class HttpService {

    private config: Config;
    private jwtService: JWTService;

    constructor() {
        this.config = container.resolve(Config);
        this.jwtService = container.resolve(JWTService);
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

    public async getWithAuthorization<T>(url: string): Promise<T> {
        const token = this.jwtService.getToken();

        return await $.ajax({
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async postWithAuthorization<T>(url: string, data: any = null): Promise<T> {
        const token = this.jwtService.getToken();

        return await $.ajax({
            type: "post",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async postWithAuthorizationAndProgress<T>(url: string, data: any = null): Promise<T> {
        const token = this.jwtService.getToken();

        return await $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        let percentComplete: number = evt.loaded / evt.total;
                        percentComplete = percentComplete * 100;

                        console.log(percentComplete);
                    }
                }, false);

                return xhr;
            },

            type: "post",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async putWithAuthorization<T>(url: string, data: any = null): Promise<T> {
        const token = this.jwtService.getToken();

        return await $.ajax({
            type: "put",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async deleteWithAuthorization(url: string) {
        const token = this.jwtService.getToken();

        return await $.ajax({
            type: "delete",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

}
