<template>
  <!--  medications-->
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form
            :contentData="Medication"
            :initialData="initialData"
        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
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
  IonSelect, IonTextarea, IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';
import BasicInputField from '@/components/BasicInputField.vue';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue'
import {useMedicationsStore} from "@/apps/ANC/store/profile/MedicationsStore";
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'

export default defineComponent({
  name: 'Menu',
  components:{
    IonLabel, IonTextarea,
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
    BasicForm
  },
  data() {
    return {
      iconsContent: icons,
      initialData:[] as any,
    };
  },
  mounted(){
    this. handleOther()
    const Medications=useMedicationsStore()
    this.initialData=Medications.getInitial()
  },
  watch:{
     Medication:{
          handler(){
        this.handleOther()
      },
      deep:true
     }
   
  },
  computed: {
    ...mapState(useMedicationsStore, ["Medication"])
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    handleOther(){
      const checkBoxes=['Oral PreP for HIV','Analgesic','Anti-consulsive',
                        'Anti-TB','Antihelmintic','Antimarials','Antitussive',
                        'Aspirin','Calcium','Doxylamine','Hematinic','Iron',
                        'Metoclopramide','Thyroid medication','Antiacids',
                        'Anti-psychotics','Anti-diabetic','Anti-hypertensive',
                        'ARVs','Antivirals','Asthamatic','Co-trimoxazole',
                        'Folic acid','Hemorrhoidal medication','Magnesium',
                        'Multivitamin','Vitamin A','Other',]

     if (getCheckboxSelectedValue(this.Medication, 'None')?.checked) {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.Medication, checkbox, 'checked', false);
            modifyCheckboxValue(this.Medication, checkbox, 'disabled', true);
        });
        } else {
        checkBoxes.forEach((checkbox) => {
            modifyCheckboxValue(this.Medication, checkbox, 'disabled', false);
        });
    }
     
    },
  }
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
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; /* Adjust max-width as needed */
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
ion-card {
  box-shadow:none;
  background-color:inherit;
}
</style>
