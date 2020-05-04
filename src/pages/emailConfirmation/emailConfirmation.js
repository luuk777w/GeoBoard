App.EmailConfirmation = (function () {

    // init
    const _init = function () {
        console.log("emailConfirmation");
        App.Template.setLayout("auth_layout");
        App.Template.loadhtml("emailConfirmation");

        let email = getEmailFromUrl();
        if (email == null || email == "")
        {
            App.Helpers.redirect('/login');
        }
    }

    const resendEmail = function () {

        let email = getEmailFromUrl();
        console.log(email);

        App.Helpers.toggleLoadingButton(`button`, true);

        App.Authorize.ResendActivationEmail(email).then(result => {

            App.Helpers.toggleLoadingButton(`button`, false);

        }, error => {

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
