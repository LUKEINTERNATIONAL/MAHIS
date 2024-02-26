<template>
<ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
        <DemographicBar/>
        <Stepper stepper-title="Lab test and imaging" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"></Stepper>
        <!-- Show spinner when isLoading is true -->
      <Spinner :isLoading="loading" spinnerName="crescent" />
    </ion-content>
</ion-page>

</template>

<script lang="ts">
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from '@/components/Toolbar.vue';
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import UltrasoundScan from '@/apps/ANC/components/lab_tests/UltrasoundScan.vue'
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import UrineTest from '@/apps/ANC/components/lab_tests/UrineTest.vue';
import TB from '@/apps/ANC/components/lab_tests/TB.vue';
import Stepper from "@/apps/ANC/components/Stepper.vue";
import Spinner from "@/apps/ANC/components/Spinner.vue";
export default defineComponent({
    name:"Lab",
    components:{ IonPage, DemographicBar, Toolbar, IonContent,UltrasoundScan,UrineTest,TB, Stepper, Spinner },
    data(){
        return {iconsContent: icons,
  isOpen: false,
  wizardData: [
               {
                    'title': 'Ultrasound Scan',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 1,
                    'last_step': ''
                },
                {
                    'title': 'Urine test',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 2,
                    'last_step': ''
                },
                {
                    'title': 'TB Screening',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 3,
                    'last_step': 'last_step'
                },
              
              
              
              
              
              ],
  StepperData: [
               {
                    'title': 'Ultrasound Scan',
                    'componet': 'UltrasoundScan',
                    'value': '1'
                },
                {
                    'title': 'Urine test',
                    'componet': 'UrineTest',
                    'value': '2'
                },
                {
                    'title': 'TB Screening',
                    'componet': 'TB',
                    'value': '3'
                },
  ],}
    },
    mounted(){},
    computed:{},
    setup(){
        return {chevronBackOutline, checkmark}
    },
    methods:{
  markWizard(){},
      saveData() {
        // // Simulate saving data
        // this.loading = true; // Show the spinner while data is being saved
        // setTimeout(() => {
        //   // After some time (simulating a server request), hide the spinner
        //   this.loading = false;
        //   // Redirect to counselling page
        //   this.$router.push('counselling');
        // }, 8000); // Simulate a 2-second delay
        this.$router.push('Treatment');
      },
    }

})



</script>

<style scoped>

</style>