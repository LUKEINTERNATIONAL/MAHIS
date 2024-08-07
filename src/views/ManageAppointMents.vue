<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h1 style="width: 100%; text-align: center; font-weight: 700">Appointments Report</h1>

                <ion-card class="section">
                    <ion-card-header>
                        <ion-card-title class="cardTitle">Today's appointments({{ appointments?.length }}) </ion-card-title></ion-card-header
                    >
                    <ion-card-content>
                        <div
                            class="appointments"
                            style="display: flex; margin-bottom: 10px"
                            v-for="(item, index) in appointments"
                            :key="index"
                            @click="openClientProfile(item.npid)"
                        >
                            <div style="margin-right: 15px">
                                <div :class="item.gender == 'M' ? 'initialsBox maleColor' : 'initialsBox femaleColor'">
                                    <ion-icon style="color: rgb(78, 78, 78); font-size: 30px" :icon="person"></ion-icon>
                                </div>
                            </div>
                            <div style="align-items: center; display: flex">
                                <div style="line-height: 1">
                                    <div class="client_name">
                                        <div class="name">{{ item.given_name }} {{ item.family_name }}</div>
                                    </div>
                                    <div class="demographicsOtherRow">
                                        <div class="demographicsText">
                                            {{ item.gender == "M" ? "Male" : "Female" }}
                                            <span class="dot">.</span>{{ formatBirthdate(item.birthdate) }}
                                        </div>
                                    </div>
                                    <div>Village: {{ item?.city_village }}</div>
                                </div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>

                <DataTable ref="dataTable" :options="options" :data="reportData" class="display nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End date</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age/DOB</th>
                            <th>Village</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </DataTable>


            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonCardContent, IonTitle, IonCardTitle, IonToolbar, IonCardHeader, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import HisDate from "@/utils/Date";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import "datatables.net-select";
import { PatientService } from "@/services/patient_service";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";
import { AppointmentService } from "@/services/appointment_service";
import {
    medkit,
    chevronBackOutline,
    checkmark,
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

export default defineComponent({
    name: "Home",
    mixins: [SetDemographics],
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonRow,
        IonCol,
        IonCard,
        DataTable,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
    },
    data() {
        return {
            isLoading: false,
            options: {
                responsive: true,
                select: false,
            } as any,
            reportData: [] as any,
            appointments: [] as any,
        }
    },
    setup() {
        return {
            chevronBackOutline,
            checkmark,
            grid,
            chevronDownCircle,
            chevronForwardCircle,
            chevronUpCircle,
            colorPalette,
            document,
            globe,
            medkit,
            add,
            person,
        };
    },
    computed: {},
    async mounted() {
        await this.setAppointments();
    },
    methods: {
        async openClientProfile(patientID: any) {
            const patientData = await PatientService.findByNpid(patientID);
            this.setDemographics(patientData[0]);
            this.$router.push("patientProfile");
        },
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        async setAppointments() {
            this.appointments = await AppointmentService.getDailiyAppointments(HisDate.currentDate());
            if (this.appointments) this.appointments = this.appointments.sort((a: any, b: any) => a.given_name.localeCompare(b.given_name));
        },
    }
})
</script>

<style scoped>
.cardTitle {
    border-bottom: 0.01px solid #ccc;
    padding-bottom: 10px;
    font-size: 0.9em;
    font-weight: 560;
    color: #5d5d5d;
}
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
.dot {
    font-size: 25px;
}
</style>

<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>