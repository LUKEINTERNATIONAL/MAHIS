<template>
    <div class="immunizationGraph">
        <div class="graphHeader">
            <div class="immunizationGraphText">Weight-for-Age</div>
            <div class="zScore">Weight Z-Score: <b>2.2</b></div>
        </div>
        <div>
            <canvas height="200" id="myChart"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import { ObservationService } from "@/services/observation_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { iconGraph, iconList } from "@/utils/SvgDynamicColor";
import Chart from "chart.js/auto";

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
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    async mounted() {
        const ctx: any = document.getElementById("myChart");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["0", "1", "2", "3", "4", "5"],
                datasets: [
                    {
                        label: "top",
                        data: [5, 13, 17, 21, 25, 29],
                        borderWidth: 1.5,
                        fill: 1,
                        backgroundColor: "rgba(253, 255, 140, 0.7)",
                        borderColor: "rgba(181, 71, 8, 0.8)",
                        tension: 0.4,
                    },

                    {
                        label: "z-score",
                        data: [4, 11.5, 15, 18, 21.5, 25],
                        borderWidth: 1,
                        borderColor: "#85c786",
                        tension: 0.4,
                    },
                    {
                        label: "z-score",
                        data: [3, 9, 11.5, 14, 16, 18],
                        borderWidth: 1.5,
                        borderColor: "#4A4A4A",
                        tension: 0.4,
                    },
                    {
                        label: "z-score",
                        data: [2.2, 7, 9, 10.9, 12.5, 13.8],
                        borderWidth: 1,
                        fill: 1,
                        backgroundColor: "rgba(150, 220, 166, 0.7)",
                        borderColor: "#85c786",
                        tension: 0.4,
                    },
                    {
                        label: "bottom",
                        data: [2, 6, 8, 9.8, 11, 12],
                        borderWidth: 1.5,
                        fill: 1,
                        backgroundColor: "rgba(253, 255, 140, 0.7)",
                        borderColor: "rgba(222, 129, 7, 0.8)",
                        tension: 0.2,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            align: "center",
                            text: "Weight",
                            color: "#979998",
                            font: {
                                size: 14,
                            },
                        },
                        grace: "5%",
                        ticks: {
                            stepSize: 3,
                        },
                    },
                    // percentage: {
                    //     beginAtZero: true,
                    //     position: "right",
                    //     grid: {
                    //         drawOnChartArea: false,
                    //     },
                    // },
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            align: "center",
                            text: "Age",
                            color: "#979998",
                            font: {
                                size: 14,
                            },
                        },
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    },
    methods: {},
});
</script>

<style scoped>
.immunizationGraph {
    /* Rectangle 20 */

    background: #ffffff;
    border-radius: 5px;
    margin: 10px;
}
.immunizationGraphText {
    padding-left: 10px;
    padding-top: 10px;
    font-weight: 600;
}
.zScore {
    justify-content: center;
    align-items: center;
    padding: 8px;

    gap: 5px;
    background: #ddeedd;
    border-radius: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #636363;
    display: flex;
    height: 22px;
    margin-top: 8px;
}
.graphHeader {
    display: flex;
    justify-content: space-between;
}
</style>
