import HisDate from "@/utils/Date";
import { Service } from "@/services/service";
export class WebSocketService {
    private socket: WebSocket | null = null;
    private channels: string[];
    private isConnected: boolean = false;
    private pendingFetch: (() => void) | null = null;
    private location_id: any;

    constructor(channels: string[])  {
        this.initPromise = this.init();
        this.channels = channels;
    }
    private initPromise: Promise<void>;
    private async init() {
        const apiURL = localStorage.getItem("apiURL");
        const apiPort = localStorage.getItem("apiPort");
        const websocketProtocol = localStorage.getItem("websocketProtocol");

        this.location_id = localStorage.getItem("locationID");
        try {
            const url =
                import.meta.env.MODE === "development"
                    ? `${websocketProtocol}://${apiURL}:${apiPort}/cable`
                    : `${websocketProtocol}://${apiURL}/api/v1/cable`;

            this.socket = new WebSocket(url);
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onerror = this.onError;
        } catch (error) {
            console.error(error);
            console.error("WebSocket not initialized: apiURL or apiPort is missing in localStorage.");
        }
    }

    private onOpen = async () => {
        console.log("WebSocket connection established");
        this.isConnected = true;
        this.subscribe();
        await this.getPatientSummary();

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
            this.channels.forEach((channel, index) => { 
                const subscribeMessage = {
                    command: "subscribe",
                    identifier: JSON.stringify({ channel: channel, location_id: this.location_id })
                };
                this.socket.send(JSON.stringify(subscribeMessage));
            });
        } else {
            console.error("WebSocket connection not established.");
        }

    }

    public async getPatientSummary() {
        const data = await Service.getJson("immunization/stats", {
            start_date: HisDate.getDateBeforeByDays(HisDate.currentDate(), 365),
            end_date: HisDate.currentDate(),
        });
    }

    public async setMessageHandler(handler: (event: MessageEvent) => void) {
        await this.initPromise;
        if (this.socket) {
            this.socket.onmessage = (event: MessageEvent) => {
                handler(event);
            };
        } else {
            console.error("WebSocket connection not established.");
        }
    }
}
