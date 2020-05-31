import { SHOW_ALERT, HIDE_ALERT, SET_ALERT_TYPE, SET_ALERT_BODY, AlertState, AlertActionTypes, AlertType } from "./types";

const initialState: AlertState = {
    show: false,
    type: AlertType.Info,
    body: ''
}

export function alertReducer(state = initialState, action: AlertActionTypes): AlertState {
    switch (action.type) {
        case SHOW_ALERT: {
            return {
                ...state,
                show: true,
                type: action.payload.type,
                body: action.payload.body
            };
        }
        case HIDE_ALERT: {
            return {
                ...state,
                show: false
            };
        }
        case SET_ALERT_TYPE: {
            return {
                ...state,
                type: action.payload.type
            };
        }
        case SET_ALERT_BODY: {
            return {
                ...state,
                body: action.payload.body
            };
        }
        default:
            return state;
    }
}
