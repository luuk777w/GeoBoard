import { BoardElementActionTypes, SET_TEMP_IMAGE_BLOB, BoardElementState } from "./types";

const initialState: BoardElementState = {
    tempImageBlob: ""
}

export function boardElementReducer(state = initialState, action: BoardElementActionTypes): BoardElementState {
    switch (action.type) {
        case SET_TEMP_IMAGE_BLOB: {
            return {
                ...state,
                tempImageBlob: action.payload.tempImageBlob
            }
        }
        default:
            return state;
    }
}
