<template>
  <div class="container">
    <ion-card class="section">
    <ion-card-content>
      <basic-form
          :contentData="visitForMother"
          :initialData="initialData"

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
import {useVisitForBabyStore} from "@/apps/PNC/stores/postnatal visits/VisitForBaby";
import {useVisitForMotherStore} from "@/apps/PNC/stores/postnatal visits/VisitForMother";
export default defineComponent({
  name: "VisitForBaby",
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
    ...mapState(useVisitForMotherStore,["visitForMother"]),
  },
  mounted(){
    const visitForMother=useVisitForMotherStore()
    this.initialData=visitForMother.getInitial()
  },
  watch:{
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

</style>yle>