<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form
            :contentData="newbornComplications"
            :initialData1="initialData"
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
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
//import {useReferralStore} from "@/apps/LABOUR/stores/repeatable things/referral";
import {useEndLabourStore} from "@/apps/LABOUR/stores/repeatable things/labourAndDeliveryEnd";
import {useSecondStageOfLabourStore} from "@/apps/LABOUR/stores/delivery details/secondStageDelivery";
export default defineComponent({
  name: "DeliveryNewbornDetails",
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
    ...mapState(useSecondStageOfLabourStore,["newbornComplications"]),

  },
  mounted(){
    const newbornComplications=useSecondStageOfLabourStore()
    this.initialData=newbornComplications.getInitialNewbornComplications()
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