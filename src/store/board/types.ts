export interface BoardState {
    activeBoardId: string;
    activeBoardName: string;
}

export const SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD";

interface SetActiveBoardAction {
    type: typeof SET_ACTIVE_BOARD;
    payload: BoardState;
}

export type BoardActionTypes = SetActiveBoardAction;
