<template>
    <basic-form :contentData="visualScreening"> </basic-form>
    <ion-list>
        <ion-item :lines="footSC" class="dashed_bottom_border textSectionFormat">
            <span>Foot screening</span>
        </ion-item>
        <div class="sub_item_body">
            <basic-form :contentData="FootScreening"> </basic-form>
        </div>
    </ion-list>
    <basic-form :contentData="cvScreening"> </basic-form>
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
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect,
} from "@ionic/vue";
import { ref, computed, onMounted, nextTick } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import BasicInputField from "@/components/BasicInputField.vue";
import { storeToRefs } from "pinia";
import { useComplicationsStore } from "@/stores/ComplicationsStore";
import BasicForm from "@/components/BasicForm.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { useRouter } from "vue-router";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";

// Import DataTables extensions
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-dt";
import "datatables.net-responsive";
import "datatables.net-select";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import DataTablesResponsive from "datatables.net-responsive";
import { Service } from "@/services/service";
import { ConceptService } from "@/services/concept_service";

// Router
const router = useRouter();

// Store
const complicationsStore = useComplicationsStore();
const { FootScreening, visualScreening, cvScreening } = storeToRefs(complicationsStore);
const demographicsStore = useDemographicsStore();
const { patient } = storeToRefs(demographicsStore);

// Refs
const dataTableRef = ref(null);
const tableData = ref([] as any);
const footChecked = ref(false);
const showVisualAcuityTest = ref(false);
const visualAT = ref("");
const footSC = ref("");
const cvdRiskObj = ref({
    btnColor: "secondary",
    btnName: "No risk",
});
const iconsContent = ref(icons);
// Constants
const header = ["Condition", "Result", "Date", "Action"];
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
const setPreviousData = async () => {
    const patientData = JSON.parse(JSON.stringify(patient.value));
    const screening = [...(patientData?.screening?.unsaved || []), ...(patientData?.screening?.saved || [])];
    tableData.value = await buildTableData(screening);
};
const buildTableData = async (data: any[]) => {
    if (data.length === 0) return [];

    const result = await Promise.all(
        data.map(async (item: any) => {
            if (item.concept_name === "Visual acuity") {
                return item.children.map((child: any) => [
                    child.concept_name,
                    child.value_text,
                    HisDate.toStandardHisFormat(child.obs_datetime),
                    `<button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify(child)}'>
                        ${iconsContent.value.delete2}</button>`,
                ]);
            }

            if (item.concept_name === "Foot check") {
                return Promise.all(
                    item.children.map(async (child: any) => [
                        child.concept_name,
                        await ConceptService.getConceptName(child.value_coded), // Ensure `await` is used here
                        HisDate.toStandardHisFormat(child.obs_datetime),
                        `<button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify(child)}'>
                            ${iconsContent.value.delete2}</button>`,
                    ])
                );
            }

            if (item.concept_name === "Cardiovascular disease") {
                return [
                    [
                        "CVD %",
                        item.value_text,
                        HisDate.toStandardHisFormat(item.obs_datetime),
                        `<button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify(item)}'>
                            ${iconsContent.value.delete2}</button>`,
                    ],
                ];
            }

            return []; // Ensure all map cases return something
        })
    );

    return result.flat(); // Use `.flat(2)` to properly flatten deeply nested arrays
};

const navigationMenu = (url: any) => {
    menuController.close();
    router.push(url);
};

const footScreening = () => {
    footChecked.value = !footChecked.value;
    footSC.value = footChecked.value ? "none" : "";
};

const toggleShowVisualAcuityTest = () => {
    showVisualAcuityTest.value = !showVisualAcuityTest.value;
    visualAT.value = showVisualAcuityTest.value ? "none" : "";
};
const voidScreening = (data: any) => {
    console.log("🚀 ~ voidScreening ~ data:", data);
};

const cvdRisk = () => {
    if (cvdRiskObj.value.btnColor !== "secondary") {
        cvdRiskObj.value = {
            btnColor: "secondary",
            btnName: "No risk",
        };
    } else {
        cvdRiskObj.value = {
            btnColor: "danger",
            btnName: "High risk",
        };
    }
};
// Lifecycle hooks
onMounted(async () => {
    await setPreviousData();
    nextTick(() => {
        const table = (dataTableRef.value as any).dt;
        table.columns.adjust().draw();
        table.on("click", ".delete-btn", (e: Event) => {
            const data: any = (e.target as HTMLElement).getAttribute("data-id");
            voidScreening(JSON.parse(data), e);
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

.foot_title {
    color: #636363;
    text-align: center;
}

.foot_content {
    color: #00190e;
    text-align: center;
    border-bottom: solid 1px #ccc;
    border-bottom-style: dashed;
    padding: 10px 0px;
    font-weight: 500;
    font-size: 14px;
}

.first_col {
    text-align: left;
    font-weight: 400;
    font-size: 14px;
}

.sub_item_body {
    margin-left: 45px;
}

.foot_input {
    width: 100%;
    color: #636363;
    text-align: left;
}

.item-content {
    background-color: #ffffff;
}

ion-select._item_eye {
    --background: #fff;
}

ion-item.item_eye_ {
    --inner-border-width: 0;
    --background-hover: none;
}

ion-item.sub_item_body_close {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
}

.textSectionFormat {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
}

.due_date {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #636363;
}

.toggle_content {
    display: flex;
    justify-content: space-between;
    width: 370px;
    align-items: center;
}

.other_content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>
