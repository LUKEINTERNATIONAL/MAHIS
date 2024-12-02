<template>
    <ion-page>
        <Toolbar />
        <ion-content>
            <div class="container">
                <div style="display: flex; align-items: center" @click="nav('patientProfile')">
                    <DynamicButton fill="clear" name="Back to profile" iconSlot="start" :icon="iconsContent.arrowLeft" />
                </div>
                <div class="title">
                    <div class="demographics_title">Enrollment</div>
                </div>
                <div class="icon_div">
                    <ion-icon :class="iconListStatus" :icon="list" @click="setDisplayType('list')"></ion-icon>
                    <ion-icon
                        :class="iconGridStatus"
                        style="font-size: 21px; margin-top: 1.5px"
                        :icon="grid"
                        @click="setDisplayType('grid')"
                    ></ion-icon>
                </div>
            </div>
            <div v-if="enrollmentDisplayType == 'grid'">
                <ion-row class="card_row" v-if="enrollmentDisplayType == 'grid'">
                    <ion-col size-sm="12" size-md="12" size-lg="6" size-xl="4">
                        <NCDNumber />
                        <PatientType />
                        <FamilyHistory />
                    </ion-col>
                    <ion-col size-sm="12" size-md="12" size-lg="6" size-xl="4">
                        <PatientHistory />
                    </ion-col>
                    <ion-col size-sm="12" size-md="12" size-lg="6" size-xl="4">
                        <PatientHistoryHIV />
                        <EnrollmentDiagnosis />
                    </ion-col>
                </ion-row>
            </div>
            <div v-if="enrollmentDisplayType == 'list'">
                <div v-if="currentStep == 'NCD Number, Patient Type & Family History'">
                    <NCDNumber />
                    <PatientType />
                    <FamilyHistory />
                </div>
                <div v-if="currentStep == 'Patient History'">
                    <div style="display: flex; justify-content: center">
                        <PatientHistory />
                    </div>
                </div>
                <div v-if="currentStep == 'HIV & TB History & Diagnosis'">
                    <PatientHistoryHIV />
                    <EnrollmentDiagnosis />
                </div>
            </div>
        </ion-content>
        <div class="footer2" v-if="enrollmentDisplayType == 'grid'">
            <DynamicButton name="Save" iconSlot="end" :icon="iconsContent.saveWhite" @click="saveData()" />
        </div>
        <ion-footer v-if="enrollmentDisplayType == 'list'">
            <div class="footer position_content">
                <DynamicButton
                    name="Cancel"
                    v-if="currentStep == 'NCD Number, Patient Type & Family History'"
                    color="danger"
                    @click="nav('/patientProfile')"
                />
                <DynamicButton name="Previous" v-else :icon="iconsContent.arrowLeftWhite" color="medium" @click="previousStep" />
                <ion-breadcrumbs class="breadcrumbs displayNoneMobile">
                    <ion-breadcrumb
                        @click="setCurrentStep('NCD Number, Patient Type & Family History')"
                        :class="{ active: currentStep === 'NCD Number, Patient Type & Family History' }"
                    >
                        <span class="breadcrumb-text">NCD Number, Patient Type & Family History</span>
                        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                    </ion-breadcrumb>
                    <ion-breadcrumb @click="setCurrentStep('Patient History')" :class="{ active: currentStep === 'Patient History' }">
                        <span class="breadcrumb-text">Patient History</span>
                        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                    </ion-breadcrumb>
                    <ion-breadcrumb
                        @click="setCurrentStep('HIV & TB History & Diagnosis')"
                        :class="{ active: currentStep === 'HIV & TB History & Diagnosis' }"
                    >
                        <span class="breadcrumb-text">HIV & TB History & Diagnosis</span>
                        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                    </ion-breadcrumb>
                </ion-breadcrumbs>
                <DynamicButton
                    v-if="currentStep == 'HIV & TB History & Diagnosis'"
                    name="Save"
                    iconSlot="end"
                    :icon="iconsContent.saveWhite"
                    @click="saveData()"
                />
                <DynamicButton v-else name="Next" iconSlot="end" :icon="iconsContent.arrowRightWhite" @click="nextStep" />
            </div>
        </ion-footer>
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
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import PatientHistory from "@/apps/NCD/components/Enrollment/PatientHistory.vue";
import PatientHistoryHIV from "@/apps/NCD/components/Enrollment/PatientHistoryHIV.vue";
import EnrollmentDiagnosis from "@/apps/NCD/components/Enrollment/Diagnosis.vue";
import Substance from "@/apps/NCD/components/ConsultationPlan/RiskAssessment.vue";
import NCDNumber from "@/apps/NCD/components/Enrollment/NCDNumber.vue";
import FamilyHistory from "@/apps/NCD/components/Enrollment/FamilyHistory.vue";
import PatientType from "@/apps/NCD/components/Enrollment/PatientType.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { useConfigurationStore } from "@/stores/ConfigurationStore";
import { arrowForwardCircle, grid, list } from "ionicons/icons";
import { PatientService } from "@/services/patient_service";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { GlobalPropertyService } from "@/services/global_property_service";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    getCheckboxInputField,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { formatRadioButtonData, formatCheckBoxData } from "@/services/formatServerData";
import { IdentifierService } from "@/services/identifier_service";
import { resetNCDPatientData } from "@/apps/NCD/config/reset_ncd_data";
import { useGeneralStore } from "@/stores/GeneralStore";
import { UserService } from "@/services/user_service";
import { saveEncounterData, EncounterTypeId } from "@/services/encounter_type";
import { resetPatientData } from "@/services/reset_data";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";

