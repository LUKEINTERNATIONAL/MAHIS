<template>
    <div class="cards-container">
        <ion-card class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ appointments.length }}</div>
                    <h3 class="text-sm font-medium">Today's Appointments</h3>
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ 0 }}</div>
                    <h3 class="text-sm font-medium">Defaulters</h3>
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ dashboardData?.total_complications }}</div>
                    <h3 class="text-sm font-medium">Complications</h3>
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ dashboardData?.total_client_registered }}</div>
                    <h3 class="text-sm font-medium">Total active patients</h3>
                </div>
            </ion-card-content>
        </ion-card>
    </div>
    <div class="charts" style="gap: 20px; margin-top: 20px; padding-left: 20px; padding-right: 20px">
        <ion-card style="margin-bottom: 20px; background-color: #fff; width: 100%" class="top-card">
            <ion-card-content>
                <div class="font-medium">Quarterly Case Distribution</div>
                <div ref="chartRef1">
                    <ApexChart
                        v-if="isChartReady"
                        style="width: 100%; height: 500px"
                        type="bar"
                        :options="barChartOptions"
                        :series="barChartSeries"
                    />
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card style="margin-bottom: 20px; background-color: #fff; width: 100%" class="top-card">
            <ion-card-content>
                <div class="font-medium">Patients by gender</div>
                <div ref="chartRef2">
                    <ApexChart
                        v-if="isChartReady"
                        style="width: 100%; height: 500px"
                        type="line"
                        :options="lineChartOptions"
                        :series="lineChartSeries"
                    />
                </div>
            </ion-card-content>
        </ion-card>
    </div>
</template>

<script lang="ts">
import ApexChart from "vue3-apexcharts";
import { nextTick } from "vue";
import DashboardMixin from "@/views/Mixin/DashboardMixin.vue";
import { defineComponent } from "vue";
import { Service } from "@/services/service";
import HisDate from "@/utils/Date";
import calculateAge from "@/utils/Date";
export default defineComponent({
    name: "NCDDashboard",
    mixins: [DashboardMixin],
    components: {
        ApexChart,
    },
    data() {
        return {
            dashboardData: "" as any,
            isChartReady: false,
            lineChartOptions: {
                chart: {
                    height: 350,
                    type: "line",
                    toolbar: {
                        show: false,
                    },
                },
                stroke: {
                    curve: "smooth",
                    width: 2,
                },
                xaxis: {
                    categories: [],
                },
                colors: ["#2563eb", "#10b981"],
                grid: {
                    borderColor: "#f3f4f6",
                    row: {
                        colors: ["transparent", "transparent"],
                        opacity: 0.5,
                    },
                },
                tooltip: {
                    theme: "light",
                },
                legend: {
                    show: true,
                    position: "top",
                },
            },
            lineChartSeries: [
                {
                    name: "Male",
                    data: [],
                },
                {
                    name: "Female",
                    data: [],
                },
            ],
            barChartOptions: {
                chart: {
                    height: 350,
                    type: "bar",
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: false,
                    },
                },
                xaxis: {
                    categories: [],
                },
                colors: ["#2563eb", "#10b981", "#f43f5e"],
                grid: {
                    borderColor: "#f3f4f6",
                    row: {
                        colors: ["transparent", "transparent"],
                        opacity: 0.5,
                    },
                },
                tooltip: {
                    theme: "light",
                },
                legend: {
                    show: true,
                    position: "top",
                },
            },
            barChartSeries: [
                {
                    name: "Type 1 Diabetes",
                    data: [],
                },
                {
                    name: "Type 2 Diabetes",
                    data: [],
                },
                {
                    name: "Hypertention",
                    data: [],
                },
            ],
        };
    },
    watch: {
        $route: {
            async handler() {
                await this.initializeChartData();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.initializeChartData();
    },
    methods: {
        async initializeChartData() {
            this.dashboardData = await this.getDashboardData();
            this.lineChartOptions.xaxis.categories = this.dashboardData.gender_data.categories;
            this.lineChartSeries[0].data = this.dashboardData.gender_data.femaleSeries;
            this.lineChartSeries[1].data = this.dashboardData.gender_data.maleSeries;

            this.barChartOptions.xaxis.categories = this.dashboardData.diagnosis_data.categories;
            this.barChartSeries[0].data = this.dashboardData.diagnosis_data.typeOneSeries;
            this.barChartSeries[1].data = this.dashboardData.diagnosis_data.typeTwoSeries;
            this.barChartSeries[2].data = this.dashboardData.diagnosis_data.hypertentionSeries;

            await nextTick();
            setTimeout(() => {
                this.isChartReady = true;
            }, 100);
        },
        getDashboardData() {
            try {
                const url = `programs/${32}/reports/ncd_dashboard`;
                return Service.getJson(url, {
                    start_date: HisDate.sessionDate(),
                    end_date: HisDate.sessionDate(),
                });
            } catch (error) {
                return [];
            }
        },
    },
});
</script>
<style scoped>
.charts {
    display: flex;
}
@media (max-width: 835px) {
    .charts {
        display: block;
    }
}
.grid {
    display: grid;
}
@media (min-width: 768px) {
    .md\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (min-width: 1024px) {
    .lg\:grid-cols-4 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    padding: 0 20px;
}

.top-card {
    flex: 1 1 200px; /* This makes cards flexible but with a minimum width */
    min-width: 200px; /* Ensures cards don't get too narrow */
    margin-bottom: 0px;
    background-color: #fff;
    padding-bottom: 30px;
    padding-top: 20px;
}

.top-card-text {
    width: 100%;
    text-align: center;
}
.text-2xl {
    font-size: 35px;
}
.font-medium {
    font-size: 18px;
}
.font-bold {
    font-weight: 700;
}
</style>
