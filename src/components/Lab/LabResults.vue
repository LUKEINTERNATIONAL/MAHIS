<template>
    <div class="modal_wrapper">
        <div class="modal_title diplay_space_between">
            <span></span>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300">x</span>
        </div>
        <div class="center">
            <h4>
                <b>Enter lab results for ({{ labResults[0].name }}) test</b>
            </h4>
        </div>
        <div class="center text_12">
            <ion-row>
                <basic-form :contentData="labResults"> </basic-form>
            </ion-row>
        </div>
        <br />
        <div class="triage_modal_btn center">
            <div class="center_btn">
                <ion-button class="primary_btn" @click="saveLabOrder()">Save</ion-button>
                <span @click="dismiss()" style="cursor: pointer"> Don't Save</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import { resetPatientData } from "@/services/reset_data";
import { useLabResultsStore } from "@/stores/LabResults";
import { mapState } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import { PatientLabOrderService } from "@/services/patient_lab_order_service";
import HisDate from "@/utils/Date";
import { useDemographicsStore } from "@/stores/DemographicStore";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        BasicForm,
    },
    data() {
        return {
            iconsContent: icons,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useLabResultsStore, ["labResults"]),
    },
    mounted() {
        this.labResults;
        // getFieldValue(this.labResults, this.labResults, "data");
        console.log("🚀 ~ mounted ~ this.labResults:", this.labResults[0].concept_id);
        console.log("🚀 ~ mounted ~ this.labResults:", this.labResults[0].name);
    },
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        async saveLabOrder() {
            const patientLabResultService = new PatientLabOrderService(this.patient.patientID);
            patientLabResultService.setTestID(this.labResults[0].id);
            patientLabResultService.setResultDate(HisDate.sessionDate());
            await patientLabResultService.createEncounter();
            await patientLabResultService.createLabResult(this.buildResults());
        },

        buildResults() {
            let measures = [] as any;
            this.labResults.forEach((item: any) => {
                if (item?.data?.rowData[0]?.colData[0]?.value) {
                    measures.push({
                        indicator: {
                            concept_id: item?.data?.rowData[0]?.colData[0]?.id,
                        },
                        value: item?.data?.rowData[0]?.colData[0]?.value,
                        value_modifier: "",
                        value_type: "numeric",
                    });
                }
            });
            console.log("🚀 ~ buildResults ~ measures:", measures);
            return measures;
        },
        async nav(url: any, action: any) {
            const demographicsStore = useLabResultsStore();
            if (action == "not_save") {
                await resetPatientData();
                demographicsStore.setLabResults(false);
            } else {
                demographicsStore.setLabResults(true);
            }
            this.dismiss();
            this.$router.push(url);
        },
    },
});
</script>

<style scoped>
.center {
    display: flex;
    justify-content: space-around;
}
.center_btn {
    display: flex;
    align-items: center;
    width: 170px;
    justify-content: space-between;
}
.text_12 {
    font-size: 14px;
    height: 510px;
    overflow: auto;
}
.large-modal {
    --width: 80vw;
}
.modal_title {
    margin-bottom: 0px;
}
</style>
