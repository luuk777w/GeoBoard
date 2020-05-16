import { SignalRClient } from '../signalrClient'

export class BoardHub extends SignalRClient {

    /**
     * The singleton instance of this SignalR class.
     */
    private static instance: BoardHub;

    private constructor() {
        const currentBoard = localStorage.getItem('board');

        if (currentBoard) {
            super('boardHub', `?currentBoard=${currentBoard}`);
        }
        else
        {
            super('boardHub');
        }
    }

    /**
     * Returns the singleton instance of this BoardHub class.
     */
    public static getInstance() {
        if (!BoardHub.instance) {
            BoardHub.instance = new BoardHub();
        }

        return BoardHub.instance;
    }
}
