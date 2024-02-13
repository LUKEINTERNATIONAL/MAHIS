<template>
    <ion-list>
            <!-- Question on preventive treatment -->
<ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Was preventive antihelminthic treatment provided?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%">No</ion-radio>
                      </div>
                      </IonRadioGroup>

                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Reason no preventative treatment provided</ion-label>
                        <ion-radio style="margin-bottom: 20px; width: 95%;">Client was referred</ion-radio>
                        <ion-radio style="margin-bottom: 20px; width: 95%;">Other</ion-radio>
                        <BasicForm :content-data="preventativeTreatment"></BasicForm>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Preventive antihelminthic treatment provided </ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Single-dose albendazole 400 mg</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 100%;">Single-dose mebendazole 500 mg</ion-radio>  
                        <ion-radio style="margin-bottom: 10px; width: 100%;">No preventative treatment provided</ion-radio> 
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>

                    <!-- Question on Malaria -->
<ion-row class="dottedLine">
    <ion-col>
<IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Counselling on malaria prevention?</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 95%;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 95%">No</ion-radio>
                      </div>
                    </IonRadioGroup>
                    </ion-col>
                    <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px; ">Reason counselling on malaria prevention was not conducted </ion-label>
                        <ion-radio style="margin-bottom: 20px; width: 95%;">Client was referred</ion-radio>
                        <ion-radio style="margin-bottom: 20px; width: 95%;">Other</ion-radio>
                        <BasicForm :content-data="malaria"></BasicForm>
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
import {useDewormingStore} from '../../store/dewormingStore';
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
         ...mapState(useDewormingStore,["preventativeTreatment"]),
         ...mapState(useDewormingStore,["malaria"]),
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
        margin-bottom:10px;
}
</style>