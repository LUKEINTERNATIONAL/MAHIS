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
async function updateRecord(storeName: string, whereClause: Record<string, any>, updateData: any): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized. Call openDatabase() first."));
            return;
        }

        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);

        // Get all records to find matching ones
        const getAllRequest = objectStore.getAll();

        getAllRequest.onerror = (event) => {
            reject((event.target as IDBRequest).error);
        };

        getAllRequest.onsuccess = (event) => {
            const records = (event.target as IDBRequest).result;

            // Find records that match all conditions in whereClause
            const matchingRecords = records.filter((record: any) => {
                return Object.entries(whereClause).every(([key, value]) => record[key] === value);
            });

            if (matchingRecords.length === 0) {
                reject(new Error("No matching records found"));
                return;
            }

            // Update each matching record
            let updateCount = 0;
            matchingRecords.forEach((record: any) => {
                // Merge the existing record with the update data
                const updatedRecord = { ...record, ...updateData };

                const updateRequest = objectStore.put(updatedRecord);

                updateRequest.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                };

                updateRequest.onsuccess = () => {
                    updateCount++;
                    if (updateCount === matchingRecords.length) {
                        resolve();
                    }
                };
            });
        };
    });
}
/**********************************************************************
 **********************************************************************
                            Web worker                                                       
 **********************************************************************
 **********************************************************************/
self.onmessage = async (event: any) => {
    const { type, url, apiKey, payload } = event.data;
    APIURL = url;
    APIKEY = apiKey;
    TOTALS = await getTotals();

    await openDatabase();
    try {
        switch (type) {
            case "SET_OFFLINE_LOCATION":
                try {
                    await setOfflineLocation();

                    console.log("SET_OFFLINE_LOCATION ~ storeName:", type);
                } catch (error) {
                    console.log("SET_OFFLINE_LOCATION ~ error:", error);
                }
                break;

            case "GET_OFFLINE_LOCATION":
                try {
                    const result = await getOfflineData("location");
                    console.log("GET_OFFLINE_LOCATION ~ result:", result);
                } catch (error) {
                    console.log("GET_OFFLINE_LOCATION ~ error:", error);
                }
                break;
            case "SET_OFFLINE_PROGRAMS":
                try {
                    self.postMessage({ payload: await setOfflinePrograms() });
                    console.log("SET_OFFLINE_PROGRAMS ~ storeName:", type);
                } catch (error) {
                    console.log("SET_OFFLINE_PROGRAMS ~ error:", error);
                }
                break;
            case "SET_OFFLINE_RELATIONSHIPS":
                try {
                    await setOfflineRelationship();
                    console.log("SET_OFFLINE_RELATIONSHIPS ~ storeName:", type);
                } catch (error) {
                    console.log("SET_OFFLINE_RELATIONSHIPS ~ error:", error);
                }
                break;
            case "DELETE_OBJECT_STORE":
                try {
                    await deleteObjectStore(payload.storeName);
                    console.log("DELETE_OBJECT_STORE ~ storeName:", type);
                } catch (error) {
                    console.log("DELETE_OBJECT_STORE ~ error:", error);
                }
                break;
            case "ADD_OBJECT_STORE":
                try {
                    await addData(payload.storeName, payload.data);
                    console.log("ADD_OBJECT_STORE ~ payload:", payload.storeName);
                } catch (error) {
                    console.log("ADD_OBJECT_STORE ~ error:", error);
                }
                break;
            case "UPDATE_RECORD":
                try {
                    await updateRecord(payload.storeName, payload.whereClause, payload.data);
                    console.log("UPDATE_RECORD ~ storeName:", type);
                } catch (error) {
                    console.log("UPDATE_RECORD ~ error:", error);
                }
                break;
            default:
                console.log("Unknown type: " + type);
        }
    } catch (error) {
        console.log("Error Offline database initialization: " + error);
    }
};

/**********************************************************************
 **********************************************************************
                            Backend Requests                                                       
 **********************************************************************
 **********************************************************************/

function headers() {
    return {
        Authorization: APIKEY,
        "Content-Type": "application/json",
    };
}

