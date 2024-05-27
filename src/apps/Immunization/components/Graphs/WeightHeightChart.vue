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
        this.buildGraph();
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
            this.buildGraph();
        },
        async setValues() {
            this.currentHeight = await ObservationService.getFirstObsValue(this.demographics.patient_id, "Height", "value_numeric");
            this.currentWeight = await ObservationService.getFirstObsValue(this.demographics.patient_id, "weight", "value_numeric");
        },
        async displayWeightGraph() {
            this.dataset = [
                {
                    label: "top",
                    data: [5, 13, 17, 21, 25, 29],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(181, 71, 8, 0.8)",
                    tension: 0.4,
                    order: 2,
                },

                {
                    label: "z-score",
                    data: [4, 11.5, 15, 18, 21.5, 25],
                    borderWidth: 1,
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 3,
                },
                {
                    label: "z-score",
                    data: [3, 9, 11.5, 14, 16, 18],
                    borderWidth: 1.5,
                    borderColor: "#4A4A4A",
                    tension: 0.4,
                    order: 4,
                },
                {
                    label: "z-score",
                    data: [2.2, 7, 9, 10.9, 12.5, 13.8],
                    borderWidth: 1,
                    fill: 1,
                    backgroundColor: "rgba(150, 220, 166, 0.7)",
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 5,
                },
                {
                    label: "bottom",
                    data: [2, 6, 8, 9.8, 11, 12],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(222, 129, 7, 0.8)",
                    tension: 0.2,
                    order: 6,
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
            this.weight = await ObservationService.getAll(this.demographics.patient_id, "weight");
            this.valueNumericArray = this.weight.map((item: any) => {
                return { x: HisDate.getAgeInFloatYears(this.demographics?.birthdate, item.obs_datetime), y: item.value_numeric };
            });
            await this.calculateWeightZScore();
        },
        async displayHeightGraph() {
            this.dataset = [
                {
                    label: "top",
                    data: [5, 13, 17, 21, 25, 29],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(181, 71, 8, 0.8)",
                    tension: 0.4,
                    order: 2,
                },

                {
                    label: "z-score",
                    data: [4, 11.5, 15, 18, 21.5, 25],
                    borderWidth: 1,
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 3,
                },
                {
                    label: "z-score",
                    data: [3, 9, 11.5, 14, 16, 18],
                    borderWidth: 1.5,
                    borderColor: "#4A4A4A",
                    tension: 0.4,
                    order: 4,
                },
                {
                    label: "z-score",
                    data: [2.2, 7, 9, 10.9, 12.5, 13.8],
                    borderWidth: 1,
                    fill: 1,
                    backgroundColor: "rgba(150, 220, 166, 0.7)",
                    borderColor: "#85c786",
                    tension: 0.4,
                    order: 5,
                },
                {
                    label: "bottom",
                    data: [2, 6, 8, 9.8, 11, 12],
                    borderWidth: 1.5,
                    fill: 1,
                    backgroundColor: "rgba(253, 255, 140, 0.7)",
                    borderColor: "rgba(222, 129, 7, 0.8)",
                    tension: 0.2,
                    order: 6,
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
            this.height = await ObservationService.getAll(this.demographics.patient_id, "Height");
            this.valueNumericArray = this.height.map((item: any) => {
                return { x: HisDate.getAgeInFloatYears(this.demographics?.birthdate, item.obs_datetime), y: item.value_numeric };
            });
            await this.calculateHeightZScore();
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
            } else if (gender === "F") {
                this.graphTitle = "Height-for-Age-Girls";
                params = HeightForAgeGirls[ageInDays];
            } else {
                throw new Error("Invalid gender");
            }
            this.zScoreName = "Height Z-Score:";
            this.calculateZScore(this.currentHeight, params);
        },
        async calculateWeightZScore() {
            this.setValues();
            const obs_datetime = await ObservationService.getFirstObsValue(this.demographics.patient_id, "weight", "obs_datetime");
            const ageInDays = HisDate.dateDiffInDays(obs_datetime, this.demographics?.birthdate);
            const gender = this.demographics.gender;
            this.YTitle = "Weight";
            let params;
            if (gender === "M") {
                this.graphTitle = "Weight-for-Age-Boy";
                params = WeightForAgeBoys[ageInDays];
            } else if (gender === "F") {
                this.graphTitle = "Weight-for-Age-Girl";
                params = WeightForAgeGirls[ageInDays];
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
        buildGraph() {
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
                                stepSize: 3,
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
    justify-content: space-between;
    margin-top: 8px;
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
