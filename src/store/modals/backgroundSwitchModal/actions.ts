
import { SHOW_BACKGROUND_SWITCH_MODAL, HIDE_BACKGROUND_SWITCH_MODAL } from "./types"

export function showBackgroundSwitchModal() {
    return {
        type: SHOW_BACKGROUND_SWITCH_MODAL,
        payload: {
            isOpen: true
        }
    }
}

export function hideBackgroundSwitchModal() {
    return {
        type: HIDE_BACKGROUND_SWITCH_MODAL,
        payload: {
            isOpen: false
        }
    }
}
