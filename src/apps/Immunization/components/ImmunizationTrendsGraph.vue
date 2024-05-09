<template>
    <div class="modal_wrapper">
        <div class="immunizationGraph">
            <ApexChart ref="chart" width="360" height="260" type="bar" :options="chatOptions" :series="series"></ApexChart>
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
import { ObservationService } from "@/services/observation_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";

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
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    data() {
        return {
            valueNumericArray: [] as any,
            obsDatetime: [] as any,
            weight: [] as any,
            height: [] as any,
            dates: ["Jan", "Feb", "Mach", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "oct", "Nov", "Dec"] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            list: [] as any,
            chatOptions: {
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
                    categories: ["Jan", "Feb", "Mach", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "oct", "Nov", "Dec"],
                },
            } as any,
            series: [
                {
                    name: "Total",
                    data: [] as any,
                },
            ],
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    chatOptions: {
        handler() {
            this.setData();
        },
        deep: true,
    },
    async mounted() {
        this.setData();
        this.iconBg.graph = "iconBg";
    },
    methods: {
        setData() {
            this.series[0].data = ["10", "20", "50", "60", "90", "109", "20", "10", "50", "150", "90", "40"];
            this.series[0].name = "Total";
            this.chatOptions.xaxis = {
                categories: ["Jan", "Feb", "Mach", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "oct", "Nov", "Dec"],
            };
            // {
            //     ...this.chatOptions,
            //     ...{
            //         xaxis: {
            //             categories: ["Jan", "Feb", "Mach", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "oct", "Nov", "Dec"],
            //         },
            //     },
            // };
            // this.$refs.chart;
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
