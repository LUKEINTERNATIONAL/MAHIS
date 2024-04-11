<template>
    <div class="container"> 
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="ipv"></basic-form>
                <!-- <basic-form :contentData="ipvReason"></basic-form> -->
            </ion-card-content>
        </ion-card>

       
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="additionalCare"></basic-form>
                <basic-form :contentData="safety_assessment"></basic-form>
            </ion-card-content>
        </ion-card>

        
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="physical_violence"></basic-form>
                <basic-form :contentData="beaten_pregnant"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="woman_threatened"></basic-form>
                <basic-form :contentData="constant_jealous"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="strangling"></basic-form>
                <basic-form :contentData="murder_threat"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="referrals"></basic-form>
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
import { mapState } from 'pinia';
import BasicForm from '../../../../components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 
import {useIntimatePartnerStore } from '../../store/intimatePartnerStore';
import { getCheckboxSelectedValue, getRadioSelectedValue, modifyCheckboxValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';

export default defineComponent ({
    name: "intimatePartner",
    components: {
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
            IonRadioGroup,
    },
    data() {
        return {
            currentSection: 0,
        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
         ...mapState(useIntimatePartnerStore, ["ipv"]),
        //  ...mapState(useIntimatePartnerStore, ["ipvReason"]),
         ...mapState(useIntimatePartnerStore, ["additionalCare"]),
         ...mapState(useIntimatePartnerStore, ["safety_assessment"]),
         ...mapState(useIntimatePartnerStore, ["physical_violence"]),
         ...mapState(useIntimatePartnerStore, ["beaten_pregnant"]),
         ...mapState(useIntimatePartnerStore, ["woman_threatened"]),
         ...mapState(useIntimatePartnerStore, ["constant_jealous"]),
         ...mapState(useIntimatePartnerStore, ["strangling"]),
         ...mapState(useIntimatePartnerStore, ["murder_threat"]),
         ...mapState(useIntimatePartnerStore, ["referrals"]),
  

    },
    mounted() {
        this.handleIntimate()
        this.handleOtherIpv()
        this.handleReferal()
    },
    watch:{
      ipv:{
        handler(){
        this.handleIntimate()
        this.handleOtherIpv()
      },
        deep:true
      },
      referrals:{
        handler(){
          this.handleReferal()
        },deep:true
      }
    },
    methods :{
        goToNextSection() {
      if (this.currentSection < 5) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
    },
      handleIntimate(){
        if(getRadioSelectedValue(this.ipv,'intimateInfo')=='no'){
          modifyRadioValue(this.ipv,'reasonIPV','displayNone',false)
        }else{
          modifyRadioValue(this.ipv,'reasonIPV','displayNone',true)
        }
      },
      handleOtherIpv(){
        if(getRadioSelectedValue(this.ipv,'reasonIPV')=='other'){
          modifyFieldValue(this.ipv,'other','displayNone',false)
        }else{
           modifyFieldValue(this.ipv,'other','displayNone',true)
        }
      },
      handleReferal(){
        if(getCheckboxSelectedValue(this.referrals,'Other')?.value =='other'){
          modifyFieldValue(this.referrals,'Specify','displayNone',false)
        }else{
          modifyFieldValue(this.referrals,'Specify','displayNone',true)
        }

        const checkBoxes=['Care at another facility','Crisis intervention or counselling','Police','Shelter or housing',
                         'Shelter or housing','Child protection','Livelihood support','Other',]

      if (getCheckboxSelectedValue(this.referrals, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.referrals, checkbox, 'checked', false);
            modifyCheckboxValue(this.referrals, checkbox, 'disabled', true);
        });
        } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.referrals, checkbox, 'disabled', false);
        });
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

    