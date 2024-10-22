<template>
    <basic-card
        :content="cardData"
        :editable="editable"
        @update:selected="handleInputData"
        @update:inputValue="handleInputData"
        @clicked:button="handleBtns"
    ></basic-card>
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
import SubstanceDiagnosis from "@/apps/NCD/components/Enrollment/Diagnosis.vue";
import FamilyHistoryNCDNumber from "@/apps/NCD/components/Enrollment/NCDNumber.vue";
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
import { resetPatientData } from "@/services/reset_data";
import { useBirthRegistrationStore } from "@/apps/Immunization/stores/BirthRegistrationStore";
import BasicCard from "@/components/BasicCard.vue";

export default defineComponent({
    name: "BirthRegistration",
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
        SubstanceDiagnosis,
        FamilyHistoryNCDNumber,
        DynamicButton,
        BasicCard,
    },
    data() {
        return {
            iconsContent: icons,
            demographic: true,
            currentStep: "",
            scanner: false,
            steps: "" as any,
            isOpen: false,
            iconListStatus: "active_icon",
            iconGridStatus: "inactive_icon",
            cardData: {} as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useConfigurationStore, ["enrollmentDisplayType"]),
        ...mapState(useEnrollementStore, ["NCDNumber", "enrollmentDiagnosis", "substance", "patientHistoryHIV", "patientHistory"]),
        ...mapState(useBirthRegistrationStore, ["birthRegistration"]),
    },
    watch: {
        birthRegistration: {
            handler() {
                this.buildCards();
            },
            deep: true,
        },
    },
    props: {
        editable: {
            default: false as any,
        },
    },
    async mounted() {
        this.setDisplayType(this.enrollmentDisplayType);
        this.updateEnrollmentStores();
        this.buildCards();
    },

    setup() {
        return { chevronBackOutline, checkmark, arrowForwardCircle, grid, list };
    },

    methods: {
        handleBtns() {
            console.log("lll");
        },
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
            // const NCDNumber = getFieldValue(this.NCDNumber, "NCDNumber", "value");
            // const sitePrefix = await GlobalPropertyService.get("site_prefix");
            // const formattedNCDNumber = sitePrefix + "-NCD-" + NCDNumber;
            // const exists = await IdentifierService.ncdNumberExists(formattedNCDNumber);
            // if (exists) toastWarning("NCD number already exists", 5000);
            // else {
            //     await this.saveEnrollment();
            //     const patient = new PatientService();
            //     patient.createNcdNumber(formattedNCDNumber);
            //     const demographicsStore = useDemographicsStore();
            //     demographicsStore.setPatient(await PatientService.findByID(this.demographics.patient_id));
            //     generalStore.setSaveProgressStatus("");
            //     await resetPatientData();
            //     if (this.activities.length == 0) {
            //         this.$router.push("patientProfile");
            //     } else {
            //         this.$router.push("consultationPlan");
            //     }
            // }
            this.$router.push("patientProfile");
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
                this.currentStep = "Substance & Diagnosis";
                this.steps = ["Substance & Diagnosis", "Patient History", "Family History and NCDNumber"];
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
        async buildEnrollmentData() {
            return [
                ...(await formatRadioButtonData(this.patientHistoryHIV)),
                ...(await formatRadioButtonData(this.substance)),
                ...(await formatCheckBoxData(this.enrollmentDiagnosis)),
                ...(await formatCheckBoxData(this.patientHistory)),
                ...(await formatCheckBoxData(this.patientHistoryHIV)),
            ];
        },
        async saveEnrollment() {
            const data: any = await this.buildEnrollmentData();
            console.log("🚀 ~ saveEnrollment ~ data:", data);
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const diagnosisInstance = new Diagnosis();
                diagnosisInstance.onSubmit(this.demographics.patient_id, userID, data);
            }
        },
        buildCards() {
            const enrollment = useBirthRegistrationStore();
            this.cardData = {
                cards: [
                    {
                        cardTitle: "Birth Registration",
                        content: this.birthRegistration,
                        initialData: enrollment.getInitialBirthRegistration(),
                    },
                ],
            };
        },
        updateEnrollmentStores() {
            const enrollmentStore = useBirthRegistrationStore();
            enrollmentStore.setBirthRegistration(this.birthRegistration);
        },
        async handleInputData(event: any) {
            if (event.inputHeader == "How many doses of Tdv did the mother receive?*") {
                if (event.value) {
                    if (event.value.name == "Unknown") {
                        modifyFieldValue(this.birthRegistration, "Protected at birth", "value", {
                            concept_id: 1067,
                            name: "Don't know",
                        });
                    } else if (event.value.name == "0-2 doses, less than two weeks before delivery") {
                        modifyFieldValue(this.birthRegistration, "Protected at birth", "value", {
                            concept_id: 1066,
                            name: "No",
                        });
                    } else if (event.value.name == "2-5 doses more than two weeks of delivery") {
                        modifyFieldValue(this.birthRegistration, "Protected at birth", "value", {
                            concept_id: 1065,
                            name: "Yes",
                        });
                    }
                } else {
                    modifyFieldValue(this.birthRegistration, "Protected at birth", "value", "");
                }
            }
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
    margin-bottom: 10px;
}
.demographics_title {
    font-weight: 700;
    font-size: 24px;
    padding-top: 20px;
}
.demographics {
    display: flex;
    width: unset;
    justify-content: center;
}
</style>
@/apps/Immunization/stores/BirthRegistrationStore
