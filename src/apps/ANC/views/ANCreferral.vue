<template>
  <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar/>
      <Stepper  stepper-title="ANC referral" :wizardData="wizardData" @updateStatus="markWizard"  :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"/>
    </ion-content>
    <BasicFooter @finishBtn="saveData()" />

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
import Stepper from "@/components/Stepper.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import Referral from "@/apps/ANC/components/referral/Referral.vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import {Service} from "@/services/service";
import {toastSuccess, toastWarning} from "@/utils/Alerts";
import {formatCheckBoxData, formatInputFiledData, formatRadioButtonData} from "@/services/formatServerData";
import {mapState} from "pinia";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {useReferralStore} from "@/apps/ANC/store/referral/referralStore";
import {ReferralService} from "@/apps/ANC/service/referral_service";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";


export default defineComponent ({
  name : 'treatment',
  mixins: [SetUserRole, SetEncounter],
  components : {
    BasicFooter,
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
    Referral,
    Stepper
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: true,
      wizardData: [

        {
          'title': 'ANC referral',
          'class': 'common_step',
          'checked':false,
          'disabled':false,
          'number':1,
          'last_step': 'last_step'
        },

      ],
      StepperData: [
        {
          title: 'Referral details',
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
    ...mapState(useDemographicsStore, ["demographics"]),
    ...mapState(useReferralStore,["referralInfo"])
  },

  methods: {
    markWizard(){},
    saveData(){
    this.saveReferral();
    this.$router.push("ANChome");

    },
    async saveReferral() {
       if (this.referralInfo.length > 0) {
         const userID: any = Service.getUserID();
         const ANCreferral = new ReferralService(this.demographics.patient_id, userID);
         const encounter = await ANCreferral.createEncounter();
         if (!encounter) return toastWarning("Unable to create ANC referral encounter");
         const patientStatus = await ANCreferral.saveObservationList(await this.buildANCReferral());
         if (!patientStatus) return toastWarning("Unable to create referral details for ANC!");
         toastSuccess("ANC referral details have been created");
       }
       console.log(await this.buildANCReferral())

     },
     async buildANCReferral() {
       return [
         ...(await formatCheckBoxData(this.referralInfo)),
         ...(await formatRadioButtonData(this.referralInfo)),
         ...(await formatInputFiledData(this.referralInfo)),
       ];
    },
  }
})

</script>


<style scoped>

</style>