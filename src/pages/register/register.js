App.Register = (function () {

    // init
    const _init = function () {
        console.log("register");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("register");
        App.Template.setPageTitle("Create an account");
    }

    const goToLogin = function () {
        App.Helpers.redirect("/login");
    }

    const register = function () {
        let username = $("#username").val();
        let email = $("#email").val();
        let password = $("#password").val();

        let agreedToTerms = $("#terms").prop('checked');

        if (! agreedToTerms) {
            showError('.terms label', 'Please accept the terms of service to continu.')

            return;
        }

        App.Authorize.Register(username, email, password).done((result) => {
            //
        }).fail((error) => {
            console.log(error);
            $('.validation-error').remove();

            if (error.responseJSON) {

                for (let m in error.responseJSON) {
                    showError(`#${m.toLowerCase()}`, error.responseJSON[m][0]);
                }
            }
        });
    }

    const showError = function (field, message) {
        $(field).after(`<span class="validation-error">${message}</span>`);

        console.log($(`input${field}`), message);
    }

    return {
        init: _init,
        goToLogin,
        register
    }
})();

$(document).on('submit', '#registerForm', function (event) {
    event.preventDefault();

    App.Register.register();
});
$('#view').on('click', '[data-target="login"]', App.Register.goToLogin);
