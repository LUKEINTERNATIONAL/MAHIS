// src/services/websocketService.ts
import HisDate from "@/utils/Date";
class WebSocketService {
    private socket: WebSocket | null = null;
    private channel: string = "ImmunizationReportChannel";
    private isConnected: boolean = false;
    private pendingFetch: (() => void) | null = null;

    constructor() {
        const apiURL = sessionStorage.getItem("apiURL");
        const apiPort = sessionStorage.getItem("apiPort");

        if (apiURL && apiPort) {
            this.socket = new WebSocket(`ws://${apiURL}:${apiPort}/cable`);

            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onerror = this.onError;
        } else {
            console.error("WebSocket not initialized: apiURL or apiPort is missing in sessionStorage.");
        }
    }

    private onOpen = () => {
        console.log("WebSocket connection established");
        this.isConnected = true;
        this.subscribe();
        this.fetchData();

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
        if (this.socket) {
            const subscribeMessage = {
                command: "subscribe",
                identifier: JSON.stringify({ channel: this.channel }),
            };
            this.socket.send(JSON.stringify(subscribeMessage));
        } else {
            console.error("WebSocket connection not established.");
        }
    }

    public fetchData() {
        const start_date = HisDate.getDateBeforeByDays(HisDate.currentDate(), 365);
        const end_date = HisDate.currentDate();
        const fetchDataMessage = {
            command: "message",
            identifier: JSON.stringify({ channel: this.channel }),
            data: JSON.stringify({
                action: "fetch_data",
                start_date: start_date,
                end_date: end_date,
            }),
        };

        if (this.isConnected && this.socket) {
            this.socket.send(JSON.stringify(fetchDataMessage));
        } else if (this.socket) {
            // Store the fetch request to be executed once connected
            this.pendingFetch = () => this.socket?.send(JSON.stringify(fetchDataMessage));
        } else {
            console.error("WebSocket connection not established.");
        }
    }

    public setMessageHandler(handler: (event: MessageEvent) => void) {
        if (this.socket) {
            this.socket.onmessage = (event: MessageEvent) => {
                handler(event);
            };
        } else {
            console.error("WebSocket connection not established.");
        }
    }
}

export default new WebSocketService();
