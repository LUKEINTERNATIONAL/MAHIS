import { useWebWorker } from "@vueuse/core";

const workerApi = useWebWorker("src/services/WebWorker/worker.js");
let url = "";
let apiKey: any = "";
let userId: any = "";
let programId: any = "";
let date: any = "";
function updateData() {
    url = `${localStorage.getItem("apiProtocol")}://${localStorage.getItem("apiURL")}:${localStorage.getItem("apiPort")}/api/v1/`;
    apiKey = localStorage.getItem("apiKey");
    userId = localStorage.getItem("userID");
    date = localStorage.getItem("sessionDate");

    let program: any = localStorage.getItem("app");
    program = JSON.parse(program);
    programId = program ? program.programID : null;
}

function postData(type: any, payload: any = "") {
    updateData();
    workerApi.post({ type, url, apiKey, userId, programId, date, payload });
}
export default {
    workerApi,
    url,
    apiKey,
    postData,
};
