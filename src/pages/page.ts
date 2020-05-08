class Page {

    protected template: Template;
    protected authorize: Authorize;
    protected JWT: JWT;
    protected XHR: XHR;
    protected router: Router;

    constructor(router: Router) {
        this.template = new Template();
        this.authorize = Authorize.getInstance();
        this.JWT = JWT.getInstance();
        this.XHR = XHR.getInstance();
        this.router = router;
    }
}
