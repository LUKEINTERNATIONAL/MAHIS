import { useWebWorker } from "@vueuse/core";

const workerApi = useWebWorker("src/services/WebWorker/worker.js");
let url = "";
let apiKey: string | null = "";
let userId: string | null = "";
let programId: string | null = "";
let date: string | null = "";

function updateData() {
    const protocol = localStorage.getItem("apiProtocol") || "http";
    const apiUrl = localStorage.getItem("apiURL") || "";
    const port = localStorage.getItem("apiPort") || "";
    url = `${protocol}://${apiUrl}${port ? ":" + port : ""}/api/v1/`;

    apiKey = localStorage.getItem("apiKey");
    userId = localStorage.getItem("userID");
    date = localStorage.getItem("sessionDate");

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

function postData(type: string, payload: any = "") {
    updateData();
    workerApi.post({
        type,
        url,
        apiKey,
        userId,
        programId,
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
