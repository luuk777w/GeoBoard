import * as SignalR from '@microsoft/signalr'
import { JWTService } from '../services/jwt.service';
import { Config } from './config';
import { IHttpConnectionOptions } from '@microsoft/signalr';
import { container } from 'tsyringe';
import { store } from 'store';
import { showAnnouncement, hideAnnouncement } from 'store/announcement/actions';
import { AnnouncementType } from 'store/announcement/types';

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
            store.store.dispatch(
                showAnnouncement(AnnouncementType.Error, "The connection with the server was lost. Reconnecting...")
            );
        });

        // When reconnected to SignalR...
        this.getConnection().onreconnected((connectionId: any) => {
            store.store.dispatch(hideAnnouncement());
        });
    }

    /**
     * Get the HubConnection instance of SignalR.
     */
    public getConnection(): SignalR.HubConnection {
        return this.connection;
    }
}
