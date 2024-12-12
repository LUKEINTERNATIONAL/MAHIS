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
import LabourVaccineHistory from "@/apps/LABOUR/components/labour profile/LabourVaccine.vue";
import LabourMedications from "@/apps/LABOUR/components/labour profile/LabourMedications.vue";
import LabourObstetricHistory from "@/apps/LABOUR/components/labour profile/LabourObstetricHistory.vue";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
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
import { useLabourCoplicationsStore } from "../stores/labour profile/labourComplications";
import { useLabourWomanBehaviourStore } from "../stores/labour profile/labourWomanBehaviour";
import { useLabourAllergiesStore } from "../stores/labour profile/labourAllergies";
import { useLabourPastSurgeriesStore } from "../stores/labour profile/labourPastSurgeries";
import { useLabourChronicHealthConditionsStore } from "../stores/labour profile/labourChronicHealthConditions";
import { useLabourVaccineStore } from "../stores/labour profile/labourVaccineHistory";
import { useLabourMedicationStore } from "../stores/labour profile/labourMedications";
import { useLabourObstreticHistoryStore } from "../stores/labour profile/labourObstetricHistory";

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
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useLabourCoplicationsStore, ["labourPrevPregnancies"]),
        ...mapState(useLabourWomanBehaviourStore, ["dailyCaffeineIntake"]),
        ...mapState(useLabourAllergiesStore, ["labourAllergies"]),
        ...mapState(useLabourPastSurgeriesStore, ["labourPastSurgeries"]),
        ...mapState(useLabourChronicHealthConditionsStore, ["labourChronicHealthConditions", "labourHivTest", "labourSyphilisTest"]),
        ...mapState(useLabourVaccineStore, ["labourTetanus"]),
        ...mapState(useLabourMedicationStore, ["LabourMedication"]),
        ...mapState(useLabourObstreticHistoryStore, ["prevPregnancies"]),
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
            this.saveLabourProfile();
            await await resetPatientData();
        },
        async validations(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },

        formatBirthdate() {
            return HisDate.getBirthdateAge(this.patient?.birthdate);
        },
        async saveLabourProfile() {
            if (
                this.labourPrevPregnancies &&
                this.dailyCaffeineIntake &&
                this.labourAllergies &&
                this.labourPastSurgeries &&
                this.labourChronicHealthConditions &&
                this.labourHivTest &&
                this.labourSyphilisTest &&
                this.labourTetanus &&
                this.LabourMedication &&
                this.prevPregnancies
            ) {
                const userID: any = Service.getUserID();
                const profile = new currentPregnancyService(this.patient.patientID, userID);
                const encounter = await profile.createEncounter();
                if (!encounter) return toastWarning("Unable to create profile encounter");
                const patientStatus = await profile.saveObservationList(await this.buildLabourProfile());
                if (!patientStatus) return toastWarning("Unable to create profile information!");
                await toastSuccess("LabourProfile information have been created");
            } else {
                await toastWarning("fail to save");
            }
            console.log("<<<<>>>", await this.buildLabourProfile());
        },

        openModal() {
            createModal(SaveProgressModal);
        },
        async buildLabourProfile() {
            return [
                ...(await formatCheckBoxData(this.labourPrevPregnancies)),
                ...(await formatCheckBoxData(this.dailyCaffeineIntake)),
                ...(await formatRadioButtonData(this.dailyCaffeineIntake)),
                ...(await formatCheckBoxData(this.labourAllergies)),
                ...(await formatCheckBoxData(this.labourPastSurgeries)),
                ...(await formatCheckBoxData(this.labourChronicHealthConditions)),
                ...(await formatCheckBoxData(this.labourHivTest)),
                ...(await formatCheckBoxData(this.labourSyphilisTest)),
                ...(await formatRadioButtonData(this.labourTetanus)),
                ...(await formatCheckBoxData(this.LabourMedication)),
                ...(await formatCheckBoxData(this.prevPregnancies)),
            ];
        },
    },
});
</script>

<style scoped></style>
@/apps/ANC/store/profile/MedicationStore
