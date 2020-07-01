export interface LoginViewModel {
    userName: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterViewModel {
    userName: string;
    email: string;
    password: string;
}

export interface AuthenticationResultViewModel {
    accessToken: string;
    refreshToken: string;
}
