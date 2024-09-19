<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="placentaExamination"
                    :initialData="initialData"
                         @update:selected="handleInputData"
        @update:inputValue="handleInputData"

        ></basic-form>
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
import {
  dynamicValue,
  getCheckboxSelectedValue,
  getFieldValue,
  getRadioSelectedValue,
  modifyRadioValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";

import {PlacentaExaminationValidationSchema, useThirdStageOfLabourStore} from "@/apps/LABOUR/stores/delivery details/thirdStageDelivery";
import { YupValidateField } from '@/services/validation_service';
export default defineComponent({
  name: "ThirdStageOfDelivery",
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
      inputField: '' as any,
      initialData:[] as any,

    };
  },
  computed:{
    ...mapState(useThirdStageOfLabourStore,["placentaExamination"]),
  },
  mounted(){
    const placentaExamination=useThirdStageOfLabourStore()
    this.initialData=placentaExamination.getInitial()
  },
  watch:{
    placentaExamination : {
      handler(){
        this.handleCervixTearChange();
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    async handleInputData(event: any) {
      YupValidateField(
        this.placentaExamination,
        PlacentaExaminationValidationSchema,
        event.name,
        event.value
      );
    },

    handleCervixTearChange(){
      const tearChange =
        getRadioSelectedValue(this.placentaExamination, "Presentation") ==
        "Other";

      modifyRadioValue(
        this.placentaExamination,
        "Severity",
        "displayNone",
        !tearChange
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0); /* Adds a box shadow with reduced intensity */
}

.section {
  width: 100%;
  max-width: 1300px;
  margin-bottom: 20px;
}

ion-card {
  background-color: white;
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
.sub_item_header {
  font-weight: bold;
  font-size: 14px;
}
</style>
