<template>
  <ion-row>
    <ion-col size-md="4" size-xl="2.5" size-sm="0" size-lg="4" offset-sm="0" offset-md="0.4" offset-xl="0.8" class="displayNoneMobile">
      <ion-card class="wizard_card">
        <div class="wizard_title">
          <strong>{{ stepperTitle }}</strong>
        </div>
        <ion-card-content>
          <div id="wizard_verticle" class="form_wizard wizard_verticle">
            <ul class="list-unstyled wizard_steps anchor">
              <li v-for="(item, index) in wizardData" :key="index" :class="item.last_step">
                <a class="done" isdone="1" rel="1">
                   <span :class="item.class">
                     <ion-icon v-if="item.checked" :icon="checkmark" class="checked_step"></ion-icon>
                        <span v-if="!item.checked">{{ item.number }}</span>
                        <span class="wizard_text">{{ item.title }}</span>
                   </span>
                </a>
              </li>
            </ul>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size-sm="12" size-xl="7" size-md="7.2" size-lg="7" offset-sm="0" offset-md="0.4" offset-xl="0.8">
      <div class="back_profile">
        <DynamicButton :name="backBtn" iconSlot="start" fill="clear" :icon="chevronBackOutline" @click="openBackController()" />
      </div>

      <div class="accordion_group">
        <ion-accordion-group @ionChange="accordionGroupChange($event)" :value="currentOpenStepper">
          <ion-accordion v-for="(item, index) in StepperData" :key="index" :value="item.value">
            <ion-item slot="header">
              <ion-label>{{ item.title }}</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
              <component :is="item.component" ></component>
              <div class="button-row">
                <!-- Previous Button -->
                <div v-if="index > 0">
                  <ion-button class="previous-button" @click="previousAccordion(index)">
                    <ion-icon :icon="chevronBack()" slot="start"></ion-icon> <!-- Icon for Previous -->
                    Previous
                  </ion-button>
                </div>

                <!-- Next Button -->
                <div v-if="index < StepperData.length - 1">
                  <ion-button class="next-button" @click="nextAccordion(index)">
                    <ion-icon :icon="chevronForward()" slot="start"></ion-icon> <!-- Icon for Next -->
                    Next
                  </ion-button>
                </div>
              </div>
            </div>
          </ion-accordion>
        </ion-accordion-group>
        <hr style="background: rgba(0, 0, 0, 0.13)" />
      </div>
    </ion-col>
  </ion-row>
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
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import dispensation from "@/apps/OPD/views/dispensation.vue";
import dispensedMedication from "@/apps/OPD/components/dispensedMedication.vue";
import dispensationSummary from "@/apps/OPD/components/dispensationSummary.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";

import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import PresentingComplaints from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PresentingComplaints.vue";
import ClinicalAssessment from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import {chevronBackOutline, checkmark, chevronForward, chevronBack} from "ionicons/icons";
import VitalSigns from "@/components/VitalSigns.vue";
import Diagnosis from "@/apps/NCD/components/ConsultationPlan/Diagnosis.vue";
import OPDDiagnosis from "@/apps/OPD/components/ConsultationPlan/OPDDiagnosis.vue";
import ComplicationsScreening from "@/apps/NCD/components/ConsultationPlan/ComplicationsScreening.vue";
import ConfirmDiagnosis from "@/apps/NCD/components/ConsultationPlan/ConfirmDiagnosis.vue";
import Outcome from "@/apps/NCD/components/ConsultationPlan/Outcome.vue";
import ChangeStatus from "@/apps/Immunization/components/ConsultationPlan/ChangeStatus.vue";
import Investigations from "@/components/Investigations.vue";
import TreatmentPlan from "@/apps/NCD/components/ConsultationPlan/TreatmentPlan.vue";
import OPDTreatmentPlan from "@/apps/OPD/components/ConsultationPlan/OPDTreatmentPlan.vue";
import NextAppointment from "@/apps/NCD/components/ConsultationPlan/NextAppointment.vue";
import ImmunizationNextAppointment from "@/apps/Immunization/components/ImmunizationNextAppointment.vue";

