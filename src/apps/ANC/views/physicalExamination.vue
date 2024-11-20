<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Physical examination"
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
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastDanger } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/apps/ANC/store/physical exam/ANCVitalsStore";
import { VitalsService } from "@/services/ANC/anc_vitals_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { getCheckboxSelectedValue, getFieldValue } from "@/services/data_helpers";
import { formatInputFiledData } from "@/services/formatServerData";
import { formatCheckBoxData } from "@/services/formatServerData";
import {
    VitalsInstance,
    FetalPresentationInstance,
    PresentingSignsInstance,
    MaternalExamService,
    AbdominalAssessmentService,
    PresentingSignsService,
} from "@/apps/ANC/service/physical_exam";
import { useMaternalExamStore } from "@/apps/ANC/store/physical exam/MaternalExamStore";
import { formatRadioButtonData } from "@/services/formatServerData";
import { useFetalAssessment } from "../store/physical exam/FetalAssessmentStore";
import { useFetalPresentationStore } from "../store/physical exam/FetalPresantationStore";
import { usePresentingSigns } from "../store/physical exam/PresentingSignsStore";
import { resetPatientData } from "@/services/reset_data";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
import HisDate from "@/utils/Date";
import { useAncEndStore } from "@/apps/ANC/store/ancEnd/ancEndStore";
import {useANCVitalsStore} from "@/apps/ANC/store/physical exam/VitalsStore";
export default defineComponent({
    name: "PhysicalExam",
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
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Vitals",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Maternal exam",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Abdominal examination",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Presenting signs for IPV",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Vitals",
                    component: "ANCVitals",
                    value: "1",
                },
                {
                    title: "Maternal exam",
                    component: "MaternalExam",
                    value: "2",
                },
                {
                    title: "Abdominal examination",
                    component: "AbdominalExamination",
                    value: "3",
                },
                {
                    title: "Presenting signs or conditions for IPV ",
                    component: "PresentingSigns",
                    value: "4",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useANCVitalsStore, ["vitals"]),
        ...mapState(useMaternalExamStore, ["respiratory", "pallor", "breastExam", "vaginalInspection", "cervicalExam", "oedemaPresence"]),
        ...mapState(useFetalAssessment, ["fetalAssessment", "fetalDetails"]),
        ...mapState(usePresentingSigns, ["presentingSigns"]),
    },
    mounted() {
        this.markWizard();
    },
    watch: {
        vitals: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        DangerSigns: {
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
        diagnosis: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
    },
    setup() {
        return { chevronBackOutline, checkmark, hasValidationErrors: [] as any };
    },

    methods: {
        markWizard() {
            // if(this.vitals.validationStatus){
            // this.wizardData[0].checked = true;
            // this.wizardData[0].class = "open_step common_step";
            // }else{
            //   this.wizardData[0].checked = false;
            // }
            // if(this.DangerSigns[0].selectdData.length > 0){
            //   this.wizardData[1].checked = true;
            //   this.wizardData[1].class = 'open_step common_step'
            // }else{
            //   this.wizardData[1].checked = false;
            // }
            // if (this.diagnosis[0].selectdData.length > 0) {
            //     this.wizardData[2].checked = true;
            //     this.wizardData[2].class = "open_step common_step";
            // } else {
            //     this.wizardData[2].checked = false;
            // }
        },
        getSaveFunction() {},
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
        async saveData() {
            const areVitalsValid = await this.validaterowData();
            if (areVitalsValid) {
                toastDanger("Vitals form has errors");
                return;
            }
            const store = useFetalAssessment();
            const isFormValid = await store.validate();
            if (!isFormValid) {
                toastDanger("Abdominal exam section has errors");
                return;
            }
            this.saveVitals();
            this.saveMaternalExam();
            this.saveAbdominalExam();
            this.savePresentingSigns();
            await this.$router.push("contact");
            await resetPatientData();
        },

        async buildVitals() {
            return [
                ...(await formatInputFiledData(this.vitals)),
                ...(await formatCheckBoxData(this.vitals)),
                // ...(await formatCheckBoxData(this.preEclampsia))
            ];
        },
        async buildMaternalExam() {
            return [
                ...(await formatRadioButtonData(this.pallor)),
                ...(await formatCheckBoxData(this.pallor)),
                ...(await formatInputFiledData(this.pallor)),
                ...(await formatRadioButtonData(this.respiratory)),
                ...(await formatCheckBoxData(this.respiratory)),
                ...(await formatInputFiledData(this.respiratory)),
                ...(await formatCheckBoxData(this.breastExam)),
                ...(await formatInputFiledData(this.breastExam)),
                ...(await formatRadioButtonData(this.breastExam)),
                ...(await formatCheckBoxData(this.vaginalInspection)),
                ...(await formatInputFiledData(this.vaginalInspection)),
                ...(await formatRadioButtonData(this.vaginalInspection)),
                ...(await formatCheckBoxData(this.cervicalExam)),
                ...(await formatInputFiledData(this.cervicalExam)),
                ...(await formatRadioButtonData(this.cervicalExam)),
                ...(await formatCheckBoxData(this.oedemaPresence)),
                ...(await formatInputFiledData(this.oedemaPresence)),
                ...(await formatRadioButtonData(this.oedemaPresence)),
            ];
        },

        async buildAbdominalExam() {
            return [
                ...(await formatInputFiledData(this.fetalAssessment)),
                ...(await formatRadioButtonData(this.fetalAssessment)),
                ...(await formatCheckBoxData(this.fetalAssessment)),
                ...(await formatInputFiledData(this.fetalDetails)),
                ...(await formatRadioButtonData(this.fetalDetails)),
                ...(await formatCheckBoxData(this.fetalDetails)),
            ];
        },

        async buildPresentingSigns() {
            return [
                ...(await formatInputFiledData(this.presentingSigns)),
                ...(await formatRadioButtonData(this.presentingSigns)),
                ...(await formatCheckBoxData(this.presentingSigns)),
            ];
        },

        async saveVitals() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            await vitalsInstance.onFinish(this.vitals);
        },
        async validaterowData(): Promise<boolean> {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            const age = HisDate.getAgeInYears(this.demographics?.birthdate);

            // Reset validation errors for new validation
            this.hasValidationErrors = []; // Clear previous errors
            let hasErrors = false; // Flag to track if any errors exist

            // Validate each section of vitals
            this.vitals.forEach((section: any, sectionIndex: any) => {
                if (section?.data?.rowData) {
                    section.data.rowData.forEach((col: any, colIndex: any) => {
                        col.colData.some((input: any, inputIndex: any) => {
                            const validateResult = vitalsInstance.validator(input);
                            // Check for errors based on age condition
                            if (input.name === "Respiratory rate" && age <= 5) {
                                if (validateResult?.length > 0) {
                                    hasErrors = true; // Set hasErrors to true if validation fails
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage =
                                        validateResult.flat(Infinity)[0];
                                } else {
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = "";
                                }
                            } else {
                                // General validation for other inputs
                                if (validateResult?.length > 0) {
                                    hasErrors = true; // Set hasErrors to true if validation fails
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage =
                                        validateResult.flat(Infinity)[0];
                                } else {
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = "";
                                }
                            }

                            return false; // Continue looping through the column data
                        });
                    });
                }
            });

            // Update validation status
            this.vitals.validationStatus = !hasErrors;

            // Return whether there were errors
            return hasErrors; // If true, there were errors; if false, validation passed
        },

        async saveMaternalExam() {
            if (this.pallor.length >= 0 || this.cervicalExam.length >= 0 || this.vaginalInspection.length >= 0 || this.breastExam.length >= 0) {
                const userID: any = Service.getUserID();
                const maternalExam = new MaternalExamService(this.demographics.patient_id, userID);
                const encounter = await maternalExam.createEncounter();
                if (!encounter) return toastWarning("Unable to create maternal exam encounter");
                const patientStatus = await maternalExam.saveObservationList(await this.buildMaternalExam());
                if (!patientStatus) return toastWarning("Unable to create maternal exam details!");
                toastSuccess("Maternal exam details have been created");
            }
            console.log(await this.buildMaternalExam());
        },

        async saveAbdominalExam() {
            if (this.fetalAssessment.length >= 0 || this.fetalDetails.length >= 0) {
                const userID: any = Service.getUserID();
                const abdominalExam = new AbdominalAssessmentService(this.demographics.patient_id, userID);
                const encounter = await abdominalExam.createEncounter();
                if (!encounter) return toastWarning("Unable to create abdominal exam encounter");
                const patientStatus = await abdominalExam.saveObservationList(await this.buildAbdominalExam());
                if (!patientStatus) return toastWarning("Unable to create abdominal exam details!");
                toastSuccess("Abdominal exam details have been created");
            }
            console.log(await this.buildAbdominalExam());
        },

        async savePresentingSigns() {
            if (this.presentingSigns.length >= 0) {
                const userID: any = Service.getUserID();
                const presentingSigns = new PresentingSignsService(this.demographics.patient_id, userID);
                const encounter = await presentingSigns.createEncounter();
                if (!encounter) return toastWarning("Unable to create presenting signs encounter");
                const patientStatus = await presentingSigns.saveObservationList(await this.buildPresentingSigns());
                if (!patientStatus) return toastWarning("Unable to create presenting signs details!");
                toastSuccess("Presenting signs details have been created");
            }
            console.log(await this.buildPresentingSigns());
        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
