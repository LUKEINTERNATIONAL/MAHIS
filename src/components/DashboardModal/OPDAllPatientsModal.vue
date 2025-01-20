<template>
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
                <ion-card-content>
                    <div class="dueCardContent">
                        <div class="table-container">
                            <ion-grid>
                                <ion-row class="table-header">
                                    <ion-col>Patient Name</ion-col>
                                    <ion-col>Service Time</ion-col>
                                    <ion-col>Actions</ion-col>
                                </ion-row>

                                <!-- Table Rows -->
                                <ion-row v-for="(patient, index) in patients" :key="index" class="table-row">
                                    <ion-col>{{ patient.fullName }}</ion-col>
                                    <ion-col>{{ formatArrivalTime(patient.arrivalTime) }}</ion-col>
                                    <ion-col>
                                        <ion-button size="small" class="btn-edit" @click="navigateTo(patient.patient_id, '/patientProfile')"
                                            >Profile</ion-button
                                        >
                                    </ion-col>
                                </ion-row>
                                <ion-row v-if="patients.length === 0 && !isLoading">
                                    <ion-col>No patients today.</ion-col>
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
    modalController,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonPopover,
    IonSpinner,
    IonCol,
    IonRow,
} from "@ionic/vue";
import { defineComponent } from "vue";
import DataTable from "datatables.net-vue3";
import { icons } from "@/utils/svg";
import { getPatientsList } from "@/apps/OPD/services/opd_dashboard";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";
import { PatientOpdList } from "@/services/patient_opd_list";
import { PatientService } from "@/services/patient_service";
import dates from "@/utils/Date";
import { useWorkerStore } from "@/stores/workerStore";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import { getUserLocation } from "@/services/userService";
import { useDemographicsStore } from "@/stores/DemographicStore";

export default defineComponent({
    components: {
        IonRow,
        IonCol,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonIcon,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonPopover,
        DataTable,
        IonSpinner,
    },
    data() {
        return {
            isLoading: false,
            popoverOpen: false,
            event: null as any,
            iconsContent: icons,
            patientList: [] as any,
            options: {
                responsive: true,
                select: true,
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
            default: "Patient List",
        },
    },
    async mounted() {
        this.isLoading = true;
        try {
            const location = await getUserLocation();
            const locationId = location ? location.code : null;
            const visitsToday = await PatientOpdList.getAllPatientsVisitsToday();
            const filteredVisits = visitsToday.filter((visit: any) => visit.location_id === locationId);
            this.patients = await Promise.all(
                filteredVisits.map(async (visit: any) => {
                    const patientDetails = await PatientService.findByID(visit.patientId);
                    if (patientDetails && patientDetails.person) {
                        const names = patientDetails.person.names;
                        const fullName = names && names.length > 0 ? `${names[0].given_name || ""} ${names[0].family_name || ""}`.trim() : "Unknown";

                        return {
                            fullName,
                            arrivalTime: visit.startDate,
                            patient_id: visit.patientId,
                        };
                    } else {
                        return {
                            fullName: "Unknown",
                            arrivalTime: visit.startDate,
                            patient_id: visit.patientId,
                        };
                    }
                })
            );
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            this.isLoading = false;
        }
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
            await useDemographicsStore().setPatientRecord(patient);
            this.$router.push(route);
        },
        async handleAbscond(visitId: any) {
            try {
                await PatientOpdList.checkOutPatient(visitId, dates.todayDateFormatted());
                const location = await getUserLocation();
                const locationId = location ? location.id : null;
                if (locationId) {
                    await usePatientList().refresh(locationId);
                } else {
                    console.warn("Location ID could not be found. Please check your settings.");
                }
                await usePatientList().refresh(locationId);
            } catch (e) {}
        },
        waitingTime(timeStamp: any) {
            return dates.calculateTimeDifference(timeStamp);
        },
        formatArrivalTime(dateTime: string) {
            const date = new Date(dateTime);
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        },
    },
});
</script>

<style scoped>
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.loading-text {
    color: white;
    font-size: 1.2em;
    margin-top: 10px;
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
.table-header {
    font-weight: bold;
    background-color: #f0f0f0;
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
