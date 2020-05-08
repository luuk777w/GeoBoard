class BoardElementViewModel {

    /**
     * The unique identifier of this board.
     */
    id: string;

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
    userId: string;

    // TODO: Add user model..

    /**
     * The date and time of when this board was created.
     */
    date: Date;

    public getDirection(): string
    {
        if (this.direction == null)
            return null;

        var output = "";

        return output;
    }
}
