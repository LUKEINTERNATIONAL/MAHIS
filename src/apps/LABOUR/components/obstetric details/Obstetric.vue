<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header">History on previous pregnancies</ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="prevPregnancies"  @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
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
import { useObstreticHistoryStore} from "@/apps/LABOUR/stores/obstetric details/obstetric";
import { checkmark, pulseOutline } from 'ionicons/icons';
import {
  dynamicValue,
  getCheckboxSelectedValue,
  getFieldValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
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
      modeOfDelieveryRef: {},
      iconsContent: icons,
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      prevPregnanciesInstance: {} as any,
      modeOfDeliveryInstance: {} as any,
      currentSection: 0,
      inputField: '' as any,

    };
  },
  computed:{
    ...mapState(useObstreticHistoryStore,["prevPregnancies"]),
    // ...mapState(useObstreticHistoryStore,["HeadssAssesment"]),
    // ...mapState(useObstreticHistoryStore,["preterm"]),
    // ...mapState(useObstreticHistoryStore,["abnormalities"]),
    // ...mapState(useObstreticHistoryStore,["modeOfDelivery"]),
    // ...mapState(useObstreticHistoryStore, ["Complications"]),
    
    Stillbirths(){ return getFieldValue(this.prevPregnancies, 'Stillbirths','value')},
    LiveBirths(){ return getFieldValue(this.prevPregnancies, 'LiveBirths','value')},
    Parity(){ return getFieldValue(this.prevPregnancies, 'Parity','value')},
    Abortions(){ return getFieldValue(this.prevPregnancies, 'Abortions','value')},
  },
  mounted(){
    this.prevPregnanciesInstance = useObstreticHistoryStore()

  },
  watch:{
    prevPregnancies: {

    },
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {}
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