import { SignalRClient } from '../signalrClient'

export class BoardHub extends SignalRClient {

    /**
     * The singleton instance of this SignalR class.
     */
    private static instance: BoardHub;

    private constructor() {
        super('boardHub');
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
