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
                <h1 style="width: 100%; text-align: center; font-weight: 700">Appointments</h1>

                <ion-row style="width: 50%;">
                    <ion-col>
                        <ion-button @click="selectAppointMentDate()" class="btnText" fill="solid">Select Start Date</ion-button>
                    </ion-col>
                    <ion-col>
                        <ion-button @click="selectAppointMentDate()" class="btnText" fill="solid">Select End Date</ion-button>
                    </ion-col>
                </ion-row>

                <DataTable ref="dataTable" :options="options" :data="reportData" class="display nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age/DOB</th>
                            <th>Village</th>
                            <th>Appointment Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </DataTable>


            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonButton, IonMenuButton, IonPage, IonCardContent, IonTitle, IonCardTitle, IonToolbar, IonCardHeader, IonRow, IonCol, IonCard } from "@ionic/vue";
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
import { createModal } from "@/utils/Alerts";
import { PatientService } from "@/services/patient_service";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";
import { AppointmentService } from "@/services/appointment_service";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import selectAppointMentDate from "@/apps/Immunization/components/Modals/SelectAppointMentDate.vue";
import { useImmunizationAppointMentStore } from "@/stores/immunizationAppointMentStore";
import { mapState } from "pinia";
import nextAppointMent from "@/apps/Immunization/components/Modals/nextAppointMent.vue";
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
        IonButton
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
            selectDate: '',
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
    computed: {
        ...mapState(useImmunizationAppointMentStore, ["selectedAppointmentMentForAppointmentsPage"]),
    },
    watch: {
        selectedAppointmentMentForAppointmentsPage: {
            handler() {
                this.initDate(HisDate.toStandardHisFormat(this.selectedAppointmentMentForAppointmentsPage));
            },
            deep: true,
        },
    },
    async mounted() {
        await this.initDate(HisDate.currentDate())
    },
    methods: {
        async initDate(date: string) {
            this.selectDate = date;
            await this.buildTableData().then(() => {
                const table = (this.$refs.dataTable as any).dt;
                table.on("click", ".edit-btn", (e: Event) => {
                    const id = (e.target as HTMLElement).getAttribute("data-id");
                    this.handleEdit(id);
                });
                table.on("click", ".delete-btn", (e: Event) => {
                    const id = (e.target as HTMLElement).getAttribute("data-id");
                    this.handleDelete(id);
                });
            });
        },
        handleEdit(id: any) {
            this.openNextVaccineAppoinment(id)
        },

        handleDelete(id: any) {
            // Implement delete logic here
            console.log(`Deleting item with id: ${id} kkkkkkkk`);
        },
        async openClientProfile(patientID: any) {
            const patientData = await PatientService.findByNpid(patientID);
            this.setDemographics(patientData[0]);
            this.$router.push("patientProfile");
        },
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        async getAppointments() {
            const filteredData = [] as any;
            const appointments = await AppointmentService.getDailiyAppointments(this.selectDate);
            appointments.forEach((client: any) => {
                    const tableItem = {
                        name: client.given_name.concat(' ',client.given_name),
                        gender: client.gender,
                        age_dob: this.formatBirthdate(client.birthdate),
                        village: client.city_village,
                        person_id: client.person_id,
                    }
                    filteredData.push(tableItem)
            }) 
            return filteredData
        },
        async buildTableData() {
            this.isLoading = true;
            try {
                const appointments = await this.getAppointments()
                this.reportData = appointments.map((item: any) => {
                    return [
                        item.name,
                        item.gender,
                        item.age_dob,
                        item.village,
                        HisDate.toStandardHisDisplayFormat(this.selectDate),
                        `<button class="btn btn-sm btn-primary edit-btn" data-id="${item.person_id}">Reschedule</button>
                         <button class="btn btn-sm btn-danger delete-btn" data-id="${item.person_id}">Cancel</button>`,
                    ];
                });
                DataTable.use(DataTablesCore);
            } catch (error) {
                toastWarning("An error occurred while loading data.");
            } finally {
                this.isLoading = false;
            }
        },
        selectAppointMentDate() {
            createModal(selectAppointMentDate, { class: "otherVitalsModal" }, false);
        },
        openNextVaccineAppoinment(patientId: string) {
            const dataToPass = { patient_Id: patientId };
            createModal(nextAppointMent, { class: "otherVitalsModal" }, false, dataToPass);
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

</style>

<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>