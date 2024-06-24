<template>
    <div class="modal_wrapper">
        <ion-row>
            <ion-col style="margin-left: -3px">
                <div class="om">Add Other Vaccine</div>
            </ion-col>
            <ion-col size="6">
                <ion-label class="lbl-tl" style="font-size: 13"> Todays Date: <span class="lbl-ct">{{ sessionDate }}</span></ion-label>
            </ion-col>
        </ion-row>

        <div>
            <BasicInputField
                :placeholder="'Enter batch number'"
                :icon="iconsContent.batchNumber"
                :inputValue="batchNumber"
                :-inner-action-btn-propeties="InnerActionBtnPropeties"
                @update:InnerActionBtnPropetiesAction="InnerActionBtnPropeties.fn"
                @update:inputValue="updateBatchNumber"
            />

            <div>
                <ion-label v-if="is_batch_number_valid" class="error-label">
                    {{ batch_number_error_message }}
                </ion-label>
            </div>
        </div>

        <div style="margin-top: 30px;">
            <BasicInputField
                :placeholder="'Enter vaccine name'"
                :icon="clipboardOutline"
                :inputValue="vaccineName"
                @update:inputValue="updateVaccineName"
            />

            <div>
                <ion-label v-if="is_vaccine_name_valid" class="error-label">
                    {{ vaccine_name_error_message }}
                </ion-label>
            </div>
        </div>

        <customDatePicker v-if="showPD" />
        <div class="btnContent">
            <div class="saveBtn" v-if="showDateBtns">
                <div>
                    <ion-button @click="saveBatchWithTodayDate" class="btnText" fill="solid">
                        Done today
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon>
                    </ion-button>
                </div>
                <div style="margin-bottom: 20px"></div>
                <div>
                    <ion-button class="btnText" fill="solid" @click="showCPD">
                        Done earlier
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderWithPenEdit"></ion-icon>
                    </ion-button>
                </div>
            </div>

            <div class="saveBtn" v-if="!showDateBtns">
                <ion-row>
                    <ion-col>
                        <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px">
                            Cancel
                            <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
                        </ion-button>
                    </ion-col>

                    <ion-col>
                        <ion-button @click="saveBatch" class="btnText" fill="solid" style="width: 130px">
                            save
                            <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
                        </ion-button>
                    </ion-col>
                </ion-row>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonCol, IonRow } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline, clipboardOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { useAdministerOtherVaccineStore } from "@/apps/Immunization/stores/AdministerOtherVaccinesStore";
import { mapState } from "pinia";

import BasicInputField from "@/components/BasicInputField.vue";

import BasicForm from "@/components/BasicForm.vue";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";

import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import QRCodeReadersrc from "@/components/QRCodeReader.vue"
import { createModal } from "@/utils/Alerts"

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
        IonCol,
        IonRow,
    },
    data() {
        return {
            iconsContent: icons,
            showPD: false as boolean,
            batchNumber: "" as any,
            vaccineName: "" as string,
            is_batch_number_valid: false as boolean,
            is_vaccine_name_valid: false as boolean,
            batch_number_error_message: "Enter a valid batch number",
            vaccine_name_error_message: "Enter a valid valid vaccine name",
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            InnerActionBtnPropeties: {
                name: "Scan",
                show: true,
                fn: () => { createModal(QRCodeReadersrc, { class: "otherVitalsModal" })}
            },
            showDateBtns: true as boolean,
        };
    },
    computed: {
        ...mapState(useAdministerOtherVaccineStore, ["administerOtherVaccine"]),
    },
    async mounted() {
        
    },
    setup() {
        return { checkmark, pulseOutline, clipboardOutline };
    },
    methods: {
        showCPD() {
            this.showPD = true as boolean;
            this.showDateBtns = false as boolean;
        },
        updateBatchNumber(event: any) {
            const input = event.target.value;
            this.batchNumber = input;
        },
        saveBatchWithTodayDate() {
            // let vaccine_date = Service.getSessionDate();
            // this.saveDta(vaccine_date);
        },
        dismiss() {
            // modalController.dismiss();
        },
        saveBatch() {
            // let vaccine_date;
            // if (isEmpty(this.vaccineDate) == true) {
            //     vaccine_date = Service.getSessionDate();
            // } else {
            //     vaccine_date = this.vaccineDate;
            // }

            // this.saveDta(vaccine_date);
        },
        updateVaccineName() {

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
.om {
    font-size: 10;
    font-weight: 600px;
}
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
</style>
