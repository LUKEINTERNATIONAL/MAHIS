<template>
  <div class="container">
    <ion-card class="section">
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
  IonInput,
  IonItem,
  IonList,
  IonMenu,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/vue';
import BasicForm from "@/components/BasicForm.vue";
import {icons} from "@/utils/svg";
import BasicInputField from "@/components/BasicInputField.vue";
import {mapState} from 'pinia';
import {checkmark, pulseOutline} from 'ionicons/icons';
import {
  getCheckboxSelectedValue,
  getRadioSelectedValue,
  modifyCheckboxHeader, modifyCheckboxValue,
  modifyFieldValue,
  modifyRadioValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
import {usePhysicalExaminationStore} from "@/apps/OPD/stores/PhysicalExamination";

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
    handlePhysicalExam() {
      if (getRadioSelectedValue(this.physicalExam, 'Physical examination') == 'Yes') {
        // Handle Eyes Normal section
        modifyRadioValue(this.physicalExam, 'Eyes normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Eyes normal') == 'No') {

          modifyCheckboxValue(this.physicalExam, 'Pallor', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Pallor', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Jaundice', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Jaundice', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Ulcerations', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Ulcerations', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other eye abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other eye abnormality')?.value == 'Other eye abnormality') {
            modifyFieldValue(this.physicalExam, 'Other eye abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other eye abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Pallor', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Pallor', 'checked', "");
          modifyCheckboxHeader(this.physicalExam, 'Jaundice', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Ulcerations', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other eye abnormality', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other eye abnormality notes', 'displayNone', true);
        }

        // Handle Mouth Normal section
        modifyRadioValue(this.physicalExam, 'Mouth normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Mouth normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Oral thrush', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Oral thrush', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Kaposi’s Sarcoma lesions', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Kaposi’s Sarcoma lesions', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Sores', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Sores', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other mouth abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other mouth abnormality')?.value == 'Other mouth abnormality') {
            modifyFieldValue(this.physicalExam, 'Other mouth abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other mouth abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Oral thrush', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Kaposi’s Sarcoma lesions', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Sores', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other mouth abnormality', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other mouth abnormality notes', 'displayNone', true);
        }

        // Handle Ears Normal section
        modifyRadioValue(this.physicalExam, 'Ears normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Ears normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Discharge', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Discharge', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Bleeding', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Bleeding', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other ears abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other ears abnormality')?.value == 'Other ears abnormality') {
            modifyFieldValue(this.physicalExam, 'Other ears abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other ears abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Discharge', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Bleeding', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other ears abnormality', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other ears abnormality notes', 'displayNone', true);
        }

        // Handle Face Normal section
        modifyRadioValue(this.physicalExam, 'Face normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Face normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Rash', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Rash', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Swelling', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Swelling', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other face abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other face abnormality')?.value == 'Other face abnormality') {
            modifyFieldValue(this.physicalExam, 'Other face abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other face abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Swelling', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other face abnormality', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other face abnormality notes', 'displayNone', true);
        }

        // Handle Neck Normal section
        modifyRadioValue(this.physicalExam, 'Neck normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Neck normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Neck rash', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Neck rash', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Neck swelling', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Neck swelling', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Neck mass', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Neck mass', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other neck abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other neck abnormality')?.value == 'Other neck abnormality') {
            modifyFieldValue(this.physicalExam, 'Other neck abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other neck abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Neck rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Neck swelling', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Neck mass', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other neck abnormality', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other neck abnormality notes', 'displayNone', true);
        }

        // Handle Chest Inspection Normal section
        modifyRadioValue(this.physicalExam, 'Chest inspection normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Chest inspection normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Chest rash', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Chest rash', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Chest burns', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Chest burns', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Chest bruises', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Chest bruises', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Chest wounds', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Chest wounds', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other chest abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other chest abnormality')?.value == 'Other chest abnormality') {
            modifyFieldValue(this.physicalExam, 'Other chest abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other chest abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Chest rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Chest burns', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Chest bruises', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Chest wounds', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other chest abnormality', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other chest abnormality notes', 'displayNone', true);
        }

        // Handle Heart Sounds Normal section
        modifyRadioValue(this.physicalExam, 'Heart sounds normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Heart sounds normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Loud P2', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Loud P2', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Splitting P2', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Splitting P2', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Gallop rhythm', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Gallop rhythm', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Murmur', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Murmur', 'displayNone', false);
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Loud P2', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Splitting P2', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Gallop rhythm', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Murmur', 'displayNone', true);
        }

        // Handle Breath Sounds Normal section
        modifyRadioValue(this.physicalExam, 'Breath sounds normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Breath sounds normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Absent', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Absent', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Reduced', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Reduced', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Added', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Added')?.value == 'Added') {
            modifyCheckboxValue(this.physicalExam, 'Clackles', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Clackles', 'displayNone', false);
            modifyCheckboxValue(this.physicalExam, 'Wheezes', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Wheezes', 'displayNone', false);
            modifyCheckboxValue(this.physicalExam, 'Bronchial', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Bronchial', 'displayNone', false);
            modifyCheckboxValue(this.physicalExam, 'Crepitations', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Crepitations', 'displayNone', false);
          } else {
            modifyCheckboxHeader(this.physicalExam, 'Clackles', 'displayNone', true);
            modifyCheckboxHeader(this.physicalExam, 'Wheezes', 'displayNone', true);
            modifyCheckboxHeader(this.physicalExam, 'Bronchial', 'displayNone', true);
            modifyCheckboxHeader(this.physicalExam, 'Crepitations', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Absent', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Reduced', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Added', 'displayNone', true);
        }

        // Handle Abdominal Inspection Normal section
        modifyRadioValue(this.physicalExam, 'Abdominal inspection normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Abdominal inspection normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Abdominal distension', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal distension', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Abdominal rash', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal rash', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Abdominal burns', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal burns', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Laceration', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Laceration', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Abdominal bruises', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal bruises', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Abdominal wounds', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal wounds', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other abdominal abnormality')?.value == 'Other abdominal abnormality') {
            modifyFieldValue(this.physicalExam, 'Other abdominal abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other abdominal abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Abdominal distension', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Laceration', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal burns', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal bruises', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Abdominal wounds', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal abnormality', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other abdominal abnormality', 'displayNone', true);
        }
        //Handle abdominal ausaltation
        modifyRadioValue(this.physicalExam,'Abdominal auscultation normal','displayNone', false);
        if(getRadioSelectedValue(this.physicalExam,'Abdominal auscultation normal')=='No'){
          modifyCheckboxValue(this.physicalExam, 'Bruit', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Bruit', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Bowel sounds', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Bowel sounds')?.value=='Bowel sounds'){
            modifyCheckboxValue(this.physicalExam, 'Hyperactive', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Hyperactive', 'displayNone', false);
            modifyCheckboxValue(this.physicalExam, 'Reduced bowel sounds', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Reduced bowel sounds', 'displayNone', false);
          }
          else {
            modifyCheckboxHeader(this.physicalExam, 'Hyperactive', 'displayNone', true);
            modifyCheckboxHeader(this.physicalExam, 'Reduced bowel sounds', 'displayNone', true);
          }
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal auscultation abnormality', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other abdominal auscultation abnormality')?.value == 'Other abdominal auscultation abnormality') {
            modifyFieldValue(this.physicalExam, 'Other abdominal auscultation abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other abdominal auscultation abnormality notes', 'displayNone', true);
          }
        }
        else {
          modifyCheckboxHeader(this.physicalExam, 'Bruit', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Bowel sounds', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal auscultation abnormality', 'displayNone', true);


        }
        // Handle Abdominal Palpation Normal section
        modifyRadioValue(this.physicalExam, 'Abdominal palpation normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Abdominal palpation normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Tenderness', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Tenderness', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Hepatomegaly', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Hepatomegaly', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Splenomegaly', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Splenomegaly', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Kidney ballotab', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Kidney ballotab', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal masses', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other abdominal masses')?.value == 'Other abdominal masses') {
            modifyFieldValue(this.physicalExam, 'Other abdominal palpation abnormality notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other abdominal palpation abnormality notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Tenderness', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Hepatomegaly', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Splenomegaly', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Kidney ballotab', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other abdominal masses', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other abdominal palpation abnormality field ', 'displayNone', true);
        }

        // Handle Genital Examination Normal section
        modifyRadioValue(this.physicalExam, 'Genital examination normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Genital examination normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Warts', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Warts', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Vesicles', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Vesicles', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Growths', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Growths', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Genital sores', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Genital sores', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Urethral meatus abnormal', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Urethral meatus abnormal')?.value=='Urethral meatus abnormal'){
            modifyCheckboxValue(this.physicalExam, 'Urethral meatus abnormalities', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Urethral meatus abnormalities', 'displayNone', false);
          }
          else {
            modifyCheckboxHeader(this.physicalExam, 'Urethral meatus abnormalities', 'displayNone', true);

          }
          modifyCheckboxHeader(this.physicalExam, 'Vulva examination', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Vulva examination')?.value=='Vulva examination'){
            modifyCheckboxValue(this.physicalExam, 'Vulva inspection abnormalities', 'checked', false);
            modifyCheckboxHeader(this.physicalExam, 'Vulva inspection abnormalities', 'displayNone', false);
          }
          else {
            modifyCheckboxHeader(this.physicalExam, 'Vulva inspection abnormalities', 'displayNone', true);

          }
          modifyCheckboxHeader(this.physicalExam, 'Other genital abnormalities', 'displayNone', false);
          if(getCheckboxSelectedValue(this.physicalExam,'Other genital abnormalities')?.value=='Other genital abnormalities'){
            modifyFieldValue(this.physicalExam,"Other genital abnormality notes", 'displayNone',false)
          }
          else
          {
            modifyFieldValue(this.physicalExam,"Other genital abnormality notes", 'displayNone',true)

          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Warts', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Vesicles', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Growths', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Genital sores', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Urethral meatus abnormal', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Vulva examination', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other genital abnormalities', 'displayNone', true);

        }

        // Handle Extremities Normal section
        modifyRadioValue(this.physicalExam, 'Extremities normal', 'displayNone', false);
        if (getRadioSelectedValue(this.physicalExam, 'Extremities normal') == 'No') {
          modifyCheckboxValue(this.physicalExam, 'Cold and clammy', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Cold and clammy', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Oedema present', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Oedema present', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Fracture', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Fracture', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Extremity burns', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Extremity burns', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Extremity rash', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Extremity rash', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Deformity', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Deformity', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Finger clubbing', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Finger clubbing', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Decreased Power', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Decreased Power', 'displayNone', false);
          modifyCheckboxValue(this.physicalExam, 'Decreased Sensation', 'checked', false);
          modifyCheckboxHeader(this.physicalExam, 'Decreased Sensation', 'displayNone', false);
          modifyCheckboxHeader(this.physicalExam, 'Other extremities abnormalities', 'displayNone', false);
          if (getCheckboxSelectedValue(this.physicalExam, 'Other extremities abnormalities')?.value == 'Other extremities abnormalities') {
            modifyFieldValue(this.physicalExam, 'Other extremities abnormalities notes', 'displayNone', false);
          } else {
            modifyFieldValue(this.physicalExam, 'Other extremities abnormalities notes', 'displayNone', true);
          }
        } else {
          modifyCheckboxHeader(this.physicalExam, 'Cold and clammy', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Oedema present', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Fracture', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Extremity burns', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Extremity rash', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Deformity', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Finger clubbing', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Decreased Power', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Decreased Sensation', 'displayNone', true);
          modifyCheckboxHeader(this.physicalExam, 'Other extremities abnormalities', 'displayNone', true);
          modifyFieldValue(this.physicalExam, 'Other extremities abnormalities', 'displayNone', true);
        }

        // Handle Chest Movement section
        modifyRadioValue(this.physicalExam, 'Chest movement', 'displayNone', false);

      } else {
        // Reset and hide all subsequent sections when "Physical examination done" is changed to "no"
        modifyRadioValue(this.physicalExam, 'Eyes normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Eyes normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Pallor', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Pallor', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Jaundice', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Jaundice', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Ulcerations', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Ulcerations', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Other eye abnormality', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other eye abnormality', 'checked', false);
        modifyFieldValue(this.physicalExam, 'Other eye abnormality notes', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other eye abnormality notes', 'selectedValue', '');

        modifyRadioValue(this.physicalExam, 'Mouth normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Mouth normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Oral thrush', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Oral thrush', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Kaposi’s Sarcoma lesions', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Kaposi’s Sarcoma lesions', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Sores', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Sores', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Other mouth abnormality', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other mouth abnormality', 'checked', false);
        modifyFieldValue(this.physicalExam, 'Other mouth abnormality notes', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other mouth abnormality notes', 'selectedValue', '');

        modifyRadioValue(this.physicalExam, 'Ears normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Ears normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Discharge', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Discharge', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Bleeding', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Bleeding', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Other ears abnormality', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other ears abnormality', 'checked', false);
        modifyFieldValue(this.physicalExam, 'Other ears abnormality notes', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other ears abnormality notes', 'selectedValue', '');

        modifyRadioValue(this.physicalExam, 'Face normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Face normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Rash', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Rash', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Swelling', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Swelling', 'checked', false);
        modifyCheckboxHeader(this.physicalExam, 'Other face abnormality', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other face abnormality', 'checked', false);
        modifyFieldValue(this.physicalExam, 'Other face abnormality notes', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other face abnormality notes', 'selectedValue', '');

        modifyRadioValue(this.physicalExam, 'Neck normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Neck normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Neck rash', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Neck swelling', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Neck mass', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other neck abnormality', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other neck abnormality notes', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other neck abnormality notes', 'selectedValue', '');

        modifyRadioValue(this.physicalExam, 'Chest inspection normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Chest inspection normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Chest rash', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Chest burns', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Chest bruises', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Chest wounds', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other chest abnormality', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other chest abnormality notes', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other chest abnormality notes', 'selectedValue', '');

        modifyRadioValue(this.physicalExam, 'Heart sounds normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Heart sounds normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Loud P2', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Splitting P2', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Gallop rhythm', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Murmur', 'displayNone', true);

        modifyRadioValue(this.physicalExam, 'Breath sounds normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Breath sounds normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Absent', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Reduced', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Added', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Clackles', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Wheezes', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Bronchial', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Crepitations', 'displayNone', true);

        modifyRadioValue(this.physicalExam, 'Abdominal inspection normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Abdominal inspection normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Abdominal distension', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Abdominal rash', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Laceration', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Abdominal burns', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Abdominal bruises', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Abdominal wounds', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other abdominal abnormality', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other abdominal abnormality notes', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other abdominal abnormality notes', 'selectedValue', '');
// reset state for abdominal ausaltation
        modifyRadioValue(this.physicalExam,'Abdominal auscultation normal','displayNone', true);
        modifyRadioValue(this.physicalExam,'Abdominal auscultation normal','selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Bruit', 'displayNone', true);

        modifyCheckboxHeader(this.physicalExam, 'Bowel sounds', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Hyperactive', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Reduced bowel sounds', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other abdominal auscultation abnormality', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other abdominal auscultation abnormality notes', 'displayNone', true);

        // Reset state for Abdominal Palpation Normal section
        modifyRadioValue(this.physicalExam, 'Abdominal palpation normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Abdominal palpation normal', 'selectedValue', '');
        modifyCheckboxHeader(this.physicalExam, 'Tenderness', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Hepatomegaly', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Splenomegaly', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Kidney ballotab', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other abdominal masses', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other abdominal palpation abnormality notes', 'displayNone', true);

        // Reset state for Genital Examination Normal section
        modifyRadioValue(this.physicalExam, 'Genital examination normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Genital examination normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Warts', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Vesicles', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Growths', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Genital sores', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Urethral meatus abnormal', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Urethral meatus abnormalities', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Vulva examination', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Vulva inspection abnormalities', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other genital abnormalities', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other genital abnormality notes', 'displayNone', true);

        // Reset state for Extremities Normal section
        modifyRadioValue(this.physicalExam, 'Extremities normal', 'displayNone', true);
        modifyRadioValue(this.physicalExam, 'Extremities normal', 'selectedValue', "");
        modifyCheckboxHeader(this.physicalExam, 'Cold and clammy', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Oedema present', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Fracture', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Extremity burns', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Extremity rash', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Deformity', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Finger clubbing', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Decreased Power', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Decreased Sensation', 'displayNone', true);
        modifyCheckboxHeader(this.physicalExam, 'Other extremities abnormalities', 'displayNone', true);
        modifyFieldValue(this.physicalExam, 'Other extremities abnormalities notes', 'displayNone', true);

        // Reset state for Chest Movement section
        modifyRadioValue(this.physicalExam, 'Chest movement', 'displayNone', true);
      }

      // Show/hide the reason for not performing physical examination based on selection
      if (getRadioSelectedValue(this.physicalExam, 'Physical examination done') == 'no') {
        modifyRadioValue(this.physicalExam, 'Reason why physical examination not done', 'displayNone', false);
      } else {
        modifyRadioValue(this.physicalExam, 'Reason why physical examination not done', 'displayNone', true);
      }
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