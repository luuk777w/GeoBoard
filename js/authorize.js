App.Authorize = (function () {

    let configMap = {

    }

    const _init = function () {
        console.log("Authorize");
    }

    const Login = function (username, password, OTP) {
        return $.ajax({
            type: "post",
            url: `${App.configMap.apiUrl}/account/authorize/`,
            data: `{"username": "${username}", "password": "${password}", "OTP": ${OTP}}`,
            contentType: "application/json",
        });
    }

    const Register = function (username, email, password) {
        return $.ajax({
            type: "post",
            url: `${App.configMap.apiUrl}/account/register/`,
            data: `{"username": "${username}", "password": "${password}", "email": "${email}"}`,
            contentType: "application/json",
        });
    }

    const RequestPasswordReset = function (username) {
        return $.ajax({
            type: "post",
            url: `${App.configMap.apiUrl}/account/RequestPasswordReset/`,
            data: `{"username": "${username}"}`,
            contentType: "application/json",
        });
    }

    const ResetPassword = function (email, password, token) {
        return $.ajax({
            type: "post",
            url: `${App.configMap.apiUrl}/account/ResetPassword/`,
            data: `{"token": "${token}", "password": "${password}", "email": "${email}"}`,
            contentType: "application/json",
        });
    }

    const HasRole = function (role) {

        if (App.JWT.getRole() == role) {
            return true;
        } else {
            return false;
        }
    }

    const IsLoggedIn = function () {

        if (App.JWT.getRole() == null || App.JWT.getRole() == "") {
            return false;
        } else {
            return true;
        }
    }

    return {
        init: _init,
        Login,
        HasRole,
        IsLoggedIn,
        Register,
        RequestPasswordReset,
        ResetPassword
    }
})();