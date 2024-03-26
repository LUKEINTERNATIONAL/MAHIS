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
            if(getCheckboxSelectedValue(this.physicalExam,'Other eye abnormality')?.value =='other eye abnormality'){
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
        if(getRadioSelectedValue(this.physicalExam,'Mouth normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Oral thrush', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Kaposi’s Sarcoma lesions', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Sores', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other mouth abnormality', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other mouth abnormality')?.value =='other mouth abnormality'){
            modifyFieldValue(this.physicalExam,'Other mouth abnormality field','displayNone',false)
          }else
          {
            modifyFieldValue(this.physicalExam,'Other mouth abnormality field','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Oral thrush', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Kaposi’s Sarcoma lesions', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Sores', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other mouth abnormality', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Ears normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Ears normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Discharge', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Bleeding', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other ears abnormality', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other ears abnormality')?.value =='other ears abnormality'){
            modifyFieldValue(this.physicalExam,'Other ears abnormality field','displayNone',false)
          }else
          {
            modifyFieldValue(this.physicalExam,'Other ears abnormality field','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Discharge', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Bleeding', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other ears abnormality', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Face normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Face normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Rash', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Swelling', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other face abnormality', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other face abnormality')?.value =='other face abnormality'){
            modifyFieldValue(this.physicalExam,'Other face abnormality field','displayNone',false)
          }else
          {
            modifyFieldValue(this.physicalExam,'Other face abnormality field','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Swelling', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other face abnormality', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Neck normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Neck normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Neck rash', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Neck swelling', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Neck mass', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other neck abnormality', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other neck abnormality')?.value =='other neck abnormality'){
            modifyFieldValue(this.physicalExam,'Other neck abnormality field','displayNone',false)
          }else
          {
            modifyFieldValue(this.physicalExam,'Other neck abnormality field','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Neck rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Neck swelling', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Neck mass', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other neck abnormality', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Chest inspection normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Chest inspection normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Chest rash', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Chest burns', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Chest bruises', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Chest wounds', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other chest abnormality', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other chest abnormality')?.value =='other chest abnormality'){
            modifyFieldValue(this.physicalExam,'Other chest abnormality field','displayNone',false)
          }else
          {
            modifyFieldValue(this.physicalExam,'Other chest abnormality field','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Chest rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Chest burns', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Chest bruises', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Chest wounds', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other chest abnormality', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Chest movement','displayNone',false)
        modifyRadioValue(this.physicalExam,'Heart sounds normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Heart sounds normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Loud P2', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Splitting P2', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Gallop rhythm', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Murmur', 'displayNone', false);
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Loud P2', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Splitting P2', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Gallop rhythm', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Murmur', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Breath sounds normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Breath sounds normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Absent', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Reduced', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Added', 'displayNone', false);
            if(getCheckboxSelectedValue(this.physicalExam,'Added')?.value =='added')
            {
            modifyCheckboxHeader(this.physicalExam,'Clackles','displayNone',false)
            modifyCheckboxHeader(this.physicalExam,'Wheezes','displayNone',false)
            modifyCheckboxHeader(this.physicalExam,'Bronchial','displayNone',false)
            modifyCheckboxHeader(this.physicalExam,'Crepitations','displayNone',false)
          }else
          {
            modifyCheckboxHeader(this.physicalExam,'Clackles','displayNone',true)
            modifyCheckboxHeader(this.physicalExam,'Wheezes','displayNone',true)
            modifyCheckboxHeader(this.physicalExam,'Bronchial','displayNone',true)
            modifyCheckboxHeader(this.physicalExam,'Crepitations','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Absent', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Reduced', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Added', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Abdominal inspection normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Abdominal inspection normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Abdominal distension', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal rash', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal burns', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Laceration', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal bruises', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal wounds', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal abnormality', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other abdominal abnormality')?.value =='other abdominal abnormality'){
            modifyFieldValue(this.physicalExam,'Other abdominal abnormality field','displayNone',false)
          }else
          {
            modifyFieldValue(this.physicalExam,'Other abdominal abnormality field','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Abdominal distension', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Laceration', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal burns', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal bruises', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal wounds', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal abnormality', 'displayNone', true);
        }
        modifyRadioValue(this.physicalExam,'Abdominal auscultation normal','displayNone',false)
        modifyRadioValue(this.physicalExam,'Abdominal Palpation normal','displayNone',false)
        if(getRadioSelectedValue(this.physicalExam,'Abdominal palpation normal')=='no'){
          modifyCheckboxHeader(this.physicalExam, 'Tenderness', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Hepatomegaly', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Splenomegaly', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Kidney ballotab', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other masses', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other masses')?.value =='other masses'){
            modifyFieldValue(this.physicalExam,'Other masses field','displayNone',false)
          }else
          {
            modifyFieldValue(this.physicalExam,'Other masses field','displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Tenderness', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Hepatomegaly', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Splenomegaly', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Kidney ballotab', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other masses', 'displayNone', true);
        }
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