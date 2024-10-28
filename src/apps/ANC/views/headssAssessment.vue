<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepper-title="HEADSS Assessment"
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
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import Stepper from "@/components/Stepper.vue";
import { icons } from "@/utils/svg";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import headAssessment from "@/apps/ANC/components/others/headAssessment.vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { Service } from "@/services/service";
import { DangerSignsService } from "@/apps/ANC/service/danger_signs_service";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { mapState } from "pinia";
import { useHeadssAssessmentStore } from "@/apps/ANC/store/others/headsAssessmentStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { HeadssAssessmentService } from "@/apps/ANC/service/headss_assessment_service";
import { resetPatientData } from "@/services/reset_data";
import { getRadioSelectedValue, modifyRadioValue } from "@/services/data_helpers";
import { validateField } from "@/services/ANC/profile_validation_service";
import { useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";

export default defineComponent({
    name: "treatment",
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
        headAssessment,
        Stepper,
    },
    data() {
        return {
            iconsContent: icons,
            isOpen: true,
            wizardData: [
                {
                    title: "HEADSS assessment",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "HEADSS assessment",
                    component: "headAssessment",
                    value: "1",
                },
            ],
        };
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },
    watch: {
        headssAssesment: {
            handler() {
                this.headssAssesment;
            },
            deep: true,
        },
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useHeadssAssessmentStore, ["headssAssesment"]),
        "Who does the client live with"() {
            return getRadioSelectedValue(this.headssAssesment, "Who does the client live with");
        },
    },

    methods: {
        markWizard() {},
        getSaveFunction() {},
        async saveData() {
            this.saveHeadssAssesment();
            await resetPatientData();
        },
        async validations(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },
        async saveHeadssAssesment() {
            const fields: any = ["Who does the client live with"];
            if (await this.validations(this.headssAssesment, fields)) {
                if (this.headssAssesment.length > 0) {
                    const userID: any = Service.getUserID();
                    const headssAssesment = new HeadssAssessmentService(this.demographics.patient_id, userID);
                    const encounter = await headssAssesment.createEncounter();
                    if (!encounter) return toastWarning("Unable to create patient HEADSS assessment encounter");
                    const patientStatus = await headssAssesment.saveObservationList(await this.buildHeadssAssesment());
                    if (!patientStatus) return toastWarning("Unable to create patient HEADSS assessment  !");
                    toastSuccess("HEADSS assessment details have been created");

                    this.$router.push("contact");
                }
            } else {
                modifyRadioValue(this.headssAssesment, "Who does the client live with", "alertsErrorMassage", "This is a mandatory question");
                await toastWarning("Please complete all required fields");
            }

            console.log(await this.buildHeadssAssesment());
        },
        async buildHeadssAssesment() {
            return [
                ...(await formatCheckBoxData(this.headssAssesment)),
                ...(await formatRadioButtonData(this.headssAssesment)),
                ...(await formatInputFiledData(this.headssAssesment)),
            ];
        },
    },
});
</script>

<style scoped></style>
@/apps/ANC/store/others/headsAssessmentStore
