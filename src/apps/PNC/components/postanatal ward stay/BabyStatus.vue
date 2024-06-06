<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form
            :contentData="babyStatusDetails"
            :initialData="initialData"
            @update:selected="handleInputData" @update:inputValue="handleInputData"

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
import BasicCard from "@/components/BasicCard.vue";
import {useDeliveryDetailsStore} from "@/apps/PNC/stores/postnatal details/DeliveryDetails";
import {useDischargeWomanStore} from "@/apps/PNC/stores/others/DischargeWoman";
import {useBabyStatusStore} from "@/apps/PNC/stores/postnatal ward stay/BabyStatus";
import {validateField} from "@/services/PNC/ward_monitoring_for_baby_validation_service";
import {getFieldValue} from "@/services/data_helpers";
export default defineComponent({
  name: "BabyStatus",
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
      initialData1:[] as any

    };
  },
  computed:{
    ...mapState(useBabyStatusStore,["babyStatusDetails"]),
    ...mapState(useBabyStatusStore,["dangerSigns"]),
    "Birth weight"(){ return getFieldValue(this.babyStatusDetails, 'Birth weight','value')},

  },
  mounted(){
    const babyStatusDetails=useBabyStatusStore()
    const dangerSigns=useBabyStatusStore()
    this.initialData=babyStatusDetails.getInitial()
    this.initialData1=dangerSigns.getInitial1()
    this.validateRowData({})

  },
  watch:{
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    validationRules(event: any) {
      return validateField(this.babyStatusDetails,event.name, (this as any)[event.name]);
    },

    //Handling input data on Profile-Past Obstetric history
    async handleInputData(event: any){
      this.validateRowData(event)
    },

    // Validations
    validateRowData(event: any) {
      this.validationRules(event)
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