import { BoardState, BoardActionTypes, SET_ACTIVE_BOARD } from "./types";

const initialState: BoardState = {
    activeBoardId: null,
    activeBoardName: null
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    switch (action.type) {
        case SET_ACTIVE_BOARD: {
            return {
                ...state,
                activeBoardId: action.payload.activeBoardId,
                activeBoardName: action.payload.activeBoardName
            }
        }
        default:
            return state;
    }
}
