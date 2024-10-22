<template>
  <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepper-title="End labour and delivery"
               :wizardData="wizardData"
               @updateStatus="markWizard"
               :StepperData="StepperData"
               :backUrl="userRoleSettings.url"
               :backBtn="userRoleSettings.btnName"
               :getSaveFunction="getSaveFunction"

      />
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
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Stepper from "@/components/Stepper.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import end from "@/apps/LABOUR/components/repeatable things/end.vue";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";



export default defineComponent ({
  name : 'end',
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
    Stepper,
    end
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: false,
      wizardData: [
        {
          'title': 'End labour',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': 'last_step'
        },

      ],
      StepperData: [
        {
          title: 'Labour and delivery end',
          component: 'end',
          value: '1'
        },

      ],

    }
  },
  setup () {
    return {chevronBackOutline, checkmark}
  },

  methods: {
    markWizard(){},
    getSaveFunction(){

    },
    saveData(){
      this.$router.push("labourHome")

    },
  }
})

</script>


<style scoped>

</style>