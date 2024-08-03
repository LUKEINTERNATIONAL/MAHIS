import { RelationsService } from "@/services/relations_service";
import db from "@/db";
export async function setOfflineRelationship() {
    const locationData = await getOfflineRelationship();
    if (!(locationData && Object.keys(locationData).length > 0)) {
        await db.collection("relationship").add({
            id: "relationship",
            relationship: await getRelationships(),
        });
    }
}

export async function getOfflineRelationship() {
    return await db
        .collection("relationship")
        .get()
        .then(async (locationData: any) => {
            return locationData[0].relationship;
        });
}
export async function getRelationships() {
    return await RelationsService.getRelations();
}
