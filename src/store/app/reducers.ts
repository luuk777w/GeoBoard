import { TOGGLE_DARK_THEME, AppState, AppActionTypes } from "./types";

const initialState: AppState = {
    darkThemeIsActive: false
}

export function appReducers(state = initialState, action: AppActionTypes): AppState {
    switch (action.type) {
        case TOGGLE_DARK_THEME: {
            return {
                ...state,
                darkThemeIsActive: !state.darkThemeIsActive
            };
        }
        default:
            return state;
    }
}
