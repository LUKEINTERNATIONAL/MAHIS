<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-content>
                <basic-form
                    :contentData="vitals"
                    :initialData="initialData"
                    @update:selected="handleInputData"
                    @update:inputValue="handleInputData"
                ></basic-form>
            </ion-card-content>
        </ion-card>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect,
    IonRadio,
    IonRadioGroup,
} from "@ionic/vue";
import BasicForm from "../../../../components/BasicForm.vue";
import { icons } from "../../../../utils/svg";
import BasicInputField from "../../../../components/BasicInputField.vue";
import { mapState } from "pinia";
import { checkmark, pulseOutline } from "ionicons/icons";
import BasicCard from "@/components/BasicCard.vue";
import { usePostnatalWardStayStore } from "@/apps/PNC/stores/postnatal ward stay/PostnatalWardMonitoring";
import { useANCVitalsStore } from "@/apps/ANC/store/physical exam/VitalsStore";
import { BMIService } from "@/services/bmi_service";
import HisDate from "@/utils/Date";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { toastWarning } from "@/utils/Alerts";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { validateField } from "@/services/PNC/ward_monitoring_for_mother_validation_service";
import { getFieldValue } from "@/services/data_helpers";
export default defineComponent({
    name: "DeliveryDetails",
    components: {
        BasicCard,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonToggle,
        IonSelect,
        IonSelectOption,
        IonInput,
        BasicInputField,
        BasicForm,
        IonRadio,
        IonRadioGroup,
    },

    data() {
        return {
            iconsContent: icons,
            vValidations: "" as any,
            BMI: {} as any,
            BPStatus: {} as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            inputField: "" as any,
            initialData: [] as any,
        };
    },
    computed: {
        ...mapState(usePostnatalWardStayStore, ["vitals"]),
        ...mapState(useDemographicsStore, ["patient"]),
        "Systolic blood pressure"() {
            return getFieldValue(this.vitals, "Systolic blood pressure", "value");
        },
        "Diastolic blood pressure"() {
            return getFieldValue(this.vitals, "Diastolic blood pressure", "value");
        },
        Pulse() {
            return getFieldValue(this.vitals, "Pulse", "value");
        },
        Temp() {
            return getFieldValue(this.vitals, "Temp", "value");
        },
        "Respiratory rate"() {
            return getFieldValue(this.vitals, "Respiratory rate", "value");
        },
    },
    mounted() {
        const vitals = usePostnatalWardStayStore();
        this.initialData = vitals.getInitial1();
        this.validateRowData({});
    },
    watch: {},
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        validationRules(event: any) {
            return validateField(this.vitals, event.name, (this as any)[event.name]);
        },

        //Handling input data on Profile-Past Obstetric history
        async handleInputData(event: any) {
            await this.validateRowData(event);
        },

        // Validations
        // validateRowData(event: any) {
        //   this.validationRules(event)
        // },
        updateVitalsStores() {
            const vitalsStore = useANCVitalsStore();
            vitalsStore.setVitals(this.vitals);
        },
        async validateRowData(inputData: any) {
            this.validationRules(inputData);
        },
        async setBMI(weight: any, height: any) {
            if (this.patient?.personInformation?.gender && this.patient?.personInformation?.birthdate) {
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height),
                    this.patient?.personInformation?.gender,
                    HisDate.calculateAge(this.patient?.personInformation?.birthdate, HisDate.currentDate())
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
    },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section {
    width: 100%;
    max-width: 1300px;
    margin-bottom: 20px;
}

ion-card {
    box-shadow: none;
    background-color: inherit;
    width: 100%;
    color: black;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
}

@media (max-width: 1500px) {
    .container {
        padding: 10px;
    }
}
.sub_item_header {
    font-weight: bold;
    font-size: 14px;
}
</style>
yle>
