import { LocationService } from "@/services/location_service";
import db from "@/db";
export async function setOfflineData() {
    setLocation();
}
export async function setLocation() {
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
                    villages: await getVillages(location),
                    districts: await getDistricts(location),
                    TAs: await getTAs(location),
                });
                return newData?.data?.data;
            }
        });
}

export async function getDistricts(location: any) {
    return await LocationService.getAllDistricts();
}
export async function getTAs(location: any) {
    return await LocationService.getAllTraditionalAuthorities();
}
export async function getVillages(location: any) {
    return await LocationService.getAllVillages();
}
