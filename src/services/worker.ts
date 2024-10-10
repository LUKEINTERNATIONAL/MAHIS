// start common code
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

// Function to open the database
function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MaHis");

        request.onerror = (event) => {
            reject("Database error: " + (event.target as IDBOpenDBRequest).error);
        };

        request.onsuccess = (event) => {
            db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = (event.target as IDBOpenDBRequest).result;
            const objectStores = ["relationship", "location", "programs", "patientRecords"];

            objectStores.forEach((storeName) => {
                if (!database.objectStoreNames.contains(storeName)) {
                    database.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
                }
            });
        };
    });
}

self.onmessage = async (event: any) => {
    const { type, url, apiKey } = event.data;
    URL = url;
    APIKEY = apiKey;

    await openDatabase();
    try {
        switch (type) {
            case "SET_OFFLINE_LOCATION":
                try {
                    await setOfflineLocation();
                    console.log({ type: "SET_OFFLINE_LOCATION_RESULT", payload: "Success" });
                } catch (error) {
                    console.log({ type: "ERROR", payload: "Error setting offline location: " + error });
                }
                break;

            case "GET_OFFLINE_LOCATION":
                try {
                    const result = await getOfflineLocation();
                    console.log({ type: "GET_OFFLINE_LOCATION_RESULT", payload: result });
                } catch (error) {
                    console.log({ type: "ERROR", payload: "Error getting offline location: " + error });
                }
                break;
            case "SET_OFFLINE_PROGRAMS":
                try {
                    self.postMessage({ payload: await setOfflinePrograms() });
                    console.log({ type: "SET_OFFLINE_PROGRAMS_RESULTS", payload: "Success" });
                } catch (error) {
                    console.log({ type: "ERROR", payload: "Error setting offline programs: " + error });
                }
                break;
            case "SET_OFFLINE_RELATIONSHIPS":
                try {
                    await setOfflineRelationship();
                    console.log({ type: "SET_OFFLINE_PROGRAMS_RESULTS", payload: "Success" });
                } catch (error) {
                    console.log({ type: "ERROR", payload: "Error setting offline programs: " + error });
                }
                break;
            default:
                console.log({ type: "ERROR", payload: "Unknown message type" });
        }
    } catch (error) {
        console.log({ type: "ERROR", payload: "Database initialization error: " + error });
    }
};

function validateData(data: any): boolean {
    return data && typeof data === "object";
}

function addData(storeName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized. Call openDatabase() first."));
            return;
        }

        if (!validateData(data)) {
            reject(new Error("Invalid data format. Please check your data structure."));
            return;
        }

        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);

        const request = objectStore.add(data);

        request.onerror = (event) => {
            const error = (event.target as IDBRequest).error;
            reject(new Error(`Error adding data: ${error?.name} - ${error?.message}`));
        };

        request.onsuccess = () => {
            resolve();
        };
    });
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
    return URL + transformedUrl;
}

function parameterizeObjToString(obj: Record<string, any>) {
    return Object.entries(obj)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
}
// end common code

// start location code
async function setOfflineLocation() {
    const locationData: any = await getOfflineLocation();
    if (!locationData || Object.keys(locationData).length === 0 || !locationData.villageList) {
        const newLocationData = {
            districts: await getDistricts(),
            TAs: await getTAs(),
            villageList: await getVillages(),
        };
        await addData("location", newLocationData);
    }
}

async function getOfflineLocation() {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized."));
            return;
        }
        try {
            const transaction = db.transaction(["location"], "readonly");
            const objectStore = transaction.objectStore("location");
            const request = objectStore.getAll();

            request.onerror = (event) => {
                const error = (event.target as IDBRequest).error;
                reject(new Error(`Error getting data: ${error?.name} - ${error?.message}`));
            };

            request.onsuccess = (event) => {
                const result = (event.target as IDBRequest).result;
                resolve(result.length > 0 ? result[0] : null);
            };
        } catch (error) {
            console.log("failed to get locations", error);
            return null;
        }
    });
}

async function getDistricts() {
    let districtList = [];
    for (let i of [1, 2, 3]) {
        const response: any = await execFetch(buildUrl("/districts", { region_id: i, page_size: 1000 }));
        const districts = await response.json();
        districtList.push(...districts);
    }
    return districtList;
}

async function getTAs() {
    const response: any = await execFetch(buildUrl("/traditional_authorities", { paginate: false }));
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
        return [];
    }
}
// end location code

async function setOfflinePrograms() {
    const response = await fetch(buildUrl("/programs", { page_size: 1000 }));
    const programs = await response.json();
    if (programs && Object.keys(programs).length > 0) {
        await addData("programs", {
            programs: programs,
        });
    }
    return programs;
}
async function setOfflineRelationship() {
    const response = await execFetch(buildUrl("types/relationships", { paginate: false }));
    const relationships = await response.json();
    if (relationships && Object.keys(relationships).length > 0) {
        await addData("relationship", {
            relationships: relationships,
        });
    }
    return relationships;
}
