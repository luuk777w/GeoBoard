import { BoardState, BoardActionTypes, SET_ACTIVE_BOARD, SET_JOINED_USERS } from "./types";

const initialState: BoardState = {
    boardId: null,
    name: null,
    joinedUsers: []
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    switch (action.type) {
        case SET_ACTIVE_BOARD: {
            return {
                ...state,
                boardId: action.payload.boardId,
                name: action.payload.name,
            }
        }
        case SET_JOINED_USERS: {
            return {
                ...state,
                joinedUsers: action.payload.joinedUsers
            }
        }
        default:
            return state;
    }
}
