<template>
    <SendToLabConfirmationModal
        :closeModalFunc="closeSendToLabModal"
        :onYes="handleSendToLabYes"
        :onNo="handleSendToLabNo"
        :isOpen="sendToLabModalOpen"
        :title="`Do you really want to send patient to lab?`"
    />
    <div class="modal_wrapper" v-if="listResults.length > 1">
        <div style="font-weight: 700">Lab Results</div>
        <div style="--background: #fff" class="scrollable-container">
            <list :listData="listResults" @clicked:delete="voidLabOrder" @clicked:view="viewLabOrder"> </list>
        </div>
        <div style="margin-top: 5px" v-if="listResults.length <= 4 && listSeeMoreResults.length >= 4">
            <DynamicButton @click="seeOrderStatus('more')" name="Show More Lab Results" fill="clear" iconSlot="icon-only" />
        </div>
        <div style="margin-top: 5px" v-else-if="listResults.length >= 5">
            <DynamicButton @click="seeOrderStatus('less')" name="Show Less Lab Results" fill="clear" iconSlot="icon-only" />
        </div>
    </div>

    <div class="modal_wrapper" v-if="listOrders.length > 1">
        <div style="font-weight: 700">Lab Orders</div>
        <div class="scrollable-container">
            <list :listData="listOrders" @clicked:delete="voidLabOrder" @clicked:results="openResultsForm"></list>
        </div>
        <div style="margin-top: 5px" v-if="listOrders.length <= 4 && listSeeMoreOrders.length >= 4">
            <DynamicButton @click="seeResultsStatus('more')" name="Show More Lab Orders" fill="clear" iconSlot="icon-only" />
        </div>
        <div style="margin-top: 5px" v-if="listOrders.length >= 5">
            <DynamicButton @click="seeResultsStatus('less')" name="Show Less Lab Orders" fill="clear" iconSlot="icon-only" />
        </div>
    </div>
    <div v-if="activeProgramID == 14 && hasEnterResults && (userRoles === 'Clinician' || userRoles === 'Superuser')">
        <div v-if="hasPatientsWaitingForLab">
            <DynamicButton
                class="no-margin-left"
                fill="clear"
                icon="notification_icon"
                iconSlot="icon-only"
                name="Waiting for results from the lab"
            />
        </div>
        <div v-else>
            <DynamicButton fill="solid" :icon="iconsContent.plus" iconSlot="icon-only" @click="toggleSendToLabModal()" name="Send to Lab" />
        </div>
    </div>
    <LabModal :popoverOpen="openModal" @saved="updateLabList" @closeModal="openModal = false" />
    <LabViewResultsModal :popoverOpen="openResultsModal" :content="labResultsContent" @closeModal="openResultsModal = false" />
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import ApexChart from "vue3-apexcharts";
import List from "@/components/List.vue";
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
import LabViewResultsModal from "@/components/Lab/LabViewResultsModal.vue";
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
import SetPrograms from "@/views/Mixin/SetPrograms.vue";

