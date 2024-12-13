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
                <h4 style="width: 100%; text-align: center; font-weight: 700">Inventory Management</h4>
                <div style="width: 80vw; top: -10px; position: relative; margin-right: 10px">
                    <basic-form :contentData="searchName" @update:inputValue="handleInputData"></basic-form>
                </div>
                <div class="drug_container">
                    <div class="drug_content" v-for="(item, index) in reportData?.items" :key="index">
                        <ion-row class="search_header">
                            <ion-col class="">
                                <span style="font-weight: 700; font-size: 16px; color: #939393">{{ item.drug_legacy_name }}</span>
                            </ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Doses Received</ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.delivered_quantity }}</ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Doses wasted</ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.doses_wasted }}</ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Doses Issued</ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.dispensed_quantity }}</ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Doses Available</ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.current_quantity }}</ion-col>
                        </ion-row>

                        <div>
                            <ion-button color="success" size="small" name="Update Stock" style="font-size: 12px" @click="openMoreDetailsModal(item)">
                                More Stock Details
                            </ion-button>
                        </div>
                    </div>
                </div>
                <div class="example-one">
                    <vue-awesome-paginate
                        v-if="combinedBatches?.length > 0"
                        :total-items="combinedBatches?.length"
                        :items-per-page="4"
                        :max-pages-shown="2"
                        v-model="currentPage"
                        @click="onClickHandler"
                    />
                </div>
            </div>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end" @click="openAddStockModal('')" v-if="apiStatus">
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
import { defineComponent, ref, computed } from "vue";
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
import DynamicButton from "@/components/DynamicButton.vue";
import AddStockModal from "@/components/StockManagement/AddStockModal.vue";
import StockManagementModal from "@/components/Modal/StockManagementModal.vue";
import { createModal } from "@/utils/Alerts";
import { StockService } from "@/services/stock_service";
import { useStockStore } from "@/stores/StockStore";
import { useStartEndDate } from "@/stores/StartEndDate";
import { useSearchName } from "@/stores/SearchName";
import { DrugService } from "@/services/drug_service";
import BasicForm from "@/components/BasicForm.vue";
import { toastSuccess, toastWarning, popoverConfirmation } from "@/utils/Alerts";
import { getOfflineRecords } from "@/services/offline_service";
import { useStatusStore } from "@/stores/StatusStore";
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
interface DrugBatch {
    id: number;
    pharmacy_batch_id: number;
    drug_id: number;
    delivered_quantity: number;
    current_quantity: number;
    delivery_date: string;
    expiry_date: string;
    drug_legacy_name: string;
    doses_wasted: number;
    dispensed_quantity: number;
}

interface CombinedDrugBatch {
    drug_legacy_name: string;
    delivered_quantity: number;
    current_quantity: number;
    dispensed_quantity: number;
    doses_wasted: number;
}