async function execFetch(url: string, params: any) {
    params = { ...params, mode: "cors" };

    if (!("headers" in params)) {
        params = { ...params, headers: headers() };
    }

    try {
        const response = await fetch(APIURL + url, params);
        handleUnauthorized(response.statusText);
        return response.json();
    } catch (e) {
        // console.error(e);
        if (`${e}`.match(/NetworkError|Failed to fetch/i)) {
        } else {
        }
    }
}
function handleUnauthorized(response: any) {
    if (response == "Unauthorized") {
        localStorage.setItem("apiKey", "");
    }
}
const get = (uri: string) => execFetch(uri, { method: "GET" });
const post = (uri: string, data: object) => execFetch(uri, { method: "POST", body: JSON.stringify(data) });
const remove = (uri: string, data: object) => execFetch(uri, { method: "DELETE", body: JSON.stringify(data) });
const put = (uri: string, data: object) => execFetch(uri, { method: "PUT", body: JSON.stringify(data) });
const healthCheck = () => get("_health");

function buildUrl(url: string, params: any) {
    return `${url}?${parameterizeObjToString(params)}`;
}

function parameterizeObjToString(obj: Record<string, any>) {
    return Object.entries(obj)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
}

async function getTotals() {
    return await getData("/totals", { paginate: false });
}

async function getData(url: any, params = {}) {
    return await get(buildUrl(url, params));
}

/**********************************************************************
 **********************************************************************
                          Location code                                                       
 **********************************************************************
 **********************************************************************/
// start location code
async function setOfflineLocation() {
    let districtsData: any = await getOfflineData("districts");
    if (!districtsData || districtsData.length !== 32) {
        districtsData = await getDistricts();
        await overRideRecord("districts", districtsData);
    }

    if (districtsData.length === 32) {
        self.postMessage({
            payload: {
                total_districts: 32,
                total: 32,
            },
        });
    }
    let TAsData: any = await getOfflineData("TAs");
    if (!TAsData || TOTALS.total_TA > TAsData.length) {
        TAsData = await getTAs();
        await overRideRecord("TAs", TAsData);
    }

    if (TAsData.length === TOTALS.total_TA) {
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
        const districts: any = await getData("/districts", { region_id: i, page_size: 1000 });
        districtList.push(...districts);
    }
    return districtList;
}

async function getTAs() {
    return await getData("/traditional_authorities", { paginate: false });
}

