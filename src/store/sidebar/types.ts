export interface SidebarState {
    isOpen: boolean;
    activeBoardId: string;
}

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_BOARDID = "SET_BOARDID";

interface ToggleSidebarAction {
    type: typeof TOGGLE_SIDEBAR;
    payload: SidebarState;
}

interface SetBoardIdAction {
    type: typeof SET_BOARDID;
    payload: SidebarState;
}

export type SidebarActionTypes = ToggleSidebarAction | SetBoardIdAction;

//Wanneer er meer actions zijn defineer je dat alsvolgt:
//export type SidebarActioTypes = ToggleSidebarAction | ANDER_INTERFACE HIER | ETC
