<template>
    <div class="container">
    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="ttDoses"></basic-form>
                <basic-form :contentData="HepB1"></basic-form>
                <basic-form :contentData="HepB2"></basic-form>
                <basic-form :contentData="HepB3"></basic-form>
                <basic-form :contentData="hepBReason"></basic-form>
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
import { useImmunizationStore } from '../../store/immunizationStore';
import { getRadioSelectedValue, modifyFieldValue } from '@/services/data_helpers';
import { useCurrentPregnanciesStore } from '../../store/profile/CurrentPreganciesStore';
import { ObservationService } from '@/services/observation_service';
import { useDemographicsStore } from '../../store/DemographicsStore';



export default defineComponent ({
    name: "Immunization",
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
            currentSection: 0, // Initialize currentSection to 0

        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
        ...mapState(useImmunizationStore, ["ttDoses"]),
        ...mapState(useImmunizationStore, ["HepB1"]),
        ...mapState(useImmunizationStore, ["HepB2"]),
        ...mapState(useImmunizationStore, ["HepB3"]),
        ...mapState(useImmunizationStore, ["hepBReason"]),

        ...mapState(useDemographicsStore, ["demographics"]),
   

    },
    mounted(){
      this.handleB1()
      this.handleB2()
       this.handleB3()
       this.handelHepreason()
       this.handleTTinfo()
    },
    watch:{
      HepB1:{
        handler(){
          this.handleB1()
        },deep:true
      },
      HepB2:{
        handler(){
           this.handleB2()
        },deep:true
      },
      HepB3:{
        handler(){
           this.handleB3()
        },deep:true
      },
      hepBReason:{
        handler(){
          this.handelHepreason()
        },deep:true
      },
      // lmnp:{
      //   handler(){
      //     this.handleTTinfo()
      //   },deep:true
      // }

    },

    methods :{
      handleB1(){
        if(getRadioSelectedValue(this.HepB1,'Hepatitis B-1')=='Yes'){
          modifyFieldValue(this.HepB1,'hepb1 Date','displayNone',false)
        }else{
          modifyFieldValue(this.HepB1,'hepb1 Date','displayNone',true)
        }
      },
      handleB2(){
        if(getRadioSelectedValue(this.HepB2,'Hepatitis B-2')=='yes'){
          modifyFieldValue(this.HepB2,'Hep B-2 Date','displayNone',false)
        }else{
          modifyFieldValue(this.HepB2,'Hep B-2 Date','displayNone',true)
        }
      },
      handleB3(){
        if(getRadioSelectedValue(this.HepB3,'Hepatitis B-3')=='yes'){
          modifyFieldValue(this.HepB3,'hep3Date','displayNone',false)
        }else{
          modifyFieldValue(this.HepB3,'hep3Date','displayNone',true)
        }
      },
      handelHepreason(){
        if(getRadioSelectedValue(this.hepBReason,'Hepatitis B')=='other'){
          modifyFieldValue(this.hepBReason,'Specify','displayNone',false)
        }else{
           modifyFieldValue(this.hepBReason,'Specify','displayNone',true)
        }
      },
      handleTTinfo(){
        this.setValues()
      },
        async setValues() {
            const immunisation = await ObservationService.getFirstObsValue(this.demographics.patient_id,"Number of tetanus doses", "value_coded");
            console.log(immunisation)
            if(immunisation == 'Two doses'){
              modifyFieldValue(this.ttDoses,'hepb1 Date','displayNone',false)
            }else{
              modifyFieldValue(this.ttDoses,'hepb1 Date','displayNone',true)
            }
        },
      // handleB3(){
      //   if(getRadioSelectedValue(this.HepB3,'b3')=='yes'){
      //     modifyFieldValue(this.HepB3,'hep3Date','displayNone',false)
      //   }else{
      //     modifyFieldValue(this.HepB3,'hep3Date','displayNone',true)
      //   }
      //   console.log(getRadioSelectedValue(this.HepB3,'b3'))
      // },

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