import { TOGGLE_DARK_THEME, SystemState, SystemActionTypes } from "./types";

const initialState: SystemState = {
    darkThemeIsActive: false
}

export function systemReducers(state = initialState, action: SystemActionTypes): SystemState {
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
