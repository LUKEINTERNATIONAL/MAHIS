import { Service } from "./service";
import { getOfflineRecords } from "@/services/offline_service";

export class DrugService extends Service {
    constructor() {
        super();
    }

    static getDrugs(params = {} as Record<string, string | number>) {
        return super.getJson("/drugs", params);
    }

    static getOPDDrugs(params = {} as Record<string, string | number>) {
        return super.getJson("OPD_drugslist", params);
    }
    static async getOfflineOPDDrugs(params: { name?: string; page?: number; page_size?: number } = {}) {
        try {
            const { name = "", page = 1, page_size = 10 } = params;

            const likeClause = name ? { name: `%${name}%` } : {};

            const result = await getOfflineRecords("drugs", {
                likeClause,
                currentPage: page,
                itemsPerPage: page_size,
            }).then((data: any) => data.records);

            return result;
        } catch (error: any) {
            console.error("Error fetching offline OPD drugs:", error.message);
            throw error;
        }
    }

    static getDrugById(id: number) {
        return super.getJson("drug", { drug_id: id });
    }

    static async getOfflineDrugById(id: number) {
        const drug = await getOfflineRecords("drugs", {
            whereClause: { drug_id: id },
            currentPage: 1,
            itemsPerPage: 1,
        }).then((data: any) => data.records[0]);

        return drug;
    }
}