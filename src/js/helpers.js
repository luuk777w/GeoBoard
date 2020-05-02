App.Helpers = (function () {

    let configMap = {
    }

    const _init = function () {
        console.log("Helpers");
    }

    const redirect = function (route) {
        if (route != location.pathname) {
            window.history.pushState("", "", route);
            App.Router.resolveRoute();
        }
    }

    const sanitize = function (string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match) => (map[match]));
    }

    const decode = function (string) {
        var parser = new DOMParser;
        var dom = parser.parseFromString(
            '<!doctype html><body>' + string,
            'text/html');
        var decodedString = dom.body.textContent;

        return decodedString;
    }

    return {
        init: _init,
        redirect,
        sanitize,
        decode
    }
})();
