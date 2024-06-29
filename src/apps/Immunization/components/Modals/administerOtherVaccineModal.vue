<template>
    <div class="modal_wrapper">
        <ion-row style="margin-top: 10px;">
            <ion-col style="margin-left: -3px">
                <div class="om">Add Other Vaccine</div>
            </ion-col>
            <ion-col size="6" style="text-align: right">
                <ion-label class="lbl-tl" style="font-size: 13"> Todays Date: <span class="lbl-ct">{{ sessionDate }}</span></ion-label>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                >Batch number<span style="color: #b42318">*</span></ion-label
            >
        </ion-row>
        <div>
            <BasicInputField
                :placeholder="'Enter batch number'"
                :icon="iconsContent.batchNumber"
                :inputValue="batchNumber"
                :-inner-action-btn-propeties="InnerActionBtnPropeties"
                @update:InnerActionBtnPropetiesAction="InnerActionBtnPropeties.fn"
                @update:inputValue="updateBatchNumber"
                @update:passedinputValue="updateBatchNumberByPassValue"
            />

            <div>
                <ion-label v-if="is_batch_number_valid" class="error-label">
                    {{ batch_number_error_message }}
                </ion-label>
            </div>
        </div>
        

        <div style="margin-top: 30px; margin-bottom: 100px;">
            <ion-row>
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                    >Vaccine name<span style="color: #b42318">*</span></ion-label
                >
            </ion-row>
            <VueMultiselect
                v-model="vaccineName"
                @update:model-value="updateVaccineName($event)"
                :multiple="false"
                :taggable="false"
                :hide-selected="false"
                :close-on-select="true"
                openDirection="bottom"
                tag-placeholder="select vaccine"
                placeholder="select vaccine"
                selectLabel=""
                label="drug_name"
                :searchable="true"
                @search-change="$emit('search-change', $event)"
                track-by="drug_id"
                :options="otherVaccinesList"
            />
            <div>
                <ion-label style="padding: 3%;;" v-if="is_vaccine_name_valid" class="error-label">{{ vaccine_name_error_message }}</ion-label>
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
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonCol, IonLabel, IonRow, modalController } from "@ionic/vue";
import { defineComponent } from "vue"; 
import { checkmark, pulseOutline, clipboardOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { useAdministerOtherVaccineStore } from "@/apps/Immunization/stores/AdministerOtherVaccinesStore";
import { mapState } from "pinia";

import BasicInputField from "@/components/BasicInputField.vue";

import BasicForm from "@/components/BasicForm.vue";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";

import PreviousVitals from "@/components/previousVisits/previousVitals.vue"
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue"
import { PatientService } from "@/services/patient_service"
import { saveVaccineAdministeredDrugs, getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service"
import QRCodeReadersrc from "@/components/QRCodeReader.vue"
import { createModal } from "@/utils/Alerts"
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"
import VueMultiselect from "vue-multiselect"
import { isEmpty } from "lodash"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"

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
        VueMultiselect,
        IonLabel
    },
    data() {
        return {
            iconsContent: icons,
            showPD: false as boolean,
            batchNumber: "" as any,
            vaccineName: '' as string,
            currentDrugOb: {} as any,
            otherVaccinesList: [
                {
                    "concept_id": 11592,
                    "drug_id": 1287,
                    "drug_name": "OPV3",
                    "status": "administered",
                    "date_administered": "01/Jun/2024 08:40:01",
                    "vaccine_batch_number": null
                },
                {
                    "concept_id": 11592,
                    "drug_id": 1290,
                    "drug_name": "Pentavalent 3",
                    "status": "administered",
                    "date_administered": "31/May/2024 15:16:03",
                    "vaccine_batch_number": null
                },
                {
                    "concept_id": 11592,
                    "drug_id": 1293,
                    "drug_name": "PCV3",
                    "status": "administered",
                    "date_administered": "01/Jun/2024 08:40:17",
                    "vaccine_batch_number": null
                },
                {
                    "concept_id": 11592,
                    "drug_id": 1301,
                    "drug_name": "IPV",
                    "status": "administered",
                    "date_administered": "31/May/2024 15:33:44",
                    "vaccine_batch_number": null
                }
            ] as any,
            is_batch_number_valid: false as boolean,
            vaccineDate: "" as any,
            is_vaccine_name_valid: false as boolean,
            batch_number_error_message: "Enter a valid batch number",
            vaccine_name_error_message: "Enter a valid valid vaccine name",
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            InnerActionBtnPropeties: {
                name: "Scan",
                show: true,
                fn: () => { createModal(QRCodeReadersrc, { class: "otherVitalsModal qr_code_modal" }, false)}
            },
            showDateBtns: true as boolean,
        };
    },
    computed: {
        ...mapState(useAdministerOtherVaccineStore, ["administerOtherVaccine"]),
        ...mapState(useAdministerVaccineStore, ["tempScannedBatchNumber"]),
    },
    async mounted() {
        
    },
    watch: {
        batchNumber: {
            handler() {
                this.validateBatchNumber()
            },
            deep: true,
        },
        tempScannedBatchNumber: {
            handler() {
                if (this.tempScannedBatchNumber != null) {
                    console.log(this.tempScannedBatchNumber)
                    this.batchNumber = this.tempScannedBatchNumber.text
                    const store = useAdministerVaccineStore()
                    store.setTempScannedBatchNumber(null)
                    this.validateBatchNumber()
                }
            }
        },
        vaccineName: {
            handler() {
                this.validateVaccineName()
            }
        }
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
            let vaccine_date = Service.getSessionDate()
            this.saveDta(vaccine_date);
        },
        dismiss() {
            modalController.dismiss()
        },
        saveBatch() {
            
            let vaccine_date;
            if (isEmpty(this.vaccineDate) == true) {
                vaccine_date = Service.getSessionDate();
            } else {
                vaccine_date = this.vaccineDate;
            }

            this.saveDta(vaccine_date);
        },
        validateVaccineName() {
            if (isEmpty(this.vaccineName) == true) {
                this.is_vaccine_name_valid = true
                return false
            }

            if (isEmpty(this.vaccineName) == false) {
                this.is_vaccine_name_valid = false
                return true
            }
        },
        updateVaccineName(data: any) {
            this.currentDrugOb = data
        },
        isAlphaNumeric(text: string) {
            // Regular expression to match one or more digits
            const regex = /^[a-zA-Z0-9]+$/;
            return regex.test(text);
        },
        validateBatchNumber() {
            if (this.isAlphaNumeric(this.batchNumber as string) == true) {
                    this.is_batch_number_valid = false;
                }
                if (this.isAlphaNumeric(this.batchNumber as string) == false) {
                    this.is_batch_number_valid = true;
                }
        },
        updateBatchNumberByPassValue(input: any) {
            console.log(input, 'qqqqqqqwwwwwwwwwwww');
            this.batchNumber = input
        },
        saveDta(date_: any) {
            this.validateVaccineName()
            this.validateBatchNumber()
            if (this.is_batch_number_valid == true) {
                toastWarning("Enter batch number!");
                return;
            }

            if (this.batchNumber == "") {
                toastWarning("Enter batch number!")
                return;
            }
            const dta = {
                batch_number: this.batchNumber,
                date_administered: date_,
                drug_id: this.currentDrugOb.drug_id,
            };
            const store = useAdministerVaccineStore();
            store.setAdministeredVaccine(dta)
            saveVaccineAdministeredDrugs()
            this.dismiss();
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
.lbl-ct {
    white-space: nowrap;
    color: #08475e;
    font-size: 14px;
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
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
}
</style>
