<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput } from "@ionic/vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";
import { PatientService } from "@/services/patient_service";
import Validation from "@/validations/StandardValidations";
import { ObservationService } from "@/services/observation_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
    modifyCheckboxValue,
    modifyAlertsValue,
} from "@/services/data_helpers";
export default defineComponent({
    data: () => ({
        BMI: {} as any,
        BPStatus: {} as any,
        vitalsData: {} as any,
    }),
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    methods: {
        async setTodayVitals() {
            const array = ["Height (cm)", "Weight", "Systolic", "Diastolic", "Temperature", "Pulse", "SAO2", "Respiratory rate"];
            const age = HisDate.getAgeInYears(this.patient?.personInformation?.birthdate);
            const promises = array.map(async (item: any) => {
                const firstDate = await ObservationService.getFirstObsDatetime(this.patient.patientID, item);
                if (firstDate && HisDate.toStandardHisFormat(firstDate) == HisDate.currentDate()) {
                    if (item == "Weight") {
                        modifyCheckboxValue(this.vitalsData, "Height And Weight Not Done", "displayNone", true);
                    }
                    if (item == "Systolic") {
                        modifyCheckboxValue(this.vitalsData, "Blood Pressure Not Done", "displayNone", true);
                    }
                    if (item == "Pulse") {
                        modifyCheckboxValue(this.vitalsData, "Pulse Rate Not Done", "displayNone", true);
                    }
                    if (item == "Respiratory rate") {
                        modifyCheckboxValue(this.vitalsData, "Respiratory rate Not Done", "displayNone", true);
                    }
                    modifyFieldValue(
                        this.vitalsData,
                        item,
                        "value",
                        await ObservationService.getFirstValueNumber(this.patient.patientID, item, HisDate.currentDate())
                    );
                    modifyFieldValue(this.vitalsData, item, "disabled", true);
                } else {
                    modifyFieldValue(this.vitalsData, item, "value", "");
                }

                if (item === "Respiratory rate" && age <= 5) {
                    modifyFieldValue(this.vitalsData, item, "required", true);
                    modifyFieldValue(this.vitalsData, item, "inputHeader", "Respiratory rate*");
                }
            });

            await Promise.all(promises);
        },
        async setBMI(height: any, weight: any) {
            if (
                this.patient?.personInformation?.gender &&
                this.patient?.personInformation?.birthdate &&
                Validation.vitalsHeight(height) == null &&
                Validation.vitalsWeight(weight) == null
            ) {
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height),
                    this.patient?.personInformation?.gender,
                    HisDate.calculateAge(this.patient?.personInformation?.birthdate, HisDate.currentDate())
                );
            } else {
                this.BMI = {};
            }
            await this.updateBMI();
        },
        async updateBMI() {
            if (!this.vitalsData[0]) return;
            const bmiColor = this.BMI?.color ?? [];
            this.updateRate(
                "bmi",
                "BMI " + (this.BMI?.index ?? ""),
                "",
                { colors: bmiColor, value: this.BMI?.result ?? "" },
                BMIService.iconBMI(bmiColor)
            );
        },
        async updateBP(systolic: any, diastolic: any) {
            this.BPStatus = this.getBloodPressureStatus(systolic, diastolic);
            if (!(Validation.vitalsSystolic(systolic) == null && Validation.vitalsDiastolic(diastolic) == null)) this.BPStatus = {};
            const bpColor = this.BPStatus?.colors ?? [];
            this.updateRate(
                "bp",
                systolic + "/" + diastolic,
                "mmHg",
                { colors: bpColor, value: this.BPStatus?.value ?? "" },
                iconBloodPressure(bpColor)
            );
        },
        async updateRate(name: any, value: any, units: any, obj: any, icon: any = "") {
            if (!value) return;
            const index = value + " " + units;
            const bpColor = obj?.colors ?? [];
            modifyAlertsValue(this.vitalsData, name, "icon", icon || "");
            modifyAlertsValue(this.vitalsData, name, "textColor", bpColor[1]);
            modifyAlertsValue(this.vitalsData, name, "index", index);
            modifyAlertsValue(this.vitalsData, name, "backgroundColor", bpColor[0]);
            modifyAlertsValue(this.vitalsData, name, "value", obj?.value ?? "");
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
            if (value && Validation.vitalsTemperature(value) == null) {
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
            } else {
                return {};
            }
        },
        getPulseRateStatus(value: any) {
            if (Validation.vitalsPulseRate(value) == null) {
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
            if (value && Validation.vitalsOxygenSaturation(value) == null) {
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
            if (Validation.vitalsRespiratoryRate(value) == null) {
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
