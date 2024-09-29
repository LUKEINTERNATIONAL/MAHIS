<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Profile"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"

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
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import PastObstreticHistory from "@/apps/ANC/components/profile/PastObstreticHistory.vue";
import CurrentPregnancies from "../components/profile/CurrentPregnancies.vue";
import Medications from "../components/profile/Medications.vue";
import MedicalHistory from "@/apps/ANC/components/profile/MedicalHistory.vue";
import WomanBehaviour from "../components/profile/WomanBehaviour.vue";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
import { useMedicalHistoryStore } from "@/apps/ANC/store/profile/medicalHistoryStore";
import { useObstreticHistoryStore } from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import { useMedicationStore } from "@/apps/ANC/store/profile/MedicationStore";
import { useWomanBehaviourStore } from "@/apps/ANC/store/profile/womanBehaviourStore";
import { Service } from "@/services/service";
//import { ProfileService } from "@/services/anc_profile_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { Preterms } from "../service/preterm";
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
        PastObstreticHistory,
        WomanBehaviour,
        CurrentPregnancies,
        Medications,
        MedicalHistory,
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Past Obstetric History",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Medical History",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Current Pregnancy",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Medications",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },

                {
                    title: "Woman behaviour",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Past Obstetric History",
                    component: "PastObstreticHistory",
                    value: "1",
                },
                {
                    title: "Past Medical History",
                    component: "MedicalHistory",
                    value: "2",
                },
                {
                    title: "Current Pregnancy",
                    component: "CurrentPregnancies",
                    value: "3",
                },
                {
                    title: "Medications",
                    component: "Medications",
                    value: "4",
                },
                {
                    title: "Woman behaviour",
                    component: "WomanBehaviour",
                    value: "5",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {
        lmnp: {
            handler() {
                const data = useCurrentPregnanciesStore();
                this.lmnp;
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useObstreticHistoryStore, ["preterm", "prevPregnancies", "Complications", "modeOfDelivery"]),
        ...mapState(useMedicalHistoryStore, ["medicalHistory", "allegy", "exisitingChronicHealthConditions"]),
        ...mapState(useCurrentPregnanciesStore, ["palpation", "tetanus", "lmnp", "ultrasound"]),
        ...mapState(useMedicationStore, ["Medication"]),
        ...mapState(useWomanBehaviourStore, ["dailyCaffeineIntake", "Tobacco"]),
        // LNMPKnown() {
        //     return getRadioSelectedValue(this.lmnp, "LNMP Known?");
        // },
        // LMNP() {
        //     return getRadioSelectedValue(this.lmnp, "LMNP");
        // },
        // lmnpEED() {
        //     return getFieldValue(this.lmnp, "lmnpEED", "value");
        // },
        // lmnpGestationAge() {
        //     return getFieldValue(this.lmnp, "lmnpGestationAge", "value");
        // },
        // lmnpDate() {
        //     return getFieldValue(this.lmnp, "lmnpDate", "value");
        // },
        // UltrasoundDone() {
        //     return getRadioSelectedValue(this.ultrasound, "Ultrasound done?");
        // },
        // UltrasoundDate() {
        //     return getFieldValue(this.ultrasound, "Ultrasound", "value");
        // },
        // UltrasoundGestationAge() {
        //     return getFieldValue(this.ultrasound, "specify", "value");
        // },
        // GestationAgeByPalpationKnown() {
        //     return getRadioSelectedValue(this.palpation, "Gestation");
        // },
        // GestationAgeByPalpation() {
        //     return getFieldValue(this.palpation, "Gestation age by palpation", "value");
        // },
        // GestationAgeUsed() {
        //     return getRadioSelectedValue(this.palpation, "Gestation age to be used");
        // },
        // TetanusDosesForImmunisation() {
        //     return getRadioSelectedValue(this.tetanus, "The woman received tetanus doses for immunization?");
        // },
        // NumberOfUnderImmunisedDoses() {
        //     return getRadioSelectedValue(this.tetanus, "Number of tetanus doses");
        // },


        // tt1Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt2Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt3Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt4Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt5Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt6Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt7Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt8Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt9Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt10Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt11Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
        // tt12Date(){ return getFieldValue(this.tetanus, '12','value')},
        // tt13Date(){ return getFieldValue(this.tetanus, '13','value')},
        // tt14Date(){ return getFieldValue(this.tetanus, '14','value')},
        // tt15Date(){ return getFieldValue(this.tetanus, '15','value')},
        // ReasonTTVnotConducted(){ return getRadioSelectedValue(this.tetanus, 'Reason Tetanus toxoid (TT) was not conducted')},
        // DailyCaffeineIntake(){ return getCheckboxSelectedValue(this.dailyCaffeineIntake, 'Daily caffeine use')},
        // SubstanceAbuse(){ return getRadioSelectedValue(this.Tobacco, 'Recently quit tobacco products')},
        // SecondHandSmoke(){ return getRadioSelectedValue(this.Tobacco, 'Exposure to second hand smoke')},
        // ExistingChronicConditions(){ return getCheckboxSelectedValue(this.exisitingChronicHealthConditions, 'chronic conditions')},
        // Medications(){ return getCheckboxSelectedValue(this.Medication, 'Which medications is the woman currently prescribed?')},
        // Stillbirths(){ return getFieldValue(this.prevPregnancies, 'Stillbirths','value')},
        // LiveBirths(){ return getFieldValue(this.prevPregnancies, 'LiveBirths','value')},
        // Parity(){ return getFieldValue(this.prevPregnancies, 'Parity','value')},
        // Abortions(){ return getFieldValue(this.prevPregnancies, 'Abortions','value')},
    },
    mounted() {
        this.markWizard();
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {},
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },

         saveData() {
            this.saveProfile();
            resetPatientData();
        },
        async validations(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },

        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics?.birthdate);
        },

        async saveProfile() {
            //     "tt1Date","tt2Date","tt3Date","tt4Date","tt5Date","tt6Date","tt7Date","tt8Date","tt9Date","tt10Date","tt11Date","tt12Date","tt13Date","tt14Date",
            //     "tt15Date","ReasonTTVnotConducted","DailyCaffeineIntake","SubstanceAbuse","SecondHandSmoke","ExistingChronicConditions","Medications","Stillbirths",
            //     "LiveBirths","Parity","Abortions"
            const fields: any = ["", ""];
            // if (Validation.required(this.lmnp))
            if (
                await this.validations(
                    // this.lmnp &&
                        // this.ultrasound &&
                        // this.palpation &&
                        this.exisitingChronicHealthConditions &&
                        this.Medication &&
                        this.dailyCaffeineIntake &&
                        this.Tobacco &&
                        this.tetanus &&
                        this.prevPregnancies,
                    fields
                )
            ) {
                if (
                    this.prevPregnancies.length > 0 
                    &&
                    // this.lmnp.length > 0 
                    // &&
                    this.exisitingChronicHealthConditions.length > 0 
                    &&
                    this.allegy.length > 0 
                    &&
                    this.medicalHistory.length > 0 
                    &&
                    this.Complications.length > 0 
                    // &&
                    // this.preterm.length > 0 
                    &&
                    this.Medication.length > 0 
                    &&
                    this.dailyCaffeineIntake.length > 0
                    //"preterm", "prevPregnancies", "Complications", "modeOfDelivery"
                ) {
                    const userID: any = Service.getUserID();
                    const profile = new currentPregnancyService(this.demographics.patient_id, userID);
                    const encounter = await profile.createEncounter();
                    if (!encounter) return toastWarning("Unable to create profile encounter");
                    const patientStatus = await profile.saveObservationList(await this.buildProfile());
                    if (!patientStatus) return toastWarning("Unable to create profile information!");
                    await toastSuccess("Profile information have been created");
                }
                console.log("========>",await this.buildProfile())

                const number = this.modeOfDelivery.length / 2;
                const children = [];
                for (let i = 0; i < number; i++) {
                    const value = getRadioSelectedValue(this.modeOfDelivery, `Mode of delivery ${i}`);
                    const other = getFieldValue(this.modeOfDelivery, `Specify ${i}`, "value");
                    children.push({ concept: "Mode of delivery", value, other });

                    const concept_id = await ConceptService.getConceptID("Mode of delivery", true);
                    console.log(";;;;;;;;", concept_id);
                    const concept_other = await ConceptService.getConceptID("other", true);
                    console.log(";;;;;;;;", concept_other);
                    const obs_datetime = ConceptService.getSessionDate();
                    const obs: any = children.map((child) => {
                        return {
                            concept_id: concept_id,
                            value_text: child.value,
                            obs_datetime,
                        };
                    });
                    const obs_service = ObservationService.saveObs(82, obs);
                }
                const age = HisDate.getAgeInYears(this.demographics?.birthdate);
                if (age < 19) {
                    this.$router.push("headssAssessment");
                } else {
                    this.$router.push("contact");
                }
            } else {
                // modifyRadioValue(this.lmnp, "LNMP Known?", "alertsErrorMassage", "Value is required");
                // modifyFieldValue(this.lmnp, "lmnpDate", "alertsErrorMassage", "Value is required");

                await toastWarning("Please complete all required fields");
            }
        },

        async buildProfile() {
            return [
                ...(await formatInputFiledData(this.prevPregnancies)),
                ...(await formatRadioButtonData(this.preterm)),
                ...(await formatCheckBoxData(this.Complications)),
                ...(await formatInputFiledData(this.Complications)),
                ...(await formatCheckBoxData(this.medicalHistory)),
                ...(await formatInputFiledData(this.medicalHistory)),
                ...(await formatCheckBoxData(this.exisitingChronicHealthConditions)),
                ...(await formatInputFiledData(this.exisitingChronicHealthConditions)),
                ...(await formatRadioButtonData(this.palpation)),
                ...(await formatRadioButtonData(this.tetanus)),
                ...(await formatRadioButtonData(this.lmnp)),
                ...(await formatRadioButtonData(this.ultrasound)),
                ...(await formatInputFiledData(this.ultrasound)),
                ...(await formatCheckBoxData(this.allegy)),
                ...(await formatInputFiledData(this.allegy)),
                ...(await formatCheckBoxData(this.Medication)),
                ...(await formatInputFiledData(this.Medication)),
                ...(await formatCheckBoxData(this.dailyCaffeineIntake)),
                ...(await formatRadioButtonData(this.Tobacco)),
            ];
        },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
@/apps/ANC/store/profile/MedicationStore