async function getVillages() {
    try {
        const allVillage = [];
        let page: any = 1;
        let pageSize: any = 500;
        const villagesData: any = await getOfflineData("villages");
        if (villagesData && villagesData.length > 0) {
            page = parseInt(villagesData.length) / 500;
            page = parseInt(page);
            allVillage.push(...villagesData);
        }

        while (true) {
            const newVillages: any = await getData("/villages", { page, page_size: pageSize });
            if (newVillages.length > 0) {
                allVillage.push(...newVillages);
                await overRideRecord("villages", allVillage);
                self.postMessage({
                    payload: {
                        total_village: allVillage.length,
                        total: TOTALS.total_village,
                    },
                });
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

/**********************************************************************
 **********************************************************************
                          Program code                                                        
 **********************************************************************
 **********************************************************************/
async function setOfflinePrograms() {
    const programsData: any = await getOfflineData("programs");
    if (!programsData || TOTALS.total_programs > programsData.length) {
        const programs = await getData("/programs", { page_size: 1000 });
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
    let relationshipsData: any = await getOfflineData("relationship");
    if (!relationshipsData || TOTALS.total_relationships > relationshipsData.length) {
        relationshipsData = await getData("/types/relationships", { paginate: false });
        if (relationshipsData && relationshipsData.length > 0) {
            await overRideRecord("relationship", relationshipsData);
        }
    }

    if (relationshipsData.length === TOTALS.total_relationships) {
        self.postMessage({
            payload: {
                total_relationships: relationshipsData.length,
                total: TOTALS.total_relationships,
            },
        });
    }
}

/**********************************************************************
 **********************************************************************
                          patient code                                                       
 **********************************************************************
 **********************************************************************/

// async function saveDemographicsRecord(record: any) {
//     if (!(await validateID(record.otherPersonInformation))) return;

//     const patientID = await savePersonInformation(record);
//     if (!patientID) return;

//     await Promise.all([createGuardian(patientID, record), saveBirthdayData(patientID, record)]);
// }

// async function validateID({ nationalID, birthID }: any) {
//     return (await validateNationalID(nationalID)) && (await validateBirthID(birthID));
// }

// async function savePersonInformation(record: any) {
//     if (record.personInformation && record.saveStatusPersonInformation === "pending") {
//         try {
//             Service.postJson("/people", this.person);
//             const registration = new PatientRegistrationService();
//             await registration.registerPatient(record.personInformation, []);
//             const patientID = registration.getPersonID();
//             await updatePatientInformation(record, patientID);
//             await updateSaveStatus(record, {
//                 saveStatusPersonInformation: "complete",
//                 serverPatientID: patientID,
//             });
//             createIDs(record.otherPersonInformation, patientID);
//             enrollProgram(patientID);
//             createRegistrationEncounter(patientID);
//             return patientID;
//         } catch (error) {
//             toastDanger("Failed to save person information");
//         }
//     }
//     return record.serverPatientID;
// }

// async function updatePatientInformation(record: any, patientID: any) {
//     const patientData = await PatientService.findByID(patientID);
//     // await db.collection("patientRecords").doc({ offlinePatientID: record.offlinePatientID }).update({
//     //     patientData: patientData,
//     // });
//     workerData.postData("UPDATE_RECORD", {
//         storeName: "patientRecords",
//         whereClause: { offlinePatientID: record.offlinePatientID },
//         data: {
//             patientData: patientData,
//         },
//     });
// }
// async function createIDs({ nationalID, birthID }: any, patientID: any) {
//     const patient = new PatientService();
//     if (nationalID) await patient.updateMWNationalId(nationalID, patientID);
//     if (birthID) await patient.updateBirthId(birthID, patientID);
// }

// async function createGuardian(patientID: any, record: any) {
//     if (record.saveStatusGuardianInformation === "pending") {
//         if (record.guardianInformation.given_name && record.guardianInformation.family_name && record.otherPersonInformation.relationshipID) {
//             try {
//                 const guardian = new PatientRegistrationService();
//                 await guardian.registerGuardian(record.guardianInformation);
//                 const guardianID = guardian.getPersonID();
//                 await RelationsService.createRelation(patientID, guardianID, record.otherPersonInformation.relationshipID);
//                 await updateSaveStatus(record, { saveStatusGuardianInformation: "complete" });
//             } catch (error) {
//                 toastDanger("Failed to save guardian information");
//             }
//         } else {
//             await updateSaveStatus(record, { saveStatusGuardianInformation: "Not recorded" });
//         }
//     }
// }

// async function saveBirthdayData(patientID: any, record: any) {
//     if (record.saveStatusBirthRegistration === "pending") {
//         if (record.birthRegistration.length > 0) {
//             try {
//                 const userID: any = Service.getUserID();
//                 const registration = new AppEncounterService(patientID, 5, userID);
//                 await registration.createEncounter();
//                 await registration.saveObservationList(record.birthRegistration);
//                 await updateSaveStatus(record, { saveStatusBirthRegistration: "complete" });
//             } catch (error) {
//                 toastDanger("Failed to save birth information");
//             }
//         } else {
//             await updateSaveStatus(record, { saveStatusBirthRegistration: "Not recorded" });
//         }
//     }
// }

// async function enrollProgram(patientId: any) {
//     const program = new PatientProgramService(patientId);
//     await program.enrollProgram();
// }

// async function createRegistrationEncounter(patientId: any) {
//     const encounter = new AppEncounterService(patientId, 5);
//     await encounter.createEncounter();
//     await encounter.saveValueCodedObs("Type of patient", "New Patient");
// }

// async function updateSaveStatus(record: any, saveStatus: any) {
//     // await db.collection("patientRecords").doc({ offlinePatientID: record.offlinePatientID }).update(saveStatus);
//     workerData.postData("UPDATE_RECORD", {
//         storeName: "patientRecords",
//         whereClause: { offlinePatientID: record.offlinePatientID },
//         data: saveStatus,
//     });
// }

// async function validateNationalID(nationalID: any) {
//     return (
//         nationalID === "" ||
//         !(await checkIDExistence(28, nationalID)) ||
//         (toastWarning("The national ID is already assigned to another person"), false)
//     );
// }

// async function validateBirthID(birthID: any) {
//     return birthID === "" || !(await checkIDExistence(23, birthID)) || (toastWarning("The Birth ID is already assigned to another person"), false);
// }

// async function checkIDExistence(nid: any, identifierId: any) {
//     return nid ? (await PatientService.findByOtherID(nid, identifierId)).length > 0 : false;
// }
