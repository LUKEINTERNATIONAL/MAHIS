<template>
    <div class="container">
        <div class="table-responsive">
            <DataTable ref="dataTable" :options="options" :data="tableData" class="display nowrap" width="100%">
                <thead>
                    <tr>
                        <th v-for="head in header" :key="head">{{ head }}</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
        <LabViewResultsModal :popoverOpen="openResultsModal" :content="labResultsContent" @closeModal="openResultsModal = false" />
        <LabModal :popoverOpen="openModal" @saved="closeModal" @closeModal="openModal = false" />
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import ApexChart from "vue3-apexcharts";
import { ObservationService } from "@/services/observation_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useLabResultsStore } from "@/stores/LabResults";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { iconGraph, iconList } from "@/utils/SvgDynamicColor";
import { OrderService } from "@/services/order_service";
import DynamicButton from "@/components/DynamicButton.vue";
import table from "@/components/DataViews/tables/ReportDataTable";
import DashBox from "@/components/DashBox.vue";
import { PatientLabService } from "@/services/lab/patient_lab_service";
import { createModal, toastDanger, toastSuccess } from "@/utils/Alerts";
import LabResults from "@/components/Lab/LabResults.vue";
import { PatientLabResultService } from "@/services/patient_lab_result_service";
import LabModal from "@/components/Lab/LabModal.vue";
import LabViewResultsModal from "@/apps/NCD/components/ConsultationPlan/Investigation/LabViewResultsModal.vue";
import EnterResultModal from "@/apps/NCD/components/ConsultationPlan/Investigation/EnterResultModal.vue";
import labOrderResults from "@/components/Lab/labOrderResults.vue";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import CheckInConfirmationModal from "@/components/Modal/CheckInConfirmationModal.vue";
import SendToLabConfirmationModal from "@/components/Lab/SendToLabConfirmationModal.vue";
import { Service } from "@/services/service";
import { getUserLocation } from "@/services/userService";
import { PatientOpdList } from "@/services/patient_opd_list";
import dates from "@/utils/Date";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import DataTablesResponsive from "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-dt";
import "datatables.net-responsive";
import "datatables.net-select";

import "datatables.net-buttons";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import { LabOrder } from "@/services/lab_order";
import { ConceptService } from "@/services/concept_service";

