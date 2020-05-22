export interface sidebarState {
    isOpen: boolean;
}

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

interface ToggleSidebarAction {
    type: typeof TOGGLE_SIDEBAR;
    payload: sidebarState;
}

export type SidebarActionTypes = ToggleSidebarAction;

//Wanneer er meer actions zijn defineer je dat alsvolgt:
//export type SidebarActioTypes = ToggleSidebarAction | ANDER_INTERFACE HIER | ETC
