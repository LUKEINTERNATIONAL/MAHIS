import { LocationService } from "@/services/location_service";
import { getBaseURl } from "@/utils/GeneralUti";
import db from "@/db";
export async function setOfflineLocation() {
    const locationData = await getOfflineLocation();
    if (!(locationData && Object.keys(locationData).length > 0)) {
        await db.collection("location").add({
            districts: await getDistricts(),
            TAs: await getTAs(),
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
    return await LocationService.getAllVillages();
}

export async function getLocalVillages() {
    try {
        let baseURL = getBaseURl();
        if (baseURL.length > 0) {
            baseURL = '/' + baseURL;
        }
        const response = await fetch(`${baseURL}/villages.json`);
        if (!response.ok) {
            throw new Error(`Unable to retrieve configuration file from`);
        }
        const { villages } = await response.json();
        return villages;
    } catch {}
}
