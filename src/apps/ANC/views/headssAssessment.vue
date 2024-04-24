<template>
  <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar/>
      <Stepper  stepper-title="HEADSS Assessment" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
} from '@ionic/vue';
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import headAssessment from "@/apps/ANC/components/others/headAssessment.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import {Service} from "@/services/service";
import {DangerSignsService} from "@/apps/ANC/service/danger_signs_service";
import {toastSuccess, toastWarning} from "@/utils/Alerts";
import {formatCheckBoxData, formatInputFiledData, formatRadioButtonData} from "@/services/formatServerData";
import {mapState} from "pinia";
import {useHeadssAssessmentStore} from "@/apps/ANC/store/others/headsAssessment";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {HeadssAssessmentService} from "@/apps/ANC/service/headss_assessment_service";



export default defineComponent ({
  name : 'treatment',
  components : {
    IonContent,
    IonHeader,
    IonItem,
    IonPage,
    IonList,
    Toolbar,
    DemographicBar,
    IonMenu,
    IonTitle,
    IonToolbar,
    BasicInputField,
    headAssessment,
    Stepper
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: true,
      wizardData: [

        {
          'title': 'HEADSS assessment',
          'class': 'common_step',
          'checked':false,
          'disabled':false,
          'number':1,
          'last_step': 'last_step'
        },

      ],
      StepperData: [
        {
          title: 'HEADSS assessment',
          component: 'headAssessment',
          value: '1'
        },

      ],

    }
  },
  setup () {
    return {chevronBackOutline, checkmark}
  },
  computed:{
    ...mapState(useDemographicsStore, ["demographics"]),
    ...mapState(useHeadssAssessmentStore,["headssAssesment"])
  },

  methods: {
    markWizard(){},
    saveData(){
      if (this.headssAssesment.length > 0) {
      this.saveHeadssAssesment();
      this.$router.push('ANCHome');
      toastSuccess("HEADSS assessment details have been created");
      }
      else {
        return toastWarning("fill the form!")
      }

    },
    async saveHeadssAssesment() {
      if (this.headssAssesment.length > 0) {
        const userID: any = Service.getUserID();
        const headssAssesment = new HeadssAssessmentService(this.demographics.patient_id, userID);
        const encounter = await headssAssesment.createEncounter();
        if (!encounter) return toastWarning("Unable to create patient HEADSS assessment encounter");
        const patientStatus = await headssAssesment.saveObservationList(await this.buildHeadssAssesment());
        if (!patientStatus) return toastWarning("Unable to create patient HEADSS assessment  !");
        toastSuccess("HEADSS assessment details have been created");
      }
      console.log(await this.buildHeadssAssesment())

    },
    async buildHeadssAssesment() {
      return [
        ...(await formatCheckBoxData(this.headssAssesment)),
        ...(await formatRadioButtonData(this.headssAssesment)),
        ...(await formatInputFiledData(this.headssAssesment)),
      ];
    },
  }
})

</script>


<style scoped>

</style>