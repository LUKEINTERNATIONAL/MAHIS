import db from "@/db";

export async function getOfflineRecords(objStore: string, whereClause?: any, returnFirst: boolean = true) {
    let query = db.collection(objStore);

    if (whereClause) {
        query = query.doc(whereClause);
    }

    return await query.get().then(async (locationData: any) => {
        if (returnFirst && locationData) {
            return locationData[0];
        }
        return locationData;
    });
}
