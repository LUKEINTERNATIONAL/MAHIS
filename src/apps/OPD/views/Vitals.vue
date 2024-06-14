<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Vitals" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData" />
        </ion-content>
        <BasicFooter :name="actionBtn" @finishBtn="saveData()" />
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import BasicFooter from "@/components/BasicFooter.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
import { useVitalsStore } from "@/stores/VitalsStore";
import { getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
import { resetOPDPatientData } from "@/apps/OPD/config/reset_opd_data";
import { WorkflowService } from "@/services/workflow_service";
export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        DemographicBar,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonAccordion,
        IonAccordionGroup,
        IonItem,
        IonLabel,
        IonModal,
        Stepper,
        BasicFooter,
    },
    data() {
        return {
            hasValidationErrors: [] as any,
            dispositions: "" as any,
            actionBtn: "" as any,
            wizardData: [
                {
                    title: "Vital Signs",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
            ],
            StepperData: [
                {
                    title: "Vital Signs",
                    component: "VitalSigns",
                    value: "1",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
    },
    async created() {
        // this.getData();
    },
    mounted() {
        this.markWizard();
    },
    watch: {
        vitals: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        investigations: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        diagnosis: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        selectedMedicalDrugsList: {
            handler() {
                this.markWizard();
            },
        },
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {
            this.actionBtn = this.vitals[0].actionBtn;
            if (this.vitals.validationStatus) {
                this.wizardData[0].checked = true;
                this.wizardData[0].class = "open_step common_step";
            } else {
                this.wizardData[0].checked = false;
            }
        },
        async saveData() {
            if (this.actionBtn != "Finish") {
                if (this.vitals.validationStatus) {
                    await this.saveVitals();
                    resetOPDPatientData();
                    this.$router.push("OPDConsultationPlan");
                } else {
                    await this.validaterowData();
                    toastWarning("Please fill all required fields");
                }
            } else {
                this.$router.push("OPDConsultationPlan");
            }
        },
        async saveVitals() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            await vitalsInstance.onFinish(this.vitals);
        },
        async validaterowData() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            this.vitals.forEach((section: any, sectionIndex: any) => {
                if (section?.data?.rowData) {
                    section?.data?.rowData.forEach((col: any, colIndex: any) => {
                        col.colData.some((input: any, inputIndex: any) => {
                            const validateResult = vitalsInstance.validator(input);
                            if (validateResult?.length > 0) {
                                this.hasValidationErrors.push("false");
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = true;
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage =
                                    validateResult.flat(Infinity)[0];
                                return true;
                            } else {
                                this.hasValidationErrors.push("true");
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = false;
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = "";
                            }

                            return false;
                        });
                    });
                }
            });

            this.vitals.validationStatus = !this.hasValidationErrors.includes("false");
        },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
