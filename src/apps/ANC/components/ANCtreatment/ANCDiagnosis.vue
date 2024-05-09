<template>
    <div class="container">
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="diagnoses"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hypertension"> </basic-form>
                <basic-form :contentData="preEclampsia"> </basic-form>
                <basic-form :contentData="hyper"> </basic-form>
                <basic-form :contentData="hypertensionReason"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hiv"> </basic-form>
                <basic-form :contentData="hivReason"> </basic-form>
                <basic-form :contentData="hepatitisB"> </basic-form>
                <basic-form :contentData="hepatitisReason"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hepatitisC"> </basic-form>
                <basic-form :contentData="syphilis"> </basic-form>
                <basic-form :contentData="syphilisTesting"> </basic-form>
                <basic-form :contentData="tbScreening"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>  
                <basic-form :contentData="ASB"> </basic-form>
                <basic-form :contentData="asbReason"> </basic-form>
                <basic-form :contentData="GDM"> </basic-form>
                <basic-form :contentData="diabetes"> </basic-form>
                <basic-form :contentData="anaemia"> </basic-form>
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
import {useDiagnosisStore} from '../../store/diagnosisStore';
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'
export default defineComponent ({
    name: "diagnosisTreatment",
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
        ...mapState(useDiagnosisStore, ["diagnoses"]),
        ...mapState(useDiagnosisStore, ["hypertensionReason"]),
        ...mapState(useDiagnosisStore, ["hivReason"]),
        ...mapState(useDiagnosisStore, ["hepatitisReason"]),
        ...mapState(useDiagnosisStore, ["asbReason"]),
        ...mapState(useDiagnosisStore, ["hypertension"]),
        ...mapState(useDiagnosisStore, ["preEclampsia"]),
        ...mapState(useDiagnosisStore, ["hyper"]),
        ...mapState(useDiagnosisStore, ["hiv"]),
        ...mapState(useDiagnosisStore, ["hepatitisB"]),
        ...mapState(useDiagnosisStore, ["hepatitisC"]),
        ...mapState(useDiagnosisStore, ["syphilis"]),
        ...mapState(useDiagnosisStore, ["syphilisTesting"]),
        ...mapState(useDiagnosisStore, ["tbScreening"]),
        ...mapState(useDiagnosisStore, ["ASB"]),
        ...mapState(useDiagnosisStore, ["GDM"]),
        ...mapState(useDiagnosisStore, ["diabetes"]),
        ...mapState(useDiagnosisStore, ["anaemia"]),

    },
    mounted(){
      this.handleHyperOther()
      this. handledeHiv()
      this.handleCounselHiv()
      this.handleHperB()
      this.handleasbReason()
      this.handleOtherasb()
      this. handleNone()
      this.handleHyper()
      this.handledeFirstHiv()
    },
    watch:{
      diagnoses:{
        handler(){
          this. handleNone()
        },
        deep:true
      },
      hypertensionReason:{
        handler(){
          this.handleHyperOther()
          this.handleHyper()
        },
        deep:true
      },
      hiv:{
        handler(){
          this. handledeHiv()
          this.handleCounselHiv()
          this.handledeFirstHiv()
        },deep:true
      },
      hepatitisReason:{
        handler(){
          this.handleHperB()
          
        },
        deep:true
      },
      asbReason:{
        handler(){
          this.handleasbReason()
          this.handleOtherasb()
        },
        deep:true
      }

    },
    methods :{
        goToNextSection() {
      if (this.currentSection < 4) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
    },
    handleHyper(){
      if(getRadioSelectedValue(this.hypertensionReason,'Counselling on hypertension')=='No'){
          modifyRadioValue(this.hypertensionReason,'hypertension','displayNone',false)
        }else{
          modifyRadioValue(this.hypertensionReason,'hypertension','displayNone',true)
        }
    },
    handleHyperOther(){
      if(getRadioSelectedValue(this.hypertensionReason,'hypertension')=='other'){
        modifyFieldValue(this.hypertensionReason,'other','displayNone',false)
      }else{
        modifyFieldValue(this.hypertensionReason,'other','displayNone',true)
      }
    },
    handledeFirstHiv(){
      if(getRadioSelectedValue(this.hiv,'counselling on HIV not provided')=='no'){
        modifyRadioValue(this.hiv,'counselling on HIV not provided','displayNone',false)
      }else{
         modifyRadioValue(this.hiv,'counselling on HIV not provided','displayNone',true)
      }
    },
    handledeHiv(){
      if(getRadioSelectedValue(this.hiv,'counselling on HIV not provided')=='other'){
        modifyFieldValue(this.hiv,'hiv Counselling','displayNone',false)
      }else{
         modifyFieldValue(this.hiv,'hiv Counselling','displayNone',true)
      }
    },
    handleCounselHiv(){
      if(getRadioSelectedValue(this.hiv,'cousellHiv')=='no'){
        modifyRadioValue(this.hiv,'hiv','displaNone',false)
      }else{
        modifyRadioValue(this.hiv,'hiv','displaNone',true)
      }
    },
    handleHperB(){
      if(getRadioSelectedValue(this.hepatitisReason,'hepatitis B')=='other'){
        modifyFieldValue(this.hepatitisReason,'hepatitis B','displayNone',false)
      }else{
         modifyFieldValue(this.hepatitisReason,'hepatitis B','displayNone',true)
      }
    },
    handleasbReason(){
      if(getRadioSelectedValue(this.asbReason,'SevenDay')=='no'){
        modifyRadioValue(this.asbReason,'SevenDayReason','displayNone',false)
      }else{
        modifyRadioValue(this.asbReason,'SevenDayReason','displayNone',true)
      }
    },
    handleOtherasb(){
      if(getRadioSelectedValue(this.asbReason,'SevenDayReason')=='other'){
        modifyFieldValue(this.asbReason,'hypertensionCounselling','displayNone',false)
      }else{
        modifyFieldValue(this.asbReason,'hypertensionCounselling','displayNone',true)
      }
    },
    handleNone(){
        const checkBoxes=['Hypertension','Pre-eclampsia','HIV','Hepatitis B','Hepatitis C','Syphilis',]

      if (getCheckboxSelectedValue(this.diagnoses, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.diagnoses, checkbox, 'checked', false);
            modifyCheckboxValue(this.diagnoses, checkbox, 'disabled', true);
        });
        } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.diagnoses, checkbox, 'disabled', false);
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