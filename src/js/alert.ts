class Alert {

    constructor() {
        console.log("Alert");
    }

    public show = function (className: string, message: string) {
        $(".alert").children(".alert-body").text(message);
        $(".alert").addClass(className);
        $(".alert").removeClass("alert-hidden");
    }

    public hide = function () {
        $(".alert").attr('class', 'alert alert-hidden');
        $(".alert").hide();
    }

}
