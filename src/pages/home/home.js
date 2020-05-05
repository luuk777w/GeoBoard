App.Home = (function () {

    // init
    const _init = function () {
        console.log("home");
        App.Template.setLayout("base_layout");
        App.Template.loadhtml("home");
        App.Template.setPageTitle("{boardname}");

        // Load the current color theme.
        loadTheme();

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
        };

        App.Home.Element.newElement(element);
    }

    const toggleTheme = function () {
        let currentTheme = localStorage.getItem('theme') ?? 'light';

        if (currentTheme == 'light')
            currentTheme = 'dark';
        else
            currentTheme = 'light';

        localStorage.setItem('theme', currentTheme);

        loadTheme();
    }

    const loadTheme = function () {
        const currentTheme = localStorage.getItem('theme') ?? 'light';
        const view = $('.home-view');

        if (currentTheme == 'dark') {
            view.addClass('dark-theme');
            $('.logo-dark').hide();
            $('.logo-light').show();

            $('[data-target="theme"]').html(`<i class="far fa-sun fa-lg fa-fw"></i>`);
        }
        else {
            view.removeClass('dark-theme');
            $('.logo-light').hide();
            $('.logo-dark').show();
            $('[data-target="theme"]').html(`<i class="fas fa-moon fa-lg fa-fw"></i>`);
        }
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
        toggleTheme,
        logout,
        sidebar,
        closeSidebar,
        createBoard
    }
})();

$('#view').on('click', '[data-target="logout"]', App.Home.logout);

$('#view').on('click', '[data-target="theme"]', App.Home.toggleTheme);

$('#view').on('click', '[data-target="closeSidebar"]', App.Home.closeSidebar);
$('#view').on('click', '[data-target="sidebar"]', App.Home.sidebar);
$('#view').on('click', '[data-target="createBoard"]', App.Home.createBoard);
