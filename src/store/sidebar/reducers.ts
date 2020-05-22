import { TOGGLE_SIDEBAR, sidebarState, SidebarActionTypes } from "./types";

const initialState: sidebarState = {
    isOpen: false
}

export function sidebarReducer(state = initialState, action: SidebarActionTypes): sidebarState {
    switch (action.type) {
        case TOGGLE_SIDEBAR: {
            console.log("Haai");
            return {
                ...state,
                isOpen: !state.isOpen
            };
        }
        default:
            return state;
    }
}
