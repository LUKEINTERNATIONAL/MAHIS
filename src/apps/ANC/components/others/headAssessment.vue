<template>
  <div class="container">
    <ion-card class="section">
        <ion-card-content>
          <basic-form :contentData="headssAssesment"

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
import { useObstreticHistoryStore} from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { checkmark, pulseOutline } from 'ionicons/icons';
import {
  dynamicValue,
  getCheckboxSelectedValue,
  getFieldValue,
  getRadioSelectedValue,
  modifyCheckboxValue,
  modifyDynamicFieldValue,
  modifyFieldValue
} from '@/services/data_helpers';
import StandardValidations from "@/validations/StandardValidations";
import {validateField} from "@/services/ANC/validation_service";
import BasicCard from "@/components/BasicCard.vue";
import { Service } from "@/services/service"
import {useHeadssAssessmentStore} from "@/apps/ANC/store/others/headsAssessmentStore";
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
      initialData:[] as any,
      iconsContent: icons,
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      inputField: '' as any,

    };
  },
  computed:{
    ...mapState(useHeadssAssessmentStore,["headssAssesment"]),
  },

  mounted(){
    this.handleHeadAssessment()
    const headssAssesment=useHeadssAssessmentStore();
        this.initialData = headssAssesment.getInitial();
  },
  watch:{
      headssAssesment:{
        handler(){
          this.handleHeadAssessment()
        },
        deep:true
      }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    handleHeadAssessment(){
      if(getRadioSelectedValue(this.headssAssesment,'Who does does the client live with')=='other'){
        modifyFieldValue(this.headssAssesment,'Other','displayNone',false)
      }else{
        modifyFieldValue(this.headssAssesment,'Other','displayNone',true)
      }
    }
  },
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

</style>@/apps/ANC/store/others/headsAssessmentStore