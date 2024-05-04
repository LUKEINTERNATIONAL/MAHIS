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
            <div class="total">
                <div class="totalNumber">3,764</div>
                <div class="totalText">Children & Adults vaccinated this year!</div>
            </div>
            <ion-img :src="loadImage('immunizationHome.jpeg')" alt="home image"></ion-img>
            <div class="graphBackground">
                <div class="dueMiss">
                    <div class="due">
                        <div class="dueMissText">Due for vaccination today</div>
                        <div class="dueNumber">104</div>
                    </div>
                    <div class="missed">
                        <div class="dueMissText">Those with missed doses</div>
                        <div class="missedNumber">264</div>
                    </div>
                </div>
                <div class="clientSeen">
                    <div class="clientSeenTitle">Clients you have seen today.</div>
                    <div class="clientSeenBoxes">
                        <div class="clientSeenBox">
                            <div class="clientSeenBoxText">New</div>
                            <div class="clientSeenBoxNumber">15</div>
                        </div>
                        <div class="clientSeenBoxChild clientSeenBox">
                            <div class="clientSeenBoxText">Children</div>
                            <div class="clientSeenBoxNumber">63</div>
                        </div>
                        <div class="clientSeenBoxMen clientSeenBox">
                            <div class="clientSeenBoxText">Women</div>
                            <div class="clientSeenBoxNumber">59</div>
                        </div>
                        <div class="clientSeenBoxWomen clientSeenBox">
                            <div class="clientSeenBoxText">Men</div>
                            <div class="clientSeenBoxNumber">27</div>
                        </div>
                    </div>
                </div>
                <div>
                    <ImmunizationTrendsGraph v-if="controlGraphs == 'months'" />
                    <ImmunizationGroupGraph v-if="controlGraphs == 'group'" />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { Service } from "@/services/service";
import img from "@/utils/Img";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
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
        ImmunizationTrendsGraph,
        ImmunizationGroupGraph,
    },
    data() {
        return {
            controlGraphs: "months" as any,
        };
    },
    mounted() {
        this.setView();
        // Start the timer on component mount
        this.startTimer();
    },
    methods: {
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
            }, 7000);
        },
    },
});
</script>

<style scoped>
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
    background: linear-gradient(158.6deg, #467085 -12.55%, #f8f8f8 33.84%);
    border-radius: 10px;
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

    /* text_color */
    color: #00190e;
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
    font-weight: 500;
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

    /* blue/800 */
    color: #0075b7;
}
.missedNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;

    color: #ff6378;
}
.clientSeen {
    height: 120px;
    margin-top: 15px;
    background: #ddeedd;
}
.clientSeenTitle {
    padding-top: 10px;
    margin-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #2d3648;
}
.clientSeenBoxChild {
    background: #2d3648 !important;
}
.clientSeenBoxMen {
    background: #004d4d !important;
}
.clientSeenBoxWomen {
    background: #556080 !important;
}
.clientSeenBox {
    width: 68px;
    height: 68px;
    background: #006401;
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
</style>
