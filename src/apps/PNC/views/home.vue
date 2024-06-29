<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
           <div class = "container"><LandingPage/></div>
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
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../utils/svg' 
import Toolbar from "@/components/Toolbar.vue";
import DemographicBar from '../components/DemographicBar.vue';
import LandingPage from "@/apps/PNC/components/home/LandingPage.vue";


export default defineComponent({
    name:"TB screening",
    components:{   
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
    computed:{
       

    },
    mounted(){},
    watch:{
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
   
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
</style>