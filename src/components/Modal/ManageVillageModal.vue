<template>
    <ion-page :class="{ loading: isLoading }">
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <ion-header style="display: flex; justify-content: space-between">
            <ion-title class="modalTitle">Village Management</ion-title>
            <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="icons.cancel"></ion-icon>
        </ion-header>
        <ion-content style="--background: #fff">
            <div class="container">
                <div style="margin-top: 25px">
                    <DynamicButton
                        style="height: 45px"
                        name=" Add Village"
                        size="small"
                        iconSlot="start"
                        :icon="icons.plusWhite"
                        @click="addVillageModal()"
                    />
                </div>
                <div class="table-responsive">
                    <DataTable ref="dataTableRef" :options="options" class="display nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Villages</th>
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
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { IonContent, IonPage, modalController } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import DataTablesResponsive from "datatables.net-responsive";
import { getOfflineRecords } from "@/services/offline_service";
import { createModal } from "@/utils/Alerts";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import HisDate from "@/utils/Date";
import { useStockStore } from "@/stores/StockStore";
import { useStartEndDate } from "@/stores/StartEndDate";
import { icons } from "@/utils/svg";
import DynamicButton from "@/components/DynamicButton.vue";
import AddVillage from "@/components/Registration/Modal/AddVillage.vue";
import { Service } from "@/services/service";
import UpdateVillage from "@/components/Registration/Modal/UpdateVillage.vue";
import { useWorkerStore } from "@/stores/workerStore";

// Store initialization
const stockStore = useStockStore();
const workerStore = useWorkerStore();
const startEndDateStore = useStartEndDate();
const route = useRoute();

// Refs
const dataTableRef = ref(null);
const isLoading = ref(false);
const selectedButton = ref("all");
const startDate = ref(HisDate.currentDate());
const endDate = ref(HisDate.currentDate());

const props: any = defineProps({
    taData: Object,
});

// DataTable options
const options = ref({
    responsive: true,
    select: false,
    processing: true,
    serverSide: true,
    pageLength: 10,
    searching: true,
    ajax: async function (data: any, callback: Function) {
        try {
            isLoading.value = true;
            const currentPage = Math.floor(data.start / data.length) + 1;
            let filter: any = {
                currentPage: currentPage,
                itemsPerPage: data.length,
                likeClause: "",
                whereClause: { traditional_authority_id: props.taData.traditional_authority_id },
            };
            if (data.search?.value) {
                filter.likeClause = { name: "%" + data.search?.value + "%" || "" };
            }
            const response: any = await getOfflineRecords("villages", filter);
            const formattedData = await Promise.all(
                response.records.map(async (item: any) => {
                    return {
                        name: item.name,
                        actions: `
                            <button class="btn btn-sm btn-primary edit-btn" data-id='${JSON.stringify(item)}'>Edit</button>
                            <button class="btn btn-sm btn-danger delete-btn" data-id='${JSON.stringify(item)}'>Delete</button>
                        `,
                    };
                })
            );

            callback({
                draw: data.draw,
                recordsTotal: response.totalCount,
                recordsFiltered: response.totalCount,
                data: formattedData,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            toastWarning("An error occurred while loading data.");
            callback({
                draw: data.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
            });
        } finally {
            isLoading.value = false;
        }
    },
    columns: [{ data: "name" }, { data: "actions" }],
    language: {
        processing: "Loading...",
        emptyTable: "No data available",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        lengthMenu: "Show _MENU_ entries",
        loadingRecords: "Loading...",
        search: "Search:",
        zeroRecords: "No matching records found",
    },
});

// Methods
const handleEdit = async (data: any) => {
    openModal(JSON.parse(data));
};
function dismiss() {
    modalController.dismiss("dismiss");
}
const handleDelete = async (id: any) => {
    console.log(`Deleting item with id: ${id}`);
    // Implement delete logic here
};
const reloadTableData = (reloadPagination: boolean = true) => {
    const table = (dataTableRef.value as any).dt; // Access the DataTable instance
    table.ajax.reload(null, reloadPagination); // Reload data and maintain the current pagination state
};
const addVillageModal = async () => {
    const ta_data = JSON.parse(JSON.stringify(props.taData));
    await createModal(AddVillage, { class: "fullScreenModal" }, true, { taData: ta_data });
    reloadTableData(false);
};
const openDeletePopover = async (villageData: any, e: any) => {
    const deleteConfirmed = await popoverConfirmation(`Do you want to delete village ${villageData.name} ?`, e);
    if (deleteConfirmed) {
        deleteTA(villageData);
    }
};
const deleteTA = async (villageData: any) => {
    const res = await Service.delete(`villages/${villageData.village_id}`, { id: villageData.village_id });
    if (res?.message == "Village successfully deleted") {
        await workerStore.postData("DELETE_RECORD", { storeName: "villages", whereClause: { village_id: villageData.village_id } });
    }
    reloadTableData(false);
};
const openModal = async (clientData: any) => {
    // const data: any = await createModal(OfflineMoreDetailsModal, { class: "fullScreenModal" }, true, { clientData: clientData });
    // if (data === "dismiss") {
    //     const table = (dataTableRef.value as any).dt;
    //     table.ajax.reload();
    // }
};

// Watchers
watch(
    () => stockStore.stock,
    async () => {
        const table = (dataTableRef.value as any).dt;
        table?.ajax.reload();
    },
    { deep: true }
);

watch(
    () => route,
    async () => {
        const table = (dataTableRef.value as any).dt;
        table?.ajax.reload();
    },
    { deep: true }
);
const updateVillageModal = async (villageData: any) => {
    await createModal(UpdateVillage, { class: "fullScreenModal" }, true, { villageData: villageData });
    reloadTableData(false);
};
// Event handlers setup
const setupEventHandlers = () => {
    const table = (dataTableRef.value as any).dt;

    table.on("click", ".edit-btn", (e: Event) => {
        const data = (e.target as HTMLElement).getAttribute("data-id");
        if (data) updateVillageModal(JSON.parse(data));
    });

    table.on("click", ".delete-btn", (e: Event) => {
        const data = (e.target as HTMLElement).getAttribute("data-id");
        if (data) openDeletePopover(JSON.parse(data), e);
    });
};

// Lifecycle hooks
onMounted(() => {
    DataTable.use(DataTablesCore);
    nextTick(() => {
        setupEventHandlers();
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

.btn {
    margin: 0 2px;
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
