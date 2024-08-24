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
                <h1 style="width: 100%; text-align: left; margin-left:10px; font-weight: 700">Appointments</h1>

                <ion-row class="ion-align-items-center">
                    <ion-col class="ion-no-padding">
                        <basic-form :contentData="startEndDate" @update:inputValue="handleInputData"></basic-form>
                    </ion-col>
                    <ion-col size="auto" class="ion-no-padding ion-padding-start">
                        <ion-button style="margin-top: 2rem; margin-right: 1rem; font-size: 23px;" @click="loadPageInf()">
                        <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
                        Reload
                        </ion-button>
                    </ion-col>
                </ion-row>

                <nextApptInf v-for="person in people" :key="person.person_id" :person="person"/>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonButton, IonMenuButton, IonPage, IonCardContent, IonTitle, IonCardTitle, IonToolbar, IonCardHeader, IonRow, IonCol, IonCard, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import HisDate from "@/utils/Date";
import DataTable from "datatables.net-vue3";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import "datatables.net-select";
import BasicForm from "@/components/BasicForm.vue";
import { AppointmentService } from "@/services/appointment_service";
import { useImmunizationAppointMentStore } from "@/stores/immunizationAppointMentStore";
import { mapState } from "pinia";
import { useStartEndDate } from "@/stores/StartEndDate";
import nextApptInf from "./nextApptInf.vue"
import { refreshOutline } from 'ionicons/icons';
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
        IonButton,
        nextApptInf,
        BasicForm,
        IonIcon,
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
            people: [] as any,
            startDate: HisDate.currentDate(),
            endDate: HisDate.currentDate(),
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
            refreshOutline,
        };
    },
    computed: {
        ...mapState(useImmunizationAppointMentStore, ["selectedAppointmentMentForAppointmentsPage", "AppointmentsReload"]),
        ...mapState(useStartEndDate, ["startEndDate"]),
    },
    watch: {
        selectedAppointmentMentForAppointmentsPage: {
            handler() {
                this.initDate(HisDate.toStandardHisFormat(this.selectedAppointmentMentForAppointmentsPage));
            },
            deep: true,
        },
        AppointmentsReload: {
            handler() {
                this.loadPageInf();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.initDate(HisDate.currentDate());
        this.loadPageInf()
    },
    methods: {
        async initDate(date: string) {
            this.startDate = date;
        },
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        async getAppointments() {
            this.people.length = 0;
            this.isLoading = true;
            const appointments = await AppointmentService.getDailiyAppointments(this.startDate, this.endDate);
            appointments.forEach((client: any) => {
                    const apptOb = {
                        person_id: client.person_id,
                        npid: client.npid,
                        appointment_id: 103,
                        encounter_id: client.encounter_id,
                        name: client.given_name.concat(' ',client.given_name),
                        gender: client.gender,
                        ageDob: this.formatBirthdate(client.birthdate),
                        village: client.city_village,
                        appointmentDate: HisDate.toStandardHisDisplayFormat(client.appointment_date)
                    }
                    this.people.push(apptOb)
            })
            this.isLoading = false;
        },
        async handleInputData(event: any) {
            if (event.inputHeader == "Start date") {
                this.startDate = HisDate.toStandardHisFormat(event.value);
            }
            if (event.inputHeader == "End date") {
                this.endDate = HisDate.toStandardHisFormat(event.value);
            }
            await this.loadPageInf()
        },
        async loadPageInf() {
            await this.getAppointments();
        }
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

</style>

<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>