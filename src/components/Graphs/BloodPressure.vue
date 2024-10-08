<template>
    <div class="modal_wrapper">
        <ion-row>
            <ion-col size="4.5">
                <div>Blood Pressure Graph</div>
            </ion-col>
        </ion-row>
        <div>
            <ApexChart width="100%" height="390px" type="area" :options="options" :series="series" v-if="displayGraph" />
            <list :listData="list" v-else></list>
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
            systolic: [] as any,
            diastolic: [] as any,
            BMI: [] as any,
            iconBg: {} as any,
            activeWeight: [] as any,
            activeHeight: [] as any,
            activeBMI: [] as any,
            list: [] as any,
            options: {
                chart: {
                    id: "vuechart-example",
                    type: "line",
                },
                stroke: {
                    curve: "straight",
                    width: 3, // Set the width of the line
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    textAnchor: "middle",
                    distributed: false,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        fontSize: "10px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: "bold",
                        colors: undefined,
                    },
                    background: {
                        enabled: true,
                        foreColor: "#fff",
                        padding: 5,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "#fff",
                        opacity: 0.9,
                        dropShadow: {
                            enabled: false,
                            top: 1,
                            left: 1,
                            blur: 1,
                            color: "#000",
                            opacity: 0.45,
                        },
                    },
                    dropShadow: {
                        enabled: false,
                        top: 1,
                        left: 1,
                        blur: 1,
                        color: "#000",
                        opacity: 0.45,
                    },
                },
                colors: ["#FF1654", "#247BA0"],
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
        dismiss() {
            modalController.dismiss();
        },
        handleIcon() {},
        async updateData() {
            this.systolic = await ObservationService.getAll(this.demographics.patient_id, "Systolic");
            this.diastolic = await ObservationService.getAll(this.demographics.patient_id, "Diastolic");
            this.setData();
        },
        setData() {
            this.series[0].data = this.diastolic?.map((item: any) => item.value_numeric);
            this.series[0].name = "Diastolic";
            this.series[1].data = this.systolic?.map((item: any) => item.value_numeric);
            this.series[1].name = "Systolic";
            this.obsDatetime = this.diastolic?.map((item: any) => HisDate.toStandardHisFormat(item.obs_datetime));
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
</style>
