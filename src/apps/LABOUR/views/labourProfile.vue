<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Labour Profile"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"
                :getSaveFunction="getSaveFunction"
            />
        </ion-content>
        <BasicFooter @finishBtn="saveData()" />
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
} from "@ionic/vue";
import BasicFooter from "@/components/BasicFooter.vue";
import { ConceptService } from "@/services/concept_service";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastDanger } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import LabourWomanBehaviour from "@/apps/LABOUR/components/labour profile/LabourWomanBehaviour.vue";
import LabourAllergies from "@/apps/LABOUR/components/labour profile/LabourAllergies.vue";
import LabourPastSurgeries from "@/apps/LABOUR/components/labour profile/LabourPastSurgeries.vue";
import LabourChronicHealthConditions from "@/apps/LABOUR/components/labour profile/LabourChronicHealthConditions.vue";
import LabourVaccineHistory from "@/apps/LABOUR/components/labour profile/LabourVaccineHistory.vue";
import LabourMedications from "@/apps/LABOUR/components/labour profile/LabourMedications.vue";
import LabourObstetricHistory from "@/apps/LABOUR/components/labour profile/LabourObstetricHistory.vue";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
// import { useMedicalHistoryStore } from "@/apps/ANC/store/profile/medicalHistoryStore";
// import { useObstreticHistoryStore } from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
// import { useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
// import { useMedicationStore } from "@/apps/ANC/store/profile/MedicationStore";
// import { useWomanBehaviourStore } from "@/apps/ANC/store/profile/womanBehaviourStore";
import { Service } from "@/services/service";
//import { ProfileService } from "@/services/anc_profile_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
// import { Preterms } from "../service/preterm";
import { currentPregnancyService, MedicalHistoryService, PastObstetricHistoryService } from "@/services/anc_profile_service";
import { resetPatientData } from "@/services/reset_data";
import { ObservationService } from "@/services/observation_service";
import { validateField } from "@/services/ANC/profile_validation_service";
import Validation from "@/validations/StandardValidations";
import HisDate from "@/utils/Date";
import calculateAge from "@/utils/Date";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";

