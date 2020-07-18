export interface BackgroundSwitchModalState {
    isOpen: boolean,
    imagePath: string | null;
}

export const SHOW_BACKGROUND_SWITCH_MODAL = "SHOW_BACKGROUND_SWITCH_MODAL";
export const HIDE_BACKGROUND_SWITCH_MODAL = "HIDE_BACKGROUND_SWITCH_MODAL";

interface ShowBackgroundSwitchModalAction {
    type: typeof SHOW_BACKGROUND_SWITCH_MODAL;
    payload: BackgroundSwitchModalState;
}

interface HideBackgroundSwitchModalAction {
    type: typeof HIDE_BACKGROUND_SWITCH_MODAL;
    payload: BackgroundSwitchModalState;
}

export type BackgroundSwitchModalActionTypes = ShowBackgroundSwitchModalAction | HideBackgroundSwitchModalAction;
