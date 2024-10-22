<template>
    <ion-page>
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content :fullscreen="true" v-if="programID() != 33 && programID() != 14 && programID() != 32">
            <div id="container">
                <strong>Search your patient profile</strong>
                <p>
                    Use searchbar below to find your patient <br />
                    profile and start the triage
                </p>
                <div class="centered-content">
                    <ToolbarSearch />
                </div>
            </div>
        </ion-content>
        <ion-content :fullscreen="true" v-else-if="programID() == 14">
            <div id="containertwo">
                <div class="centered-content OPDDueCardWrapper">
                    <ion-card class="section" style="width: 80%">
                        <ion-card-header>
                            <ion-card-title class="cardTitle">Today's patients list</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <div class="OPDDueCardContent">
                                <div
                                    class="OPDDueCard"
                                    @click="openAllModal('All patients today', 'View profile', '/patientProfile')"
                                    :style="dueCardStyle('success')"
                                >
                                    <ion-icon :icon="people" class="dueCardIcon"></ion-icon>
                                    <div class="OPDStatsValue">{{ totalPatientsToday }}</div>
                                    <div class="OPDStatsText">Total patients today</div>
                                </div>
                                <div
                                    class="OPDDueCard"
                                    @click="openPatientsListModal('Patients waiting for vitals', 'VITALS', 'Vitals', '/OPDVitals')"
                                    :style="dueCardStyle('success')"
                                    v-if="canViewVitals"
                                >
                                    <ion-icon :icon="thermometer" class="dueCardIcon"></ion-icon>
                                    <div class="OPDStatsValue">{{ patientsWaitingForVitals.length }}</div>
                                    <div class="OPDStatsText">Waiting for vitals</div>
                                </div>

                                <div
                                    class="OPDDueCard"
                                    @click="
                                        openPatientsListModal(
                                            'Patients waiting for consultation',
                                            'CONSULTATION',
                                            'Consultation',
                                            '/OPDConsultationPlan'
                                        )
                                    "
                                    :style="dueCardStyle('success')"
                                    v-if="canViewConsultation"
                                >
                                    <ion-icon :icon="clipboard" class="dueCardIcon"></ion-icon>
                                    <div class="OPDStatsValue">{{ patientsWaitingForConsultation.length }}</div>
                                    <div class="OPDStatsText">Waiting for consultation</div>
                                </div>

                                <div
                                    class="OPDDueCard"
                                    @click="openPatientsListModal('Patients waiting for lab', 'LAB', 'Lab', '/OPDConsultationPlan')"
                                    :style="dueCardStyle('success')"
                                    v-if="canViewLab"
                                >
                                    <ion-icon :icon="clipboard" class="dueCardIcon"></ion-icon>
                                    <div class="OPDStatsValue">{{ patientsWaitingForLab.length }}</div>
                                    <div class="OPDStatsText">Waiting for lab</div>
                                </div>
                                <div
                                    class="OPDDueCard"
                                    @click="
                                        openPatientsListModal('Patients waiting for dispensation', 'DISPENSATION', 'Dispensation', '/dispensation')
                                    "
                                    :style="dueCardStyle('success')"
                                    v-if="canViewDispensation"
                                >
                                    <ion-icon :icon="medkit" class="dueCardIcon"></ion-icon>
                                    <div class="OPDStatsValue">{{ patientsWaitingForDispensation.length }}</div>
                                    <div class="OPDStatsText">Waiting for dispensation</div>
                                </div>
                            </div>
                        </ion-card-content>
                    </ion-card>
                </div>
            </div>
        </ion-content>
        <ion-content class="content" v-if="programID() == 33">
            <div class="topStats">
                <div>
                    <div :style="backgroundStyle">
                        <!-- :autoplay="4000" -->
                        <Carousel :autoplay="4000" :wrap-around="true" :itemsToShow="1.2" :transition="600" style="padding-top: 20px">
                            <Slide v-for="slide in totalStats" :key="slide">
                                <div class="totalStats" style="background: linear-gradient(180deg, #20b2aa 0%, #40c0b0 50%, rgb(233, 233, 233) 100%)">
                                    <div class="statsValue" style="font-size: 1.4em">{{ slide.value }}</div>
                                    <div class="statsText" style="font-size: 0.9em">{{ slide.name }}</div>
                                </div>
                            </Slide>
                            <template #addons>
                                <Pagination />
                            </template>
                        </Carousel>
                    </div>
                </div>

                <ion-card class="section">
                    <ion-card-header> <ion-card-title class="cardTitle"> Clients due </ion-card-title></ion-card-header>
                    <ion-card-content>
                        <div class="dueCardContent">
                            <div class="dueCard" @click="openDueModal('Client due today')" style="border: 1px solid rgb(158, 207, 136)">
                                <div class="statsValue">{{ reportData?.due_today_count || 0 }}</div>
                                <div class="statsText">Due today</div>
                            </div>
                            <div class="dueCard" style="border: 1px solid rgb(239, 221, 121)" @click="openDueModal('Client due this week')">
                                <div class="statsValue">{{ reportData?.due_this_week_count || 0 }}</div>
                                <div class="statsText">Due this week</div>
                            </div>
                            <div class="dueCard" style="border: 1px solid rgb(241, 154, 154)" @click="openDueModal('Client due this month')">
                                <div class="statsValue">{{ reportData?.due_this_month_count || 0 }}</div>
                                <div class="statsText">Due this month</div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
                <ion-card class="section">
                    <ion-card-header> <ion-card-title class="cardTitle"> Clients overdue </ion-card-title></ion-card-header>
                    <ion-card-content>
                        <div class="overDueCardContent">
                            <div class="overDueCard" @click="openDueModal('Client overdue under 5yrs')">
                                <div class="statsValue">{{ reportData?.under_five_overdue || 0 }}</div>
                                <div class="statsText">Under 5yrs</div>
                            </div>
                            <div class="overDueCard" @click="openDueModal('Client overdue over 5yrs')">
                                <div class="statsValue">{{ reportData?.over_five_overdue || 0 }}</div>
                                <div class="statsText">Over 5yrs</div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
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
            </div>
        </ion-content>
        <NCDHomePage v-if="programID() == 32" />
        <Programs :programBtn="programBtn" @clicked="setProgram($event)" />
    </ion-page>
