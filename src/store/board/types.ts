export interface BoardState {
    boardId: string | null;
    name: string | null;
}

export const SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD";

interface SetActiveBoardAction {
    type: typeof SET_ACTIVE_BOARD;
    payload: BoardState;
}

export type BoardActionTypes = SetActiveBoardAction;
