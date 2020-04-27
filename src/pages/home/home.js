App.Home = (function () {

    // init
    const _init = function () {
        console.log("home");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("home");
    }

    return {
        init: _init
    }
})();

$('#view').on('click', '[data-target="logout"]', function () {
    App.JWT.clear();

    App.Helpers.redirect("/login");
});
