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
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import { getCheckboxSelectedValue, modifyCheckboxValue, modifyFieldValue } from "@/services/data_helpers";

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
            initialData: [] as any,
            initialData1: [] as any,
            initialData2: [] as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
    },
    mounted() {
        const userID: any = Service.getUserID();
        this.vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
        this.updateVitalsStores();
        this.validaterowData({});
        this.handleOtherAndNovitalsDone();
        const vitals = useVitalsStore();
        const preEclampsia = useVitalsStore();
        this.initialData = vitals.getInitial;
    },
    watch: {
        vitals: {
            handler() {
                this.updateVitalsStores();
                this.handleOtherAndNovitalsDone();
                this.handlePreEclampsia();
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
        async validaterowData(inputData: any) {
            this.hasValidationErrors = [];

            this.vitals.forEach((section: any, sectionIndex: any) => {
                section.data.rowData.forEach((col: any, colIndex: any) => {
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
            vitals.index = this.BMI?.index ?? "";
            vitals.value = this.BMI?.result ?? "";
            this.updateExpectedWeightGain();
            this.updateAverageWeightGain();
            this.updateTotalWeightGain();
        },

        async updateExpectedWeightGain () {
            const bmiColor = this.BMI?.color ?? [];
            const vitals = this.vitals[0].alerts[1];
            vitals.icon = BMIService.iconBMI(bmiColor);
            vitals.backgroundColor = bmiColor[0];
            vitals.textColor = bmiColor[1];
            vitals.index = this.BMI?.index ?? "";
            vitals.value = this.BMI?.result ?? "";
        },

        async updateAverageWeightGain () {
            const bmiColor = this.BMI?.color ?? [];
            const vitals = this.vitals[0].alerts[2];
            vitals.icon = BMIService.iconBMI(bmiColor);
            vitals.backgroundColor = bmiColor[0];
            vitals.textColor = bmiColor[1];
            vitals.index = this.BMI?.index ?? "";
            vitals.value = this.BMI?.result ?? "";
        },

        async updateTotalWeightGain () {
            const bmiColor = this.BMI?.color ?? [];
            const vitals = this.vitals[0].alerts[3];
            vitals.icon = BMIService.iconBMI(bmiColor);
            vitals.backgroundColor = bmiColor[0];
            vitals.textColor = bmiColor[1];
            vitals.index = this.BMI?.index ?? "";
            vitals.value = this.BMI?.result ?? "";
        },

        async updateBP(systolic: any, diastolic: any) {
            const vitals = this.vitals[1].alerts[0];
            const bpColor = this.BPStatus?.colors ?? [];
            vitals.icon = iconBloodPressure(bpColor);
            vitals.backgroundColor = bpColor[0];
            vitals.textColor = bpColor[1];
            vitals.index = systolic + "/" + diastolic;
            vitals.value = this.BPStatus?.value ?? "";
        },
        getBloodPressureStatus(systolic: any, diastolic: any) {
            if (diastolic && systolic) {
                if (parseInt(diastolic) >= 30 && parseInt(diastolic) <= 60 && parseInt(systolic) >= 40 && parseInt(systolic) <= 90) {
                    return { colors: ["#B9E6FE", "#026AA2", "#9ADBFE"], value: "Low" };
                } else if (parseInt(diastolic) >= 60 && parseInt(diastolic) <= 80 && parseInt(systolic) >= 90 && parseInt(systolic) <= 120) {
                    return { colors: ["#DDEEDD", "#016302", "#BBDDBC"], value: "Normal" };
                } else if (parseInt(diastolic) >= 80 && parseInt(diastolic) <= 90 && parseInt(systolic) >= 120 && parseInt(systolic) <= 140) {
                    let value = "Pre-high blood pressure";
                    if (parseInt(diastolic) >= 85 && parseInt(diastolic) <= 89 && parseInt(systolic) >= 130 && parseInt(systolic) <= 139)
                        value = "Pre-high blood pressure (Class: Borderline)";
                    return { colors: ["#FEDF89", "#B54708", "#FED667"], value: value };
                } else if (parseInt(diastolic) >= 90 && parseInt(diastolic) <= 109 && parseInt(systolic) >= 140 && parseInt(systolic) <= 190) {
                    let value = "High blood pressure";
                    if (parseInt(diastolic) >= 90 && parseInt(diastolic) <= 99 && parseInt(systolic) >= 140 && parseInt(systolic) <= 159)
                        value = "High blood pressure (Class: Mild/ I)";
                    if (parseInt(diastolic) >= 100 && parseInt(diastolic) <= 109 && parseInt(systolic) >= 160 && parseInt(systolic) <= 179)
                        value = "High blood pressure (Class: Moderate/ II)";
                    return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: value };
                } else if (parseInt(diastolic) >= 110 && parseInt(diastolic) <= 200 && parseInt(systolic) >= 180 && parseInt(systolic) <= 250) {
                    return { colors: ["#FECDCA", "#B42318", "#FDA19B"], value: "The patient has hypertension (Class: Severe/ III)" };
                } else {
                    toastWarning("Invalid BP values", 4000);
                    this.hasValidationErrors.push("false");
                    return {};
                }
            } else {
                return { colors: [], value: "" };
            }
        },

        handleOtherAndNovitalsDone() {
            if (getCheckboxSelectedValue(this.vitals, "Respiratory exam findings")?.value == "Other") {
                modifyFieldValue(this.vitals, "Other notes", "displayNone", false);
            } else {
                modifyFieldValue(this.vitals, "Other notes", "displayNone", true);
            }

            const checkBoxes = [
                "Normal exam",
                "Cough",
                "Rapid breathing",
                "Slow breathing",
                "Rapid breathing",
                "Wheezing",
                "Rales",
                "Respiratory distress",
                "Other",
            ];

            if (getCheckboxSelectedValue(this.vitals, "Exam not done")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.vitals, checkbox, "checked", false);
                    modifyCheckboxValue(this.vitals, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.vitals, checkbox, "disabled", false);
                });
            }
        },

        handlePreEclampsia() {
            const checkBoxes = ["Severe headache", "Visual disturbance", "Vomiting", "Epigastric pain", "Dizziness"];

            if (getCheckboxSelectedValue(this.vitals, "No severe pre-eclampsia")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.vitals, checkbox, "checked", false);
                    modifyCheckboxValue(this.vitals, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.vitals, checkbox, "disabled", false);
                });
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
.category{
width: 400px;
height: 70px;
background-color: #DDEEDD;
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
