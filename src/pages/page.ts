class Page {

    protected template: Template;
    protected authorize: Authorize;
    protected JWT: JWT;
    protected XHR: XHR;
    protected router: Router;

    constructor(router: Router) {
        this.template = new Template();
        this.authorize = new Authorize();
        this.JWT = new JWT();
        this.XHR = new XHR();
        this.router = router;
    }
}
