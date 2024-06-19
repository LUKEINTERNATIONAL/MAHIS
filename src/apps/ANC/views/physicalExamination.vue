<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Physical examination"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
                :StepperData="StepperData"
            />
        </ion-content>
        <BasicFooter @finishBtn="saveData()" />
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
import BasicFooter from "@/components/BasicFooter.vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/apps/ANC/store/physical exam/VitalsStore";
import { VitalsService } from "@/services/ANC/anc_vitals_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { getCheckboxSelectedValue, getFieldValue } from "@/services/data_helpers";
import { formatInputFiledData } from "@/services/formatServerData";
import { formatCheckBoxData } from "@/services/formatServerData";
import {VitalsInstance, MartenalExamInstance, FetalAssessmentInstance, FetalPresentationInstance, PresentingSignsInstance} from "@/apps/ANC/service/physical_exam"
import {useMaternalExamStore} from '@/apps/ANC/store/physical exam/MaternalExamStore'
import { formatRadioButtonData } from "@/services/formatServerData";
import { useFetalAssessment } from "../store/physical exam/FetalAssessmentStore";
import { useFetalPresentationStore } from "../store/physical exam/FetalPresantationStore";
import { usePresentingSigns } from "../store/physical exam/PresentingSignsStore";
import { resetPatientData } from "@/services/reset_data";
export default defineComponent({
    name: "PhysicalExam",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        BasicFooter,
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
            wizardData: [
                {
                    title: "Vitals",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Maternal exam",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Fetal assessment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Fetal presentation",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },
                {
                    title: "Presenting signs for IPV",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Vitals",
                    component: "Vitals",
                    value: "1",
                },
                {
                    title: "Maternal exam",
                    component: "MaternalExam",
                    value: "2",
                },
                {
                    title: "Fetal assessment",
                    component: "FetalAssessment",
                    value: "3",
                },
                {
                    title: "Fetal presentation",
                    component: "FetalPresentation",
                    value: "4",
                },
                {
                    title: "Presenting signs or conditions for IPV ",
                    component: "PresentingSigns",
                    value: "5",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore,["vitals",]),
        ...mapState(useMaternalExamStore,["pallor", "breastExam", "vaginalInspection", "cervicalExam", "oedemaPresence"]),
        ...mapState(useFetalAssessment, ["fetalAssessment"]),
        ...mapState(useFetalPresentationStore,["fetalPresentation"]),
        ...mapState(usePresentingSigns,["signsOfInjury", "clinicalEnquiry", "intimateViolence"]),

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
        DangerSigns: {
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
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {
            // if(this.vitals.validationStatus){
            // this.wizardData[0].checked = true;
            // this.wizardData[0].class = "open_step common_step";
            // }else{
            //   this.wizardData[0].checked = false;
            // }

            // if(this.DangerSigns[0].selectdData.length > 0){
            //   this.wizardData[1].checked = true;
            //   this.wizardData[1].class = 'open_step common_step'
            // }else{
            //   this.wizardData[1].checked = false;
            // }

            // if (this.diagnosis[0].selectdData.length > 0) {
            //     this.wizardData[2].checked = true;
            //     this.wizardData[2].class = "open_step common_step";
            // } else {
            //     this.wizardData[2].checked = false;
            // }
        },
        deleteDisplayData(data: any){
          return  data.map((item: any) => {
            delete item?.display;
            return item?.data;
          });
        },
        saveData() {
            if (this.vitals) {
                this.saveVitals();
                this.saveMartenalExam();
                this.saveFetalAssessment();
                this.saveFetalPresentation();
                this.savePresentingSigns();
                resetPatientData();
                //this.$router.push("ANChome");
                toastSuccess("Physical examination data saved successfully");
            } else {
                toastWarning("Please complete all required fields");
            }
        },

       async buildVitals() {
       return [
         ...(await formatInputFiledData(this.vitals)),
         // ...(await formatCheckBoxData(this.respiration)),
         // ...(await formatCheckBoxData(this.preEclampsia))
        ]
    },
    async buildMartenalExam() {
        return [
            ...(await formatRadioButtonData(this.pallor)),
            ...(await formatCheckBoxData(this.breastExam)),
            ...(await formatCheckBoxData(this.vaginalInspection)),
            ...(await formatCheckBoxData(this.cervicalExam)),
            ...(await formatCheckBoxData(this.oedemaPresence)),
        ]

    },

    async buildFetalAssessment() {
        return [
            ...(await formatInputFiledData(this.fetalAssessment)),
            ...(await formatRadioButtonData(this.fetalAssessment)),
        ]

    },

    async buildFetalPresentation() {
        return [
        ...(await formatInputFiledData(this.fetalPresentation)),
        ...(await formatRadioButtonData(this.fetalPresentation)),
        ]

    },

    async buildPresentingSigns() {
        return [
        ...(await formatInputFiledData(this.signsOfInjury)),
        ...(await formatRadioButtonData(this.signsOfInjury)),
        ...(await formatRadioButtonData(this.clinicalEnquiry)),
        ...(await formatInputFiledData(this.clinicalEnquiry)),
        ...(await formatRadioButtonData(this.intimateViolence)),
        ...(await formatInputFiledData(this.intimateViolence)),

        
        ]

    },


    async saveVitals() {
            const data: any = await this.buildVitals();
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const vitalsInstance = new VitalsInstance();
                vitalsInstance.push(this.demographics.patient_id, userID, data);
                toastSuccess("Vitals saved successfully");
            }
            else {
                toastWarning ("could not find other concepts")
            }
        },
    
     async saveMartenalExam() {
            const data: any = await this.buildVitals();
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const martenalInstance = new MartenalExamInstance();
                martenalInstance.push(this.demographics.patient_id, userID, data);
                toastSuccess("Martenal exam saved successfully");
            }

            else {
                toastWarning("could not find other concepts")
            }
        },

    async saveFetalAssessment() {
            const data: any = await this.buildFetalAssessment;
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const fetalAssessmentInstance = new FetalAssessmentInstance();
                fetalAssessmentInstance.push(this.demographics.patient_id, userID, data);
                toastSuccess("Fetal assessment saved successfully")
            }

            else {
                toastWarning("could not find other concepts")
            }
        },

    async saveFetalPresentation() {
            const data: any = await this.buildFetalPresentation;
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const fetalPresentationInstance = new FetalPresentationInstance();
                fetalPresentationInstance.push(this.demographics.patient_id, userID, data);
                toastSuccess("Fetal presentation saved successfully")
            }
            else {
                toastWarning("could not find other concepts")
            }
        },
        async savePresentingSigns() {
            const data: any = await this.buildPresentingSigns;
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const presentingSignsInstance = new PresentingSignsInstance();
                presentingSignsInstance.push(this.demographics.patient_id, userID, data);
                toastSuccess("Presenting signs saved successfully")
            }
            else {
                toastWarning("could not find other concepts")
            }

        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
