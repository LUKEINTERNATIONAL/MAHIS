<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <ion-header style="display: flex; justify-content: space-between">
            <ion-title class="modalTitle">Inventory Management </ion-title>
            <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
        </ion-header>
        <ion-content style="--background: #fff">
            <div class="container">
                <div style="width: 80vw; top: -10px; position: relative; margin-right: 10px">
                    <basic-form :contentData="searchName" @update:inputValue="handleInputData"></basic-form>
                </div>
                <div class="drug_container">
                    <div class="drug_content" v-for="(item, index) in reportData" :key="index">
                        <div class="watermark" v-if="!checkExpired(item)">EXPIRED</div>
                        <div class="watermark" v-if="item.current_quantity <= 0">Stock out</div>
                        <ion-row class="search_header">
                            <ion-col class="">
                                <span style="font-weight: 700; font-size: 16px; color: #939393">{{ item.drug_legacy_name }}</span>
                            </ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Batch/Lot Number</ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.batch_number }}</ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Manufacturer</ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ item.manufacture }}</ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Expiration date </ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ formatDate(item.expiry_date) }}</ion-col>
                        </ion-row>
                        <ion-row class="search_header">
                            <ion-col style="max-width: 188px; min-width: 150px" class="contentBold">Date received</ion-col>
                            <ion-col style="max-width: 188px; min-width: 100px" class="content">{{ formatDate(item.delivery_date) }}</ion-col>
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
                            <ion-button
                                size="small"
                                color="danger"
                                name="Discard Stock"
                                v-if="checkExpired(item) && item.current_quantity > 0"
                                style="font-size: 12px"
                                @click="openPopover($event, item)"
                            >
                                Discard Stock
                            </ion-button>
                            <ion-button
                                v-else
                                size="small"
                                color="danger"
                                name="Discard Stock"
                                style="font-size: 12px"
                                @click="voidStock($event, item)"
                            >
                                Void Stock
                            </ion-button>
                            <!-- <ion-button color="success" size="small" name="Update Stock" style="font-size: 12px" @click="openAddStockModal(item)"
                                >Update Stock</ion-button
                            > -->
                        </div>
                    </div>
                </div>
                <div class="example-one">
                    <vue-awesome-paginate
                        :total-items="reportData[0]?.total_count"
                        :items-per-page="4"
                        :max-pages-shown="2"
                        v-model="currentPage"
                        @click="onClickHandler"
                    />
                </div>
            </div>
            <ion-popover
                style="--offset-x: -10px"
                :is-open="popoverOpen"
                :show-backdrop="false"
                :dismiss-on-select="false"
                :event="event"
                @didDismiss="popoverOpen = false"
            >
                <div style="margin-bottom: 160px">
                    <basic-form :contentData="stockDiscard" @update:inputValue="handleInputData"></basic-form>
                    <!-- <ion-list style="--ion-background-color: #fff; --offset-x: -30px">
                        <ion-item :button="true" :detail="false" style="cursor: pointer"></ion-item>
                    </ion-list> -->
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px">
                    <ion-button size="small" color="danger" name="Discard Stock" style="font-size: 14px" @click="closePopover()">Cancel</ion-button>
                    <ion-button color="success" size="small" name="Update Stock" style="font-size: 14px" @click="updateBatch()">Save</ion-button>
                </div>
            </ion-popover>
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
    modalController,
    IonPopover,
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
import { createModal } from "@/utils/Alerts";
import { StockService } from "@/services/stock_service";
import { useStockStore } from "@/stores/StockStore";
import { useStartEndDate } from "@/stores/StartEndDate";
import { useSearchName } from "@/stores/SearchName";
import { useStockDiscard } from "@/stores/StockDiscard";
import { DrugService } from "@/services/drug_service";
import BasicForm from "@/components/BasicForm.vue";
import { toastSuccess, toastWarning, popoverConfirmation } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    modifyCheckboxValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { validateInputFiledData, validateRadioButtonData, validateCheckBoxData } from "@/services/group_validation";
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
    name: "StockManagementModal",
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
        IonPopover,
    },
    data() {
        return {
            iconsContent: icons,
            reportData: [] as any,
            currentStock: [] as any,
            stockData: [] as any,
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
            popoverOpen: false,
            event: null as any,
            stockService: {} as any,
            disabled: false,
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
    created() {
        this.stockService = new StockService();
    },
    props: {
        data: {
            default: {} as any,
        },
    },
    computed: {
        ...mapState(useStockStore, ["stock"]),
        ...mapState(useSearchName, ["searchName"]),
        ...mapState(useStockDiscard, ["stockDiscard"]),
    },
    $route: {
        async handler() {
            await this.buildTableData();
        },
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
        checkExpired(item: any) {
            const expiry_date: Date = new Date(item.expiry_date);
            const currentDate: Date = new Date(HisDate.currentDate());
            if (currentDate >= expiry_date) {
                return false;
            } else {
                return true;
            }
        },
        async updateBatch() {
            const doses_wasted = parseInt(getFieldValue(this.stockDiscard, "quantity", "value"));
            const reason = getFieldValue(this.stockDiscard, "reason", "value").name;
            const delivered_quantity = parseInt(this.stockData.delivered_quantity);
            this.stockData.current_quantity;
            const total_used_quantity = this.stockData.dispensed_quantity + this.stockData.doses_wasted + doses_wasted;
            if (delivered_quantity < total_used_quantity) {
                toastWarning("Quantity delivered can not be greater than quantity wasted and dispensed");
                return false;
            }
            if (validateInputFiledData(this.stockDiscard)) {
                const data = {
                    doses_wasted: doses_wasted,
                    drug_id: this.stockData.drug_id,
                    reallocation_code: "MA20",
                    waste_reason: reason,
                    date: HisDate.currentDate(),
                    reason: reason,
                };
                try {
                    await this.stockService.updateItem(this.stockData.id, data);
                    toastSuccess("Discard successfully");
                    await this.buildTableData();
                    this.closePopover();
                } catch (error: any) {
                    toastWarning(error);
                }
            } else {
                toastWarning("Failing to discard");
                return false;
            }
        },
        openPopover(e: Event, item: any) {
            this.stockData = item;
            useStockDiscard().setStockDiscard(useStockDiscard().getInitialStockDiscard());
            this.event = e;
            this.popoverOpen = true;
        },
        closePopover() {
            this.event = null;
            this.popoverOpen = false;
        },
        dismiss() {
            modalController.dismiss("dismiss");
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
        async voidStock(e: any, item: any) {
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
                const stockService = new StockService();
                this.reportData = await stockService.getItems({
                    start_date: "2000-01-01",
                    end_date: this.endDate,
                    drug_name: this.data.drug_legacy_name,
                    page: page,
                    page_size: 4,
                });
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
    position: relative;
    overflow: hidden;
}
.watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 4em;
    color: rgba(255, 110, 110, 0.2);
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
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
