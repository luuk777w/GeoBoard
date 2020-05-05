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

    const sidebar = function () {
        $(".side-nav").show();
        $(".side-nav").removeClass("slideOutRight");
        $(".side-nav").addClass("slideInRight");
    }

    const closeSidebar = function () {
        $(".side-nav").removeClass("slideInRight");
        $(".side-nav").addClass("slideOutRight");

        setTimeout(function () {
            $(".side-nav").hide();
        }, 300);
    }

    const createBoard = function () {
        let boardName = prompt('What is the name of this new board?');

        if (boardName.trim() != "") {
            console.info(`Nieuwe board: ${boardName}`);

            let data = {
                name: boardName
            };

            App.XHR.postWithAuthorization(`/boards`, JSON.stringify(data)).then(result => {

                alert("Board created");

            }, error => {
                console.warn(error);
            });
        }
    }

    const logout = function () {
        App.JWT.clear();

        App.Router.redirect("/login");
    }

    return {
        init: _init,
        logout,
        sidebar,
        closeSidebar,
        createBoard
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

$('#view').on('click', '[data-target="closeSidebar"]', App.Home.closeSidebar);
$('#view').on('click', '[data-target="sidebar"]', App.Home.sidebar);
$('#view').on('click', '[data-target="createBoard"]', App.Home.createBoard);
