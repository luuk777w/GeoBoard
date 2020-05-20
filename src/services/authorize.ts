import { singleton, container } from "tsyringe";
import { HttpService } from "./http";

@singleton()
export class AuthorizeService {

    private httpService: HttpService;

    constructor() {
        this.httpService = container.resolve(HttpService);
    }

    public async login(username: string, password: string, remember: boolean) {
        return await this.httpService.post('/account/authorize', {
            username: username,
            password: password,
            rememberMe: remember
        });
    }
}
