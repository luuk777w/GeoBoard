import { sidebarState, TOGGLE_SIDEBAR } from "./types";

export function toggleSidebar() {
    console.log("hoi");
    return {
        type: TOGGLE_SIDEBAR,
        payload: {}
    }
}
