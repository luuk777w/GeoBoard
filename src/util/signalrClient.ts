import * as SignalR from '@microsoft/signalr'
import { JWTService } from '../services/jwt.service';
import { Config } from './config';
import { IHttpConnectionOptions } from '@microsoft/signalr';
import { container } from 'tsyringe';

export abstract class SignalRClient {

    private config: Config;
    private jwtService: JWTService;

    private connection: SignalR.HubConnection;

    constructor(hubName: string, params: string = "") {
        this.config = container.resolve(Config);
        this.jwtService = container.resolve(JWTService);

        const apiUrl = this.config.apiUrl;
        const loginToken = this.jwtService.getToken();

        this.connection = new SignalR.HubConnectionBuilder()
            .withUrl(`${apiUrl}/${hubName}${params}`, { accessTokenFactory: () => loginToken } as IHttpConnectionOptions)
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
    public getConnection(): SignalR.HubConnection {
        return this.connection;
    }
}
