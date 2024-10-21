import { useWebWorker } from "@vueuse/core";
import { Service } from "@/services/service";
import { getBaseURl } from "@/utils/GeneralUti";

const workerApi = useWebWorker(`/${getBaseURl()}/src/services/WebWorker/worker.js`);
let url = "";
let apiKey: string | null = "";
let userId: string | null = "";
let programId: string | null = "";
let date: string | null = "";
let totals: string | null = "";

async function updateData() {
    const protocol = localStorage.getItem("apiProtocol") || "http";
    const apiUrl = localStorage.getItem("apiURL") || "";
    const port = localStorage.getItem("apiPort") || "";
    url = `${protocol}://${apiUrl}${port ? ":" + port : ""}/api/v1/`;

    apiKey = localStorage.getItem("apiKey");
    userId = localStorage.getItem("userID");
    date = localStorage.getItem("sessionDate");
    try {
        totals = await Service.getJson("/totals", { paginate: false });
        if (totals) localStorage.setItem("totals", JSON.stringify(totals));
        else throw "Unable to get totals";
    } catch (error) {}
    totals = localStorage.getItem("totals");
    try {
        const programStr = localStorage.getItem("app");
        if (programStr) {
            const program = JSON.parse(programStr);
            programId = program?.programID || null;
        } else {
            programId = null;
        }
    } catch (error) {
        console.error("Error parsing program data:", error);
        programId = null;
    }
}

async function postData(type: string, payload: any = "") {
    await updateData();
    workerApi.post({
        type,
        url,
        apiKey,
        userId,
        programId,
        totals,
        date,
        payload,
    });
}

export default {
    workerApi,
    url,
    apiKey,
    postData,
};
