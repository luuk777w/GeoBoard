import { SET_ACTIVE_BOARD, SET_JOINED_USERS } from "./types"
import { BoardUserViewModel } from "models/BoardUserViewModel"

export function setActiveBoard(boardId: string | null, boardName: string | null) {
    return {
        type: SET_ACTIVE_BOARD,
        payload: {
            boardId: boardId,
            name: boardName
        }
    }
}

export function setJoinedUsers(users: Array<BoardUserViewModel>) {
    return {
        type: SET_JOINED_USERS,
        payload: {
            joinedUsers: users
        }
    }
}
