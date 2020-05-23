import { TOGGLE_DARK_THEME } from "./types";

export function toggleDarkTheme() {
    return {
        type: TOGGLE_DARK_THEME,
        payload: {}
    }
}
