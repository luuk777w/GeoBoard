export interface BoardState {
    activeBoardId: string;
    activeBoardName: string;
}

export const SET_ACTIVE_BOARD_ID = "SET_ACTIVE_BOARD_ID";
export const SET_ACTIVE_BOARD_NAME = "SET_ACTIVE_BOARD_NAME";


interface SetActiveBoardIdAction {
    type: typeof SET_ACTIVE_BOARD_ID;
    payload: BoardState;
}

interface SetActiveBoardNameAction {
    type: typeof SET_ACTIVE_BOARD_NAME;
    payload: BoardState;
}

export type BoardActionTypes = SetActiveBoardIdAction | SetActiveBoardNameAction;
