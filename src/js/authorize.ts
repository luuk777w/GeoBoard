class Authorize {

    //TODO: Correct typing

    /**
     * The singleton instance of this Authorize class.
     */
    private static instance: Authorize;

    private config: Config;
    private JWT: JWT;

    private constructor() {
        console.log("Authorize");
        this.config = new Config();
        this.JWT = JWT.getInstance();
    }

    /**
     * Returns the singleton instance of this JWT class.
     */
    public static getInstance() {
        if (! Authorize.instance) {
            Authorize.instance = new Authorize();
        }

        return Authorize.instance;
    }

    public login(username: string, password: string, remember: boolean) {
        return $.ajax({
            type: "post",
            url: `${this.config.apiUrl}/account/authorize/`,
            data: `{"username": "${username}", "password": "${password}", "rememberMe": ${remember}}`,
            contentType: "application/json",
        });
    }

    public register(username: string, email: string, password: string) {
        return $.ajax({
            type: "post",
            url: `${this.config.apiUrl}/account/register/`,
            data: `{"username": "${username}", "password": "${password}", "email": "${email}"}`,
            contentType: "application/json",
        });
    }

    public resendActivationEmail(email: string) {
        return $.ajax({
            type: "post",
            url: `${this.config.apiUrl}/account/ResendActivationEmail/`,
            data: `{"email": "${email}"}`,
            contentType: "application/json",
        });
    }

    public activate(email: string, token: string) {
        return $.ajax({
            type: "get",
            url: `${this.config.apiUrl}/account/Activate/?email=${email}&token=${token}`,
        });
    }

    public requestPasswordReset(username: string) {
        return $.ajax({
            type: "post",
            url: `${this.config.apiUrl}/account/RequestPasswordReset/`,
            data: `{"username": "${username}"}`,
            contentType: "application/json",
        });
    }

    public resetPassword(email: string, password: string, token: string) {
        return $.ajax({
            type: "post",
            url: `${this.config.apiUrl}/account/ResetPassword/`,
            data: `{"token": "${token}", "password": "${password}", "email": "${email}"}`,
            contentType: "application/json",
        });
    }

    public hasRole(role: string) {

        if (this.JWT.getRole() == role) {
            return true;
        } else {
            return false;
        }
    }

    public isLoggedIn = function () {

        if (this.JWT.getRole() == null || this.JWT.getRole() == "" || this.JWT.isTokenExpired()) {
            return false;
        } else {
            return true;
        }
    }

}
