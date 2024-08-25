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
                <div class="appointment-list" :style="{ height: listHeight + 'px' }">
                    <nextApptInf v-for="person in paginatedPeople" :key="person.person_id" :person="person"/>
                </div>

                <div v-if="people.length > 0" class="pagination-controls">
                    <div class="items-per-page">
                        <ion-label>Items per page:</ion-label>
                        <ion-select v-model="itemsPerPage" @ionChange="changeItemsPerPage">
                            <ion-select-option :value="10">10</ion-select-option>
                            <ion-select-option :value="20">20</ion-select-option>
                            <ion-select-option :value="50">50</ion-select-option>
                        </ion-select>
                    </div>
                    <ion-button @click="prevPage" :disabled="currentPage === 1">
                        <ion-icon :icon="chevronBackOutline" slot="start"></ion-icon>
                        Previous
                    </ion-button>
                    <ion-select v-model="currentPage" @ionChange="changePage">
                        <ion-icon :icon="bookOutline" slot="start"></ion-icon>
                        <ion-select-option v-for="page in totalPages" :key="page" :value="page">
                            Page {{ page }}
                        </ion-select-option>
                    </ion-select>
                    <ion-button @click="nextPage" :disabled="currentPage === totalPages">
                        Next
                        <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonButton, IonMenuButton, IonLabel, IonPage, IonCardContent, IonTitle, IonCardTitle, IonToolbar, IonCardHeader, IonRow, IonCol, IonCard, IonIcon, IonSelect, IonSelectOption } from "@ionic/vue";
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import HisDate from "@/utils/Date";
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
    chevronForwardOutline, 
    bookOutline,
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
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonButton,
        nextApptInf,
        BasicForm,
        IonIcon,
        IonSelect,
        IonSelectOption,
        IonLabel
    },
    setup() {
        const isLoading = ref(false);
        const people = ref([]) as any;
        const startDate = ref(HisDate.currentDate());
        const endDate = ref(HisDate.currentDate());
        const currentPage = ref(1);
        const itemsPerPage = ref(10);
        const listHeight = ref(0);

        const totalPages = computed(() => Math.ceil(people.value.length / itemsPerPage.value));

        const paginatedPeople = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return people.value.slice(start, end);
        });

        const updateListHeight = () => {
            const screenHeight = window.innerHeight;
            const otherElementsHeight = 300;
            listHeight.value = screenHeight - otherElementsHeight;
        };

        onMounted(() => {
            updateListHeight();
            window.addEventListener('resize', updateListHeight);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', updateListHeight);
        });

        return {
            isLoading,
            people,
            startDate,
            endDate,
            currentPage,
            totalPages,
            paginatedPeople,
            listHeight,
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
            itemsPerPage,
            add,
            person,
            refreshOutline,
            chevronForwardOutline,
            bookOutline,
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
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        changePage(event: CustomEvent) {
            this.currentPage = event.detail.value;
        },
        changeItemsPerPage(event: CustomEvent) {
            this.itemsPerPage = event.detail.value;
            this.currentPage = 1;
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
.appointment-list {
    overflow-y: auto;
}
.pagination-controls {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.pagination-controls ion-select {
    --padding-start: 8px;
    --padding-end: 8px;
}

.items-per-page {
    display: flex;
    align-items: center;
    gap: 10px;
}

.items-per-page ion-select {
    width: 70px;
}
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}
.loading-text {
    margin-top: 10px;
}
</style>