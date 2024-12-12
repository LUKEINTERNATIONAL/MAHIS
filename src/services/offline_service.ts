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
 * Retrieve data from the database with object-based filtering
 * @param storeName - Name of the object store
 * @param whereClause - Object with key-value pairs to match
 * @returns Promise resolving to matched records
 */
export async function getOfflineRecords<T = any>(storeName: string, whereClause?: Partial<T>) {
    const db = await openDatabase(storeName);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const allRecords = (event.target as IDBRequest).result as T[];

            // Apply where clause if provided
            const filteredRecords = whereClause
                ? allRecords.filter((record) => Object.entries(whereClause).every(([key, value]) => record[key as keyof T] === value))
                : allRecords;

            resolve(filteredRecords);
        };

        request.onerror = (event) => {
            reject(`Error retrieving data: ${(event.target as IDBRequest).error}`);
        };
    });
}

export async function getOfflineFirstObsValue(data: any, value_type: string, concept_id?: number): Promise<string | number | undefined> {
    // If concept_id is provided, filter the data first
    const filteredData = concept_id ? data.filter((item: any) => item.concept_id === concept_id) : data;

    // Then sort and return the first item's specified value
    return filteredData.sort((a: any, b: any) => new Date(b.obs_datetime).getTime() - new Date(a.obs_datetime).getTime())[0]?.[value_type];
}
