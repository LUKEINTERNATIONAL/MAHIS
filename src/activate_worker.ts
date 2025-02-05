import { useWebWorker } from "@vueuse/core";
import { Service } from "@/services/service";
import { ref, type Ref } from "vue";

interface WorkerState {
    url: string;
    apiKey: string | null;
    userId: string | null;
    programId: string | null;
    date: string | null;
    totals: string | null;
}

class WorkerManager {
    public workerApi: any;
    private state: Ref<WorkerState>;
    private workerUrl: string;

    constructor(workerPath: string) {
        this.workerUrl = `${import.meta.env.BASE_URL}${workerPath}`;
        this.state = ref({
            url: "",
            apiKey: null,
            userId: null,
            programId: null,
            date: null,
            totals: null,
        });
        this.initializeWorker();
    }

    private initializeWorker() {
        this.workerApi = useWebWorker(this.workerUrl);
    }

    async updateSettings() {
        // Build API URL
        const protocol = localStorage.getItem("apiProtocol") || "http";
        const apiUrl = localStorage.getItem("apiURL") || "";
        const port = localStorage.getItem("apiPort") || "";
        this.state.value.url = `${protocol}://${apiUrl}${port ? ":" + port : ""}/api/v1/`;

        // Get authentication and user data
        this.state.value.apiKey = localStorage.getItem("apiKey");
        this.state.value.userId = localStorage.getItem("userID");
        this.state.value.date = localStorage.getItem("sessionDate");

        // Get totals
        try {
            const totals = await Service.getJson("/totals", { paginate: false });
            if (totals) {
                localStorage.setItem("totals", JSON.stringify(totals));
                this.state.value.totals = JSON.stringify(totals);
            } else {
                throw new Error("Unable to get totals");
            }
        } catch (error) {
            this.state.value.totals = localStorage.getItem("totals");
        }

        // Get program ID
        try {
            const programStr = localStorage.getItem("programStore");
            if (programStr) {
                const program = JSON.parse(programStr);
                this.state.value.programId = program?.activeProgramID || null;
            } else {
                this.state.value.programId = null;
            }
        } catch (error) {
            console.error("Error parsing program data:", error);
            this.state.value.programId = null;
        }
    }

    async postData(type: string, payload: any = "") {
        await this.updateSettings();
        return this.workerApi.post({
            type,
            url: this.state.value.url,
            apiKey: this.state.value.apiKey,
            userId: this.state.value.userId,
            programId: this.state.value.programId,
            totals: this.state.value.totals,
            date: this.state.value.date,
            payload,
        });
    }

    async terminate() {
        try {
            await this.workerApi.terminate();
            // Reset the state
            this.state.value = {
                url: "",
                apiKey: null,
                userId: null,
                programId: null,
                date: null,
                totals: null,
            };
            // Reinitialize the worker
            this.initializeWorker();
            console.log("Worker terminated and reset successfully");
        } catch (error) {
            console.error("Error terminating worker:", error);
            throw error;
        }
    }

    getWorkerApi() {
        return this.workerApi;
    }

    getState() {
        return this.state;
    }
}

// Create and export a single instance
const workerManager = new WorkerManager("WebWorker/worker.js");

export default workerManager;
