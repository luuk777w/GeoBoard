import { SET_ACTIVE_BOARD_ID, SET_ACTIVE_BOARD_NAME } from "./types"

export function setActiveBoardId(activeBoardId: string) {
    return {
        type: SET_ACTIVE_BOARD_ID,
        payload: {
            activeBoardId: activeBoardId
        }
    }
}

export function setActiveBoardName(activeBoardName: string) {
    return {
        type: SET_ACTIVE_BOARD_NAME,
        payload: {
            activeBoardName: activeBoardName
        }
    }
}
