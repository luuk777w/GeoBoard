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
                activeBoardId: state.activeBoardId == action.payload.activeBoardId ? null : action.payload.activeBoardId,
                activeBoardName: state.activeBoardId == action.payload.activeBoardId ? null : action.payload.activeBoardName
            }
        }
        default:
            return state;
    }
}
