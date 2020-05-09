class BoardViewModel {
    /**
     * The unique identifier of this board.
     */
    id: string;

    /**
     * The name of this board.
     */
    name: string;

    /**
     * The user who created this board.
     */
    userId: string;

    // TODO: Add user object

    /**
     * The date and time of when this board was created.
     */
    createdAt: Date;

    /**
     * Whether or not this board is locked for editing.
     */
    isLocked: boolean;

    /**
     * The collection of elements on this board.
     */
    elements: Array<BoardElementViewModel>;
}
