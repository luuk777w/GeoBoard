import { TOGGLE_DARK_THEME, UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN } from "./types";

export function toggleDarkTheme() {
    return {
        type: TOGGLE_DARK_THEME,
        payload: {}
    }
}

export function updateAccessToken(token: string | null) {
    return {
        type: UPDATE_ACCESS_TOKEN,
        payload: {
            accessToken: token
        }
    }
}

export function updateRefreshToken(token: string | null) {
    return {
        type: UPDATE_REFRESH_TOKEN,
        payload: {
            refreshToken: token
        }
    }
}
