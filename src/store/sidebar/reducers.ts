import { TOGGLE_SIDEBAR, SET_BOARDID, SidebarState, SidebarActionTypes } from "./types";

const initialState: SidebarState = {
    isOpen: true,
    activeBoardId: ''
}

export function sidebarReducer(state = initialState, action: SidebarActionTypes): SidebarState {
    switch (action.type) {
        case TOGGLE_SIDEBAR: {
            return {
                ...state,
                isOpen: !state.isOpen
            };
        }
        case SET_BOARDID: {
            return {
                ...state,
                activeBoardId: state.activeBoardId == action.payload.activeBoardId ? '' : action.payload.activeBoardId
            }
        }
        default:
            return state;
    }
}
