<template>
    Spinner
    <div v-if="isLoading" class="spinner-overlay">
        <ion-spinner name="bubbles"></ion-spinner>
        <div class="loading-text">Please wait...</div>
    </div>
    <ion-header>
        <div class="header position_content">
            <div style="display: flex; align-items: center" @click="dismiss">
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
                <ion-card-header> <ion-card-title class="sectionTitle"> </ion-card-title></ion-card-header>
                <ion-card-content>
                    <div class="dueCardContent">
                        <!-- better implementation of a table is needed -->
                        <div class="table-container">
                            <!-- Table Header -->
                            <ion-grid>
                                <ion-row style="font-weight: bold" class="table-header">
                                    <ion-col>Patient Name</ion-col>
                                    <ion-col>Waiting Time</ion-col>
                                    <ion-col>Actions</ion-col>
                                </ion-row>

                                <!-- Table Rows -->
                                <ion-row v-for="(patient, index) in patients" :key="index" class="table-row">
                                    <ion-col>{{ patient.fullName }}</ion-col>
                                    <ion-col>{{ waitingTime(patient.arrivalTime) }}</ion-col>
                                    <ion-col>
                                        <ion-button size="small" class="btn-edit" @click="navigateTo(patient.patient_id, buttonLink)">{{
                                            buttonTitle
                                        }}</ion-button>
                                        <ion-button size="small" class="btn-edit" @click="navigateTo(patient.patient_id, '/patientProfile')"
                                            >Profile</ion-button
                                        >
                                        <ion-button size="small" class="btn-edit" @click="handleAbscond(patient)">Abscond</ion-button>
                                    </ion-col>
                                </ion-row>
                                <ion-row v-if="patients.length === 0 && !isLoading">
                                    <ion-col>No records found.</ion-col>
                                </ion-row>
                            </ion-grid>
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
import QRCodeReadersrc from "@/components/QRCodeReader.vue";
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
import { getPatientsList } from "@/apps/OPD/services/opd_dashboard";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";
import { PatientOpdList } from "@/services/patient_opd_list";
import dates from "@/utils/Date";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import { getUserLocation } from "@/services/userService";

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
            popoverOpen: false,
            event: null as any,
            iconsContent: icons,
            showPD: false as boolean,
            batchNumber: "" as any,
            clientDetails: [] as any,
            dueData: [] as any,
            options: {
                responsive: true,
                select: false,
                searching: false,
                ordering: false,
                pageLength: 25,
                lengthChange: false,
            } as any,
            sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            showDateBtns: true as boolean,
            tableColumns: [
                { title: "Patient Name", data: "fullName" },
                {
                    title: "Action",
                    data: null,
                    render: (data: any, type: any, row: any) => {
                        return `<ion-button class="btn-edit" @click="navigateTo(${row})">Open Profile</ion-button>`;
                    },
                },
            ],
            patients: [] as any,
        };
    },
    props: {
        title: {
            default: [] as any,
        },
        list: {
            default: "" as any,
        },
        buttonTitle: {
            default: "" as string,
        },
        buttonLink: {
            default: "" as string,
        },
    },
    computed: {
        ...mapState(usePatientList, [
            "patientsWaitingForVitals",
            "patientsWaitingForConsultation",
            "patientsWaitingForLab",
            "patientsWaitingForDispensation",
            "counter",
        ]),
    },
    async mounted() {
        this.setList();
    },
    watch: {
        counter: {
            handler() {
                this.setList();
            },
        },
    },
    setup() {
        return { person, pulseOutline, clipboardOutline };
    },
    methods: {
        openPopover(e: Event) {
            this.event = e;
            this.popoverOpen = true;
        },
        dismiss() {
            modalController.dismiss();
        },
        async navigateTo(id: any, route: string) {
            const patient = await PatientService.findByID(id);
            this.route = route;
            await this.setPatientRecord(patient);
        },
        async handleAbscond(patient: any) {
            try {
                const location = await getUserLocation();
                const locationId = location ? location.id : null;
                await PatientOpdList.checkOutPatient(patient.visit_id, dates.todayDateFormatted());
                this.patients = this.patients.filter((p: any) => p.patient_id !== patient.patient_id);
                toastSuccess("Patient absconded successfully.");
            } catch (e) {
                console.error("Error absconding patient:", e);
                toastDanger("Failed to abscond patient.");
            }
        },

        setList() {
            const listMapping: Record<string, any[]> = {
                VITALS: this.patientsWaitingForVitals,
                CONSULTATION: this.patientsWaitingForConsultation,
                LAB: this.patientsWaitingForLab,
                DISPENSATION: this.patientsWaitingForDispensation,
            };

            this.patients = listMapping[this.list] || [];
        },

        waitingTime(timeStamp: any) {
            return dates.calculateTimeDifference(timeStamp);
        },
    },
});
</script>

<style scoped>
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
<style scoped>
.table-container {
    padding: 16px;
}

.table-header {
    font-weight: bold;
    background-color: #f0f0f0;
}

.table-row {
    padding: 0; /* Remove padding from rows */
    margin: 0; /* Remove margin from rows */
    border-bottom: 1px solid #e0e0e0;
}

ion-col {
    padding: 4px 8px; /* Reduce padding for each column */
}

ion-button {
    margin: 2px; /* Reduce button margin */
}
</style>
