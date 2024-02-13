<template>
<ion-list>
    <!-- Questions on iron prescription -->
    <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Iron prescribed?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Type of Iron supplement dosage provided</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Daily</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Weekly</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>


                      <ion-col>
                        <BasicForm :content-data= "iron"></BasicForm>
                </ion-col>
                    </ion-row>

        <!-- Questions on folic acid dosage -->
        <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Daily dose of folic acid prescribed?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Reason Iron and folic acid not prescribed</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Side effects</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Client was referred</ion-radio>  
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Other</ion-radio> 
                        <BasicForm :content-data= "folicAcid"></BasicForm>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                      <ion-col>
                        <BasicForm :content-data= "dailyFolicAcid"></BasicForm>
                </ion-col>
                    </ion-row>

                           <!-- Questions on vitamin A dosage -->
    <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Vitamin A prescribed?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Reason Vitamin A not prescribed</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Side effects</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Stock-out</ion-radio>  
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Other</ion-radio> 
                      </div>
                      </IonRadioGroup>                        
                        <BasicForm :content-data= "vitaminA"></BasicForm>
                    </ion-col>


                      <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Type of Vitamin A dosage provided</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Daily</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Weekly</ion-radio>  
                      </div>
                      </IonRadioGroup>
                </ion-col>
                    </ion-row>

                     <!-- Questions on calcium prescription -->
    <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Daily calcium prescribed?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px;">Reason calcium supplements not prescribed</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Side effects</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Stock-out</ion-radio>  
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Allergy to medication</ion-radio> 
                        <ion-radio style="margin-bottom: 10px; width: 90%;">Other</ion-radio> 
                      </div>
                      </IonRadioGroup>                        
                        <BasicForm :content-data= "calcium"></BasicForm>
                    </ion-col>


                      <ion-col>
                        <BasicForm :content-data= "dailyCalcium"></BasicForm>
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
import { useMedicationDispersedStore } from '../../store/medicationDispersed';



export default defineComponent ({
    name: "medicationDispersed",
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
        ...mapState(useMedicationDispersedStore, ["iron"]),
        ...mapState(useMedicationDispersedStore, ["folicAcid"]),
        ...mapState(useMedicationDispersedStore, ["dailyFolicAcid"]),
        ...mapState(useMedicationDispersedStore, ["vitaminA"]),
        ...mapState(useMedicationDispersedStore, ["calcium"]),
        ...mapState(useMedicationDispersedStore, ["dailyCalcium"]),

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