export default defineComponent({
    name: "Menu",
    components: {
        CheckInConfirmationModal,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        ApexChart,
        DynamicButton,
        DashBox,
        LabModal,
        LabViewResultsModal,
        SendToLabConfirmationModal,
        DataTable,
    },

    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useLabResultsStore, ["labResults"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(usePatientList, [
            "patientsWaitingForVitals",
            "patientsWaitingForConsultation",
            "patientsWaitingForLab",
            "patientsWaitingForDispensation",
        ]),
        hasEnterResults(): boolean {
            return this.listOrders.some((item: any) => item.btn && item.btn.includes("enter_results"));
        },
    },
    props: {
        propOrders: {
            default: [] as any,
        },
    },
    data() {
        return {
            tableData: [] as any,
            options: {
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
                        text: " <b>+ Add other tests </b>",
                        className: "add-test text-white",
                        action: async () => {
                            await this.openEnterResultModal();
                        },
                    },
                ],
            } as any,

            header: ["Lab Test", "Specimen", "Accession Number", "Order Date", "Result", "Action"],
            iconsContent: icons,
            valueNumericArray: [] as any,
            obsDatetime: [] as any,
            graphIcon: iconGraph(["#006401"]),
            listIcon: iconList(["#636363"]),
            displayGraph: true,
            sendToLabModalOpen: false,
            orders: [] as any,
            userRoles: [] as any,
            height: [] as any,
            BMI: [] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            listOrders: [] as any,
            listResults: [] as any,
            hasPatientsWaitingForLab: false,
            labResultsContent: "" as any,
            listHeaderOrders: "" as any,
            service: "" as any,
            openModal: false,
            openResultsModal: false,
            series: [
                {
                    name: "",
                    data: [],
                },
            ],
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    async mounted() {
        await this.updateInvestigationWizard();
        await this.setListData();
        this.$nextTick(() => {
            const table = (this.$refs.dataTable as any).dt;
            table.columns.adjust().draw();
            table.on("click", ".result-btn", (e: Event) => {
                const data: any = (e.target as HTMLElement).getAttribute("data-id");
                this.openResultsForm(JSON.parse(data));
            });
            table.on("click", ".view-btn", (e: Event) => {
                const data: any = (e.target as HTMLElement).getAttribute("data-id");
                this.viewLabOrder(JSON.parse(data));
            });
            table.on("click", ".delete-btn", (e: Event) => {
                const data: any = (e.target as HTMLElement).getAttribute("data-id");
                this.voidLabOrder(JSON.parse(data), e);
            });
            table.on("click", ".order-btn", (e: Event) => {
                const data: any = (e.target as HTMLElement).getAttribute("data-id");
                this.saveTest(JSON.parse(data));
            });
        });
        this.orders = this.propOrders;
        this.service = new PatientLabService(this.patient.patientID);
        this.userRoles = await Service.getUserRoles();
    },

    watch: {
        $route: {
            async handler() {
                await this.setListData();
            },
            deep: true,
        },
    },
    methods: {
        async closeModal() {
            this.openModal = false;
            await this.setListData();
        },
        async saveTest(data: any) {
            const investigationInstance = new LabOrder();
            await investigationInstance.postActivities(this.patient.patientID, [
                {
                    concept_id: await ConceptService.getConceptID(data.name, true),
                    name: data.name,
                    specimen: data.specimen,
                    reason: "Routine",
                    specimenConcept: await ConceptService.getConceptID(data.specimen, true),
                },
            ]);
            toastSuccess("Successfully saved");
            await this.setListData();
        },
        async openEnterResultModal() {
            const dataToPass = { title: "name" };
            await createModal(EnterResultModal, { class: "lab-results-modal" }, true, dataToPass);
            await this.setListData();
        },
        toggleSendToLabModal() {
            this.sendToLabModalOpen = !this.sendToLabModalOpen;
        },
        async fetchPatientLabStageData() {
            const location = await getUserLocation();
            const locationId = location ? location.location_id : null;

            if (locationId) {
                const LabPatients = await PatientOpdList.getPatientList("LAB", locationId);
                await usePatientList().refresh(locationId);
                if (this.patient.patientID) {
                    this.hasPatientsWaitingForLab = LabPatients.some((p: any) => p.patient_id === this.patient.patientID);
                }
            }
        },

        async updateInvestigationWizard() {
            this.orders = await OrderService.getOrders(this.patient.patientID);
            const filteredArray = await this.orders.filter((obj: any) => {
                return HisDate.toStandardHisFormat(HisDate.sessionDate()) === HisDate.toStandardHisFormat(obj.order_date);
            });
            if (filteredArray.length > 0) {
                this.investigations[0].selectedData = filteredArray;
            } else {
                this.investigations[0].selectedData = "";
            }
        },
        dismiss() {
            modalController.dismiss();
        },
        async voidLabOrder(data: any, event: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${data.tests[0].name} ?`, event);
            if (deleteConfirmed) {
                await this.service.voidOrder(data.id, "Mistake entry");
            }
            await this.setListData();
        },

        async openResultsForm(test: any) {
            const testIndicators = await PatientLabResultService.getTestIndicatorsWithID(test.concept_id);

            console.log({ testIndicators });

            const indicators = [
                test,
                {
                    validationStatus: "",
                    data: {
                        rowData: [
                            {
                                colData: [],
                            },
                        ],
                    },
                },
            ] as any;

            testIndicators.forEach((item: any) => {
                let data = {
                    inputHeader: item.name,
                    value: "",
                    colSize: 3,
                    id: item.concept_id,
                    name: item.name,
                    required: true,
                    eventType: "input",
                    alertsErrorMassage: "",
                } as any;
                if (item.name == "RBS") {
                    data = {
                        inputHeader: item.name,
                        value: "",
                        colSize: 3,
                        id: item.concept_id,
                        name: item.name,
                        required: true,
                        eventType: "input",
                        alertsErrorMassage: "",
                        validationFunctionName: "validateRBS",
                        unit: "mg/dL",
                    };
                }
                if (item.name == "FBS") {
                    data = {
                        inputHeader: item.name,
                        value: "",
                        colSize: 3,
                        id: item.concept_id,
                        name: item.name,
                        required: true,
                        eventType: "input",
                        alertsErrorMassage: "",
                        validationFunctionName: "validateFBS",
                        unit: "mg/dL",
                    };
                }
                if (
                    item.name == "MRDT" ||
                    item.name == "Tuberculosis program" ||
                    item.name == "Vdrl" ||
                    item.name == "Hepatitis B" ||
                    item.name == "Lam" ||
                    item.name == "CrAg" ||
                    item.name == "CD4 count" ||
                    //dip Stick
                    item.name == "Leukocytes" ||
                    item.name == "Protein" ||
                    item.name == "Nitrite" ||
                    item.name == "Urine Ketones" ||
                    //hiv
                    item.name == "HIV test"
                ) {
                    let multiData = [] as any;
                    if (item.name == "MRDT" || item.name == "Vdrl" || item.name == "Hepatitis B" || item.name == "CrAg" || item.name == "Lam") {
                        multiData = [
                            { id: "1", name: "Positive" },
                            { id: "2", name: "Negative" },
                            { id: "3", name: "Invalid" },
                        ];
                    }

                    if (item.name == "Tuberculosis program") {
                        multiData = [
                            { id: "1", name: "Scanty" },
                            { id: "2", name: "Negative" },
                            { id: "3", name: "1+" },
                            { id: "4", name: "2+" },
                            { id: "5", name: "3+" },
                        ];
                    }
                    if (item.name == "CD4 count") {
                        multiData = [
                            { id: "1", name: "below reference line" },
                            { id: "2", name: "above reference line" },
                        ];
                    }
                    if (
                        item.name == "Leukocytes" ||
                        item.name == "Protein" ||
                        item.name == "Nitrite" ||
                        item.name == "Ketones" ||
                        item.name == "Urine Ketones"
                    ) {
                        multiData = [
                            { id: "2", name: "Negative" },
                            { id: "1", name: "Trace" },
                            { id: "3", name: "1+" },
                            { id: "4", name: "2+" },
                            { id: "5", name: "3+" },
                            { id: "6", name: "4+" },
                        ];
                    }

                    if (item.name == "HIV test") {
                        multiData = [
                            { id: "2", name: "Positive" },
                            { id: "1", name: "Negative" },
                            { id: "3", name: "Invalid" },
                        ];
                    }

                    data = {
                        inputHeader: item.name,
                        icon: icons.search,
                        value: "",
                        name: "units",
                        eventType: "input",
                        alertsErrorMassage: "",
                        isSingleSelect: true,
                        trackBy: "id",
                        multiSelectData: multiData,
                        id: item.concept_id,
                        idName: "district_id",
                    } as any;
                }

                //TODO: urine deep stick enter result

                indicators[1].data.rowData[0].colData.push(data);
            });
            const lab = useLabResultsStore();

            lab.setLabResults(indicators);
            this.openModal = true;
            this.orders = await OrderService.getOrders(this.patient.patientID);
            console.log("🚀 ~ openResultsForm ~ this.orders:", this.orders);
        },
        async viewLabOrder(labResults: any) {
            this.labResultsContent = labResults;
            this.openResultsModal = true;
        },
        async setListData() {
            this.orders = await OrderService.getOrders(this.patient.patientID);
            const tableData: any = this.generateListItems(this.orders, "order");
            const predefineTests = [
                [
                    "FBS",
                    "Blood",
                    "",
                    "",
                    "",
                    `<button class="btn btn-outline-success btn-sm order-btn" data-id='${JSON.stringify({
                        name: "FBS",
                        specimen: "Blood",
                    })}'>Order Test</button> `,
                ],
                [
                    "HbA1c",
                    "Blood",
                    "",
                    "",
                    "",
                    `<button class="btn btn-outline-success btn-sm order-btn" data-id='${JSON.stringify({
                        name: "HbA1c",
                        specimen: "Blood",
                    })}'>Order Test</button> `,
                ],
                [
                    "RBS",
                    "Blood",
                    "",
                    "",
                    "",
                    `<button class="btn btn-outline-success btn-sm order-btn" data-id='${JSON.stringify({
                        name: "RBS",
                        specimen: "Blood",
                    })}'>Order Test</button> `,
                ],
            ];
            const uniquePredefineTests = predefineTests.filter((predefTest) => {
                return !tableData.some((tableRow: any) => tableRow[0] === predefTest[0]);
            });

            const duplicateTests = tableData.filter((tableRow: any) => {
                return predefineTests.some((predefTest) => predefTest[0] === tableRow[0]);
            });

            const uniqueTableDataTests = tableData.filter((predefTest: any) => {
                return !duplicateTests.some((tableRow: any) => tableRow[0] === predefTest[0]);
            });
            this.tableData = [...duplicateTests, ...uniquePredefineTests, ...uniqueTableDataTests];
            await this.updateInvestigationWizard();
            DataTable.use(DataTablesCore);
        },

        generateListItems(data: any, type: any) {
            let count = 0;
            let result = null;
            if (data.length > 0) {
                return data.flatMap((item: any) => {
                    return item.tests.flatMap((test: any) => {
                        const enter_results = `<button class="btn btn-outline-success btn-sm result-btn" data-id='${JSON.stringify(
                            test
                        )}'>Enter Result</button> `;
                        const attach = `<button class="btn btn-outline-secondary btn-sm attach-btn" data-id='${JSON.stringify(test)}'>${
                            this.iconsContent.attach2
                        }</button>`;
                        const view = `<button class="btn btn-outline-secondary btn-sm view-btn" data-id='${JSON.stringify(test)}'>${
                            this.iconsContent.view2
                        }</button> `;
                        let resultDisplay = enter_results + attach;
                        if (test?.result?.length == 1) {
                            resultDisplay = test?.result != null ? test?.result[0]?.value_modifier + test?.result[0]?.value : null;
                        } else if (test?.result?.length > 1) {
                            result = test?.result;
                            resultDisplay = view;
                        }

                        return [
                            [
                                test.name,
                                item.specimen.name,
                                item.accession_number,
                                HisDate.toStandardHisFormat(item.order_date),
                                resultDisplay,
                                `<button class="btn btn-outline-secondary btn-sm" data-id='${JSON.stringify(item)}'>${
                                    this.iconsContent.print2
                                }</button>
                                <button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify(item)}'>${
                                    this.iconsContent.delete2
                                }</button>
                                `,
                            ],
                        ];
                    });
                });
            } else {
                return [];
            }
        },
    },
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
</style>
<style scoped>
.bmi_blood {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #ddeedd;
    border-radius: 4px;
    padding: 4px;
    min-width: 190px;
}
.graphBtn {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #ddeedd;
    border-radius: 4px;
    padding: 4px;
    min-width: 90px;
}
._active {
    background-color: #ddeedd;
    color: #006401;
    padding: 5px;
    border-radius: 4px;
}
.iconBg {
    background: #ddeedd;
    padding: 2px;
    border-radius: 5px;
}
.show_more {
    color: #006401;
    padding: 10px;
}
.no-margin-left {
    margin: 0;
    display: flex;
    justify-content: flex-start;
    background: lightcyan;
}
.scrollable-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
}
</style>
