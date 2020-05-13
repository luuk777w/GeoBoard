class Alert {

    /**
     * The scope where the alert element should be called.
     */
    private scope: string = null;

    constructor(scope: string = null) {
        this.scope = scope;
    }

    public show(className: string, message: string, animated: boolean = false) {
        const parent = this.getScope();

        $(`${parent}.alert`).children(".alert-body").text(message);
        $(`${parent}.alert`).addClass(className);
        $(`${parent}.alert`).removeClass("alert-hidden");

        if (animated) {

            $(`${parent}.alert`).slideDown(200, () => {
                $(`${parent}.alert`).show();
            });
        }
        else {
            $(`${parent}.alert`).show();
        }
    }

    public hide(animated: boolean = false) {
        const parent = this.getScope();

        $(`${parent}.alert`).attr('class', 'alert alert-hidden');

        if (animated) {
            $(`${parent}.alert`).slideUp(200, () => {
                $(`${parent}.alert`).hide();
            });
        }
        else {
            $(`${parent}.alert`).hide();
        }

        console.log($(`${parent}.alert`), `${parent}.alert`);
    }

    /**
     * Returns the scope (if any) including a leading space.
     */
    private getScope(): string {
        return (this.scope) ? `${this.scope} ` : '';
    }
}
