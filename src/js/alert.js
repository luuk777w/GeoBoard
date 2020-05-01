App.Alert = (function () {

    const _init = function () {
        console.log("Alert");
    }

    const show = function (className, message) {
        $(".alert").children(".alert-body").text(message);
        $(".alert").addClass(className);
        $(".alert").removeClass("alert-hidden");
    }

    const hide = function () {
        $(".alert").attr('class', 'alert alert-hidden');
        $(".alert").hide();
    }

    return {
        init: _init,
        show,
        hide
    }
})();
