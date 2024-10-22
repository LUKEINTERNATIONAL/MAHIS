<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Labour assessment"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"
                :getSaveFunction="getSaveFunction"
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastSuccess, toastWarning } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import Stepper from "@/components/Stepper.vue";
import { mapState } from "pinia";
import { getCheckboxSelectedValue } from "@/services/data_helpers";
import { useDemographicsStore } from "@/stores/DemographicStore";
// import { useObstreticHistoryStore } from "../stores/obstetric details/obstetric";
import { useLabourQuickCheckStore } from "../stores/physical exam/quickCheck";
import { useLabourPhysicalExamStore } from "../stores/physical exam/physicalExamination";
import { usefirstVaginalExaminationStore } from "../stores/physical exam/firstVaginalExamination";
import { usePelvicAssessmentStore } from "../stores/physical exam/pelvicAssessment";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { Service } from "@/services/service";
import {QuickCheckInstance,PhysicalExamInstance, VaginalExamInstance, PelvicAssessmentInstance } from '@/apps/LABOUR/services/labour_assesment_service';
import { resetPatientData } from "@/services/reset_data";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";

export default defineComponent({
    name: "obstetricDetails",
  mixins: [SetUserRole, SetEncounter],
  components: {
      BasicFooter,
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
            wizardData: [
                {
                    title: "Quick Check",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Physical examination",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "First vaginal assessment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Pelvis assessment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Quick check",
                    component: "QuickCheck",
                    value: "1",
                },
                {
                    title: "Physical examination",
                    component: "PhysicalExamination",
                    value: "2",
                },
                {
                    title: "First vaginal examination",
                    component: "FirstVaginalExamination",
                    value: "3",
                },
                {
                    title: "Pelvic assessment",
                    component: "PelvicAssessment",
                    value: "4",
                },

            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {
        medicalHistory(change) {
            console.log(change);
        },
    },
    computed: { 
         ...mapState(useDemographicsStore, ["demographics"]),
         ...mapState(useLabourQuickCheckStore,["pastProblems"]),
         ...mapState(useLabourPhysicalExamStore,["vitals"]),
         ...mapState(useLabourPhysicalExamStore,["anaemia"]),
         ...mapState(useLabourPhysicalExamStore,["otherphysicalExams"]),
         ...mapState(usefirstVaginalExaminationStore,["firstVaginalExamination"]),
         ...mapState(usePelvicAssessmentStore,["pelvicAssessment"]),

         
    },
    // saveData() {
    //     const medicalConditions = [
    //         "Auto immune desease",
    //         "Asthma",
    //         "Diabetes",
    //         "Sickle cell",
    //         "Anaemia",
    //         "Thalassemia",
    //         "Gynaecological",
    //         "CCF",
    //         "RHD",
    //         "Gestational diabetes",
    //         "pre-existing type 1",
    //         "pre-existing type 2",
    //         "Epilepsy",
    //         "Hypertension",
    //         "Kidney",
    //         "TB",
    //         "Mental  illiness",
    //     ];
    // },
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
      getSaveFunction(){

      },
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
        saveData() {
            const errors: any = [];
            // this.StepperData.forEach((stepper)=> {
            //   if (!stepper.validation) return
            //   Object.keys(stepper.validation).forEach((validationName) => {
            //     if (typeof stepper.validation[validationName] === 'function') {
            //       const state = stepper.validation[validationName](this[validationName])
            //       if (state) errors.push(state)
            //     }
            //   })
            // // })
            // if (errors.length) {
            //     return alert(errors.join(","));
            // }
          this.saveQuickCheck();
          this.saveVaginalExamInstance();
          this.savePhysicalExamInstance();
          this.savePelvicAssessmentInstance();
          resetPatientData();
          this.$router.push("labourHome");

        },

        async buildQuickCheck() {
       return [
          ...(await formatInputFiledData(this.pastProblems)),
          ...(await formatRadioButtonData(this.pastProblems)),
          ...(await formatCheckBoxData(this.pastProblems)),
        ]
    },

    async buildPhysicalExamination() {
       return [
          ...(await formatInputFiledData(this.vitals)),
          ...(await formatRadioButtonData(this.vitals)),
          ...(await formatRadioButtonData(this.anaemia)),
          ...(await formatRadioButtonData(this.otherphysicalExams)),
          
        ]
    },

    async buildFirstVaginalExamination() {
       return [
          ...(await formatInputFiledData(this.firstVaginalExamination)),
          ...(await formatRadioButtonData(this.firstVaginalExamination)),
        ]
    },

    async buildPelvicAssessment() {
       return [
          ...(await formatInputFiledData(this.pelvicAssessment)),
          ...(await formatRadioButtonData(this.pelvicAssessment)),
        ]
    },

    async saveQuickCheck () {
        const data: any = await this.buildQuickCheck();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const quickCheckInstance = new QuickCheckInstance();
            quickCheckInstance.push(this.demographics.patient_id, userID, data)
            toastSuccess("Quick check data saved successfully");
        }

        else {
            toastWarning("Could not find concepts");
        }
    },

    async savePhysicalExamInstance () {
        const data: any = await this.buildPhysicalExamination();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const physicalExamInstance = new PhysicalExamInstance();
            physicalExamInstance.push(this.demographics.patient_id, userID, data)
            toastSuccess("Physical examination data saved successfully");
        }

        else {
            toastWarning("Could not find concepts");
        }
    },

    async saveVaginalExamInstance () {
        const data: any = await this.buildFirstVaginalExamination();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const vaginalExamInstance = new VaginalExamInstance();
            vaginalExamInstance.push(this.demographics.patient_id, userID, data)
            toastSuccess("First Vaginal Examination data saved successfully");
        }

        else {
            toastWarning("Could not find concepts");
        }
    },

    async savePelvicAssessmentInstance () {
        const data: any = await this.buildPelvicAssessment();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const pelvicAssessmentInstance = new PelvicAssessmentInstance();
            pelvicAssessmentInstance.push(this.demographics.patient_id, userID, data)
            toastSuccess("Pelvic Assessment data saved successfully");
        }

        else {
            toastWarning("Could not find concepts");
        }
    },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
