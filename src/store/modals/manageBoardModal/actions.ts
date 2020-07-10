
import { SHOW_MANAGE_BOARD_MODAL, HIDE_MANAGE_BOARD_MODAL } from "./types"

export function showManageBoardModal(boardId: string) {
    return {
        type: SHOW_MANAGE_BOARD_MODAL,
        payload: {
            isOpen: true,
            boardId: boardId
        }
    }
}

export function hideManageBoardModal() {
    return {
        type: HIDE_MANAGE_BOARD_MODAL,
        payload: {
            isOpen: false,
            boardId: null
        }
    }
}
