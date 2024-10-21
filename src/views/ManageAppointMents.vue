<template>
    <ion-page>
        <NavigationMenu />
        <ion-content>
            <div class="container">
                <ion-row>
                    <ion-col>
                        <basic-form :contentData="startEndDate" @update:inputValue="handleInputData"></basic-form>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-button expand="block" @click="navigationMenu()" class="custom-button">
                            <span class="button-content">
                                <span class="button-text">View Appointments</span>
                                <ion-icon :icon="arrowForward"></ion-icon>
                            </span>
                        </ion-button>
                    </ion-col>
                </ion-row>
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
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
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
    arrowForward,
} from "ionicons/icons";

export default defineComponent({
    name: "ManageAppointMents",
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
        const startDate = ref(HisDate.currentDate());
        const endDate = ref(HisDate.currentDate());
        return {
            startDate,
            endDate,
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
            chevronForwardOutline,
            bookOutline,
            searchOutline,
            arrowForward,
        };
    },
    computed: {
        ...mapState(useStartEndDate, ["startEndDate"]),
    },
    watch: {
        $route: {
            async handler(data) {
                if (data.name == "manageAppointMents") this.initNavData();
            },
            deep: true,
        },
    },
    async mounted() {
        this.initNavData();
    },
    methods: {
        async handleInputData(event: any) {
            if (event.inputHeader == "Start date") {
                this.startDate = HisDate.toStandardHisFormat(event.value);
            }
            if (event.inputHeader == "End date") {
                this.endDate = HisDate.toStandardHisFormat(event.value);
            }

            const store = useImmunizationAppointMentStore();
            store.setStartEndDate(this.startDate, this.endDate);
        },
        initNavData() {
            const store = EIRreportsStore();
            store.setNavigationPayload("Manage Appointments", true, false, "/", "home", "");
        },
        navigationMenu(): void {
            const store = EIRreportsStore();
            const date_span_substr = HisDate.toStandardHisDisplayFormat(this.startDate).concat(
                " To  ",
                HisDate.toStandardHisDisplayFormat(this.endDate)
            );
            store.setNavigationPayload("Manage Appointments", true, false, "/", "manageAppointMents", date_span_substr);
            this.$router.push("ManageAppointMentsTemplate");
        },
    },
});
</script>

<style scoped>
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

.custom-button {
    --padding-start: 16px;
    --padding-end: 16px;
}

.button-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.button-text {
    font-size: 20px;
}
</style>
