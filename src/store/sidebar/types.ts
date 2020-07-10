export interface SidebarState {
    isOpen: boolean;
}

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_BOARDID = "SET_BOARDID";

interface ToggleSidebarAction {
    type: typeof TOGGLE_SIDEBAR;
    payload: SidebarState;
}

export type SidebarActionTypes = ToggleSidebarAction;

//Wanneer er meer actions zijn defineer je dat alsvolgt:
//export type SidebarActioTypes = ToggleSidebarAction | ANDER_INTERFACE HIER | ETC
