<template>
    <ion-list>
        <!-- Questions on pre-eclampsia risk -->
<ion-row class="dottedLine">
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
                    </ion-row>

                      <!-- Questions on Aspirin -->
<ion-row class="dottedLine">
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
                    </ion-row>

                            <!-- Questions on gestational mellitus -->
<ion-row class="dottedLine">
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
                    </ion-row>

                                          <!-- Questions on HIV risk -->
<ion-row class="dottedLine">
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
                    </ion-row>
        
                              <!-- Questions on seeking care -->
<ion-row class="dottedLine">
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
                    </ion-row>

                                                  <!-- Questions on ANC contact schedule -->
<ion-row class="dottedLine">
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
                    </ion-row>

                                                                      <!-- Questions on mode of transport -->
<ion-row class="dottedLine">
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
                    </ion-row>

                     <!-- Questions on Rh factor -->
<ion-row class="dottedLine">
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
                    </ion-row>

                                                  <!-- Question on breast feeding -->
<ion-row class="dottedLine">
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
    </ion-list>

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
         
      };
    },
    computed:{
         ...mapState(useDiagnosisCounsellingStore,["dailyAspirin"]),
         ...mapState(useDiagnosisCounsellingStore,["aspirin"]),
         ...mapState(useDiagnosisCounsellingStore,["dailyPrEP"]),
         ...mapState(useDiagnosisCounsellingStore,["PrEP"]),
         ...mapState(useDiagnosisCounsellingStore,["birthPlace"]),
      },
      mounted(){
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      methods:{
   
          },
      });

</script>

<style scoped>
.dottedLine {
    border-bottom: 1.5px dotted var(--ion-color-medium);
    margin-top: 10px;
    padding:10px; 
}

.radio {
        display: flex;
        flex-direction: column;
        /* border-bottom: 2px dotted var(--ion-color-medium);  */
        --inner-border-width:0;
        padding: 10px;
}
</style>