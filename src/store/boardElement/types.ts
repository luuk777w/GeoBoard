export interface BoardElementState {
    tempImageBlob: string;
}

export const SET_TEMP_IMAGE_BLOB = "SET_TEMP_IMAGE_BLOB";


interface SetTempImageBlobAction {
    type: typeof SET_TEMP_IMAGE_BLOB;
    payload: BoardElementState;
}

export type BoardElementActionTypes = SetTempImageBlobAction;
