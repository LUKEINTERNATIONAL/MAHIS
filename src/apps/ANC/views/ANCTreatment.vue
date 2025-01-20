<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Diagnosis and Treatment"
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
import { IonContent, IonHeader, IonItem, IonPage, IonList, IonTitle, IonToolbar, IonMenu } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import Stepper from "@/components/Stepper.vue";
import DiagnosisTreatment from "../components/Treatment/DiagnosisTreatment.vue";
import MedicationDispensed from "@/apps/ANC/components/Treatment/MedicationDispensed.vue";
import { icons } from "@/utils/svg";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import DiagnosisCounselling from "@/apps/ANC/components/Treatment/DiagnosisCounselling.vue";
import Immunization from "@/apps/ANC/components/Treatment/Immunization.vue";
//import IntimatePartner from "@/apps/ANC/components/Treatment/IntimatePartner.vue";
import Deworming from "@/apps/ANC/components/Treatment/Deworming.vue";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { mapState } from "pinia";
import { useDiagnosisStore } from "../store/diagnosisStore";
import { useMedicationDispensedStore } from "../store/medicationDispensed";
import { useImmunizationStore } from "../store/immunizationStore";
//import { useIntimatePartnerStore } from "../store/intimatePartnerStore";
import { useDewormingStore } from "../store/dewormingStore";
import { Service } from "@/services/service";
import { DiagnosisTreatmentService, ImmunizationService, MedicationDispensedService } from "@/services/anc_treatment_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { resetPatientData } from "@/services/reset_data";
import { getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { validateField } from "@/services/ANC/treatement_validation_service";
import StandardValidations from "@/validations/StandardValidations";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";

export default defineComponent({
    name: "Treatment",
    mixins: [SetUserRole, SetEncounter],

    components: {
        BasicFooter,
        IonContent,
        IonHeader,
        IonItem,
        IonPage,
        IonList,
        Toolbar,
        DemographicBar,
        IonMenu,
        IonTitle,
        IonToolbar,
        BasicInputField,
        Stepper,
        DiagnosisTreatment,
        MedicationDispensed,
        DiagnosisCounselling,
        Immunization,
        // IntimatePartner,
        Deworming,
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Diagnosis",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Medication dispensed",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Immunization",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                // {
                //     title: "Intimate Partner Violence",
                //     class: "common_step",
                //     checked: false,
                //     disabled: false,
                //     number: 4,
                //     last_step: "",
                // },
                {
                    title: "Deworming & Malaria Prophylaxis",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 4,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Diagnosis",
                    component: "DiagnosisTreatment",
                    value: "1",
                },
                {
                    title: "Medication Dispensed",
                    component: "MedicationDispensed",
                    value: "2",
                },
                {
                    title: "Immunization",
                    component: "Immunization",
                    value: "3",
                },
                // {
                //     title: "Intimate Partner Violence",
                //     component: "IntimatePartner",
                //     value: "4",
                // },
                {
                    title: "Deworming & Malaria Prophylaxis",
                    component: "Deworming",
                    value: "4",
                },
            ],
            isOpen: false,
            iconsContent: icons,
            //isLoading: false,
        };
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useDiagnosisStore, ["diagnoses"]),
        ...mapState(useMedicationDispensedStore, ["iron", "folicAcid"]),
        ...mapState(useImmunizationStore, ["ttDoses", "HepBCounselling", "HepB1", "HepB2", "HepB3", "hepBReason"]),
        // ...mapState(useIntimatePartnerStore, [
        //     "ipv",
        //     "additionalCare",
        //     "safety_assessment",
        //     "physical_violence",
        //     "beaten_pregnant",
        //     "woman_threatened",
        //     "constant_jealous",
        //     "strangling",
        //     "murder_threat",
        //     "referrals",
        // ]),
        ...mapState(useDewormingStore, ["treatment", "malaria"]),
        // ironPrescription(){return getFieldValue(this.iron,'iron Amount','value')},
        folicAcidPrescription() {
            return getRadioSelectedValue(this.folicAcid, "Folic acid");
        },
    },

    methods: {
        markWizard() {},
        getSaveFunction() {},
        async saveData() {
            this.saveDiagnosis();
            // this.saveMedicationDispensed();
            // this.saveCouselling();
            // this.saveImmunisation();
            // this.saveIntimatePartner();
            // this.saveDeworming();
            // await resetPatientData();
            this.$router.push("contact");
        },
        validationRules(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },
        async saveDiagnosis() {
            if (this.diagnoses.length > 0) {
                const userID: any = Service.getUserID();
                const medicationDispensed = new DiagnosisTreatmentService(this.patient.patientID, userID);
                const encounter = await medicationDispensed.createEncounter();
                if (!encounter) return toastWarning("Unable to create medication dispensed encounter");
                const patientStatus = await medicationDispensed.saveObservationList(await this.buildDiagnosis());
                if (!patientStatus) return toastWarning("Unable to create medication dispensed!");
                toastSuccess("Diagnosis saved");
            }
        },
        async saveMedicationDispensed() {
            if (this.folicAcid.length > 0) {
                const userID: any = Service.getUserID();
                const medicationDispensed = new MedicationDispensedService(this.patient.patientID, userID);
                const encounter = await medicationDispensed.createEncounter();
                if (!encounter) return toastWarning("Unable to create medication dispensed encounter");
                const patientStatus = await medicationDispensed.saveObservationList(await this.buildMedicationDispensed());
                if (!patientStatus) return toastWarning("Unable to create medication dispensed!");
                toastSuccess("Medication Dispensed saved");
            }
            console.log(await this.buildMedicationDispensed());
        },

        async saveImmunisation() {
            if (this.HepB1.length > 0) {
                const userID: any = Service.getUserID();
                const Immunisation = new ImmunizationService(this.patient.patientID, userID);
                const encounter = await Immunisation.createEncounter();
                if (!encounter) return toastWarning("Unable to create immunisation encounter");
                const patientStatus = await Immunisation.saveObservationList(await this.buildImmunisation());
                if (!patientStatus) return toastWarning("Unable to create Immunisation!");
                toastSuccess("Immunisation has been created");
            }
            console.log(await this.buildImmunisation());
        },
        async saveIntimatePartner() {
            console.log(await this.buildIntimatePartner());
        },
        async saveDeworming() {
            console.log(await this.buildDeworming());
        },
        async buildDiagnosis() {
            return [...(await formatCheckBoxData(this.diagnoses))];
        },
        async buildMedicationDispensed() {
            return [...(await formatRadioButtonData(this.iron))];
        },

        async buildImmunisation() {
            return [
                ...(await formatRadioButtonData(this.ttDoses)),
                ...(await formatRadioButtonData(this.HepBCounselling)),
                ...(await formatRadioButtonData(this.HepB1)),
                ...(await formatInputFiledData(this.HepB1)),
                ...(await formatRadioButtonData(this.HepB2)),
                ...(await formatRadioButtonData(this.HepB3)),
                ...(await formatRadioButtonData(this.hepBReason)),
            ];
        },
        async buildIntimatePartner() {
            return [
                // ...(await formatRadioButtonData(this.ipv)),
                // ...(await formatRadioButtonData(this.additionalCare)),
                // ...(await formatRadioButtonData(this.safety_assessment)),
                // ...(await formatRadioButtonData(this.physical_violence)),
                // ...(await formatRadioButtonData(this.beaten_pregnant)),
                // ...(await formatRadioButtonData(this.woman_threatened)),
                // ...(await formatRadioButtonData(this.constant_jealous)),
                // ...(await formatRadioButtonData(this.strangling)),
                // ...(await formatRadioButtonData(this.murder_threat)),
                // ...(await formatCheckBoxData(this.referrals)),
            ];
        },
        async buildDeworming() {
            return [...(await formatRadioButtonData(this.treatment)), ...(await formatRadioButtonData(this.malaria))];
        },
    },
});
</script>

<style scoped></style>
