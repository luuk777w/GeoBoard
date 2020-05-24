import { singleton, container } from "tsyringe";
import { HttpService } from "./http.service";
import { LoginViewModel } from "models/authViewModels";

@singleton()
export class AuthorizeService {

    private httpService: HttpService;

    constructor() {
        this.httpService = container.resolve(HttpService);
    }

    public async login(data: LoginViewModel) {
        return await this.httpService.post('/account/authorize', JSON.stringify(data));
    }
}