import Medications from "@/apps/ANC/components/profile/Medications.vue";
import WomanBehaviour from "@/apps/ANC/components/profile/WomanBehaviour.vue";
import DangerSigns from "@/apps/ANC/components/quick check/DangerSigns.vue";
import ConfirmPregnancy from "@/apps/ANC/components/quick check/ConfirmPregnancy.vue";
import ReasonForVisit from "@/apps/ANC/components/quick check/ReasonForVisit.vue";
import SpecificHealthConcerns from "@/apps/ANC/components/quick check/SpecificHealthConcerns.vue";
import FetalAssessment from "@/apps/ANC/components/physical exam/FetalAssessment.vue";
import FetalPresentation from "@/apps/ANC/components/physical exam/FetalPresentation.vue";
import MaternalExam from "@/apps/ANC/components/physical exam/MaternalExam.vue";
// import Vitals from "@/apps/ANC/components/physical exam/Vitals.vue";
import PresentingSigns from "@/apps/ANC/components/physical exam/PresentingSigns.vue";
import CurrentPregnancies from "@/apps/ANC/components/profile/CurrentPregnancies.vue";
import PastObstreticHistory from "@/apps/ANC/components/profile/PastObstreticHistory.vue";
import UltrasoundScan from "@/apps/ANC/components/lab_tests/UltrasoundScan.vue";
import UrineTest from "@/apps/ANC/components/lab_tests/UrineTest.vue";
import TB from "@/apps/ANC/components/lab_tests/TB.vue";
import DiagnosisTreatment from "@/apps/ANC/components/Treatment/DiagnosisTreatment.vue";
import MedicationDispensed from "@/apps/ANC/components/Treatment/MedicationDispensed.vue";
import DiagnosisCounselling from "@/apps/ANC/components/counselling/PreventativeCounselling.vue";
import Immunization from "@/apps/ANC/components/Treatment/Immunization.vue";
import IntimatePartner from "@/apps/ANC/components/Treatment/IntimatePartner.vue";
import Deworming from "@/apps/ANC/components/Treatment/Deworming.vue";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import MedicalHistory from "@/apps/ANC/components/profile/MedicalHistory.vue";
import MedicalFollowUp from "@/apps/ANC/components/symptomsFollowUp/MedicalFollowUp.vue";
import PersistentBehaviour from "@/apps/ANC/components/symptomsFollowUp/PersistentBehaviour.vue";
import CurrentPhysiologicalSymptoms from "@/apps/ANC/components/symptomsFollowUp/CurrentPhysiologicalSymptoms.vue";
import Ipv from "@/apps/ANC/components/symptomsFollowUp/Ipv.vue";
import FatalMovement from "@/apps/ANC/components/symptomsFollowUp/FatalMovement.vue";
import BehaviourCounselling from "@/apps/ANC/components/counselling/BehaviourCounselling.vue";
import PhysiologicalCounseling from "@/apps/ANC/components/counselling/PhysiologicalCounseling.vue";
import DietCounselling from "@/apps/ANC/components/counselling/DietCounselling.vue";
import Referral from "@/apps/ANC/components/referral/Referral.vue";
import ANCVitals from "../apps/ANC/components/physical exam/ANCVitals.vue"
import AncEnd from "@/apps/ANC/components/ancEnd/AncEnd.vue";
import ImmunizationServices from "@/apps/Immunization/components/ConsultationPlan/ImmunizationServices.vue";
import OPDOutcome from "@/apps/OPD/components/ConsultationPlan/OPDOutcome.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import DynamicButton from "@/components/DynamicButton.vue";
import HeadAssessment from "@/apps/ANC/components/others/headAssessment.vue";
import ANCTreatment from "@/apps/ANC/components/ANCtreatment/ANCTreatment.vue";
import ANCDiagnosis from "@/apps/ANC/components/ANCtreatment/ANCDiagnosis.vue";
import ANCDiagnosisCounselling from "@/apps/ANC/components/ANCtreatment/ANCDiagnosisCounselling.vue";
import ANCImmunization from "@/apps/ANC/components/ANCtreatment/ANCImmunization.vue";
import ANCIntimatePartner from "@/apps/ANC/components/ANCtreatment/ANCIntimatePartner.vue";
import ANCDeworming from "@/apps/ANC/components/ANCtreatment/ANCDeworming.vue";
import ANCMedicationDispensed from "@/apps/ANC/components/ANCtreatment/ANCMedicationDispensed.vue";
import DischargeWoman from "@/apps/PNC/components/others/DischargeWoman.vue";
import PNCEnd from "@/apps/PNC/components/others/PNCEnd.vue";
import BabyStatus from "@/apps/PNC/components/postanatal ward stay/BabyStatus.vue";
import PostnatalWardMonitoring from "@/apps/PNC/components/postanatal ward stay/PostnatalWardMonitoring.vue";
import DeliveryDetails from "@/apps/PNC/components/postnatal details/DeliveryDetails.vue";
import HIVStatusAndTreatment from "@/apps/PNC/components/postnatal details/HIVStatusAndTreatment.vue";
import ObstetricDetails from "@/apps/PNC/components/postnatal details/ObstetricDetails.vue";
import VisitForMother from "@/apps/PNC/components/postnatal visits/VisitForMother.vue";
import VisitForBaby from "@/apps/PNC/components/postnatal visits/VisitForBaby.vue";
import Labour from "@/apps/LABOUR/components/obstetric details/Labour.vue";
import QuickCheck from "@/apps/LABOUR/components/physical exam/QuickCheck.vue";
import PhysicalExamination from "@/apps/LABOUR/components/physical exam/PhysicalExamination.vue";
import PelvicAssessment from "@/apps/LABOUR/components/physical exam/PelvicAssessment.vue";
import PatientReferral from "@/apps/LABOUR/components/repeatable things/PatientReferral.vue";
import FirstVaginalExamination from "@/apps/LABOUR/components/physical exam/FirstVaginalExamination.vue";
import SecondStageDelivery from "@/apps/LABOUR/components/delivery details/SecondStageDelivery.vue";
import ThirdStageDelivery from "@/apps/LABOUR/components/delivery details/ThirdStageDelivery.vue";
import end from "@/apps/LABOUR/components/repeatable things/end.vue";
import OtherExams from "@/apps/LABOUR/components/repeatable things/OtherExams.vue";
import LabourVitals from "@/apps/LABOUR/components/repeatable things/LabourVitals.vue";
import ImmidiatePostnatalChecksForChild from "@/apps/LABOUR/components/delivery details/ImmidiatePostnatalChecksForChild.vue";
import ImmidiatePostnatalChecksForMother from "@/apps/LABOUR/components/delivery details/ImmidiatePostnatalChecksForMother.vue";
import SubsequentVisits from "@/apps/ANC/components/quick check/SubsequentVisits.vue";
import AbdominalExamination from "@/apps/ANC/components/physical exam/AbdominalExamination.vue";
import ClinicalCounselling from "@/apps/ANC/components/counselling/ClinicalCounselling.vue";

