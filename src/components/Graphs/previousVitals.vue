<template>
    <div class="modal_wrapper">
        <ListHeightWeight
            @click:height="setHeight()"
            @click:weight="setWeight()"
            @click:toggleDisplay="toggleDisplays()"
            @click:void="openVoidPopover($event)"
            :propsContent="propsContent"
        />
        <div v-if="displayGraph">
            <ApexChart width="100%" height="390px" type="area" :options="options" :series="series" />
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
import ListHeightWeight from "@/views/Mixin/ListHeightWeight.vue";

export default defineComponent({
    mixins: [ListHeightWeight],
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
        ListHeightWeight,
    },

    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    data() {
        return {
            valueNumericArray: [] as any,
            propsContent: {
                activeWeight: [] as any,
                activeHeight: [] as any,
                graphIcon: iconGraph(["#006401"]),
                listIcon: iconList(["#636363"]),
                displayGraph: true,
                iconBg: {} as any,
                weight: [] as any,
                height: [] as any,
                list: [] as any,
            } as any,
            obsDatetime: [] as any,
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
    async mounted() {
        await this.updateData();
        this.setWeight();
        this.iconBg.graph = "iconBg";
    },
    watch: {
        patient: {
            async handler() {
                await this.updateData();
            },
            deep: true,
        },
        vitalsWeightHeight: {
            async handler() {
                if (this.vitalsWeightHeight[0].validationStatus == "success") {
                    await this.updateData();
                }
            },
            deep: true,
        },
        list: {
            async handler() {
                this.propsContent.list = this.list;
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        dismiss() {
            modalController.dismiss();
        },
        handleIcon() {},
        toggleDisplays() {
            this.toggleDisplay();
            this.propsContent.displayGraph = this.displayGraph;
            this.propsContent.graphIcon = this.graphIcon;
            this.propsContent.listIcon = this.listIcon;
            this.propsContent.iconBg.graph = this.iconBg.graph;
            this.propsContent.iconBg.graph = this.iconBg.graph;
        },
        async setWeight() {
            this.propsContent.list = this.list;
            if (this.weight) {
                await this.setData(this.weight, "weight");
            }
        },
        async setHeight() {
            if (this.height) {
                await this.setData(this.height, "height");
            }
        },
        setActive(active: any) {
            this.setActiveClass(active);
            this.propsContent.activeWeight = this.activeWeight;
            this.propsContent.activeHeight = this.activeHeight;
        },
        async setData(data: any, active: any) {
            this.setActive(active);
            this.propsContent.weight = this.weight;
            this.propsContent.height = this.height;
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
    min-width: 150px;
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
