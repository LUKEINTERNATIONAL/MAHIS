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
import PastObstreticHistory from "../components/profile/PastObstreticHistory.vue";
import CurrentPregnancies from "../components/profile/CurrentPregnancies.vue";
import Medications from "../components/profile/Medications.vue";
import MedicalHistory from "@/apps/ANC/components/profile/MedicalHistory.vue";
import WomanBehaviour from "../components/profile/WomanBehaviour.vue";
import { getCheckboxSelectedValue, getRadioSelectedValue } from "@/services/data_helpers";
import { useMedicalHistoryStore } from "@/apps/ANC/store/profile/medicalHistoryStore";
import { useObstreticHistoryStore } from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import { useMedicationsStore } from "@/apps/ANC/store/profile/MedicationsStore";
import { useWomanBehaviourStore } from "@/apps/ANC/store/profile/womanBehaviourStore";
import { Service } from "@/services/service";
//import { ProfileService } from "@/services/anc_profile_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { formatCheckBoxData, formatRadioButtonData } from "@/services/formatServerData";
import { Preterms } from "../service/preterm";

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
                    componet: "PastObstetricHistory",
                    value: "1",
                },
                {
                    title: "Past Medical history",
                    componet: "MedicalHistory",
                    value: "2",
                },
                {
                    title: "Current Pregnancy",
                    componet: "CurrentPregnancies",
                    value: "3",
                },
                {
                    title: "Medications",
                    componet: "Medications",
                    value: "4",
                },
                {
                    title: "Woman behaviour",
                    componet: "WomanBehaviour",
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
        ...mapState(useObstreticHistoryStore, ["preterm"]),
        ...mapState(useObstreticHistoryStore, ["Complications"]),
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
            //   if(this.medications.validationStatus){
            //     this.wizardData[0].checked = true;
            //     this.wizardData[0].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[0].checked = false;
            //   }
            //   if(this.medicalHistory[0].selectdData.length > 0){
            //     this.wizardData[1].checked = true;
            //     this.wizardData[1].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[1].checked = false;
            //   }
            //   if(this.womanBehaviour[0].selectdData.length > 0){
            //     this.wizardData[2].checked = true;
            //     this.wizardData[2].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[2].checked = false;
            //   }
            //   if(this.medications[0].selectdData.length > 0){
            //     this.wizardData[2].checked = true;
            //     this.wizardData[2].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[2].checked = false;  
            //   }
        },
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
         async saveData() {
            this.savePreterm()
            this.savePastPregnancyComplication()
            this.savePastSurgeries()
            this.saveAllergy()
            this.saveChronicHealthCondition()
            this.saveCurrentPrengancy()
            this.saveMedication()
            this.saveCaffeinIntake()
        },
        async savePreterm(){
        // if (this.preterm[0].selectedData.length > 0) {
        //     const userID: any = Service.getUserID();
        //     const Preterm = new ProfileService(this.demographics.patient_id, userID);
        //     const encounter = await Preterm.createEncounter();
        //     if (!encounter) return toastWarning("Unable to create Preterm encounter");
        //     const patientStatus = await Preterm.saveObservationList(await this.buildPastObstetricHistory());
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
        async buildPreterm(){
            return [
                ...(await formatRadioButtonData(this.preterm)),       
            ];
        },
        async buildPastPregnancyComplication(){
            return [
                ...(await formatCheckBoxData(this.Complications))        
            ];
        },
        async buildPastSurgeries(){
            return[
                ...(await formatCheckBoxData(this.medicalHistory))
            ]
        },
        async buildAllergy(){
            return[
                ...(await formatCheckBoxData(this.allegy))
            ]
        },
        async buildChronicHealthCondition(){
            return[
                ...(await formatCheckBoxData(this.exisitingChronicHealthConditions))
            ]
        },
        async buildCurrentPrengancy(){
            return[
                ...(await formatRadioButtonData(this.palpation)),
                ...(await formatRadioButtonData(this.tetanus)),
                ...(await formatRadioButtonData(this.lmnp)),
                ...(await formatRadioButtonData(this.ultrasound)),
            ]
        },
        async buildMedication(){
            return[
                ...(await formatCheckBoxData(this.Medication))
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
