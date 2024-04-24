<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="treatment"></basic-form>
                <!-- <basic-form :contentData="treatmentType"></basic-form>
                <basic-form :contentData="treatmentReason"></basic-form> -->
            </ion-card-content>
    </ion-card>

    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="malaria"></basic-form>
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
         ...mapState(useDewormingStore,["malaria"]),
      },
      mounted(){
         this.handlepreventive()
         this.handleNoPreventative()
         this.handleOther()
         this.handleMalria()
         this.handleOtherMalaria()
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
        },
         malaria:{
          handler(){
            this.handleMalria()
            this.handleOtherMalaria()
          },
          deep:true
        }
      },
      methods:{
        handlepreventive(){
          if(getRadioSelectedValue(this.treatment,'antihelminthic treatment')=='yes'){
            modifyRadioValue(this.treatment,'antihelminthic treatment provided','displayNone',false)
          }else{
            modifyRadioValue(this.treatment,'antihelminthic treatment provided','displayNone',true)
          }
          console.log(getRadioSelectedValue(this.treatment,'preventive'))
         
        },
        handleNoPreventative(){
          if(getRadioSelectedValue(this.treatment,'antihelminthic treatment')=='no'){
            modifyRadioValue(this.treatment,'no preventative treatment provided','displayNone',false)
          }else{
             modifyRadioValue(this.treatment,'no preventative treatment provided','displayNone',true)
          }
        },
        handleOther(){
          if(getRadioSelectedValue(this.treatment,'no preventative treatment provided',)=='other'){
            modifyFieldValue(this.treatment,'Specify','displayNone',false)
          }else{
             modifyFieldValue(this.treatment,'Specify','displayNone',true)
          }
        },

        handleMalria(){
          if(getRadioSelectedValue(this.malaria,'counselling on malaria prevention')=='no'){
            modifyRadioValue(this.treatment,'counselling on malaria prevention','displayNone',false)
          }else{
            modifyRadioValue(this.treatment,'counselling on malaria prevention','displayNone',true)
          }
         
        },
        handleOtherMalaria(){
          if(getRadioSelectedValue(this.malaria,'counselling on malaria prevention',)=='other'){
            modifyFieldValue(this.treatment,'other','displayNone',false)
          }else{
             modifyFieldValue(this.treatment,'other','displayNone',true)
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