<template>
    <div class="modal_wrapper">
        <div class="immunizationGraph">
            <div class="immunizationGraphText">Immunization Graphs</div>
            <ApexChart width="100%" height="100%" type="area" :options="options" :series="series" />
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
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { iconGraph, iconList } from "@/utils/SvgDynamicColor";

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
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    data() {
        return {
            valueNumericArray: [] as any,
            obsDatetime: [] as any,
            graphIcon: iconGraph(["#006401"]),
            listIcon: iconList(["#636363"]),
            displayGraph: true,
            weight: [] as any,
            height: [] as any,
            BMI: [] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            list: [] as any,
            options: {
                chart: {
                    id: "vuechart-example",
                },
                fill: {
                    colors: ["#006401"],
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100],
                    },
                },
                stroke: {
                    curve: "straight",
                    colors: ["#006401"], // Specify the color you want for the line on top of the area
                    width: 2, // Set the width of the line
                },
                markers: {
                    size: 3, // Set the size of the dots
                    colors: ["#006401"],
                    strokeColors: ["#006401"],
                    hover: {
                        size: 5,
                        sizeOffset: 3,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                grid: {
                    show: true,
                    borderColor: "#B3B3B3",
                    strokeDashArray: 4,
                    position: "front",
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    yaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    row: {
                        colors: "",
                        opacity: 0.5,
                    },
                    column: {
                        colors: "",
                        opacity: 0.5,
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
                yaxis: {
                    min: 0,
                    forceNiceScale: true,
                },
            } as any,
            series: [
                {
                    name: "",
                    data: [],
                },
            ] as any,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    async mounted() {
        this.weight = await ObservationService.getAll(this.demographics.patient_id, "weight");
        this.height = await ObservationService.getAll(this.demographics.patient_id, "Height");
        this.BMI = await ObservationService.getAll(this.demographics.patient_id, "BMI");
        this.setData();
        this.iconBg.graph = "iconBg";
    },
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        handleIcon() {},
        toggleDisplay(status: any) {
            this.displayGraph = status;
            if (this.displayGraph) {
                this.graphIcon = iconGraph(["#006401"]);
                this.listIcon = iconList(["#636363"]);
                this.iconBg.graph = "iconBg";
                this.iconBg.list = "";
            } else {
                this.graphIcon = iconGraph(["#636363"]);
                this.listIcon = iconList(["#006401"]);
                this.iconBg.graph = "";
                this.iconBg.list = "iconBg";
            }
        },
        setActivClass(active: any) {
            this.activeHeight = "";
            this.activeBMI = "";
            this.activeWeight = "";
            if (active == "height") this.activeHeight = "_active";
            else if (active == "weight") this.activeWeight = "_active";
            else if (active == "BMI") this.activeBMI = "_active";
        },
        setData() {
            this.series[0].data = ["10", "20", "50", "60", "90", "109", "20", "10", "50", "15"];
            this.series[0].name = "Total";
            this.options = {
                ...this.options,
                ...{
                    xaxis: {
                        categories: [
                            "Birth",
                            "6 Weeks",
                            "10 Weeks",
                            "14 Weeks",
                            "5-22 Months",
                            "1-5 Years",
                            "9-14 Years",
                            "12 Year",
                            "15 Years",
                            "Above 18 Year",
                        ],
                    },
                },
            };
            // this.options.xaxis = {
            //     categories: [
            //         "Birth",
            //         "6 Weeks",
            //         "10 Weeks",
            //         "14 Weeks",
            //         "5-22 Months",
            //         "1-5 Years",
            //         "9-14 Years",
            //         "12 Year",
            //         "15 Years",
            //         "Above 18 Year",
            //     ],
            // };
            // this.series[0].data = ["10", "20", "50", "60", "90", "109", "20", "10", "50", "15"];
            // this.series[0].name = "Total";
        },
        setListData(data: any) {
            this.list = [];
            this.list.push({
                actionBtn: false,
                class: "col_background",
                header: true,
                minHeight: "--min-height: 25px;",
                display: ["Date", "Measure"],
            });
            data.forEach((item: any) => {
                this.list.push({
                    actionBtn: false,
                    minHeight: "--min-height: 25px;",
                    class: "col_background",
                    display: [HisDate.toStandardHisFormat(item.obs_datetime), item.value_numeric],
                });
            });
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
    min-width: 160px;
}
.graphBtn {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #ddeedd;
    border-radius: 4px;
    padding: 4px;
    min-width: 60px;
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
.immunizationGraph {
    /* Rectangle 20 */

    background: #ffffff;
    border-radius: 8px;
    height: 90vw;
}
.immunizationGraphText {
    padding-left: 10px;
    padding-top: 10px;
}
</style>
