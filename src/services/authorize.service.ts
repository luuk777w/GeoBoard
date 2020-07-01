import { singleton, container } from "tsyringe";
import { HttpService } from "./http.service";
import { LoginViewModel, RegisterViewModel, AuthenticationResultViewModel } from "models/authViewModels";
import { JWTService } from "./jwt.service";
import { store } from "store";
import { showAlert } from "store/alert/actions";
import { AlertType } from "store/alert/types";

@singleton()
export class AuthorizeService {

    private httpService: HttpService;
    private jwtService: JWTService;

    constructor() {
        this.httpService = container.resolve(HttpService);
        this.jwtService = container.resolve(JWTService);
    }

    public async login(data: LoginViewModel) {
        return await this.httpService.post('/account/authorize', JSON.stringify(data));
    }

    public async register(data: RegisterViewModel) {
        return await this.httpService.post('/account/register', JSON.stringify(data));
    }

    public async logout() {
        const data = { jwtId: this.jwtService.getJwtId() };

        return await this.httpService.postWithAuthorization('/account/logout', JSON.stringify(data));
    }

    public async resendActivationEmail(email: string) {
        return await this.httpService.post('/account/resend-activation-email', JSON.stringify({ email }));
    }

    public async activateAccount(email: string, token: string) {
        return await this.httpService.get(`/account/activate?email=${email}&token=${token}`);
    }

    public async refreshAccessToken(accessToken: string, refreshToken: string): Promise<AuthenticationResultViewModel> {
        return await this.httpService.post<AuthenticationResultViewModel>('/account/refresh', JSON.stringify({ accessToken, refreshToken }));
    }

    public hasRole(role: string) {
        return (this.jwtService.getUserRole() == role);
    }

    public async isAuthorized(): Promise<boolean> {

        return new Promise(async (resolve, reject) => {

            if (this.jwtService.getUserRole() == null || this.jwtService.getUserRole() == "" || this.jwtService.isAccessTokenExpired()) {

                if (this.jwtService.isAccessTokenExpired()) {

                    const accessToken = this.jwtService.getAccessToken();
                    const refreshToken = this.jwtService.getRefreshToken();

                    if (accessToken != null && refreshToken != null && accessToken != "" && refreshToken != "") {

                        await this.refreshAccessToken(accessToken, refreshToken)
                            .then((response: AuthenticationResultViewModel) => {

                                // Store the new tokens.
                                this.jwtService.setAccessToken(response.accessToken);
                                this.jwtService.setRefreshToken(response.refreshToken);

                                // The user is still authorized after the access token has been refreshed using a valid refresh token.
                                resolve(true);
                            })
                            .catch(async (error: any) => {
                                console.log('Something went wrong while refreshing the token');

                                // Log the user out.
                                await this.logout().finally(() => {
                                    this.jwtService.clearTokens();
                                });

                                // TODO: Set session ended message.
                                store.store.dispatch(showAlert(AlertType.Warning, "Session expired. Please log in again."));
                            });
                    }
                }

                // The user does not seem to have a valid role or one of the tokens is not valid.
                // Log the user out just in case something got corrupted.
                reject(false);

            }

            // The access token is not expired. The user is authenticated.
            resolve(true);
        })
    }
}
