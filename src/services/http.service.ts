import { singleton, container } from "tsyringe";
import { Config } from "../util/config";
import $ from 'jquery';
import { JWTService } from "./jwt.service";
import { AuthenticationResultViewModel } from "models/authViewModels";

@singleton()
export class HttpService {

    private config: Config;
    private jwtService: JWTService;

    constructor() {
        this.config = container.resolve(Config);
        this.jwtService = container.resolve(JWTService);

        $.ajaxPrefilter((options: JQuery.AjaxSettings, originalOptions: JQuery.AjaxSettings, jqXHR: JQuery.jqXHR) => {
            // Ignore the refresh and logout URL.
            if (options.url == `${this.config.apiUrl}/account/refresh` || `${this.config.apiUrl}/account/logout`) {
                return;
            }

            let dfd = $.Deferred();

            // if the request works, return normally
            jqXHR.done(dfd.resolve);

            // if the request fails, do something else
            // yet still resolve
            jqXHR.fail(() => {
                let args = Array.prototype.slice.call(arguments);

                console.log('XHR failed', jqXHR, jqXHR.getAllResponseHeaders())

                if (jqXHR.status === 401 && jqXHR.getResponseHeader("token-expired") == "true") {
                    new Promise(async () => {
                        const accessToken = this.jwtService.getAccessToken();
                        const refreshToken = this.jwtService.getRefreshToken();

                        await this.post<AuthenticationResultViewModel>('/account/refresh', JSON.stringify({ accessToken, refreshToken }))
                            .then((response: AuthenticationResultViewModel) => {
                                this.jwtService.setAccessToken(response.accessToken);
                                this.jwtService.setRefreshToken(response.refreshToken);

                                // retry with a copied originalOpts with refreshRequest.
                                var newOpts = $.extend({}, originalOptions, {
                                    refreshRequest: true
                                });
                                // pass this one on to our deferred pass or fail.
                                $.ajax(newOpts).then(dfd.resolve, dfd.reject);
                            })
                            .catch(() => {
                                // reject with the original 401 data
                                dfd.rejectWith(jqXHR, args);
                            });
                    })
                }
            });
        });
    }

    public async get<T>(url: string): Promise<T> {
        return await $.ajax({
            type: "get",
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async post<T>(url: string, data: any = null): Promise<T> {
        return await $.ajax({
            type: "post",
            data: data,
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async put<T>(url: string, data: any = null): Promise<T> {
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
        const accessToken = this.jwtService.getAccessToken();

        return await $.ajax({
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async postWithAuthorization<T>(url: string, data: any = null): Promise<T> {
        const accessToken = this.jwtService.getAccessToken();

        return await $.ajax({
            type: "post",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async postWithAuthorizationAndProgress<T>(url: string, data: any = null, callback: any, context: any): Promise<T> {
        const accessToken = this.jwtService.getAccessToken();

        return await $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        let percentComplete: number = evt.loaded / evt.total;
                        percentComplete = percentComplete * 100;

                        callback(percentComplete, context);
                    }
                }, false);

                return xhr;
            },

            type: "post",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async putWithAuthorization<T>(url: string, data: any = null): Promise<T> {
        const accessToken = this.jwtService.getAccessToken();

        return await $.ajax({
            type: "put",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async deleteWithAuthorization<T>(url: string, data: any = null): Promise<T> {
        const accessToken = this.jwtService.getAccessToken();

        return await $.ajax({
            type: "delete",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

}