export default defineComponent({
    name: "StockManagement",
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
            filter: "" as any,
            startDate: HisDate.currentDate(),
            endDate: HisDate.currentDate(),
            options: {
                responsive: true,
                select: true,
            } as any,
            selectedButton: "all",
            isLoading: false,
            combinedBatches: [] as any,
        };
    },
    setup() {
        const currentPage = ref(1);

        return {
            currentPage,
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
        ...mapState(useStatusStore, ["apiStatus"]),
    },
    watch: {
        stock: {
            async handler() {
                // await this.buildTableData();
            },
            deep: true,
        },
        $route: {
            async handler() {
                await this.buildTableData();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.buildTableData();
    },
    methods: {
        combineDrugBatches(batches: DrugBatch[]): CombinedDrugBatch[] {
            // Group batches by drug_legacy_name
            const groupedBatches = batches.reduce<Record<string, DrugBatch[]>>((acc, batch) => {
                const key = batch.drug_legacy_name;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(batch);
                return acc;
            }, {});

            // Combine batches with the same drug_legacy_name
            this.combinedBatches = Object.keys(groupedBatches).map<CombinedDrugBatch>((key) => {
                const batchGroup = groupedBatches[key];

                return {
                    drug_legacy_name: key,
                    delivered_quantity: batchGroup.reduce((sum, batch) => sum + batch.delivered_quantity, 0),
                    current_quantity: batchGroup.reduce((sum, batch) => sum + batch.current_quantity, 0),
                    dispensed_quantity: batchGroup.reduce((sum, batch) => sum + batch.dispensed_quantity, 0),
                    doses_wasted: batchGroup.reduce((sum, batch) => sum + batch.doses_wasted, 0),
                };
            });

            return this.combinedBatches;
        },

        async onClickHandler(page: any) {
            await this.buildTableData(page);
        },
        formatDate(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
        },
        async handleInputData(event: any) {
            if (event.inputHeader == "Search") {
                this.filter = event.value;
                await this.buildTableData();
            }
        },
        async discardStock(e: any, item: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to void "${item.drug_legacy_name}", batch: ${item.batch_number} ?`, e, {
                confirmBtnLabel: "Void",
            });
            if (deleteConfirmed) {
                const stockService = new StockService();
                await stockService.deleteItem(item.id, {
                    reason: "voided",
                });
                await this.buildTableData();
            }
        },
        async buildTableData(page = 1) {
            this.isLoading = true;
            try {
                const stock: any = await getOfflineRecords("stock");
                this.reportData = this.paginateArray(this.combineDrugBatches(stock), this.currentPage);
            } catch (error) {
                toastWarning("An error occurred while loading data.");
            } finally {
                this.isLoading = false;
            }
        },
        paginateArray(data: any, currentPage: any) {
            // Validate inputs
            if (!Array.isArray(data)) {
                throw new Error("Input must be an array");
            }

            // Ensure currentPage is a positive number, defaulting to 1 if invalid
            const page = Math.max(1, Number(currentPage) || 1);

            // Calculate the start and end indices for slicing
            const startIndex = (page - 1) * 4;
            const endIndex = startIndex + 4;

            // Slice the array to get the four items for the current page
            const paginatedItems = data.slice(startIndex, endIndex);

            return {
                currentPage: page,
                totalPages: Math.ceil(data.length / 4),
                totalItems: data.length,
                items: paginatedItems,
            };
        },
        async selectButton(button: any) {
            this.selectedButton = button;
            await this.buildTableData();
        },
        async openMoreDetailsModal(data: any) {
            const response: any = await createModal(StockManagementModal, { class: "fullScreenModal" }, true, { data: data });
            if (response == "dismiss") {
                await this.buildTableData();
            }
        },
        async openAddStockModal(data: any) {
            const response: any = await createModal(AddStockModal, { class: "fullScreenModal" }, true, { data: data });
            if (response == "dismiss") {
                await this.buildTableData();
            }
        },
    },
});
</script>
<style>
.example-one .pagination-container {
    column-gap: 10px;
}
.example-one .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.example-one .paginate-buttons:hover {
    background-color: #d8d8d8;
}
.example-one .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.example-one .active-page:hover {
    background-color: #2988c8;
}
.example-one .back-button:active,
.example-one .next-button:active {
    background-color: #c4c4c4;
}
</style>
<style scoped>
.drug_container {
    /* display: flex; */
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    margin: 20px;
}
ion-row {
    line-height: 10px;
}
.content {
    font-size: 14px;
    color: #939393;
}
.contentBold {
    font-weight: 700;
    font-size: 14px;
    color: gray;
    line-height: 16px;
}
.container {
    display: flex;
    align-content: center;
    align-items: center;
}
.drug_content {
    padding-bottom: 10px;
    margin-bottom: 10px;
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
    margin-right: 10px;
}
.addBtn {
    height: 50px;
    align-items: center;
}
</style>
