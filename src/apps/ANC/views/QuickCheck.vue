<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Quick check" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
      <ion-spinner v-if="isLoading" name="lines"></ion-spinner>
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
    IonSpinner,
  modalController,
  AccordionGroupCustomEvent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
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
import Stepper from "@/components/Stepper.vue";
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
import {usePregnancyStore} from "@/apps/OPD/stores/PregnancyStore";
import {usePresentingComplaintsStore} from "@/apps/OPD/stores/PresentingComplaintsStore";
import {usePastMedicalHistoryStore} from "@/apps/OPD/stores/PastMedicalHistoryStore";
import {useOPDDiagnosisStore} from "@/apps/OPD/stores/DiagnosisStore";
import {usePhysicalExaminationStore} from "@/apps/OPD/stores/PhysicalExamination";
import {useTreatmentPlanStore} from "@/stores/TreatmentPlanStore";
import {DangerSignsService} from "@/apps/ANC/service/danger_signs_service";
import {useConfirmPregnancyStore} from "@/apps/ANC/store/quickCheck/confirmPregnancy";
import {ConfirmPregnancyService} from "@/apps/ANC/service/confirm_pregnancy_service";
import {SpecificHealthConcernsService} from "@/apps/ANC/service/specific_health_concerns_service";
import {useSpecificHealthConcernsStore} from "@/apps/ANC/store/quickCheck/specificHealthConcerns";
import {useReasonForVisitStore} from "@/apps/ANC/store/quickCheck/reasonForVisit";
import {ReasonForVisitService} from "@/apps/ANC/service/reason_for_visit_service";
import { resetPatientData } from '@/services/reset_data';
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
    IonSpinner
  },
  data(){
    return {
      wizardData: [
        {
          'title': 'Confirm pregnancy',
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
          'last_step':'last_step'
        },
        // {
        //   'title': 'Confirm pregnancy',
        //   'class': 'common_step',
        //   'checked':'',
        //   'icon': false,
        //   'disabled':false,
        //   'number': 3,
        //   'last_step': ''
        // },
        // {
        //   'title': 'Specific health concerns',
        //   'class': 'common_step',
        //   'checked':'',
        //   'icon': false,
        //   'disabled':false,
        //   'number': 4,
        //   'last_step': 'last_step'
        // },
      ],
      StepperData:[
        {
          title: 'Confirm pregnancy',
          component: 'ConfirmPregnancy',
          value: '1'
        },
        {
          title: 'Reason for visit',
          component: 'ReasonForVisit',
          value: '2',
        },
        // {
        //   title: 'Confirm pregnancy',
        //   component: 'ConfirmPregnancy',
        //   value: '3',
        // },
        // {
        //   title: 'Specific health concerns',
        //   component: 'SpecificHealthConcerns',
        //   value: '4',
        // },
      ],
      isOpen: false,
      iconsContent: icons,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useDemographicsStore, ["demographics"]),
    ...mapState(usePregnancyStore, ["pregnancy"]),
    ...mapState(usePresentingComplaintsStore, ["presentingComplaints"]),
    ...mapState(usePastMedicalHistoryStore, ["pastMedicalHistory"]),
    ...mapState(useVitalsStore, ["vitals"]),
    ...mapState(useInvestigationStore, ["investigations"]),
    ...mapState(useOPDDiagnosisStore, ["OPDdiagnosis"]),
    ...mapState(usePhysicalExaminationStore, ["physicalExam"]),
    ...mapState(useDangerSignsStore,["DangerSigns"]),
    ...mapState(useReasonForVisitStore,["ReasonForVisit"]),
    ...mapState(useConfirmPregnancyStore,["ConfirmPregnancy"]),
    ...mapState(useSpecificHealthConcernsStore,["HealthConcerns"]),
    ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
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
      // if (this.vitals.validationStatus) {
      //   this.wizardData[0].checked = true;
      //   this.wizardData[0].class = "open_step common_step";
      // } else {
      //   this.wizardData[0].checked = false;
      // }
      //
      // if (this.investigations[0].selectedData.length > 0) {
      //   this.wizardData[1].checked = true;
      //   this.wizardData[1].class = "open_step common_step";
      // } else {
      //   this.wizardData[1].checked = false;
      // }
      //
      // if (this.OPDdiagnosis[0].selectedData.length > 0) {
      //   this.wizardData[2].checked = true;
      //   this.wizardData[2].class = "open_step common_step";
      // } else {
      //   this.wizardData[2].checked = false;
      // }
      //
      // if (this.selectedMedicalDrugsList.length > 0) {
      //   this.wizardData[4].checked = true;
      //   this.wizardData[4].class = "open_step common_step";
      // } else {
      //   this.wizardData[4].checked = false;
      // }
    },
    getFormatedData(data: any) {
      return data.map((item: any) => {
        return item?.data[0] || item?.data;
      });
    },
    async saveData() {
      this.isLoading = true;
      await this.saveDangerSigns();
      await this.saveReasonForVisit();
      await this.saveConfirmPregnancy();
      await this.saveHealthConcerns();
      resetPatientData();
      this.$router.push("ANCHome");
      //this.isLoading = false;
    },

    async saveDangerSigns() {
      if (this.DangerSigns.length > 0) {
        const userID: any = Service.getUserID();
        const DangerSigns = new DangerSignsService(this.demographics.patient_id, userID);
        const encounter = await DangerSigns.createEncounter();
        if (!encounter) return toastWarning("Unable to create patient danger signs encounter");
        const patientStatus = await DangerSigns.saveObservationList(await this.buildDangerSigns());
        if (!patientStatus) return toastWarning("Unable to create patient danger signs  !");
        toastSuccess("Danger signs have been created");
      }
      console.log(await this.buildDangerSigns())

    },
    async saveReasonForVisit() {
      if (this.ReasonForVisit.length > 0) {
        const userID: any = Service.getUserID();
        const ReasonForVisit = new ReasonForVisitService(this.demographics.patient_id, userID);
        const encounter = await ReasonForVisit.createEncounter();
        if (!encounter) return toastWarning("Unable to create patient reason for visit encounter");
        const patientStatus = await ReasonForVisit.saveObservationList(await this.buildReasonForVisit());
        if (!patientStatus) return toastWarning("Unable to create patient's reason for visit!");
        toastSuccess("Reason for visit details have been created");
      }
      console.log(await this.buildReasonForVisit())

    },

    async saveConfirmPregnancy() {
      if (this.ConfirmPregnancy.length > 0) {
        const userID: any = Service.getUserID();
        const ConfirmPregnancy = new ConfirmPregnancyService(this.demographics.patient_id, userID);
        const encounter = await ConfirmPregnancy.createEncounter();
        if (!encounter) return toastWarning("Unable to create patient pregnancy confirmation encounter");
        const patientStatus = await ConfirmPregnancy.saveObservationList(await this.buildConfirmPregnancy());
        if (!patientStatus) return toastWarning("Unable to create patient pregnancy confirmation details!");
        toastSuccess("Pregnancy confirmation details have been created");
      }
      console.log(await this.buildConfirmPregnancy())
    },
    async saveHealthConcerns() {
      if (this.HealthConcerns.length > 0) {
        const userID: any = Service.getUserID();
        const HealthConcerns = new SpecificHealthConcernsService(this.demographics.patient_id, userID);
        const encounter = await HealthConcerns.createEncounter();
        if (!encounter) return toastWarning("Unable to create patient health concerns encounter");
        const patientStatus = await HealthConcerns.saveObservationList(await this.buildHealthConcerns());
        if (!patientStatus) return toastWarning("Unable to create patient health concerns!");
        toastSuccess("Patient's specific health concerns have been created");
      }
      console.log(await this.buildHealthConcerns())
    },

    openModal() {
      createModal(SaveProgressModal);
    },

    async buildDangerSigns() {
      return [
        ...(await formatCheckBoxData(this.DangerSigns)),
        ...(await formatRadioButtonData(this.DangerSigns)),
        ...(await formatInputFiledData(this.DangerSigns)),
      ];
    },
    async buildConfirmPregnancy() {
      return [
        ...(await formatCheckBoxData(this.ConfirmPregnancy)),
        ...(await formatRadioButtonData(this.ConfirmPregnancy)),
        ...(await formatInputFiledData(this.ConfirmPregnancy)),
      ];
    },

    async buildHealthConcerns() {
      return [
        ...(await formatCheckBoxData(this.HealthConcerns)),
        ...(await formatRadioButtonData(this.HealthConcerns)),
        ...(await formatInputFiledData(this.HealthConcerns)),
      ];
    },
    async buildReasonForVisit() {
      return [
        ...(await formatCheckBoxData(this.HealthConcerns)),
        ...(await formatRadioButtonData(this.HealthConcerns)),
        ...(await formatInputFiledData(this.HealthConcerns)),
      ];
    },
  },
})
</script>

<style scoped>

</style>
