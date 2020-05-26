import { SET_ACTIVE_BOARD } from "./types"

export function setActiveBoard(boardId: string, boardName: string) {
    return {
        type: SET_ACTIVE_BOARD,
        payload: {
            activeBoardId: boardId,
            activeBoardName: boardName
        }
    }
}
