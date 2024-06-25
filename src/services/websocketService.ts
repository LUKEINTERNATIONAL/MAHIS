// src/services/websocketService.ts
class WebSocketService {
    private socket: WebSocket;
    private channel: string = "ImmunizationReportChannel";
    private isConnected: boolean = false;
    private pendingFetch: (() => void) | null = null;

    constructor() {
        this.socket = new WebSocket("ws://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/cable");

        this.socket.onopen = this.onOpen;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    }

    private onOpen = () => {
        console.log("WebSocket connection established");
        this.isConnected = true;
        this.subscribe();

        // If there is a pending fetch request, execute it
        if (this.pendingFetch) {
            this.pendingFetch();
            this.pendingFetch = null;
        }
    };

    private onClose = () => {
        console.log("WebSocket connection closed");
        this.isConnected = false;
    };

    private onError = (error: Event) => {
        console.error("WebSocket error:", error);
        this.isConnected = false;
    };

    public subscribe() {
        const subscribeMessage = {
            command: "subscribe",
            identifier: JSON.stringify({ channel: this.channel }),
        };
        this.socket.send(JSON.stringify(subscribeMessage));
    }

    public fetchData(startDate: string, endDate: string) {
        const fetchDataMessage = {
            command: "message",
            identifier: JSON.stringify({ channel: this.channel }),
            data: JSON.stringify({
                action: "fetch_data",
                start_date: startDate,
                end_date: endDate,
            }),
        };

        if (this.isConnected) {
            this.socket.send(JSON.stringify(fetchDataMessage));
        } else {
            // Store the fetch request to be executed once connected
            this.pendingFetch = () => this.socket.send(JSON.stringify(fetchDataMessage));
        }
    }

    public setMessageHandler(handler: (event: MessageEvent) => void) {
        this.socket.onmessage = handler;
    }
}

export default new WebSocketService();
