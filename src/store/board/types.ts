import { BoardUserViewModel } from "models/BoardUserViewModel";

export interface BoardState {
    boardId: string | null;
    name: string | null;
    joinedUsers: Array<BoardUserViewModel>
}

export const SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD";
export const SET_JOINED_USERS = "SET_JOINED_USERS";

interface SetActiveBoardAction {
    type: typeof SET_ACTIVE_BOARD;
    payload: BoardState;
}

interface SetJoinedUsersAction {
    type: typeof SET_JOINED_USERS;
    payload: BoardState;
}

export type BoardActionTypes = SetActiveBoardAction | SetJoinedUsersAction;
