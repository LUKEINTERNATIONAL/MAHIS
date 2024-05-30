<template>
    <div class="graphBtn">
        <div class="weightHeightGraphBtns">
            <div>
                <ion-button class="btnText" size="small" :fill="weightBtnProperty.fill" @click="changeGraph('weight')">
                    Weight/Age Graph <ion-icon slot="end" size="small" :icon="weightBtnProperty.icon"></ion-icon>
                </ion-button>
            </div>
            <div>
                <ion-button class="btnText" size="small" :fill="heightBtnProperty.fill" @click="changeGraph('height')">
                    Height/Age Graph
                    <ion-icon slot="end" size="small" :icon="heightBtnProperty.icon"></ion-icon>
                </ion-button>
            </div>
        </div>
    </div>
    <div class="immunizationGraph">
        <div class="graphHeader">
            <div class="immunizationGraphText">{{ graphTitle }}</div>
            <div class="zScore">
                {{ zScoreName }} <b>{{ zScoreValue }}</b>
            </div>
        </div>
        <div>
            <canvas height="200" id="myChart"></canvas>
        </div>
    </div>
    <div class="graphBtn">
        <div class="weightHeightGraphBtns">
            <div>
                <span class="warningText">
                    Current Height: <b>{{ currentHeight }} Cm </b>
                </span>
            </div>
            <div>
                <span class="successText">
                    Current Weight: <b>{{ currentWeight }} Kg</b>
                </span>
            </div>
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
import HeightForAgeBoys from "@/Data/HeightForAgeBoys";
import WeightForAgeBoys from "@/Data/WeightForAgeBoys";
import WeightForAgeGirls from "@/Data/WeightForAgeGirls";
import HeightForAgeGirls from "@/Data/HeightForAgeGirls";
import { useWeightHeightVitalsStore } from "@/apps/Immunization/stores/VitalsStore";

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
        ...mapState(useWeightHeightVitalsStore, ["vitalsWeightHeight"]),
    },
    watch: {
        demographics: {
            handler() {
                this.buildGraph();
            },
            deep: true,
        },
        vitalsWeightHeight: {
            handler() {
                if (this.vitalsWeightHeight[0].validationStatus == "success") {
                    this.changeGraph("weight");
                }
            },
            deep: true,
        },
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
            currentWeight: "" as any,
            currentHeight: "" as any,
            BMI: [] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            list: [] as any,
            zScoreValue: "" as any,
            zScoreName: "" as any,
            graphTitle: "" as any,
            stepSize: "" as any,
            iconsContent: icons,
            heightBtnProperty: { fill: "outline", icon: icons.networkBarDark } as any,
            weightBtnProperty: { fill: "solid", icon: icons.networkBarLight } as any,
            YTitle: "" as any,
            chart: null as any,
            dataset: [] as any,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    async mounted() {
        await this.displayWeightGraph();
        await this.buildGraph();
    },
    methods: {
        async changeGraph(name: any) {
            if (name == "weight") {
                this.heightBtnProperty = { fill: "outline", icon: icons.networkBarDark };
                this.weightBtnProperty = { fill: "solid", icon: icons.networkBarLight };
                await this.displayWeightGraph();
            } else {
                this.weightBtnProperty = { fill: "outline", icon: icons.networkBarDark };
                this.heightBtnProperty = { fill: "solid", icon: icons.networkBarLight };
                await this.displayHeightGraph();
            }
            await this.buildGraph();
        },
        async setValues() {
            this.dataset = [];
            this.currentHeight = await ObservationService.getFirstObsValue(this.demographics.patient_id, "Height", "value_numeric");
            this.currentWeight = await ObservationService.getFirstObsValue(this.demographics.patient_id, "weight", "value_numeric");
        },
        async displayWeightGraph() {
            this.weight = await ObservationService.getAll(this.demographics.patient_id, "weight");
            this.stepSize = 3;
            if (this.weight) {
                this.valueNumericArray = this.weight?.map((item: any) => {
                    return { x: HisDate.getAgeInFloatYears(this.demographics?.birthdate, item.obs_datetime), y: item.value_numeric };
                });
                await this.calculateWeightZScore();
            }
        },
        async displayHeightGraph() {
            this.height = await ObservationService.getAll(this.demographics.patient_id, "Height");
            this.stepSize = 5;
            if (this.height) {
                this.valueNumericArray = this.height.map((item: any) => {
                    return { x: HisDate.getAgeInFloatYears(this.demographics?.birthdate, item.obs_datetime), y: item.value_numeric };
                });
                await this.calculateHeightZScore();
            }
        },
        async calculateHeightZScore() {
            this.setValues();
            const obs_datetime = await ObservationService.getFirstObsValue(this.demographics.patient_id, "Height", "obs_datetime");
            const ageInDays = HisDate.dateDiffInDays(obs_datetime, this.demographics?.birthdate);
            const gender = this.demographics.gender;
            this.YTitle = "Height";
            let params;
            if (gender === "M") {
                this.graphTitle = "Height-for-Age-Boy";
                params = HeightForAgeBoys[ageInDays];
                this.datasetHeightAgeBoy();
            } else if (gender === "F") {
                this.graphTitle = "Height-for-Age-Girls";
                params = HeightForAgeGirls[ageInDays];
                this.datasetHeightAgeGirl();
            } else {
                throw new Error("Invalid gender");
            }
            this.zScoreName = "Height Z-Score:";
            this.calculateZScore(this.currentHeight, params);
        },
        async calculateWeightZScore() {
            await this.setValues();
            const obs_datetime = await ObservationService.getFirstObsValue(this.demographics.patient_id, "weight", "obs_datetime");
            const ageInDays = HisDate.dateDiffInDays(obs_datetime, this.demographics?.birthdate);
            const gender = this.demographics.gender;
            this.YTitle = "Weight";
            let params;
            if (gender === "M") {
                this.graphTitle = "Weight-for-Age-Boy";
                params = WeightForAgeBoys[ageInDays];
                this.datasetWeightAgeBoy();
            } else if (gender === "F") {
                this.graphTitle = "Weight-for-Age-Girl";
                params = WeightForAgeGirls[ageInDays];
                this.datasetWeightAgeGirl();
            } else {
                throw new Error("Invalid gender");
            }
            this.zScoreName = "Weight Z-Score:";
            this.calculateZScore(this.currentWeight, params);
        },
        calculateZScore(value: any, obj: any) {
            let zScore = (Math.pow(value / obj.M, obj.L) - 1) / (obj.L * obj.S);
            this.zScoreValue = Math.round(zScore * 10) / 10;
        },
        async buildGraph() {
            this.vitalsWeightHeight[0].validationStatus = "";
            console.log("🚀 ~ buildGraph ~ this.vitalsWeightHeight[0].validationStatus:", this.vitalsWeightHeight[0].validationStatus);
            const ctx: any = document.getElementById("myChart");
            if (this.chart) {
                this.chart.destroy();
            }
            this.chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["0", "1", "2", "3", "4", "5"],
                    datasets: this.dataset,
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                align: "center",
                                text: this.YTitle,
                                color: "#979998",
                                font: {
                                    size: 14,
                                },
                            },
                            grace: "5%",
                            ticks: {
                                stepSize: this.stepSize,
                            },
                        },
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
        datasetWeightAgeBoy() {
            this.dataset = [
                {
                    label: "top",
                    data: [4.9, 13.1, 17, 21, 25.1, 29.5],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(181, 71, 8, 0.8)",
                    tension: 0.4,
                    order: 2,
                },

                {
                    label: "z-score",
                    data: [4.1, 11.5, 14.9, 18.1, 21.5, 25],
                    borderWidth: 1,
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 3,
                },
                {
                    label: "z-score",
                    data: [3.1, 9, 11.5, 13.9, 16, 18.1],
                    borderWidth: 1.5,
                    borderColor: "#4A4A4A",
                    tension: 0.4,
                    order: 4,
                },
                {
                    label: "z-score",
                    data: [2.2, 7, 9, 10.9, 12.1, 13.8],
                    borderWidth: 1,
                    fill: 1,
                    backgroundColor: "rgba(150, 220, 166, 0.7)",
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 5,
                },
                {
                    label: "bottom",
                    data: [2, 6.1, 8, 9.8, 10.9, 11.1, 12],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(222, 129, 7, 0.8)",
                    tension: 0.2,
                    order: 6,
                },
                {
                    label: "Value",
                    data: this.valueNumericArray,
                    borderWidth: 2,
                    borderColor: "#000",
                    pointRadius: 3, // Add dots on the intersections
                    pointBackgroundColor: "#000",
                    parsing: false,
                    order: 1,
                },
            ];
        },
        datasetHeightAgeBoy() {
            this.dataset = [
                {
                    label: "top",
                    data: [
                        { x: 0, y: 55.09 },
                        { x: 1, y: 83 },
                        { x: 2, y: 97 },
                        { x: 2, y: 96.1 },
                        { x: 3, y: 107 },
                        { x: 4, y: 116 },
                        { x: 5, y: 124 },
                    ],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(181, 71, 8, 0.8)",
                    tension: 0.4,
                    order: 2,
                    parsing: false,
                },

                {
                    label: "z-score",
                    data: [
                        { x: 0, y: 53.9 },
                        { x: 1, y: 80.01 },
                        { x: 2, y: 94 },
                        { x: 2, y: 93.1 },
                        { x: 3, y: 103.1 },
                        { x: 4, y: 111.9 },
                        { x: 5, y: 119 },
                    ],
                    borderWidth: 1,
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 3,
                    parsing: false,
                },
                {
                    label: "z-score",
                    data: [
                        { x: 0, y: 50 },
                        { x: 1, y: 75.9 },
                        { x: 2, y: 88 },
                        { x: 2, y: 87 },
                        { x: 3, y: 96 },
                        { x: 4, y: 103.1 },
                        { x: 5, y: 110 },
                    ],
                    borderWidth: 1.5,
                    borderColor: "#4A4A4A",
                    tension: 0.4,
                    order: 4,
                    parsing: false,
                },
                {
                    label: "z-score",
                    data: [
                        { x: 0, y: 46 },
                        { x: 1, y: 71 },
                        { x: 2, y: 82 },
                        { x: 2, y: 81 },
                        { x: 3, y: 88.9 },
                        { x: 4, y: 95 },
                        { x: 5, y: 101 },
                    ],
                    borderWidth: 1,
                    fill: 1,
                    backgroundColor: "rgba(150, 220, 166, 0.7)",
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 5,
                    parsing: false,
                },
                {
                    label: "bottom",
                    data: [
                        { x: 0, y: 44.9 },
                        { x: 1, y: 68.1 },
                        { x: 2, y: 79 },
                        { x: 2, y: 78 },
                        { x: 3, y: 85 },
                        { x: 4, y: 91 },
                        { x: 5, y: 96 },
                    ],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(222, 129, 7, 0.8)",
                    tension: 0.2,
                    order: 6,
                    parsing: false,
                },
                {
                    label: "bottom2",
                    data: this.valueNumericArray,
                    borderWidth: 2,
                    borderColor: "#000",
                    pointRadius: 3, // Add dots on the intersections
                    pointBackgroundColor: "#000",
                    parsing: false,
                    order: 1,
                },
            ];
        },
        datasetWeightAgeGirl() {
            this.dataset = [
                {
                    label: "top",
                    data: [4.9, 13, 17, 21, 25.1, 29.5],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(181, 71, 8, 0.8)",
                    tension: 0.4,
                    order: 2,
                },

                {
                    label: "z-score",
                    data: [4.5, 12, 15.1, 18.1, 21.05, 24.05],
                    borderWidth: 1,
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 3,
                },
                {
                    label: "z-score",
                    data: [3.5, 9.8, 12.05, 14.2, 16.2, 18.1],
                    borderWidth: 1.5,
                    borderColor: "#4A4A4A",
                    tension: 0.4,
                    order: 4,
                },
                {
                    label: "z-score",
                    data: [2.5, 7.9, 9.8, 11.2, 12.9, 14],
                    borderWidth: 1,
                    fill: 1,
                    backgroundColor: "rgba(150, 220, 166, 0.7)",
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 5,
                },
                {
                    label: "bottom",
                    data: [2, 7, 8, 8.8, 10, 11.1, 12.2],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(222, 129, 7, 0.8)",
                    tension: 0.2,
                    order: 6,
                },
                {
                    label: "Value",
                    data: this.valueNumericArray,
                    borderWidth: 2,
                    borderColor: "#000",
                    pointRadius: 3, // Add dots on the intersections
                    pointBackgroundColor: "#000",
                    parsing: false,
                    order: 1,
                },
            ];
        },
        datasetHeightAgeGirl() {
            this.dataset = [
                {
                    label: "top",
                    data: [
                        { x: 0, y: 55 },
                        { x: 1, y: 82 },
                        { x: 2, y: 96 },
                        { x: 2, y: 95.5 },
                        { x: 3, y: 106.1 },
                        { x: 4, y: 116 },
                        { x: 5, y: 123.9 },
                    ],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(181, 71, 8, 0.8)",
                    tension: 0.4,
                    order: 2,
                    parsing: false,
                },

                {
                    label: "z-score",
                    data: [
                        { x: 0, y: 53 },
                        { x: 1, y: 79 },
                        { x: 2, y: 93 },
                        { x: 2, y: 92.5 },
                        { x: 3, y: 103 },
                        { x: 4, y: 111 },
                        { x: 5, y: 118 },
                    ],
                    borderWidth: 1,
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 3,
                    parsing: false,
                },
                {
                    label: "z-score",
                    data: [
                        { x: 0, y: 49 },
                        { x: 1, y: 74 },
                        { x: 2, y: 86 },
                        { x: 2, y: 85.5 },
                        { x: 3, y: 95 },
                        { x: 4, y: 103 },
                        { x: 5, y: 109.1 },
                    ],
                    borderWidth: 1.5,
                    borderColor: "#4A4A4A",
                    tension: 0.4,
                    order: 4,
                    parsing: false,
                },
                {
                    label: "z-score",
                    data: [
                        { x: 0, y: 45 },
                        { x: 1, y: 69 },
                        { x: 2, y: 80 },
                        { x: 2, y: 79.5 },
                        { x: 3, y: 87.1 },
                        { x: 4, y: 94 },
                        { x: 5, y: 100 },
                    ],
                    borderWidth: 1,
                    fill: 1,
                    backgroundColor: "rgba(150, 220, 166, 0.7)",
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 5,
                    parsing: false,
                },
                {
                    label: "bottom",
                    data: [
                        { x: 0, y: 43.9 },
                        { x: 1, y: 66 },
                        { x: 2, y: 77 },
                        { x: 2, y: 76.5 },
                        { x: 3, y: 84 },
                        { x: 4, y: 90 },
                        { x: 5, y: 95 },
                    ],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(222, 129, 7, 0.8)",
                    tension: 0.2,
                    order: 6,
                    parsing: false,
                },
                {
                    label: "bottom2",
                    data: this.valueNumericArray,
                    borderWidth: 2,
                    borderColor: "#000",
                    pointRadius: 3, // Add dots on the intersections
                    pointBackgroundColor: "#000",
                    parsing: false,
                    order: 1,
                },
            ];
        },
    },
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
.graphBtn {
    display: flex;
    justify-content: center;
}
.weightHeightGraphBtns {
    display: flex;
    justify-content: space-around;
    margin-top: 8px;
    width: 100%;
    max-width: 500px;
}
.warningText {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    gap: 1px;
    background: #fedf89;
    border-radius: 4px;
    font-size: 13px;
    margin-right: 10px;
    color: #636363;
}
.successText {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    gap: 1px;
    background: #ddeedd;
    border-radius: 4px;
    font-size: 13px;
    color: #636363;
}
</style>
