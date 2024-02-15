<template>
<div class="container">
    <ion-card v-if="currentSection === 0" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="preEclampsia"></basic-form>
                <basic-form :contentData="preEclampsiaCounselling"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 1" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="aspirin"></basic-form>
                <basic-form :contentData="aspirinReason"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 2" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="gdm"></basic-form>
                <basic-form :contentData="gdmCounselling"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 3" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hivRisk"></basic-form>
                <basic-form :contentData="prEp"></basic-form>
                 <basic-form :contentData="prEpReason"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 4" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="seekingCare"></basic-form>
                 <basic-form :contentData="dangerSigns"></basic-form>
                 <basic-form :contentData="ancContact"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 5" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>  
              <basic-form :contentData="birth"></basic-form>
              <basic-form :contentData="modeOfTransport"></basic-form>
              <basic-form :contentData="intrapartum"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 6" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>  
              <basic-form :contentData="birthPlace"></basic-form>
              <basic-form :contentData="postpartum"></basic-form>
              <basic-form :contentData="breastFeeding"></basic-form>
            </ion-card-content>
    </ion-card>
  
              <!-- Navigation Buttons -->
    <div class="navigation-buttons">
      <ion-button @click="goToPreviousSection" expand="block" color="primary" size="medium">Previous</ion-button>
      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Next</ion-button>
    </div> 
</div>
    
    <!-- <ion-list> -->
        <!-- Questions on pre-eclampsia risk -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Pre-eclampsia risk</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Pre-eclampsia risk counselling provided?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row> -->

                      <!-- Questions on Aspirin -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Aspirin provided?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Reason aspirin not prescribed</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Side effects</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Stock-out</ion-radio>  
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Gestational less than 13 weeks</ion-radio> 
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Allergy to medication</ion-radio> 
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Other</ion-radio> 
                      </div>
                      </IonRadioGroup>                        
                        <BasicForm :content-data= "aspirin"></BasicForm>

                    </ion-col>
                    <ion-col>
                    <BasicForm :content-data="dailyAspirin"></BasicForm>
                    </ion-col>
                    </ion-row> -->

                            <!-- Questions on gestational mellitus -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Risk of gestational mellitus (GDM)</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Gestational diabetes mellitus (GDM) risk counselling conducted?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row> -->

                                          <!-- Questions on HIV risk -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 40px;">Counselling conducted on HIV risk?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 40px;">Reason PrEP for HIV prevention was not provided</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Client was referred</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Stock-out</ion-radio>  
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Client refused</ion-radio> 
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Other</ion-radio> 
                      </div>
                      </IonRadioGroup>   
                      <BasicForm :content-data= "PrEP"></BasicForm>
                    </ion-col>
                    <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 40px;">PrEP for HIV prevention provided?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    <BasicForm :content-data="dailyPrEP"></BasicForm>
                    </ion-col>
                    </ion-row> -->
        
                              <!-- Questions on seeking care -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Counselling conducted on seeking care</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Counsel to immediately go to hospital if severe danger signs are present</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row> -->

                                                  <!-- Questions on ANC contact schedule -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Counselling on ANC contact schedule</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Counselling conducted on birth</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row> -->

                                                                      <!-- Questions on mode of transport -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Counselling on mode of transport</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Counselling conducted on companion</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row> -->

                     <!-- Questions on Rh factor -->
<!-- <ion-row class="dottedLine">
    <ion-col>

             <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 40px;">Counselling conducted on Rh factor?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>


                <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 40px;">Planned birth place</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Facility</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Facility (elective caesarian section)</ion-radio>  
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Other</ion-radio> 
                      </div>
                      </IonRadioGroup>   
                      <BasicForm :content-data= "birthPlace"></BasicForm>

                    </ion-col>
                    <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 40px;">Counselling conducted on intrapartum</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 40px;">Counselling conducted on postpartum family planning</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row> -->

                                                  <!-- Question on breast feeding -->
<!-- <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Counselling conducted on breast feeding</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 44.4%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 44.4%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>
    </ion-list> -->

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
         ...mapState(useDiagnosisCounsellingStore,["preEclampsia"]),
         ...mapState(useDiagnosisCounsellingStore,["preEclampsiaCounselling"]),
         ...mapState(useDiagnosisCounsellingStore,["aspirin"]),
         ...mapState(useDiagnosisCounsellingStore,["aspirinReason"]),
         ...mapState(useDiagnosisCounsellingStore,["gdm"]),
         ...mapState(useDiagnosisCounsellingStore,["gdmCounselling"]),
         ...mapState(useDiagnosisCounsellingStore,["hivRisk"]),
         ...mapState(useDiagnosisCounsellingStore,["prEp"]),
         ...mapState(useDiagnosisCounsellingStore,["prEpReason"]),
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
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      methods:{
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