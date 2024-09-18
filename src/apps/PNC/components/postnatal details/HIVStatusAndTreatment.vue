<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form
            :contentData="hivStatusAndTreatment"
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
import {useHIVStatusAndTreatmentStore} from "@/apps/PNC/stores/postnatal details/HIVStatusAndTreatment";
import { getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';
export default defineComponent({
  name: "HIVStatusAndTreatment",
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
    ...mapState(useHIVStatusAndTreatmentStore,["hivStatusAndTreatment"]),
  },
  mounted(){
    const hivStatus=useHIVStatusAndTreatmentStore()
    this.initialData=hivStatus.getInitial()
    this.handleHIV()
    this.handleArtNumber()
  },
  watch:{
    hivStatusAndTreatment:{
      handler(){
        this.handleHIV()
        this.handleArtNumber()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
      handleHIV(){
        if(getRadioSelectedValue(this.hivStatusAndTreatment,'Mother HIV Status')=='positive'){
          modifyRadioValue(this.hivStatusAndTreatment,'ART treatment','displayNone',false)
        }else{
          modifyRadioValue(this.hivStatusAndTreatment,'ART treatment','displayNone',true)
        }
  },
  handleArtNumber(){
    if(getRadioSelectedValue(this.hivStatusAndTreatment,'ART treatment')=='yes'){
      modifyFieldValue(this.hivStatusAndTreatment,'ART Number','displayNone',false)
    }else{
      modifyFieldValue(this.hivStatusAndTreatment,'ART Number','displayNone',true)
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