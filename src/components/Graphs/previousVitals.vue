<template>
    <div class="modal_wrapper">
        <div style="width: 100%; display: flex; justify-content: space-between; padding: 10px">
            <div style="width: 160px">
                <div class="diplay_space_between bmi_blood">
                    <div style="cursor: pointer" :class="activeHeight" @click="setHeight()">Height</div>
                    <div style="cursor: pointer" :class="activeWeight" @click="setWeight()">Weight</div>
                    <div style="cursor: pointer" :class="activeBMI" @click="setBMI()">BMI</div>
                </div>
            </div>
            <div>
                <div class="diplay_space_between">
                    <ion-icon
                        style="font-size: x-large; cursor: pointer"
                        :class="iconBg.graph"
                        :icon="graphIcon"
                        @click="toggleDisplay()"
                        v-if="displayGraph"
                    ></ion-icon>
                    <ion-icon
                        v-else
                        style="font-size: x-large; cursor: pointer"
                        :class="iconBg.list"
                        :icon="listIcon"
                        @click="toggleDisplay()"
                    ></ion-icon>
                </div>
            </div>
        </div>
        <div>
            <ApexChart width="100%" height="390px" type="area" :options="options" :series="series" v-if="displayGraph" />
            <list :listData="list" @clicked:void="openVoidPopover($event)" v-else></list>
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
            ],
        };
    },
    watch: {
        demographics: {
            async handler() {
                await this.updateData();
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    async mounted() {
        await this.updateData();
        this.iconBg.graph = "iconBg";
    },
    methods: {
        async openVoidPopover(data: any) {
            await ObservationService.voidObs(data.id.weightObsId);
            await ObservationService.voidObs(data.id.heightObsId);
        },
        processObservations() {
            let result: any = [];
            let weightData = this.weight.filter((item: any) => item.concept.concept_id === 5089);
            let heightData = this.height.filter((item: any) => item.concept.concept_id === 5090);

            // Combine all unique observation datetimes
            let allDates = new Set([...weightData.map((w: any) => w.obs_datetime), ...heightData.map((h: any) => h.obs_datetime)]);

            // Process each unique datetime
            allDates.forEach((datetime) => {
                let weightObs = weightData.find((w: any) => w.obs_datetime === datetime);
                let heightObs = heightData.find((h: any) => h.obs_datetime === datetime);

                result.push({
                    ids: { weightObsId: weightObs.obs_id, heightObsId: heightObs.obs_id },
                    obs_datetime: datetime,
                    weight: weightObs ? weightObs.value_numeric : null,
                    height: heightObs ? heightObs.value_numeric : null,
                });
            });

            // Sort by obs_datetime
            // result.sort((a: any, b: any) => new Date(a.obs_datetime) - new Date(b.obs_datetime));

            return result;
        },
        async updateData() {
            this.weight = await ObservationService.getAll(this.demographics.patient_id, "weight");
            this.height = await ObservationService.getAll(this.demographics.patient_id, "Height");
            this.setListData(this.processObservations());
            this.setHeight();
        },
        dismiss() {
            modalController.dismiss();
        },
        handleIcon() {},
        toggleDisplay() {
            this.displayGraph = !this.displayGraph;
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
        setWeight() {
            if (this.weight) {
                this.setData(this.weight, "weight");
            }
        },
        setHeight() {
            if (this.height) {
                this.setData(this.height, "height");
            }
        },
        setBMI() {
            if (this.BMI) {
                this.setData(this.BMI, "BMI");
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
        setData(data: any, active: any) {
            this.setActivClass(active);
            this.valueNumericArray = data.map((item: any) => item.value_numeric);
            this.obsDatetime = data.map((item: any) => HisDate.toStandardHisFormat(item.obs_datetime));
            this.series[0].data = this.valueNumericArray;
            this.series[0].name = active;
            this.options = {
                ...this.options,
                ...{
                    xaxis: {
                        categories: this.obsDatetime,
                    },
                },
            };
        },
        setListData(data: any) {
            this.list = [];
            this.list.push({
                containSize: 2.6,
                actionBtn: false,
                class: "col_background display_center",
                header: true,
                minHeight: "--min-height: 25px;",
                display: ["Date", "Height(cm)", "Weight(kg)", "Action"],
            });
            data.forEach((item: any) => {
                this.list.push({
                    id: item.ids,
                    actionBtn: true,
                    minHeight: "--min-height: 25px;",
                    class: "col_background",
                    display: [HisDate.toStandardHisDisplayFormat(item.obs_datetime), item.height, item.weight],
                    btn: ["void"],
                    name: `height: ${item.height} and weight: ${item.weight} captured on ${HisDate.toStandardHisDisplayFormat(item.obs_datetime)} `,
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
</style>
