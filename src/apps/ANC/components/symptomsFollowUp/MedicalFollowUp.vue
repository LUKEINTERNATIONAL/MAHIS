<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="medicalFollowUp"
                     :initialData="initialData" >

        </basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useMedicalFollowUpStore} from "@/apps/ANC/store/symptomsFollowUp/medicalFollowUp";
 import BasicForm from '@/components/BasicForm.vue';
 import { validateField } from "@/services/ANC/symptoms_validation";
 import {checkmark, pulseOutline} from "ionicons/icons";
 import {getCheckboxSelectedValue, modifyCheckboxValue} from "@/services/data_helpers";


export default defineComponent({
    name:"Medical FollowUp",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },
  data() {
    return {
      initialData:[] as any,

    }
  },
  setup(){
    return { checkmark,pulseOutline };
  },

    mounted(){
      this.handleMedicalFollowup();
      this.handleSideEffects();
      const medicalFollowUp =useMedicalFollowUpStore();
      this.initialData=medicalFollowUp.getInitial()
    },
      computed:{
        ...mapState(useMedicalFollowUpStore,["medicalFollowUp"]),
    },
  watch:{
      medicalFollowUp:{
        handler(){
          this.handleMedicalFollowup();
          this.handleSideEffects();
        },
        deep:true
      }
  },
    methods: {
     handleMedicalFollowup(){
       const checkBoxes=['Taking Calcium Supplements','Taking iron and folic acid (IFA) tablets',
         'Taking aspirin tablets','Taking penicillin treatment for syphilis','Taking vitamin A supplements',
         'Taking Albendazole for deworming','Other medication']

       if (getCheckboxSelectedValue(this.medicalFollowUp, 'None')?.checked) {
         checkBoxes.forEach((checkbox) => {
           modifyCheckboxValue(this.medicalFollowUp, checkbox, 'checked', false);
           modifyCheckboxValue(this.medicalFollowUp, checkbox, 'disabled', true);
         });
       } else {
         checkBoxes.forEach((checkbox) => {
           modifyCheckboxValue(this.medicalFollowUp, checkbox, 'disabled', false);
         });
       }
     },
      handleSideEffects(){
        const checkBoxes=['Side-effects from calcium supplements','Side-effects from iron and folic acid supplements',
          'Side-effects from Aspirin supplements', 'Side-effects from Vitamin A supplements', 'Side-effects from Penicillin',
          'Side-effects from Albendazole','Other']

        if (getCheckboxSelectedValue(this.medicalFollowUp, 'No side effects')?.checked) {
          checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.medicalFollowUp, checkbox, 'checked', false);
            modifyCheckboxValue(this.medicalFollowUp, checkbox, 'disabled', true);
          });
        } else {
          checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.medicalFollowUp, checkbox, 'disabled', false);
          });
        }
      }
    }
})
</script>
<style scoped>
.sub_item_body{
    margin-left: 45px;
}

ion-item.sub_item_body_close {
        border-bottom: 2px dotted var(--ion-color-medium);
        --inner-border-width:0;
    }
ion-card {

  width: 100%;
  color: black;
}
ion-label {
  color: var(--ion-color-primary);
  font-weight: bold;
}
</style>
