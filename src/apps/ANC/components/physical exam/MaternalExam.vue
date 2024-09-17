<template>
  <div class="container">
      <!-- Pallor -->
      <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="respiratory"></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Pallor -->
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="pallor"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- Breast exam Section -->
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="breastExam"></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- vaginal inspection Section -->
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="vaginalInspection"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- Cervical exam -->
    <ion-card  class="section">
      <ion-card-content>
        <basic-form :contentData="cervicalExam"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- oedema exam Section -->
    <ion-card  class="section">
      <ion-card-content>
        <basic-form :contentData="oedemaPresence"></basic-form>
      </ion-card-content>
    </ion-card>

  </div>
</template>


<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
  menuController,
  IonInput, IonToggle
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { icons } from '@/utils/svg';
import { useMaternalExamStore} from "@/apps/ANC/store/physical exam/MaternalExamStore";
import { mapState } from 'pinia';
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue"
import { VitalsService } from "@/services/vitals_service";
import BasicForm from '@/components/BasicForm.vue';
import { Service } from "@/services/service";
import {
  getCheckboxSelectedValue,
  getRadioSelectedValue, modifyCheckboxValue,
  modifyFieldValue,
  modifyRadioValue
} from "@/services/data_helpers";

export default defineComponent({
  components:{
    IonToggle,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    BasicInputField,
    BasicForm
  },
  data() {
    return {
      iconsContent: icons,
      currentSection: 0, // Initialize currentSection to 0
      vValidations: '' as any,
      hasValidationErrors: [] as any,
    };
  },
  computed:{
    ...mapState(useMaternalExamStore,["respiratory"]),
    ...mapState(useMaternalExamStore,["pallor"]),
    ...mapState(useMaternalExamStore,["breastExam"]),
    ...mapState(useMaternalExamStore,["vaginalInspection"]),
    ...mapState(useMaternalExamStore,["cervicalExam"]),
    ...mapState(useMaternalExamStore,["oedemaPresence"]),
  },
  mounted(){
    const userID: any  = Service.getUserID()
    // const breastExam=useMaternalExamStore()
    // const oedemaPresence=useMaternalExamStore()
    // const vaginalInspection=useMaternalExamStore()
    // const cervicalExam=useMaternalExamStore()
    this.handleBreastExams()
    this.handleVaginalInspection()
    this.handleCervicalExam()
    this.handleOedema()

  },
  watch: {
     breastExam:{
       handler (){
         this.handleBreastExams();
       },
       deep:true
     },
    vaginalInspection:{
      handler (){
        this.handleVaginalInspection();
      },
      deep:true
    },

    cervicalExam:{
       handler(){
         this.handleCervicalExam();
       },
      deep:true
    },
    oedemaPresence:{
      handler(){
        this.handleOedema();
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    handleBreastExams(){
      if(getCheckboxSelectedValue(this.breastExam, 'Other breast exams')=='other breast exams'){
        modifyFieldValue(this.breastExam,'Other','displayNone', false)
      }   else {modifyFieldValue(this.breastExam,'Other','displayNone', true)}

      const checkBoxes=['Normal breast exam result', 'Bleeding', 'Nodule','Discharge', 'Flushing','Local pain','Increased temperature', 'Epigastric pain', 'Other breast exams']

      if (getCheckboxSelectedValue(this.breastExam, 'No breast exam conducted')?.checked) {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.breastExam, checkbox, 'checked', false);
          modifyCheckboxValue(this.breastExam, checkbox, 'disabled', true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.breastExam, checkbox, 'disabled', false);
        });
      }
    },
    handleVaginalInspection(){
      if(getCheckboxSelectedValue(this.vaginalInspection, 'Other')=='other'){
        modifyFieldValue(this.vaginalInspection,'Other','displayNone', false)
      }   else {modifyFieldValue(this.vaginalInspection,'Other','displayNone', true)}

      const checkBoxes=['Normal vaginal exam result', 'Evidence of amniotic fluid', 'Genital pain','Abnormal discharge', 'Papules','Ulcers','Ulcers','Warts','Vesicles','Bleeding','Other']

      if (getCheckboxSelectedValue(this.vaginalInspection, 'No vaginal exam done')?.checked) {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.vaginalInspection, checkbox, 'checked', false);
          modifyCheckboxValue(this.vaginalInspection, checkbox, 'disabled', true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.vaginalInspection, checkbox, 'disabled', false);
        });
      }
    },
    handleCervicalExam(){
      if(getRadioSelectedValue(this.cervicalExam, 'Cervical exam')=='yes'){
        modifyFieldValue(this.cervicalExam,'Cervical dilation','displayNone', false)
      } else {modifyFieldValue(this.cervicalExam,'Cervical dilation','displayNone', true)}
    },
    handleOedema(){
        if(getRadioSelectedValue(this.oedemaPresence, 'Oedema')=='yes'){
          modifyRadioValue(this.oedemaPresence, 'Oedema types', 'displayNone', false)
          modifyRadioValue(this.oedemaPresence, 'Oedema severity', 'displayNone', false)
        
        } else {
           modifyRadioValue(this.oedemaPresence, 'Oedema types', 'displayNone', true)
           modifyRadioValue(this.oedemaPresence, 'Oedema severity', 'displayNone', true)}
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
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
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
  font-size: medium;
}
ion-card {
  width: 100%;
  color: black;
}
</style>
