import { defineStore } from "pinia";
import { ref, watch, toRaw } from "vue";
import workerData from "@/activate_worker";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { toastSuccess } from "@/utils/Alerts";

export const useWorkerStore = defineStore("worker", () => {
    const workerApi = ref<any>(null);
    const doneLoading = ref(false);
    const route = ref("");
    let patientID: any = ref("");
    let router: any = null;

    workerApi.value = workerData.workerApi;
    watch(
        () => workerApi.value,
        async (newValue) => {
            if (newValue?.data?.msg === "done building patient record") {
                workerData.postData("RESET");
                doneLoading.value = true;
                setRecord(newValue?.data?.payload);
            }

            if (newValue?.data?.msg === "saved successfully") {
                patientID.value = newValue?.data?.payload?.ID;
                if (patientID.value) {
                    workerData.postData("RESET");
                    toastSuccess("Saved on server successfully");
                    const offlinePatientData = await getOfflinePatientData();
                    setRecord(offlinePatientData);
                }
            }
        },
        {
            deep: true,
            immediate: true,
        }
    );

    function setRecord(item: any) {
        const demographicsStore = useDemographicsStore();

        demographicsStore.setPatient(item);
        if (route.value && router) {
            router.push(route.value);
        }
    }
    function setRouter(routerInstance: any) {
        router = routerInstance;
    }
    async function setPatientRecord(item: any) {
        if (item?.ID) {
            setRecord(item);
        } else {
            patientID.value = getPatientIdentifier(item, 3);
            const patientRecord: any = await getOfflinePatientData();
            if (patientRecord) {
                setRecord(patientRecord);
            } else {
                workerData.postData("BUILD_PATIENT_RECORD", { data: toRaw(item) });
            }
        }
    }
    async function getPatientIdentifier(identifiers: any, id: any) {
        if (identifiers) {
            return identifiers.patient_identifiers
                .filter((identifier: any) => identifier.identifier_type === id)
                .map((identifier: any) => identifier.identifier)
                .join(", ");
        } else {
            return "";
        }
    }
    async function getOfflinePatientData() {
        if (patientID.value) {
            const { getOfflineRecords } = await import("@/services/offline_service");
            return await getOfflineRecords("patientRecords", { ID: await patientID.value }, false);
        }
        return null;
    }

    function updateWorkerApi(data: any) {
        workerData.workerApi = data;
        workerApi.value = data;
    }

    function postWorkerData(action: string, payload?: any) {
        workerData.postData(action, payload);
    }

    return {
        workerApi,
        doneLoading,
        patientID,
        route,
        updateWorkerApi,
        postWorkerData,
        setRouter,
        setPatientRecord,
    };
});