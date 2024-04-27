<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Postnatal end" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()"  :StepperData="StepperData"/>
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
import {VisitForBabyService} from "@/apps/PNC/Services/visit_for_baby_service";
import {formatCheckBoxData, formatInputFiledData, formatRadioButtonData} from "@/services/formatServerData";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {usePNCEndStore} from "@/apps/PNC/stores/others/pncEnd";
import {PNCEndService} from "@/apps/PNC/Services/pnc_end_service";
export default defineComponent({
  name: "pncEnd",
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
          'title': 'End',
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
          title: 'End PNC',
          component: 'PNCEnd',
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
    ...mapState(usePNCEndStore,["pncEnd"])

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
      await this.savePNCEnd()
      this.$router.push("home");

    },
    async savePNCEnd() {
      if (this.pncEnd>0) {
        const userID: any = Service.getUserID();
        const  pncEnd= new PNCEndService(this.demographics.patient_id, userID);
        const encounter = await pncEnd.createEncounter();
        if (!encounter) return toastWarning("Unable to create PNC end encounter");
        const patientStatus = await pncEnd.saveObservationList(await this.buildPNCEnd());
        if (!patientStatus) return toastWarning("Unable to create PNC program end details!");
        toastSuccess("End details for PNC program have been created");
      }
      console.log(await this.buildPNCEnd())

    },
    async buildPNCEnd() {
      return [

        ...(await formatRadioButtonData(this.pncEnd)),
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
