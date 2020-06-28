export interface SystemState {
    darkThemeIsActive: boolean;
}

export const TOGGLE_DARK_THEME = "TOGGLE_DARK_THEME";

interface ToggleDarkThemeAction {
    type: typeof TOGGLE_DARK_THEME;
    payload: SystemState;
}

export type SystemActionTypes = ToggleDarkThemeAction;
