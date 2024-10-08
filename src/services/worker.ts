// import { LocationService } from "@/services/location_service";
// import db from "@/db";
import { build } from "ionicons/icons";

type WorkerMessage<T> = {
    type: string;
    payload: T;
};

type WorkerResponse<T> = {
    type: string;
    payload: T;
};
let URL = "";
let APIKEY = "";
self.onmessage = async (event) => {
    const { type, payload, url, apiKey } = event.data;
    URL = url;
    APIKEY = apiKey;
    console.log("🚀 ~ self.onmessage= ~ payload:", payload);
    const village = await getVillages();
    console.log("🚀 ~ self.onmessage= ~ village:", village);
    switch (type) {
        case "SET_OFFLINE_LOCATION":
            try {
                // await setOfflineLocation();
                self.postMessage({ type: "SET_OFFLINE_LOCATION_RESULT", payload: "Success" });
            } catch (error) {
                self.postMessage({ type: "ERROR", payload: "Error setting offline location" });
            }
            break;
        case "GET_OFFLINE_LOCATION":
            try {
                const result = await getOfflineLocation();
                self.postMessage({ type: "GET_OFFLINE_LOCATION_RESULT", payload: result });
            } catch (error) {
                self.postMessage({ type: "ERROR", payload: "Error getting offline location" });
            }
            break;
        default:
            self.postMessage({ type: "ERROR", payload: "Unknown message type" });
    }
};

async function setOfflineLocation() {
    const locationData = await getOfflineLocation();
    // if (!(locationData && Object.keys(locationData).length > 0) || (locationData && locationData?.villageList == "")) {
    //     await db.collection("location").delete();
    //     await db.collection("location").add({
    //         districts: await getDistricts(),
    //         TAs: await getTAs(),
    //         villageList: await getVillages(),
    //     });
    // }
}

async function getOfflineLocation() {
    // return await db
    //     .collection("location")
    //     .get()
    //     .then(async (locationData: any) => {
    //         return locationData[0];
    //     });
}

async function getDistricts() {
    let districtList = [];
    for (let i of [1, 2, 3]) {
        const response: any = await fetch(buildUrl("/districts", { region_id: i, page_size: 1000 }));
        const districts = await response.json();
        districtList.push(...districts);
    }
    return districtList;
}

async function getTAs() {
    const response: any = await fetch(buildUrl("/traditional_authorities", { paginate: false }));
    return response.json();
}

async function getVillages() {
    try {
        const allVillage = [];
        let page = 1;
        const pageSize = 500;
        while (true) {
            const response: any = await execFetch(buildUrl("/villages", { page, page_size: pageSize }));
            const newVillages = await response.json();
            console.log("🚀 ~ getVillages ~ newVillages:", newVillages);
            if (newVillages.length > 0) {
                allVillage.push(...newVillages);
                page++;
            } else {
                break;
            }
        }
        return allVillage;
    } catch (error) {
        console.error("Error fetching villages:", error);
        return "";
    }
}
async function execFetch(url: string, params: any = "") {
    return await fetch(url, { headers: headers() });
}
function headers() {
    return {
        Authorization: APIKEY,
        "Content-Type": "application/json",
    };
}
function buildUrl(url: string, params: any) {
    const transformedUrl = `${url}?${parameterizeObjToString(params)}`;
    const data = URL + transformedUrl;
    console.log("🚀 ~ buildUrl ~ data:", data);
    return data;
}
function parameterizeObjToString(obj: Record<string, any>) {
    let str = "";
    for (const [key, value] of Object.entries(obj)) {
        str += `${key}=${value}&`;
    }
    return str;
}