export default defineComponent({
    mixins: [SetUserRole],
    name: "Home",
    components: {
        dispensationSummary,
        dispensedMedication,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
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
        VitalSigns,
        PresentingComplaints,
        ClinicalAssessment,
        Diagnosis,
        ComplicationsScreening,
        ConfirmDiagnosis,
        Outcome,
        Investigations,
        TreatmentPlan,
        NextAppointment,
        IonModal,
        Medications,
        WomanBehaviour,
        MedicalHistory,
        DangerSigns,
        ReasonForVisit,
        ConfirmPregnancy,
        SpecificHealthConcerns,
        FetalPresentation,
        FetalAssessment,
        ANCVitals,
        MaternalExam,
        PresentingSigns,
        CurrentPregnancies,
        PastObstreticHistory,
        UltrasoundScan,
        UrineTest,
        TB,
        MedicalFollowUp,
        PersistentBehaviour,
        CurrentPhysiologicalSymptoms,
        Ipv,
        FatalMovement,
        BehaviourCounselling,
        PhysiologicalCounseling,
        DietCounselling,
        Referral,
        AncEnd,
        DiagnosisTreatment,
        MedicationDispensed,
        DiagnosisCounselling,
        Immunization,
        IntimatePartner,
        Deworming,
        OPDDiagnosis,
        OPDTreatmentPlan,
        OPDOutcome,
        DynamicButton,
        ImmunizationServices,
        ChangeStatus,
        ImmunizationNextAppointment,
        HeadAssessment,
        ANCTreatment,
        ANCDiagnosis,
        ANCDiagnosisCounselling,
        ANCImmunization,
        ANCIntimatePartner,
        ANCDeworming,
        ANCMedicationDispensed,
        DischargeWoman,
        PNCEnd,
        BabyStatus,
        PostnatalWardMonitoring,
        DeliveryDetails,
        HIVStatusAndTreatment,
        ObstetricDetails,
        VisitForMother,
        VisitForBaby,
        Labour,
        QuickCheck,
        PhysicalExamination,
        PelvicAssessment,
        PatientReferral,
        FirstVaginalExamination,
        SecondStageDelivery,
        ThirdStageDelivery,
        end,
        OtherExams,
        LabourVitals,
        ImmidiatePostnatalChecksForChild,
        ImmidiatePostnatalChecksForMother,
        SubsequentVisits,
       AbdominalExamination,
      ClinicalCounselling
    },
    data() {
        return {
            isOpen: false,
            iconsContent: icons,
          currentOpenStepper: this.openStepper
        };
    },
    props: {
        wizardData: {
            default: [] as any,
        },
        StepperData: {
            default: [] as any,
        },
        stepperTitle: {
            type: String,
            default: "",
        },
        openStepper: {
            type: String,
            default: "1",
        },
        backBtn: {
            type: String,
            default: "Back to profile",
        },
        backUrl: {
            type: String,
            default: "",
        },
    },
    setup() {
        return { chevronBackOutline, checkmark,

        };
    },
    methods: {
      chevronBack() {
        return chevronBack
      },
      chevronForward() {
        return chevronForward
      },
      accordionGroupChange(ev: AccordionGroupCustomEvent) {
        const event:any = ev.detail;
        if (!event) {
          this.wizardData.forEach((item: any) => {
            if (event.value === item.number) {
              item.class = "open_step common_step";
              item.checked = true;
            } else {
              item.class = "common_step";
              item.checked = false;
            }
          });
          this.$emit("updateStatus", event);
          this.currentOpenStepper = event.value;
        }
      },


      openBackController() {
            if (this.backUrl) {
                this.$router.push(this.backUrl);
            } else {
                createModal(SaveProgressModal);
            }
        },
      nextAccordion(currentIndex:any) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < this.StepperData.length) {
          this.currentOpenStepper = this.StepperData[nextIndex].value;
        }
      },
      previousAccordion(currentIndex:any) {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          this.currentOpenStepper = this.StepperData[prevIndex].value;
        }
      }
    },
});
</script>