</template>

<script lang="ts">
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { Service } from "@/services/service";
import img from "@/utils/Img";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { mapState } from "pinia";
import { UserService } from "@/services/user_service";
import SetUser from "@/views/Mixin/SetUser.vue";
import ApiClient from "@/services/api_client";
import HisDate from "@/utils/Date";
import { WebSocketService } from "@/services/websocketService";
import { Appointment } from "../apps/Immunization/services/immunization_appointment_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { AppointmentService } from "@/services/appointment_service";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";
import { PatientService } from "@/services/patient_service";
import NCDHomePage from "@/apps/NCD/components/NCDHomePage.vue";
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
    clipboard,
    thermometer,
    people,
} from "ionicons/icons";
import SetPrograms from "@/views/Mixin/SetPrograms.vue";
import DueModal from "@/components/DashboardModal/DueModal.vue";
import OfflineStatusModal from "@/components/Modal/OfflineStatus.vue";
import Programs from "@/components/Programs.vue";
import { resetDemographics } from "@/services/reset_data";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { createModal } from "@/utils/Alerts";
import OPDWaitingListModal from "@/components/DashboardModal/OPDWaitingListModal.vue";
import OPDAllPatientsModal from "@/components/DashboardModal/OPDAllPatientsModal.vue";
import { getBaseURL } from "@/utils/GeneralUti";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import { useWebWorker } from "@vueuse/core";
import { getUserLocation } from "@/services/userService";
import { PatientOpdList } from "@/services/patient_opd_list";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import workerData from "@/activate_worker";
import { useStatusStore } from "@/stores/StatusStore";

