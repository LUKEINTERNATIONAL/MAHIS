<template>
    <div style="margin-left: 20px; display: flex; gap: 20px; width: 95%">
        <ion-card style="margin-bottom: 20px; background-color: #fff" class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ todayMetrics.bookedPatients }}</div>
                    <h3 class="text-sm font-medium">Today's Appointments</h3>
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card style="margin-bottom: 20px; background-color: #fff" class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ todayMetrics.defaulters }}</div>
                    <h3 class="text-sm font-medium">Defaulters</h3>
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card style="margin-bottom: 20px; background-color: #fff" class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ todayMetrics.complications }}</div>
                    <h3 class="text-sm font-medium">Complications</h3>
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card style="margin-bottom: 20px; background-color: #fff" class="top-card">
            <ion-card-content>
                <div class="top-card-text">
                    <div class="text-2xl font-bold">{{ todayMetrics.totalActive }}</div>
                    <h3 class="text-sm font-medium">Total active patients</h3>
                </div>
            </ion-card-content>
        </ion-card>
    </div>
    <div style="display: flex; gap: 30px">
        <ion-card style="margin-bottom: 20px; background-color: #fff; margin-left: 20px; width: 100%" class="top-card">
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
        <ion-card style="margin-bottom: 20px; background-color: #fff; margin-left: 20px; width: 100%" class="top-card">
            <ion-card-content>
                <div class="font-medium">Quarterly Case Distribution</div>
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

<script>
import ApexChart from "vue3-apexcharts";
import { nextTick } from "vue";

export default {
    name: "MedicalDashboard",
    components: {
        ApexChart,
    },
    data() {
        return {
            isChartReady: false,
            todayMetrics: {
                bookedPatients: 42,
                defaulters: 8,
                complications: 3,
                totalActive: 156,
            },
            quarterlyData: [
                { quarter: "Q1 2024", male: 245, female: 120 },
                { quarter: "Q2 2024", male: 312, female: 165 },
                { quarter: "Q3 2024", male: 278, female: 138 },
                { quarter: "Q4 2024", male: 334, female: 187 },
            ],
            quarterlyDiagnosisData: [
                { quarter: "Q1 2024", diabetesType1: 245, diabetesType2: 120, hypertention: 32 },
                { quarter: "Q2 2024", diabetesType1: 312, diabetesType2: 165, hypertention: 45 },
                { quarter: "Q3 2024", diabetesType1: 278, diabetesType2: 138, hypertention: 25 },
                { quarter: "Q4 2024", diabetesType1: 334, diabetesType2: 187, hypertention: 78 },
            ],
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
    async mounted() {
        // Initialize chart data
        this.initializeChartData();

        // Wait for the next DOM update cycle
        await nextTick();

        // Set a small timeout to ensure the chart container is fully rendered
        setTimeout(() => {
            this.isChartReady = true;
        }, 100);
    },
    methods: {
        initializeChartData() {
            // Populate chart data
            this.lineChartOptions.xaxis.categories = this.quarterlyData.map((item) => item.quarter);
            this.lineChartSeries[0].data = this.quarterlyData.map((item) => item.male);
            this.lineChartSeries[1].data = this.quarterlyData.map((item) => item.female);

            this.barChartOptions.xaxis.categories = this.quarterlyData.map((item) => item.quarter);
            this.barChartSeries[0].data = this.quarterlyDiagnosisData.map((item) => item.diabetesType1);
            this.barChartSeries[1].data = this.quarterlyDiagnosisData.map((item) => item.diabetesType2);
            this.barChartSeries[2].data = this.quarterlyDiagnosisData.map((item) => item.hypertention);
        },
    },
};
</script>
<style scoped>
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
.top-card {
    width: 25%;
    padding-bottom: 20px;
    padding-top: 10px;
}
.top-card-text {
    width: 100%;
    text-align: center;
}
.text-2xl {
    font-size: 25px;
}
.font-medium {
    font-size: 18px;
}
.font-bold {
    font-weight: 700;
}
</style>
