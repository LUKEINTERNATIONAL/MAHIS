<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h1 style="width: 100%; text-align: center; font-weight: 700">Schedule Immunization Sessions</h1>
                <div style="display: flex; justify-content: space-between">
                    <div style="display: inline-block; vertical-align: top; max-width: 400px; top: -10px; position: relative; margin-right: 10px">
                        <basic-form :contentData="startEndDate" @update:inputValue="handleInputData"></basic-form>
                    </div>
                    <div style="display: inline-block; vertical-align: top; margin-top: 10px; float: right">
                        <ion-button class="addBtn" color="primary" @click="openModal()">
                            <div>
                                <div class="centerBigBtnContain">+ Create Session</div>
                            </div>
                        </ion-button>
                    </div>
                </div>

                <DataTable ref="dataTable" :options="options" :data="reportData" class="display nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End date</th>
                            <th>Session Name</th>
                            <th>Session Type</th>
                            <th>Frequency</th>
                            <th>Target</th>
                            <th>Vaccines</th>
                            <th>Assignees</th>
                            <th>Action</th>
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
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import DynamicButton from "@/components/DynamicButton.vue";
import AddImmunizationSessionModal from "@/components/Modal/AddImmunizationSessionModal.vue";
import { createModal } from "@/utils/Alerts";
import { StockService } from "@/services/stock_service";
import { useStockStore } from "@/stores/StockStore";
import { useStartEndDate } from "@/stores/StartEndDate";
import { DrugService } from "@/services/drug_service";
import BasicForm from "@/components/BasicForm.vue";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import "datatables.net-select";
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
                select: false,
            } as any,
            selectedButton: "all",
            isLoading: false,
        };
    },
    computed: {
        ...mapState(useStockStore, ["stock"]),
        ...mapState(useStartEndDate, ["startEndDate"]),
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
        await this.buildTableData().then(() => {
            const table = (this.$refs.dataTable as any).dt;
            table.on("click", ".edit-btn", (e: Event) => {
                const id = (e.target as HTMLElement).getAttribute("data-id");
                this.handleEdit(id);
            });
            table.on("click", ".delete-btn", (e: Event) => {
                const id = (e.target as HTMLElement).getAttribute("data-id");
                this.handleDelete(id);
            });
        });
    },
    methods: {
        handleEdit(id: any) {
            // Implement edit logic here
            console.log(`Editing item with id: ${id}`);
        },

        handleDelete(id: any) {
            // Implement delete logic here
            console.log(`Deleting item with id: ${id}`);
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
                const data = await stockService.getItems(this.startDate, this.endDate);

                let filteredData = data;
                this.allStock = data;
                this.currentStock = data.filter((item: any) => item.current_quantity !== 0);
                this.outStock = data.filter((item: any) => item.current_quantity === 0);

                if (this.selectedButton === "current") {
                    filteredData = this.currentStock;
                } else if (this.selectedButton === "out") {
                    filteredData = this.outStock;
                }

                this.reportData = filteredData.map((item: any) => {
                    return [
                        HisDate.toStandardHisDisplayFormat(item.delivery_date),
                        HisDate.toStandardHisDisplayFormat(item.expiry_date),
                        item.batch_number,
                        item.delivered_quantity,
                        item.dispensed_quantity,
                        item.current_quantity,
                        item.drug_legacy_name,
                        item.current_quantity,
                        `<button class="btn btn-sm btn-primary edit-btn" data-id="${item.id}">Edit</button>
                 <button class="btn btn-sm btn-danger delete-btn" data-id="${item.id}">Delete</button>`,
                    ];
                });

                DataTable.use(DataTablesCore);
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
        async openModal() {
            const data: any = await createModal(AddImmunizationSessionModal, { class: "otherVitalsModal largeModal" });
            if (data == "dismiss") {
                await this.buildTableData();
            }
        },
    },
});
</script>

<style scoped>
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
    height: 60px;
    margin: 20px;
    margin-left: 0px;
    margin-right: 8px;
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
