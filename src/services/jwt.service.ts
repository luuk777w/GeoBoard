import { singleton } from "tsyringe";
@singleton()
export class JWTService {

    public setToken(token: string) {
        localStorage.setItem("token", token);
    }

    public getToken() {
        return localStorage.getItem("token");
    }

    public clearToken() {
        localStorage.removeItem("token");
    }

    public parseToken() {
        let token = this.getToken();

        if (token == null || token == "")
            return;

        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    public getUserRole() {
        let jwt = this.parseToken();

        if (jwt == null || jwt == "")
            return [];

        return jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    public getUserId() {
        let jwt = this.parseToken();

        if (jwt == null || jwt == "")
            return [];

        return jwt["nameid"];
    }

    public getUsername() {
        let jwt = this.parseToken();

        if (jwt == null || jwt == "")
            return [];

        return jwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }

    public isTokenExpired() {
        let jwt = this.parseToken();

        if (jwt == null || jwt == "")
            return true;

        return ((Math.round((new Date()).getTime() / 1000)) > jwt["exp"])
    }
}
