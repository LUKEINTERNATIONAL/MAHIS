<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar
                v-if="activeProgram.program_id !== 33 && activeProgram.program_id != '' && screenWidth < 1120"
                @openPopover="openPopover($event)"
            />
            <CheckInConfirmationModal
                :closeModalFunc="closeCheckInModal"
                :onYes="handleCheckInYes"
                :onNo="handleCheckInNo"
                :isOpen="checkInModalOpen"
                :title="`Are you sure you want to create the visit?`"
            />
            <CheckInConfirmationModal
                :closeModalFunc="closeCheckOutModal"
                :onYes="handleCheckOutYes"
                :onNo="handleCheckOutNo"
                :isOpen="checkOutModalOpen"
                :title="`Are you sure you want to close the visit?`"
            />
            <AncEnrollmentModal
                :closeModalFunc="closeEnrollmentModal"
                :onYes="handleANCEnrollmentYes"
                :onNo="handleEnrollmentNo"
                :isOpen="isEnrollmentModalOpen"
                :title="enrollModalTitle"
            />
            <LabourEnrollmentModal
                :closeModalFunc="closeEnrollmentModal"
                :onYes="handleLabourEnrollmentYes"
                :onNo="handleEnrollmentNo"
                :isOpen="isLabourEnrollmentModalOpen"
                :title="enrollModalTitle"
            />
            <PNCEnrollmentModal
                :closeModalFunc="closeEnrollmentModal"
                :onYes="handlePNCEnrollmentYes"
                :onNo="handleEnrollmentNo"
                :isOpen="isPNCEnrollmentModalOpen"
                :title="enrollModalTitle"
            />

            <PatientProfile :updateData="patient" v-if="activeProgram.program_id == 33" />
            <div class="content_manager" v-if="activeProgram.program_id !== 33 && activeProgram.program_id != ''">
                <ion-row class="content_width">
                    <ion-col size="2.5" size-lg="2.6" size-md="3" class="displayNoneLeftPanel">
                        <ion-card style="margin-bottom: 20px; background-color: #fff">
                            <ion-card-content>
                                <div style="display: flex; justify-content: space-between">
                                    <DynamicButton
                                        name="Activate visit"
                                        v-if="activateVisitButtonVisible"
                                        @click="toggleCheckInModal()"
                                        fill="clear"
                                        iconSlot="start"
                                        :icon="closeCircleOutline"
                                    />
                                    <DynamicButton
                                        v-if="deactivateVisitButtonVisible"
                                        name="Deactivate visit"
                                        @click="toggleCheckOutModal()"
                                        fill="clear"
                                        iconSlot="start"
                                        :icon="closeCircleOutline"
                                        color="danger"
                                    />
                                    <div></div>
                                    <div class="name" style="color: var(--ion-color-primary); margin-top: 10px" @click="openPopover($event)">
                                        <ion-icon :icon="ellipsisVerticalSharp"></ion-icon>
                                    </div>
                                </div>
                                <div class="p_name_image">
                                    <div
                                        :class="patient?.personInformation?.gender == 'M' ? 'initialsBox maleColor' : 'initialsBox femaleColor'"
                                        @click="openPIM()"
                                    >
                                        <ion-icon style="color: #fff; font-size: 70px" :icon="person"></ion-icon>
                                    </div>
                                    <div style="width: 100%">
                                        <div class="p_name">
                                            {{ patient?.personInformation?.given_name }} {{ patient?.personInformation?.middle_name }}
                                            {{ patient?.personInformation?.family_name }}
                                        </div>
                                    </div>
                                </div>
                                <ion-row>
                                    <ion-col size="4">MRN:</ion-col>
                                    <ion-col class="demoContent">{{ patient.ID }}</ion-col>
                                </ion-row>
                                <ion-row v-if="activeProgram.program_id === 32">
                                    <ion-col size="4">NCDNumber:</ion-col>
                                    <ion-col class="demoContent">{{ patient.NcdID }}</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col size="4">Gender:</ion-col>
                                    <ion-col class="demoContent">{{ covertGender(patient?.personInformation?.gender) }}</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col size="4">Age:</ion-col>
                                    <ion-col class="demoContent">{{ formatBirthdate() }}</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col size="4">Address:</ion-col>
                                    <ion-col class="demoContent">{{ formatCurrentAddress(patient) }}</ion-col>
                                </ion-row>
                            </ion-card-content>
                        </ion-card>

                        <ion-card style="margin-bottom: 20px; background-color: #fff">
                            <ion-accordion-group :value="['first']">
                                <ion-accordion value="first" style="background-color: #fff" toggle-icon-slot="start">
                                    <ion-item slot="header" color="white">
                                        <ion-label class="side_title">Alerts & Reminders </ion-label>
                                    </ion-item>
                                    <ion-card-content slot="content">
                                        <span v-for="(al, index3) in setAlerts()" :key="index3">
                                            <ion-row
                                                v-if="al.value"
                                                :style="
                                                    'border-radius: 5px;  margin-top:10px; margin-bottom:10px;background-color:' + al.backgroundColor
                                                "
                                            >
                                                <div style="display: flex">
                                                    <div style="align-items: center; display: flex; margin: 10px">
                                                        <ion-icon slot="start" :icon="al.icon" aria-hidden="true"></ion-icon>
                                                    </div>
                                                    <div>
                                                        <div class="position_content alert_content">
                                                            <span :style="'color:' + al.textColor + '; font-weight:600; margin: 0px 2px; width:100%'">
                                                                {{ al.index }}</span
                                                            >
                                                        </div>
                                                        <div class="position_content bottom_text" :style="'color:' + al.textColor + ';'">
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
                    </ion-col>
                    <ion-col size-sm="12" size-md="12" :size-lg="screenWidth > 1120 ? '9.4' : '12'">
                        <ion-card style="background-color: #fff; margin-inline: 0px; contain: unset; overflow: unset">
                            <div style="display: flex; justify-content: space-between">
                                <div class="vitalsTitle">Most recent Vitals & Biometrics</div>

                                <div class="start-visit">
                                    <div class="send-button-container">
                                        <button class="send-text" @click="handleProgramClick(activeProgram)">Start visit</button>
                                        <button class="send-arrow" @click="openProgramPopover($event)"></button>
                                    </div>
                                    <!-- <Programs
                                        :btn="true"
                                        verticalPosition="top"
                                        side="bottom"
                                        :programBtn="programBtn.map((btn:any )=> ({...btn, actionName: checkProgram(btn)}))"
                                        @clicked="
                                            async (btn) => {
                                                await handleProgramClick(btn);
                                            }
                                        "
                                    /> -->
                                </div>
                            </div>
                            <div style="width: 98%; overflow: scroll">
                                <div style="padding-left: 10px; padding-right: 10px; min-width: 738px">
                                    <ion-row>
                                        <ion-col class="vitalsHeading">Weight</ion-col>
                                        <ion-col class="vitalsHeading">Height</ion-col>
                                        <ion-col class="vitalsHeading">Temperature</ion-col>
                                        <ion-col class="vitalsHeading">Blood glucose</ion-col>
                                        <ion-col class="vitalsHeading">Pulse Rate</ion-col>
                                        <ion-col class="vitalsHeading">Blood pressure</ion-col>
                                    </ion-row>
                                    <ion-row>
                                        <ion-col class="vitalsValue">{{ vitalsData["Weight"] }} <span class="vitalsUnits">kg</span></ion-col>
                                        <ion-col class="vitalsValue">{{ vitalsData["Height"] }} <span class="vitalsUnits">cm</span></ion-col>
                                        <ion-col class="vitalsValue">{{ vitalsData["Temperature"] }} <span class="vitalsUnits">&deg;C</span></ion-col>
                                        <ion-col class="vitalsValue">0 <span class="vitalsUnits">mg/dL</span></ion-col>
                                        <ion-col class="vitalsValue">{{ vitalsData["Pulse"] }} <span class="vitalsUnits">bpm </span></ion-col>
                                        <ion-col class="vitalsValue"
                                            >{{ vitalsData["Systolic"] }}/{{ vitalsData["Diastolic"] }}<span class="vitalsUnits">mmhg</span></ion-col
                                        >
                                    </ion-row>
                                </div>
                            </div>
                        </ion-card>
                        <div style="width: 100%; overflow: scroll; height: 64px">
                            <ion-segment :value="segmentContent" style="margin-top: 5px; min-width: 540px">
                                <ion-segment-button value="Patient Charts" @click="setSegmentContent('Patient Charts')">
                                    <ion-label>Patient Charts</ion-label>
                                </ion-segment-button>
                                <ion-segment-button value="Visits History" @click="setSegmentContent('Visits History')">
                                    <ion-label>Visits History</ion-label>
                                </ion-segment-button>
                                <ion-segment-button value="Vitals & Measurements Summary" @click="setSegmentContent('Vitals & Measurements Summary')">
                                    <ion-label>Vitals & Measurements Summary</ion-label>
                                </ion-segment-button>
                                <ion-segment-button value="Lab Tests History" @click="setSegmentContent('Lab Tests History')">
                                    <ion-label>Lab Tests History</ion-label>
                                </ion-segment-button>
                                <ion-segment-button value="Diagnoses History" @click="setSegmentContent('Diagnoses History')">
                                    <ion-label>Diagnoses History</ion-label>
                                </ion-segment-button>
                                <ion-segment-button value="Allergies & Contraindication" @click="setSegmentContent('Allergies & Contraindication')">
                                    <ion-label>Allergies & Contraindication</ion-label>
                                </ion-segment-button>
                            </ion-segment>
                        </div>
                        <div v-if="segmentContent == 'Patient Charts'" style="margin-top: 1px">
                            <div :style="screenWidth > 826 ? 'display: flex;' : 'display: block;'">
                                <div class="patient-chart" v-if="checkUnderFive">
                                    <WeightHeightChart />
                                </div>
                                <div class="patient-chart">
                                    <BloodPressure />
                                </div>
                                <div class="patient-chart" v-if="!checkUnderFive">
                                    <PreviousVitals />
                                </div>
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
        </ion-content>
        <ion-popover
            style="--offset-x: -10px"
            :is-open="popoverOpen"
            :show-backdrop="false"
            :dismiss-on-select="true"
            :event="event"
            @didDismiss="popoverOpen = false"
        >
            <div>
                <ion-list style="--ion-background-color: #fff; --offset-x: -30px">
                    <ion-item :button="true" :detail="false" @click="openPIM()" style="cursor: pointer">Update demographics</ion-item>
                    <ion-item :button="true" :detail="false" @click="openOutCome()" style="cursor: pointer">Update outcome</ion-item>
                    <ion-item :button="true" :detail="false" @click="printVisitSummary()" style="cursor: pointer">Print visit summary</ion-item>
                    <ion-item :button="true" :detail="false" @click="printID()" style="cursor: pointer">Print client identifier</ion-item>
                </ion-list>
            </div>
        </ion-popover>
        <ion-popover
            :is-open="programPopover"
            :show-backdrop="false"
            :dismiss-on-select="true"
            :event="programEvent"
            @didDismiss="programPopover = false"
            style="--width: 350px"
        >
            <ion-content>
                <ion-list>
                    <ion-item
                        :button="true"
                        :detail="false"
                        style="cursor: pointer"
                        v-for="(btn, index) in authorizedPrograms"
                        :key="index"
                        @click="handleProgramClick(btn)"
                    >
                        <ion-icon slot="start" :icon="add"></ion-icon>
                        <span class="rght-drpm">{{ btn?.actionName }}</span>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-popover>
    </ion-page>
