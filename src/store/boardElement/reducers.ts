import { BoardElementActionTypes, SET_TEMP_IMAGE_BLOB, BoardElementState, SET_IMAGE_UPLOAD_PRECENTAGE } from "./types";

const initialState: BoardElementState = {
    tempImageBlob: "",
    imageUploadPrecentage: 0
}

export function boardElementReducer(state = initialState, action: BoardElementActionTypes): BoardElementState {
    switch (action.type) {
        case SET_TEMP_IMAGE_BLOB: {
            return {
                ...state,
                tempImageBlob: action.payload.tempImageBlob
            }
        }
        case SET_IMAGE_UPLOAD_PRECENTAGE: {
            return {
                ...state,
                imageUploadPrecentage: action.payload.imageUploadPrecentage
            }
        }
        default:
            return state;
    }
}
