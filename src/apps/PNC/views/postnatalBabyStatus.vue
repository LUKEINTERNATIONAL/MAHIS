<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Postnatal ward stay" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()"  :StepperData="StepperData"/>
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
import DemographicBar from "@/apps/PNC/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import {createModal, toastSuccess, toastWarning} from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import Stepper from "@/apps/PNC/components/Stepper.vue";
import { mapState } from 'pinia';
import {Service} from "@/services/service";
import {PostnatalWardStayService} from "@/apps/PNC/Services/postnatal_wardstay_service";
import {formatCheckBoxData, formatInputFiledData, formatRadioButtonData} from "@/services/formatServerData";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {useBabyStatusStore} from "@/apps/PNC/stores/postnatal ward stay/BabyStatus";
import {BabyMonitoringService} from "@/apps/PNC/Services/baby_monitoring_service";
export default defineComponent({
  name: "postnatalBabyStatus",
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
          'title': 'Baby status',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': 'last_step'
        },

      ],
      StepperData:[
        {
          title: 'Postnatal status of the baby',
          component: 'BabyStatus',
          value: '1'
        },
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },
  watch: {

  },
  getFormatedData(data: any) {
    return data.map((item: any) => {
      return item?.data;
    });
  },
  computed:{

    ...mapState(useDemographicsStore,["demographics"]),
    ...mapState(useBabyStatusStore,["babyStatusDetails"])
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
    async saveData(){
      await this.saveBabyMonitoring()
      this.$router.push("home");

    },
    async saveBabyMonitoring() {
      if (this.babyStatusDetails>0) {
        const userID: any = Service.getUserID();
        const  babyStatusDetails= new BabyMonitoringService(this.demographics.patient_id, userID);
        const encounter = await babyStatusDetails.createEncounter();
        if (!encounter) return toastWarning("Unable to create baby monitoring details encounter");
        const patientStatus = await babyStatusDetails.saveObservationList(await this.buildBabyMonitoring());
        if (!patientStatus) return toastWarning("Unable to create patient routine monitoring details for baby!");
        toastSuccess("Postnatal ward monitoring details for baby have been created");
      }
      console.log(await this.buildBabyMonitoring())

    },
    async buildBabyMonitoring() {
      return [

        ...(await formatCheckBoxData(this.babyStatusDetails)),
        ...(await formatRadioButtonData(this.babyStatusDetails)),
        ...(await formatInputFiledData(this.babyStatusDetails)),
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
