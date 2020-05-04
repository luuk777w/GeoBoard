App.Activate = (function () {

    // init
    const _init = function () {

        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let email = urlParams.get('email');
        let token = urlParams.get('token');

        App.Authorize.Activate(email, encodeURIComponent(token)).then(result => {

            App.Helpers.redirect("/login");

        }, error => {
            console.log("activate");
            App.Template.setLayout("auth_layout");
            App.Template.loadhtml("activate");
        });


    }

    return {
        init: _init
    }
})();
