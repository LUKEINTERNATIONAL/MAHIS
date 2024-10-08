// import { LocationService } from "@/services/location_service";
// import db from "@/db";
import { build } from "ionicons/icons";

type WorkerMessage<T> = {
    type: string;
    payload: T;
};

type WorkerResponse<T> = {
    type: string;
    payload: T;
};
let URL = "";
let APIKEY = "";
let db: IDBDatabase | null = null;
interface YourDataType {
    id?: number; // Make id optional
    name: string;
    age: number;
}

// Function to open the database
function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MaHis", 4);

        request.onerror = (event) => {
            reject("Database error: " + (event.target as IDBOpenDBRequest).error);
        };

        request.onsuccess = (event) => {
            db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = (event.target as IDBOpenDBRequest).result;
            const objectStore = database.createObjectStore("relationship", {});
            // Add any other object stores or indexes here
        };
    });
}
self.onmessage = async (event) => {
    const { type, payload, url, apiKey } = event.data;
    URL = url;
    APIKEY = apiKey;
    try {
        await openDatabase();

        // Correct data format
        const validData: YourDataType = { name: "John Doe", age: 30 };
        await addData(validData);
        console.log("Valid data added successfully");

        // Incorrect data format (this will throw an error)
        const invalidData = { name: "Jane Doe", age: 25 };
        await addData(invalidData as YourDataType);
    } catch (error) {
        console.error("Error:", error);
    }
    const village = await getVillages();
    console.log("🚀 ~ self.onmessage= ~ village:", village);
    switch (type) {
        case "SET_OFFLINE_LOCATION":
            try {
                // await setOfflineLocation();
                self.postMessage({ type: "SET_OFFLINE_LOCATION_RESULT", payload: "Success" });
            } catch (error) {
                self.postMessage({ type: "ERROR", payload: "Error setting offline location" });
            }
            break;
        case "GET_OFFLINE_LOCATION":
            try {
                const result = await getOfflineLocation();
                self.postMessage({ type: "GET_OFFLINE_LOCATION_RESULT", payload: result });
            } catch (error) {
                self.postMessage({ type: "ERROR", payload: "Error getting offline location" });
            }
            break;
        default:
            self.postMessage({ type: "ERROR", payload: "Unknown message type" });
    }
};
function addData(data: YourDataType): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized. Call openDatabase() first."));
            return;
        }

        // Validate data before adding
        if (typeof data.name !== "string" || typeof data.age !== "number") {
            reject(new Error("Invalid data format. Name must be a string and age must be a number."));
            return;
        }

        const transaction = db.transaction(["relationship"], "readwrite");
        const objectStore = transaction.objectStore("relationship");

        // If id is provided and not auto-incremented, use put instead of add
        const request = data.id ? objectStore.put(data) : objectStore.add(data);

        request.onerror = (event) => {
            reject("Error adding data: " + (event.target as IDBRequest).error);
        };

        request.onsuccess = () => {
            resolve();
        };
    });
}

async function setOfflineLocation() {
    const locationData = await getOfflineLocation();
    // if (!(locationData && Object.keys(locationData).length > 0) || (locationData && locationData?.villageList == "")) {
    //     await db.collection("location").delete();
    //     await db.collection("location").add({
    //         districts: await getDistricts(),
    //         TAs: await getTAs(),
    //         villageList: await getVillages(),
    //     });
    // }
}

async function getOfflineLocation() {
    // return await db
    //     .collection("location")
    //     .get()
    //     .then(async (locationData: any) => {
    //         return locationData[0];
    //     });
}

async function getDistricts() {
    let districtList = [];
    for (let i of [1, 2, 3]) {
        const response: any = await fetch(buildUrl("/districts", { region_id: i, page_size: 1000 }));
        const districts = await response.json();
        districtList.push(...districts);
    }
    return districtList;
}

async function getTAs() {
    const response: any = await fetch(buildUrl("/traditional_authorities", { paginate: false }));
    return response.json();
}

async function getVillages() {
    try {
        const allVillage = [];
        let page = 1;
        const pageSize = 500;
        while (true) {
            const response: any = await execFetch(buildUrl("/villages", { page, page_size: pageSize }));
            const newVillages = await response.json();
            console.log("🚀 ~ getVillages ~ newVillages:", newVillages);
            if (newVillages.length > 0) {
                allVillage.push(...newVillages);
                page++;
            } else {
                break;
            }
        }
        return allVillage;
    } catch (error) {
        console.error("Error fetching villages:", error);
        return "";
    }
}
async function execFetch(url: string, params: any = "") {
    return await fetch(url, { headers: headers() });
}
function headers() {
    return {
        Authorization: APIKEY,
        "Content-Type": "application/json",
    };
}
function buildUrl(url: string, params: any) {
    const transformedUrl = `${url}?${parameterizeObjToString(params)}`;
    const data = URL + transformedUrl;
    console.log("🚀 ~ buildUrl ~ data:", data);
    return data;
}
function parameterizeObjToString(obj: Record<string, any>) {
    let str = "";
    for (const [key, value] of Object.entries(obj)) {
        str += `${key}=${value}&`;
    }
    return str;
}
