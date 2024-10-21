import { LocationService } from "@/services/location_service";
import { getBaseURl } from "@/utils/GeneralUti";
import db from "@/db";
import { useWebWorker } from "@vueuse/core";
export async function setOfflineLocation() {
    // const { data, post, terminate, worker } = useWebWorker("/src/services/worker.ts");
    // console.log("🚀 ~ setOfflineLocation ~ data:", data);
    // const url = `${localStorage.getItem("apiProtocol")}://${localStorage.getItem("apiURL")}:${localStorage.getItem("apiPort")}/api/v1/`;
    // post({ type: "SET_OFFLINE_LOCATION", url: url, apiKey: localStorage.getItem("apiKey") });
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

export async function getOfflineLocation() {
    return await db
        .collection("location")
        .get()
        .then(async (locationData: any) => {
            return locationData[0];
        });
}

export async function getDistricts() {
    let districtList = [];
    for (let i of [1, 2, 3]) {
        const districts: any = await LocationService.getDistricts(i);
        districtList.push(...districts);
    }
    return districtList;
}
export async function getTAs() {
    return await LocationService.getAllTraditionalAuthorities();
}
export async function getVillages() {
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
