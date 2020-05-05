App.Home.Element = (function () {

    const defaultElement = {
        id: "00000000-0000-0000-000-00000000000",
        number: "#",
        user: "USER_NAME",
        isImage: false,
        content: "CONTENT HERE",
        direction: "Noorden",
        timeStamp: "00-00-2020 00:00:00"
    }

    // init
    const _init = function () {
        console.log("Hoi");
    }

    const newElement = function (element = defaultElement) {
        console.log("Hoi");

        let out = Handlebars.compile(App.Templates["element"](element));
        $(".board-elements").prepend(out());
        $(`#${element.id}`).find('[data-target="remove"]').click(() => removeElement(element.id));
    }

    const removeElement = function (id) {
        $(`#${id}`).slideUp(200, () => {
            $(`#${id}`).remove();
        });
    }

    return {
        init: _init,
        newElement
    }
})();
