import { singleton, container } from "tsyringe";
import { HttpService } from "./http.service";
import { LoginViewModel } from "models/authViewModels";

@singleton()
export class JWTService {

    public set(token: string) {
        localStorage.setItem("token", token);
    }

    public get() {
        return localStorage.getItem("token");
    }

    public clear() {
        localStorage.removeItem("token");
    }

    public parse() {
        let token = this.get();

        if (token == null || token == "") {
            return;
        }

        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    public getRole() {
        let jwt = this.parse();

        if (jwt == null || jwt == "") {
            return [];
        }

        return jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    public getId() {
        let jwt = this.parse();

        if (jwt == null || jwt == "") {
            return [];
        }

        return jwt["nameid"];

    }

    public isTokenExpired() {
        let jwt = this.parse();

        if (jwt == null || jwt == "") {
            return true;
        }

        return ((Math.round((new Date()).getTime() / 1000)) > jwt["exp"])
    }
}
