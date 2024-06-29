<template>
    <div class="modal_wrapper">
        <div class="modal_title diplay_space_between">
            <span></span>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300">x</span>
        </div>
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">Follow up visits</div>
        </div>

        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Change guarding</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 200px">
                    <div class="">
                        <basic-form :contentData="changeGuardianInfo" @update:inputValue="handleInputData"></basic-form>
                    </div>
                </div>
            </ion-accordion>
            <ion-accordion value="second" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Vaccine adverse effects</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 200px">
                    <basic-form :contentData="vaccineAdverseEffects" @update:inputValue="handleInputData"></basic-form>
                </div>
            </ion-accordion>
            <ion-accordion value="third" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Child protected at birth</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" style="padding-bottom: 120px">
                    <basic-form :contentData="protectedAtBirth" @update:inputValue="handleInputData"></basic-form>
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <div style="display: flex; justify-content: end; padding-bottom: 3px">
            <DynamicButton fill="solid" name="Save Changes" />
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useFollowUpStoreStore } from "@/apps/Immunization/stores/FollowUpStore";
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
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { RelationsService } from "@/services/relations_service";
import DynamicButton from "@/components/DynamicButton.vue";

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
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
            BMI: {} as any,
            BPStatus: {} as any,
            vValidations: "" as any,
            relationships: "" as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            validationStatus: { heightWeight: false, bloodPressure: false } as any,
            showPD: false as boolean,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useFollowUpStoreStore, ["changeGuardianInfo", "vaccineAdverseEffects", "protectedAtBirth"]),
    },
    async mounted() {
        this.relationships = await RelationsService.getRelations();
        const data = this.relationships
            .map((r: any) => {
                if (r.b_is_to_a == r.b_is_to_a) {
                    return [{ name: r.b_is_to_a, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.b_is_to_a }];
                } else if (r.b_is_to_a != r.b_is_to_a) {
                    return [
                        { name: r.b_is_to_a, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.b_is_to_a },
                        { name: r.a_is_to_b, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.a_is_to_b },
                    ];
                }
            })
            .reduce((acc: any, val: any) => acc.concat(val), []);
        console.log(data);
        modifyFieldValue(this.changeGuardianInfo, "relationship", "multiSelectData", data);
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        handleInputData(event: any) {
            // if (event?.col?.name == "Change guardian" && event?.col?.checked) {
            //     const guardianFields = ["guardianFirstname", "guardianLastname", "guardianMiddleName", "guardianPhoneNumber", "relationship"];
            //     guardianFields.forEach((fields) => {
            //         modifyFieldValue(this.followUpStore, fields, "displayNone", false);
            //     });
            // } else if (event?.col?.name == "Change guardian") {
            //     const guardianFields = ["guardianFirstname", "guardianLastname", "guardianMiddleName", "guardianPhoneNumber", "relationship"];
            //     guardianFields.forEach((fields) => {
            //         modifyFieldValue(this.followUpStore, fields, "displayNone", true);
            //     });
            // }
            // if (event?.col?.name == "Vaccine adverse effects" && event?.col?.checked) {
            //     modifyFieldValue(this.followUpStore, "Vaccine adverse effects", "displayNone", false);
            // } else if (event?.col?.name == "Vaccine adverse effects") {
            //     modifyFieldValue(this.followUpStore, "Vaccine adverse effects", "displayNone", true);
            // }
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
        dismiss() {
            modalController.dismiss();
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
    margin: 10px;
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
.custom_card {
    margin-bottom: 20px;
}
</style>
