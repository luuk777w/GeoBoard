import { BoardState, BoardActionTypes, SET_ACTIVE_BOARD } from "./types";

const initialState: BoardState = {
    activeBoardId: '',
    activeBoardName: ''
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    switch (action.type) {
        case SET_ACTIVE_BOARD: {
            return {
                ...state,
                activeBoardId: state.activeBoardId == action.payload.activeBoardId ? '' : action.payload.activeBoardId,
                activeBoardName: state.activeBoardId == action.payload.activeBoardId ? '' : action.payload.activeBoardName
            }
        }
        default:
            return state;
    }
}