export default defineComponent({
    name: "Menu",
    mixins: [SetPrograms],
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
        List,
        DynamicButton,
        DashBox,
        LabModal,
        LabViewResultsModal,
        SendToLabConfirmationModal,
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
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
            listSeeMoreOrders: [] as any,
            listSeeLessOrders: [] as any,
            listSeeMoreResults: [] as any,
            listSeeLessResults: [] as any,
            listHeaderResults: "" as any,
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
        this.orders = this.propOrders;
        this.setListData(this.orders);
        this.service = new PatientLabService(this.demographics.patient_id);
        this.userRoles = await Service.getUserRoles();
    },

    watch: {
        propOrders: {
            handler() {
                this.orders = this.propOrders;
                this.setListData(this.orders);
            },
            deep: true,
        },
        $route: {
            handler() {
                this.updateLabList();
            },
            deep: true,
        },
    },
    methods: {
        toggleSendToLabModal() {
            this.sendToLabModalOpen = !this.sendToLabModalOpen;
        },
        async fetchPatientLabStageData() {
            const location = await getUserLocation();
            const locationId = location ? location.location_id : null;

            if (locationId) {
                const LabPatients = await PatientOpdList.getPatientList("LAB", locationId);
                await usePatientList().refresh(locationId);
                if (this.demographics.patient_id) {
                    this.hasPatientsWaitingForLab = LabPatients.some((p: any) => p.patient_id === this.demographics.patient_id);
                }
            }
        },
        async handleSendToLabYes() {
            const location = await getUserLocation();
            const locationId = location ? location.location_id : null;
            if (!locationId) {
                toastDanger("Location ID could not be found. Please check your settings.");
                return;
            }
            await PatientOpdList.addPatientToStage(this.demographics.patient_id, dates.todayDateFormatted(), "LAB", locationId);
            await usePatientList().refresh(locationId);
            toastSuccess("Lab orders submitted to the lab successfully");
            await this.fetchPatientLabStageData();
            this.closeSendToLabModal();
        },
        async handleSendToLabNo() {
            this.toggleSendToLabModal();
        },
        closeSendToLabModal() {
            this.sendToLabModalOpen = false;
        },
        async updateLabList() {
            this.openModal = false;
            this.orders = await OrderService.getOrders(this.demographics.patient_id);
            this.setListData(this.orders);
            this.updateInvestigationWizard();
        },
        async updateInvestigationWizard() {
            this.orders = await OrderService.getOrders(this.demographics.patient_id);
            const filteredArray = await this.orders.filter((obj: any) => {
                return HisDate.toStandardHisFormat(HisDate.currentDate()) === HisDate.toStandardHisFormat(obj.order_date);
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
        async voidLabOrder(event: any) {
            await this.service.voidOrder(event.id, "Mistake entry");
            this.updateLabList();
        },

        handleIcon() {},
        async openResultsForm(obs: any) {
            console.log(obs.item.concept_id);
            const testIndicators = await PatientLabResultService.getTestIndicatorsWithID(obs.item.concept_id);

            console.log({ testIndicators });

            const indicators = [
                obs.item,
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
            this.orders = await OrderService.getOrders(this.demographics.patient_id);
        },
        async viewLabOrder(labResults: any) {
            console.log("🚀 ~ openResultsForm ~ labResults:", labResults);
            this.labResultsContent = labResults;
            this.openResultsModal = true;
            //  this.orders = await OrderService.getOrders(this.demographics.patient_id);
            // const labf = createModal(LabResults);
            // console.log("🚀 ~ openResultsForm ~ labf:", labf);
        },
        setActivClass(active: any) {
            this.activeHeight = "";
            this.activeBMI = "";
            this.activeWeight = "";
            if (active == "height") this.activeHeight = "_active";
            else if (active == "weight") this.activeWeight = "_active";
            else if (active == "BMI") this.activeBMI = "_active";
        },
        setListData(data: any) {
            const resultsTableSize = { containSize: 2.1, btnSize: 1 };
            this.listHeaderResults = this.generateListHeader(["Lab Test", "Specimen", "Accession Number", "Date", "Result"], resultsTableSize);
            this.listHeaderOrders = this.generateListHeader(["Lab Test", "Specimen", "Accession Number", "Date", "Result"]);

            this.listSeeMoreResults = this.generateListItems(data, "result", true, resultsTableSize);
            this.listSeeLessResults = this.generateListItems(data, "result", false, resultsTableSize);
            this.listSeeMoreOrders = this.generateListItems(data, "order", true);
            this.listSeeLessOrders = this.generateListItems(data, "order", false);

            this.listResults = [this.listHeaderResults, ...this.listSeeLessResults];
            this.listOrders = [this.listHeaderOrders, ...this.listSeeLessOrders];
        },

        generateListHeader(display: any, size = {} as any) {
            return {
                containSize: size?.containSize,
                btnSize: size?.btnSize,
                class: "",
                header: true,
                minHeight: "--min-height: 25px;",
                display,
            };
        },

        generateListItems(data: any, type: any, isMore: any, tableSize = {} as any) {
            let count = 0;
            if (data.length > 0) {
                return data.flatMap((item: any) => {
                    return item.tests.flatMap((test: any) => {
                        let result = null;
                        if (test?.result?.length == 1) {
                            result = test?.result != null ? test?.result[0]?.value_modifier + test?.result[0]?.value : null;
                        } else if (test?.result?.length > 1) {
                            result = test?.result;
                        }
                        if (result == "") console.log("🚀 ~ returnitem.tests.flatMap ~ result:", test);
                        if ((type === "result" && result !== null) || (type === "order" && result === null)) {
                            const listItem = {
                                containSize: tableSize?.containSize,
                                btnSize: tableSize?.btnSize,
                                btn: type === "order" ? ["enter_results", "attach", "print", "delete"] : ["print", "delete"],
                                minHeight: "--min-height: 25px;",
                                class: "",
                                id: item.order_id,
                                name: test.name,
                                item: test,
                                display:
                                    type == "order"
                                        ? [HisDate.toStandardHisFormat(item.order_date), item.accession_number, test.name, item.specimen.name]
                                        : [
                                              HisDate.toStandardHisFormat(item.order_date),
                                              item.accession_number,
                                              test.name,
                                              item.specimen.name,
                                              result,
                                          ],
                            };

                            if (isMore || count < 2) {
                                count++;
                                return [listItem];
                            }
                        }
                        return [];
                    });
                });
            } else {
                return [];
            }
        },
        seeOrderStatus(status: any) {
            if (status == "more") {
                this.listResults = [this.listHeaderResults, ...this.listSeeMoreResults];
            } else if (status == "less") this.listResults = [this.listHeaderResults, ...this.listSeeLessResults];
        },
        seeResultsStatus(status: any) {
            if (status == "more") {
                this.listOrders = [this.listHeaderOrders, ...this.listSeeMoreOrders];
            } else if (status == "less") this.listOrders = [this.listHeaderOrders, ...this.listSeeLessOrders];
        },
    },
});
</script>

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
