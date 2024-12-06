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

export async function getOfflineFirstObsValue(allData: any, value_type: string, concept_id?: number): Promise<string | number | undefined> {
    // If concept_id is provided, filter the data first
    const combineArrays = [...allData?.vitals?.saved, ...allData?.vitals?.unsaved];
    const filteredData = concept_id ? combineArrays.filter((item: any) => item.concept_id === concept_id) : combineArrays;

    // Then sort and return the first item's specified value
    return filteredData.sort((a: any, b: any) => new Date(b.obs_datetime).getTime() - new Date(a.obs_datetime).getTime())[0]?.[value_type];
}
