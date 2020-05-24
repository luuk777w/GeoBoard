import { SHOW, HIDE, SET_TYPE, SET_BODY, AlertType } from "./types";

export function showAlert() {
    return {
        type: SHOW,
        payload: {}
    }
}

export function hideAlert() {
    return {
        type: HIDE,
        payload: {}
    }
}

export function setAlertType(type: AlertType) {
    return {
        type: SET_TYPE,
        payload: {
            type: type
        }
    }
}

export function setAlertBody(body: string) {
    return {
        type: SET_BODY,
        payload: {
            body: body
        }
    }
}
