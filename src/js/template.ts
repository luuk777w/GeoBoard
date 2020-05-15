import * as Handlebars from 'handlebars'
import { Config } from './config';
import { Helpers } from './helpers';
import * as $ from 'jquery';

export class Template {

    private layout: string = "base_layout";
    private config: Config;
    private templates: any;

    constructor() {
        this.config = Config.getInstance();
        this.templates = require('../../dist/js/templates');
    }

    public setLayout(layout: string) {

        if (typeof this.templates[layout] === "function") {
            this.layout = layout;
        } else {
            throw new Error("Layout does not exist.")
        }
    }

    public loadHtml(templateName: string, data: any = null) {
        if (typeof this.templates[templateName] === "function") {

            Handlebars.registerHelper('ifEquals', (arg1: any, arg2: any, options: any) => {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            });

            Handlebars.registerPartial('body', this.templates[templateName](data));

            Handlebars.registerHelper('formatDateTime', (date: Date) => {
                return Helpers.DateToReadableString(date, true);
            });

            document.getElementById('view').innerHTML = this.templates[this.layout]();
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