</template>

<script setup lang="ts">
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
import { ref, computed, onMounted, watch } from "vue";
import {
    medkit,
    grid,
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document as docIcon,
    globe,
    add,
    checkboxOutline,
    closeCircleOutline,
    chevronBackOutline,
    checkmark,
    ellipsisVerticalSharp,
    person,
} from "ionicons/icons";
import { modalController } from "@ionic/vue";
import { icons } from "@/utils/svg";
import { storeToRefs } from "pinia";

// Components imports
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import DispositionGrid from "@/components/PatientProfileGrid/OutcomeGrid.vue";
import InvestigationsGrid from "@/components/PatientProfileGrid/InvestigationsGrid.vue";
import bottomSummary from "./bottomSummary.vue";
import VitalsGrid from "@/components/PatientProfileGrid/VitalsGrid.vue";
import LabTestsHistory from "@/components/DashboardSegments/LabTestsHistory.vue";
import DiagnosesHistory from "@/components/DashboardSegments/DiagnosesHistory.vue";
import AllergiesContraindication from "@/components/DashboardSegments/AllergiesContraindication.vue";
import VisitsHistory from "@/components/DashboardSegments/VisitsHistory.vue";
import VitalsMeasurementsSummary from "@/components/DashboardSegments/VitalsMeasurementsSummary.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import Programs from "@/components/Programs.vue";
import PatientProfile from "@/apps/Immunization/components/PatientProfile.vue";
import WeightHeightChart from "@/apps/Immunization/components/Graphs/WeightHeightChart.vue";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import BloodPressure from "@/components/Graphs/BloodPressure.vue";
import CheckInConfirmationModal from "@/components/Modal/CheckInConfirmationModal.vue";
import AncEnrollmentModal from "@/apps/ANC/components/Modals/AncEnrollmentModal.vue";
import LabourEnrollmentModal from "@/apps/LABOUR/components/Modals/LabourEnrollmentModal.vue";
import PNCEnrollmentModal from "@/apps/PNC/components/Modals/PNCEnrollmentModal.vue";