export default defineComponent({
    name: "Home",
    mixins: [SetUser, SetDemographics, SetPrograms, SetUserRole],
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
        ImmunizationTrendsGraph,
        ImmunizationGroupGraph,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        Programs,
        Carousel,
        Slide,
        Pagination,
        Navigation,
        getBaseURL,
        NCDHomePage,
    },
    data() {
        return {
            workerApi: null as any,
            controlGraphs: "months" as any,
            reportData: "" as any,
            appointments: [] as any,
            dataToPass: { payloadData: "tes" } as any,
            programBtn: {} as any,
            totalPatientsToday: 0,
            base_url: "backgroundImg.png",
            isLoading: false,
            totalStats: [
                {
                    name: "Total vaccinated this year",
                    value: 0,
                },
                {
                    name: "Total Female vaccinated this year",
                    value: 0,
                },
                {
                    name: "Total Male vaccinated this year",
                    value: 0,
                },
            ] as any,
            canViewVitals: false,
            canViewConsultation: false,
            canViewLab: false,
            canViewDispensation: false,
            userRoles: [] as any,
        };
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
            people,
            thermometer,
            clipboard,
        };
    },
    computed: {
        ...mapState(useGeneralStore, ["OPDActivities"]),
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useStatusStore, ["offlineVillageStatus", "offlineDistrictStatus", "offlineTAsStatus", "offlineRelationshipStatus"]),
        ...mapState(usePatientList, [
            "patientsWaitingForVitals",
            "patientsWaitingForConsultation",
            "patientsWaitingForLab",
            "patientsWaitingForDispensation",
        ]),

        backgroundStyle() {
            return {
                background: `linear-gradient(180deg, rgba(150, 152, 152, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%), url(${img(this.base_url)})`,
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
                height: "22.8vh",
            };
        },
    },
    watch: {
        $route: {
            async handler(data) {
                if (data.name == "Home") resetDemographics();
                await this.setAppointments();
                await this.fetchUserData();
                // cannot subscribe more than once
                // const wsService = new WebSocketService();
                // wsService.setMessageHandler(this.onMessage);
            },
            deep: true,
        },
        workerApi: {
            handler() {
                const status = useStatusStore();
                if (this.workerApi?.data?.payload) {
                    if (this.workerApi?.data?.payload?.total_relationships) status.setOfflineRelationshipStatus(this.workerApi?.data?.payload);
                    if (this.workerApi?.data?.payload?.total_village) status.setOfflineVillageStatus(this.workerApi?.data?.payload);
                    if (this.workerApi?.data?.payload?.total_districts) status.setOfflineDistrictStatus(this.workerApi?.data?.payload);
                    if (this.workerApi?.data?.payload?.total_TAs) status.setOfflineTAsStatus(this.workerApi?.data?.payload);

                    if (
                        this.offlineVillageStatus?.total_village &&
                        this.offlineRelationshipStatus?.total_relationships &&
                        this.offlineDistrictStatus?.total_districts &&
                        this.offlineTAsStatus?.total_TAs &&
                        this.offlineVillageStatus?.total_village == this.offlineVillageStatus?.total &&
                        this.offlineRelationshipStatus?.total_relationships == this.offlineRelationshipStatus?.total &&
                        this.offlineDistrictStatus?.total_districts == this.offlineDistrictStatus?.total &&
                        this.offlineTAsStatus?.total_TAs == this.offlineTAsStatus?.total
                    ) {
                        modalController.dismiss();
                    }
                }
            },
            deep: true,
        },
    },
    async mounted() {
        this.isLoading = true;
        const status = useStatusStore();
        status.setOfflineVillageStatus("");
        status.setOfflineDistrictStatus("");
        status.setOfflineTAsStatus("");
        status.setOfflineRelationshipStatus("");
        this.openOfflineStatusModal("data");
        this.workerApi = workerData.workerApi;
        await workerData.postData("SET_OFFLINE_LOCATION");
        await workerData.postData("SET_OFFLINE_RELATIONSHIPS");
        await workerData.postData("SYNC_PATIENT_RECORD");
        resetDemographics();
        await this.setAppointments();
        this.setView();
        const wsService = new WebSocketService();
        wsService.setMessageHandler(this.onMessage);
        await useGlobalPropertyStore().loadGlobalProperty();
        await this.fetchUserData();
        const location = await getUserLocation();
        const locationId = location ? location.location_id : null;
        if (locationId) {
            try {
                const visitsToday = await PatientOpdList.getAllPatientsVisitsToday();
                this.totalPatientsToday = visitsToday.length;
                await usePatientList().refresh(locationId);
            } catch (error) {}
        }
        this.isLoading = false;
    },
    methods: {
        async fetchUserData() {
            const user = await UserService.getCurrentUser();
            if (user) {
                this.userRoles = user.roles.map((role) => role.role);
                this.updateCardVisibility();
            }
        },
        updateCardVisibility() {
            this.canViewVitals = this.isUserRole("Clinician") || this.isUserRole("Nurse") || this.isUserRole("Superuser");
            this.canViewConsultation = this.isUserRole("Clinician") || this.isUserRole("Superuser");
            this.canViewLab = this.isUserRole("Lab");
            this.canViewDispensation = this.isUserRole("Clinician") || this.isUserRole("Pharmacist") || this.isUserRole("Superuser");
        },

        isUserRole(role: any) {
            return this.userRoles.includes(role);
        },
        dueCardStyle(type: "success" | "warning" | "info" | "danger") {
            const colors = {
                success: "rgb(158, 207, 136)",
                warning: "rgb(239, 221, 121)",
                info: "rgb(144, 202, 249)",
                danger: "rgb(241, 154, 154)",
            };

            return {
                border: `1px solid ${colors[type]}`,
                padding: "20px",
                margin: "10px",
            };
        },

        async setAppointments() {
            this.appointments = await AppointmentService.getDailiyAppointments(HisDate.currentDate());
            if (this.appointments) this.appointments = this.appointments.sort((a: any, b: any) => a.given_name.localeCompare(b.given_name));
        },
        async openClientProfile(patientID: any) {
            const patientData = await PatientService.findByNpid(patientID);
            this.setDemographics(patientData[0]);
            this.$router.push("patientProfile");
        },
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        async onMessage(event: MessageEvent) {
            const data = JSON.parse(event.data);
            if (data.identifier === JSON.stringify({ channel: "ImmunizationReportChannel", location_id: localStorage.getItem("locationID") })) {
                this.reportData = data.message;
                console.log("🚀 ~ onMessage ~ reportData:", this.reportData);
                this.totalStats = [
                    {
                        name: "Total vaccinated this year",
                        value: this.reportData?.total_vaccinated_this_year || 0,
                    },
                    {
                        name: "Total Female vaccinated this year",
                        value: this.reportData?.total_female_vaccinated_this_year || 0,
                    },
                    {
                        name: "Total Male vaccinated this year",
                        value: this.reportData?.total_male_vaccinated_this_year || 0,
                    },
                ];
            }
        },
        setView() {
            Service.getProgramID();
        },
        programID() {
            return Service.getProgramID();
        },
        loadImage(name: any) {
            return img(name);
        },
        openOfflineStatusModal(name: any) {
            const dataToPass = { title: name };
            createModal(OfflineStatusModal, { class: "fullScreenModal" }, false, this.dataToPass);
        },
        openDueModal(name: any) {
            const dataToPass = { title: name };
            createModal(DueModal, { class: "fullScreenModal" }, true, dataToPass);
        },

        openPatientsListModal(name: any, list: "VITALS" | "CONSULTATION" | "LAB" | "DISPENSATION", buttonTitle: string, buttonLink: string) {
            const dataToPass = { title: name, list, buttonTitle, buttonLink };
            createModal(OPDWaitingListModal, { class: "fullScreenModal" }, true, dataToPass);
        },
        openAllModal(name: any, buttonLink: string, buttonTitle: string) {
            const dataToPass = { title: name, buttonLink, buttonTitle };
            createModal(OPDAllPatientsModal, { class: "fullScreenModal" }, true, dataToPass);
        },
        async getImagePath() {
            const BASE_URL = await getBaseURL();
            this.base_url = BASE_URL + this.base_url;
        },
    },
});
</script>
<style scoped>
.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.OPDDueCardWrapper {
    padding: 20px;
}

