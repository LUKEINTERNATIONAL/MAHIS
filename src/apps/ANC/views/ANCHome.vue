<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
           <div class = "container">
             <div class="back_profile">
               <DynamicButton :name="backBtn" iconSlot="start" fill="clear" :icon="chevronBackOutline()" @click="openBackController()" />
             </div>
             <LandingPage/>
           </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonPage,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            IonRadio,
            IonRadioGroup
        } from '@ionic/vue';

import { mapState } from 'pinia';
import BasicForm from '../../../components/BasicForm.vue';
import {checkmark, chevronBackOutline, pulseOutline} from 'ionicons/icons';
import { icons } from '../../../utils/svg'
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from '../components/DemographicBar.vue';
import LandingPage from '../components/home/LandingPage.vue';
import DynamicButton from "@/components/DynamicButton.vue";
import {createModal} from "@/utils/Alerts";
import SaveProgressModal from "@/components/SaveProgressModal.vue";


export default defineComponent({
    name:"TB screening",
    components:{
      DynamicButton,
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            BasicForm,
            IonRadio,
            IonPage,
            IonRadioGroup,
        LandingPage,
    Toolbar,DemographicBar},
    data(){
        return {
            iconsContent: icons,
          labTestsInstance: {} as any,
          currentSection: 0, // Initialize currentSection to 0
        }
    },
  props: {
    backBtn: {
      type: String,
      default: "Back to profile",
    },
    backUrl: {
      type: String,
      default: "",
    },
  },
    computed:{
       

    },
    mounted(){},
    watch:{
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
      chevronBackOutline() {
        return chevronBackOutline
      },
      openBackController() {
        if (this.backUrl) {
          this.$router.push(this.backUrl);
        } else {
          createModal(SaveProgressModal);
        }
      },
   
    }
})


</script>

<style scoped>
.container{
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.back_profile {
  display: flex;
  justify-content: space-between;
  width: 140px;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  /* position: fixed; */
  z-index: 1000;
}
</style>