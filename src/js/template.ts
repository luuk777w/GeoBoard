class Template {

    private layout: string = "base_layout";
    private config: Config;

    constructor() {
        this.config = Config.getInstance();

        console.log("Hoi");
    }

    public setLayout(layout: string) {


        if (typeof (window as any).Templates[layout] === "function") {
            this.layout = layout;
        } else {
            throw new Error("Layout does not exist.")
        }
    }

    public loadHtml(templateName: string, data: any = null) {
        if (typeof (window as any).Templates[templateName] === "function") {

            (window as any).Handlebars.registerHelper('ifEquals', (arg1: any, arg2: any, options: any) => {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            });

            (window as any).Handlebars.registerPartial('body', (window as any).Templates[templateName](data));

            (window as any).Handlebars.registerHelper('formatDateTime', (date: Date) => {
                return new Date(date).toReadableString(true);
            });

            document.getElementById('view').innerHTML = (window as any).Templates[this.layout]();
            $("#view").removeClass();
            $("#view").addClass(`${templateName}-view`);
            $("#view").addClass(this.layout.replace('_', '-'));

            this.setPageTitle(this.config.siteName, true);
        } else {
            throw new Error("Template does not exist.")
        }
    }

    /**
     * Set the browser tab site title.
     *
     * @param title The title to show in the browser tab.
     * @param withoutSuffix Whether or not the sitename should be appended to the title.
     */
    public setPageTitle(title: string, withoutSuffix: boolean = false) {
        if (withoutSuffix) {
            document.title = title;
        }
        else {
            document.title = `${title} | ${this.config.siteName}`;
        }
    }
}
