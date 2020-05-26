import { BoardState, BoardActionTypes, SET_ACTIVE_BOARD } from "./types";

const initialState: BoardState = {
    boardId: null,
    name: null
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    switch (action.type) {
        case SET_ACTIVE_BOARD: {
            return {
                ...state,
                boardId: action.payload.boardId,
                name: action.payload.name
            }
        }
        default:
            return state;
    }
}
