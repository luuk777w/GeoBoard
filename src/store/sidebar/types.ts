export interface sidebarState {
    isOpen: boolean;
    activeBoardId: string;
}

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_BOARDID = "SET_BOARDID";

interface ToggleSidebarAction {
    type: typeof TOGGLE_SIDEBAR;
    payload: sidebarState;
}

interface SetBoardId {
    type: typeof SET_BOARDID;
    payload: sidebarState;
}

export type SidebarActionTypes = ToggleSidebarAction | SetBoardId;

//Wanneer er meer actions zijn defineer je dat alsvolgt:
//export type SidebarActioTypes = ToggleSidebarAction | ANDER_INTERFACE HIER | ETC
