<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="persistentBehaviour"
                    @update:selected="handleInputData"
                    :initialData="initialData"

        ></basic-form>
        <basic-form :contentData="persistentSymptoms"
                    @update:selected="handleInputData"
                    :initialData="initialData1"
        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
 import{ IonItem,IonList,} from "@ionic/vue";
import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {usePersistentBehaviourStore} from "@/apps/ANC/store/symptomsFollowUp/persistentBehaviourStore";
 import BasicForm from '@/components/BasicForm.vue';
import { validateField } from "@/services/ANC/symptoms_validation";
 import {getCheckboxSelectedValue, modifyCheckboxValue} from "@/services/data_helpers";


export default defineComponent({
    name:"Persistent Behaviour",
    components:{
        IonItem,
        IonList,
        BasicInputField,
        BasicForm
    },
  data() {
    return{
      initialData:[] as any,
      initialData1:[] as any,
    }
  },

    mounted(){
        const persistentBehaviours =usePersistentBehaviourStore()
      const persistentSymptoms=usePersistentBehaviourStore()
      this.initialData=persistentBehaviours.getInitial()
      this.initialData1=persistentSymptoms.getInitialPersistentSymptoms()
      this.handlePersistentBehaviour()
      this.handlePersistentSymptoms()
    },
      computed:{
        ...mapState(usePersistentBehaviourStore,["persistentBehaviour", "persistentSymptoms"]),
    },
  watch:{
    persistentBehaviour:{
      handler(){
        this.handlePersistentBehaviour()
      },
      deep:true
    },
    persistentSymptoms:{
      handler(){
        this.handlePersistentSymptoms()
      },
      deep:true

    },

  },
    methods: {
      validationRules(event: any) {
            return validateField(this.persistentBehaviour, event.name, (this as any)[event.name]);
        },
      handlePersistentSymptoms(){
        const checkBoxes = [
          "Leg cramps",
          "Visual disturbance",
          "Constipation",
          "Headache",
          "Heartburn",
          "Pain-Leg",
          "Breathing difficulty",
          "Cough lasting more than 3 weeks",
          "Other symptoms",
          "Pelvic pain",
          "Pain - Low back",
          "Abnormal pulse rate",
        ];

        if (getCheckboxSelectedValue(this.persistentSymptoms, 'None')?.checked) {
          checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.persistentSymptoms, checkbox, 'checked', false);
            modifyCheckboxValue(this.persistentSymptoms, checkbox, 'disabled', true);
          });
        } else {
          checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.persistentSymptoms, checkbox, 'disabled', false);
          });
        }
      },
      handlePersistentBehaviour() {
        const checkBoxes = [
          "Tobacco use",
          "Recently quit tobacco products",
          "Exposure to second-hand smoke",
          "Condom use",
          "Alcohol use",
          "Substance use",
          "High caffeine intake",
          "Other",
        ];
        const noPersistentBehavioursChecked = getCheckboxSelectedValue(this.persistentBehaviour, 'No persistent behaviours')?.checked;
        checkBoxes.forEach((checkBox) => {
          if (noPersistentBehavioursChecked) {
            modifyCheckboxValue(this.persistentBehaviour, checkBox, 'checked', false);
            modifyCheckboxValue(this.persistentBehaviour, checkBox, 'disabled', true);
          } else {
            modifyCheckboxValue(this.persistentBehaviour, checkBox, 'disabled', false);
          }
        });

      },
      async handleInputData(event: any) {
            // console.log("🚀 ~ handleInputData ~ event:", event)

            this.validationRules(event);
        },
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
</style>
