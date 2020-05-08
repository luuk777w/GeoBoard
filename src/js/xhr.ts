class XHR {

    private config: Config;
    private JWT: JWT;

    constructor() {
        console.log("XHR");
        this.config = new Config();
        this.JWT = new JWT();
    }

    public get(url: string) {
        return $.ajax({
            type: "get",
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public post(url: string, data: any = null) {
        return $.ajax({
            type: "post",
            data: data,
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public put(url: string, data: any = null) {
        return $.ajax({
            type: "put",
            data: data,
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public del(url: string) {
        return $.ajax({
            type: "delete",

            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public getWithAuthorization(url: string) {
        const token = this.JWT.get();

        return $.ajax({
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public postWithAuthorization(url: string, data: any = null) {
        const token = this.JWT.get();

        return $.ajax({
            type: "post",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public putWithAuthorization(url: string, data: any = null) {
        const token = this.JWT.get();

        return $.ajax({
            type: "put",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public deleteWithAuthorization(url: string) {
        const token = this.JWT.get();

        return $.ajax({
            type: "delete",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

}
