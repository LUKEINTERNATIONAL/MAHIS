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
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import {createModal, toastSuccess, toastWarning} from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import Stepper from "@/components/Stepper.vue";
import { mapState } from 'pinia';
import {Service} from "@/services/service";
import {PNCVisitService} from "@/apps/PNC/Services/pnc_visit_service";
import {formatCheckBoxData, formatInputFiledData, formatRadioButtonData} from "@/services/formatServerData";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {useSecondStageOfLabourStore} from "@/apps/LABOUR/stores/delivery details/secondStageDelivery";
import {SecondStageDeliveryService} from "@/apps/LABOUR/services/labour_delivery_details_service";
import {useThirdStageOfLabour} from "@/apps/LABOUR/stores/delivery details/thirdStageDelivery";
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
  ...mapState(useDemographicsStore,["demographics"]),
    ...mapState(useThirdStageOfLabour,["placentaExamination"]),
  ...mapState(useSecondStageOfLabourStore,["secondStageDetails","newbornComplications","obstetricComplications"])

  },
  mounted(){
    this.markWizard()

  },
  getFormatedData(data: any) {
    return data.map((item: any) => {
      return item?.data;
    });
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
   async saveData(){
      await this.saveSecondStageLabour()
      this.$router.push("labourHome");

    },
    async saveSecondStageLabour() {
      if (this.secondStageDetails.length>0 && this.newbornComplications.length>0 && this.obstetricComplications.length>0 && this.obstetricComplications.length>0) {
        const userID: any = Service.getUserID();
        const  secondStageDelivery= new SecondStageDeliveryService(this.demographics.patient_id, userID);
        const encounter = await secondStageDelivery.createEncounter();
        if (!encounter) return toastWarning("Unable to create Second stage and Third stage of labour encounter");
        const patientStatus = await secondStageDelivery.saveObservationList(await this.buildSecondStageOfLabour());
        if (!patientStatus) return toastWarning("Unable to create patient second stage and third stage of labour details!");
        toastSuccess("Second stage and Third stage  of labour  details have been created");
      }
      console.log(await this.buildSecondStageOfLabour())

    },

    async buildSecondStageOfLabour() {
      return [

        ...(await formatCheckBoxData(this.secondStageDetails)),
        ...(await formatRadioButtonData(this.secondStageDetails)),
        ...(await formatInputFiledData(this.secondStageDetails)),
        ...(await formatCheckBoxData(this.obstetricComplications)),
        ...(await formatRadioButtonData(this.obstetricComplications)),
        ...(await formatInputFiledData(this.obstetricComplications)),
        ...(await formatCheckBoxData(this.newbornComplications)),
        ...(await formatRadioButtonData(this.newbornComplications)),
        ...(await formatInputFiledData(this.newbornComplications)),
        ...(await formatCheckBoxData(this.placentaExamination)),
        ...(await formatRadioButtonData(this.placentaExamination)),
        ...(await formatInputFiledData(this.placentaExamination)),
      ];
    },


    openModal(){
      createModal(SaveProgressModal)
    }
  }
})
</script>

<style scoped>

</style>
