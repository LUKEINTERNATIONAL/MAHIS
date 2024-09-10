<template>
    <div class="container">
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="tbTest"></basic-form>
                <!-- <basic-form :contentData="results"></basic-form> -->
            </ion-card-content>
    </ion-card>

        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="reasons"></basic-form>
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
import {useTBScreeningStore} from '../../store/TBScreeningStore';
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue,
modifyCheckboxHeader} from '@/services/data_helpers'

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
            IonRadioGroup,},
    data(){
        return {
            iconsContent: icons,
          labTestsInstance: {} as any,
          currentSection: 0, // Initialize currentSection to 0
        }
    },
    computed:{
        // ...mapState(useTBScreeningStore, ["results"]),
        ...mapState(useTBScreeningStore, ["reasons"]),
        ...mapState(useTBScreeningStore, ["tbTest"]),
       

    },
    mounted(){
        this.handleResults()
        this.handleDate()
        this.handleNotDone()
        this.handleOther()
    },
    watch:{
      tbTest:{
        handler(){
          this.handleResults()
          this.handleDate()
          this.handleNotDone()
          this.handleOther()
        },
        deep:true
      },

    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
    //Method for navigating sections
    goToNextSection() {
      if (this.currentSection < 1) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
    },

    handleResults(){
      if(getRadioSelectedValue(this.tbTest,'TB screening status')=='Screening conducted'){
        modifyRadioValue(this.tbTest,'TB screening results','displayNone',false)
      }else{
        modifyRadioValue(this.tbTest,'TB screening results','displayNone',true)
      }
    },
    handleDate(){
      if(getRadioSelectedValue(this.tbTest,'TB screening status')=='Screening conducted'){
        modifyFieldValue(this.tbTest,'Screening date','displayNone',false)
      }else{
        modifyFieldValue(this.tbTest,'Screening date','displayNone',true)
      }
    },
    handleNotDone(){
      if(getRadioSelectedValue(this.tbTest,'TB screening status')=='Screening not done'){
        modifyCheckboxHeader(this.reasons,'Reason not done','displayNone',false)
      }else{
        modifyCheckboxHeader(this.reasons,'Reason not done','displayNone',true)
      }
    },

    handleOther(){
      if(getCheckboxSelectedValue(this.reasons,'Other')=='Other'){
        modifyFieldValue(this.reasons,'Other (specify)','displayNone',false)
      }else{
        modifyFieldValue(this.reasons,'Other (specify)','displayNone',true)
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
 box-shadow:none;
  background-color:inherit;   
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