import { SHOW_ALERT, HIDE_ALERT, SET_ALERT_TYPE, SET_ALERT_BODY, AlertType } from "./types";

export function showAlert(type?: AlertType, body?: string, timeout?: number) {
    return {
        type: SHOW_ALERT,
        payload: {
            body: body,
            type: type,
            timeout: timeout
        }
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT,
        payload: {}
    }
}

export function setAlertType(type: AlertType) {
    return {
        type: SET_ALERT_TYPE,
        payload: {
            type: type
        }
    }
}

export function setAlertBody(body: string) {
    return {
        type: SET_ALERT_BODY,
        payload: {
            body: body
        }
    }
}
