import { TOGGLE_DARK_THEME, SystemState, SystemActionTypes, UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN, SET_BACKGROUND_IMAGE_URL } from "./types";

const initialState: SystemState = {
    backgroundImage: null,
    darkThemeIsActive: false,
    accessToken: null,
    refreshToken: null
}

export function systemReducers(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
        case SET_BACKGROUND_IMAGE_URL: {
            return {
                ...state,
                backgroundImage: action.payload.backgroundImage
            };
        }
        case TOGGLE_DARK_THEME: {
            return {
                ...state,
                darkThemeIsActive: !state.darkThemeIsActive
            };
        }
        case UPDATE_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.payload.accessToken
            };
        }
        case UPDATE_REFRESH_TOKEN: {
            return {
                ...state,
                refreshToken: action.payload.refreshToken
            };
        }
        default:
            return state;
    }
}
