// start common code
type WorkerMessage<T> = {
    type: string;
    payload: T;
};

type WorkerResponse<T> = {
    type: string;
    payload: T;
};

let APIURL = "";
let APIKEY = "";
let TOTALS: any = "";
let db: IDBDatabase | null = null;

/**********************************************************************
 **********************************************************************
                            Index DB                                                        
 **********************************************************************
 **********************************************************************/
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
            const objectStores = ["relationship", "districts", "TAs", "villages", "programs", "patientRecords"];

            objectStores.forEach((storeName) => {
                if (!database.objectStoreNames.contains(storeName)) {
                    database.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
                }
            });
        };
    });
}

// New function to delete an object store
function deleteObjectStore(storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized. Call openDatabase() first."));
            return;
        }

        if (!db.objectStoreNames.contains(storeName)) {
            reject(new Error(`Object store "${storeName}" does not exist.`));
            return;
        }

        const version = db.version + 1;
        db.close();

        const request = indexedDB.open("MaHis", version);

        request.onerror = (event) => {
            reject("Database error: " + (event.target as IDBOpenDBRequest).error);
        };

        request.onupgradeneeded = (event) => {
            const database = (event.target as IDBOpenDBRequest).result;
            database.deleteObjectStore(storeName);
        };

        request.onsuccess = (event) => {
            db = (event.target as IDBOpenDBRequest).result;
            resolve();
        };
    });
}
async function overRideRecord(storeName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized. Call openDatabase() first."));
            return;
        }
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);

        // Clear all existing data
        const clearRequest = objectStore.clear();

        clearRequest.onerror = (event) => {
            reject((event.target as IDBRequest).error);
        };

        clearRequest.onsuccess = () => {
            // After clearing, add the new data
            const addRequest = objectStore.add(data);

            addRequest.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };

            addRequest.onsuccess = () => {
                resolve();
            };
        };
    });
}
async function upsertSingleRecord(storeName: string, data: any): Promise<void> {
    if (!db) {
        throw new Error("Database not initialized. Call openDatabase() first.");
    }

    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized. Call openDatabase() first."));
            return;
        }
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);

        // Get all records (should be only one or none)
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = (event) => {
            const existingRecords = (event.target as IDBRequest).result;

            if (existingRecords.length > 0) {
                // Update existing record
                const updateRequest = objectStore.put([...existingRecords[0], ...data]);
                updateRequest.onsuccess = () => resolve();
                updateRequest.onerror = (event) => reject((event.target as IDBRequest).error);
            } else {
                // Add new record
                const addRequest = objectStore.add(data);
                addRequest.onsuccess = () => resolve();
                addRequest.onerror = (event) => reject((event.target as IDBRequest).error);
            }
        };

        getAllRequest.onerror = (event) => reject((event.target as IDBRequest).error);
    });
}

function addData(storeName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized. Call openDatabase() first."));
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
async function getOfflineData(storeName: any) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized."));
            return;
        }
        try {
            const transaction = db.transaction([storeName], "readonly");
            const objectStore = transaction.objectStore(storeName);
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
/**********************************************************************
 **********************************************************************
                            Web worker                                                       
 **********************************************************************
 **********************************************************************/
self.onmessage = async (event: any) => {
    const { type, url, apiKey } = event.data;
    APIURL = url;
    APIKEY = apiKey;
    TOTALS = await getTotals();

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
                    const result = await getOfflineData("location");
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
                    console.log({ type: "SET_OFFLINE_RELATIONSHIPS_RESULTS", payload: "Success" });
                } catch (error) {
                    console.log({ type: "ERROR", payload: "Error setting offline relationship: " + error });
                }
                break;
            case "DELETE_OBJECT_STORE":
                try {
                    const { storeName } = event.data;
                    await deleteObjectStore(storeName);
                    console.log({ type: "DELETE_OBJECT_STORE_RESULT", payload: "Success" });
                } catch (error) {
                    console.log({ type: "ERROR", payload: "Error deleting object store: " + error });
                }
                break;
            default:
                console.log({ type: "ERROR", payload: "Unknown message type" });
        }
    } catch (error) {
        console.log({ type: "ERROR", payload: "Database initialization error: " + error });
    }
};

