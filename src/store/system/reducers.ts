import { TOGGLE_DARK_THEME, SystemState, SystemActionTypes, UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN } from "./types";

const initialState: SystemState = {
    darkThemeIsActive: false,
    accessToken: null,
    refreshToken: null
}

export function systemReducers(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
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