<style scoped>
.button-row {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 10px;
}

.previous-button {
  margin-left: 30px;
  --background: var(--ion-color-medium-shade);
  color:white;
  border-radius: 1px;
  width: 70%;
}

.next-button {
  background-color: var(--ion-color-primary);
  color: white;
  border-radius: 1px;
  width: 100%;
}

#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
}
ion-item[slot="header"] {
    font-size: 20px;
    padding-top: 25px;
    font-weight: 600;
}

ion-accordion {
    margin: 0 auto;
}

ion-accordion.accordion-expanding,
ion-accordion.accordion-expanded {
    width: calc(100% - 32px);

    margin: 16px auto;
}

ion-accordion.accordion-collapsing ion-item[slot="header"],
ion-accordion.accordion-collapsed ion-item[slot="header"] {
    --color: var(--ion-color-light-contrast);
}

ion-accordion.accordion-expanding ion-item[slot="header"],
ion-accordion.accordion-expanded ion-item[slot="header"] {
    --background: #8a8a8a;
    --color: var(--ion-color-primary-contrast);
}
.back_profile {
    display: flex;
    justify-content: space-between;
    width: 140px;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    /* position: fixed; */
    z-index: 1000;
}
.wizard_card {
    /* position: fixed; */
    width: 100%;
    /* max-width: 300px; */
    background-color: #fff;
    /* top: 150px; */
}
.rightCol {
    top: 100px;
    width: 90%;
}
.accordion_group {
    /* position: fixed; */
    height: 78vh;
    /* width: 58%; */
    overflow-y: auto;
    top: 200px;
}
.accordion_group::-webkit-scrollbar {
    display: none;
}

.accordion_group {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