// function someChecked(options, errorMassage) {
//   if (!options.filter(v => v.checkboxBtnContent).some(v => v.checkboxBtnContent.data.some(d => d.checked))) {
//     return errorMassage
//   }
// }
export default defineComponent({
    name: "Home",
    mixins: [SetUserRole, SetEncounter],

    components: {
        BasicFooter,
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
        LabourWomanBehaviour,
        LabourAllergies,
        LabourPastSurgeries,
        LabourChronicHealthConditions,
        LabourVaccineHistory,
        LabourMedications,
        LabourObstetricHistory,
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Past pregnancy complications",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Woman behavior",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Allergies",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Past Surgeries",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },
                {
                    title: "chronic health conditions",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "",
                },

                {
                    title: "vaccine history",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 6,
                    last_step: "",
                },
                {
                    title: "Current medications",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 7,
                    last_step: "",
                },
                {
                    title: "Obstetric history",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 8,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Past pregnancy complications",
                    component: "LabourComplications",
                    value: "1",
                },
                {
                    title: "Woman behavior",
                    component: "LabourWomanBehaviour",
                    value: "2",
                },
                {
                    title: "Allergies",
                    component: "LabourAllergies",
                    value: "3",
                },
                {
                    title: "Past Surgeries",
                    component: "LabourPastSurgeries",
                    value: "4",
                },
                {
                    title: "chronic health conditions",
                    component: "LabourChronicHealthConditions",
                    value: "5",
                },
                {
                    title: "vaccine history",
                    component: "LabourVaccineHistory",
                    value: "6",
                },
                {
                    title: "Current medications",
                    component: "LabourMedications",
                    value: "7",
                },
                {
                    title: "Obstetric history",
                    component: "LabourObstetricHistory",
                    value: "8",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {
        // lmnp: {
        //     handler() {
        //         const data = useCurrentPregnanciesStore();
        //         this.lmnp;
        //     },
        //     deep: true,
        // },
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        // ...mapState(useObstreticHistoryStore, ["preterm", "prevPregnancies", "Complications", "modeOfDelivery"]),
        // ...mapState(useMedicalHistoryStore, ["medicalHistory", "allegy", "exisitingChronicHealthConditions"]),
        // ...mapState(useCurrentPregnanciesStore, ["palpation", "tetanus", "lmnp", "ultrasound"]),
        // ...mapState(useMedicationStore, ["Medication"]),
        // ...mapState(useWomanBehaviourStore, ["dailyCaffeineIntake", "Tobacco"]),
    },
    mounted() {
        this.markWizard();
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {},
        getSaveFunction() {},
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },

        async saveData() {
            // const store = useObstreticHistoryStore();
            // const isFormValid = await store.validate();
            // if (!isFormValid) {
            //     toastDanger("The form has errors");
            //     return;
            // }
            // await this.saveProfile();
            // await await resetPatientData();
        },
        async validations(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },

        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics?.birthdate);
        },

        // async saveProfile() {
        //     const fields: any = ["", ""];
        //     if (
        //         await this.validations(
        //             this.exisitingChronicHealthConditions &&
        //                 this.Medication &&
        //                 this.dailyCaffeineIntake &&
        //                 this.Tobacco &&
        //                 this.tetanus &&
        //                 this.prevPregnancies,
        //             fields
        //         )
        //     ) {
        //         if (
        //             this.prevPregnancies &&
        //             // this.lmnp.length > 0
        //             // &&
        //             this.exisitingChronicHealthConditions &&
        //             this.allegy &&
        //             this.medicalHistory &&
        //             this.Complications &&
        //             // &&
        //             // this.preterm.length > 0
        //             this.Medication &&
        //             this.dailyCaffeineIntake

        //             //     //"preterm", "prevPregnancies", "Complications", "modeOfDelivery"
        //         ) {
        //             const userID: any = Service.getUserID();
        //             const profile = new currentPregnancyService(this.demographics.patient_id, userID);
        //             const encounter = await profile.createEncounter();
        //             if (!encounter) return toastWarning("Unable to create profile encounter");
        //             const patientStatus = await profile.saveObservationList(await this.buildProfile());
        //             if (!patientStatus) return toastWarning("Unable to create profile information!");
        //             await toastSuccess("Profile information have been created");
        //         }
        //         console.log("========>", await this.buildProfile());

        //         const number = this.modeOfDelivery.length / 2;
        //         const children = [];
        //         for (let i = 0; i < number; i++) {
        //             const value = getRadioSelectedValue(this.modeOfDelivery, `Mode of delivery ${i}`);
        //             const other = getFieldValue(this.modeOfDelivery, `Specify ${i}`, "value");
        //             children.push({ concept: "Mode of delivery", value, other });

        //             const concept_id = await ConceptService.getConceptID("Mode of delivery", true);
        //             console.log(";;;;;;;;", concept_id);
        //             const concept_other = await ConceptService.getConceptID("other", true);
        //             console.log(";;;;;;;;", concept_other);
        //             const obs_datetime = ConceptService.getSessionDate();
        //             const obs: any = children.map((child) => {
        //                 return {
        //                     concept_id: concept_id,
        //                     value_text: child.value,
        //                     obs_datetime,
        //                 };
        //             });
        //             const obs_service = ObservationService.saveObs(82, obs);
        //         }
        //         const age = HisDate.getAgeInYears(this.demographics?.birthdate);
        //         if (age < 19) {
        //             this.$router.push("headssAssessment");
        //         } else {
        //             this.$router.push("ANCHome");
        //         }
        //     } else {
        //         await toastWarning("Please complete all required fields");
        //     }
        // },

        // async buildProfile() {
        //     return [
        //         ...(await formatInputFiledData(this.prevPregnancies)),
        //         ...(await formatRadioButtonData(this.preterm)),
        //         ...(await formatCheckBoxData(this.Complications)),
        //         ...(await formatInputFiledData(this.Complications)),
        //         ...(await formatCheckBoxData(this.medicalHistory)),
        //         ...(await formatInputFiledData(this.medicalHistory)),
        //         ...(await formatCheckBoxData(this.exisitingChronicHealthConditions)),
        //         ...(await formatInputFiledData(this.exisitingChronicHealthConditions)),
        //         ...(await formatRadioButtonData(this.palpation)),
        //         ...(await formatRadioButtonData(this.tetanus)),
        //         ...(await formatRadioButtonData(this.lmnp)),
        //         ...(await formatRadioButtonData(this.ultrasound)),
        //         ...(await formatInputFiledData(this.ultrasound)),
        //         ...(await formatCheckBoxData(this.allegy)),
        //         ...(await formatInputFiledData(this.allegy)),
        //         ...(await formatCheckBoxData(this.Medication)),
        //         ...(await formatInputFiledData(this.Medication)),
        //         ...(await formatCheckBoxData(this.dailyCaffeineIntake)),
        //         ...(await formatRadioButtonData(this.Tobacco)),
        //     ];
        // },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
@/apps/ANC/store/profile/MedicationStore
