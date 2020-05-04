App.EmailConfirmation = (function () {

    // init
    const _init = function () {
        console.log("emailConfirmation");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("emailConfirmation");
    }

    const resendEmail = function () {

        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let email = urlParams.get('email');
        console.log(email);

        App.Helpers.toggleLoadingButton(`button`, true);

        App.Authorize.ResendActivationEmail(email).then(result => {

            App.Helpers.toggleLoadingButton(`button`, false);

        }, error => {

        });


        console.log("hoi");
    }

    return {
        init: _init,
        resendEmail
    }
})();

$('#view').on('click', '[data-target="resendEmail"]', App.EmailConfirmation.resendEmail);
