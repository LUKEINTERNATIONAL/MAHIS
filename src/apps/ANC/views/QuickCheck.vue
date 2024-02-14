<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Quick check" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import { useVitalsStore } from '@/stores/VitalsStore'
import { useDemographicsStore } from '@/stores/DemographicStore'
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { useDiagnosisStore } from '@/stores/DiagnosisStore'
import { mapState } from 'pinia';
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { Service } from "@/services/service";
import { toastWarning,popoverConfirmation, toastSuccess } from '@/utils/Alerts';
import { Diagnosis } from '@/apps/NCD/services/diagnosis'
import {useDangerSignsStore} from "@/apps/ANC/store/quickCheck/dangerSigns";
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
          'title': 'Danger signs',
          'class': 'common_step',
          'checked':false,
          'disabled':false,
          'number': 1,
          'last_step': ''
        },
        {
          'title': 'Reason for visit',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 2,
          'last_step': ''
        },
        {
          'title': 'Confirm pregnancy',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 3,
          'last_step': ''
        },
        {
          'title': 'Specific health concerns',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 4,
          'last_step': 'last_step'
        },
      ],
      StepperData:[
        {
          'title': 'Danger signs',
          'componet': 'DangerSigns',
          'value': '1'
        },
        {
          'title': 'Reason for visit',
          'componet': 'ReasonForVisit',
          'value': '2',
        },
        {
          'title': 'Confirm pregnancy',
          'componet': 'ConfirmPregnancy',
          'value': '3',
        },
        {
          'title': 'Specific health concerns',
          'componet': 'SpecificHealthConcerns',
          'value': '4',
        },
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },
  computed:{
    ...mapState(useDangerSignsStore,["DangerSigns"]),
    ...mapState(useVitalsStore,["vitals"]),
    ...mapState(useInvestigationStore,["investigations"]),
    ...mapState(useDiagnosisStore,["diagnosis"]),
  },
  mounted(){
    this.markWizard()
  },
  watch: {
    DangerSigns: {
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
      // if(this.vitals.validationStatus){
        this.wizardData[0].checked = true;
        this.wizardData[0].class = 'open_step common_step'
      // }else{
      //   this.wizardData[0].checked = false;
      // }

      if(this.DangerSigns[0].selectdData.length > 0){
        this.wizardData[1].checked = true;
        this.wizardData[1].class = 'open_step common_step'
      }else{
        this.wizardData[1].checked = false;
      }

      // if(this.diagnosis[0].selectdData.length > 0){
      //   this.wizardData[2].checked = true;
      //   this.wizardData[2].class = 'open_step common_step'
      // }else{
      //   this.wizardData[2].checked = false;
      // }
    },
    deleteDisplayData(data: any){
      return  data.map((item: any) => {
        delete item?.display;
        return item?.data;
      });
    },
    saveData(){

      this.$router.push('Profile');

    },
    openModal(){
      createModal(SaveProgressModal)
    }
  }
})
</script>

<style scoped>

</style>
