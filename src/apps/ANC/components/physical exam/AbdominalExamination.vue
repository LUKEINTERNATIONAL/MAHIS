<template>
  <div class="container">
    <!--  Fetal assessment-->
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Fetal assessment results</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="fetalAssessment"
                    :initialData="initialData"
                    @update:selected="handleInputData"
                    @update:inputValue="handleInputData"
        ></basic-form>
        <FeatusModal
            :closeModalFunc="closeFetalModal"
            :onYes="handleFeatusYes"
            :onNo="handleFeatusNo"
            :isOpen="FeatusModalOpen"
            :title="``"
        />
        <div v-if="arrayOfFeatus.length>0">
          <div v-for="n in  arrayOfFeatus" :key="n">
            <ion-button v-if="!checkIfSubmitted(n)" @click="handleAddFeatusDetails(n)">Add Featus {{ n + 1 }}</ion-button>
            <ion-button v-if="checkIfSubmitted(n)" @click="selectFeatus(n)">View Featus {{ n + 1 }}</ion-button>
          </div>
        </div>
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
  IonInput,
  IonToggle,
  IonButton
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import {FetalAssessmentValidation, useFetalAssessment} from "@/apps/ANC/store/physical exam/FetalAssessmentStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import FeatusModal from "@/apps/ANC/components/physical exam/FeatusModal.vue";
import {getFieldValue, getRadioSelectedValue, modifyFieldValue} from "@/services/data_helpers";
import BabyDetailsModal from "@/apps/LABOUR/components/delivery details/BabyDetailsModal.vue";
import {useSecondStageOfLabourStore} from "@/apps/LABOUR/stores/delivery details/secondStageDelivery";
import _ from "lodash";
import {useFetalPresentationStore} from "@/apps/ANC/store/physical exam/FetalPresantationStore";
import {YupValidateField} from "@/services/validation_service";
import fetalPresentation from "@/apps/ANC/components/physical exam/FetalPresentation.vue";

export default defineComponent({
  components: {
    IonButton,
    BabyDetailsModal,
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
    BasicForm,
    FeatusModal
  },
  data() {
    return {
      iconsContent: icons,
      vValidations: "" as any,
      hasValidationErrors: [] as any,
      FeatusModalOpen: false,
      arrayOfFeatus: [] as any,
      selectedFeatus: 0,
      fetalsDetails: [] as any,
      initialData:[] as any



    };
  },
  computed: {
    ...mapState(useFetalAssessment, ["fetalAssessment","fetalDetails"]),
    ...mapState(useFetalPresentationStore,["fetalPresentation"])
  },
  mounted() {
    const fetalAssessment=useFetalAssessment();
    this.initialData=fetalAssessment.getInitialFetalAssesment();

  },
  watch: {
    fetalAssessment: {
      handler() {
        this.handleNumberOfFetuses()
      },
      deep: true,
    },
  },
  setup() {
    return { checkmark, pulseOutline };
  },
  methods: {
    handleInputData(event:any){
      YupValidateField(
          this.fetalAssessment,
          FetalAssessmentValidation,
          event.name,
          event.value
      )
    },
    selectFeatus(n: any) {
      this.selectedFeatus = n;
      const featus = this.fetalsDetails.find((b: any) => b.featus == n);
      const fetalAssessment = useFetalAssessment();
      fetalAssessment.setFetalDetails(featus.details);
      this.toggleFetalModal();

    },
    handleNumberOfFetuses() {
      const numberOfFeatus = getFieldValue(this.fetalAssessment, 'Number of fetuses', 'value');
      this.arrayOfFeatus = [...Array(Number(numberOfFeatus)).keys()]
    },
    handleAddFeatusDetails(featusNumber: number) {
      const fetalAssement = useFetalAssessment();
      fetalAssement.setFetalDetails()

      this.selectedFeatus = featusNumber;
      this.toggleFetalModal()
    },
    closeFetalModal() {
    },
    handleFeatusYes() {
      this.toggleFetalModal()
      const fetalAssessment = useFetalAssessment()
      const index =this.fetalsDetails.findIndex((b: any) => b.featus == this.selectedFeatus);
      if (index < 0) {
        this.fetalsDetails.push({featus: this.selectedFeatus, details: [..._.cloneDeep(fetalAssessment.fetalDetails)]})
      } else {
        this.fetalsDetails[index].details = [..._.cloneDeep(fetalAssessment.fetalDetails)];
      }
      fetalAssessment.setFetalDetails()
    },
    handleFeatusNo() {
      this.toggleFetalModal();
      useFetalAssessment().fetalAssessment.setFetalDetals()
    },
    toggleFetalModal() {
      this.FeatusModalOpen=!this.FeatusModalOpen
    },
    navigationMenu(url: any) {
      menuController.close();
      this.$router.push(url);
    },
    checkIfSubmitted(n: any) {
      return this.fetalsDetails.find((b: any) => b.featus == n);
    },
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
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; /* Adjust max-width as needed */
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header {
  font-weight: bold;
  font-size: medium;
}
ion-card {

  width: 100%;
  color: black;
}
</style>
