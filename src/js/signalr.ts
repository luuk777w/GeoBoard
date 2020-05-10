abstract class SignalR {

    private connection: any;

    constructor(hubName: string) {
        const apiUrl = Config.getInstance().apiUrl;

        this.connection = new (window as any).signalR.HubConnectionBuilder().withUrl(`${apiUrl}/${hubName}`).build();

        this.connection.start();

        console.log(this.connection);
    }

    public getConnection()
    {
        return this.connection;
    }
}
