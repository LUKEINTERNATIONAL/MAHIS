<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper
          stepper-title="Lab test and imaging"
          :wizardData="wizardData"
          @updateStatus="markWizard"
          @finishBtn="saveData()"
          :StepperData="StepperData"
      ></Stepper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Stepper from "@/components/Stepper.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import Referral from "@/apps/ANC/components/referral/Referral.vue";
import { IonContent, IonHeader, IonItem, IonPage, IonList, IonMenu, IonTitle,IonToolbar } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { useReferralStore } from "../store/referral/referralStore";
import { mapState } from "pinia";
import { formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { Service } from "@/services/service";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { resetPatientData } from "@/services/reset_data";
import {ConfirmPregnancyService} from "@/apps/ANC/service/confirm_pregnancy_service";
import {ReferralService} from "@/apps/ANC/service/referral_service";



export default defineComponent ({
  name : "Home",
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
    Stepper,
    Referral
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: false,
      wizardData: [
        {
          title: 'Referral',
          class: 'common_step',
          checked:"",
          disabled:false,
          number:1,
          last_step: 'last_step'
        },

      ],
      StepperData: [
        {
          title: 'Referral',
          component: 'Referral',
          value: '1'
        },

      ],

    }
  },
  setup () {
    return {chevronBackOutline, checkmark}
  },
  computed:{
        ...mapState(useReferralStore,["referralInfo"]),
        ...mapState(useDemographicsStore, ["demographics"]),
    },
  methods: {
    markWizard() {},
    saveData() {
      this.saveReferral
      resetPatientData();
      this.$router.push("ANCHome");
    },
    async buildReferral() {
       return [
         ...(await formatRadioButtonData(this.referralInfo)),
         ...(await formatInputFiledData(this.referralInfo))
        ]
    },

    async saveReferral () {
        if (this.referralInfo.length > 0) {
          const userID: any = Service.getUserID();
          const referral = new ReferralService(this.demographics.patient_id, userID);
          const encounter = await referral.createEncounter();
          if (!encounter) return toastWarning("Unable to create referral encounter");
          const patientStatus = await referral.saveObservationList(await this.buildReferral());
          if (!patientStatus) return toastWarning("Unable to create patient referral details!");
          toastSuccess("Referral details have been created");
        }
        this.$router.push("ANCHome");


      console.log(await this.buildReferral());
    },
  },
});
</script>

<style scoped></style>
