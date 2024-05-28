<template>
    <div v-if="formOpen"  class="pim-cls-1 modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">WEIGHT & HEIGHT</div>
            <div class="TodaysDate">Todays Date: <span></span> {{ todays_date }}</div>
        </div>
        <div>
            <div class="center text_12">
                <ion-row>
                    <BasicForm :contentData="vitalsWeightHeight" @update:inputValue="validaterowData($event)" />
                </ion-row>
            </div>
        </div>

        <customDatePicker v-if="showPD"/>

        <div class="btnContent">
            <div class="saveBtn">
                <div>
                    <ion-button class="btnText" fill="solid" @click="doneToday()">
                        Done today
                        <ion-icon slot="end" size="small" :icon="iconContent.calenderwithPlus"></ion-icon>
                    </ion-button>
                </div>
                <div>
                    <ion-button class="btnText" fill="solid" @click="showCPD">
                        Done earlier
                        <ion-icon slot="end" size="small" :icon="iconContent.calenderWithPenEdit"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    IonContent,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCol,
    IonAvatar,
    IonImg,
    IonLabel,
    IonPage,
    IonFooter,
} from "@ionic/vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { createOutline } from "ionicons/icons";
import BasicForm from "@/components/BasicForm.vue";
import { useWeightHeightVitalsStore } from "@/apps/Immunization/stores/VitalsStore";
import DatePicker from "@/components/DatePicker.vue";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { VitalsService } from "@/services/vitals_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { Service } from "@/services/service";
import HisDate from "@/utils/Date";
import { BMIService } from "@/services/bmi_service";
import { icons } from "@/utils/svg";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { VitalsEncounter } from "@/apps/Immunization/services/vitals";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";

export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        BasicForm,
        customDatePicker,
    },
    data() {
        return {
            popoverOpen: false,
            iconContent: icons,
            event: null as any,
            BMI: "" as any,
            showPD: false as boolean,
            todays_date: HisDate.currentDate(),
            formOpen: true
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useWeightHeightVitalsStore, ["vitalsWeightHeight"]),
    },
    mounted() {
        console.log(this.vitalsWeightHeight);
        this.validaterowData({});
    },
    setup() {},
    methods: {
        nav(url: any) {
            this.$router.push(url);
        },
        openPopover(e: Event) {
            this.event = e;
            this.popoverOpen = true;
        },
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics.birthdate);
        },
        async validaterowData(event: any) {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(55, userID);

            const weightValue = getFieldValue(this.vitalsWeightHeight, "weight", "value");
            const heightValue = getFieldValue(this.vitalsWeightHeight, "Height", "value");
            const height = vitalsInstance.validator({ inputHeader: "Height*", value: heightValue });
            const weight = vitalsInstance.validator({ inputHeader: "Weight*", value: weightValue });
            if (height && heightValue) {
                modifyFieldValue(this.vitalsWeightHeight, "Height", "alertsErrorMassage", height.flat(Infinity)[0]);
                modifyFieldValue(this.vitalsWeightHeight, "Height", "alertsError", true);
            } else {
                modifyFieldValue(this.vitalsWeightHeight, "Height", "alertsErrorMassage", "");
                modifyFieldValue(this.vitalsWeightHeight, "Height", "alertsError", false);
            }

            if (weight && weightValue) {
                modifyFieldValue(this.vitalsWeightHeight, "weight", "alertsErrorMassage", weight.flat(Infinity)[0]);
                modifyFieldValue(this.vitalsWeightHeight, "weight", "alertsError", true);
            } else {
                modifyFieldValue(this.vitalsWeightHeight, "weight", "alertsErrorMassage", "");
                modifyFieldValue(this.vitalsWeightHeight, "weight", "alertsError", false);
            }

            if (weight == null && height == null) this.setBMI(weightValue, heightValue);
        },
        async doneToday() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(55, userID);
            const weightValue = getFieldValue(this.vitalsWeightHeight, "weight", "value");
            const heightValue = getFieldValue(this.vitalsWeightHeight, "Height", "value");
            const height = vitalsInstance.validator({ inputHeader: "Height*", value: heightValue });
            const weight = vitalsInstance.validator({ inputHeader: "Weight*", value: weightValue });
            if (weight == null && height == null) {
                await this.toastSuccess("Saved successful");
                const userID: any = Service.getUserID();
                const VitalsInstance = new VitalsEncounter(this.demographics.patient_id, userID);
                const encounter = await VitalsInstance.createEncounter();
                if (!encounter) return toastWarning("Unable to create vitals encounter");
                const data = await formatInputFiledData(this.vitalsWeightHeight);
                await VitalsInstance.saveObservationList(data);
                this.$emit("updateVitalsGraph");
                
            } else {
                toastWarning("Please complete the form");
            }
        },
        closeForm() {
                this.formOpen = false;
            },
        async toastSuccess(message:any) {
            await toastSuccess(message);
            this.closeForm();
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
            const vitalsWeightHeight = this.vitalsWeightHeight[0].alerts[0];
            vitalsWeightHeight.icon = BMIService.iconBMI(bmiColor);
            vitalsWeightHeight.backgroundColor = bmiColor[0];
            vitalsWeightHeight.textColor = bmiColor[1];
            vitalsWeightHeight.index = "BMI " + this.BMI?.index ?? "";
            vitalsWeightHeight.value = this.BMI?.result ?? "";
        },
        showCPD() {
            this.showPD = true as boolean;
        },
    },
});
</script>
<style scoped>
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.lbl-ct {
    white-space: nowrap;
    color: #08475e;
}
.pim-cls-1 {
    --background: #ffff;
}
ion-footer {
    --ion-toolbar-background: #fff;
}
.dashed-hr {
    border: none;
    border-top: 2px dashed #b3b3b3;
    margin: 20px 0; /* Adjust as needed */
}
.modal_wrapper {
    padding: 0px 10px;
    background: #fff;
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
    margin: 10px;
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
.TodaysDate {
    display: flex;
    align-items: center;
}
.TodaysDate span {
    margin-left: 5px;
}
</style>
