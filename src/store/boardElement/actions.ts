import { SET_TEMP_IMAGE_BLOB } from "./types";

export function setTempImageBlob(tempImageBlob: string) {
    return {
        type: SET_TEMP_IMAGE_BLOB,
        payload: {
            tempImageBlob: tempImageBlob
        }
    }
}
