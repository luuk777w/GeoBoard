import { SET_ACTIVE_BOARD } from "./types"

export function setActiveBoard(boardId: string | null, boardName: string | null) {
    return {
        type: SET_ACTIVE_BOARD,
        payload: {
            boardId: boardId,
            name: boardName
        }
    }
}
