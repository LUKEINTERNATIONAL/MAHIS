<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Profile" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData" />
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
} from "@ionic/vue";
import { ConceptService } from "@/services/concept_service";
import { defineComponent } from "vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import ToolbarSearch from "@/apps/ANC/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { mapState } from "pinia";
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import PastObstreticHistory from "../components/Profile/PastObstreticHistory.vue";
import CurrentPregnancies from "../components/Profile/CurrentPregnancies.vue";
import Medications from "../components/Profile/Medications.vue";
import MedicalHistory from "@/apps/ANC/components/Profile/MedicalHistory.vue";
import WomanBehaviour from "../components/Profile/WomanBehaviour.vue";
import { getCheckboxSelectedValue, getRadioSelectedValue } from "@/services/data_helpers";
import { useMedicalHistoryStore } from "@/apps/ANC/store/profile/medicalHistoryStore";
import { useObstreticHistoryStore } from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import { useMedicationsStore } from "@/apps/ANC/store/profile/MedicationsStore";
import { useWomanBehaviourStore } from "@/apps/ANC/store/profile/womanBehaviourStore";
import { Service } from "@/services/service";
//import { ProfileService } from "@/services/anc_profile_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { Preterms } from "../service/preterm";
import { PastObstetricHistoryService } from "@/services/anc_profile_service";

// function someChecked(options, errorMassage) {
//   if (!options.filter(v => v.checkboxBtnContent).some(v => v.checkboxBtnContent.data.some(d => d.checked))) {
//     return errorMassage
//   }
// }
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
        PastObstreticHistory,
        WomanBehaviour,
        CurrentPregnancies,
        Medications,
        MedicalHistory,
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Past Obstetric History",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Medical History",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Current Pregnancy",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Medications",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },

                {
                    title: "Woman behaviour",
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
                    title: "Past Obstetric History",
                    component: "PastObstetricHistory",
                    value: "1",
                },
                {
                    title: "Past Medical history",
                    component: "MedicalHistory",
                    value: "2",
                },
                {
                    title: "Current Pregnancy",
                    component: "CurrentPregnancies",
                    value: "3",
                },
                {
                    title: "Medications",
                    component: "Medications",
                    value: "4",
                },
                {
                    title: "Woman behaviour",
                    component: "WomanBehaviour",
                    value: "5",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {
        medicalHistory(change) {},
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useObstreticHistoryStore, ["preterm","prevPregnancies","Complications"]),
        ...mapState(useMedicalHistoryStore,['medicalHistory','allegy','exisitingChronicHealthConditions']),
        ...mapState(useCurrentPregnanciesStore,['palpation','tetanus','lmnp','ultrasound']),
        ...mapState(useMedicationsStore,['Medication']),
        ...mapState(useWomanBehaviourStore,['dailyCaffeineIntake'])
    },
    mounted() {
        // this.markWizard()
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {
        },
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
       
         async saveData() {
            this.savePrevPregnancies()
            this.savePreterm()
            this.savePastPregnancyComplication()
            this.savePastSurgeries()
            this.saveAllergy()
            this.saveChronicHealthCondition()
            this.saveCurrentPrengancy()
            this.saveMedication()
            this.saveCaffeinIntake()
            toastSuccess("Profile data saved successfully")
            this.$router.push("headssAssessment");
        },
        async savePrevPregnancies(){
        // if (this.prevPregnancies[0].selectedData.length > 0) {
        //     const userID: any = Service.getUserID();
        //     const PrevPregnancies = new PastObstetricHistoryService(this.demographics.patient_id, userID);
        //     const encounter = await PrevPregnancies.createEncounter();
        //     if (!encounter) return toastWarning("Unable to create Pregnancies encounter");
        //     const patientStatus = await PrevPregnancies.saveObservationList(await this.buildPregnancyHistory());
        //     if (!patientStatus) return toastWarning("Unable to create Pregnancies!");
        //     toastSuccess("Prev Pregnancies has been created");
        // }
            console.log(await this.buildPregnancyHistory())
        },
        async savePreterm(){    
        // if (this.preterm[0].selectedData.length > 0) {
        //     const userID: any = Service.getUserID();
        //     const Preterm = new PastObstetricHistoryService(this.demographics.patient_id, userID);
        //     const encounter = await Preterm.createEncounter();
        //     if (!encounter) return toastWarning("Unable to create Preterm encounter");
        //     const patientStatus = await Preterm.saveObservationList(await this.buildPreterm());
        //     if (!patientStatus) return toastWarning("Unable to create Preterm !");
        //     toastSuccess("Pretermhas been created");
        // }
        console.log(await this.buildPreterm())
        },
        async savePastPregnancyComplication(){
        // if (this.preterm[0].selectedData.length > 0) {
        //     const userID: any = Service.getUserID();
        //     const Preterm = new ProfileService(this.demographics.patient_id, userID);
        //     const encounter = await Preterm.createEncounter();
        //     if (!encounter) return toastWarning("Unable to create Preterm encounter");
        //     const patientStatus = await Preterm.saveObservationList(await this.buildPastObstetricHistory());
        //     if (!patientStatus) return toastWarning("Unable to create Preterm !");
        //     toastSuccess("Pretermhas been created");
        // }
        console.log(await this.buildPastPregnancyComplication())
        },
        async savePastSurgeries(){
            console.log(await this.buildPastSurgeries())
        },
        async saveAllergy(){
            console.log(await this.buildAllergy())
        },
        async saveChronicHealthCondition(){
            console.log(await this.buildChronicHealthCondition())
        },
        async saveCurrentPrengancy(){
            console.log(await this.buildCurrentPrengancy())
        },
        async saveMedication(){
            console.log(await this.buildMedication())
        },
        async saveCaffeinIntake(){
            console.log(await this.buildCaffeinIntake())
        },
        async buildPregnancyHistory(){
            return[
                ...(await formatInputFiledData(this.prevPregnancies))
            ]
        },
        async buildPreterm(){
            return [
                ...(await formatRadioButtonData(this.preterm)),       
            ];
        },
        async buildPastPregnancyComplication(){
            return [
                ...(await formatCheckBoxData(this.Complications)),
                ...(await formatInputFiledData(this.Complications))       
            ];
        },
        async buildPastSurgeries(){
            return[
                ...(await formatCheckBoxData(this.medicalHistory)),
                ...(await formatInputFiledData(this.medicalHistory))
            ]
        },
        async buildAllergy(){
            return[
                ...(await formatCheckBoxData(this.allegy)),
                 ...(await formatInputFiledData(this.allegy))
            ]
        },
        async buildChronicHealthCondition(){
            return[
                ...(await formatCheckBoxData(this.exisitingChronicHealthConditions)),
                ...(await formatInputFiledData(this.exisitingChronicHealthConditions))
            ]
        },
        async buildCurrentPrengancy(){
            return[
                ...(await formatRadioButtonData(this.palpation)),
                ...(await formatRadioButtonData(this.tetanus)),
                ...(await formatRadioButtonData(this.lmnp)),
                ...(await formatRadioButtonData(this.ultrasound)),
                ...(await formatInputFiledData(this.ultrasound))
            ]
        },
        async buildMedication(){
            return[
                ...(await formatCheckBoxData(this.Medication)),
                ...(await formatInputFiledData(this.Medication))
            ]
        },
        async buildCaffeinIntake(){
            return[
                ...(await formatCheckBoxData(this.dailyCaffeineIntake)),
                ...(await formatRadioButtonData(this.dailyCaffeineIntake)),
                ...(await formatRadioButtonData(this.dailyCaffeineIntake)),
            ]
        },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
