export interface BoardElementState {
    tempImageBlob: string;
    imageUploadPrecentage: number;
}

export const SET_TEMP_IMAGE_BLOB = "SET_TEMP_IMAGE_BLOB";
export const SET_IMAGE_UPLOAD_PRECENTAGE = "SET_IMAGE_UPLOAD_PRECENTAGE";

interface SetTempImageBlobAction {
    type: typeof SET_TEMP_IMAGE_BLOB;
    payload: BoardElementState;
}

interface SetTempImageUploadPrecentageAction {
    type: typeof SET_IMAGE_UPLOAD_PRECENTAGE;
    payload: BoardElementState;
}

export type BoardElementActionTypes = SetTempImageBlobAction | SetTempImageUploadPrecentageAction;
