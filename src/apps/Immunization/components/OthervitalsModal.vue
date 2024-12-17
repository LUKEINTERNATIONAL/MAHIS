<template>
    <div v-if="formOpen" class="modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">OTHER VITALS</div>
            <div class="TodaysDate">Todays Date: <span></span> {{ todays_date }}</div>
        </div>
        <div class="">
            <basic-form :contentData="vitals" @update:inputValue="validateRowData()"></basic-form>
        </div>
        <customDatePicker v-if="showPD" />
        <div class="btnContent">
            <div class="saveBtn">
                <div>
                    <ion-button class="btnText" fill="solid" @click="saveVitals">
                        Done today
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon>
                    </ion-button>
                </div>
                <div></div>
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
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, modalController } from "@ionic/vue";
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
import { VitalsEncounter } from "@/apps/Immunization/services/vitals";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import { ObservationService } from "@/services/observation_service";
import { PatientService } from "@/services/patient_service";
import VitalsMixin from "@/views/Mixin/VitalsMixin.vue";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";

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
        customDatePicker,
    },
    data() {
        return {
            iconsContent: icons,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            validationStatus: { heightWeight: false, bloodPressure: false, pulseRate: false } as any,
            showPD: false as boolean,
            todays_date: HisDate.currentDate(),
            formOpen: true,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useVitalsStore, ["vitals"]),
    },
    async serverPrefetch() {
        // Call updateVitalsStores when the component is activated
        this.updateVitalsStores();
    },
    async mounted() {
        this.vitalsData = this.vitals;
        await this.setTodayVitals();
        this.updateVitalsStores();
        await this.validateRowData();
    },
    watch: {
        vitals: {
            handler() {
                this.vitalsData = this.vitals;
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

        async validateRowData() {
            const height = getFieldValue(this.vitals, "Height (cm)", "value");
            const weight = getFieldValue(this.vitals, "Weight", "value");
            const systolic = getFieldValue(this.vitals, "Systolic", "value");
            const diastolic = getFieldValue(this.vitals, "Diastolic", "value");
            const temp = getFieldValue(this.vitals, "Temp", "value");
            const pulse = getFieldValue(this.vitals, "Pulse", "value");
            const respiratoryRate = getFieldValue(this.vitals, "Respiratory rate", "value");
            const SP02 = getFieldValue(this.vitals, "SP02", "value");

            await this.setBMI(height, weight);
            await this.updateBP(systolic, diastolic);

            const pulseStatus = this.getPulseRateStatus(pulse);
            await this.updateRate("pulse", pulse, " BMP", pulseStatus, 4);

            const tempStatus = this.getTemperatureStatus(temp);
            this.updateRate("temp", temp, "°C", tempStatus, 4);

            const respiratoryStatus = this.getRespiratoryRateStatus(respiratoryRate);
            this.updateRate("respiratory", respiratoryRate, "BMP", respiratoryStatus, 6);

            const oxygenStatus = this.getOxygenSaturationStatus(SP02);
            this.updateRate("oxygen", SP02, "%", oxygenStatus, 6);
        },

        showCPD() {
            this.showPD = true as boolean;
        },
        closeForm() {
            this.formOpen = false;
        },
        saveVitals() {
            const userID: any = Service.getUserID();
            const vitalsService = new VitalsService(this.patient.patientID, userID);
            const vitalsToSave = this.vitals;
            modalController.dismiss();
            vitalsService.onFinish(vitalsToSave).then(() => {
                this.closeForm();
            });
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
    flex-direction: column;
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

.TodaysDate {
    display: flex;
    align-items: center;
}
.TodaysDate span {
    margin-left: 5px;
}
</style>
