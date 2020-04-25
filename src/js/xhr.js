App.XHR = (function () {

    let configMap = {
    }

    const _init = function () {
        console.log("XHR");
    }

    const get = function (url) {
        return $.ajax({
            type: "get",
            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    const post = function (url, data = null) {
        return $.ajax({
            type: "post",
            data: data,
            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    const put = function (url, data = null) {
        return $.ajax({
            type: "put",
            data: data,
            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    const del = function (url) {
        return $.ajax({
            type: "delete",

            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    const getWithAuthorization = function (url) {
        return $.ajax({
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + App.JWT.get());
            },
            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    const postWithAuthorization = function (url, data = null) {
        return $.ajax({
            type: "post",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + App.JWT.get());
            },
            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    const putWithAuthorization = function (url, data = null) {
        return $.ajax({
            type: "put",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + App.JWT.get());
            },
            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    const deleteWithAuthorization = function (url) {
        return $.ajax({
            type: "delete",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + App.JWT.get());
            },
            url: `${App.configMap.apiUrl}${url}`,
            contentType: "application/json"
        });
    }

    return {
        init: _init,
        getWithAuthorization,
        postWithAuthorization,
        putWithAuthorization,
        deleteWithAuthorization,
        get,
        post,
        put,
        del
    }
})();