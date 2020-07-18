import { TOGGLE_DARK_THEME, UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN, SET_BACKGROUND_IMAGE_URL } from "./types";

export function setBackgroundImageUrl(url: string | null) {
    return {
        type: SET_BACKGROUND_IMAGE_URL,
        payload: {
            backgroundImageUrl: url
        }
    }
}

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
