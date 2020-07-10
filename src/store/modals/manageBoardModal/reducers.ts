
import { ManageBoardModalActionTypes, ManageBoardModalState, SHOW_MANAGE_BOARD_MODAL, HIDE_MANAGE_BOARD_MODAL } from "./types";

const initialState: ManageBoardModalState = {
    isOpen: false,
    boardId: null
}

export function manageBoardModalReducer(state = initialState, action: ManageBoardModalActionTypes): ManageBoardModalState {
    switch (action.type) {
        case SHOW_MANAGE_BOARD_MODAL: {
            return {
                ...state,
                isOpen: action.payload.isOpen,
                boardId: action.payload.boardId
            }
        }
        case HIDE_MANAGE_BOARD_MODAL: {
            return {
                ...state,
                isOpen: action.payload.isOpen,
                boardId: action.payload.boardId
            }
        }
        default:
            return state;
    }
}
