class XHR {

    /**
     * The singleton instance of this XHR class.
     */
    private static instance: XHR;

    private config: Config;
    private JWT: JWT;

    private constructor() {
        this.config = Config.getInstance();
        this.JWT = JWT.getInstance();
    }

    /**
     * Returns the singleton instance of this XHR class.
     */
    public static getInstance() {
        if (! XHR.instance) {
            XHR.instance = new XHR();
        }

        return XHR.instance;
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

    public async del(url: string) {
        return await $.ajax({
            type: "delete",

            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async getWithAuthorization(url: string) {
        const token = this.JWT.get();

        return await $.ajax({
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async postWithAuthorization(url: string, data: any = null) {
        const token = this.JWT.get();

        return await $.ajax({
            type: "post",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async putWithAuthorization(url: string, data: any = null) {
        const token = this.JWT.get();

        return await $.ajax({
            type: "put",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    public async deleteWithAuthorization(url: string) {
        const token = this.JWT.get();

        return await $.ajax({
            type: "delete",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: `${this.config.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

}
