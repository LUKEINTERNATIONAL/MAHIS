// stores/workerStore.ts
import { defineStore } from "pinia";
import { useWebWorker } from "@vueuse/core";
import { Service } from "@/services/service";
import { watch } from "vue";
import { useWorkerStatus } from "@/composables/useWorkerStatus";
import { useStatusStore } from "@/stores/StatusStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { getOfflineRecords } from "@/services/offline_service";

interface WorkerState {
    url: string;
    apiKey: string | null;
    userId: string | null;
    programId: string | null;
    date: string | null;
    totals: string | null;
    workerApi: any;
    workerData: any;
    lastUpdate: Date | null;
}

export const useWorkerStore = defineStore("worker", {
    state: (): WorkerState => ({
        url: "",
        apiKey: null,
        userId: null,
        programId: null,
        date: null,
        totals: null,
        workerApi: null,
        workerData: null,
        lastUpdate: null,
    }),

    actions: {
        initWorker() {
            if (!this.workerApi) {
                const { data, post, terminate } = useWebWorker(`${import.meta.env.BASE_URL}WebWorker/worker.js`);

                // Set up message watcher
                watch(data, async (newData) => {
                    if (newData) {
                        if (newData == "Done syncing all data") {
                            const demographicsStore = useDemographicsStore();
                            const patientData: any = await getOfflineRecords("patientRecords", {
                                whereClause: { ID: demographicsStore.patient.ID },
                            });
                            sessionStorage.setItem("updatePatient", "false");
                            demographicsStore.setRecord(patientData[0]);
                        }
                        if (newData == "healthCheckError") {
                            Service.getJson("_health");
                        }
                        this.updateFromWorker(newData);
                    }
                });

                this.workerApi = { data, post, terminate };
            }
            return this.workerApi;
        },

        async updateFromWorker(data: any) {
            const { setWorkerStatus } = useWorkerStatus();
            await setWorkerStatus(data);
            this.workerData = data;
            this.lastUpdate = new Date();
        },

        async updateSettings() {
            // Build API URL
            const protocol = localStorage.getItem("apiProtocol") || "http";
            const apiUrl = localStorage.getItem("apiURL") || "";
            const port = localStorage.getItem("apiPort") || "";
            this.url = `${protocol}://${apiUrl}${port ? ":" + port : ""}/api/v1/`;

            // Get authentication and user data
            this.apiKey = localStorage.getItem("apiKey");
            this.userId = localStorage.getItem("userID");
            this.date = localStorage.getItem("sessionDate");

            // Get totals
            try {
                const totals = useStatusStore().apiStatus ? await Service.getJson("/totals", { paginate: false }) : "";
                if (totals) {
                    localStorage.setItem("totals", JSON.stringify(totals));
                    this.totals = JSON.stringify(totals);
                } else {
                    throw new Error("Unable to get totals");
                }
            } catch (error) {
                this.totals = localStorage.getItem("totals");
            }

            // Get program ID
            try {
                const programStr = localStorage.getItem("app");
                if (programStr) {
                    const program = JSON.parse(programStr);
                    this.programId = program?.programID || null;
                } else {
                    this.programId = null;
                }
            } catch (error) {
                console.error("Error parsing program data:", error);
                this.programId = null;
            }
        },

        async postData(type: string, payload: any = "") {
            if (!this.workerApi) {
                this.initWorker();
            }
            if (useStatusStore().isSyncingDone) {
                await this.updateSettings();
                return this.workerApi.post({
                    type,
                    url: this.url,
                    apiKey: this.apiKey,
                    userId: this.userId,
                    programId: this.programId,
                    totals: this.totals,
                    date: this.date,
                    apiStatus: useStatusStore().apiStatus,
                    payload,
                });
            } else {
                console.log("Worker is already syncing");
            }
        },

        terminate() {
            useStatusStore().isSyncingDone = true;
            if (this.workerApi) {
                useStatusStore().isSyncingDone = false;
                this.workerApi.terminate();
                this.workerApi = null;
                this.$reset();
            }
        },
    },
});
