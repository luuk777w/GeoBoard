import { TOGGLE_SIDEBAR, SET_BOARDID } from "./types";

export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR,
        payload: {}
    }
}

export function setBoardId(activeBoardId: string) {
    return {
        type: SET_BOARDID,
        payload: {
            activeBoardId: activeBoardId
        }
    }
}
