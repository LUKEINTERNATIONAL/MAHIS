<template>
    <basic-card :content="cardData" @update:inputValue="handleInputData"></basic-card>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Previous Visits</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <div class="table-responsive">
                        <DataTable ref="dataTableRef" :options="options" :data="tableData" class="display nowrap" width="100%">
                            <thead>
                                <tr>
                                    <th v-for="head in header" :key="head">{{ head }}</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-row>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController, IonCheckbox } from "@ionic/vue";
import { icons } from "@/utils/svg";
import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { storeToRefs } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import BasicCard from "@/components/BasicCard.vue";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyFieldValue,
    modifyRadioValue,
} from "@/services/data_helpers";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { formatRadioButtonData, formatCheckBoxData } from "@/services/formatServerData";
import { getOfflineFirstObsValue, getOfflineSavedUnsavedData } from "@/services/offline_service";
import { ObservationService } from "@/services/observation_service";
import HisDate from "@/utils/Date";
import { ConceptService } from "@/services/concept_service";

// Initialize stores
const enrollmentStore = useEnrollementStore();
const demographicsStore = useDemographicsStore();

// Get store state using storeToRefs for reactivity
const { substance } = storeToRefs(enrollmentStore);
const { patient } = storeToRefs(demographicsStore);

// Data properties
const test = ref("");
const cardData = ref({});
const tableData = ref([] as any);

const iconsContent = ref(icons);
// Constants
const header = ["Substance", "Answer", "Date", "Action"];
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
} as any;

// Methods
const buildCards = () => {
    cardData.value = {
        mainTitle: "Enrollment",
        cards: [
            {
                cardTitle: "Substance use / Consumption",
                content: substance.value,
            },
        ],
    };
};

const openModal = () => {
    createModal(DispositionModal);
};

const updateEnrollmentStores = () => {
    enrollmentStore.setSubstance(substance.value);
};

const setRiskAssessment = async () => {
    const data = getOfflineSavedUnsavedData("substanceAbuse");
    if (data.length === 0) return [];

    tableData.value = await Promise.all(
        data.map(async (item: any) => {
            return [
                item.concept_name,
                await ConceptService.getConceptName(item.value_coded),
                HisDate.toStandardHisFormat(item.obs_datetime),
                `<button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify(item)}'>
                            ${iconsContent.value.delete2}</button>`,
            ];
        })
    );
    // const patientData = JSON.parse(JSON.stringify(patient.value));
    // const substanceAbuse = [...(patientData?.substanceAbuse?.unsaved || []), ...(patientData?.substanceAbuse?.saved || [])];
    // const drinking: any = await getOfflineFirstObsValue(substanceAbuse, "value_coded", 2318);
    // const smoking: any = await getOfflineFirstObsValue(substanceAbuse, "value_coded", 1551);
    // modifyRadioValue(substance.value, "Smoking history", "selectedValue", await ObservationService.getConceptName(smoking));
    // modifyRadioValue(substance.value, "Does the patient drink alcohol?", "selectedValue", await ObservationService.getConceptName(drinking));
};

const handleInputData = async (event: any) => {
    // Implementation here
};

// Watch
watch(
    () => substance.value,
    () => {
        buildCards();
    },
    { deep: true }
);

// Lifecycle hooks
onMounted(async () => {
    updateEnrollmentStores();
    buildCards();
    await setRiskAssessment();
});
</script>
<style scoped>
.sub_title {
    font-weight: 400;
    font-size: 14px;
    color: #636363;
    padding-top: 20px;
    line-height: 25px;
}

.sub_title {
    line-height: 40px;
}
.diagnosis_col {
    display: flex;
    justify-content: center;
    align-items: center;
}
.diplay_space_between {
    color: var(--text_color, #00190e);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
}
ion-radio {
    margin-right: 35px;
}
.dashed_bottom_border {
    margin-top: 15px;
    margin-bottom: 15px;
}
.diagnosis_checkbox {
    display: flex;
    justify-content: space-between;
}
.diagnosis_input {
    width: 220px;
    margin-bottom: 20px;
}
.tb_content {
    text-align: left;
    line-height: 3;
}
.small_font {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #636363;
}
.checkbox_header {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #00190e;
}
</style>
