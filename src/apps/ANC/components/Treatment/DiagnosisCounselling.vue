<template>
<div class="container">
    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <!-- <basic-form :contentData="preEclampsia"></basic-form> -->
                <basic-form :contentData="preEclampsiaCounselling"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="aspirin"></basic-form>
                <!-- <basic-form :contentData="aspirinReason"></basic-form> -->
            </ion-card-content>
    </ion-card>

    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="gdm"></basic-form>
                <basic-form :contentData="gdmCounselling"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hivRisk"></basic-form>
                <basic-form :contentData="prEp"></basic-form>
                 <!-- <basic-form :contentData="prEpReason"></basic-form> -->
            </ion-card-content>
    </ion-card>

    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="seekingCare"></basic-form>
                 <basic-form :contentData="dangerSigns"></basic-form>
                 <basic-form :contentData="ancContact"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>  
              <basic-form :contentData="birth"></basic-form>
              <basic-form :contentData="modeOfTransport"></basic-form>
              <basic-form :contentData="intrapartum"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>  
              <basic-form :contentData="birthPlace"></basic-form>
              <basic-form :contentData="postpartum"></basic-form>
              <basic-form :contentData="breastFeeding"></basic-form>
            </ion-card-content>
    </ion-card>

</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
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
IonRadioGroup,
        } from '@ionic/vue';
import BasicForm from '../../../../components/BasicForm.vue';
import { icons } from '../../../../utils/svg';
import BasicInputField from '../../../../components/BasicInputField.vue';
import { mapState } from 'pinia';
import { checkmark, pulseOutline } from 'ionicons/icons';
import {useDiagnosisCounsellingStore} from '../../store/diagnosisCounsellingStore'
import { getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';
import { getFrequencyLabelOrCheckCode } from '@/services/drug_prescription_service';
export default defineComponent({
    name: "Counselling",
    components:{
      IonContent,
      IonHeader,
      IonItem,
      IonList,
      IonMenu,
      IonTitle,
      IonToolbar,
      IonToggle,
      IonSelect,
      IonSelectOption,
      IonInput,
      BasicInputField,
      BasicForm,
      IonRadio,
      IonRadioGroup
  },
  
          data() {
      return {
          iconsContent: icons,
          currentSection: 0, // Initialize currentSection to 0

         
      };
    },
    computed:{
         //...mapState(useDiagnosisCounsellingStore,{}"preEclampsia"]),
         ...mapState(useDiagnosisCounsellingStore,["preEclampsiaCounselling"]),
         ...mapState(useDiagnosisCounsellingStore,["aspirin"]),
        // ...mapState(useDiagnosisCounsellingStore,["aspirinReason"]),
         ...mapState(useDiagnosisCounsellingStore,["gdm"]),
         ...mapState(useDiagnosisCounsellingStore,["gdmCounselling"]),
         ...mapState(useDiagnosisCounsellingStore,["hivRisk"]),
         ...mapState(useDiagnosisCounsellingStore,["prEp"]),
        // ...mapState(useDiagnosisCounsellingStore,["prEpReason"]),
         ...mapState(useDiagnosisCounsellingStore,["seekingCare"]),
         ...mapState(useDiagnosisCounsellingStore,["dangerSigns"]),
         ...mapState(useDiagnosisCounsellingStore,["ancContact"]),
         ...mapState(useDiagnosisCounsellingStore,["birth"]),
         ...mapState(useDiagnosisCounsellingStore,["modeOfTransport"]),
         ...mapState(useDiagnosisCounsellingStore,["intrapartum"]),
         ...mapState(useDiagnosisCounsellingStore,["birthPlace"]),
         ...mapState(useDiagnosisCounsellingStore,["postpartum"]),
         ...mapState(useDiagnosisCounsellingStore,["breastFeeding"]),
      },
      mounted(){
         this.handleAsprin()
         this.handleAsprinNotProided()
         this. handleOtherNoAsprin()
         this.handlePrep()
         this. handlePrepNotProvided()
         this.handleOtherPrep()
         this.handleBirthPlace()
      },
      watch:{
        aspirin:{
          handler(){
            this.handleAsprin()
            this.handleAsprinNotProided()
            this. handleOtherNoAsprin()
          },
          deep:true
        },
        prEp:{
          handler(){
            this.handlePrep()
            this. handlePrepNotProvided()
            this.handleOtherPrep()
          },
          deep:true
        },
        birthPlace:{
          handler(){
            this.handleBirthPlace()
          },deep:true
        }
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      methods:{
        handleAsprin(){
          if(getRadioSelectedValue(this.aspirin,'Aspirin provided')=='yes'){
            modifyFieldValue(this.aspirin,'Amount of daily aspirin provided','displayNone',false)
          }else{
            modifyFieldValue(this.aspirin,'Amount of daily aspirin provided','displayNone',true)
          }
        },
        handleAsprinNotProided(){
          if(getRadioSelectedValue(this.aspirin,'Aspirin provided')=='no'){
            modifyRadioValue(this.aspirin,'aspirin not prescribed','displayNone',false)
          }else{
            modifyRadioValue(this.aspirin,'aspirin not prescribed','displayNone',true)
          }
        },
        handleOtherNoAsprin(){
          if(getRadioSelectedValue(this.aspirin,'aspirin not prescribed')=='other'){
            modifyFieldValue(this.aspirin,'Specify','displayNone',false)
          }else{
             modifyFieldValue(this.aspirin,'Specify','displayNone',true)
          }
          console.log(getRadioSelectedValue(this.aspirin,'Other'))
        },
        handlePrep(){
          if(getRadioSelectedValue(this.prEp,'PrEp for HIV prevention')=='yes'){
            modifyFieldValue(this.prEp,'Amount of PrEp provided','displayNone',false)
          }else{
            modifyFieldValue(this.prEp,'Amount of PrEp provided','displayNone',true)
          }
        },
        handlePrepNotProvided(){
          if(getRadioSelectedValue(this.prEp,'PrEp for HIV prevention')=='no'){
            modifyRadioValue(this.prEp,'PrEp for HIV prevention was not provided','displayNone',false)
          }else{
            modifyRadioValue(this.prEp,'PrEp for HIV prevention was not provided','displayNone',true)
          }
        },
        handleOtherPrep(){
          if(getRadioSelectedValue(this.prEp,'PrEp for HIV prevention was not provided')=='other'){
            modifyFieldValue(this.prEp,'Specify','displayNone',false)
          }else{
            modifyFieldValue(this.prEp,'Specify','displayNone',true)
          }
        },
        handleBirthPlace(){
          if(getRadioSelectedValue(this.birthPlace,'birth Place')=='other'){
            modifyFieldValue(this.birthPlace,'Specify','displayNone',false)
          }else{
            modifyFieldValue(this.birthPlace,'Specify','displayNone',true)
          }
        },
         //Method for navigating sections
    goToNextSection() {
      if (this.currentSection < 6) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
    },
        },
      });

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