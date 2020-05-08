class Template {

    private layout: string = "base_layout";
    private config: Config;

    constructor() {
        console.log("init template");
        this.config = new Config();
    }

    public setLayout(layout: string) {
        //if (typeof Templates[layout] === "function") {
        //    this.layout = layout;
        // } else {
        //     throw new Error("Layout does not exist.")
        //}
    }

    public loadhtml(templateName: string, data: any = null) {
        //if (typeof Templates[templateName] === "function") {
        //Handlebars.registerPartial('body', Templates[templateName](data));
        //document.getElementById('view').innerHTML = Templates[this.layout]();
        //$("#view").removeClass();
        //$("#view").addClass(`${templateName}-view`);
        //$("#view").addClass(this.layout.replace('_', '-'));

        //this.setPageTitle(this.config.siteName, true);
        //} else {
        //throw new Error("Template does not exist.")
        // }
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