// Store imports
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { useProgramStore } from "@/stores/ProgramStore";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useANCEnrollmentStore } from "@/apps/ANC/store/enrollment/ANCEnrollment";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";

// Services imports
import { PatientService } from "@/services/patient_service";
import { SetProgramService } from "@/services/set_program_service";
import { Service } from "@/services/service";
import { ObservationService } from "@/services/observation_service";
import { ProgramService, ProgramId } from "@/services/program_service";
import { PatientOpdList } from "@/services/patient_opd_list";
import { ConfirmPregnancyService } from "@/apps/ANC/service/confirm_pregnancy_service";
import { getUserLocation } from "@/services/userService";

// composables
import { usePatientProfile } from "@/composables/usePatientProfile";
import { useWindowSize } from "@/composables/screenSize";

// Utils imports
import HisDate from "@/utils/Date";
import dates from "@/utils/Date";
import { toastDanger, toastSuccess, toastWarning } from "@/utils/Alerts";
import { iconBMI } from "@/utils/SvgDynamicColor";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { useRouter } from "vue-router";

// Router instance
const router = useRouter();
// Store initialization
const demographicsStore = useDemographicsStore();
const treatmentPlanStore = useTreatmentPlanStore();
const enrollmentStore = useEnrollementStore();
const programStore = useProgramStore();
const vitalsStore = useVitalsStore();
const ancEnrollmentStore = useANCEnrollmentStore();

