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
        doneLoading: false,
        route: "" as any,
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
                    workerData.postData("RESET");
                    this.doneLoading = true;
                    this.setRecord(this.workerApi?.data?.payload);
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        setRecord(item: any) {
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(item);
            if (this.route) this.$router.push(this.route);
        },
        async setPatientRecord(item: any) {
            if (item.ID) {
                this.setRecord(item);
            } else {
                const patientRecord = await getOfflineRecords("patientRecords", { ID: this.getPatientIdentifier(item, 3) }, false);
                if (patientRecord) {
                    this.setRecord(patientRecord);
                } else {
                    this.workerApi = workerData.workerApi;
                    workerData.postData("BUILD_PATIENT_RECORD", { data: toRaw(item) });
                }
            }
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
            this.setRecord(await getOfflineRecords("patientRecords", { ID: this.patient.ID }, false));
        },
    },
});
</script>
