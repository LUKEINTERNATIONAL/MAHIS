<template>
    <DashBox v-if="listResults.length < 1 && listOrders.length < 1" :content="'No Investigations added '" />
    <div class="modal_wrapper" v-if="listResults.length > 1">
        <div style="font-weight: 700">Lab Results</div>
        <div>
            <list :listData="listResults" @clicked:delete="voidLabOrder"></list>
        </div>
        <div style="margin-top: 5px" v-if="listResults.length <= 3 && listSeeMoreResults.length > 3">
            <DynamicButton @click="seeOrderStatus('more')" name="Show More Lab Results" fill="clear" iconSlot="icon-only" />
        </div>

        <div style="margin-top: 5px" v-else-if="listResults.length >= 4">
            <DynamicButton @click="seeOrderStatus('less')" name="Show Less Lab Results" fill="clear" iconSlot="icon-only" />
        </div>
    </div>

    <div class="modal_wrapper" v-if="listOrders.length > 1">
        <div style="font-weight: 700">Lab Orders</div>
        <div>
            <list :listData="listOrders" @clicked:delete="voidLabOrder" @clicked:results="openResultsForm"></list>
        </div>
        <div style="margin-top: 5px" v-if="listOrders.length <= 3 && listSeeMoreOrders.length > 3">
            <DynamicButton @click="seeResultsStatus('more')" name="Show More Lab Orders" fill="clear" iconSlot="icon-only" />
        </div>
        <div style="margin-top: 5px" v-if="listOrders.length >= 4">
            <DynamicButton @click="seeResultsStatus('less')" name="Show Less Lab Orders" fill="clear" iconSlot="icon-only" />
        </div>
    </div>
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
import { createModal } from "@/utils/Alerts";
import LabResults from "@/apps/NCD/components/ConsultationPlan/lab/LabResults.vue";
import { PatientLabResultService } from "@/services/patient_lab_result_service";

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
        ApexChart,
        List,
        DynamicButton,
        DashBox,
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useLabResultsStore, ["labResults"]),
    },
    props: {
        propOrders: {
            default: [] as any,
        },
    },
    data() {
        return {
            valueNumericArray: [] as any,
            obsDatetime: [] as any,
            graphIcon: iconGraph(["#006401"]),
            listIcon: iconList(["#636363"]),
            displayGraph: true,
            orders: [] as any,
            height: [] as any,
            BMI: [] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            listOrders: [] as any,
            listResults: [] as any,
            listSeeMoreOrders: [] as any,
            listSeeLessOrders: [] as any,
            listSeeMoreResults: [] as any,
            listSeeLessResults: [] as any,
            listHeaderResults: "" as any,
            listHeaderOrders: "" as any,
            service: "" as any,
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
    },
    watch: {
        propOrders: {
            handler() {
                this.orders = this.propOrders;
                this.setListData(this.orders);
            },
            deep: true,
        },
    },
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        async voidLabOrder(event: any) {
            await this.service.voidOrder(event.id, "Mistake entry");
        },

        handleIcon() {},
        async openResultsForm(obs: any) {
            const testIndicators = await PatientLabResultService.getTestIndicatorsWithID(obs.item.concept_id);
            const indicators = [] as any;
            testIndicators.forEach((item: any) => {
                indicators.push({
                    validationStatus: "",
                    data: {
                        rowData: [
                            {
                                colData: [
                                    {
                                        inputHeader: item.name,
                                        value: "",
                                        name: item.name,
                                        required: true,
                                        eventType: "input",
                                        alertsError: false,
                                        alertsErrorMassage: "",
                                    },
                                ],
                            },
                        ],
                    },
                });
            });
            console.log(indicators);
            const lab = useLabResultsStore();
            lab.setLabResults(indicators);
            createModal(LabResults);
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
            this.listHeaderResults = this.generateListHeader(["Date", "Accession Number", "Lab Test", "Specimen", "Result"], resultsTableSize);
            this.listHeaderOrders = this.generateListHeader(["Date", "Accession Number", "Lab Test", "Specimen"]);

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

            return data.flatMap((item: any) => {
                return item.tests.flatMap((test: any) => {
                    const result = test?.result != null ? test?.result[0]?.value_modifier + test?.result[0]?.value : null;

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
                                    : [HisDate.toStandardHisFormat(item.order_date), item.accession_number, test.name, item.specimen.name, result],
                        };

                        if (isMore || count < 2) {
                            count++;
                            return [listItem];
                        }
                    }
                    return [];
                });
            });
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
</style>
