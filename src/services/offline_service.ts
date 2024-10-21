import db from "@/db";
export async function getOfflineRecords(objStore: any) {
    return await db
        .collection(objStore)
        .get()
        .then(async (locationData: any) => {
            return locationData[0];
        });
}
