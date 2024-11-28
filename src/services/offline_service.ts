import db from "@/db";
import { Service } from "@/services/service";

export class OfflineService extends Service {
    constructor() {
        super();
    }

    static async checkApiStatus() {
        try {
            const response = await super.getJson("/_health", {});
            if (response && response.status === "Up") {
                return true;
            }
        } catch (error) {
            return false;
        }
        return false;
    }

    static monitorApiHealth(interval = 1000) {
        let isOnline = false;
        let isChecking = false;

        setInterval(async () => {
            if (isChecking) return;
            isChecking = true;
            const currentlyOnline = await this.checkApiStatus();
            isChecking = false;

            if (currentlyOnline && !isOnline) {
                isOnline = true;
                document.dispatchEvent(new CustomEvent("apiOnline"));
            } else if (!currentlyOnline && isOnline) {
                isOnline = false;
                document.dispatchEvent(new CustomEvent("apiOffline"));
            }
        }, interval);
    }
}


export async function getOfflineRecords(objStore: any) {
    return await db
        .collection(objStore)
        .get()
        .then(async (locationData: any) => {
            return locationData[0];
        });
}
