<template>
    <div class="modal_wrapper">
        <ion-row>
            <ion-col style="margin-left: -3px;">
                <div class="om">Administer Vaccine</div>
            </ion-col>
            <ion-col size="6">
                <ion-label class="lbl-tl" style="font-size: 13;"> Todays Date: <span class="lbl-ct">06 Jul 2024</span></ion-label>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-label style="font-weight: 600px; font-size: 20px; margin: 10px; margin-left: 0px;">{{ drugName }}</ion-label>
        </ion-row>
        <ion-row>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey;">Batch number<span style="color: #B42318;">*</span></ion-label>
        </ion-row>
        <div>
            <BasicInputField
                :placeholder="'Enter batch number'"
                :icon="iconsContent.batchNumber"
                :inputValue="batchNumber"
                @update:inputValue="updateBatchNumber"
            />

            <div>
                <ion-label v-if="is_batch_number_valid" class="error-label">
                    {{ batch_number_error_message }}
                </ion-label>
            </div>
        </div>

        <customDatePicker v-if="showPD" @dateChange="updateDate"/>
        <div class="btnContent">
            <div class="saveBtn" v-if="showDateBtns">
                <div>
                    <ion-button @click="saveBatchWithTodayDate" class="btnText" fill="solid">
                        Done today
                        <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon>
                    </ion-button>
                </div>
                <div style="margin-bottom: 20px;">or</div>
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
                        <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px;">
                            Cancel
                            <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
                        </ion-button>
                    </ion-col>

                    <ion-col>
                        <ion-button @click="saveBatch" class="btnText" fill="solid" style="width: 130px;">
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
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, modalController } from "@ionic/vue"
import { defineComponent } from "vue"
import { checkmark, pulseOutline } from "ionicons/icons"
import { icons } from "@/utils/svg"
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"
import { mapState } from "pinia";
import { Service } from "@/services/service"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"
import HisDate from "@/utils/Date"
import BasicInputField from "@/components/BasicInputField.vue"
import PreviousVitals from "@/components/previousVisits/previousVitals.vue"
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue"
import { saveVaccineAdministeredDrugs, getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service"
import {isEmpty} from "lodash"
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
        PreviousVitals,
        customDatePicker,
    },
    data() {
        return {
            iconsContent: icons,
            showPD: false as boolean,
            showDateBtns: true as boolean,
            vaccineDate: '' as any,
            batchNumber: '' as any,
            drugName: '' as string,
            currentDrug: '' as any,
            is_batch_number_valid: false as boolean,
            batch_number_error_message: 'Enter a number'
        };
    },
    computed: {
        
    },
    async mounted() {
        this.loadCurrentSelectedDrug()
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    props: {
        customSchedule: {
            type: [],
            default: [],
        } as any,
    },
    watch: {
        batchNumber: {
            handler() {
                if (this.isAlphaNumeric(this.batchNumber as string) == true) {
                    this.is_batch_number_valid = false;
                }
                if (this.isAlphaNumeric(this.batchNumber as string) == false) {
                    this.is_batch_number_valid = true;
                }
            },
            deep: true,
        },
    },
    methods: {
        loadCurrentSelectedDrug() {
            const store = useAdministerVaccineStore()
            //console.log(store.getCurrentSelectedDrug())
            this.currentDrug = store.getCurrentSelectedDrug()
            this.drugName = this.currentDrug.drug_name
        },
        showCPD() {
            this.showPD = true as boolean;
            this.showDateBtns = false as boolean;
        },
        dismiss() {
            modalController.dismiss();
        },
        updateDate(date: any) {
            this.vaccineDate = HisDate.toStandardHisFormat(date)
        },
        saveBatchWithTodayDate() {
            let vaccine_date = Service.getSessionDate()
            this.saveDta(vaccine_date)
        },
        saveBatch() {
            let vaccine_date
            if (isEmpty(this.vaccineDate) == true) {
                vaccine_date = Service.getSessionDate() 
            } else {
                vaccine_date = this.vaccineDate
            }

            this.saveDta(vaccine_date)
        },
        updateBatchNumber(event: any) {
            const input = event.target.value
            this.batchNumber = input
        },
        saveDta(date_: any) {
            if (this.is_batch_number_valid == true ) {
                toastWarning("Enter a number!")
                return
            }

            if (this.batchNumber == '') {
                toastWarning("Enter a number!")
                return
            }
            const dta = {
                batch_number: this.batchNumber,
                date_administered: date_,
                visit_id: this.currentDrug.visit_id,
                drug_id: this.currentDrug.drug_id,
            }
            const store = useAdministerVaccineStore()
            store.setAdministeredVaccine(dta)
            saveVaccineAdministeredDrugs()
            this.dismiss()
        },
        isAlphaNumeric(text: string) {
            // Regular expression to match one or more digits
            const regex = /^[a-zA-Z0-9]+$/;
            return regex.test(text);
        }
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

.advac {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}

#cbtn {
  --background: #B42318;
}

.lbl-ct {
    white-space: nowrap;
    color: #08475e;
    font-size: 14px;
}
.om {
    font-size: 10;
    font-weight:600px;
}
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.error-label {
    background: #fecdca;
    color: #b42318;
    text-transform: none;
    padding: 6%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
.modal_wrapper {
    /* padding: 0px 10px; */
    background: #fff;
}
</style>
