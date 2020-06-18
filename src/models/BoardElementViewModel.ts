import { Direction } from "./Direction";
import { UserViewModel } from "./UserViewModel";

export class BoardElementViewModel {

    /**
     * The unique identifier of this element.
     */
    id: string;

    /**
     * The index number indicating the order in which this element was created within the board.
     */
    elementNumber: number;

    /**
     * The board where this element belongs to.
     */
    boardId: string;

    /**
     * The path to the image when available.
     */
    imageId?: string;

    /**
     * An optional note for this element.
     */
    note?: string;

    /**
     * The optional direction where the subject is taken from.
     */
    direction?: Direction;

    /**
     * The user who created this element.
     */
    userId: string;

    /**
     * The user who created this element.
     */
    user: UserViewModel;

    /**
     * The date and time of when this boardElement was created.
     */
    createdAt: Date;
}
