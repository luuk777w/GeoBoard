
import { BackgroundSwitchModalActionTypes, BackgroundSwitchModalState, SHOW_BACKGROUND_SWITCH_MODAL, HIDE_BACKGROUND_SWITCH_MODAL } from "./types";

const initialState: BackgroundSwitchModalState = {
    isOpen: false,
    imagePath: null
}

export function BackgroundSwitchModalReducer(state = initialState, action: BackgroundSwitchModalActionTypes): BackgroundSwitchModalState {
    switch (action.type) {
        case SHOW_BACKGROUND_SWITCH_MODAL: {
            return {
                ...state,
                isOpen: action.payload.isOpen
            }
        }
        case HIDE_BACKGROUND_SWITCH_MODAL: {
            return {
                ...state,
                isOpen: action.payload.isOpen
            }
        }
        default:
            return state;
    }
}
