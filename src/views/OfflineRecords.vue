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
                <h4 style="width: 100%; text-align: center; font-weight: 700">Offline Records Status</h4>

                <div class="table-responsive">
                    <DataTable ref="dataTable" :options="options" :data="reportData" class="display nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>ID</th>
                                <th>Personal Info Status</th>
                                <th>Birth Registration Status</th>
                                <th>Guardian Info Status</th>
                                <th>Vitals Status</th>
                                <th>Vaccine Admin Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch } from "vue";
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { useStockStore } from "@/stores/StockStore";
import { useStartEndDate } from "@/stores/StartEndDate";
import { storeToRefs } from "pinia";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import DataTablesResponsive from "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-dt";
import "datatables.net-responsive";
import DynamicButton from "@/components/DynamicButton.vue";
import OfflineMoreDetailsModal from "@/components/Modal/OfflineMoreDetailsModal.vue";
import { createModal } from "@/utils/Alerts";
import BasicForm from "@/components/BasicForm.vue";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import "datatables.net-select";
import db from "@/db";
import HisDate from "@/utils/Date";
import { useStatusStore } from "@/stores/StatusStore";
import { getOfflineRecords } from "@/services/offline_service";

const reportData = ref([]);
const currentStock = ref([]);
const allStock = ref([]);
const startDate = ref(HisDate.currentDate());
const endDate = ref(HisDate.currentDate());
const selectedButton = ref("all");
const isLoading = ref(false);
const dataTable = ref(null);

const stockStore = useStockStore();
const startEndDateStore = useStartEndDate();
const { stock } = storeToRefs(stockStore);
const { startEndDate } = storeToRefs(startEndDateStore);
const statusStore = useStatusStore();
const { offlineVillageStatus, offlineCountriesStatus, offlineDistrictStatus, offlineTAsStatus, offlineRelationshipStatus, offlinePatientsStatus } =
    storeToRefs(statusStore);

const options = {
    responsive: true,
    select: false,
    layout: {
        topStart: null,
        topEnd: "search",
        bottomStart: "info",
        bottomEnd: "paging",
    },
} as any;
// Watchers
const buildTableData = async () => {
    isLoading.value = true;
    try {
        const documents: any = await getOfflineRecords("patientRecords");
        reportData.value = documents.map((item: any) => [
            `${item.personInformation.given_name} ${item.personInformation.family_name}`,
            item.ID,
            item.saveStatusPersonInformation,
            item.saveStatusBirthRegistration,
            item.saveStatusGuardianInformation,
            "",
            "",
            `<button class="btn btn-sm btn-primary edit-btn" data-id='${JSON.stringify(item)}'>More details</button>`,
        ]);
        DataTable.use(DataTablesCore);
    } catch (error) {
        toastWarning("An error occurred while loading data.");
    } finally {
        isLoading.value = false;
    }
};

const fractionToPercentage = (numerator: any, denominator: any) => {
    if (denominator === 0) {
        return 0;
    }
    let percentage = (numerator / denominator) * 100;
    return `${percentage ? percentage.toFixed(2) : 0}`; // Keeps two decimal places
};
const handleEdit = (data: any) => {
    openModal(JSON.parse(data));
};

const handleDelete = async (id: any) => {
    console.log(`Deleting item with id: ${id}`);
};

const handleInputData = async (event: any) => {
    if (event.inputHeader === "Start date") {
        startDate.value = HisDate.toStandardHisFormat(event.value);
    }
    if (event.inputHeader === "End date") {
        endDate.value = HisDate.toStandardHisFormat(event.value);
    }
    await buildTableData();
};

const selectButton = async (button: string) => {
    selectedButton.value = button;
    await buildTableData();
};

const openModal = async (clientData: any) => {
    const data = await createModal(OfflineMoreDetailsModal, { class: "fullScreenModal" }, true, { clientData });
    if (data === "dismiss") {
        await buildTableData();
    }
};

onMounted(async () => {
    await buildTableData();
    nextTick(() => {
        const table = (dataTable.value as any).dt;
        table.columns.adjust().draw();
        table.on("click", ".edit-btn", (e: Event) => {
            const id = (e.target as HTMLElement).getAttribute("data-id");
            handleEdit(id);
        });
        table.on("click", ".delete-btn", (e: Event) => {
            const id = (e.target as HTMLElement).getAttribute("data-id");
            handleDelete(id);
        });
    });
});
</script>

<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

.table-responsive {
    width: 100%;
    overflow-x: auto;
}
</style>
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
