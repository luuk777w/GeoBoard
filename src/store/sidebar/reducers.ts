import { TOGGLE_SIDEBAR, SidebarState, SidebarActionTypes } from "./types";

const initialState: SidebarState = {
    isOpen: true,
}

export function sidebarReducer(state = initialState, action: SidebarActionTypes): SidebarState {
    switch (action.type) {
        case TOGGLE_SIDEBAR: {
            return {
                ...state,
                isOpen: !state.isOpen
            };
        }
        default:
            return state;
    }
}
