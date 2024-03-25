<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="The consultation plan"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
                :StepperData="StepperData"
            />
        </ion-content>
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
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/apps/NCD/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useDispositionStore } from "@/stores/OutcomeStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
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
    },
    data() {
        return {
            dispositions: "" as any,
            wizardData: [
                {
                    title: "Presenting Complaints",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Investigations",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Diagnosis",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Physical Exams",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },
                {
                    title: "Treatment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "",
                },
                {
                    title: "Outcome",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 7,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Presenting Complaints",
                    componet: "Vitals",
                    value: "1",
                },
                {
                    title: "Investigations",
                    componet: "Investigations",
                    value: "2",
                },
                {
                    title: "Diagnosis",
                    componet: "Diagnosis",
                    value: "3",
                },
                {
                    title: "Physical Exams",
                    componet: "Complications",
                    value: "4",
                },
                {
                    title: "Treatment plan",
                    componet: "TreatmentPlan",
                    value: "5",
                },
                {
                    title: "Outcome",
                    componet: "Outcome",
                    value: "7",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
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
            if (this.vitals.validationStatus) {
                this.wizardData[0].checked = true;
                this.wizardData[0].class = "open_step common_step";
            } else {
                this.wizardData[0].checked = false;
            }

            if (this.investigations[0].selectedData.length > 0) {
                this.wizardData[1].checked = true;
                this.wizardData[1].class = "open_step common_step";
            } else {
                this.wizardData[1].checked = false;
            }

            if (this.diagnosis[0].selectedData.length > 0) {
                this.wizardData[2].checked = true;
                this.wizardData[2].class = "open_step common_step";
            } else {
                this.wizardData[2].checked = false;
            }

            if (this.selectedMedicalDrugsList.length > 0) {
                this.wizardData[4].checked = true;
                this.wizardData[4].class = "open_step common_step";
            } else {
                this.wizardData[4].checked = false;
            }
        },
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        saveData() {
            if (this.vitals.validationStatus && this.investigations[0].selectedData.length > 0 && this.diagnosis[0].selectedData.length > 0) {
                this.saveVitals();
                this.saveInvestigation();
                this.saveDiagnosis();
                this.saveTreatmentPlan();
                this.saveOutComeStatus();
                this.$router.push("patientProfile");
            } else {
                toastWarning("Please complete all required fields");
                this.saveOutComeStatus();
            }
        },
        saveInvestigation() {
            const investigationInstance = new LabOrder();
            investigationInstance.postActivities(this.demographics.patient_id, this.getFormatedData(this.investigations[0].selectedData));
        },
        saveVitals() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            vitalsInstance.onFinish(this.vitals);
        },
        saveDiagnosis() {
            const userID: any = Service.getUserID();
            const diagnosisInstance = new Diagnosis();
            diagnosisInstance.onSubmit(this.demographics.patient_id, userID, this.getFormatedData(this.diagnosis[0].selectedData));
        },
        async saveTreatmentPlan() {
            const userID: any = Service.getUserID();
            const patientID = this.demographics.patient_id;
            const treatmentInstance = new Treatment();

            if (!isEmpty(this.selectedMedicalAllergiesList)) {
                const allergies = this.mapToAllergies();
                treatmentInstance.onSubmitAllergies(patientID, userID, allergies);
            }

            if (!isEmpty(this.nonPharmalogicalTherapyAndOtherNotes)) {
                const treatmentNotesTxt = [
                    {
                        concept_id: 2688,
                        obs_datetime: Service.getSessionDate(),
                        value_text: this.nonPharmalogicalTherapyAndOtherNotes,
                    },
                ];
                treatmentInstance.onSubmitNotes(patientID, userID, treatmentNotesTxt);
            }

            if (!isEmpty(this.selectedMedicalDrugsList)) {
                const drugOrders = this.mapToOrders();
                const prescriptionService = new DrugPrescriptionService(patientID, userID);
                const encounter = await prescriptionService.createEncounter();
                if (!encounter) return toastWarning("Unable to create treatment encounter");
                const drugOrder = await prescriptionService.createDrugOrder(drugOrders);
                if (!drugOrder) return toastWarning("Unable to create drug orders!");
                toastSuccess("Drug order has been created");
            }
        },

        async saveOutComeStatus() {
            // const userID: any = Service.getUserID()
            // const patientID = this.demographics.patient_id
            // if (!isEmpty(this.dispositions)) {
            //     for (let key in this.dispositions) {
            //         if (this.dispositions[key].type == 'Admit') {
            //             console.log(this.dispositions[key])
            //         } else {
            //         }
            //     }
            // }
        },
        openModal() {
            createModal(SaveProgressModal);
        },
        mapToOrders(): any[] {
            return this.selectedMedicalDrugsList.map((drug: any) => {
                const startDate = DrugPrescriptionService.getSessionDate();
                const frequency = DRUG_FREQUENCIES.find((f) => f.label === drug.frequency) || ({} as (typeof DRUG_FREQUENCIES)[0]);
                return {
                    drug_inventory_id: drug.drug_id,
                    equivalent_daily_dose: drug.dose == "Unknown" ? 0 : drug.dose * frequency?.value || 0,
                    start_date: startDate,
                    auto_expire_date: this.calculateExpireDate(startDate, drug.duration),
                    units: drug.units,
                    instructions: `${drug.drugName}: ${drug.dose} ${drug.units} ${frequency?.code || ""} for ${drug.duration} days`,
                    dose: drug.dose,
                    frequency: frequency?.code || "",
                };
            });
        },
        calculateExpireDate(startDate: string | Date, duration: any) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + parseInt(duration));
            return HisDate.toStandardHisFormat(date);
        },
        mapToAllergies(): any[] {
            return this.selectedMedicalAllergiesList.map((allergy: any) => {
                return {
                    concept_id: 985,
                    obs_datetime: Service.getSessionDate(),
                    value_coded: allergy.concept_id,
                };
            });
        },
    },
});
</script>

<style scoped></style>
