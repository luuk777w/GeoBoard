import { SHOW, HIDE, SET_TYPE, SET_BODY, AlertState, AlertActionTypes, AlertType } from "./types";

const initialState: AlertState = {
    show: false,
    type: AlertType.Info,
    body: ''
}

export function alertReducer(state = initialState, action: AlertActionTypes): AlertState {
    switch (action.type) {
        case SHOW: {
            return {
                ...state,
                show: true
            };
        }
        case HIDE: {
            return {
                ...state,
                show: false
            };
        }
        case SET_TYPE: {
            return {
                ...state,
                type: action.payload.type
            };
        }
        case SET_BODY: {
            return {
                ...state,
                body: action.payload.body
            };
        }
        default:
            return state;
    }
}
