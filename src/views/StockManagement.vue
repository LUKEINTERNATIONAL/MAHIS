<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content style="--background: #fff">
            <div class="container">
                <h1 style="width: 100%; text-align: center; font-weight: 700">Stock Management</h1>
                <div style="width: 80vw; top: -10px; position: relative; margin-right: 10px">
                    <basic-form :contentData="searchName" @update:inputValue="handleInputData"></basic-form>
                </div>
                <div class="drug_content" v-for="(item, index) in reportData" :key="index">
                    <ion-row class="search_header">
                        <ion-col class="sticky-column"
                            ><h1>{{ item.drug_legacy_name }}</h1>
                        </ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Batch/Lot Number</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.batch_number }}</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Manufacturer</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">Zodiak</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Expiration date</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ formatDate(item.expiry_date) }}</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Dosage Form </ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">vial</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">VVM stage </ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">3</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Date received</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ formatDate(item.delivery_date) }}</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Stock Issued</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.delivered_quantity }}</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Stock Available</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.dispensed_quantity }}</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Current Stock</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.current_quantity }}</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">VVM stage</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">5</ion-col>
                    </ion-row>
                    <ion-row class="search_header">
                        <ion-col style="max-width: 188px; min-width: 100px" class="contentBold">Unit Doses</ion-col>
                        <ion-col style="max-width: 188px; min-width: 100px" class="content">5</ion-col>
                    </ion-row>
                    <div>
                        <div>
                            <DynamicButton color="danger" name="Discard Stock" />
                            <DynamicButton color="success" name="Update Stock" />
                        </div>
                    </div>
                </div>
            </div>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end" @click="openAddStockModal()">
                <ion-fab-button color="primary"> <ion-icon :icon="add"></ion-icon> </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonCard,
    IonButton,
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
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import DynamicButton from "@/components/DynamicButton.vue";
import AddStockModal from "@/components/StockManagement/AddStockModal.vue";
import { createModal } from "@/utils/Alerts";
import { StockService } from "@/services/stock_service";
import { useStockStore } from "@/stores/StockStore";
import { useStartEndDate } from "@/stores/StartEndDate";
import { useSearchName } from "@/stores/SearchName";
import { DrugService } from "@/services/drug_service";
import BasicForm from "@/components/BasicForm.vue";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
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
import "datatables.net-select";
import { ar } from "date-fns/esm/locale";
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
        BasicForm,
        IonIcon,
        IonFab,
        IonFabButton,
        IonFabList,
        IonButton,
    },
    data() {
        return {
            reportData: [] as any,
            currentStock: [] as any,
            allStock: [] as any,
            outStock: [] as any,
            startDate: HisDate.currentDate(),
            endDate: HisDate.currentDate(),
            options: {
                responsive: true,
                select: true,
            } as any,
            selectedButton: "all",
            isLoading: false,
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
        ...mapState(useStockStore, ["stock"]),
        ...mapState(useSearchName, ["searchName"]),
    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {
        stock: {
            async handler() {
                // await this.buildTableData();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.buildTableData();
    },
    methods: {
        formatDate(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
        },
        async handleInputData(event: any) {
            if (event.inputHeader == "Start date") {
                this.startDate = HisDate.toStandardHisFormat(event.value);
            }
            if (event.inputHeader == "End date") {
                this.endDate = HisDate.toStandardHisFormat(event.value);
            }
            await this.buildTableData();
        },
        async buildTableData() {
            this.isLoading = true;
            try {
                const stockService = new StockService();
                this.reportData = await stockService.getItems("2000-01-01", this.endDate);
            } catch (error) {
                toastWarning("An error occurred while loading data.");
            } finally {
                this.isLoading = false;
            }
        },
        async selectButton(button: any) {
            this.selectedButton = button;
            await this.buildTableData();
        },
        async openAddStockModal() {
            const data: any = await createModal(AddStockModal, { class: "otherVitalsModal" });
            if (data == "dismiss") {
                await this.buildTableData();
            }
        },
    },
});
</script>

<style scoped>
.contentBold {
    font-weight: 700;
}
.container {
    display: flex;
    align-content: center;
    align-items: center;
}
.drug_content {
    padding-bottom: 5px;
    border-bottom: 1px solid #f2f2f2;
}
.bigGroupButton {
    margin-top: 10px;
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
    margin-right: 30px;
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
