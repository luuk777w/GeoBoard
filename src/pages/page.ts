import { Authorize } from "../js/authorize";
import { JWT } from "../js/jwt";
import { XHR } from "../js/xhr";
import { Router } from "../js/router";
import { Template } from "../js/template";

export class Page {

    protected template: Template;
    protected authorize: Authorize;
    protected JWT: JWT;
    protected XHR: XHR;
    protected router: Router;

    constructor() {
        this.template = new Template();
        this.authorize = Authorize.getInstance();
        this.JWT = JWT.getInstance();
        this.XHR = XHR.getInstance();
        this.router = Router.getInstance();
    }
}
