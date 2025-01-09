<template>
    <ion-content class="content">
        <div class="topStats">
            <div>
                <div :style="backgroundStyle">
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
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController, IonCheckbox } from "@ionic/vue";
import { defineComponent } from "vue";
import { icons } from "@/utils/svg";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { createModal } from "@/utils/Alerts";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { mapState } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import BasicCard from "@/components/BasicCard.vue";
import { WebSocketService } from "@/services/websocketService";
import DueModal from "@/components/DashboardModal/DueModal.vue";
import { PatientService } from "@/services/patient_service";
import img from "@/utils/Img";
import DashboardMixin from "@/views/Mixin/DashboardMixin.vue";
import { useWorkerStore } from "@/stores/workerStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
export default defineComponent({
    name: "Menu",
    mixins: [DashboardMixin],
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonCheckbox,
        BasicForm,
        BasicCard,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data() {
        return {
            route: "",
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
            reportData: "" as any,
        };
    },
    computed: {
        ...mapState(useEnrollementStore, ["substance"]),
        backgroundStyle() {
            return {
                background: `linear-gradient(180deg, rgba(150, 152, 152, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%), url(${img("backgroundImg.png")})`,
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
                height: "22.8vh",
            };
        },
    },
    watch: {},

    async mounted() {
        const wsService = new WebSocketService();
        wsService.setMessageHandler(this.onMessage);
    },
    methods: {
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
        openDueModal(name: any) {
            const dataToPass = { title: name };
            createModal(DueModal, { class: "fullScreenModal" }, true, dataToPass);
        },

        async openClientProfile(patientID: any) {
            const patientData = await PatientService.findByNpid(patientID);
            await useDemographicsStore().setPatientRecord(patientData[0]);
            this.$router.push("patientProfile");
        },
    },
});
</script>

<style scoped>
.totalStats {
    padding-bottom: 2vw;
    border-radius: 5px;
    width: 100%;
    height: 16vh;
    align-content: center;
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
.maleColor {
    background: #5983ba;
}
.femaleColor {
    background: #876d9b;
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
.dot {
    font-size: 25px;
}
.client_name {
    font-size: 1em;
    font-weight: 600;
}
.demographicsText {
    font-size: 1em;
}
.content {
    --background: #fff;
}
</style>
