<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { getPersonAttribute } from "@/interfaces/personAttribute";
import workerData from "@/activate_worker";
import { getOfflineRecords } from "@/services/offline_service";
import { mapState } from "pinia";
export default defineComponent({
    data: () => ({
        districtList: [] as any,
        workerApi: "" as any,
    }),
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    mounted() {
        this.workerApi = workerData.workerApi;
    },
    watch: {
        workerApi: {
            async handler() {
                if (this.workerApi?.data?.msg == "done building patient record") {
                    this.setOfflineRecord(this.workerApi?.data?.payload);
                    workerData.postData("RESET");
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        setOfflineRecord(item: any) {
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(item);
        },
        setServerRecord(item: any) {
            this.workerApi = workerData.workerApi;
            workerData.postData("BUILD_PATIENT_RECORD", { data: toRaw(item) });
        },
        getPatientIdentifier(identifiers: any, id: any) {
            if (identifiers) {
                return identifiers.patient_identifiers
                    .filter((identifier: any) => identifier.identifier_type === id)
                    .map((identifier: any) => identifier.identifier)
                    .join(", ");
            } else {
                return "";
            }
        },
        formatCurrentAddress(data: any) {
            const addressComponents = [
                data?.personInformation?.current_district,
                data?.personInformation?.current_traditional_authority,
                data?.personInformation?.current_village,
            ];
            return addressComponents.filter(Boolean).join(",");
        },
        async getOfflinePatientData() {
            this.setOfflineRecord(await getOfflineRecords("patientRecords", { ID: this.patient.ID }, false));
        },
    },
});
</script>
