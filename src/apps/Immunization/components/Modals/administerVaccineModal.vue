<template>
    <div class="modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">Administer Vaccine</div>
        </div>
        <div class="">
            <basic-form :contentData="administerVaccine"></basic-form>
        </div>

        <customDatePicker v-if="showPD" />
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
                    <ion-button class="btnText" fill="solid" @click="showCPD">
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
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
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
        customDatePicker,
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
            showPD: false as boolean,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useAdministerVaccineStore, ["administerVaccine"]),
        ...mapState(useGeneralStore, ["activities"]),
    },
    async mounted() {
        const array = ["Height", "Weight", "Systolic", "Diastolic", "Temp", "Pulse", "SP02", "Respiratory rate"];
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
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
        showCPD() {
            this.showPD = true as boolean;
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
</style>
