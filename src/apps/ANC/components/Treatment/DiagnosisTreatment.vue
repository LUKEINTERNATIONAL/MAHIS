<template>
<ion-list>
    <ion-label style="font-weight: bold; margin-bottom: 30px;">Select All Diagonises conducted with their result </ion-label>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 94px;">
        Hypertension
    </ion-checkbox>
</ion-col>
<ion-col>
    <BasicForm :content-data = "hypertension"></BasicForm>
</ion-col>
</ion-row>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 94px;">
        Pre-eclampsia
    </ion-checkbox>
</ion-col>
<ion-col>
    <BasicForm :content-data = "preEclampsia"></BasicForm>
</ion-col>
</ion-row>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 94px;">
        HIV
    </ion-checkbox>
</ion-col>
<ion-col>
    <BasicForm :content-data = "hiv"></BasicForm>
</ion-col>
</ion-row>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 94px;">
        Hepatitis B
    </ion-checkbox>
</ion-col>
<ion-col>
    <BasicForm :content-data = "hepatitisB"></BasicForm>
</ion-col>
</ion-row>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 94px;">
        Hepatitis C
    </ion-checkbox>
</ion-col>
<ion-col>
    <BasicForm :content-data = "hepatitisC"></BasicForm>
</ion-col>
</ion-row>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 94px;">
        TB screening
    </ion-checkbox>
</ion-col>
<ion-col>
    <BasicForm :content-data = "tbScreening"></BasicForm>
</ion-col>
</ion-row>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 94px;">
        Syphilis
    </ion-checkbox>
</ion-col>
<ion-col>
    <BasicForm :content-data = "syphilis"></BasicForm>
</ion-col>
</ion-row>

<!-- Questions on counselling conducted -->
<ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Has client developed severe hypertension?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Does the patient have pre-eclampsia with severe features?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>
<!-- Questions on counselling conducted -->
                    <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling conducted on hypertension?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>

                 

                      </IonRadioGroup>
                    <IonRadioGroup>
                      <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Reason counselling on hypertension not provided</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Stockout</ion-radio>
                        <BasicForm :content-data= "hypertensionCounselling"></BasicForm>
                      </div>
                    </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling on HIV positive conducted?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                      <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Reason counselling on HIV positive not provided</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Stockout</ion-radio>
                        <BasicForm :content-data= "hivCounselling"></BasicForm>
                      </div>
                    </IonRadioGroup>
                    </ion-col>
                    </ion-row>
                    <!-- Questions on counselling conducted -->
                    <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling conducted on hepatitis B?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>

                 

                      </IonRadioGroup>
                    <IonRadioGroup>
                      <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Reason counselling on hepatitis B not provided</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Stockout</ion-radio>
                        <BasicForm :content-data= "hepatitisBCounselling"></BasicForm>
                      </div>
                    </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling on hepatitis C conducted?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling and treatment on syphilis conducted?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>
                                        <!-- Questions on counselling conducted -->
                                        <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling and further testing on syphilis?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                          </div>
                        </IonRadioGroup>

                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling on TB screening conducted?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                          </div>
                        </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Seven-day antibiotic regimen for asymptomatic  bacteriuria (ASB) provided?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">No</ion-radio>
                      </div>
                      </IonRadioGroup>

                   
                    <IonRadioGroup>
                      <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Reason seven-day antibiotic regimen for asymptomatic  bacteriuria (ASB) not provided?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Stockout</ion-radio>
                        <BasicForm :content-data= "ASBcounselling"></BasicForm>
                      </div>
                    </IonRadioGroup>
                    </ion-col>
                    </ion-row>

                                                         <!-- Questions on counselling conducted -->
                                                         <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling on gestational diabetes mellitus (GDM)?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                          </div>
                        </IonRadioGroup>

                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling on diabetes mellitus conducted?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                          </div>
                        </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Counselling on anaemia conducted?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">No</ion-radio>
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
import {useDiagnosisStore} from '../../store/diagnosisStore';
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

        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
        ...mapState(useDiagnosisStore, ["hypertension"]),
        ...mapState(useDiagnosisStore, ["preEclampsia"]),
        ...mapState(useDiagnosisStore, ["hiv"]),
        ...mapState(useDiagnosisStore, ["hepatitisB"]),
        ...mapState(useDiagnosisStore, ["hepatitisC"]),
        ...mapState(useDiagnosisStore, ["tbScreening"]),
        ...mapState(useDiagnosisStore, ["syphilis"]),
        ...mapState(useDiagnosisStore, ["hypertensionCounselling"]),
        ...mapState(useDiagnosisStore, ["hivCounselling"]),
        ...mapState(useDiagnosisStore, ["hepatitisBCounselling"]),
        ...mapState(useDiagnosisStore, ["ASBcounselling"]),
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

ion-checkbox {
    width: 60%;
}

.radio {
        display: flex;
        flex-direction: column;
        /* border-bottom: 2px dotted var(--ion-color-medium);  */
        --inner-border-width:0;
        padding: 10px;
}
</style>