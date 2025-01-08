<template>
    <div v-if="formOpen" class="pim-cls-1 modal_wrapper">
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">Add Weight/Height</div>
        </div>
        <div>
            <div class="center text_12">
                <ion-row>
                    <BasicForm :contentData="vitalsWeightHeight" @update:inputValue="validaterowData($event)" />
                </ion-row>
            </div>
        </div>

        <customDatePicker @dateChange="updateDate" v-if="showPD" />

        <div class="btnContent">
            <div class="saveBtn" v-if="showDateBtns">
                <div>
                    <ion-button class="btnText" fill="solid" @click="saveVitals()">
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
            <div class="saveBtn" v-if="!showDateBtns">
                <ion-row>
                    <ion-col>
                        <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px"> Cancel </ion-button>
                    </ion-col>

                    <ion-col>
                        <ion-button @click="saveVitals()" class="btnText" fill="solid" style="width: 130px"> save </ion-button>
                    </ion-col>
                </ion-row>
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
    modalController,
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
import { isEmpty } from "lodash";
import workerData from "@/activate_worker";
import db from "@/db";
import { saveOfflinePatientData } from "@/services/offline_service";
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
            vitals_date: HisDate.toStandardHisFormat(HisDate.currentDate()),
            formOpen: true,
            checkUnderSixWeeks: false,
            showDateBtns: true as boolean,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useWeightHeightVitalsStore, ["vitalsWeightHeight"]),
    },
    watch: {
        patient: {
            async handler() {
                this.checkAge();
            },
        },
    },
    mounted() {
        this.checkAge();
    },
    setup() {},
    methods: {
        checkAge() {
            if (!isEmpty(this.patient?.personInformation?.birthdate)) {
                this.checkUnderSixWeeks =
                    HisDate.dateDiffInDays(HisDate.currentDate(), this.patient?.personInformation?.birthdate) < 42 ? true : false;
                this.controlHeight();
            }
        },
        nav(url: any) {
            this.$router.push(url);
        },
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.patient?.personInformation?.birthdate);
        },
        controlHeight() {
            if (this.checkUnderSixWeeks) {
                modifyFieldValue(this.vitalsWeightHeight, "Height (cm)", "inputHeader", "Height");
                modifyFieldValue(this.vitalsWeightHeight, "Height (cm)", "inputDisplayNone", true);
            } else {
                modifyFieldValue(this.vitalsWeightHeight, "Height (cm)", "inputDisplayNone", false);
            }
        },
        async validaterowData(event: any) {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.patient.patientID, userID);

            const weightValue = getFieldValue(this.vitalsWeightHeight, "weight", "value");
            const heightValue = getFieldValue(this.vitalsWeightHeight, "Height (cm)", "value");
            const height = vitalsInstance.validator({ inputHeader: "Height*", value: heightValue });
            const weight = vitalsInstance.validator({ inputHeader: "Weight*", value: weightValue });
            if (height && heightValue) {
                modifyFieldValue(this.vitalsWeightHeight, "Height (cm)", "alertsErrorMassage", height.flat(Infinity)[0]);
            } else {
                modifyFieldValue(this.vitalsWeightHeight, "Height (cm)", "alertsErrorMassage", "");
            }

            if (weight && weightValue) {
                modifyFieldValue(this.vitalsWeightHeight, "weight", "alertsErrorMassage", weight.flat(Infinity)[0]);
            } else {
                modifyFieldValue(this.vitalsWeightHeight, "weight", "alertsErrorMassage", "");
            }
            this.setBMI(weightValue, heightValue);
        },
        async saveVitals() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.patient.patientID, userID);
            const weightValue = getFieldValue(this.vitalsWeightHeight, "weight", "value");
            const heightValue = getFieldValue(this.vitalsWeightHeight, "Height (cm)", "value");
            let height = null;
            if (!this.checkUnderSixWeeks) height = vitalsInstance.validator({ inputHeader: "Height*", value: heightValue });
            const weight = vitalsInstance.validator({ inputHeader: "Weight*", value: weightValue });

            const newVitals = await formatInputFiledData(this.vitalsWeightHeight);
            if (newVitals.length > 0 && weight == null && height == null) {
                let vitals = this.patient?.vitals;
                vitals.unsaved = [...vitals.unsaved, ...newVitals];
                await saveOfflinePatientData(this.patient);
                toastSuccess("Vitals saved successful");
                this.cleanInputFields();
            } else {
                toastWarning("Please complete the form");
            }
        },
        cleanInputFields() {
            modifyFieldValue(this.vitalsWeightHeight, "weight", "value", "");
            modifyFieldValue(this.vitalsWeightHeight, "Height (cm)", "value", "");
            this.dismiss();
        },
        dismiss() {
            modalController.dismiss();
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
            const vitalsWeightHeight = this.vitalsWeightHeight[0].alerts[0];
            vitalsWeightHeight.icon = BMIService.iconBMI(bmiColor);
            vitalsWeightHeight.backgroundColor = bmiColor[0];
            vitalsWeightHeight.textColor = bmiColor[1];
            vitalsWeightHeight.index = "BMI " + (this.BMI?.index ?? "");
            vitalsWeightHeight.value = this.BMI?.result ?? "";
        },
        showCPD() {
            this.showPD = true as boolean;
            this.showDateBtns = false as boolean;
        },

        updateDate(date: any) {
            this.vitals_date = HisDate.toStandardHisFormat(date);
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
    font-size: 16px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    line-height: 40px;
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
