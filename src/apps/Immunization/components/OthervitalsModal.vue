<template>
    <div class="modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">Other Vitals</div>
            <div>Todays Date: <span></span> 06 Jul 2024</div>
        </div>
        <div class="">
            <basic-form :contentData="vitals" @update:inputValue="validaterowData($event)"></basic-form>
        </div>
        <div class="btnContent">
            <div class="saveBtn">
                <div>
                    <ion-button class="btnText" fill="solid">
                        Done today
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon>
                    </ion-button>
                </div>
                <div>or</div>
                <div>
                    <ion-button class="btnText" fill="solid">
                        Done earlier
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderWithPenEdit"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useVitalsStore } from "@/apps/Immunization/stores/OtherVitalsStores";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import { ObservationService } from "@/services/observation_service";
import { PatientService } from "@/services/patient_service";
import { useGeneralStore } from "@/stores/GeneralStore";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";

export default defineComponent({
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
            BMI: {} as any,
            BPStatus: {} as any,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            validationStatus: { heightWeight: false, bloodPressure: false } as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useGeneralStore, ["activities"]),
    },
    async serverPrefetch() {
        // Call updateVitalsStores when the component is activated
        this.updateVitalsStores();
    },
    async mounted() {
        const array = ["Height", "Weight", "Systolic", "Diastolic", "Temp", "Pulse", "SP02", "Respiratory rate"];

        // An array to store all promises
        const promises = array.map(async (item: any) => {
            if (
                HisDate.toStandardHisFormat(await ObservationService.getFirstObsDatetime(this.demographics.patient_id, item)) == HisDate.currentDate()
            ) {
                modifyFieldValue(
                    this.vitals,
                    item,
                    "value",
                    await ObservationService.getFirstValueNumber(this.demographics.patient_id, item, HisDate.currentDate())
                );
            }
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        // After all async operations are finished
        const userID: any = Service.getUserID();
        this.vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
        this.updateVitalsStores();
        this.validaterowData({});
    },
    watch: {
        vitals: {
            handler() {
                this.updateVitalsStores();
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        updateVitalsStores() {
            const vitalsStore = useVitalsStore();
            vitalsStore.setVitals(this.vitals);
        },
        validationController(inputData: any) {
            if (inputData?.col?.name == "Height And Weight Not Done" && inputData.col.checked) {
                modifyCheckboxInputField(this.vitals, "Height Weight Reason", "displayNone", false);
                modifyFieldValue(this.vitals, "Height", "disabled", true);
                modifyFieldValue(this.vitals, "Weight", "disabled", true);
                modifyFieldValue(this.vitals, "Height", "inputHeader", "Height");
                modifyFieldValue(this.vitals, "Weight", "inputHeader", "Weight");
                modifyFieldValue(this.vitals, "Height", "value", "");
                modifyFieldValue(this.vitals, "Weight", "value", "");
                this.validationStatus.heightWeight = false;
            } else if (inputData?.col?.name == "Height And Weight Not Done") {
                modifyCheckboxInputField(this.vitals, "Height Weight Reason", "displayNone", true);
                modifyFieldValue(this.vitals, "Height", "disabled", false);
                modifyFieldValue(this.vitals, "Weight", "disabled", false);
                modifyFieldValue(this.vitals, "Height", "inputHeader", "Height*");
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
        },
        async validaterowData(inputData: any) {
            this.validationController(inputData);
            this.hasValidationErrors = [];

            this.vitals.forEach((section: any, sectionIndex: any) => {
                if (section?.data?.rowData) {
                    section?.data?.rowData.forEach((col: any, colIndex: any) => {
                        if (col.colData[0].inputHeader == "Systolic Pressure*") {
                            const isSystolicValid =
                                this.vitalsInstance.validator(col.colData[0]) == null && this.vitalsInstance.validator(col.colData[1]) == null;
                            this.BPStatus = isSystolicValid ? this.getBloodPressureStatus(col.colData[0].value, col.colData[1].value) : {};
                            this.updateBP(col.colData[0].value, col.colData[1].value);
                        }

                        if (col.colData[0].inputHeader == "Height*") {
                            const isHeightValid =
                                this.vitalsInstance.validator(col.colData[0]) == null && this.vitalsInstance.validator(col.colData[1]) == null;
                            this.BMI = isHeightValid ? this.setBMI(col.colData[1].value, col.colData[0].value) : {};
                            this.updateBMI();
                        }

                        col.colData.some((input: any, inputIndex: any) => {
                            const validateResult = this.vitalsInstance.validator(input);
                            if (validateResult?.length > 0) {
                                this.hasValidationErrors.push("false");
                                if (input.inputHeader === inputData.inputHeader) {
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsError = true;
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage =
                                        validateResult.flat(Infinity)[0];
                                    return true;
                                }
                            } else {
                                this.hasValidationErrors.push("true");
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsError = false;
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = "";
                            }

                            return false;
                        });
                    });
                }
            });

            this.vitals.validationStatus = !this.hasValidationErrors.includes("false");
        },
        async setBMI(weight: any, height: any) {
            if (this.demographics.gender && this.demographics.birthdate) {
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height),
                    this.demographics.gender,
                    HisDate.calculateAge(this.demographics.birthdate, HisDate.currentDate())
                );
            }
            this.updateBMI();
        },
        async updateBMI() {
            const bmiColor = this.BMI?.color ?? [];
            const vitals = this.vitals[0].alerts[0];
            vitals.icon = BMIService.iconBMI(bmiColor);
            vitals.backgroundColor = bmiColor[0];
            vitals.textColor = bmiColor[1];
            vitals.index = "BMI " + this.BMI?.index ?? "";
            vitals.value = this.BMI?.result ?? "";
        },
        async updateBP(systolic: any, diastolic: any) {
            const vitals = this.vitals[2]?.alerts[0] ?? [];
            const bpColor = this.BPStatus?.colors ?? [];
            vitals.icon = iconBloodPressure(bpColor);
            vitals.backgroundColor = bpColor[0];
            vitals.textColor = bpColor[1];
            vitals.index = systolic + "/" + diastolic;
            vitals.value = this.BPStatus?.value ?? "";
        },
        getBloodPressureStatus(systolic: any, diastolic: any) {
            let ageGroup;
            let minSystolic;
            let maxSystolic;
            let minDiastolic;
            let maxDiastolic;
            const patient = new PatientService();
            const age = patient.getAge();
            // Determine age group and corresponding normal ranges
            if (age < 1) {
                ageGroup = "less than 1 year";
                minSystolic = 75;
                maxSystolic = 100;
                minDiastolic = 50;
                maxDiastolic = 70;
            } else if (age >= 1 && age < 6) {
                ageGroup = "1-5 years";
                minSystolic = 80;
                maxSystolic = 110;
                minDiastolic = 50;
                maxDiastolic = 80;
            } else if (age >= 6 && age < 13) {
                ageGroup = "6-13 years";
                minSystolic = 85;
                maxSystolic = 120;
                minDiastolic = 55;
                maxDiastolic = 80;
            } else if (age >= 13 && age < 18) {
                ageGroup = "13-18 years";
                minSystolic = 95;
                maxSystolic = 140;
                minDiastolic = 60;
                maxDiastolic = 90;
            } else {
                ageGroup = "above 18 years";
                minSystolic = 100;
                maxSystolic = 130;
                minDiastolic = 60;
                maxDiastolic = 90;
            }

            // Diastolic pressure is within normal range, check systolic pressure
            if (systolic < minSystolic && diastolic < minDiastolic) {
                return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low BP " + ageGroup };
            } else if (systolic >= minSystolic && systolic <= maxSystolic && diastolic >= minDiastolic && diastolic <= maxDiastolic) {
                return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal BP " + ageGroup };
            } else if (systolic > maxSystolic && diastolic > maxDiastolic) {
                return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "High BP " + ageGroup };
            } else {
                // Diastolic pressure is not within normal range, consider only systolic pressure
                if (systolic < minSystolic) {
                    return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low BP " + ageGroup + " (Using Systolic Only)" };
                } else if (systolic >= minSystolic && systolic <= maxSystolic) {
                    return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal BP " + ageGroup + " (Using Systolic Only)" };
                } else {
                    return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "High BP " + ageGroup + " (Using Systolic Only)" };
                }
            }
        },
    },
});
</script>

<style scoped>
.vitals_title {
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
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    line-height: 60px;
}
.vitalsContent {
    height: 500px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
    align-items: center;
}
.btnContent {
    display: flex;
    justify-content: center;
    line-height: 60px;
}
.modal_wrapper {
    padding: 0px 10px;
    background: #fff;
}
</style>
