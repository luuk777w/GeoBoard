import { SHOW_ANNOUNCEMENT, HIDE_ANNOUNCEMENT, SET_ANNOUNCEMENT_TYPE, SET_ANNOUNCEMENT_BODY, AnnouncementType, AnnouncementActionTypes, AnnouncementState } from "./types";

const initialState: AnnouncementState = {
    show: false,
    type: AnnouncementType.Info,
    body: ''
}

export function announcementReducer(state = initialState, action: AnnouncementActionTypes): AnnouncementState {
    switch (action.type) {
        case SHOW_ANNOUNCEMENT: {
            return {
                ...state,
                show: true,
                type: action.payload.type,
                body: action.payload.body
            };
        }
        case HIDE_ANNOUNCEMENT: {
            return {
                ...state,
                show: false,
                body: ''
            };
        }
        case SET_ANNOUNCEMENT_TYPE: {
            return {
                ...state,
                type: action.payload.type
            };
        }
        case SET_ANNOUNCEMENT_BODY: {
            return {
                ...state,
                body: action.payload.body
            };
        }
        default:
            return state;
    }
}
