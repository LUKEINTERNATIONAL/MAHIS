<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-content>
                <basic-form :contentData="vitals" @update:inputValue="validaterowData($event)" :initialData="initialData"> </basic-form>
            </ion-card-content>
        </ion-card>
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
import { useVitalsStore } from "@/apps/ANC/store/physical exam/VitalsStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import DynamicButton from "@/components/DynamicButton.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/ANC/anc_vitals_service";
import StandardValidations from "@/validations/StandardValidations";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import { getCheckboxSelectedValue, modifyCheckboxInputField, modifyCheckboxValue, modifyFieldValue } from "@/services/data_helpers";
import { ObservationService } from "@/services/observation_service";
import { PatientService } from "@/services/patient_service";
import { isEmpty } from "lodash";
import dayjs from "dayjs";

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
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
    },
   async mounted() {
        await this.setTodayVitals();
        const userID: any = Service.getUserID();
        this.vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
        await this.validaterowData("onload");
    },
    watch: {
        vitals: {
            handler() {
                this.checkHeight();
            },
            deep: true,
        },
        $route: {
            handler() {
                this.checkHeight();
                this.setTodayVitals();
                this.updateVitalsStores();
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {async setTodayVitals() {
            const array = ["Height (cm)", "Weight", "Systolic", "Diastolic", "Temp", "Pulse", "SP02", "Respiratory rate"];
            const mandatoryFields = ["Height (cm)", "Weight", "Systolic", "Diastolic", "Pulse"];
            const mandatoryDone = [] as any;
            const promises = array.map(async (item: any) => {
                const firstDate = await ObservationService.getFirstObsDatetime(this.demographics.patient_id, item);
                if (firstDate && HisDate.toStandardHisFormat(firstDate) == HisDate.currentDate()) {
                    if (item == "Weight") {
                        modifyCheckboxValue(this.vitals, "Height And Weight Not Done", "displayNone", true);
                    }
                    if (item == "Systolic") {
                        modifyCheckboxValue(this.vitals, "Blood Pressure Not Done", "displayNone", true);
                    }
                    if (item == "Pulse") {
                        modifyCheckboxValue(this.vitals, "Pulse Rate Not Done", "displayNone", true);
                    }
                    modifyFieldValue(
                        this.vitals,
                        item,
                        "value",
                        await ObservationService.getFirstValueNumber(this.demographics.patient_id, item, HisDate.currentDate())
                    );
                    modifyFieldValue(this.vitals, item, "disabled", true);
                    mandatoryDone.push("true");
                } else if (mandatoryFields.includes(item)) {
                    mandatoryDone.push("false");
                } else {
                    modifyFieldValue(this.vitals, item, "value", "");
                }
            });

            await Promise.all(promises);
            if (!mandatoryDone.includes("false")) {
                this.vitals[0].actionBtn = "Finish";
            } else {
                this.vitals[0].actionBtn = "Finish and Save";
            }
            return !mandatoryDone.includes("false");
        },
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
        },
        async checkHeight() {
            const patient = new PatientService();
            const lastHeight = await patient.getRecentHeightObs();
            if (!isEmpty(lastHeight)) {
                const patientAgeAtPrevRecordedHeight = dayjs(lastHeight["obs_datetime"]).diff(patient.getBirthdate(), "year");
                const recentHeight = lastHeight["value_numeric"];
                const recentHeightObsID = lastHeight["obs_id"];
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
        async validaterowData(inputData: any) {
            this.checkHeight();
            this.validationController(inputData);
            this.hasValidationErrors = [];

            this.vitals.forEach((section: any, sectionIndex: any) => {
                if (section?.data?.rowData) {
                    section?.data?.rowData.forEach((col: any, colIndex: any) => {
                        if (
                            (col.colData[0].inputHeader == "Systolic Pressure*" &&
                                (inputData.inputHeader == "Systolic Pressure*" ||
                                    inputData.inputHeader == "Diastolic pressure*" ||
                                    inputData == "onload")) ||
                            (col.colData[0].inputHeader == "Systolic Pressure" && inputData?.col?.name == "Blood Pressure Not Done")
                        ) {
                            const isSystolicValid =
                                this.vitalsInstance.validator(col.colData[0]) == null && this.vitalsInstance.validator(col.colData[1]) == null;
                            this.BPStatus = isSystolicValid ? this.getBloodPressureStatus(col.colData[0].value, col.colData[1].value) : {};
                            this.updateBP(col.colData[0].value, col.colData[1].value);
                        }
                        if (
                            (col.colData[1].inputHeader == "Pulse rate*" && (inputData.inputHeader == "Pulse rate*" || inputData == "onload")) ||
                            (col.colData[1].inputHeader == "Pulse rate" && inputData?.col?.name == "Pulse Rate Not Done")
                        ) {
                            const isPulseValid = this.vitalsInstance.validator(col.colData[1]) == null;
                            const pulseStatus = isPulseValid ? this.getPulseRateStatus(col.colData[1].value) : {};
                            this.updateTemperateRate("pulse", col.colData[1].value + " BMP", pulseStatus, 4);
                        }
                        if (col.colData[0].value && col.colData[0].inputHeader == "Temperature") {
                            const isTempValid = this.vitalsInstance.validator(col.colData[0]) == null;
                            const tempStatus = isTempValid ? this.getTemperatureStatus(col.colData[0].value) : {};
                            this.updateTemperateRate("temp", col.colData[0].value + "°C", tempStatus, 4);
                        }
                        if (col.colData[0].inputHeader == "Respiratory rate") {
                            const isRespiratoryValid = this.vitalsInstance.validator(col.colData[0]) == null;
                            const respiratoryStatus = isRespiratoryValid ? this.getRespiratoryRateStatus(col.colData[0].value) : {};
                            this.updateTemperateRate("respiratory", col.colData[0].value + "BMP", respiratoryStatus, 6);
                        }
                        if (col.colData[1].value && col.colData[1].inputHeader == "Oxygen saturation") {
                            const isOxygenValid = this.vitalsInstance.validator(col.colData[1]) == null;
                            const oxygenStatus = isOxygenValid ? this.getOxygenSaturationStatus(col.colData[1].value) : {};
                            this.updateTemperateRate("oxygen", col.colData[1].value + "%", oxygenStatus, 6);
                        }

                        if (
                            (col.colData[0].inputHeader == "Height*" &&
                                (inputData.inputHeader == "Height*" || inputData.inputHeader == "Weight*" || inputData == "onload")) ||
                            (col.colData[0].inputHeader == "Height" && inputData?.col?.name == "Height And Weight Not Done")
                        ) {
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
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = true;
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage =
                                        validateResult.flat(Infinity)[0];
                                    return true;
                                }
                            } else {
                                this.hasValidationErrors.push("true");
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = false;
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
            if (this.demographics.gender && this.demographics.birthdate && weight && height) {
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height),
                    this.demographics.gender,
                    HisDate.calculateAge(this.demographics.birthdate, HisDate.currentDate())
                );
                console.log("🚀 ~ setBMI ~ this.BMI:", this.BMI);
                this.updateBMI();
            }
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
        async updateTemperateRate(name: any, index: any, obj: any, objNumber: any) {
            const filteredArray = this.vitals[objNumber]?.alerts?.filter((item: any) => item.name !== name);
            this.vitals[objNumber].alerts = filteredArray;
            const bpColor = obj?.colors ?? [];
            this.vitals[objNumber]?.alerts.push({
                backgroundColor: bpColor[0],
                status: "",
                icon: "",
                textColor: bpColor[1],
                value: obj?.value ?? "",
                name: name,
                index: index,
            });
            console.log(this.vitals[4]?.alerts);
        },
        getBloodPressureStatus(systolic: any, diastolic: any) {
            if (systolic && diastolic) {
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
                    return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low BP " };
                } else if (systolic >= minSystolic && systolic <= maxSystolic && diastolic >= minDiastolic && diastolic <= maxDiastolic) {
                    return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal BP " };
                } else if (systolic > 140 && diastolic > 90) {
                    return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "High BP" };
                } else {
                    // Diastolic pressure is not within normal range, consider only systolic pressure
                    if (systolic < minSystolic) {
                        return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low BP " + " (Using Systolic Only)" };
                    } else if (systolic >= minSystolic && systolic <= maxSystolic) {
                        return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal BP " + " (Using Systolic Only)" };
                    } else {
                        return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "High BP " + " (Using Systolic Only)" };
                    }
                }
            }
        },

        getTemperatureStatus(value: any) {
            if (value) {
                let ageGroup;
                let minTemp;
                let maxTemp;
                const patient = new PatientService();
                const age = patient.getAge();
                // Determine age group and corresponding normal ranges base on Axillary
                if (age <= 1) {
                    ageGroup = "(less than 1 year)";
                    minTemp = 35.5;
                    maxTemp = 37.4;
                } else if (age >= 1 && age <= 18) {
                    ageGroup = "(1-18 years)";
                    minTemp = 35.5;
                    maxTemp = 37.4;
                } else if (age >= 19 && age <= 64) {
                    ageGroup = "(above 18 years)";
                    minTemp = 35.5;
                    maxTemp = 37.4;
                } else if (age >= 65) {
                    ageGroup = "(above 18 years)";
                    minTemp = 35.5;
                    maxTemp = 37.4;
                } else {
                    minTemp = "";
                    maxTemp = "";
                }

                if (value < minTemp) {
                    return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low Temperature " };
                } else if (value >= minTemp && value <= maxTemp) {
                    return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal Temperature " };
                } else if (value > maxTemp) {
                    return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "High Temperature " };
                }
            }
        },
        getPulseRateStatus(value: any) {
            if (value) {
                let ageGroup;
                let minPulse;
                let maxPulse;
                const patient = new PatientService();
                const age = patient.getAge();
                // Determine age group and corresponding normal ranges base on Axillary
                if (age <= 0.08) {
                    ageGroup = "(0-1 month)";
                    minPulse = 70;
                    maxPulse = 190;
                } else if (age >= 0.08 && age < 1) {
                    ageGroup = "(1-11 months)";
                    minPulse = 80;
                    maxPulse = 160;
                } else if (age >= 1 && age <= 2) {
                    ageGroup = "(1-2 years)";
                    minPulse = 80;
                    maxPulse = 130;
                } else if (age >= 3 && age <= 4) {
                    ageGroup = "(3-4 years)";
                    minPulse = 80;
                    maxPulse = 120;
                } else if (age >= 5 && age <= 6) {
                    ageGroup = "(5-6 years)";
                    minPulse = 75;
                    maxPulse = 115;
                } else if (age >= 7 && age <= 9) {
                    ageGroup = "(7-9 years)";
                    minPulse = 70;
                    maxPulse = 110;
                } else if (age >= 10) {
                    ageGroup = "(Above 10 years)";
                    minPulse = 60;
                    maxPulse = 100;
                } else {
                    minPulse = "";
                    maxPulse = "";
                }

                if (value < minPulse) {
                    return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low Pulse Rate " };
                } else if (value >= minPulse && value <= maxPulse) {
                    return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal Pulse Rate " };
                } else if (value > maxPulse) {
                    return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "High Pulse Rate " };
                }
            }
        },
        getOxygenSaturationStatus(value: any) {
            if (value) {
                let minOxygenSaturation = 95;
                let maxOxygenSaturation = 100;

                if (value < minOxygenSaturation) {
                    return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low oxygen saturation" };
                } else if (value >= minOxygenSaturation && value <= maxOxygenSaturation) {
                    return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal oxygen saturation" };
                }
            }
        },
        getRespiratoryRateStatus(value: any) {
            if (value) {
                let ageGroup;
                let minRespiratoryRate;
                let maxRespiratoryRate;
                const patient = new PatientService();
                const age = patient.getAge();
                // Determine age group and corresponding normal ranges base on Axillary
                if (age <= 1) {
                    ageGroup = "(0-1 year)";
                    minRespiratoryRate = 30;
                    maxRespiratoryRate = 60;
                } else if (age >= 1 && age < 3) {
                    ageGroup = "(1-3 years)";
                    minRespiratoryRate = 24;
                    maxRespiratoryRate = 40;
                } else if (age >= 3 && age <= 6) {
                    ageGroup = "(3-6 years)";
                    minRespiratoryRate = 22;
                    maxRespiratoryRate = 34;
                } else if (age >= 6 && age <= 12) {
                    ageGroup = "(6-12 years)";
                    minRespiratoryRate = 18;
                    maxRespiratoryRate = 30;
                } else if (age >= 12 && age <= 18) {
                    ageGroup = "(12-18 years)";
                    minRespiratoryRate = 12;
                    maxRespiratoryRate = 16;
                } else if (age >= 19) {
                    ageGroup = "(Above 19 years)";
                    minRespiratoryRate = 12;
                    maxRespiratoryRate = 20;
                } else {
                    minRespiratoryRate = "";
                    maxRespiratoryRate = "";
                }

                if (value < minRespiratoryRate) {
                    return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low respiratory rate" };
                } else if (value >= minRespiratoryRate && value <= maxRespiratoryRate) {
                    return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal respiratory rate" };
                } else if (value > maxRespiratoryRate) {
                    return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "High respiratory rate" };
                }
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
.category {
    width: 400px;
    height: 70px;
    background-color: #ddeedd;
    border-radius: 0.99%;
    color: #016302;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
}

.categories {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
ion-card {
    width: 100%;
    color: black;
}
.sub_item_header {
    font-weight: bold;
    font-size: medium;
}
</style>
