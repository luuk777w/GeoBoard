import * as SignalR from '@microsoft/signalr'
import { Config } from './config';
import { JWT } from './jwt';
import * as $ from 'jquery';

export abstract class SignalRClient {

    private connection: SignalR.HubConnection;

    constructor(hubName: string) {
        const apiUrl = Config.getInstance().apiUrl;
        const loginToken = JWT.getInstance().get();

        this.connection = new SignalR.HubConnectionBuilder()
            .withUrl(`${apiUrl}/${hubName}`, { accessTokenFactory: () => loginToken })
            .withAutomaticReconnect()
            .build();

        // Start the connection.
        this.getConnection().start();

        // Handle reconnection when the connection was lost.
        this.getConnection().onreconnecting((error: any) => {
            $(".notification").text("The connection with the server was lost. Reconnecting...");
            $(".notification").slideDown(200, () => $(this).show());
        });

        // When reconnected to SignalR...
        this.getConnection().onreconnected((connectionId: any) => {
            $(".notification").slideUp(200, () => {
                $(this).hide();

                $(this).text("The connection with the server was lost. Reconnecting...");
            });
        });
    }

    /**
     * Get the HubConnection instance of SignalR.
     */
    public getConnection() {
        return this.connection;
    }

    /**
     * Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param event The name of the hub method to define.
     * @param callback The handler that will be raised when the hub method is invoked.
     */
    public on(event: string, callback: (args: any[]) => void) {
        return this.getConnection().on(event, callback);
    }
}
