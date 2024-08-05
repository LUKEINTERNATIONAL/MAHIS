import HisDate from "@/utils/Date";
import { Service } from "@/services/service";
export class WebSocketService {
    private socket: WebSocket | null = null;
    private channel: string = "ImmunizationReportChannel";
    private isConnected: boolean = false;
    private pendingFetch: (() => void) | null = null;

    constructor() {
        const apiURL = sessionStorage.getItem("apiURL");
        const apiPort = sessionStorage.getItem("apiPort");

        if (apiURL && apiPort) {
            // this.socket = new WebSocket(`ws://${apiURL}:${apiPort}/cable`);
            // for now
            this.socket = new WebSocket(`ws://apps.linmalawi.org/api/v1/cable`);

            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onerror = this.onError;
        } else {
            console.error("WebSocket not initialized: apiURL or apiPort is missing in sessionStorage.");
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
            const subscribeMessage = {
                command: "subscribe",
                identifier: JSON.stringify({ channel: this.channel }),
            };
            this.socket.send(JSON.stringify(subscribeMessage));
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
