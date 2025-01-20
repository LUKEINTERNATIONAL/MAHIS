<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepper-title="Lab test and imaging"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
                :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"
                :getSaveFunction="getSaveFunction"
            ></Stepper>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import Stepper from "@/components/Stepper.vue";
import { icons } from "@/utils/svg";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import Referral from "@/apps/ANC/components/referral/Referral.vue";
import { IonContent, IonHeader, IonItem, IonPage, IonList, IonMenu, IonTitle, IonToolbar } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { ReferralValidationSchema, useReferralStore } from "../store/referral/referralStore";
import { mapState } from "pinia";
import { formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { Service } from "@/services/service";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { resetPatientData } from "@/services/reset_data";
import { ConfirmPregnancyService } from "@/apps/ANC/service/confirm_pregnancy_service";
import { ReferralService } from "@/apps/ANC/service/referral_service";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
import * as yup from "yup";

export default defineComponent({
    name: "Home",
    mixins: [SetUserRole, SetEncounter],
    components: {
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
        Referral,
    },
    data() {
        return {
            iconsContent: icons,
            isOpen: false,
            wizardData: [
                {
                    title: "Referral",
                    class: "common_step",
                    checked: "",
                    disabled: false,
                    number: 1,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Referral",
                    component: "Referral",
                    value: "1",
                },
            ],
        };
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },
    computed: {
        ...mapState(useReferralStore, ["referralInfo"]),
        ...mapState(useDemographicsStore, ["patient"]),
    },
    methods: {
        markWizard() {},
        getSaveFunction() {},
        async saveData() {
            try {
                // Validate the entire referralInfo against the schema
                await ReferralValidationSchema.validate(this.referralInfo, { abortEarly: false });

                // Proceed with saving the referral if validation passes
                await this.saveReferral();
                await resetPatientData(); // Reset patient data after saving
                this.$router.push("ANCHome"); // Redirect to ANCHome after saving
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    // Handle specific field validation errors here
                    error.inner.forEach((err) => {
                        console.log(`Validation error in ${err.path}: ${err.message}`);
                    });
                    toastWarning("Please correct the highlighted errors before saving.");
                } else {
                    console.error("Unexpected error:", error);
                    toastWarning("An unexpected error occurred. Please try again.");
                }
            }
        },
        async buildReferral() {
            return [...(await formatRadioButtonData(this.referralInfo)), ...(await formatInputFiledData(this.referralInfo))];
        },

        async saveReferral() {
            if (this.referralInfo.length > 0) {
                const userID: any = Service.getUserID();
                const referral = new ReferralService(this.patient.patientID, userID);
                const encounter = await referral.createEncounter();
                if (!encounter) return toastWarning("Unable to create referral encounter");
                const patientStatus = await referral.saveObservationList(await this.buildReferral());
                if (!patientStatus) return toastWarning("Unable to create patient referral details!");
                toastSuccess("Referral details have been created");
            }
            console.log(await this.buildReferral());
        },
    },
});
</script>

<style scoped></style>
