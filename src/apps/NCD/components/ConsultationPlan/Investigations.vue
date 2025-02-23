<template>
    <div class="background">
        <ion-segment :value="segmentContent" style="margin-top: 5px">
            <ion-segment-button value="Lab Investigations" @click="setSegmentContent('Lab Investigations')">
                <ion-label>Lab Investigations</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Radiology Investigation" @click="setSegmentContent('Radiology Investigation')">
                <ion-label>Radiology Investigation</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Other Investigation" @click="setSegmentContent('Other Investigation')">
                <ion-label>Other Investigation</ion-label>
            </ion-segment-button>
        </ion-segment>
        <div v-if="segmentContent == 'Radiology Investigation'">
            <VisitsHistory />
        </div>
        <div v-if="segmentContent == 'Other Investigation'"></div>
        <div v-if="segmentContent == 'Lab Investigations'">
            <div class="" slot="content" style="margin-bottom: 125px; margin-top: 2px">
                <span>
                    <labOrderResults :propOrders="labOrders" />
                </span>
            </div>
        </div>
        <div v-if="segmentContent == 'Radiology Investigation'"></div>
        <div v-if="segmentContent == 'Other Investigation'"></div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { build, checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { OrderService } from "@/services/order_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { mapState } from "pinia";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import BasicForm from "@/components/BasicForm.vue";
import List from "@/components/List.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import labOrderResults from "@/apps/NCD/components/ConsultationPlan/Investigation/labOrderResults.vue";
import { LabOrder } from "@/services/lab_order";
import { useDemographicsStore } from "@/stores/DemographicStore";
import HisDate from "@/utils/Date";
import { validateInputFiledData, validateRadioButtonData, validateCheckBoxData } from "@/services/group_validation";
import { Service } from "@/services/service";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";

import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { ConceptService } from "@/services/concept_service";
import { getOfflineRecords } from "@/services/offline_service";

export default defineComponent({
    name: "Menu",
    mixins: [SetUserRole],
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        IonPopover,
        DashBox,
        SelectionPopover,
        BasicInputField,
        BasicForm,
        List,
        DynamicButton,
        labOrderResults,
    },
    data() {
        return {
            segmentContent: "Lab Investigations",
            iconsContent: icons,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            testResult: "" as any,
            test: "" as any,
            labOrders: "" as any,
            filteredSpecimen: "" as any,
            testData: [] as any,
            popoverOpen: false,
            labOrderStatus: false,
            event: "" as any,
            specimen: "" as any,
            radiologyOrdersStatus: false,
            otherOrdersStatus: false,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDemographicsStore, ["patient"]),
        inputFields() {
            return this.investigations[0].data.rowData[0].colData;
        },
    },
    watch: {
        investigations: {
            handler() {
                this.setDashedBox();
            },
            deep: true,
        },
        patient: {
            async handler() {
                this.labOrders = await OrderService.getOrders(this.patient.patientID);
            },
            deep: true,
        },
        $route: {
            async handler() {
                await this.getTests();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.getTests();
        this.updateInvestigationsStores();
        this.setDashedBox();
        this.updateInvestigationWizard();
    },

    methods: {
        setSegmentContent(name: any) {
            this.segmentContent = name;
        },
        async getTests() {
            const test = await getOfflineRecords("testTypes");
            modifyFieldValue(this.investigations, "test", "multiSelectData", test);
        },
        toggleLabOrderStatus() {
            this.labOrderStatus = !this.labOrderStatus;
        },
        async updateInvestigationWizard() {
            this.labOrders = await OrderService.getOrders(this.patient.patientID);
            const filteredArray = await this.labOrders.filter((obj: any) => {
                return HisDate.toStandardHisFormat(HisDate.sessionDate()) === HisDate.toStandardHisFormat(obj.order_date);
            });
            if (filteredArray.length > 0) {
                this.investigations[0].selectedData = filteredArray;
            } else {
                this.investigations[0].selectedData = "";
            }
        },
        async updateInvestigationsStores() {
            await this.updateInvestigationWizard();
            const investigationsStore = useInvestigationStore();
            investigationsStore.setInvestigations(this.investigations);
        },
        displayInputFields() {
            this.testResult = "";
            this.selectedText = "";
            this.no_item = false;
            this.addItemButton = false;
            this.search_item = true;
        },
        async validateRowData() {
            return validateInputFiledData(this.investigations);
            // if (this.inputFields[1].value.name && this.inputFields[0].value.name) return true;
            // else return false;
        },
        async checkTest() {
            if (await this.isNameInData(this.inputFields[0].value.name, await this.investigations[0].selectedData)) {
                modifyFieldValue(this.investigations, "test", "alertsErrorMassage", "Lab order already selected");
                return false;
            } else {
                modifyFieldValue(this.investigations, "test", "alertsErrorMassage", "");
                return true;
            }
        },
        async addNewRow() {
            if (validateInputFiledData(this.investigations) && (await this.checkTest())) {
                await this.saveTest();
                this.investigations[0].data.rowData[0].colData[0].value = "";
                this.investigations[0].data.rowData[0].colData[1].value = "";
                this.search_item = false;
                this.display_item = true;
                this.addItemButton = true;
            }
            this.updateInvestigationWizard();
        },
        isNameInData(name: any, dataArray: any) {
            for (let item of dataArray) {
                for (let test of item.tests) {
                    if (test.name === name) {
                        return true;
                    }
                }
            }
            return false;
        },
        async saveTest() {
            const investigationInstance = new LabOrder();
            await investigationInstance.postActivities(this.patient.patientID, [
                {
                    concept_id: this.inputFields[0].value.concept_id,
                    name: this.inputFields[0].value.name,
                    specimen: this.inputFields[1].value.name,
                    reason: "Routine",
                    specimenConcept: await ConceptService.getConceptID(this.inputFields[1].value.name, true),
                },
            ]);
            modifyFieldValue(this.investigations, "specimen", "disabled", true);
            this.labOrders = await OrderService.getOrders(this.patient.patientID);
        },

        async handleInputData(col: any) {
            if (col.inputHeader == "Test") {
                this.checkTest();
            }
            modifyFieldValue(this.investigations, "specimen", "alertsErrorMassage", "");
            if (col.inputHeader == "Test" && col.value) {
                const diagnosis = await getOfflineRecords("specimens", { whereClause: { name: col.value.name } });
                this.specimen = await OrderService.getSpecimens(col.value.name);
                console.log("🚀 ~ handleInputData ~ this.specimen:", this.specimen);
                console.log("🚀 ~ handleInputData ~ diagnosis:", diagnosis);
                if (this.specimen.length == 1) {
                    modifyFieldValue(this.investigations, "specimen", "value", this.specimen[0]);
                    modifyFieldValue(this.investigations, "specimen", "disabled", true);
                } else {
                    modifyFieldValue(this.investigations, "specimen", "value", "");
                    modifyFieldValue(this.investigations, "specimen", "disabled", false);
                }

                modifyFieldValue(this.investigations, "specimen", "multiSelectData", this.specimen);
            }
        },

        async filterTest(name: any) {
            return await this.labOrders.filter((item: any) => item.name.toLowerCase().includes(name.toLowerCase()));
        },
        async filterSpecimen(name: any) {
            if (this.specimen[0]?.name && name) {
                return await this.specimen.filter((item: any) => item?.name.toLowerCase().includes(name.toLowerCase()));
            } else {
                return [];
            }
        },
        setTest(value: any) {
            this.selectedText = value.name;
            if (this.inputFields[1].inputHeader == "Test") {
                this.investigations[0].data.rowData[0].colData[0].value = value.name;
            } else {
                this.investigations[0].data.rowData[0].colData[1].value = value.name;
            }
            this.updateInvestigationsStores();
        },
        setDashedBox() {
            if (this.inputFields[1].value || this.inputFields[0].value) {
                this.addItemButton = false;
                this.search_item = true;
                this.no_item = false;
            }
            if (this.investigations[0].selectedData.length > 0) {
                this.display_item = true;
                this.no_item = false;
            } else if (!this.search_item) {
                this.no_item = true;
            }
        },
    },
});
</script>

<style scoped>
.background {
    /* background-color: #fff; */
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
.action_buttons {
    opacity: 0; /* Initially hide the action buttons */
    transition: opacity 0.3s; /* Add a smooth transition effect */
}

.dashed_bottom_border:hover .action_buttons {
    opacity: 1; /* Show the action buttons when the row is hovered over */
}
.dashed_bottom_border {
    font-weight: 700;
}
.sub_item_body {
    margin-left: 45px;
}
ion-segment-button {
    background: #fff;
    margin-right: 1px;
    font-size: 12px;
    text-transform: unset;
}
.bottomSummary {
    margin-top: 20px;
    max-width: 600px;
}
.bottomSummary .segment-button-checked {
    background: #fff !important;
    --indicator-color: none;
}
.bottomSummary ion-segment-button {
    background: #e6e6e6;
    margin-right: 5px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    text-transform: unset;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
}
</style>
