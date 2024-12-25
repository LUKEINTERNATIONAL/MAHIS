import workerData from "@/activate_worker";
import { toRaw } from "vue";
import { useWorkerStore } from "@/stores/workerStore";
// IndexedDB Helper Functions for MaHis Database

const DB_NAME = "MaHis";
const DB_VERSION = 1;

/**
 * Open or create the IndexedDB database connection
 * @param storeName - Name of the object store to create/use
 * @param keyPath - Key path for the object store
 * @returns Promise resolving to IDBDatabase
 */
function openDatabase(storeName: string = "defaultStore", keyPath: string = "id"): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject(`IndexedDB error: ${(event.target as IDBOpenDBRequest).error}`);
        };
    });
}

/**
 * Retrieve paginated data from the database
 * @param storeName - Name of the object store
 * @param options - Pagination and filtering options
 * @returns Promise resolving to paginated records
 */
export async function getOfflineRecords<T = any>(
    storeName: string,
    options: {
        currentPage?: number;
        itemsPerPage?: number;
        whereClause?: Partial<T>;
        sortBy?: keyof T;
        sortOrder?: "asc" | "desc";
    } = {},
    pagination = false
): Promise<{ records: T[]; totalCount: number } | T[]> {
    const { currentPage = 1, itemsPerPage = 0, whereClause, sortBy, sortOrder = "asc" } = options;

    const db = await openDatabase(storeName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            let allRecords = (event.target as IDBRequest).result as T[];

            // Apply where clause filtering if provided
            const filteredRecords = whereClause
                ? allRecords.filter((record) =>
                      Object.entries(whereClause).every(([key, value]) =>
                          typeof value === "string"
                              ? String(record[key as keyof T]).toLowerCase() === value.toLowerCase()
                              : record[key as keyof T] === value
                      )
                  )
                : allRecords;

            // Sort records if sortBy is provided
            if (sortBy) {
                filteredRecords.sort((a, b) => {
                    const valueA = a[sortBy];
                    const valueB = b[sortBy];
                    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
                    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
                    return 0;
                });
            }

            // Calculate total count before pagination
            const totalCount = filteredRecords.length;

            // Calculate start and end indices based on currentPage and itemsPerPage
            if (itemsPerPage != 0) {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                // Apply pagination
                const paginatedRecords = filteredRecords.slice(startIndex, endIndex);
                if (pagination) {
                    resolve({
                        records: paginatedRecords,
                        totalCount,
                    });
                }
            }

            resolve(filteredRecords);
        };

        request.onerror = (event) => {
            reject(`Error retrieving paginated data: ${(event.target as IDBRequest).error}`);
        };
    });
}
export async function getOfflineFirstObsValue(data: any, value_type: string, concept_id?: number): Promise<string | number | undefined> {
    // If concept_id is provided, filter the data first
    const filteredData = concept_id ? data.filter((item: any) => item.concept_id === concept_id) : data;

    // Then sort and return the first item's specified value
    return filteredData.sort((a: any, b: any) => new Date(b.obs_datetime).getTime() - new Date(a.obs_datetime).getTime())[0]?.[value_type];
}
export async function saveOfflinePatientData(patientData: any) {
    const plainPatientData = JSON.parse(JSON.stringify(patientData));
    await workerData.postData("DELETE_RECORD", { storeName: "patientRecords", data: plainPatientData });
    await workerData.postData("ADD_OBJECT_STORE", { storeName: "patientRecords", data: plainPatientData });
    useWorkerStore().postWorkerData("SYNC_PATIENT_RECORD", { msg: "Done Syncing", data: plainPatientData });
}
