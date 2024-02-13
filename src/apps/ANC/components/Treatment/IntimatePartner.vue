<template>
<ion-list>
                                                      <!-- Question on IPV firstline support -->
<ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Intimate Partner violence firstline support provided? </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
            <IonRadioGroup>
                      <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; margin-top: 20px;">Reason IPV firstline support not done</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Client was referred</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Trained provided unavailable</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Private/safe space unavailable</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Confidentiality could not be assured</ion-radio>
                        <ion-radio style="margin-bottom: 30px; width: 100%;">Other</ion-radio>
                        <BasicForm :content-data = "IPV"></BasicForm>
                      </div>
                    </IonRadioGroup>
        </ion-col>
                    </ion-row>
                                                                    <!-- Question on care provided -->
<ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">What additional care provided?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No action necessary</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%">Safety assessment conducted</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%">Mental health care</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%">Care for other presenting signs and symptoms</ion-radio>
                        <ion-radio style="margin-bottom: 30px; width: 80%">Client was referred</ion-radio> 
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Safety assessment conducted? </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>

                                                                      <!-- Physical violence -->
<ion-row class="dottedLine" style="margin-bottom: 30px;">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Has the physical violence happened more often or gotten worse over the past 6 months?
</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Has he ever used a weapon or threatened you with a weapon?
 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Has he ever tried to strangle you? 
 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 80%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>

                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Has he ever beaten you when you were pregnant?
 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Is he violently and constantly jealous of you?
</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; "> Do you believe he could kill you?
 </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>
   <ion-list>
    <ion-row>
                    <ion-col>
    <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Was client referred?

</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 45%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 30px; width: 45%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                </ion-row>
                    <ion-label style="font-weight: bold; margin-bottom: 30px;padding: 10px;">Referrals made as part of first-line support </ion-label>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Care at another health facility
    </ion-checkbox>
</ion-col>
<ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Crisis intervention or counselling
    </ion-checkbox>
    </ion-col>
</ion-row>

<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Police
    </ion-checkbox>
</ion-col>
<ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Shelter or housing
    </ion-checkbox>
    </ion-col>
</ion-row>
<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Legal aid & services
    </ion-checkbox>
</ion-col>
<ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Child protection
    </ion-checkbox>
    </ion-col>
</ion-row>

<ion-row class="dottedLine">
    <ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Livelihood support
    </ion-checkbox>
</ion-col>
<ion-col>
    <ion-checkbox label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 80px;">
        Other
    </ion-checkbox>
    <BasicForm :content-data="referrals"></BasicForm>
    </ion-col>
</ion-row>
</ion-list>

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
import {useIntimatePartnerStore } from '../../store/intimatePartnerStore';



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

        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
         ...mapState(useIntimatePartnerStore, ["IPV"]),
         ...mapState(useIntimatePartnerStore, ["referrals"]),
      
   

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
ion-checkbox {
    width: 90%;
}

</style>

    