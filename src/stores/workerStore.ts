import { defineStore } from "pinia";
import { ref, watch, toRaw } from "vue";
import workerData from "@/activate_worker";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { toastSuccess } from "@/utils/Alerts";
import { UserService } from "@/services/user_service";
import { Service } from "@/services/service";

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
                await setRecord(newValue?.data?.payload);
            }

            if (newValue?.data?.msg === "saved successfully") {
                patientID.value = newValue?.data?.payload?.ID;
                if (patientID.value) {
                    workerData.postData("RESET");
                    toastSuccess("Saved on server successfully");
                    const offlinePatientData = await getOfflinePatientData();
                    await setRecord(offlinePatientData);
                }
            }
        },
        {
            deep: true,
            immediate: true,
        }
    );

    async function setRecord(item: any) {
        const demographicsStore = useDemographicsStore();
        demographicsStore.setPatient(item);
        if (route.value && router) {
            router.push(route.value);
        } else if (programID() == 32) {
            const actions = await UserService.setProgramUserActions();
            router.push(actions?.url);
        }
    }
    function setRouter(routerInstance: any) {
        router = routerInstance;
    }
    function programID() {
        return Service.getProgramID();
    }
    async function setPatientRecord(item: any) {
        if (item?.ID) {
            await setRecord(item);
        } else {
            patientID.value = getPatientIdentifier(item, 3);
            const patientRecord: any = await getOfflinePatientData();
            if (patientRecord) {
                await setRecord(patientRecord);
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
            return await getOfflineRecords("patientRecords", { whereClause: { ID: await patientID.value } }).then((data: any) => data?.[0]);
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
