App.EmailConfirmation = (function () {

    // init
    const _init = function () {
        console.log("emailConfirmation");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("emailConfirmation");

        let email = getEmailFromUrl();
        if (email == null || email == "")
        {
            App.Router.redirect('/login');
        }
    }

    const resendEmail = function () {

        let email = getEmailFromUrl();
        console.log(email);

        App.Helpers.toggleLoadingButton(`button`, true);

        App.Authorize.ResendActivationEmail(email).then(result => {

            App.Alert.show('alert-success', 'A new activation email has been sent.');
            App.Helpers.toggleLoadingButton(`button`, false);

        }, error => {
            App.Router.redirectWithAlert('/login', 'alert-error', 'Something went wrong while sending the confirmation email. Your account may be activated already.');
        });


        console.log("hoi");
    }

    const getEmailFromUrl = function () {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);

        return urlParams.get('email');
    }

    return {
        init: _init,
        resendEmail
    }
})();

$('#view').on('click', '[data-target="resendEmail"]', App.EmailConfirmation.resendEmail);
