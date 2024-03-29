<template>
    <ion-modal :is-open="popoverOpen" :show-backdrop="true" @didDismiss="$emit('closePopoover', false)" :keyboard-close="keyboardClose">
        <ion-header>
            <ion-toolbar>
                <ion-title
                    ><b>Enter lab results for ({{ labResults[0].name }}) test</b></ion-title
                >
                <ion-buttons slot="end">
                    <ion-button @click="$emit('closeModal')">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="modal_wrapper">
                <div class="center text_12">
                    <ion-row>
                        <basic-form :contentData="labResults"> </basic-form>
                    </ion-row>
                </div>
            </div>
        </ion-content>
        <ion-footer :translucent="true">
            <ion-toolbar>
                <DynamicButton @click="saveResults()" name="Save" fill="clear" iconSlot="icon-only" style="float: right" />
            </ion-toolbar>
        </ion-footer>
    </ion-modal>
</template>

<script lang="ts">
import { IonButtons, IonButton, IonModal, IonAvatar, IonImg, IonLabel, IonPage, IonFooter } from "@ionic/vue";
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import { resetPatientData } from "@/services/reset_data";
import { useLabResultsStore } from "@/stores/LabResults";
import { mapState } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import { PatientLabResultService } from "@/services/patient_lab_result_service";
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
import DynamicButton from "@/components/DynamicButton.vue";

export default defineComponent({
    components: {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonList,
        IonAvatar,
        IonImg,
        IonLabel,
        IonPage,
        IonMenu,
        BasicForm,
        IonFooter,
        DynamicButton,
    },
    data() {
        return {
            popoverStatus: null,
        };
    },
    props: {
        keyboardClose: {
            type: Boolean,
            default: false,
        },
        keepContentsMounted: {
            type: Boolean,
            default: false,
        },
        content: {
            type: Object,
            default: {},
        },
        popoverOpen: {
            type: Boolean,
            default: false,
        },
        event: {
            type: Event,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
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
        async saveResults() {
            const patientLabResultService = new PatientLabResultService(this.demographics.patient_id);
            patientLabResultService.setTestID(this.labResults[0].id);
            patientLabResultService.setResultDate(HisDate.currentDate());
            await patientLabResultService.createEncounter();
            await patientLabResultService.createLabResult(this.buildResults());
            this.$emit("saved");
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
            return measures;
        },
        nav(url: any, action: any) {
            const demographicsStore = useLabResultsStore();
            if (action == "not_save") {
                resetPatientData();
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
ion-footer {
    --ion-toolbar-background: #f4f4f4f4;
}
ion-modal {
    --width: 90%;
    --height: 94%;
}
</style>
