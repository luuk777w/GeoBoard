App.JWT = (function () {

    let configMap = {
    }

    const _init = function () {
        console.log("JWT");
    }
    const set = function (token) {
        localStorage.setItem("token", token);
    }

    const get = function () {
        return localStorage.getItem("token");
    }

    const clear = function () {
        localStorage.setItem("token", "");
    }

    const parse = function () {

        let token = get();

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

    const getRole = function () {

        let jwt = parse();

        if (jwt == null || jwt == "") {
            return [];
        }

        return jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    const getId = function () {
        let jwt = parse();

        if (jwt == null || jwt == "") {
            return [];
        }

        return jwt["nameid"];

    }

    const isTokenExpired = function () {
        let jwt = parse();

        if (jwt == null || jwt == "") {
            return true;
        }

        return ((Math.round((new Date()).getTime() / 1000)) > jwt["exp"])
    }

    return {
        init: _init,
        set,
        get,
        parse,
        getRole,
        clear,
        getId,
        isTokenExpired
    }
})();