// composable destructuring
const { event, popoverOpen, openPopover, openPIM, openOutCome, printVisitSummary, printID, formatCurrentAddress } = usePatientProfile();
const { screenWidth } = useWindowSize();

// Store state destructuring
const { patient } = storeToRefs(demographicsStore) as any;
const { selectedMedicalAllergiesList } = storeToRefs(treatmentPlanStore);
const { NCDNumber } = storeToRefs(enrollmentStore);
const { activeProgram, authorizedPrograms } = storeToRefs(programStore);
const { vitals } = storeToRefs(vitalsStore);
const { ConfirmPregnancy } = storeToRefs(ancEnrollmentStore);

// Refs
const checkUnderOne = ref(false);
const isLoading = ref(false);
const programPopover = ref(false);
const checkUnderFourteen = ref(true);
const checkUnderNine = ref(false);
const checkUnderFive = ref(false);
const checkUnderSixWeeks = ref(false);
const segmentContent = ref("Patient Charts");
const isModalOpen = ref(false);
const programEvent = ref<any>(null);
const url = ref<any>(null);
const NCDProgramActionName = ref("+ Enroll in NCD Program");
const OPDProgramActionName = ref("+ Start New OPD consultation");
const visits = ref<any[]>([]);
const alert = ref<any[]>([]);
const vitalsData = ref({}) as any;
const NCDUserAction = ref<any[]>([]);
const checkInModalOpen = ref(false);
const checkOutModalOpen = ref(false);
const checkedIn = ref(false);
const isEnrollmentModalOpen = ref(false);
const isLabourEnrollmentModalOpen = ref(false);
const isPNCEnrollmentModalOpen = ref(false);
const enrolledPrograms = ref<any[]>([]);
const programToEnroll = ref(0);
const enrollModalTitle = ref("");
const programBtn = ref<any[]>([]);
const modal = ref();

