App.Home = (function () {

    // init
    const _init = function () {
        console.log("home");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("home");
    }

    const goaway = function () {
        console.log("Hoi");
        $(".side-nav").removeClass("slideInRight");
        $(".side-nav").addClass("slideOutRight");

        setTimeout(function () {
            $(".side-nav").hide();
        }, 300);
    }

    const comeHere = function () {
        console.log("Hoi");
        $(".side-nav").show();
        $(".side-nav").removeClass("slideOutRight");
        $(".side-nav").addClass("slideInRight");
    }

    const logout = function () {
        App.JWT.clear();

        App.Helpers.redirect("/login");
    }

    return {
        init: _init,
        goaway,
        logout,
        comeHere
    }
})();

$('#view').on('click', '[data-target="logout"]', App.Home.logout);

$('#view').on('click', '[data-target="goaway"]', App.Home.goaway);
$('#view').on('click', '[data-target="comehere"]', App.Home.comeHere);
