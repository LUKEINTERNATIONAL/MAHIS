<template>
    <div class="modal_wrapper">
        <ion-row style="margin-top: 10px">
            <ion-col style="margin-left: -3px">
                <div class="om">Administer Vaccine</div>
            </ion-col>
            <ion-col size="6">
                <ion-label class="lbl-tl" style="font-size: 13">
                    Todays Date: <span class="lbl-ct">{{ sessionDate }}</span></ion-label
                >
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-label style="font-weight: 600px; font-size: 20px; margin: 10px; margin-left: 0px">{{ drugName }}</ion-label>
        </ion-row>
        <ion-row>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                >Select Batch number<span style="color: #b42318">*</span></ion-label
            >
        </ion-row>
        <div>
            <!-- <BasicInputField
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
            </div> -->
            <lotNumberList :action="childAction" ref="childComponentRef" @actionTriggered="ActionTriggered" @emptyList="ShowAlert"/>
        </div>

        <div class="client_admi">
            <span class="client_admi_sub">Vaccination done by: </span><span class="client_admin_sub_x">{{ full_name }}</span>
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
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, modalController } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { mapState } from "pinia";
import { Service } from "@/services/service";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { saveVaccineAdministeredDrugs, getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service";
import { isEmpty } from "lodash";
import QRCodeReadersrc from "@/components/QRCodeReader.vue";
import { createModal } from "@/utils/Alerts";
import alert from "./alert.vue"
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { useUserStore } from "@/stores/userStore";
import lotNumberList from "./lotNumberList.vue"

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
        lotNumberList,
        alert,
    },
    data() {
        return {
            iconsContent: icons,
            showPD: false as boolean,
            showDateBtns: true as boolean,
            vaccineDate: "" as any,
            batchNumber: "" as any,
            drugName: "" as string,
            currentDrug: "" as any,
            is_batch_number_valid: false as boolean,
            batch_number_error_message: "Enter a valid batch number",
            full_name: "" as string,
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            InnerActionBtnPropeties: {
                name: "Scan",
                show: true,
                fn: () => {
                    createModal(QRCodeReadersrc, { class: "otherVitalsModal qr_code_modal" }, false);
                },
            },
            selected_date_: '',
        };
    },
    computed: {
        ...mapState(useAdministerVaccineStore, ["tempScannedBatchNumber"]),
    },

    setup() {
        const childComponentRef = ref<InstanceType<typeof lotNumberList> | null>(null);
        const triggerChildAction = () => {
            if (childComponentRef.value) {
                childComponentRef.value.performAction();
            }
        };
        return {
            childComponentRef,
            triggerChildAction,
        };
    },
    async mounted() {
        this.loadCurrentSelectedDrug();
        this.displayUserNames();
        const store = useAdministerVaccineStore();
        this.showPD = store.isVaccinePassed();
        this.showDateBtns = !this.showPD;
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
                this.validateBatchNumber();
            },
            deep: true,
        },
        tempScannedBatchNumber: {
            handler() {
                if (this.tempScannedBatchNumber != null) {
                    this.batchNumber = this.tempScannedBatchNumber.text;
                    this.validateBatchNumber();
                }
            },
        },
    },
    methods: {
        loadCurrentSelectedDrug() {
            const store = useAdministerVaccineStore();
            this.currentDrug = store.getCurrentSelectedDrug();
            this.drugName = this.currentDrug.drug.drug_name;
            this.batchNumber = this.currentDrug.drug.vaccine_batch_number ? this.currentDrug.drug.vaccine_batch_number : "";
        },
        showCPD() {
            this.showPD = true as boolean;
            this.showDateBtns = false as boolean;
        },
        dismiss() {
            modalController.dismiss();
        },
        updateDate(date: any) {
            this.vaccineDate = HisDate.toStandardHisFormat(date);
        },
        saveBatchWithTodayDate() {
            let vaccine_date = Service.getSessionDate();
            this.saveDta(vaccine_date);
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
        updateBatchNumber(event: any) {
            const input = event.target.value;
            this.batchNumber = input || this.tempScannedBatchNumber?.text || "";
        },
        ActionTriggered(selectedOption: any) {
            console.log(selectedOption)
            const dta = {
                batch_number: selectedOption.lotNumber,
                date_administered: this.selected_date_,
                drug_id: this.currentDrug.drug.drug_id,
            };
            const store = useAdministerVaccineStore();
            store.setAdministeredVaccine(dta);
            saveVaccineAdministeredDrugs();
            store.setTempScannedBatchNumber(null);
            this.dismiss();
        },
        saveDta(date_: any) {
            this.selected_date_ = date_
            this.triggerChildAction()
            // this.validateBatchNumber();
            // if (this.is_batch_number_valid == true) {
            //     toastWarning("Enter batch number!");
            //     return;
            // }

            // if (this.batchNumber == "") {
            //     toastWarning("Enter batch number!");
            //     return;
            // }
            // const dta = {
            //     batch_number: this.batchNumber,
            //     date_administered: date_,
            //     drug_id: this.currentDrug.drug.drug_id,
            // };
            // const store = useAdministerVaccineStore();
            // store.setAdministeredVaccine(dta);
            // saveVaccineAdministeredDrugs();
            // store.setTempScannedBatchNumber(null);
            // this.dismiss();
        },
        isAlphaNumeric(text: string) {
            const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
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
            this.batchNumber = input;
        },
        displayUserNames() {
            const user_store = useUserStore();
            const user = user_store.getUser();
            const first_name = user.person.names[0].given_name;
            const last_name = user.person.names[0].family_name;
            this.full_name = first_name + " " + last_name;
        },
        childAction() {
            console.log('Action triggered in ChildComponent');
        },
        ShowAlert() {
            // createModal(alert, { class: "otherVitalsModal" }, false);
            // this.dismiss()
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

.lbl-ct {
    white-space: nowrap;
    color: #08475e;
    font-size: 14px;
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
    background: inherit;
}
.client_admi {
    /* Today's date */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px 10px 0px;
    gap: 5px;

    width: 363px;
    height: 28px;

    /* Inside auto layout */
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
}
.client_admi_sub {
    font-weight: 400;
    font-size: 15px;
    color: #636363;
}
.client_admin_sub_x {
    font-weight: 500;
    font-size: 16px;
    color: #454545;
}
</style>
