abstract class SignalRClient {

    private connection: any;

    constructor(hubName: string) {
        const apiUrl = Config.getInstance().apiUrl;
        const loginToken = JWT.getInstance().get();

        this.connection = new (window as any).signalR.HubConnectionBuilder()
            .withUrl(`${apiUrl}/${hubName}`, { accessTokenFactory: () => loginToken })
            .withAutomaticReconnect()
            .build();

        this.getConnection().start();

        this.getConnection().onreconnecting((error: any) => {
            $(".notification").text("The connection with the server was lost. Reconnecting...");
            $(".notification").slideDown(200, () => $(this).show());
        });

        this.getConnection().onreconnected((connectionId: any) => {
            $(".notification").slideUp(200, () => {
                $(this).hide();

                $(this).text("The connection with the server was lost. Reconnecting...");
            });
        });
    }

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
