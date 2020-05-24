import { singleton, container } from "tsyringe";
import { HttpService } from "./http.service";
import { LoginViewModel } from "models/authViewModels";
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

    public hasRole(role: string) {

        if (this.JWTService.getRole() == role) {
            return true;
        } else {
            return false;
        }
    }

    public isAuthorized() {

        if (this.JWTService.getRole() == null || this.JWTService.getRole() == "" || this.JWTService.isTokenExpired()) {
            return false;
        } else {
            return true;
        }
    }
}
