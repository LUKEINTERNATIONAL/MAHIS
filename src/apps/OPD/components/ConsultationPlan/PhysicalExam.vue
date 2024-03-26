<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="physicalExam" ></basic-form>
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
  getFieldValue, getRadioSelectedValue, modifyCheckboxHeader, modifyCheckboxValue, modifyFieldValue, modifyRadioValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
import {usePhysicalExaminationStore} from "@/stores/PhysicalExam";
export default defineComponent({
  name: "immidiatePostnatalChecksForChild",
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

    };
  },
  computed:{
    ...mapState(usePhysicalExaminationStore,["physicalExam"]),
  },
  mounted(){
    this.handlePhysicalExam()
  },
  watch:{
    physicalExam: {
      handler() {
        this.handlePhysicalExam()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {

    handlePhysicalExam(){
      if(getRadioSelectedValue(this.physicalExam,'Physical examination done')=='yes'){
        modifyRadioValue(this.physicalExam,'Eyes normal','displayNone',false)

          if(getRadioSelectedValue(this.physicalExam,'Eyes normal')=='no')
          {
            modifyCheckboxHeader(this.physicalExam, 'Parlour', 'displayNone', false);
            modifyCheckboxHeader(this.physicalExam, 'Jaundice', 'displayNone', false);
            modifyCheckboxHeader(this.physicalExam, 'Ulcerations', 'displayNone', false);
            modifyCheckboxHeader(this.physicalExam, 'Other eye abnormality', 'displayNone', false);
            if(getCheckboxSelectedValue(this.physicalExam,'Other eye abnormality')?.value =='other'){
              modifyFieldValue(this.physicalExam,'Other eye abnormality field','displayNone',false)
            }else
            {
              modifyFieldValue(this.physicalExam,'Other eye abnormality field','displayNone',true)

            }
          } else {
            modifyCheckboxHeader(this.physicalExam, 'Parlour', 'displayNone', true);
            modifyCheckboxHeader(this.physicalExam, 'Jaundice', 'displayNone', true);
            modifyCheckboxHeader(this.physicalExam, 'Ulcerations', 'displayNone', true);
            modifyCheckboxHeader(this.physicalExam, 'Other eye abnormality', 'displayNone', true);
          }
        modifyRadioValue(this.physicalExam,'Mouth normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Ears normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Face normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Neck normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Chest inspection normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Chest movement','displayNone',false)
        modifyRadioValue(this.physicalExam,'Heart sounds normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Breath sounds normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Abdominal inspection normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Abdominal Auscultation normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Abdominal Palpation normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Genital examination normal','displayNone',false)
      }else{
        modifyRadioValue(this.physicalExam,'Eyes normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Mouth normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Ears normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Face normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Neck normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Chest inspection normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Chest movement','displayNone',true)
        modifyRadioValue(this.physicalExam,'Heart sounds normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Breath sounds normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Abdominal inspection normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Abdominal Auscultation normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Abdominal Palpation normal','displayNone',true)
        modifyRadioValue(this.physicalExam,'Genital examination normal','displayNone',true)
      }

      if(getRadioSelectedValue(this.physicalExam,'Physical examination done')=='no'){
        modifyRadioValue(this.physicalExam,'Reason why physical examination not done','displayNone',false)
      }else{
        modifyRadioValue(this.physicalExam,'Reason why physical examination not done','displayNone',true)}
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