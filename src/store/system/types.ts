export interface SystemState {
    darkThemeIsActive: boolean;
}

export const TOGGLE_DARK_THEME = "TOGGLE_DARK_THEME";

interface ToggleDarkThemeAction {
    type: typeof TOGGLE_DARK_THEME;
    payload: SystemState;
}

export type SystemActionTypes = ToggleDarkThemeAction;

//Wanneer er meer actions zijn defineer je dat alsvolgt:
//export type SidebarActioTypes = ToggleSidebarAction | ANDER_INTERFACE HIER | ETC
