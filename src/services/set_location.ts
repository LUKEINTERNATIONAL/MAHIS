import { LocationService } from "@/services/location_service";
import db from "@/db";
export async function setOfflineData() {
    getLocation();
}
export async function getLocation() {
    return await db
        .collection("location")
        .get()
        .then(async (locationData: any) => {
            let location = locationData[0];
            if (locationData?.length > 0) {
                return location;
            } else {
                const newData = await db.collection("location").add({
                    id: "location",
                    villages: await getVillages(),
                    districts: await getDistricts(),
                    TAs: await getTAs(),
                });
                return newData?.data?.data;
            }
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
