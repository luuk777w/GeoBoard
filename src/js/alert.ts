class Alert {

    /**
     * The scope where the alert element should be called.
     */
    private scope: string = null;

    constructor(scope: string = null) {
        this.scope = scope;
    }

    public show = function (className: string, message: string) {
        const parent = this.getScope();

        $(`${parent}.alert`).children(".alert-body").text(message);
        $(`${parent}.alert`).addClass(className);
        $(`${parent}.alert`).removeClass("alert-hidden");
    }

    public hide = function () {
        const parent = this.getScope();

        $(`${parent}.alert`).attr('class', 'alert alert-hidden');
        $(`${parent}.alert`).hide();
    }

    /**
     * Returns the scope (if any) including a leading space.
     */
    private getScope(): string {
        return (this.scope) ? `${this.scope} ` : '';
    }
}
