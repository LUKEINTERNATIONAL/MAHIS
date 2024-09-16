<template>
    <div class="container">
      <ion-card  class="section">
        <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
        <ion-card-content>
          <basic-form :contentData="clinicalCounselling"
                      :initialData="initialData"

          ></basic-form>
        </ion-card-content>
      </ion-card>
    </div>
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
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'
import {useClinicalCounsellingStore} from "@/apps/ANC/store/counselling/clinicalCousellingStore";
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
            currentSection: 0,
          initialData:[] as any,

        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
...mapState(useClinicalCounsellingStore,["clinicalCounselling"])

    },
    mounted(){
    const clinicalCounselling=useClinicalCounsellingStore()
      this.initialData=clinicalCounselling.getInitial()
    },
    watch:{

    },
    methods :{
        goToNextSection() {
      if (this.currentSection < 4) {
        this.currentSection++;
      }
    },
    }
})


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px; 
  margin-bottom: 20px;
}

ion-card {

  width: 100%;
 color: black;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; 
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
</style>