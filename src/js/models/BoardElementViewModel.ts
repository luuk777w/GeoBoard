class BoardElementViewModel {

    /**
     * The unique identifier of this element.
     */
    id: string;

    /**
     * The index number indicating the order in which this element was created within the board.
     */
    number: number;

    /**
     * The board where this element belongs to.
     */
    boardId: string;

    /**
     * The path to the image when available.
     */
    imagePath: string;

    /**
     * An optional note for this element.
     */
    note: string;

    /**
     * The optional direction where the subject is taken from.
     */
    direction?: Direction;

    /**
     * The user who created this element.
     */
    userId: object;

    // TODO: Add user model..
    user: any;

    /**
     * The date and time of when this board was created.
     */
    createdAt: Date;
}
