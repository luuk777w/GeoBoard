abstract class SignalRClient {

    private connection: any;

    constructor(hubName: string) {
        const apiUrl = Config.getInstance().apiUrl;
        const loginToken = JWT.getInstance().get();

        this.connection = new (window as any).signalR.HubConnectionBuilder()
            .withUrl(`${apiUrl}/${hubName}`, { accessTokenFactory: () => loginToken })
            .build();

        this.connection.start();

        console.log(this.connection);
    }

    public getConnection() {
        return this.connection;
    }
}