export default defineComponent({
    mixins: [SetDemographics],
    name: "Home",
    components: {
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
        PatientHistory,
        PatientHistoryHIV,
        EnrollmentDiagnosis,
        Substance,
        NCDNumber,
        FamilyHistory,
        PatientType,
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
            demographic: true,
            currentStep: "NCD Number, Patient Type & Family History",
            scanner: false,
            steps: "" as any,
            isOpen: false,
            iconListStatus: "active_icon",
            iconGridStatus: "inactive_icon",
        };
    },
    watch: {
        $route: {
            async handler() {
                await resetPatientData();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useConfigurationStore, ["enrollmentDisplayType"]),
        ...mapState(useGeneralStore, ["NCDActivities"]),
        ...mapState(useEnrollementStore, [
            "NCDNumber",
            "enrollmentDiagnosis",
            "substance",
            "patientHistoryHIV",
            "patientHistory",
            "patientType",
            "familyHistory",
        ]),
    },
    async mounted() {
        this.setDisplayType(this.enrollmentDisplayType);
        await resetPatientData();
    },

    setup() {
        return { chevronBackOutline, checkmark, arrowForwardCircle, grid, list };
    },

    methods: {
        setCurrentStep(name: any) {
            this.currentStep = name;
        },
        nextStep() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex < this.steps.length - 1) {
                this.currentStep = this.steps[currentIndex + 1];
            }
        },
        previousStep() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex > 0) {
                this.currentStep = this.steps[currentIndex - 1];
            }
        },
        async saveData() {
            await this.saveNcdNumber();
        },

        async saveNcdNumber() {
            const NCDNumber = getFieldValue(this.NCDNumber, "NCDNumber", "value");
            const location_id = localStorage.getItem("locationID");
            const sitePrefix = await GlobalPropertyService.get(`site_prefix_${location_id}`);
            const formattedNCDNumber = sitePrefix + "-NCD-" + NCDNumber;
            const exists = await IdentifierService.ncdNumberExists(formattedNCDNumber);
            if (exists) toastWarning("NCD number already exists", 5000);
            else {
                const patient = new PatientService();
                patient.createNcdNumber(formattedNCDNumber);
                this.setDemographics(await PatientService.findByID(this.patient.patientID));
                await this.saveEnrollment();
                await resetNCDPatientData();
                await UserService.setProgramUserActions();
                if (this.NCDActivities.length == 0) {
                    this.$router.push("patientProfile");
                } else {
                    this.$router.push("consultationPlan");
                }
            }
        },
        openModal() {
            createModal(SaveProgressModal);
        },
        nav(url: any) {
            this.$router.push(url);
        },
        setDisplayType(type: any) {
            if (type == "grid") {
                this.currentStep = "Enrollment";
            } else {
                this.currentStep = "NCD Number, Patient Type & Family History";
                this.steps = ["NCD Number, Patient Type & Family History", "Patient History", "HIV & TB History & Diagnosis"];
            }
            const demographicsStore = useConfigurationStore();
            demographicsStore.setEnrollmentDisplayType(type);
            this.setIconClass();
        },
        setIconClass() {
            this.iconListStatus = "inactive_icon";
            this.iconGridStatus = "inactive_icon";
            if (this.enrollmentDisplayType == "list") {
                this.iconListStatus = "active_icon";
            } else if (this.enrollmentDisplayType == "grid") {
                this.iconGridStatus = "active_icon";
            }
        },
        async saveEnrollment() {
            await this.saveDiagnosis();
            await this.savePatientHistory();
            await this.savePatientRegistration();
        },
        async savePatientHistory() {
            await saveEncounterData(
                this.patient.patientID,
                EncounterTypeId.FAMILY_MEDICAL_HISTORY,
                "" as any,
                await formatCheckBoxData(this.familyHistory)
            );
        },
        async savePatientComplications() {
            await saveEncounterData(this.patient.patientID, EncounterTypeId.COMPLICATIONS, "" as any, await formatCheckBoxData(this.patientHistory));
        },
        async savePatientHIVStatus() {
            await saveEncounterData(
                this.patient.patientID,
                EncounterTypeId.HIV_STATUS_AT_ENROLLMENT,
                "" as any,
                await formatRadioButtonData(this.patientHistoryHIV)
            );
        },

        async savePatientRegistration() {
            await saveEncounterData(
                this.patient.patientID,
                EncounterTypeId.PATIENT_REGISTRATION,
                "" as any,
                await formatRadioButtonData(this.patientType)
            );
        },

        async saveDiagnosis() {
            await saveEncounterData(this.patient.patientID, EncounterTypeId.DIAGNOSIS, "" as any, await formatCheckBoxData(this.enrollmentDiagnosis));
        },
    },
});
</script>

