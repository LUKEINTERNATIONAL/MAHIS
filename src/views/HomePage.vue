<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true" v-if="programID() != 33">
            <div id="container">
                <strong>Search your patient profile</strong>
                <p>
                    Use searchbar below to find your patient <br />
                    profile and start the triage
                </p>
                <div class="centered-content">
                    <!-- Your component goes here -->
                    <ToolbarSearch />
                </div>
            </div>
        </ion-content>
        <ion-content class="content" v-if="programID() == 33">
            <div>
                <ion-card class="section">
                    <ion-card-header> <ion-card-title class="cardTitle">Yearly stats </ion-card-title></ion-card-header>
                    <ion-card-content>
                        <div class="stats">
                            <div class="totalStats" style="background: rgb(210, 237, 198)">
                                <div class="statsValue">{{ reportData?.total_client_registered || 0 }}</div>
                                <div class="statsText">Total vaccinated this year</div>
                            </div>
                            <div class="statsSectionBorder"></div>
                            <div class="totalStats" style="background: rgb(241, 228, 153)">
                                <div class="statsValue">{{ reportData?.total_female_registered || 0 }}</div>
                                <div class="statsText">Total Female vaccinated this year</div>
                            </div>
                            <div class="statsSectionBorder"></div>
                            <div class="totalStats" style="background: rgb(188, 178, 188)">
                                <div class="statsValue">{{ reportData?.total_male_registered || 0 }}</div>
                                <div class="statsText">Total Male vaccinated this year</div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
                <ion-card class="section">
                    <ion-card-header> <ion-card-title class="cardTitle"> Clients due </ion-card-title></ion-card-header>
                    <ion-card-content>
                        <div class="dueCardContent">
                            <div class="dueCard" style="border: 1px solid rgb(158, 207, 136)">
                                <div class="statsValue">0</div>
                                <div class="statsText">Due today</div>
                            </div>
                            <div class="dueCard" style="border: 1px solid rgb(239, 221, 121)">
                                <div class="statsValue">0</div>
                                <div class="statsText">Due this week</div>
                            </div>
                            <div class="dueCard" style="border: 1px solid rgb(241, 154, 154)">
                                <div class="statsValue">0</div>
                                <div class="statsText">Due this month</div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
                <ion-card class="section">
                    <ion-card-header> <ion-card-title class="cardTitle"> Clients overdue </ion-card-title></ion-card-header>
                    <ion-card-content>
                        <div class="overDueCardContent">
                            <div class="overDueCard">
                                <div class="statsValue">0</div>
                                <div class="statsText">Under 5yrs</div>
                            </div>
                            <div class="overDueCard">
                                <div class="statsValue">0</div>
                                <div class="statsText">Over 5yrs</div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
                <ion-card class="section">
                    <ion-card-header>
                        <ion-card-title class="cardTitle"> Today appointments({{ appointments.length }}) </ion-card-title></ion-card-header
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
                                </div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { Service } from "@/services/service";
import img from "@/utils/Img";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
import { getVaccinesData } from "@/apps/Immunization/services/dashboard_service";
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
import SetPrograms from "@/views/Mixin/SetPrograms.vue";
import Programs from "@/components/Programs.vue";
import { resetDemographics } from "@/services/reset_data";
export default defineComponent({
    name: "Home",
    mixins: [SetUser, SetDemographics, SetPrograms],
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
    },
    data() {
        return {
            controlGraphs: "months" as any,
            reportData: "" as any,
            appointments: [] as any,
            programBtn: {} as any,
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
        };
    },
    computed: {
        ...mapState(useGeneralStore, ["OPDActivities"]),
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    watch: {
        $route: {
            async handler(data) {
                if (data.name == "Home") resetDemographics();
                await this.setAppointments();
                const wsService = new WebSocketService();
                wsService.setMessageHandler(this.onMessage);
            },
            deep: true,
        },
    },
    async mounted() {
        resetDemographics();
        await this.setAppointments();
        this.setView();
        this.startTimer();
        const wsService = new WebSocketService();
        wsService.setMessageHandler(this.onMessage);
    },
    methods: {
        async setAppointments() {
            this.appointments = await AppointmentService.getDailiyAppointments(HisDate.currentDate());
        },
        async openClientProfile(patientID: any) {
            const patientData = await PatientService.findByNpid(patientID);
            this.setDemographics(patientData[0]);
            this.$router.push("patientProfile");
        },
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        onMessage(event: MessageEvent) {
            const data = JSON.parse(event.data);
            if (data.identifier === JSON.stringify({ channel: "ImmunizationReportChannel" })) {
                this.reportData = data.message;
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
        startTimer() {
            // Set a timer to switch graphs every 5 seconds
            setInterval(() => {
                // Toggle between 'months' and 'group'
                this.controlGraphs = this.controlGraphs === "months" ? "group" : "months";
            }, 15000);
        },
    },
});
</script>

<style scoped>
.totalStats {
    padding: 2vw;
    padding-top: 2vw;
    padding-bottom: 2vw;
    border-radius: 5px;
    padding-top: 4vw;
    padding-bottom: 4vw;
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
}

.overDueCardContent {
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.overDueCard {
    border: 1px solid #ccc;
    padding: 4vw;
    border-radius: 8px;
    min-width: 150px;
    transition: background-color 0.6s, color 0.6s, transform 0.2s;
    user-select: none;
    background: rgb(254, 205, 202);
}
.dueCard {
    border: 1px solid #ccc;
    padding: 4vw;
    border-radius: 8px;
    min-width: 100px;
    transition: background-color 0.6s, color 0.6s, transform 0.2s;
    user-select: none;
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
    color: #5d5d5d;
}
.statsText {
    font-weight: 400;
    font-size: 1em;
    line-height: 20px;
    color: #767171;
}
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
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
</style>
