import { BoardViewModel } from "models/BoardViewModel";

export interface ManageBoardModalState {
    isOpen: boolean,
    boardId: string | null;
}

export const SHOW_MANAGE_BOARD_MODAL = "SHOW_MANAGE_BOARD_MODAL";
export const HIDE_MANAGE_BOARD_MODAL = "HIDE_MANAGE_BOARD_MODAL";

interface ShowManageBoardModalAction {
    type: typeof SHOW_MANAGE_BOARD_MODAL;
    payload: ManageBoardModalState;
}

interface HideManageBoardModalAction {
    type: typeof HIDE_MANAGE_BOARD_MODAL;
    payload: ManageBoardModalState;
}

export type ManageBoardModalActionTypes = ShowManageBoardModalAction | HideManageBoardModalAction;
