<template>
    <ion-page :class="{ loading: isLoading }">
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h4 style="width: 100%; text-align: center; font-weight: 700">TA Management</h4>
                <div style="display: flex; justify-content: space-between">
                    <div style="width: 50%; max-width: 350px">
                        <basic-form :contentData="districtInputField" @update:inputValue="setDistrict"></basic-form>
                    </div>
                    <div style="margin-top: 25px">
                        <DynamicButton
                            style="height: 45px"
                            name=" Add TA"
                            size="small"
                            iconSlot="start"
                            :icon="icons.plusWhite"
                            @click="addTAModal()"
                        />
                    </div>
                </div>
                <div class="table-responsive">
                    <DataTable ref="dataTableRef" :options="options" class="display nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TA</th>
                                <th>District</th>
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
import { IonContent, IonPage } from "@ionic/vue";
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
import ManageVillageModal from "@/components/Modal/ManageVillageModal.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import { icons } from "@/utils/svg";
import workerData from "@/activate_worker";
import AddTA from "@/components/Registration/Modal/AddTA.vue";
import UpdateTA from "@/components/Registration/Modal/UpdateTA.vue";

// Store initialization
const stockStore = useStockStore();
const startEndDateStore = useStartEndDate();
const route = useRoute();

// Refs
const dataTableRef = ref(null);
const isLoading = ref(false);
const selectedButton = ref("all");
const startDate = ref(HisDate.currentDate());
const endDate = ref(HisDate.currentDate());
const selectedDistrictId = ref("" as any);
const districtInputField = ref([] as any);
const formatTableData = async (records: any[]) => {
    return Promise.all(
        records.map(async (item: any) => {
            const district: any = await getOfflineRecords("districts", {
                whereClause: { district_id: item.district_id },
            });
            const response: any = await getOfflineRecords("villages", { whereClause: { traditional_authority_id: item.traditional_authority_id } });
            return {
                ta_id: item.traditional_authority_id,
                name: item.name,
                district: district[0].name,
                villages: `<button class="btn btn-sm btn-primary view-btn" data-id='${JSON.stringify(item)}'> View ${response.length}   </button>`,
                actions: `
                    <button class="btn btn-sm btn-primary edit-btn" data-id='${JSON.stringify(item)}'>Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id='${JSON.stringify(item)}'>Delete</button>
                `,
            };
        })
    );
};

const reloadTableData = (reloadPagination: boolean = true) => {
    const table = (dataTableRef.value as any).dt; // Access the DataTable instance
    table.ajax.reload(null, reloadPagination); // Reload data and maintain the current pagination state
};
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
                likeClause: data.search?.value ? { name: "%" + data.search?.value + "%" } : "",
                whereClause: selectedDistrictId.value ? { district_id: selectedDistrictId.value } : "",
            };
            const response: any = await getOfflineRecords("TAs", filter);
            const formattedData = await formatTableData(response.records);

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
    columns: [{ data: "ta_id" }, { data: "name" }, { data: "district" }, { data: "villages" }, { data: "actions" }],
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
const viewVillagesModal = async (taData: any) => {
    const data: any = await createModal(ManageVillageModal, { class: "fullScreenModal" }, true, { taData: taData });
    if (data === "dismiss") {
        // Instead of reloading the entire table, just update the current data
        reloadTableData(false);
    }
};
const setDistrict = async (data: any) => {
    selectedDistrictId.value = data?.value?.district_id;
    reloadTableData();
};

const openDeletePopover = async (taData: any, e: any) => {
    const data = JSON.parse(taData);
    const deleteConfirmed = await popoverConfirmation(`Do you want to delete TA ${data.name} ?`, e);
    if (deleteConfirmed) {
        deleteTA(data);
    }
};
const deleteTA = async (taData: any) => {
    const res = await Service.delete(`traditional_authorities/${taData.traditional_authority_id}`, { id: taData.traditional_authority_id });
    if (res?.message == "Traditional Authority and associated villages successfully deleted") {
        await workerData.postData("DELETE_RECORD", { storeName: "TAs", whereClause: { traditional_authority_id: taData.traditional_authority_id } });
        await workerData.postData("DELETE_RECORD", {
            storeName: "villages",
            whereClause: { traditional_authority_id: taData.traditional_authority_id },
        });
    }
    reloadTableData(false);
};
const addTAModal = async () => {
    await createModal(AddTA, { class: "otherVitalsModal" });
    reloadTableData(false);
};
const updateTAModal = async (taData: any) => {
    await createModal(UpdateTA, { class: "otherVitalsModal" }, true, { taData: taData });
    reloadTableData(false);
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

// Event handlers setup
const setupEventHandlers = () => {
    const table = (dataTableRef.value as any).dt;

    table.on("click", ".edit-btn", (e: Event) => {
        const data = (e.target as HTMLElement).getAttribute("data-id");
        if (data) updateTAModal(JSON.parse(data));
    });

    table.on("click", ".delete-btn", (e: Event) => {
        const id = (e.target as HTMLElement).getAttribute("data-id");
        if (id) openDeletePopover(id, e);
    });

    table.on("click", ".view-btn", (e: Event) => {
        const data = (e.target as HTMLElement).getAttribute("data-id");
        if (data) viewVillagesModal(JSON.parse(data));
    });
};

// Lifecycle hooks
onMounted(async () => {
    districtInputField.value = [
        {
            selectedData: [],
            isFinishBtn: false,
            data: {
                rowData: [
                    {
                        colData: [
                            {
                                inputHeader: "Filter by districts",
                                popOver: true,
                                icon: icons.search,
                                value: "",
                                name: "filter_district",
                                eventType: "input",
                                alertsErrorMassage: "",
                                isSingleSelect: true,
                                trackBy: "district_id",
                                multiSelectData: await getOfflineRecords("districts"),
                                id: "",
                                idName: "district_id",
                            },
                        ],
                    },
                ],
            },
        },
    ];
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