.OPDDueCardContent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.OPDDueCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    text-align: center;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-basis: calc(100% / 2 - 40px);
    max-width: 300px;
}

@media (min-width: 0px) {
    .OPDDueCard {
        flex-basis: calc(100% / 2 - 40px);
    }

    #containertwo {
        top: 50% !important;
    }
}

@media (min-width: 1024px) {
    .OPDDueCard {
        flex-basis: calc(100% / 4 - 40px);
    }

    #containertwo {
        top: 30%;
    }
}

.dueCardIcon {
    font-size: 30px;
    margin-bottom: 10px;
}

.OPDStatsValue {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.OPDStatsText {
    font-size: 1rem;
    color: #555;
}

.totalStats {
    padding-bottom: 2vw;
    border-radius: 5px;
    width: 100%;
    height: 16vh;
    align-content: center;
}
ion-card {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 1px -1px, rgba(0, 0, 0, 0) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
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
.dueCardValue {
    font-size: 1em;
    font-weight: 600;
}
.dueCardContent {
    display: flex;
    justify-content: space-around;
    text-align: center;
    gap: 2vw;
}

.overDueCardContent {
    display: flex;
    justify-content: space-around;
    text-align: center;
    gap: 2vw;
}
.overDueCard {
    border: 1px solid #ea5959;
    padding: 4vw;
    border-radius: 8px;
    min-width: 150px;
    transition: background-color 0.6s, color 0.6s, transform 0.2s;
    user-select: none;
    background: rgb(254, 205, 202);
    width: 100vw;
}
.overDueCard .statsValue {
    color: #da6e6e;
}
.overDueCard .statsText {
    color: #da6e6e;
}
.overDueCard:hover {
    background-color: #ffc1c1;
    cursor: pointer;
    color: #fff;
}

.overDueCard:active {
    background-color: #fcb4b4;
    color: #fff;
    transform: scale(0.98);
}

.dueCard {
    border: 1px solid #ccc;
    padding: 4vw;
    border-radius: 8px;
    min-width: 100px;
    transition: background-color 0.6s, color 0.6s, transform 0.2s;
    user-select: none;
    width: 100vw;
}

.dueCard:hover {
    background-color: #f0f0f0;
    cursor: pointer;
}

.dueCard:active {
    background-color: #ccc;
    color: #fff;
    transform: scale(0.98);
}

.dueCard.active {
    background-color: #8c8c8c8c;
    color: #fff;
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

.statsSectionBorder {
    border-left: 1px solid #ccc;
}
.stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
    gap: 5px;
}
.cardTitle {
    border-bottom: 0.01px solid #ccc;
    padding-bottom: 10px;
    font-size: 0.9em;
    font-weight: 560;
    color: #5d5d5d;
}
.statsValue {
    font-weight: 600;
    font-size: 1.7em;
    line-height: 37px;
    color: #fff;
}
.statsText {
    font-weight: 400;
    font-size: 1em;
    line-height: 20px;
    color: #fff;
}
.dueCard .statsValue {
    color: #5d5d5d;
}
.dueCard .statsText {
    color: #767171;
}
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    transform: translateY(-50%);
}
#containertwo {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 1em;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
}
.graphBackground {
    position: absolute;
    width: 100vw;
    height: 62vh;
    left: 0px;
    top: 23vh;
    background: linear-gradient(158.66deg, #d6d5d6 0.36%, #f8f8f8 40.1%);
    border-radius: 22px;
}

.total {
    position: absolute;
    width: 251px;
    height: 128px;
    top: 25px;
    left: 50%;
    transform: translate(-50%, 10%);
    text-align: center;
    background: rgba(237, 235, 238, 0.95);
    opacity: 0.8;
    border-radius: 6px;
}
.totalNumber {
    /* 3,764 */

    height: 77px;

    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 77px;

    color: #5d5d5d;
}
.totalText {
    width: 229px;
    height: 48px;

    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
    /* or 22px */
    display: flex;
    align-items: center;
    text-align: center;

    color: #08475e;
}
.dueMiss {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
.missed {
    width: 187px;
    height: 90px;
    left: 14px;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;
}
.due {
    width: 187px;
    height: 90px;
    left: 14px;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;
}
.dueMissText {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 7px;
    color: #004d4d;
}
.dueNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;
    margin-top: 10px;

    /* blue/800 */
    color: #016302;
}
.missedNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;
    margin-top: 10px;

    color: #b42318;
}
.clientSeen {
    height: 120px;
    margin-top: 15px;
    background: #ffffff;
}
.clientSeenTitle {
    padding-top: 10px;
    margin-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #2d3648;
}

.clientSeenBox {
    background: #5d5d5d;
    border-radius: 7px;
    padding-top: 8px;
}
.clientSeenBoxes {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
.clientSeenBoxText {
    /* text-md */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    align-items: center;
    text-align: center;

    /* White */
    color: #ffffff;
}
.clientSeenBoxNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-align: center;

    color: #ffffff;
}
.graphCard {
    width: 98vw;
    margin: 0 auto;
    margin-top: 10px;
}
.modal_wrapper {
    border-radius: 8px;
}
.content {
    --background: #fff;
}
.topStats {
    /* margin-top: 5vw; */
    align-content: center;
}
.carousel__slide {
    padding: 5px;
}

.carousel__viewport {
    perspective: 2000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1);
}
img {
    object-fit: none;
}
</style>
