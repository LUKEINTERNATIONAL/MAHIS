import { LocationService } from "@/services/location_service";
import db from "@/db";
export async function setOfflineData() {
    setLocation();
}
export async function setLocation() {
    let locationData = await db
        .collection("location")
        .get()
        .then(async (location: any) => {
            if (location) {
                await db
                    .collection("location")
                    .doc({ id: "location" })
                    .update({
                        id: "location",
                        villages: await getVillages(location),
                        districts: await getDistricts(location),
                        TAs: await getTAs(location),
                    });
            } else {
                await db.collection("location").add({
                    id: "location",
                    villages: await getVillages(location),
                    districts: await getDistricts(location),
                    TAs: await getTAs(location),
                });
            }
        });

    locationData = await db.collection("location").get()[0];
}

export async function getDistricts(location: any) {
    if (!location?.districts || location?.districts?.length == 0) {
        return await LocationService.getAllDistricts();
    } else {
        return location?.districts;
    }
}
export async function getTAs(location: any) {
    if (!location?.TAs || location?.TAs?.length == 0) {
        return await LocationService.getAllTraditionalAuthorities();
    } else {
        return location?.TAs;
    }
}
export async function getVillages(location: any) {
    if (!location?.villages || location?.villages?.length == 0) {
        console.log("🚀 ~ llllllllllllllllllgetVillages ~ location:", location);
        return await LocationService.getAllVillages();
    } else {
        return location?.villages;
    }
}
