<template>
    <div class="modal_wrapper">
        <div class="immunizationGraph">
            <div class="immunizationGraphText">Immunization Graphs</div>
            <ApexChart width="100%" height="252" type="bar" :options="options" :series="series"></ApexChart>
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
                    id: "immunization",
                },
                fill: {
                    colors: ["#016302"], // Using the initial color from the gradient
                    type: "gradient",
                    gradient: {
                        type: "vertical",
                        shadeIntensity: 0.1,
                        opacityFrom: 0.9,
                        opacityTo: 0.6,
                        stops: [0, 80, 0], // Adjusted stops to make the top darker
                    },
                },
                stroke: {
                    curve: "straight",
                    colors: ["#006401"], // Specify the color you want for the line on top of the area
                    width: 1, // Set the width of the line
                },
                dataLabels: {
                    enabled: false,
                },
                yaxis: {
                    min: 0,
                    forceNiceScale: true,
                },
                xaxis: {
                    categories: [],
                },
            } as any,
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
            this.series[0].data = ["10", "20", "50", "60", "90", "109", "20", "10", "50", "150", "90", "40"];
            this.series[0].name = "Total";
            this.options = {
                ...this.options,
                ...{
                    xaxis: {
                        categories: ["Jan", "Feb", "Mach", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "oct", "Nov", "Dec"],
                    },
                },
            };
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
}
.immunizationGraphText {
    padding-left: 10px;
    padding-top: 10px;
}
</style>
