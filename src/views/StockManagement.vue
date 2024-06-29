<template>
    <ion-page>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h1 style="width: 100%; text-align: center; font-weight: 700">Stock Management</h1>
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center">
                    <div class="bigGroupButton">
                        <ion-button :color="selectedButton === 'all' ? 'tertiary' : 'secondary'" @click="selectButton('all')">
                            <div>
                                <div class="centerBigBtnContain bigBtnHeader">455</div>
                                <div class="centerBigBtnContain">All Stock</div>
                            </div>
                        </ion-button>
                        <ion-button :color="selectedButton === 'current' ? 'tertiary' : 'secondary'" @click="selectButton('current')">
                            <div>
                                <div class="centerBigBtnContain bigBtnHeader">455</div>
                                <div class="centerBigBtnContain">Current Stock</div>
                            </div>
                        </ion-button>
                        <ion-button :color="selectedButton === 'out' ? 'tertiary' : 'secondary'" @click="selectButton('out')">
                            <div>
                                <div class="centerBigBtnContain bigBtnHeader">455</div>
                                <div class="centerBigBtnContain">Out of Stock</div>
                            </div>
                        </ion-button>
                    </div>
                    <div>
                        <ion-button class="addBtn" color="primary" @click="openAddStockModal()">
                            <div>
                                <div class="centerBigBtnContain">+ Add Product</div>
                            </div>
                        </ion-button>
                    </div>
                </div>
                <DataTable :options="options" :data="reportData" class="display nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Batch No</th>
                            <th>Product Name</th>
                            <th>Opening Stock</th>
                            <th>In</th>
                            <th>Out</th>
                            <th>Closing Stock</th>
                            <th>Expire date</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
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
import webSocketService from "@/services/websocketService";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import DynamicButton from "@/components/DynamicButton.vue";
import AddStockModal from "@/components/StockManagement/AddStockModal.vue";
import { createModal } from "@/utils/Alerts";
// import "datatables.net-select";
// DataTable.use(DataTablesCore);
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
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
        DataTable,
        IonCard,
        DynamicButton,
    },
    data() {
        return {
            controlGraphs: "months" as any,
            reportData: [
                ["2024-06-01", "B12345", "Vaccine A", 1000, 500, 300, 1200, "2024-10-01"],
                ["2024-06-02", "B12346", "Vaccine B", 800, 200, 100, 900, "2024-10-01"],
                ["2024-06-03", "B12347", "Vaccine C", 1500, 700, 400, 1800, "2024-10-01"],
                ["2024-06-04", "B12348", "Vaccine D", 900, 300, 200, 1000, "2024-10-01"],
                ["2024-06-05", "B12349", "Vaccine E", 1200, 600, 500, 1300, "2024-10-01"],
            ] as any,
            options: {
                responsive: true,
                select: true,
            } as any,
            selectedButton: "all",
        };
    },
    computed: {
        ...mapState(useGeneralStore, ["OPDActivities"]),
    },
    $route: {
        async handler() {
            webSocketService.setMessageHandler(this.onMessage);
        },
        deep: true,
    },
    async mounted() {
        DataTable.use(DataTablesCore);

        this.setView();
        this.startTimer();
        webSocketService.setMessageHandler(this.onMessage);
        this.getPatientSummary();
    },
    methods: {
        selectButton(button: any) {
            this.selectedButton = button;
        },
        openAddStockModal() {
            createModal(AddStockModal, { class: "otherVitalsModal" });
        },
        onMessage(event: MessageEvent) {
            const data = JSON.parse(event.data);
            if (data.identifier === JSON.stringify({ channel: "ImmunizationReportChannel" })) {
                this.reportData = data.message;
                console.log("🚀 ~ onMessage ~ this.reportData :", this.reportData);
            }
        },
        getPatientSummary: async function () {
            const data = await Service.getJson("immunization/stats", {
                start_date: HisDate.getDateBeforeByDays(HisDate.currentDate(), 365),
                end_date: HisDate.currentDate(),
            });
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

    /* text_color */
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
.graphCard {
    width: 98vw;
    margin: 0 auto;
    margin-top: 10px;
}
.modal_wrapper {
    border-radius: 8px;
}
.bigButton {
    font-weight: 500;
    height: 180px;
}
.centerBigBtnContain {
    align-items: center;
    align-content: center;
}
.bigBtnHeader {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
}
ion-button {
    height: 60px;
    margin: 20px;
    margin-left: 0px;
}
.addBtn {
    height: 50px;
    align-items: center;
}
</style>
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>
