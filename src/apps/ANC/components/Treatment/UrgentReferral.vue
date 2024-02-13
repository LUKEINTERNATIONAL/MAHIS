<template>
<ion-list>
         <!-- Question on referral -->
         <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Referred to hospital? </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>
    
     <!-- Question on referral not done -->
     <ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 50px; ">Referred to hospital? </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 64.4%;">No</ion-radio>  
                      </div>
                      </IonRadioGroup>
                      <BasicForm :content-data="referral"></BasicForm>
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
import {useUrgentReferralStore} from '../../store/urgentReferral';
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
        ...mapState(useUrgentReferralStore, ["referral"]),
  
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

