<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { getPersonAttribute } from "@/interfaces/personAttribute";
import workerData from "@/activate_worker";
import { getOfflineRecords } from "@/services/offline_service";
import { mapState } from "pinia";
import { toastSuccess, toastWarning, popoverConfirmation, toastDanger } from "@/utils/Alerts";
export default defineComponent({
    data: () => ({
        districtList: [] as any,
        workerApi: "" as any,
        doneLoading: false,
        route: "" as any,
        patientID: "",
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
                if (this.workerApi?.data?.msg == "saved successfully") {
                    this.patientID = this.workerApi?.data?.payload?.ID;
                    if (this.patientID) {
                        workerData.postData("RESET");
                        toastSuccess("Saved on server successfully");
                        this.setRecord(await this.getOfflinePatientData());
                    }
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
                this.patientID = this.getPatientIdentifier(item, 3);
                const patientRecord: any = await this.getOfflinePatientData();
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
            console.log("🚀 ~ getOfflinePatientData ~ this.patientID :", this.patientID);
            if (this.patientID) return await getOfflineRecords("patientRecords", { ID: this.patientID }, false);
        },
        async savePatientRecord(record: any) {
            workerData.postData("SAVE_PATIENT_RECORD", { data: toRaw(record) });
        },
    },
});
</script>
