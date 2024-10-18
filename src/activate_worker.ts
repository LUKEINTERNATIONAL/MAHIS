import { useWebWorker } from "@vueuse/core";

const workerApi = useWebWorker("/src/services/worker.ts");
let url = "";
let apiKey: any = "";
function updateData() {
    url = `${localStorage.getItem("apiProtocol")}://${localStorage.getItem("apiURL")}:${localStorage.getItem("apiPort")}/api/v1/`;
    apiKey = localStorage.getItem("apiKey");
}

function postData(type: any, payload: any = "") {
    updateData();
    workerApi.post({ type: type, url: url, apiKey: apiKey, payload });
}
export default {
    workerApi,
    url,
    apiKey,
    postData,
};