<style scoped>
.breadcrumbs {
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}
ion-toolbar {
    --opacity: 0.5;
    --background: var(--ion-background-color, #fff);
}
.header {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
.footer {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
}
ion-breadcrumb ion-icon {
    margin-inline: 30px;
}
.breadcrumb-active {
    color: var(--color);
}
.active {
    color: #00190e;
    display: flex;
    height: 40px;
    padding: 0px 16px;
    align-items: center;
    gap: 8px;
}
.active .breadcrumb-text {
    border-bottom: 1px solid #00190e; /* Set the desired color for the underline */
}
ion-footer {
    border-top: 1px solid #e6e6e6;
    display: block;
    position: relative;
    -ms-flex-order: 1;
    order: 1;
    width: 100%;
    background: #f4f4f4f4;
}

.breadcrumbs {
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}
ion-toolbar {
    --opacity: 0.5;
    --background: var(--ion-background-color, #fff);
}
.header {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
.footer {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
}
.footer2 {
    color: #000;
    display: flex;
    justify-content: right;
    padding: 5px 0px 5px 0px;
    margin-right: 40px;
}
ion-breadcrumb ion-icon {
    margin-inline: 30px;
}
.breadcrumb-active {
    color: var(--color);
}
.active {
    color: #00190e;
    display: flex;
    height: 40px;
    padding: 0px 16px;
    align-items: center;
    gap: 8px;
}
.active .breadcrumb-text {
    border-bottom: 1px solid #00190e; /* Set the desired color for the underline */
}
ion-footer {
    border-top: 1px solid #e6e6e6;
}

.icon_div {
    display: flex;
    justify-content: space-between;
    width: 70px;
    position: absolute;
    right: 70px;
    top: 20px;
}
.active_icon {
    font-size: 25px;
    background-color: #ddeedd;
    color: #6fbd70;
    border-radius: 5px;
}
.inactive_icon {
    font-size: 25px;
    color: #ccc;
}

.container {
    position: relative;
}

.title {
    text-align: center;
}
.demographics_title {
    font-weight: 700;
    font-size: 24px;
}
.demographics {
    display: flex;
    width: unset;
    justify-content: center;
}
</style>
