<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="treatment"></basic-form>
                <basic-form :contentData="treatmentType"></basic-form>
                <basic-form :contentData="treatmentReason"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="malaria"></basic-form>
                <basic-form :contentData="malariaReason"></basic-form>
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
import {useDewormingStore} from '../../store/dewormingStore';
import { getRadioSelectedValue, modifyCheckboxValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';
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
          currentSection: 0,
         
      };
    },
    computed:{
         ...mapState(useDewormingStore,["treatment"]),
         ...mapState(useDewormingStore,["treatmentType"]),
         ...mapState(useDewormingStore,["treatmentReason"]),
         ...mapState(useDewormingStore,["malaria"]),
         ...mapState(useDewormingStore,["malariaReason"]),
      },
      mounted(){
         this.handlepreventive()
         this.handleNoPreventative()
         this.handleOther()
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      watch:{
        treatment:{
          handler(){
            this.handlepreventive()
            this.handleNoPreventative()
            this.handleOther()
          },
          deep:true
        }
      },
      methods:{
        handlepreventive(){
          if(getRadioSelectedValue(this.treatment,'preventive')=='yes'){
            modifyRadioValue(this.treatment,'treatInfo','displayNone',false)
          }else{
            modifyRadioValue(this.treatment,'treatInfo','displayNone',true)
          }
         
        },
        handleNoPreventative(){
          if(getRadioSelectedValue(this.treatment,'preventive')=='no'){
            modifyRadioValue(this.treatment,'reason','displayNone',false)
          }else{
             modifyRadioValue(this.treatment,'reason','displayNone',true)
          }
        },
        handleOther(){
          if(getRadioSelectedValue(this.treatment,'reason',)=='other'){
            modifyFieldValue(this.treatment,'Specify','displayNone',false)
          }else{
             modifyFieldValue(this.treatment,'Specify','displayNone',true)
          }
        },
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