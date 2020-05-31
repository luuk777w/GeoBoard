import { SHOW_ANNOUNCEMENT, HIDE_ANNOUNCEMENT, SET_ANNOUNCEMENT_TYPE, SET_ANNOUNCEMENT_BODY, AnnouncementType } from "./types";

export function showAnnouncement(type?: AnnouncementType, body?: string) {
    return {
        type: SHOW_ANNOUNCEMENT,
        payload: {
            body: body,
            type: type
        }
    }
}

export function hideAnnouncement() {
    return {
        type: HIDE_ANNOUNCEMENT,
        payload: {}
    }
}

export function setAnnouncementType(type: AnnouncementType) {
    return {
        type: SET_ANNOUNCEMENT_TYPE,
        payload: {
            type: type
        }
    }
}

export function setAnnouncementBody(body: string) {
    return {
        type: SET_ANNOUNCEMENT_BODY,
        payload: {
            body: body
        }
    }
}
