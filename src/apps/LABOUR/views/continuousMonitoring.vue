<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Continuous monitoring" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import Stepper from "@/components/Stepper.vue";
import { mapState,} from 'pinia';
import {getCheckboxSelectedValue} from "@/services/data_helpers";
import { formatInputFiledData, formatRadioButtonData } from '@/services/formatServerData';
import { useVitalsStore } from '../stores/repeatable things/vitals';
import { useOtherExamsStore } from '../stores/repeatable things/otherExams';

export default defineComponent({
  name: "obstetricDetails",
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
          'title': 'Vitals',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': ''
        },
        {
          'title': 'Other exams',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 2,
          'last_step': 'last_step'
        },
      ],
      StepperData:[
        {
          title: 'Vitals',
          component: 'Vitals',
          value: '1'
        },
        {
          title: 'Other exams',
          component: 'OtherExams',
          value: '2'
        },
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },
  watch: {

  },
  computed:{
      ...mapState(useVitalsStore,['vitals']),
      ...mapState(useOtherExamsStore ,['otherExams','urine'])
  },
  mounted(){
     this.markWizard()

  },

  setup() {
    return { chevronBackOutline,checkmark };
  },

  methods:{
    markWizard(){
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
    deleteDisplayData(data: any){
      return  data.map((item: any) => {
        delete item?.display;
        return item?.data;
      });
    },
    saveData(){
      this.$router.push("labourHome");

      // this.saveVitals()
      // this.saveOtherExams()
    },
    async saveVitals(){
      console.log( await this.buildVitals())
    },
    async saveOtherExams(){
      console.log(await this.buildOtherExams())
    },
   async buildVitals(){
    return[
      ...(await formatInputFiledData(this.vitals))
    ];
   },
   async buildOtherExams(){
      return[
     ...(await formatRadioButtonData(this.otherExams)),
     ...(await formatInputFiledData(this.otherExams)),
     ...(await formatRadioButtonData(this.urine)),
     ...(await formatInputFiledData(this.urine))
      ]
   },
    openModal(){
      createModal(SaveProgressModal)
    }
  }
})
</script>

<style scoped>

</style>
