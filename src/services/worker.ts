import { LocationService } from "@/services/location_service";
import db from "@/db";

type WorkerMessage<T> = {
    type: string;
    payload: T;
};

type WorkerResponse<T> = {
    type: string;
    payload: T;
};

self.onmessage = async (event) => {
    const { type, payload } = event.data;
    switch (type) {
        case "SET_OFFLINE_LOCATION":
            try {
                await setOfflineLocation();
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
    if (!(locationData && Object.keys(locationData).length > 0) || (locationData && locationData?.villageList == "")) {
        await db.collection("location").delete();
        await db.collection("location").add({
            districts: await getDistricts(),
            TAs: await getTAs(),
            villageList: await getVillages(),
        });
    }
}

async function getOfflineLocation() {
    return await db
        .collection("location")
        .get()
        .then(async (locationData: any) => {
            return locationData[0];
        });
}

async function getDistricts() {
    let districtList = [];
    for (let i of [1, 2, 3]) {
        const districts: any = await LocationService.getDistricts(i);
        districtList.push(...districts);
    }
    return districtList;
}

async function getTAs() {
    return await LocationService.getAllTraditionalAuthorities();
}

async function getVillages() {
    try {
        const allVillage = [];
        let page = 1;
        const pageSize = 500;
        while (true) {
            const newVillages = await LocationService.getAllVillages(page, pageSize);
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
