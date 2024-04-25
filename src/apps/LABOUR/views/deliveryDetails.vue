<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Delivery details" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()"  :StepperData="StepperData"/>
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
import Toolbar from "@/apps/LABOUR/components/Toolbar.vue";
import ToolbarSearch from "@/apps/LABOUR/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal, toastSuccess, toastWarning } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import Stepper from "@/apps/LABOUR/components/Stepper.vue";
import { mapState } from 'pinia';
import { useSecondStageOfLabourStore } from '../stores/delivery details/secondStageDelivery';
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from '@/services/formatServerData';
import { useThirdStageOfLabour } from '../stores/delivery details/thirdStageDelivery';
import { useDemographicsStore } from '@/stores/DemographicStore';
import { SecondStageService, ThirdStageService } from "@/services/LABOUR/Second_stage_of_labour_service";
import { Service } from '@/services/service';
export default defineComponent({
  name: "deliveryDetails",
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
          'title': 'Second stage of labour',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': ''
        },
        {
          'title': 'Third stage of labour',
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
          title: 'Second stage of labour',
          component: 'SecondStageDelivery',
          value: '1'
        },
        {
          title: 'Third stage of labour',
          component: 'ThirdStageDelivery',
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
    ...mapState(useDemographicsStore, ["demographics"]),
    ...mapState(useSecondStageOfLabourStore,["secondStageDetails","newbornComplications","secondStageDetails","obstetricComplications"]),
    ...mapState(useThirdStageOfLabour,['placentaExamination'])
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
      //this.$router.push("labourHome");
      this.saveSecondStageDetails()
      this.saveThirdStageDetails()
    },
    async saveSecondStageDetails(){
    if (this.secondStageDetails.length > 0) {
        const userID: any = Service.getUserID();
        const SecondStage = new  SecondStageService(this.demographics.patient_id, userID);
        const encounter = await SecondStage.createEncounter();
        if (!encounter) return toastWarning("Unable to create SecondStage encounter");
        const patientStatus = await SecondStage.saveObservationList(await this.buildSecondStageDetails());
        if (!patientStatus) return toastWarning("Unable to create SecondStage !");
        toastSuccess("SecondStage has been created");
    }
     // console.log( await this.buildSecondStageDetails())
    },
    async saveThirdStageDetails(){
      if (this.placentaExamination.length > 0) {
        const userID: any = Service.getUserID();
        const ThirdStage = new  ThirdStageService(this.demographics.patient_id, userID);
        const encounter = await ThirdStage.createEncounter();
        if (!encounter) return toastWarning("Unable to create ThirdStage encounter");
        const patientStatus = await ThirdStage.saveObservationList(await this.buildThirdStageDetails());
        if (!patientStatus) return toastWarning("Unable to create ThirdStage !");
        toastSuccess("ThirdStage has been created");
    }
      console.log( await this.buildThirdStageDetails())
    },
    async buildSecondStageDetails(){
      return[
        ...(await formatRadioButtonData(this.secondStageDetails)),
        ...(await formatInputFiledData(this.secondStageDetails)),
        ...(await formatCheckBoxData(this.secondStageDetails)),
        ...(await formatRadioButtonData(this.newbornComplications)),
        ...(await formatInputFiledData(this.newbornComplications)),
        ...(await formatCheckBoxData(this.obstetricComplications)),
        ...(await formatInputFiledData(this.obstetricComplications)),
        ...(await formatRadioButtonData(this.obstetricComplications)),
        ...(await formatCheckBoxData(this.obstetricComplications)),
      ]
    },
    async buildThirdStageDetails(){
      return[
        ...(await formatRadioButtonData(this.placentaExamination)),
        ...(await formatInputFiledData(this.placentaExamination)),
        ...(await formatCheckBoxData(this.placentaExamination)),
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
@/services/LABOUR/Second_stage_of_labour_service