export interface AlertState {
    show: boolean;
    type: AlertType;
    body: string;
}

export const SHOW = "SHOW";
export const HIDE = "HIDE";
export const SET_TYPE = "SET_TYPE";
export const SET_BODY = "SET_BODY";

interface ShowAction {
    type: typeof SHOW;
    payload: AlertState;
}

interface HideAction {
    type: typeof HIDE;
    payload: AlertState;
}

interface SetTypeAction {
    type: typeof SET_TYPE;
    payload: AlertState;
}

interface SetBodyAction {
    type: typeof SET_BODY;
    payload: AlertState;
}

export type AlertActionTypes = ShowAction | HideAction | SetTypeAction | SetBodyAction;

export enum AlertType {
    Info = "alert-info",
    Error = "alert-error",
    Warning = "alert-warning",
    Success = "alert-success"
}
