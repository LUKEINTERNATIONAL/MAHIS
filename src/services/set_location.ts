import { LocationService } from "@/services/location_service";
import { getBaseURl } from "@/utils/GeneralUti";
import db from "@/db";
export async function setOfflineLocation() {
    const locationData = await getOfflineLocation();
    if (!(locationData && Object.keys(locationData).length > 0)) {
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
    return await LocationService.getAllVillages();
}
