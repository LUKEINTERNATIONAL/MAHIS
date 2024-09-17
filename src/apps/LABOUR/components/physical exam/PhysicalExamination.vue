<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="vitals" ></basic-form>
      </ion-card-content>
    </ion-card>
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header">Anaemia</ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="anaemia"></basic-form>
      </ion-card-content>
    </ion-card>
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="otherphysicalExams" ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
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

import BasicCard from "@/components/BasicCard.vue";
import {useLabourPhysicalExamStore} from "@/apps/LABOUR/stores/physical exam/physicalExamination";
import { getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';
export default defineComponent({
  name: "History",
  components:{
    BasicCard,
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
      vValidations: '' as any,
      hasValidationErrors: [] as any,

    };
  },
  computed:{
    ...mapState(useLabourPhysicalExamStore,["vitals"]),
    ...mapState(useLabourPhysicalExamStore,["anaemia"]),
    ...mapState(useLabourPhysicalExamStore,["otherphysicalExams"]),
  },
  mounted(){
  },
  watch:{
    otherphysicalExams:{
      handler(){
        this.handleOtherPresentation();
        this.handleContractions();
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    handleOtherPresentation(){
      const isOther =
        getRadioSelectedValue(this.otherphysicalExams, "Presentation") ==
        "Other";

      modifyFieldValue(
        this.otherphysicalExams,
        "Other",
        "displayNone",
        !isOther
      );
    },
    handleContractions(){
      const isOther =
        getRadioSelectedValue(this.otherphysicalExams, "Contractions") ==
        "no Contraction Felt";


        console.log(getRadioSelectedValue(this.otherphysicalExams, "Contractions"));

      modifyFieldValue(
        this.otherphysicalExams,
        "Number of contraction",
        "displayNone",
        isOther
      );
    }
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
  max-width: 1300px;
  margin-bottom: 20px;
}

ion-card {
  box-shadow:none;
  background-color:inherit;
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
  font-size: 14px;
}

</style>