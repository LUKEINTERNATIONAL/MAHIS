<template>
    <basic-form :contentData="vitals" @update:inputValue="validateRowData($event)"></basic-form>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Previous measurements</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <PreviousVitals />
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-row>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useVitalsStore } from "@/apps/NCD/stores/VitalsStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import { ObservationService } from "@/services/observation_service";
import { PatientService } from "@/services/patient_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { find, isEmpty } from "lodash";
import dayjs from "dayjs";
import Validation from "@/validations/StandardValidations";
import { validateInputFiledData } from "@/services/group_validation";
import VitalsMixin from "@/views/Mixin/VitalsMixin.vue";
import { getOfflineFirstObsValue } from "@/services/offline_service";
export default defineComponent({
    mixins: [VitalsMixin],
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        BasicInputField,
        BasicForm,
        PreviousVitals,
    },
    data() {
        return {
            iconsContent: icons,
            saveBtnStatus: {} as any,
            TempStatus: {} as any,
            PulseStatus: {} as any,
            RespiratoryStatus: {} as any,
            OxygenStatus: {} as any,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            validationStatus: { heightWeight: false, bloodPressure: false } as any,
        };
    },
    watch: {
        $route: {
            async handler() {
                this.vitalsData = this.vitals;
                this.cleanVitalForm();
                await this.setTodayVitals();
                await this.validateRowData("onload");
                this.updateVitalsStores();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useVitalsStore, ["vitals"]),
    },
    async mounted() {
        this.updateVitalsStores();
        this.vitalsData = this.vitals;
        await this.checkHeight();
        await this.validateRowData("onload");
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        cleanVitalForm() {
            const vitals = useVitalsStore();
            vitals.setVitals(vitals.getInitialVitals());
        },

        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        updateVitalsStores() {
            const vitalsStore = useVitalsStore();
            vitalsStore.setVitals(vitalsStore.getInitialVitals());
        },
        async validationController(inputData: any) {
            if (inputData?.col?.name == "Height And Weight Not Done" && inputData.col.checked) {
                modifyCheckboxInputField(this.vitals, "Height Weight Reason", "displayNone", false);
                modifyFieldValue(this.vitals, "Height (cm)", "disabled", true);
                modifyFieldValue(this.vitals, "Weight", "disabled", true);
                modifyFieldValue(this.vitals, "Height (cm)", "inputHeader", "Height");
                modifyFieldValue(this.vitals, "Weight", "inputHeader", "Weight");
                modifyFieldValue(this.vitals, "Height (cm)", "value", "");
                modifyFieldValue(this.vitals, "Weight", "value", "");
                this.validationStatus.heightWeight = false;
            } else if (inputData?.col?.name == "Height And Weight Not Done") {
                modifyCheckboxInputField(this.vitals, "Height Weight Reason", "displayNone", true);
                modifyFieldValue(this.vitals, "Height (cm)", "disabled", false);
                modifyFieldValue(this.vitals, "Weight", "disabled", false);
                modifyFieldValue(this.vitals, "Height (cm)", "inputHeader", "Height*");
                modifyFieldValue(this.vitals, "Weight", "inputHeader", "Weight*");
                this.validationStatus.heightWeight = true;
            }
            if (inputData?.col?.name == "Blood Pressure Not Done" && inputData.col.checked) {
                modifyCheckboxInputField(this.vitals, "Blood Pressure Reason", "displayNone", false);
                modifyFieldValue(this.vitals, "Systolic", "disabled", true);
                modifyFieldValue(this.vitals, "Diastolic", "disabled", true);
                modifyFieldValue(this.vitals, "Systolic", "inputHeader", "Systolic Pressure");
                modifyFieldValue(this.vitals, "Diastolic", "inputHeader", "Diastolic pressure");
                modifyFieldValue(this.vitals, "Systolic", "value", "");
                modifyFieldValue(this.vitals, "Diastolic", "value", "");
                this.validationStatus.bloodPressure = false;
            } else if (inputData?.col?.name == "Blood Pressure Not Done") {
                modifyCheckboxInputField(this.vitals, "Blood Pressure Reason", "displayNone", true);
                modifyFieldValue(this.vitals, "Systolic", "disabled", false);
                modifyFieldValue(this.vitals, "Diastolic", "disabled", false);
                modifyFieldValue(this.vitals, "Systolic", "inputHeader", "Systolic Pressure*");
                modifyFieldValue(this.vitals, "Diastolic", "inputHeader", "Diastolic pressure*");
                modifyFieldValue(this.vitals, "Systolic", "value", "");
                modifyFieldValue(this.vitals, "Diastolic", "value", "");
                this.validationStatus.bloodPressure = true;
            }
            if (inputData?.col?.name == "Pulse Rate Not Done" && inputData.col.checked) {
                modifyCheckboxInputField(this.vitals, "Pulse Rate Reason", "displayNone", false);
                modifyFieldValue(this.vitals, "Pulse", "disabled", true);
                modifyFieldValue(this.vitals, "Pulse", "inputHeader", "Pulse rate");
                modifyFieldValue(this.vitals, "Pulse", "value", "");
                this.validationStatus.bloodPressure = false;
            } else if (inputData?.col?.name == "Pulse Rate Not Done") {
                modifyCheckboxInputField(this.vitals, "Pulse Rate Reason", "displayNone", true);
                modifyFieldValue(this.vitals, "Pulse", "disabled", false);
                modifyFieldValue(this.vitals, "Pulse", "inputHeader", "Pulse rate*");
                modifyFieldValue(this.vitals, "Pulse", "value", "");
                this.validationStatus.bloodPressure = true;
            }
            if (inputData?.col?.name == "Respiratory rate Not Done" && inputData.col.checked) {
                modifyCheckboxInputField(this.vitals, "Respiratory rate Reason", "displayNone", false);
                modifyFieldValue(this.vitals, "Respiratory rate", "disabled", true);
                modifyFieldValue(this.vitals, "Respiratory rate", "inputHeader", "Respiratory rate");
                modifyFieldValue(this.vitals, "Respiratory rate", "value", "");
                this.validationStatus.bloodPressure = false;
            } else if (inputData?.col?.name == "Respiratory rate Not Done") {
                modifyCheckboxInputField(this.vitals, "Respiratory rate Reason", "displayNone", true);
                modifyFieldValue(this.vitals, "Respiratory rate", "disabled", false);
                modifyFieldValue(this.vitals, "Respiratory rate", "inputHeader", "Respiratory rate*");
                modifyFieldValue(this.vitals, "Respiratory rate", "value", "");
                this.validationStatus.bloodPressure = true;
            }
            // await validateInputFiledData(this.vitals);
        },
        async checkHeight() {
            const vitals = [...(this.patient?.vitals?.saved || []), ...(this.patient?.vitals?.unsaved || [])];
            const recentHeight: any = await getOfflineFirstObsValue(vitals, "value_numeric", 5090);
            const obs_datetime: any = await getOfflineFirstObsValue(vitals, "obs_datetime", 5090);
            const patient = new PatientService();
            if (!isEmpty(recentHeight)) {
                const patientAgeAtPrevRecordedHeight = dayjs(obs_datetime).diff(patient.getBirthdate(), "year");
                /**
                 * For a scenario where a patient's height was last updated when they were a minor
                 * and they return as an adult, provide an option to update their height.
                 */
                if (!(patientAgeAtPrevRecordedHeight < 18 || patient.getAge() < 18)) {
                    modifyFieldValue(this.vitals, "Height", "disabled", true);
                    modifyFieldValue(this.vitals, "Height", "value", recentHeight);
                }
            }
        },
        async validateRowData(inputData: any) {
            if (inputData != "onload") {
                await this.validationController(inputData);
                const height = getFieldValue(this.vitals, "Height (cm)", "value");
                const weight = getFieldValue(this.vitals, "Weight", "value");
                const systolic = getFieldValue(this.vitals, "Systolic", "value");
                const diastolic = getFieldValue(this.vitals, "Diastolic", "value");
                const temp = getFieldValue(this.vitals, "Temperature", "value");
                const pulse = getFieldValue(this.vitals, "Pulse", "value");
                const respiratoryRate = getFieldValue(this.vitals, "Respiratory rate", "value");
                const SAO2 = getFieldValue(this.vitals, "SAO2", "value");

                await this.setBMI(height, weight);
                await this.updateBP(systolic, diastolic);

                const pulseStatus = this.getPulseRateStatus(pulse);
                await this.updateRate("pulse", pulse, " BMP", pulseStatus, 4);

                const tempStatus = this.getTemperatureStatus(temp);
                this.updateRate("temp", temp, "°C", tempStatus, 4);

                const respiratoryStatus = this.getRespiratoryRateStatus(respiratoryRate);
                this.updateRate("respiratory", respiratoryRate, "BMP", respiratoryStatus, 6);

                const oxygenStatus = this.getOxygenSaturationStatus(SAO2);
                this.updateRate("oxygen", SAO2, "%", oxygenStatus, 6);
            }
        },
    },
});
</script>

<style scoped>
.vitals_title {
    border-bottom: 1px solid #b3b3b3;
    margin-bottom: 50px;
}
.input-with-icon {
    position: relative;
}
.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray; /* Adjust the color as needed */
}
ion-col {
    padding-bottom: 15px;
}
h5 {
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
