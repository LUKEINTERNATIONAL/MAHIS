<template>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Level of consciousness</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <LevelOfConsciousness />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Presenting complaints</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <PresentingComplaints />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Pregnancy and breastfeeding status</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <PregnancyBreastfeeding />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Past medical history</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <PastMedicalHistory />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Allergies</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <Allergies />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Physical examination</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <PhysicalExamination />
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-row>
</template>

<script lang="ts">
import {IonContent, IonHeader, IonInput, IonItem, IonList, IonMenu, IonPopover, IonTitle, IonToolbar} from "@ionic/vue";
import {defineComponent} from "vue";
import {checkmark, pulseOutline} from "ionicons/icons";
import {icons} from "@/utils/svg";
import {OrderService} from "@/services/order_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import {useInvestigationStore} from "@/stores/InvestigationStore";
import {mapState} from "pinia";
import {popoverConfirmation} from "@/utils/Alerts";
import BasicForm from "@/components/BasicForm.vue";
import List from "@/components/List.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import labOrderResults from "@/apps/NCD/components/ConsultationPlan/lab/labOrderResults.vue";
import {LabOrder} from "@/apps/NCD/services/lab_order";
import Allergies from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/Allergies.vue";
import LevelOfConsciousness from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/LevelOfConsciousness.vue";
import PastMedicalHistory from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PastMedicalHistory.vue";
import PhysicalExamination from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PhysicalExamination.vue";
import PregnancyBreastfeeding
  from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PregnancyBreastfeeding.vue";
import PresentingComplaints from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PresentingComplaints.vue";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {ConceptService} from "@/services/concept_service";

export default defineComponent({
    name: "Menu",
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
        Allergies,
        LevelOfConsciousness,
        PastMedicalHistory,
        PhysicalExamination,
        PregnancyBreastfeeding,
        PresentingComplaints,
    },
    data() {
        return {
            iconsContent: icons,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            testResult: "" as any,
            test: "" as any,
            orders: "" as any,
            filteredSpecimen: "" as any,
            labOrders: "" as any,
            testData: [] as any,
            popoverOpen: false,
            levelOfConsciousnessStatus: false,
            presentingComplaintsStatus: false,
            pregnancyBreastfeedingStatus: false,
            pastMedicalHistory: false,
            allergiesStatus: false,
            physicalExamination: false,
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
        ...mapState(useDemographicsStore, ["demographics"]),
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
    },
    async mounted() {
        this.updateInvestigationsStores();
        this.setDashedBox();
        this.orders = await OrderService.getOrders(this.demographics.patient_id);
        this.labOrders = await OrderService.getTestTypes();
    },
    methods: {
        updateInvestigationsStores() {
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
            const firstCol = this.investigations[0].data.rowData[0].colData[0];
            const secondCol = this.investigations[0].data.rowData[0].colData[1];

            firstCol.alertsError = false;
            firstCol.alertsErrorMassage = "";
            secondCol.alertsError = false;
            secondCol.alertsErrorMassage = "";

            secondCol.disabled = false;

            const testValue = this.inputFields[0].value;
            const specimenValue = this.inputFields[1].value;

            this.test = await this.filterTest(testValue);
            this.filteredSpecimen = await this.filterSpecimen(specimenValue);

            const testMatches = testValue && this.test[0]?.name === testValue;
            const specimenMatches = specimenValue && this.filteredSpecimen[0]?.name === specimenValue;

            if (testValue) {
                if (testMatches) {
                    this.specimen = await OrderService.getSpecimens(firstCol.value);
                    if (this.specimen.length == 1) {
                        secondCol.value = this.specimen[0].name;
                        secondCol.disabled = true;
                    }
                    secondCol.popOverData.data = this.specimen;
                } else {
                    secondCol.value = "";
                    this.search_item = true;
                    firstCol.alertsError = true;
                    firstCol.alertsErrorMassage = "Please select test from the list";
                }
            } else {
                secondCol.value = "";
            }

            if (specimenValue && !specimenMatches && !secondCol.disabled) {
                secondCol.alertsError = true;
                secondCol.alertsErrorMassage = "Please select specimen from the list";
            }

            return testMatches && (specimenMatches || secondCol.disabled);
        },
        async addNewRow() {
            if (await this.validateRowData()) {
                this.saveTest();
                this.investigations[0].data.rowData[0].colData[0].value = "";
                this.investigations[0].data.rowData[0].colData[1].value = "";
                this.search_item = false;
                this.display_item = true;
                this.addItemButton = true;
            }
            this.investigations[0].data.rowData[0].colData[0].popOverData.data = [];
        },
        async saveTest() {
            const investigationInstance = new LabOrder();
            await investigationInstance.postActivities(this.demographics.patient_id, [
                {
                    concept_id: this.test[0].concept_id,
                    name: this.inputFields[0].value,
                    specimen: this.inputFields[1].value,
                    reason: "Routine",
                    specimenConcept: await ConceptService.getConceptID(this.inputFields[1].value),
                },
            ]);
            this.orders = await OrderService.getOrders(this.demographics.patient_id);
        },
        buildResults() {
            const modifier = this.inputFields[1].value.charAt(0);
            const result = parseInt(this.inputFields[1].value.substring(1));
            const measures = {
                indicator: {
                    concept_id: 679,
                },
                value: result,
                value_modifier: modifier,
                value_type: "numeric",
            };
        },
        async handleInputData(col: any) {
            if (col.inputHeader == "Test") {
                this.popoverOpen = true;
                this.testData = await this.filterTest(col.value);
                this.investigations[0].data.rowData[0].colData[0].popOverData.data = this.testData;
            }
            this.validateRowData();
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
            if (this.inputFields[0].inputHeader == "Test") {
                this.investigations[0].data.rowData[0].colData[0].value = value.name;
            } else {
                this.investigations[0].data.rowData[0].colData[1].value = value.name;
            }
            this.updateInvestigationsStores();
        },
        async openDeletePopover(e: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e[1]} ?`, e[0]);
            if (deleteConfirmed) {
                this.deleteTest(e[1]);
            }
        },
        deleteTest(test: any) {
            this.investigations[0].selectedData = this.investigations[0].selectedData.filter((item: any) => item.display[0] !== test);
            this.updateInvestigationsStores();
        },
        editTest(test: any) {
            this.deleteTest(test[0]);
            this.selectedText = test[0];
            this.investigations[0].data.rowData[0].colData[0].value = test[0];
            this.investigations[0].data.rowData[0].colData[1].value = test[1];
            this.addItemButton = false;
            this.search_item = true;
            this.updateInvestigationsStores();
        },
        setDashedBox() {
            if (this.inputFields[0].value || this.inputFields[1].value) {
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
.presentingComplaint {
    margin-top: 10px;
}
</style>