/**********************************************************************
 **********************************************************************
                            Backend Requests                                                       
 **********************************************************************
 **********************************************************************/
async function execFetch(url: string, params: any = "") {
    const response = await fetch(url, { headers: headers() });
    return await response.json();
}

function headers() {
    return {
        Authorization: APIKEY,
        "Content-Type": "application/json",
    };
}

function buildUrl(url: string, params: any) {
    const transformedUrl = `${url}?${parameterizeObjToString(params)}`;
    return APIURL + transformedUrl;
}

function parameterizeObjToString(obj: Record<string, any>) {
    return Object.entries(obj)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
}

async function getTotals() {
    return await execFetch(buildUrl("/totals", { paginate: false }));
}

/**********************************************************************
 **********************************************************************
                          Location code                                                       
 **********************************************************************
 **********************************************************************/
// start location code
async function setOfflineLocation() {
    const districtsData: any = await getOfflineData("districts");
    if (!districtsData || districtsData.length !== 32) {
        await overRideRecord("districts", await getDistricts());
    } else {
        self.postMessage({
            payload: {
                total_districts: 32,
                total: 32,
            },
        });
    }
    const TAsData: any = await getOfflineData("TAs");
    if (!TAsData || TOTALS.total_TA > TAsData.length) {
        await overRideRecord("TAs", await getTAs());
    } else {
        self.postMessage({
            payload: {
                total_TAs: TOTALS.total_TA,
                total: TOTALS.total_TA,
            },
        });
    }
    const villagesData: any = await getOfflineData("villages");
    if (!villagesData || TOTALS.total_village > villagesData.length) {
        await getVillages();
        // await overRideRecord("villages", await getVillages());
    } else {
        self.postMessage({
            payload: {
                total_village: TOTALS.total_village,
                total: TOTALS.total_village,
            },
        });
    }
}

async function getDistricts() {
    let districtList = [];
    for (let i of [1, 2, 3]) {
        const districts: any = await execFetch(buildUrl("/districts", { region_id: i, page_size: 1000 }));
        districtList.push(...districts);
    }
    return districtList;
}

async function getTAs() {
    return await execFetch(buildUrl("/traditional_authorities", { paginate: false }));
}

async function getVillages() {
    try {
        const allVillage = [];
        let page: any = 1;
        let pageSize: any = 500;
        const villagesData: any = await getOfflineData("villages");
        if (villagesData && villagesData.length > 0) {
            console.log("🚀 ~ getVillages ~ villagesData:", villagesData);
            page = parseInt(villagesData.length) / 500;
            page = parseInt(page);
            console.log("🚀 ~ getVillages ~ page:", page);
            allVillage.push(...villagesData);
        }

        while (true) {
            const newVillages: any = await execFetch(buildUrl("/villages", { page, page_size: pageSize }));
            if (newVillages.length > 0) {
                allVillage.push(...newVillages);
                await overRideRecord("villages", allVillage);
                page++;
                self.postMessage({
                    payload: {
                        type: "OFFLINE_VILLAGES",
                        total_village: allVillage.length,
                        total: TOTALS.total_village,
                    },
                });
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

/**********************************************************************
 **********************************************************************
                          Program code                                                        
 **********************************************************************
 **********************************************************************/
async function setOfflinePrograms() {
    const programsData: any = await getOfflineData("programs");
    if (!programsData || TOTALS.total_programs > programsData.length) {
        const programs = await execFetch(buildUrl("/programs", { page_size: 1000 }));
        if (programs && Object.keys(programs).length > 0) {
            await overRideRecord("programs", {
                programs: programs,
            });
        }
        return programs;
    } else {
        return programsData.programs;
    }
}

/**********************************************************************
 **********************************************************************
                          Relationship code                                                       
 **********************************************************************
 **********************************************************************/
async function setOfflineRelationship() {
    const relationshipsData: any = await getOfflineData("relationship");
    if (!relationshipsData || TOTALS.total_relationships > relationshipsData.length) {
        const relationships = await execFetch(buildUrl("/types/relationships", { paginate: false }));
        if (relationships && Object.keys(relationships).length > 0) {
            await overRideRecord("relationship", {
                relationships: relationships,
            });
        }
        return relationships;
    } else {
        return relationshipsData.relationships;
    }
}
