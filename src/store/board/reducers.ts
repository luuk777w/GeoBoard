import { BoardState, BoardActionTypes, SET_ACTIVE_BOARD_ID, SET_ACTIVE_BOARD_NAME } from "./types";

const initialState: BoardState = {
    activeBoardId: '',
    activeBoardName: ''
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    switch (action.type) {
        case SET_ACTIVE_BOARD_ID: {
            return {
                ...state,
                activeBoardId: state.activeBoardId == action.payload.activeBoardId ? '' : action.payload.activeBoardId
            }
        }
        case SET_ACTIVE_BOARD_NAME: {
            return {
                ...state,
                activeBoardName: state.activeBoardId == action.payload.activeBoardId ? '' : action.payload.activeBoardName
            };
        }
        default:
            return state;
    }
}
