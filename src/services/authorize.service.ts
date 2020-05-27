import { singleton, container } from "tsyringe";
import { HttpService } from "./http.service";
import { LoginViewModel, RegisterViewModel } from "models/authViewModels";
import { JWTService } from "./jwt.service";

@singleton()
export class AuthorizeService {

    private httpService: HttpService;
    private JWTService: JWTService;

    constructor() {
        this.httpService = container.resolve(HttpService);
        this.JWTService = container.resolve(JWTService);
    }

    public async login(data: LoginViewModel) {
        return await this.httpService.post('/account/authorize', JSON.stringify(data));
    }

    public async register(data: RegisterViewModel) {
        return await this.httpService.post('/account/register', JSON.stringify(data));
    }

    public async resendActivationEmail(email: string) {
        return await this.httpService.post('/account/resend-activation-email', JSON.stringify({ email }));
    }

    public hasRole(role: string) {
        return (this.JWTService.getUserRole() == role);
    }

    public isAuthorized() {
        if (this.JWTService.getUserRole() == null || this.JWTService.getUserRole() == "" || this.JWTService.isTokenExpired()) {
            return false;
        } else {
            return true;
        }
    }
}
