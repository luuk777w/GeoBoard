export interface SystemState {
    darkThemeIsActive: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

export const TOGGLE_DARK_THEME = "TOGGLE_DARK_THEME";
export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";
export const UPDATE_REFRESH_TOKEN = "UPDATE_REFRESH_TOKEN";

interface ToggleDarkThemeAction {
    type: typeof TOGGLE_DARK_THEME;
    payload: SystemState;
}

interface UpdateAccessTokenAction {
    type: typeof UPDATE_ACCESS_TOKEN;
    payload: SystemState;
}

interface UpdateRefreshTokenAction {
    type: typeof UPDATE_REFRESH_TOKEN;
    payload: SystemState;
}

export type SystemActionTypes = ToggleDarkThemeAction | UpdateAccessTokenAction | UpdateRefreshTokenAction;
