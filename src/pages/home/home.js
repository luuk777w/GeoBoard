App.Home = (function () {

    // init
    const _init = function () {
        console.log("home");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("home");
        App.Template.setPageTitle("{boardname}");

        // TODO: Call autosize when the 'new element' panel is shown

        $('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        let element = {
            id: "d8892794-2779-40d1-b664-c2535f8ccba0",
            number: "7",
            user: "Luuk",
            isImage: false,
            content: "He hallo",
            direction: "Noorden",
            timeStamp: "05-05-2020 01:50:00"
        }

        App.Home.Element.newElement(element);
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

        App.Router.redirect("/login");
    }

    return {
        init: _init,
        goaway,
        logout,
        comeHere
    }
})();

$('#view').on('click', '[data-target="logout"]', App.Home.logout);

$('#view').on('click', '[data-target="theme"]', function () {
    const view = $('.home-view');

    if (view.hasClass('dark-theme')) {
        view.removeClass('dark-theme');
        $('.logo-light').hide();
        $('.logo-dark').show();
    }
    else {
        view.addClass('dark-theme');
        $('.logo-dark').hide();
        $('.logo-light').show();
    }
});

$('#view').on('click', '[data-target="goaway"]', App.Home.goaway);
$('#view').on('click', '[data-target="comehere"]', App.Home.comeHere);
