<template>
    <!-- Spinner -->
    <div v-if="isLoading" class="spinner-overlay">
        <ion-spinner name="bubbles"></ion-spinner>
        <div class="loading-text">Please wait...</div>
    </div>
    <ion-header>
        <div class="header position_content">
            <div style="display: flex; align-items: center" @click="dismiss()">
                <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeftWhite"></ion-icon>
            </div>
            <div style="font-size: 1.2em; font-weight: 700">{{ title }}</div>
            <div style="display: flex; align-items: center" @click="openPopover($event)">
                <ion-icon slot="separator" size="large" :icon="iconsContent.fillerWhite"></ion-icon>
            </div>
        </div>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div>
            <ion-card class="section" style="margin-bottom: 25px; margin-inline: 0px">
                <ion-card-header> <ion-card-title class="sectionTitle"> Summary of required doses </ion-card-title></ion-card-header>
                <ion-card-content>
                    <div class="dueCardContent">
                        <DataTable :options="options" :data="tableData" class="display nowrap" width="100%">
                            <thead>
                                <tr>
                                    <th>Vaccine</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </ion-card-content>
            </ion-card>
            <ion-card class="section" style="margin-inline: 0px">
                <ion-card-header> <ion-card-title class="sectionTitle">Client Details </ion-card-title></ion-card-header>
                <ion-card-content>
                    <div
                        class="appointments"
                        style="display: flex; margin-bottom: 10px"
                        v-for="(item, index) in clientDetails"
                        :key="index"
                        @click="openClientProfile(item.patient_id)"
                    >
                        <div style="margin-right: 15px">
                            <div :class="item?.gender == 'M' ? 'initialsBox maleColor' : 'initialsBox femaleColor'">
                                <ion-icon style="color: rgb(78, 78, 78); font-size: 30px" :icon="person"></ion-icon>
                            </div>
                        </div>
                        <div style="align-items: center; display: flex">
                            <div>
                                <div class="client_name">
                                    <div class="name">{{ item.given_name }} {{ item.family_name }}</div>
                                </div>
                                <div class="demographicsOtherRow">
                                    <div class="demographicsText">Age: {{ getAge(item.birthdate) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ion-card-content>
            </ion-card>
        </div>
        <ion-popover
            style="--offset-x: -10px"
            :is-open="popoverOpen"
            :show-backdrop="false"
            :dismiss-on-select="true"
            :event="event"
            @didDismiss="popoverOpen = false"
        >
            <div>
                <ion-list style="--ion-background-color: #fff; --offset-x: -30px">
                    <ion-item :button="true" :detail="false" style="cursor: pointer"></ion-item>
                </ion-list>
            </div>
        </ion-popover>
    </ion-content>
</template>
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonInput,
    IonCol,
    IonLabel,
    IonRow,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { icons } from "@/utils/svg";
import {
    medkit,
    chevronBackOutline,
    pulseOutline,
    clipboardOutline,
    grid,
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
    add,
    person,
} from "ionicons/icons";
import { useAdministerOtherVaccineStore } from "@/apps/Immunization/stores/AdministerOtherVaccinesStore";
import { mapState } from "pinia";

import BasicInputField from "@/components/BasicInputField.vue";

import BasicForm from "@/components/BasicForm.vue";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";

import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import { saveVaccineAdministeredDrugs, getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service";
import { createModal } from "@/utils/Alerts";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import VueMultiselect from "vue-multiselect";
import { isEmpty } from "lodash";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import { getVaccinesData } from "@/apps/Immunization/services/dashboard_service";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";

export default defineComponent({
    mixins: [SetDemographics],
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
        IonLabel,
        DataTable,
    },
    data() {
        return {
            isLoading: false,
            overdueData: [] as any,
            under_five_missed_visits: [] as any,
            over_five_missed_visits: [] as any,
            popoverOpen: false,
            event: null as any,
            iconsContent: icons,
            showPD: false as boolean,
            batchNumber: "" as any,
            clientDetails: [] as any,
            tableData: [] as any,
            options: {
                responsive: true,
                select: true,
                searching: false,
                ordering: false,
                pageLength: 8,
                lengthChange: false,
            } as any,
            vaccineName: "" as string,
            currentDrugOb: {} as any,
            is_batch_number_valid: false as boolean,
            vaccineDate: "" as any,
            is_vaccine_name_valid: false as boolean,
            drugErrMsg: "" as any,
            batch_number_error_message: "Enter a valid batch number",
            vaccine_name_error_message: "Enter a valid valid vaccine name",
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),

            showDateBtns: true as boolean,
        };
    },
    props: {
        title: {
            default: [] as any,
        },
    },
    computed: {
        ...mapState(useAdministerOtherVaccineStore, ["administerOtherVaccine"]),
        ...mapState(useAdministerVaccineStore, ["tempScannedBatchNumber"]),
    },
    async mounted() {
        this.isLoading = true;
        const data = await getVaccinesData();
        data.map((item: any) => {
            if (item.name == "missed_immunizations") {
                if (this.title == "Client due today") {
                    const data = this.countDrugs(item.value.due_today);
                    this.tableData = data.map((item: any) => {
                        return [item.drug_name, item.due_doses];
                    });
                    this.clientDetails = item.value.due_today.map((item: any) => {
                        return {
                            given_name: item.client.table.given_name,
                            family_name: item.client.table.family_name,
                            patient_id: item.client.table.patient_id,
                            birthdate: item.client.table.birthdate,
                        };
                    });
                }
                if (this.title == "Client due this week") {
                    const data = this.countDrugs(item.value.due_this_week);
                    this.tableData = data.map((item: any) => {
                        return [item.drug_name, item.due_doses];
                    });
                    this.clientDetails = item.value.due_this_week.map((item: any) => {
                        return {
                            given_name: item.client.table.given_name,
                            family_name: item.client.table.family_name,
                            patient_id: item.client.table.patient_id,
                            birthdate: item.client.table.birthdate,
                        };
                    });
                }
                if (this.title == "Client due this month") {
                    const data = this.countDrugs(item.value.due_this_month);
                    this.tableData = data.map((item: any) => {
                        return [item.drug_name, item.due_doses];
                    });
                    this.clientDetails = item.value.due_this_month.map((item: any) => {
                        return {
                            given_name: item.client.table.given_name,
                            family_name: item.client.table.family_name,
                            patient_id: item.client.table.patient_id,
                            birthdate: item.client.table.birthdate,
                        };
                    });
                }
                if (this.title == "Client overdue over 5yrs") {
                    this.tableData = item.value.over_five_missed_doses.map((item: any) => {
                        return [item.drug_name, item.missed_doses];
                    });
                    this.clientDetails = item.value.over_five_missed_visits.map((item: any) => {
                        return {
                            given_name: item.client.table.given_name,
                            family_name: item.client.table.family_name,
                            patient_id: item.client.table.patient_id,
                            birthdate: item.client.table.birthdate,
                        };
                    });
                }
                if (this.title == "Client overdue under 5yrs") {
                    this.tableData = item.value.under_five_missed_doses.map((item: any) => {
                        return [item.drug_name, item.missed_doses];
                    });
                    this.clientDetails = item.value.under_five_missed_visits.map((item: any) => {
                        return {
                            given_name: item.client.table.given_name,
                            family_name: item.client.table.family_name,
                            patient_id: item.client.table.patient_id,
                            birthdate: item.client.table.birthdate,
                        };
                    });
                }
            }
        });
        this.isLoading = false;
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
        vaccineName: {
            handler() {
                this.validateVaccineName();
            },
        },
    },
    setup() {
        return { person, pulseOutline, clipboardOutline };
    },
    methods: {
        countDrugs(clientList: any) {
            const drugCounts: any = {};
            clientList.forEach((client: any) => {
                client.antigens.forEach((antigen: any) => {
                    if (drugCounts[antigen.drug_name]) {
                        drugCounts[antigen.drug_name]++;
                    } else {
                        drugCounts[antigen.drug_name] = 1;
                    }
                });
            });
            const result = Object.entries(drugCounts).map(([drug_name, due_doses]) => ({
                drug_name,
                due_doses,
            }));

            return result;
        },
        async openClientProfile(patientID: any) {
            const patientData = await PatientService.findByID(patientID);
            this.setDemographics(patientData);
            this.$router.push("patientProfile");
        },
        getAge(dateOfBirth: string): string {
            return HisDate.calculateDisplayAge(dateOfBirth);
        },
        openPopover(e: Event) {
            this.event = e;
            this.popoverOpen = true;
        },
        showCPD() {
            this.showPD = true as boolean;
            this.showDateBtns = false as boolean;
        },
        updateBatchNumber(event: any) {
            const input = event.target.value;
            this.batchNumber = input || this.tempScannedBatchNumber?.text || "";
        },
        saveBatchWithTodayDate() {
            let vaccine_date = Service.getSessionDate();
            this.saveDta(vaccine_date);
        },
        dismiss() {
            modalController.dismiss();
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
                this.is_vaccine_name_valid = true;
                return false;
            }

            if (isEmpty(this.vaccineName) == false) {
                this.is_vaccine_name_valid = false;
                return true;
            }
        },
        updateVaccineName(data: any) {
            this.currentDrugOb = data;
        },
        isAlphaNumeric(text: string) {
            // Regular expression to match alphanumeric characters and specified special characters
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
        saveDta(date_: any) {
            this.validateVaccineName();
            this.validateBatchNumber();
            if (this.is_batch_number_valid == true) {
                toastWarning("Enter batch number!");
                return;
            }

            if (this.batchNumber == "") {
                toastWarning("Enter batch number!");
                return;
            }
            const dta = {
                batch_number: this.batchNumber,
                date_administered: date_,
                drug_id: this.currentDrugOb.drug.drug_id,
            };
            const store = useAdministerVaccineStore();
            store.setAdministeredVaccine(dta);
            saveVaccineAdministeredDrugs();
            this.dismiss();
            store.setTempScannedBatchNumber(null);
        },
    },
});
</script>

<style scoped>
.appointments {
    transition: background-color 0.6s, color 0.6s, transform 0.2s;
    user-select: none;
    padding: 10px;
}
.appointments:hover {
    background-color: #f0f0f0;
    cursor: pointer;
}

.appointments:active {
    background-color: #ccc;
    color: #fff;
    transform: scale(0.98);
}

.appointments.active {
    background-color: #8c8c8c8c;
    color: #fff;
}
.initialsBox {
    width: 50px;
    height: 50px;
    left: 31px;
    top: 122px;
    align-items: center;
    border-radius: 50%;
    align-items: center;
    display: flex;
    justify-content: center;
}
.maleColor {
    background: #5983ba;
}
.femaleColor {
    background: #876d9b;
}
.client_name {
    font-size: 1em;
    font-weight: 600;
}
.demographicsText {
    font-size: 1em;
}
.position_content {
    max-width: 100vw;
}
.sectionTitle {
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 1.1em;
    border-bottom: #ccc 1px solid;
    line-height: 30px;
}
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
.header {
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
ion-header {
    background: #006401;
}
</style>
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>