// Constants
const colors = {
    Low: ["#B9E6FE", "#026AA2", "#9ADBFE"],
    Normal: ["#DDEEDD", "#016302", "#BBDDBC"],
    PreHigh: ["#FEDF89", "#B54708", "#FED667"],
    High: ["#FECDCA", "#B42318", "#FDA19B"],
};

// Computed properties
const pregnancyConfirmed = computed(() => {
    return getRadioSelectedValue(ConfirmPregnancy.value, "Pregnancy confirmed");
});

const pregnancyPlanned = computed(() => {
    return getRadioSelectedValue(ConfirmPregnancy.value, "Pregnancy planned");
});

const activateVisitButtonVisible = computed(() => {
    return !checkedIn.value && activeProgram.value.program_id == 14;
});

const deactivateVisitButtonVisible = computed(() => {
    return checkedIn.value && activeProgram.value.program_id == 14;
});

// Methods
const checkAge = () => {
    if (patient.value?.personInformation?.birthdate) {
        checkUnderFourteen.value = HisDate.getAgeInYears(patient.value.personInformation.birthdate) >= 14;
        checkUnderNine.value = HisDate.ageInMonths(patient.value.personInformation.birthdate) < 9;
        checkUnderFive.value = HisDate.getAgeInYears(patient.value.personInformation.birthdate) < 5;
        checkUnderSixWeeks.value = HisDate.dateDiffInDays(HisDate.currentDate(), patient.value.personInformation.birthdate) < 42;
    }
};

const setSegmentContent = (name: any) => {
    segmentContent.value = name;
};

