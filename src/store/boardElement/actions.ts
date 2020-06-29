import { SET_TEMP_IMAGE_BLOB, SET_IMAGE_UPLOAD_PRECENTAGE } from "./types";

export function setTempImageBlob(tempImageBlob: string) {
    return {
        type: SET_TEMP_IMAGE_BLOB,
        payload: {
            tempImageBlob: tempImageBlob
        }
    }
}

export function setImageUploadPrecentage(imageUploadPrecentage: number) {
    return {
        type: SET_IMAGE_UPLOAD_PRECENTAGE,
        payload: {
            imageUploadPrecentage: imageUploadPrecentage
        }
    }
}
