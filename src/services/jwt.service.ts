import { singleton } from "tsyringe";
import { AppState, store } from "store";
import { updateAccessToken, updateRefreshToken } from "store/system/actions";
@singleton()
export class JWTService {

    public setAccessToken(token: string) {
        store.store.dispatch(updateAccessToken(token));
    }

    public setRefreshToken(token: string) {
        store.store.dispatch(updateRefreshToken(token));
    }

    public getAccessToken() {
        const state: AppState = store.store.getState();
        return state.system.accessToken;
    }

    public getRefreshToken() {
        const state: AppState = store.store.getState();
        return state.system.refreshToken;
    }

    public clearTokens() {
        store.store.dispatch(updateAccessToken(null));
        store.store.dispatch(updateRefreshToken(null));
    }

    public parseToken() {
        let token = this.getAccessToken();

        if (token == null || token == "")
            return;

        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    public getJwtId() {
        let jwt = this.parseToken();

        if (jwt == null || jwt == "")
            return [];

        return jwt["jti"];
    }

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

    public isAccessTokenExpired() {
        let jwt = this.parseToken();

        if (jwt == null || jwt == "")
            return true;

        return ((Math.round((new Date()).getTime() / 1000)) > jwt["exp"])
    }
}
