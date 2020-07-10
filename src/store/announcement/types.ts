export interface AnnouncementState {
    show: boolean;
    type: AnnouncementType;
    body: string;
}

export const SHOW_ANNOUNCEMENT = "SHOW_ANNOUNCEMENT";
export const HIDE_ANNOUNCEMENT = "HIDE_ANNOUNCEMENT";
export const SET_ANNOUNCEMENT_TYPE = "SET_ANNOUNCEMENT_TYPE";
export const SET_ANNOUNCEMENT_BODY = "SET_ANNOUNCEMENT_BODY";

interface ShowAction {
    type: typeof SHOW_ANNOUNCEMENT;
    payload: AnnouncementState;
}

interface HideAction {
    type: typeof HIDE_ANNOUNCEMENT;
    payload: AnnouncementState;
}

interface SetTypeAction {
    type: typeof SET_ANNOUNCEMENT_TYPE;
    payload: AnnouncementState;
}

interface SetBodyAction {
    type: typeof SET_ANNOUNCEMENT_BODY;
    payload: AnnouncementState;
}

export type AnnouncementActionTypes = ShowAction | HideAction | SetTypeAction | SetBodyAction;

export enum AnnouncementType {
    Info = "announcement-info",
    Error = "announcement-error",
    Warning = "announcement-warning",
    Success = "announcement-success"
}
