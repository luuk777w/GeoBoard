export interface AlertState {
    show: boolean;
    type: AlertType;
    body: string;
    timeout: number;
}

export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";
export const SET_ALERT_TYPE = "SET_ALERT_TYPE";
export const SET_ALERT_BODY = "SET_ALERT_BODY";

interface ShowAction {
    type: typeof SHOW_ALERT;
    payload: AlertState;
}

interface HideAction {
    type: typeof HIDE_ALERT;
    payload: AlertState;
}

interface SetTypeAction {
    type: typeof SET_ALERT_TYPE;
    payload: AlertState;
}

interface SetBodyAction {
    type: typeof SET_ALERT_BODY;
    payload: AlertState;
}

export type AlertActionTypes = ShowAction | HideAction | SetTypeAction | SetBodyAction;

export enum AlertType {
    Info = "alert-info",
    Error = "alert-error",
    Warning = "alert-warning",
    Success = "alert-success"
}
