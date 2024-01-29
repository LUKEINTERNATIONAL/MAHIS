<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
  AccordionGroupCustomEvent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import ToolbarSearch from '@/components/ToolbarSearch.vue'
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import { useVitalsStore } from '@/stores/VitalsStore'
import { useDemographicsStore } from '@/stores/DemographicStore'
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { useDiagnosisStore } from '@/stores/DiagnosisStore'
import { mapState } from 'pinia';
import Stepper from '@/components/Stepper.vue'
import { Service } from "@/services/service";
import { LabOrder } from "@/apps/NCD/services/lab_order"
import { VitalsService } from "@/services/vitals_service";
import { toastWarning,popoverConfirmation, toastSuccess } from '@/utils/Alerts';
import { Diagnosis } from '@/apps/NCD/services/diagnosis'
import {useMedicationsStore} from "@/apps/ANC/store/profile/MedicationsStore";
export default defineComponent({
  name: "Home",
  components:{
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
    Stepper
  },
  data(){
    return {
      wizardData: [
        {
          'title': 'Past obstetric history',
          'class': 'common_step',
          'checked':false,
          'disabled':false,
          'number': 1,
          'last_step': ''
        },
        {
          'title': 'Medical history',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 2,
          'last_step': ''
        },
        {
          'title': 'Current pregnancy',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 3,
          'last_step': ''
        },
        {
          'title': 'Medications',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 4,
          'last_step': ''
        },
        {
          'title': 'Woman behaviour',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 5,
          'last_step': 'last_step'
        },
      ],
      StepperData:[
        {
          'title': 'Past obstetric history',
          'componet': 'PastObstetricHistory',
          'value': '1'
        },
        {
          'title': 'Medical history',
          'componet': 'MedicalHistory',
          'value': '2',
        },
        {
          'title': 'Current pregnancy',
          'componet': 'CurrentPregnancy',
          'value': '3',
        },
        {
          'title': 'Medications',
          'componet': 'Medications',
          'value': '4',
        },
        {
          'title': 'Woman behaviour',
          'componet': 'WomanBehaviour',
          'value': '5',
        },
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },
  computed:{
    ...mapState(useMedicationsStore,["medications"]),
    ...mapState(useVitalsStore,["vitals"]),
    ...mapState(useInvestigationStore,["investigations"]),
    ...mapState(useDiagnosisStore,["diagnosis"]),
  },
  mounted(){
    this.markWizard()
  },
  watch: {
    vitals: {
      handler(){
        this.markWizard()
      },
      deep: true
    },
    investigations: {
      handler(){
        this.markWizard()
      },
      deep: true
    },
    diagnosis: {
      handler(){
        this.markWizard()
      },
      deep: true
    }
  },
  setup() {
    return { chevronBackOutline,checkmark };
  },

  methods:{
    markWizard(){
      if(this.medications.validationStatus){
        this.wizardData[0].checked = true;
        this.wizardData[0].class = 'open_step common_step'
      }else{
        this.wizardData[0].checked = false;
      }

      if(this.medicalHistory[0].selectdData.length > 0){
        this.wizardData[1].checked = true;
        this.wizardData[1].class = 'open_step common_step'
      }else{
        this.wizardData[1].checked = false;
      }

      if(this.womanBehaviour[0].selectdData.length > 0){
        this.wizardData[2].checked = true;
        this.wizardData[2].class = 'open_step common_step'
      }else{
        this.wizardData[2].checked = false;
      }
      if(this.medications[0].selectdData.length > 0){
        this.wizardData[2].checked = true;
        this.wizardData[2].class = 'open_step common_step'
      }else{
        this.wizardData[2].checked = false;
      }
    },
    deleteDisplayData(data: any){
      return  data.map((item: any) => {
        delete item?.display;
        return item?.data;
      });
    },
    saveData(){
      if(this.vitals.validationStatus && this.investigations[0].selectdData.length > 0 && this.diagnosis[0].selectdData.length > 0){
        this.saveVitals()
        this.saveInvestigation()
        this.saveDiagnosis()
        this.$router.push('patientProfile');
      }else{
        toastWarning("Please complete all required fields")
      }
    },
    saveInvestigation(){
      const investigationInstance = new LabOrder()
      investigationInstance.postActivities(this.demographics.patient_id,this.deleteDisplayData(this.investigations[0].selectdData))
    },
    saveVitals(){
      const userID: any  = Service.getUserID()
      const vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
      vitalsInstance.onFinish(this.vitals)
    },
    saveDiagnosis(){
      const userID: any  = Service.getUserID()
      const diagnosisInstance = new Diagnosis();
      diagnosisInstance.onSubmit(this.demographics.patient_id,userID,this.deleteDisplayData(this.diagnosis[0].selectdData))
    },
    openModal(){
      createModal(SaveProgressModal)
    }
  }
})
</script>

<style scoped>

</style>
