class Template {

    private layout: string = "base_layout";
    private config: Config;

    constructor() {
        this.config = new Config();
    }

    public setLayout(layout: string) {


        if (typeof (window as any).Templates[layout] === "function") {
            this.layout = layout;
        } else {
            throw new Error("Layout does not exist.")
        }
    }

    public loadhtml(templateName: string, data: any = null) {
        if (typeof (window as any).Templates[templateName] === "function") {

            (window as any).Handlebars.registerPartial('body', (window as any).Templates[templateName](data));
            (window as any).Handlebars.registerHelper('formatDateTime', (date: Date) => {
                return date;
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

    public setPageTitle(title: string, withoutPrefix: boolean = false) {
        if (withoutPrefix) {
            document.title = title;
        }
        else {
            document.title = `${this.config.siteName} | ${title}`;
        }
    }
}
