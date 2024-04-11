<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Quick check" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonModal,
  modalController,
  AccordionGroupCustomEvent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import ToolbarSearch from '@/components/ToolbarSearch.vue'
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import { useVitalsStore } from '@/stores/VitalsStore'
import { useDemographicsStore } from '@/stores/DemographicStore'
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { useDiagnosisStore } from '@/stores/DiagnosisStore'
import { mapState } from 'pinia';
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { Service } from "@/services/service";
import { toastWarning,popoverConfirmation, toastSuccess } from '@/utils/Alerts';
import { Diagnosis } from '@/apps/NCD/services/diagnosis'
import {useDangerSignsStore} from "@/apps/ANC/store/quickCheck/dangerSigns";
import {PastMedicalHistory} from "@/apps/OPD/services/past_medical_history_service";
import {PatientComplaintsService} from "@/apps/OPD/services/patient_complaints_service";
import {formatCheckBoxData, formatInputFiledData, formatRadioButtonData} from "@/services/formatServerData";
import {PatientGeneralConsultationService} from "@/services/patient_general_consultation";
import {Treatment} from "@/apps/NCD/services/treatment";
import {isEmpty} from "lodash";
import {DRUG_FREQUENCIES, DrugPrescriptionService} from "@/services/drug_prescription_service";
import HisDate from "@/utils/Date";
export default defineComponent({
  name: "Home",
  components:{
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    Toolbar,
    ToolbarSearch,
    DemographicBar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    Stepper,
  },
  data(){
    return {
      wizardData: [
        {
          'title': 'Danger signs',
          'class': 'common_step',
          'checked':false,
          'disabled':false,
          'number': 1,
          'last_step': ''
        },
        {
          'title': 'Reason for visit',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 2,
          'last_step': ''
        },
        {
          'title': 'Confirm pregnancy',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 3,
          'last_step': ''
        },
        {
          'title': 'Specific health concerns',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 4,
          'last_step': 'last_step'
        },
      ],
      StepperData:[
        {
          title: 'Danger signs',
          component: 'DangerSigns',
          value: '1'
        },
        {
          title: 'Reason for visit',
          component: 'ReasonForVisit',
          value: '2',
        },
        {
          title: 'Confirm pregnancy',
          component: 'ConfirmPregnancy',
          value: '3',
        },
        {
          title: 'Specific health concerns',
          component: 'SpecificHealthConcerns',
          value: '4',
        },
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },

  async mounted() {
    this.markWizard();
  },
  watch: {
    vitals: {
      handler() {
        this.markWizard();
      },
      deep: true,
    },
    investigations: {
      handler() {
        this.markWizard();
      },
      deep: true,
    },
    OPDdiagnosis: {
      handler() {
        this.markWizard();
      },
      deep: true,
    },
    selectedMedicalDrugsList: {
      handler() {
        this.markWizard();
      },
    },
  },
  setup() {
    return { chevronBackOutline, checkmark };
  },

  methods: {
    markWizard() {
      if (this.vitals.validationStatus) {
        this.wizardData[0].checked = true;
        this.wizardData[0].class = "open_step common_step";
      } else {
        this.wizardData[0].checked = false;
      }

      if (this.investigations[0].selectedData.length > 0) {
        this.wizardData[1].checked = true;
        this.wizardData[1].class = "open_step common_step";
      } else {
        this.wizardData[1].checked = false;
      }

      if (this.OPDdiagnosis[0].selectedData.length > 0) {
        this.wizardData[2].checked = true;
        this.wizardData[2].class = "open_step common_step";
      } else {
        this.wizardData[2].checked = false;
      }

      if (this.selectedMedicalDrugsList.length > 0) {
        this.wizardData[4].checked = true;
        this.wizardData[4].class = "open_step common_step";
      } else {
        this.wizardData[4].checked = false;
      }
    },
    getFormatedData(data: any) {
      return data.map((item: any) => {
        return item?.data[0] || item?.data;
      });
    },
    async saveData() {
      await this.saveDangerSigns();
      this.$router.push("patientProfile");
    },

    async saveDangerSigns() {
      if (this.DangerSigns.length > 0) {
        const userID: any = Service.getUserID();
        const PhysicalExam = new PhysicalExamService(this.demographics.patient_id, userID);
        const encounter = await PhysicalExam.createEncounter();
        if (!encounter) return toastWarning("Unable to create patient physical examination encounter");
        const patientStatus = await PhysicalExam.saveObservationList(await this.buildPhysicalExamination());
        if (!patientStatus) return toastWarning("Unable to create patient physical examination  !");
        toastSuccess("Physical examination has been created");
      }
      console.log(await this.buildPhysicalExamination())
    },

    openModal() {
      createModal(SaveProgressModal);
    },

    async buildPhysicalExamination() {
      return [
        ...(await formatCheckBoxData(this.DangerSigns)),
        ...(await formatRadioButtonData(this.DangerSigns)),
        // ...(await formatInputFiledData(this.physicalExam)),
      ];
    },
  },
})
</script>

<style scoped>

</style>
