<template>
<ion-list>

                                                  <!-- Question on TT doses -->
<ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Did the client complete Tetanus toxoid (TT) doses before? </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>
                                                      <!-- TT doses -->
<ion-list class="dottedLine">
<ion-row>
    <ion-col>
        <IonRadioGroup>
    <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Tetanus toxoid (TT) 1 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "tt1Date"></BasicForm>
        </ion-col>
</ion-row>
<ion-row>
    <ion-col>
        <IonRadioGroup>
    <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Tetanus toxoid (TT) 2 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "tt2Date"></BasicForm>
        </ion-col>
</ion-row>
<ion-row>
    <ion-col>
        <IonRadioGroup>
    <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Tetanus toxoid (TT) 3 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "tt3Date"></BasicForm>
        </ion-col>
</ion-row>
<ion-row>
    <ion-col>
        <IonRadioGroup>
    <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Tetanus toxoid (TT) 4 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "tt4Date"></BasicForm>
        </ion-col>
</ion-row>
<ion-row>
    <ion-col>
        <IonRadioGroup>
    <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Tetanus toxoid (TT) 5 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "tt5Date"></BasicForm>
        </ion-col>
</ion-row>
     </ion-list>
     <ion-row class="dottedLine">
        <ion-col>
            <IonRadioGroup>
                      <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Reason Tetanus toxoid (TT) was not conducted</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 45%;">Stockout</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 45%;">Client is ill</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 45%;">Client refused</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 45%;">Allergy to vaccinate</ion-radio>
                        <ion-radio style="margin-bottom: 30px; width: 45%;">Other</ion-radio>
                        <BasicForm :content-data = "ttReason"></BasicForm>
                      </div>
                    </IonRadioGroup>
        </ion-col>
     </ion-row>    


                                                  <!-- Question on Hep B negative -->
<ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Counselling conducted on Hep B negative? </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 44.4%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 44.4%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>
                  <!-- Hep B doses -->
                    <ion-list class="dottedLine">
            <ion-row>
              <ion-col>
               <IonRadioGroup>
                  <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Hepatitis B-1 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "hepB1Date"></BasicForm>
        </ion-col>
</ion-row>
<ion-row>
    <ion-col>
        <IonRadioGroup>
    <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Hep-B 2 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "hepB2Date"></BasicForm>
        </ion-col>
</ion-row>
<ion-row>
    <ion-col>
        <IonRadioGroup>
    <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Hep B-3 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
      
            </ion-col>  
            <ion-col>
            <BasicForm :content-data = "hepB3Date"></BasicForm>
        </ion-col>
</ion-row>
     </ion-list>
     <ion-row class="dottedLine">
        <ion-col>
            <IonRadioGroup>
                      <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Reason Hepatits B vaccination was not conducted</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">Stockout</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">Client is ill</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">Client refused</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">Allergy to vaccinate</ion-radio>
                        <ion-radio style="margin-bottom: 30px; width: 64.4%;">Other</ion-radio>
                        <BasicForm :content-data = "hepBReason"></BasicForm>
                      </div>
                    </IonRadioGroup>
        </ion-col>
     </ion-row>   
</ion-list>
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

        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
        ...mapState(useImmunizationStore, ["tt1Date"]),
        ...mapState(useImmunizationStore, ["tt2Date"]),
        ...mapState(useImmunizationStore, ["tt3Date"]),
        ...mapState(useImmunizationStore, ["tt4Date"]),
        ...mapState(useImmunizationStore, ["tt5Date"]),
        ...mapState(useImmunizationStore, ["ttReason"]),
        ...mapState(useImmunizationStore, ["hepB1Date"]),
        ...mapState(useImmunizationStore, ["hepB2Date"]),
        ...mapState(useImmunizationStore, ["hepB3Date"]),
        ...mapState(useImmunizationStore, ["hepBReason"]),
   

    },
    methods :{

    }

})



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