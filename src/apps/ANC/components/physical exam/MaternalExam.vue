<template>
  <div class="container">
      <!-- Pallor -->
      <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="respiratory"
                    :initialData="initialRespiratory"
        ></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Breast exam Section -->
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="breastExam"
                    :initialData="initialBreastExam"

        ></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- vaginal inspection Section -->
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="vaginalInspection"
                    :initialData="initialVaginalExam"

        ></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Pallor -->
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="pallor"
                    :initialData="initialPallor"

        ></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Cervical exam -->
    <ion-card  class="section">
      <ion-card-content>
        <basic-form :contentData="cervicalExam"
                    :initialData="initialCervicalExam"

        ></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- oedema exam Section -->
    <ion-card  class="section">
      <ion-card-content>
        <basic-form :contentData="oedemaPresence"
                    :initialData="initialOedema"
        ></basic-form>
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
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      initialRespiratory: [] as any,
      initialBreastExam:[] as any,
      initialPallor:[] as any,
      initialOedema:[] as any,
      initialCervicalExam:[] as any,
      initialVaginalExam:[] as any,
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
    const breastExam=useMaternalExamStore()
    this.initialBreastExam=breastExam.getInitialBreastExam()
    const oedemaPresence=useMaternalExamStore()
    this.initialOedema=oedemaPresence.getInitialOedema()
    const vaginalInspection=useMaternalExamStore()
    this.initialVaginalExam=vaginalInspection.getInitialVaginalInspection()
    const cervicalExam=useMaternalExamStore()
    this.initialCervicalExam=cervicalExam.getInitialCervicalExam()
    const pallor=useMaternalExamStore()
    this.initialPallor=pallor.getInitialPallor()
    const respiratory=useMaternalExamStore()
    this.initialRespiratory=respiratory.getInitialRespiratoryExam()
    this.handleBreastExams()
    this.handleVaginalInspection()


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
       },
      deep:true
    },
    oedemaPresence:{
      handler(){
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
      const checkBoxes=['Normal breast exam result', 'Bleeding',"Tenderness", "Other", "Breast",'Nodule','Discharge', 'Flushing','Local pain','Increased temperature', 'Epigastric pain', 'Other breast exams']

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
      const checkBoxes=['Normal vaginal exam result','Nothing abnormal observed', "Other",'Evidence of amniotic fluid', 'Genital pain','Abnormal discharge', 'Papules','Ulcers','Ulcers','Warts','Vesicles','Bleeding','Other']

      if (getCheckboxSelectedValue(this.vaginalInspection, 'No vaginal inspection done')?.checked) {
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
