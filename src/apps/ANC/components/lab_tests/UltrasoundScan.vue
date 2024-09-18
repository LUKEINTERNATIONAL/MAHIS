<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="ultrasound"></basic-form>
             <basic-form :contentData="reason"></basic-form>
            </ion-card-content>
    </ion-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
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
            IonRadio,
            IonRadioGroup
        } from '@ionic/vue';
import {useLabTestsStore} from '../../store/LabTestsStore';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 
import { getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';

export default defineComponent({
    name:"Ultrasound",
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
            IonRadioGroup,},
    data(){
        return {
            iconsContent: icons,
          labTestsInstance: {} as any,
          currentSection: 0, 
         
         
        }
    },
    mounted(){
        this.handleUltraDate()
        this.handleReason()
    },
    watch:{
        ultrasound:{
            handler(){
                this.handleUltraDate()
                this.handleReason()
            },
            deep:true
        },

    },
    computed:{
        ...mapState(useLabTestsStore, ["reason"]),
        ...mapState(useLabTestsStore, ["ultrasound"]),

    },
  
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
      handleUltraDate(){
         const scanRequired = getRadioSelectedValue(this.ultrasound, 'Ultrasound scan status') == 'Scan required';
         const scanOrdered = getRadioSelectedValue(this.ultrasound, 'Ultrasound scan status') == 'Scan ordered';
         const scanConducted = getRadioSelectedValue(this.ultrasound, 'Ultrasound scan status') == 'Scan conducted';

            if(scanRequired || scanOrdered || scanConducted){
              modifyFieldValue(this.ultrasound,'Scan date','displayNone',false)
              modifyRadioValue(this.reason, 'Amniotic fluid level', 'displayNone', false)
              modifyRadioValue(this.reason, 'Placenta location', 'displayNone', false)
            }else{
                modifyFieldValue(this.ultrasound,'Scan date','displayNone',true)
              modifyRadioValue(this.reason, 'Amniotic fluid level', 'displayNone', true)
              modifyRadioValue(this.reason, 'Placenta location', 'displayNone', true)
            }
        },

        handleReason(){
            if(getRadioSelectedValue(this.ultrasound, 'Ultrasound scan status') == 'NOT done'){
              modifyRadioValue(this.reason,'Reason not done','displayNone',false)
            }else{
              modifyRadioValue(this.reason,'Reason not done','displayNone',true)
            }
        },
      
   
    }
})
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px; 
  margin-bottom: 20px;
}

ion-card {
  width: 100%;
 color: black;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; 
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}



</style>