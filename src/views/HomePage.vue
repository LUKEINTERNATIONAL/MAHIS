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
        <ion-content v-if="programID() == 33">
            <ion-card class="section">
                <ion-card-header> <ion-card-title class="cardTitle">Yearly stats </ion-card-title></ion-card-header>
                <ion-card-content>
                    <div class="stats">
                        <div>
                            <div class="statsValue">{{ reportData?.total_vaccinated || 0 }}</div>
                            <div class="statsText">Total client</div>
                        </div>
                        <div class="statsSectionBorder"></div>
                        <div>
                            <div class="statsValue">{{ reportData?.total_women_vaccinated_today || 0 }}</div>
                            <div class="statsText">Total female</div>
                        </div>
                        <div class="statsSectionBorder"></div>
                        <div>
                            <div class="statsValue">{{ reportData?.total_men_vaccinated_today || 0 }}</div>
                            <div class="statsText">Total male</div>
                        </div>
                    </div>
                </ion-card-content>
            </ion-card>
            <ion-card class="section">
                <ion-card-header> <ion-card-title class="cardTitle"> Due for vaccination </ion-card-title></ion-card-header>
                <ion-card-content>
                    <div class="dueCardContent">
                        <div class="dueCard">
                            <div class="dueCardValue">0</div>
                            <div>Today</div>
                        </div>
                        <div class="dueCard">
                            <div class="dueCardValue">0</div>
                            <div>This week</div>
                        </div>
                        <div class="dueCard">
                            <div class="dueCardValue">0</div>
                            <div>This month</div>
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
                        style="display: flex; margin-bottom: 10px"
                        v-for="(item, index) in appointments"
                        :key="index"
                        @click="openClientProfile(item.npid)"
                    >
                        <div style="margin-right: 15px">
                            <div :class="item.gender == 'M' ? 'initialsBox maleColor' : 'initialsBox femaleColor'">
                                <ion-icon style="color: #fff; font-size: 60px" :icon="person"></ion-icon>
                            </div>
                        </div>
                        <div style="align-items: center; display: flex">
                            <div style="line-height: 1">
                                <div class="client_name">
                                    <div class="name">{{ item.name }} {{ item.family_name }}</div>
                                </div>
                                <div class="demographicsOtherRow">
                                    <div class="demographicsText">
                                        {{ demographics.gender == "M" ? "Male" : "Female" }}
                                        <span class="dot">.</span>{{ formatBirthdate(item.birthdate) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button color="primary"> <ion-icon :icon="grid"></ion-icon> </ion-fab-button>
                <ion-fab-list side="top">
                    <ion-fab-button @click="setProgram(btn)" v-for="(btn, index) in programBtn" :key="index" :data-desc="btn.actionName">
                        <ion-icon :icon="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab-list>
            </ion-fab>
        </ion-content>
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
export default defineComponent({
    name: "Home",
    mixins: [SetUser, SetDemographics],
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
            async handler() {
                await this.setAppointments();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.setAppointments();
        this.setView();
        this.startTimer();
        this.setProgramInfo();
        const wsService = new WebSocketService();
        wsService.setMessageHandler(this.onMessage);
    },
    methods: {
        async setAppointments() {
            this.appointments = await AppointmentService.getDailiyAppointments(HisDate.currentDate());
        },
        async setProgramInfo() {
            this.programBtn = await UserService.userProgramData();
        },
        async openClientProfile(patientID: any) {
            const patientData = await PatientService.findByNpid(patientID);
            this.setDemographics(patientData[0]);
            this.$router.push("patientProfile");
        },
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        setProgram(program: any) {
            sessionStorage.setItem("app", JSON.stringify({ programID: program.program_id, applicationName: program.name }));
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
ion-card {
    margin-bottom: 20px;
}
.client_name {
    font-size: 16px;
    font-weight: 600;
}
.dot {
    font-size: 25px;
}
.initialsBox {
    width: 70px;
    height: 70px;
    left: 31px;
    top: 122px;
    align-items: center;
    border-radius: 10px;
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
    font-size: 18px;
    font-weight: 600;
}
.dueCardContent {
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.dueCard {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    min-width: 100px;
}
.statsSectionBorder {
    border-left: 1px solid #ccc;
}
.stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 0.01px solid #ccc;
}
.cardTitle {
    border-bottom: 0.01px solid #ccc;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 560;
    color: #5d5d5d;
}
.statsValue {
    font-weight: 600;
    font-size: 30px;
    line-height: 37px;
    color: #5d5d5d;
}
.statsText {
    font-weight: 500;
    font-size: 16px;
    line-height: 37px;
    color: #8c8c8c;
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
    font-size: 16px;
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
</style>