const setAlerts = () => {
    return [
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
};

const convertToDisplayDate = (date: any) => {
    return HisDate.toStandardHisDisplayFormat(date);
};

const getSessionDate = () => {
    return HisDate.toStandardHisDisplayFormat(Service.getSessionDate());
};

const programAccess = (programName: any) => {
    const accessPrograms: any = localStorage.getItem("userPrograms");
    const programs = JSON.parse(accessPrograms);
    return programs.some((program: any) => program.name === programName);
};

const openModal = () => {
    isModalOpen.value = true;
};

const dismiss = () => {
    modalController.dismiss();
};

const updateCheckInStatus = async () => {
    try {
        const visit = await PatientOpdList.getCheckInStatus(patient.value.patientID);
        checkedIn.value = !!visit.length;
    } catch (error) {
        console.error(error);
    }
};

const closeCheckInModal = () => {
    checkInModalOpen.value = false;
};

const closeCheckOutModal = () => {
    checkOutModalOpen.value = false;
};

const toggleCheckInModal = () => {
    checkInModalOpen.value = !checkInModalOpen.value;
};

const toggleCheckOutModal = () => {
    checkOutModalOpen.value = !checkOutModalOpen.value;
};

const handleCheckInYes = async () => {
    try {
        const location = await getUserLocation();
        const locationId = location ? location.code : null;
        if (!locationId) {
            toastDanger("Location ID could not be found. Please check your settings.");
            return;
        }
        await PatientOpdList.checkInPatient(patient.value.patientID, dates.todayDateFormatted(), locationId);
        await PatientOpdList.addPatientToStage(patient.value.patientID, dates.todayDateFormatted(), "VITALS", locationId);
        await usePatientList().refresh(locationId);
        toggleCheckInModal();
        checkedIn.value = true;
        toastSuccess("The patient's visit is now active. Patient is on the waiting list for vitals");
    } catch (e) {
        toastDanger("An error occurred while attempting to check in the patient. Please try again.");
    }
};

const handleCheckOutYes = async () => {
    try {
        const visit = await PatientOpdList.getCheckInStatus(patient.value.patientID);
        await PatientOpdList.checkOutPatient(visit[0].id, dates.todayDateFormatted());
        const location = await getUserLocation();
        const locationId = location ? location.location_id : null;
        await usePatientList().refresh(locationId);
        checkedIn.value = false;
        toggleCheckOutModal();
        toastSuccess("The patient's visit is now closed");
    } catch (e) {
        console.error(e);
    }
};

const checkPatientIFCheckedIn = async () => {
    try {
        const result = await PatientOpdList.getCheckInStatus(patient.value.patientID);
        checkedIn.value = result.length > 0;
    } catch (e) {
        console.error(e);
    }
};

const handleCheckInNo = () => {
    toggleCheckInModal();
};

const handleCheckOutNo = () => {
    toggleCheckOutModal();
};

const togglePopover = () => {
    popoverOpen.value = !popoverOpen.value;
};

const openProgramPopover = (event: any) => {
    programEvent.value = event;
    programPopover.value = !programPopover.value;
};

const handleProgramClick = async (selectedProgram: any) => {
    await refreshPrograms();

    const lower = (title: any) => title?.toLowerCase().replace(/\s+/g, "");
    const gender = covertGender(patient.value.personInformation?.gender);
    const age = HisDate.getAgeInYears(patient.value.personInformation?.birthdate);

    if (
        selectedProgram.program_id == ProgramId.ANC_PROGRAM ||
        selectedProgram.program_id == ProgramId.PNC_PROGRAM ||
        selectedProgram.program_id == ProgramId.LABOUR_AND_DELIVERY_PROGRAM
    ) {
        const found = enrolledPrograms.value.find((p) => p.id == selectedProgram.program_id);

        if (!found) {
            if (gender === "Male") {
                toastWarning("Males cannot be enrolled in this program");
                return;
            } else if (gender === "Female" && age < 9) {
                toastWarning("The client's age is below the required minimum age limit");
                return;
            } else {
                if (selectedProgram.program_id == ProgramId.ANC_PROGRAM) {
                    isEnrollmentModalOpen.value = true;
                    programToEnroll.value = selectedProgram.program_id;
                    return;
                } else if (selectedProgram.program_id == ProgramId.LABOUR_AND_DELIVERY_PROGRAM) {
                    isLabourEnrollmentModalOpen.value = true;
                    enrollModalTitle.value = `Are you sure you want to enroll ${patient.value?.personInformation?.given_name.toUpperCase()} in this program?`;
                    programToEnroll.value = selectedProgram.program_id;
                    return;
                } else {
                    isPNCEnrollmentModalOpen.value = true;
                    enrollModalTitle.value = `Are you sure you want to enroll ${patient.value?.personInformation?.given_name.toUpperCase()} in this program?`;
                    programToEnroll.value = selectedProgram.program_id;
                    return;
                }
            }
        }
    }
    await SetProgramService.userProgramData(patient.value.patientID, selectedProgram);
    return router.push(selectedProgram.url);
};

const closeEnrollmentModal = () => {
    isEnrollmentModalOpen.value = false;
};

const toggleEnrollmentModal = () => {
    isEnrollmentModalOpen.value = !isEnrollmentModalOpen.value;
};

const handleANCEnrollmentYes = async () => {
    const userID: any = Service.getUserID();
    const quickCheck = new ConfirmPregnancyService(patient.value.patientID, userID);
    const encounter = await quickCheck.createEncounter();
    if (!encounter) return toastWarning("Unable to create quick check encounter");
    const patientStatus = await quickCheck.saveObservationList(await buildANCEnrollment());
    await ProgramService.enrollProgram(patient.value.patientID, programToEnroll.value, new Date().toString());
    if (!patientStatus) return toastWarning("Unable to create quick check details!");
    toastSuccess("Enrollment is successful");
    await refreshPrograms();
    toggleEnrollmentModal();
    return router.push("ANCHome");
};

const handleLabourEnrollmentYes = async () => {
    await ProgramService.enrollProgram(patient.value.patientID, programToEnroll.value, new Date().toString());
    await refreshPrograms();
    toastSuccess("Enrollment is successful");
    return router.push("LabourHome");
};

const handlePNCEnrollmentYes = async () => {
    await ProgramService.enrollProgram(patient.value.patientID, programToEnroll.value, new Date().toString());
    await refreshPrograms();
    toastSuccess("Enrollment is successful");
    return router.push("PNCHome");
};

const refreshPrograms = async () => {
    const programs = await ProgramService.getPatientPrograms(patient.value.patientID);
    enrolledPrograms.value = programs?.map((p: any) => ({
        name: p.program.name,
        id: p.program_id,
    }));
};

const handleEnrollmentNo = () => {
    toggleEnrollmentModal();
};

const checkProgram = (btn: any) => {
    const found = enrolledPrograms.value.find((p) => p.id == btn.program_id);
    return found ? `Start ${btn.name}` : btn.actionName;
};

const updateData = async () => {
    const array = ["Height", "Weight", "Systolic", "Diastolic", "Temperature", "Pulse", "SAO2", "Respiratory rate"];
    const promises = array.map(async (item) => {
        const dd = await ObservationService.getFirstValueNumber(patient.value.patientID, item);
        return { [item]: dd };
    });
    const resultsArray = await Promise.all(promises);
    Object.assign(vitalsData.value, ...resultsArray);
};

const covertGender = (gender: any) => {
    return ["Male", "M"].includes(gender) ? "Male" : ["Female", "F"].includes(gender) ? "Female" : "";
};

const formatBirthdate = () => {
    return HisDate.getBirthdateAge(patient.value?.personInformation?.birthdate);
};

const buildANCEnrollment = async () => {
    return [...(await formatRadioButtonData(ConfirmPregnancy))];
};

onMounted(async () => {
    await SetProgramService.userProgramData(patient.patientID);
    checkAge();
    const patientInstance = new PatientService();
    visits.value = await PatientService.getPatientVisits(patientInstance.getID(), false);
    await refreshPrograms();
    setAlerts();
    await updateData();
    await checkPatientIFCheckedIn();
});

watch(
    () => patient,
    async () => {
        await SetProgramService.userProgramData(patient.patientID);
        await updateData();
        await checkPatientIFCheckedIn();
        updateCheckInStatus();
    },
    { deep: true }
);
</script>

<style>
.start-visit {
    margin-top: 5px;
    margin-right: 5px;
}
.send-button-container {
    display: inline-flex;
    border-radius: 9999px;
    overflow: hidden;
    min-width: 130px;
}

.send-text {
    background-color: #006401;
    color: white;
    border: none;
    font-family: system-ui, -apple-system, sans-serif;
    cursor: pointer;
    flex-grow: 1;
    transition: background-color 0.2s;
    font-size: 14px;
}

.send-arrow {
    background-color: #008000;
    color: white;
    border: none;
    border-left: 1px solid #135a14;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
    padding: 8px 14px;
}

.send-text:hover {
    background-color: #004d00;
}

.send-arrow:hover {
    background-color: #006b00;
}

.send-arrow::after {
    content: "▾";
    font-size: 18px;
}

/* Responsive styles */

@media (max-width: 1120px) {
    .regDisplayFlex {
        display: flex;
        justify-content: space-between;
    }
    .displayNoneLeftPanel {
        display: none !important;
    }
}
</style>

<style scoped>
.patient-chart {
    width: 100vw;
    background-color: #fff;
    border-radius: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
}
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
