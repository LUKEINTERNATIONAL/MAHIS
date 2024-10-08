<template>
    <ion-page>
        <NavigationMenu />
        <ion-content>
            <div class="container">
                <ion-row>
                    <ion-col size="12">
                        <BasicInputField :placeholder="''" :icon="searchOutline" :inputValue="search_text" @update:inputValue="searchTextUpdated" />

                        <div>
                            <ion-label v-if="search_txt_error" class="error-label">
                                {{ "only letters allowed" }}
                            </ion-label>
                        </div>
                    </ion-col>
                </ion-row>

                <div class="appointment-list" :style="{ height: listHeight + 'px' }">
                    <nextApptInf v-for="person in paginatedPeople" :key="person.person_id" :person="person" />
                </div>

                <div v-if="people.length > 0" class="pagination-controls">
                    <ion-button class="nav-button" @click="prevPage" :disabled="currentPage === 1">
                        <ion-icon :icon="chevronBackOutline" slot="icon-only"></ion-icon>
                    </ion-button>

                    <div class="pagination-info">
                        <div class="items-per-page">
                            <ion-label style="margin-left: 20px">Items per page:</ion-label>
                            <ion-select v-model="itemsPerPage" @ionChange="changeItemsPerPage" interface="popover">
                                <ion-select-option :value="10">10</ion-select-option>
                                <ion-select-option :value="20">20</ion-select-option>
                                <ion-select-option :value="50">50</ion-select-option>
                            </ion-select>
                        </div>

                        <div class="page-counter">Showing {{ startIndex }} - {{ endIndex }} of {{ people.length }}</div>

                        <ion-select v-model="currentPage" @ionChange="changePage" interface="popover">
                            <ion-select-option v-for="page in totalPages" :key="page" :value="page"> Page {{ page }} </ion-select-option>
                        </ion-select>
                    </div>

                    <ion-button class="nav-button" @click="nextPage" :disabled="currentPage === totalPages">
                        <ion-icon :icon="chevronForwardOutline" slot="icon-only"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonButton,
    IonMenuButton,
    IonLabel,
    IonGrid,
    IonPage,
    IonCardContent,
    IonTitle,
    IonCardTitle,
    IonToolbar,
    IonCardHeader,
    IonRow,
    IonCol,
    IonCard,
    IonIcon,
    IonSelect,
    IonSelectOption,
} from "@ionic/vue";
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import HisDate from "@/utils/Date";
import BasicForm from "@/components/BasicForm.vue";
import { AppointmentService } from "@/services/appointment_service";
import { useImmunizationAppointMentStore } from "@/stores/immunizationAppointMentStore";
import { mapState } from "pinia";
import { useStartEndDate } from "@/stores/StartEndDate";
import nextApptInf from "./nextApptInf.vue";
import { refreshOutline } from "ionicons/icons";
import BasicInputField from "@/components/BasicInputField.vue";
import NavigationMenu from "@/apps/Immunization/components/Reports/NavigationMenu.vue";
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
    searchOutline,
} from "ionicons/icons";

export default defineComponent({
    name: "ManageAppointMentsTemplate",

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
        IonLabel,
        BasicInputField,
        IonGrid,
        NavigationMenu,
    },
    data() {
        return {
            search_text: "",
            search_txt_error: false,
        };
    },
    setup() {
        const people = ref([]) as any;
        const people_cpy = ref([]) as any;
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
            const otherElementsHeight = 180;
            listHeight.value = screenHeight - otherElementsHeight;
        };

        onMounted(() => {
            updateListHeight();
            window.addEventListener("resize", updateListHeight);
        });

        onUnmounted(() => {
            window.removeEventListener("resize", updateListHeight);
        });

        return {
            people,
            people_cpy,
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
            searchOutline,
        };
    },
    computed: {
        ...mapState(useImmunizationAppointMentStore, ["selectedAppointmentMentForAppointmentsPage", "AppointmentsReload"]),
        ...mapState(useStartEndDate, ["startEndDate"]),
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        endIndex() {
            return Math.min(this.startIndex + this.itemsPerPage - 1, this.people.length);
        },
    },
    watch: {
        selectedAppointmentMentForAppointmentsPage: {
            handler() {},
            deep: true,
        },
        AppointmentsReload: {
            handler() {
                this.loadPageInf();
            },
            deep: true,
        },
        $route: {
            async handler(data) {
                if (data.name == "ManageAppointMentsTemplate") {
                    this.loadPageInf();
                }
            },
            deep: true,
        },
    },
    async mounted() {
        this.loadPageInf();
    },
    methods: {
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        async getAppointments() {
            this.people.length = 0;
            // Reset pagination controls
            this.currentPage = 1;
            this.itemsPerPage = 10;
            try {
                const store = useImmunizationAppointMentStore();
                const appointments = await AppointmentService.getDailiyAppointments(
                    store.getStartEndDate().startDate,
                    store.getStartEndDate().endDate,
                    ""
                );
                appointments.forEach((client: any) => {
                    const apptOb = {
                        person_id: client.person_id,
                        npid: client.npid,
                        appointment_id: 103,
                        encounter_id: client.encounter_id,
                        name: client.given_name.concat(" ", client.family_name),
                        gender: client.gender,
                        ageDob: this.formatBirthdate(client.birthdate),
                        village: client.city_village,
                        appointmentDate: HisDate.toStandardHisDisplayFormat(client.appointment_date),
                    };
                    this.people.push(apptOb);
                });
                this.people_cpy = this.people;
            } catch (error) {}
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
        searchTextUpdated(event: any) {
            const reason = event.target.value;
            this.search_text = reason;

            if (this.isValidString(this.search_text) == true) {
                this.search_txt_error = false;
                this.searchFirstLastName(this.search_text);
            } else {
                this.search_txt_error = true;
            }
        },
        isValidString(input: string) {
            const regex = /^[a-zA-Z\s]*$/;
            return regex.test(input);
        },
        searchFirstLastName(srch_str: string) {
            const people_array_tem = [] as any;
            const nameRegex = new RegExp(srch_str, "i");
            this.people_cpy.forEach((person: any) => {
                if (nameRegex.test(person.name) == true) {
                    people_array_tem.push(person);
                }
            });
            this.people = people_array_tem;
        },
    },
});
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
.appointment-list {
    overflow-y: auto;
}
.pagination-controls {
    margin-top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.pagination-info {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-grow: 1;
    justify-content: center;
}

.items-per-page {
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
}

.items-per-page ion-select {
    width: 70px;
}

.page-counter {
    white-space: nowrap;
}

.nav-button {
    --padding-start: 8px;
    --padding-end: 8px;
}

@media (max-width: 768px) {
    .pagination-controls {
        flex-direction: column;
        gap: 80px;
    }

    .pagination-info {
        flex-direction: column;
        width: 100%;
    }

    .nav-button {
        width: 100%;
    }
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
.error-label {
    color: #b42318;
    text-transform: none;
    float: right;
}
</style>
