<template>
    <div class="table-responsive">
        <DataTable ref="dataTableRef" :options="options" :data="tableData" class="display nowrap" width="100%">
            <thead>
                <tr>
                    <th v-for="head in header" :key="head">{{ head }}</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonInput, IonPopover } from "@ionic/vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { PatientDiagnosisService } from "@/services/patient_diagnosis_service";
import { ObservationService } from "@/services/observation_service";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { createModal, toastDanger, toastSuccess, popoverConfirmation } from "@/utils/Alerts";
import { getOfflineRecords, saveOfflinePatientData } from "@/services/offline_service";
import HisDate from "@/utils/Date";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import DataTablesResponsive from "datatables.net-responsive";
import AddDiagnosisModal from "./Diagnosis/AddDiagnosisModal.vue";

// Import DataTables extensions
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-dt";
import "datatables.net-responsive";
import "datatables.net-select";

// Component imports
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import List from "@/components/List.vue";
import BasicForm from "@/components/BasicForm.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import previousDiagnosis from "@/apps/NCD/components/ConsultationPlan/previousVisits/previousDiagnosis.vue";

// Store setup
const diagnosisStore = useDiagnosisStore();
const demographicsStore = useDemographicsStore();
const { diagnosis } = storeToRefs(diagnosisStore);
const { patient } = storeToRefs(demographicsStore);

// Refs
const dataTableRef = ref(null);
const tableData = ref([] as any);
const iconsContent = ref(icons);

// Constants
const header = ["Diagnosis", "Date", "Action"];

// DataTable options
const options = {
    responsive: true,
    select: false,
    layout: {
        topStart: "buttons",
        topEnd: "search",
        bottomStart: "info",
        bottomEnd: "paging",
    },
    ordering: false,
    buttons: [
        {
            text: " <b>+ Add diagnosis </b>",
            className: "add-test text-white",
            action: async () => {
                await openEnterResultModal();
            },
        },
    ],
} as any;

// Methods
const openEnterResultModal = async () => {
    await createModal(AddDiagnosisModal, { class: "lab-results-modal" }, true);
    await setListData();
};

const generateListItems = async (data: any[]) => {
    if (data.length > 0) {
        return await Promise.all(
            data.map(async (item: any) => {
                const name = await ObservationService.getConceptName(item.value_coded);
                const obs_date = item.obs_datetime;
                return [
                    name,
                    HisDate.toStandardHisFormat(obs_date),
                    `<button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify({
                        id: item.obs_id,
                        value_coded: item.value_coded,
                        name: name,
                        obs_date: obs_date,
                    })}'>${iconsContent.value.delete2}</button>`,
                ];
            })
        );
    }
    return [];
};

const voidDiagnosis = async (data: any, event: any) => {
    const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${data.name} ?`, event);
    if (deleteConfirmed) {
        const patientData = JSON.parse(JSON.stringify(patient.value));
        const diagnosisData = patientData.diagnosis;

        if (data?.id) {
            diagnosisData.saved = diagnosisData.saved.filter(
                (diagnosis: any) => !(diagnosis.value_coded === data.value_coded && diagnosis.obs_datetime === data.obs_date)
            );
            diagnosisData.voided ??= [];
            diagnosisData.voided.push(data);
        } else {
            diagnosisData.unsaved = diagnosisData.unsaved.filter(
                (diagnosis: any) => !(diagnosis.value_coded === data.value_coded && diagnosis.obs_datetime === data.obs_date)
            );
        }

        await saveOfflinePatientData(patientData);
    }
};

const setListData = async () => {
    const patientData = JSON.parse(JSON.stringify(patient.value));
    const observations = [...(patientData?.diagnosis?.unsaved || []), ...(patientData?.diagnosis?.saved || [])];
    tableData.value = await generateListItems(observations);
    DataTable.use(DataTablesCore);
};

// Watchers
const route = useRoute();
watch(
    () => route,
    async () => {
        await setListData();
    },
    { deep: true }
);
watch(
    () => patient,
    async () => {
        await setListData();
    },
    { deep: true }
);

// Lifecycle hooks
onMounted(async () => {
    await setListData();
    nextTick(() => {
        const table = (dataTableRef.value as any).dt;
        table.columns.adjust().draw();
        table.on("click", ".delete-btn", (e: Event) => {
            const data: any = (e.target as HTMLElement).getAttribute("data-id");
            voidDiagnosis(JSON.parse(data), e);
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
div.dt-buttons > .dt-button:first-child {
    border: 1px solid #fff;
    background: #046c04;
    border-radius: 5px;
}
div.dt-buttons > .dt-button:hover:not(.disabled) {
    background: #188907 !important;
    border: 1px solid #fff !important;
}
.dt-type-date {
    text-align: left !important;
}
</style>

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

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}
.modify_buttons {
    padding-left: 20px;
}
.item_no_border {
    --border-color: transparent;
}
.search_result {
    padding: 10px;
}
</style>
