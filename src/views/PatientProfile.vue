<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar
        class="displayNoneDesktop"
        v-if="activeProgramID !== 33 && activeProgramID != ''"
      />
      <AncEnrollmentModal
        :closeModalFunc="closeEnrollmentModal"
        :onYes="handleCheckInYes"
        :onNo="handleCheckInNo"
        :isOpen="isEnrollmentModalOpen"
        :title="`Are you sure you want to Enroll the patient in ANC Program?`"
      />
      <PatientProfile v-if="activeProgramID == 33" />
      <div
        class="content_manager"
        v-if="activeProgramID !== 33 && activeProgramID != ''"
      >
        <ion-row class="content_width">
          <ion-col
            size="2.5"
            size-lg="2.6"
            size-md="3"
            class="displayNoneMobile"
          >
            <ion-card style="margin-bottom: 20px; background-color: #fff">
              <ion-card-content>
                <div class="p_name_image">
                  <div
                    :class="
                      demographics.gender == 'M'
                        ? 'initialsBox maleColor'
                        : 'initialsBox femaleColor'
                    "
                    @click="openPIM()"
                  >
                    <ion-icon
                      style="color: #fff; font-size: 70px"
                      :icon="person"
                    ></ion-icon>
                  </div>
                  <div style="width: 100%">
                    <div
                      style="
                        display: flex;
                        justify-content: end;
                        height: 20px;
                        top: -10px;
                        position: relative;
                      "
                    >
                      <DynamicButton
                        name="Edit"
                        fill="clear"
                        iconSlot="start"
                        :icon="iconsContent.editFade"
                      />
                    </div>
                    <div class="p_name">{{ demographics?.name }}</div>
                  </div>
                </div>
                <ion-row>
                  <ion-col size="4">MRN:</ion-col>
                  <ion-col class="demoContent">{{ demographics?.mrn }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="4">Gender:</ion-col>
                  <ion-col class="demoContent">{{
                    covertGender(demographics?.gender)
                  }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="4">Age:</ion-col>
                  <ion-col class="demoContent">{{ formatBirthdate() }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="4">Address:</ion-col>
                  <ion-col class="demoContent">{{
                    covertGender(demographics?.address)
                  }}</ion-col>
                </ion-row>
              </ion-card-content>
            </ion-card>
            <div style="margin-left: 10px">
              <DynamicButton
                v-for="(btn, index) in filteredProgramBtn"
                :key="index"
                :name="checkProgram(btn)"
                style="margin-bottom: 5px; width: 96%; height: 45px"
                :fill="activeProgramID != btn.program_id ? 'outline' : 'solid'"
                :color="activeProgramID == btn.program_id ? 'success' : ''"
                @click="handleProgramClick(btn)"
              />
            </div>

            <ion-card style="margin-bottom: 20px; background-color: #fff">
              <ion-accordion-group :value="['first']">
                <ion-accordion
                  value="first"
                  style="background-color: #fff"
                  toggle-icon-slot="start"
                >
                  <ion-item slot="header" color="white">
                    <ion-label class="side_title"
                      >Alerts & Reminders
                    </ion-label>
                  </ion-item>
                  <ion-card-content slot="content">
                    <span v-for="(al, index3) in alerts" :key="index3">
                      <ion-row
                        v-if="al.value"
                        :style="
                          'border-radius: 5px;  margin-top:10px; margin-bottom:10px;background-color:' +
                          al.backgroundColor
                        "
                      >
                        <div style="display: flex">
                          <div
                            style="
                              align-items: center;
                              display: flex;
                              margin: 10px;
                            "
                          >
                            <ion-icon
                              slot="start"
                              :icon="al.icon"
                              aria-hidden="true"
                            ></ion-icon>
                          </div>
                          <div>
                            <div class="position_content alert_content">
                              <span
                                :style="
                                  'color:' +
                                  al.textColor +
                                  '; font-weight:600; margin: 0px 2px; width:100%'
                                "
                              >
                                {{ al.index }}</span
                              >
                            </div>
                            <div
                              class="position_content bottom_text"
                              :style="'color:' + al.textColor + ';'"
                            >
                              {{ al.value }}
                            </div>
                          </div>
                        </div>
                      </ion-row>
                    </span>
                  </ion-card-content>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card>
            <ion-card style="margin-bottom: 20px; background-color: #fff">
              <ion-accordion-group :value="['first']">
                <ion-accordion
                  value="first"
                  style="background-color: #fff"
                  toggle-icon-slot="start"
                >
                  <ion-item slot="header" color="white">
                    <ion-label class="side_title">Templates/Forms</ion-label>
                  </ion-item>
                  <ul style="list-style: none" slot="content">
                    <li class="form_list">
                      <ion-icon
                        slot="start"
                        aria-hidden="true"
                        :icon="iconsContent.form"
                      ></ion-icon>
                      <div class="form_list_content">AETC Form</div>
                    </li>
                    <li class="form_list">
                      <ion-icon
                        slot="start"
                        aria-hidden="true"
                        :icon="iconsContent.inpatient"
                      ></ion-icon>
                      <div class="form_list_content">Medical Inpatient</div>
                    </li>
                    <li class="form_list">
                      <ion-icon
                        slot="start"
                        aria-hidden="true"
                        :icon="iconsContent.notes"
                      ></ion-icon>
                      <div class="form_list_content">Surgucal Notes</div>
                    </li>
                    <li class="form_list">
                      <ion-icon
                        slot="start"
                        aria-hidden="true"
                        :icon="iconsContent.gynacological"
                      ></ion-icon>
                      <div class="form_list_content">Gynacological</div>
                    </li>
                    <li class="form_list">
                      <ion-icon
                        slot="start"
                        aria-hidden="true"
                        :icon="iconsContent.notes"
                      ></ion-icon>
                      <div class="form_list_content">SOAP</div>
                    </li>
                    <li class="form_list">
                      <ion-icon
                        slot="start"
                        aria-hidden="true"
                        :icon="iconsContent.monitoring"
                      ></ion-icon>
                      <div class="form_list_content">Monitoring Chart</div>
                    </li>
                    <li class="form_list">
                      <ion-icon
                        slot="start"
                        aria-hidden="true"
                        :icon="iconsContent.referal"
                      ></ion-icon>
                      <div class="form_list_content">Referral</div>
                    </li>
                  </ul>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card>
            <ion-card style="margin-bottom: 20px; background-color: #fff">
              <ion-accordion-group>
                <ion-accordion
                  value="first"
                  style="background-color: #fff"
                  toggle-icon-slot="start"
                >
                  <ion-item slot="header" color="white">
                    <ion-label class="side_title"
                      >AETC Clerking Sheet</ion-label
                    >
                  </ion-item>
                  <ion-card-content slot="content"> </ion-card-content>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card>
          </ion-col>
          <ion-col size-sm="12" size-md="12" size-lg="9.4">
            <ion-card style="background-color: #fff; margin-inline: 0px">
              <div style="display: flex; justify-content: space-between">
                <div class="vitalsTitle">Most recent Vitals & Biometrics</div>
                <div class="dateClass">Todays Date: {{ getSessionDate() }}</div>
              </div>
              <div style="padding-left: 10px; padding-right: 10px">
                <ion-row>
                  <ion-col class="vitalsHeading">Weight</ion-col>
                  <ion-col class="vitalsHeading">Height</ion-col>
                  <ion-col class="vitalsHeading">Temperature</ion-col>
                  <ion-col class="vitalsHeading">Blood glucose</ion-col>
                  <ion-col class="vitalsHeading">Pulse Rate</ion-col>
                  <ion-col class="vitalsHeading">Blood pressure</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col class="vitalsValue"
                    >{{ vitals["Weight"] }}
                    <span class="vitalsUnits">kg</span></ion-col
                  >
                  <ion-col class="vitalsValue"
                    >{{ vitals["Height"] }}
                    <span class="vitalsUnits">cm</span></ion-col
                  >
                  <ion-col class="vitalsValue"
                    >{{ vitals["Temp"] }}
                    <span class="vitalsUnits">C</span></ion-col
                  >
                  <ion-col class="vitalsValue"
                    >0 <span class="vitalsUnits">mg/dL</span></ion-col
                  >
                  <ion-col class="vitalsValue"
                    >{{ vitals["Pulse"] }}
                    <span class="vitalsUnits">bpm </span></ion-col
                  >
                  <ion-col class="vitalsValue"
                    >{{ vitals["Systolic"] }}/{{ vitals["Diastolic"]
                    }}<span class="vitalsUnits">mmhg</span></ion-col
                  >
                </ion-row>
              </div>
            </ion-card>
            <div>
              <ion-segment :value="segmentContent">
                <ion-segment-button
                  value="Patient Summary"
                  @click="setSegmentContent('Patient Summary')"
                >
                  <ion-label>Patient Summary</ion-label>
                </ion-segment-button>
                <ion-segment-button
                  value="Visits History"
                  @click="setSegmentContent('Visits History')"
                >
                  <ion-label>Visits History</ion-label>
                </ion-segment-button>
                <ion-segment-button
                  value="Vitals & Measurements Summary"
                  @click="setSegmentContent('Vitals & Measurements Summary')"
                >
                  <ion-label>Vitals & Measurements Summary</ion-label>
                </ion-segment-button>
                <ion-segment-button
                  value="Lab Tests History"
                  @click="setSegmentContent('Lab Tests History')"
                >
                  <ion-label>Lab Tests History</ion-label>
                </ion-segment-button>
                <ion-segment-button
                  value="Diagnoses History"
                  @click="setSegmentContent('Diagnoses History')"
                >
                  <ion-label>Diagnoses History</ion-label>
                </ion-segment-button>
                <ion-segment-button
                  value="Allergies & Contraindication"
                  @click="setSegmentContent('Allergies & Contraindication')"
                >
                  <ion-label>Allergies & Contraindication</ion-label>
                </ion-segment-button>
              </ion-segment>
            </div>
            <div v-if="segmentContent == 'Patient Summary'">
              <div style="display: flex; margin-top: 10px">
                <div
                  style="
                    width: 50vw;
                    background-color: #fff;
                    border-radius: 5px;
                    margin-right: 5px;
                  "
                  v-if="checkUnderFive"
                >
                  <WeightHeightChart />
                </div>
                <div
                  style="
                    width: 50vw;
                    background-color: #fff;
                    border-radius: 5px;
                    margin-right: 5px;
                  "
                >
                  <BloodPressure />
                </div>
                <div
                  style="
                    width: 50vw;
                    background-color: #fff;
                    border-radius: 5px;
                  "
                  v-if="!checkUnderFive"
                >
                  <PreviousVitals />
                </div>
              </div>
              <div class="bottomSummary">
                <ion-segment value="custom">
                  <ion-segment-button value="custom">
                    <ion-label>Medications</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="segment">
                    <ion-label>Investigations</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="Visits History">
                    <ion-label>Immunizations</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="Vitals & Measurements Summary">
                    <ion-label>Notes</ion-label>
                  </ion-segment-button>
                </ion-segment>
              </div>
              <div class="bottomSummaryContent">
                <MedicationsGrid />
              </div>
            </div>
            <div v-if="segmentContent == 'Visits History'">
              <VisitsHistory />
            </div>
            <div v-if="segmentContent == 'Vitals & Measurements Summary'">
              <VitalsMeasurementsSummary />
            </div>
            <div v-if="segmentContent == 'Lab Tests History'">
              <LabTestsHistory />
            </div>
            <div v-if="segmentContent == 'Diagnoses History'">
              <DiagnosesHistory />
            </div>
            <div v-if="segmentContent == 'Allergies & Contraindication'">
              <AllergiesContraindication />
            </div>
          </ion-col>
        </ion-row>
      </div>
      <Programs :programBtn="programBtn" @clicked="setProgram($event)" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonSegment,
  IonSegmentButton,
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
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  medkit,
  chevronBackOutline,
  checkmark,
  grid,
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
  add,
  person,
} from "ionicons/icons";

import { modalController } from "@ionic/vue";
import { icons } from "@/utils/svg";

import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";

import DispositionGrid from "@/components/PatientProfileGrid/OutcomeGrid.vue";
import InvestigationsGrid from "@/components/PatientProfileGrid/InvestigationsGrid.vue";
import MedicationsGrid from "@/components/PatientProfileGrid/MedicationsGrid.vue";
import VitalsGrid from "@/components/PatientProfileGrid/VitalsGrid.vue";
import LabTestsHistory from "@/components/DashboardSegments/LabTestsHistory.vue";
import DiagnosesHistory from "@/components/DashboardSegments/DiagnosesHistory.vue";
import AllergiesContraindication from "@/components/DashboardSegments/AllergiesContraindication.vue";
import VisitsHistory from "@/components/DashboardSegments/VisitsHistory.vue";
import VitalsMeasurementsSummary from "@/components/DashboardSegments/VitalsMeasurementsSummary.vue";

import { useDemographicsStore } from "@/stores/DemographicStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { PatientService } from "@/services/patient_service";
import { UserService } from "@/services/user_service";
import { Service } from "@/services/service";
import { ObservationService } from "@/services/observation_service";
import { useVitalsStore } from "@/stores/VitalsStore";
import AncEnrollmentModal from "@/components/Modal/AncEnrollmentModal.vue";

import {
  modifyCheckboxInputField,
  getCheckboxSelectedValue,
  getRadioSelectedValue,
  getFieldValue,
  modifyRadioValue,
  modifyFieldValue,
} from "@/services/data_helpers";
import { toastWarning } from "@/utils/Alerts";
import ProgramData from "@/Data/ProgramData";
import { ref } from "vue";
import DynamicButton from "@/components/DynamicButton.vue";
import Programs from "@/components/Programs.vue";
import PatientProfile from "@/apps/Immunization/components/PatientProfile.vue";
import WeightHeightChart from "@/apps/Immunization/components/Graphs/WeightHeightChart.vue";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import BloodPressure from "@/components/Graphs/BloodPressure.vue";
import personalInformationModal from "@/apps/Immunization/components/Modals/personalInformationModal.vue";
import { iconBMI } from "@/utils/SvgDynamicColor";
import { createModal } from "@/utils/Alerts";
import SetPrograms from "@/views/Mixin/SetPrograms.vue";
import { ProgramService } from "@/services/program_service";
export default defineComponent({
  mixins: [SetPrograms],
  components: {
    WeightHeightChart,
    PreviousVitals,
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
    DispositionGrid,
    InvestigationsGrid,
    MedicationsGrid,
    VitalsGrid,
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
    DynamicButton,
    IonFab,
    IonFabButton,
    IonFabList,
    PatientProfile,
    IonSegmentButton,
    IonSegment,
    BloodPressure,
    VisitsHistory,
    VitalsMeasurementsSummary,
    AllergiesContraindication,
    DiagnosesHistory,
    LabTestsHistory,
    Programs,
    AncEnrollmentModal,
  },
  data() {
    return {
      checkUnderOne: false,
      isLoading: false,
      checkUnderFourteen: true,
      checkUnderNine: false,
      checkUnderFive: false,
      checkUnderSixWeeks: false,
      segmentContent: "Patient Summary",
      iconsContent: icons,
      isModalOpen: false,
      url: "" as any,
      NCDProgramActionName: "+ Enroll in NCD Program" as any,
      OPDProgramActionName: "+ Start New OPD consultation" as any,
      visits: [] as any,
      vitals: [] as any,
      NCDUserAction: [] as any,
      alerts: [] as any,
      isEnrollmentModalOpen: false,
      enrolledPrograms: [],
      colors: {
        Low: ["#B9E6FE", "#026AA2", "#9ADBFE"],
        Normal: ["#DDEEDD", "#016302", "#BBDDBC"],
        PreHigh: ["#FEDF89", "#B54708", "#FED667"],
        High: ["#FECDCA", "#B42318", "#FDA19B"],
      } as any,
    };
  },
  computed: {
    ...mapState(useDemographicsStore, ["demographics", "patient"]),
    ...mapState(useTreatmentPlanStore, ["selectedMedicalAllergiesList"]),
    ...mapState(useEnrollementStore, ["NCDNumber"]),
    ...mapState(useVitalsStore, ["vitals"]),
  },
  async mounted() {
    this.checkAge();
    const patient = new PatientService();
    this.visits = await PatientService.getPatientVisits(patient.getID(), false);
    await this.refreshPrograms();
    this.setAlerts();
    await this.updateData();
  },
  watch: {
    demographics: {
      async handler() {
        await this.updateData();
      },
      deep: true,
    },
  },
  setup() {
    const modal = ref();

    return {
      chevronBackOutline,
      checkmark,
      grid,
      chevronDownCircle,
      chevronForwardCircle,
      chevronUpCircle,
      colorPalette,
      document,
      globe,
      medkit,
      add,
      person,
    };
  },

  methods: {
    checkAge() {
      if (this.demographics?.birthdate) {
        this.checkUnderFourteen =
          HisDate.getAgeInYears(this.demographics?.birthdate) >= 14
            ? true
            : false;
        this.checkUnderNine =
          HisDate.ageInMonths(this.demographics?.birthdate) < 9 ? true : false;
        this.checkUnderFive =
          HisDate.getAgeInYears(this.demographics?.birthdate) < 5
            ? true
            : false;
        this.checkUnderSixWeeks =
          HisDate.dateDiffInDays(
            HisDate.currentDate(),
            this.demographics?.birthdate
          ) < 42
            ? true
            : false;
      }
    },
    setSegmentContent(name: any) {
      this.segmentContent = name;
    },
    setAlerts() {
      this.alerts = [
        {
          backgroundColor: "#B9E6FE",
          status: "",
          icon: iconBMI(["#B9E6FE", "#026AA2", "#9ADBFE"]),
          textColor: "#026AA2",
          value: "No further action is required.",
          name: "",
          index: "Blood sugar is normal",
        },
        {
          backgroundColor: "#FEDF89",
          status: "",
          icon: iconBMI(["#FEDF89", "#B54708", "#FED667"]),
          textColor: "#B54708",
          value: "Please call or follow up!",
          name: "",
          index: "Patient Defaulted",
        },
        {
          backgroundColor: "#FECDCA",
          status: "",
          icon: iconBMI(["#FECDCA", "#B42318", "#FDA19B"]),
          textColor: "#B42318",
          value: "Administer medications!",
          name: "",
          index: "Patient is hypertensive",
        },
      ];
    },
    openPIM() {
      createModal(personalInformationModal, { class: "otherVitalsModal" });
    },
    convertToDisplayDate(date: any) {
      return HisDate.toStandardHisDisplayFormat(date);
    },
    getSessionDate() {
      return HisDate.toStandardHisDisplayFormat(Service.getSessionDate());
    },
    programAccess(programName: string): boolean {
      const accessPrograms: any = sessionStorage.getItem("userPrograms");
      const programs: any = JSON.parse(accessPrograms);
      if (programs.some((program: any) => program.name === programName)) {
        return true;
      } else {
        return false;
      }
    },

    openModal() {
      this.isModalOpen = true;
    },
    dismiss() {
      modalController.dismiss();
    },
    async updateData() {
      const array = [
        "Height",
        "Weight",
        "Systolic",
        "Diastolic",
        "Temp",
        "Pulse",
        "SP02",
        "Respiratory rate",
      ];

      // An array to store all promises
      const promises = array.map(async (item) => {
        const dd = await ObservationService.getFirstValueNumber(
          this.demographics.patient_id,
          item
        );
        return { [item]: dd };
      });

      // Wait for all promises to resolve
      const resultsArray = await Promise.all(promises);

      // Combine the objects in resultsArray into a single object
      this.vitals = Object.assign({}, ...resultsArray);
    },
    covertGender(gender: any) {
      return ["Male", "M"].includes(gender)
        ? "Male"
        : ["Female", "F"].includes(gender)
        ? "Female"
        : "";
    },
    formatBirthdate() {
      return HisDate.getBirthdateAge(this.demographics?.birthdate);
    },
    closeEnrollmentModal() {
      this.isEnrollmentModalOpen = false;
    },
    toggleEnrollmentModal() {
      this.isEnrollmentModalOpen = !this.isEnrollmentModalOpen;
    },
    async handleCheckInYes() {
      await ProgramService.enrollPatient(this.demographics.patient_id);
      await this.refreshPrograms();
      this.toggleEnrollmentModal();
      return this.$router.push("ANCHome");
    },
    handleCheckInNo() {
      this.toggleEnrollmentModal();
    },
    handleProgramClick(btn: any) {
      if (btn.actionName == "+ Enroll in ANC Program") {
        const found: any = this.enrolledPrograms.find(
          (p: any) => p.id == btn.program_id
        );

        if (!found) {
          this.isEnrollmentModalOpen = true;
          return;
        }
        return this.$router.push("ANCHome");
      }
      this.setProgram(btn);
    },

    checkProgram(btn: any) {
      const found: any = this.enrolledPrograms.find(
        (p: any) => p.id == btn.program_id
      );

      if (found) return `Start ${btn.name}`;

      return btn.actionName;
    },

    async refreshPrograms() {
      const programs = await ProgramService.getPatientPrograms(
        this.demographics.patient_id
      );

      console.log({programs});
      this.enrolledPrograms = programs.map((p: any) => ({
        name: p.program.name,
        id: p.program_id,
      }));
    },
  },
});
</script>

<style scoped>
.vitalsHeading {
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #636363;
}
.vitalsUnits {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #636363;
}
.vitalsValue {
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  display: flex;
  align-items: center;
  color: #00190e;
}
.vitalsTitle {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #00190e;
  padding: 10px;
}
.dateClass {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #016302;
  padding: 10px;
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

.first_letter {
  background-color: #e6e6e6;
  padding: 20px;
  margin-right: 20px;
  font-size: 24px;
  border-radius: 4px;
  color: #636363 !important;
}
.p_name_image {
  font-size: 24px;
  color: #00190e;
  display: flex;
  font-weight: 700;
  overflow: hidden;
}
.p_name {
  max-width: 210px;
  margin-left: 20px;
  height: 25px;
}
.p_dash_header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: solid #cccccc 1px;
}
.p_title {
  font-weight: 700;
  font-size: 24px;
  color: #00190e;
}
.col {
  border: solid 1px #ccc;
  padding: 20px;
  width: 600px;
  height: 37.4vh;
}
.row {
  border-radius: 4px;
  border: solid 1px #ccc;
}
.grid {
  padding: 20px;
}

.date {
  display: flex;
  font-weight: 600;
  color: #00190e;
  align-items: center;
  justify-content: space-between;
  width: 200px;
}
ion-item[slot="header"] {
  padding-top: 1px;
}
.side_title {
  font-size: 14px;
}

.form_list {
  display: flex;
}
.form_list_content {
  padding-left: 10px;
  color: #00190e;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 15px;
}
.start_new_co {
  background-color: #ddeedd;
  color: #006401;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-left: 7px;
  font-weight: 500;
  cursor: pointer;
}
.allergies {
  background: #fecdca;
  color: #b42318;
  padding: 1px 8px;
  border-radius: 4px;
  margin-right: 5px;
  display: inline-block;
  margin-bottom: 5px;
}

.segment-button-checked {
  background: #ddeedd !important;
}
ion-segment-button {
  background: #fff;
  margin-right: 1px;
  font-size: 12px;
  text-transform: unset;
}
.bottomSummary {
  margin-top: 20px;
  max-width: 600px;
}
.bottomSummary .segment-button-checked {
  background: #fff !important;
  --indicator-color: none;
}
.bottomSummary ion-segment-button {
  background: #e6e6e6;
  margin-right: 5px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  text-transform: unset;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
}
.bottomSummaryContent {
  background: #fff;
}
.initialsBox {
  min-width: 85px;
  height: 90px;
  left: 31px;
  top: 122px;
  align-items: center;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.maleColor {
  background: #5983ba;
}
.femaleColor {
  background: #876d9b;
}
.demoContent {
  font-weight: 700;
}
.alert_content {
  padding: 10px;
  padding-bottom: 0px;
  width: 100%;
}
.bottom_text {
  padding-bottom: 10px;
  width: 100%;
}
</style>
