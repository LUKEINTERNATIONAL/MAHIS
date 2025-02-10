<template>
    <ion-page :class="{ loading: isLoading }">
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h1 style="width: 100%; text-align: center; font-weight: 700">Overdue Report</h1>
                <div style="display: flex; justify-content: space-between">
                    <div style="display: inline-block; vertical-align: top; max-width: 400px; top: -10px; position: relative; margin-right: 10px">
                        <basic-form :contentData="startEndDate" @update:inputValue="handleInputData"></basic-form>
                    </div>
                    <div style="display: inline-block; vertical-align: top; margin-top: 10px; float: right">
                        <ion-button class="addBtn" color="primary">
                            <div>
                                <div class="centerBigBtnContain">Export To CSV</div>
                            </div>
                        </ion-button>
                    </div>
                </div>

                <DataTable ref="dataTable" v-if="reportData.length > 0" :options="options" :data="reportData" class="display nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Of Birth</th>
                            <th>Missed Doses</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import ImmunizationTrendsGraph from "@/apps/Immunization/components/Graphs/ImmunizationTrendsGraph.vue";
import ImmunizationGroupGraph from "@/apps/Immunization/components/Graphs/ImmunizationGroupGraph.vue";
import { getVaccinesData } from "@/apps/Immunization/services/dashboard_service";
import { mapState } from "pinia";
import SetUser from "@/views/Mixin/SetUser.vue";
import HisDate from "@/utils/Date";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import DynamicButton from "@/components/DynamicButton.vue";
import { useStartEndDate } from "@/stores/StartEndDate";
import BasicForm from "@/components/BasicForm.vue";
import { toastWarning } from "@/utils/Alerts";
import "datatables.net-select";
import { PatientService } from "@/services/patient_service";
import { useWorkerStore } from "@/stores/workerStore";
import { useDemographicsStore } from "@/stores/DemographicStore";

export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonRow,
        IonCol,
        ImmunizationTrendsGraph,
        ImmunizationGroupGraph,
        DataTable,
        IonCard,
        DynamicButton,
        BasicForm,
    },
    data() {
        return {
            reportData: [] as any,
            startDate: HisDate.sessionDate(),
            endDate: HisDate.sessionDate(),
            options: {
                responsive: true,
                select: false,
            } as any,
            selectButton: "all",
            isLoading: false,
        };
    },

    computed: {
        ...mapState(useStartEndDate, ["startEndDate"]),
    },
    watch: {
        $route: {
            async handler(data) {
                if (data.name == "OverDueReport") {
                    await this.buildTableData().then(() => {
                        const table = (this.$refs.dataTable as any)?.dt;

                        table.on("click", ".follow-up-btn", (e: Event) => {
                            const id = (e.target as HTMLElement).getAttribute("data-id");
                            this.handleFollowUp(id);
                        });
                    });
                }
            },
            deep: true,
        },
    },
    async mounted() {
        await this.buildTableData().then(() => {
            const table = (this.$refs.dataTable as any)?.dt;

            table.on("click", ".follow-up-btn", (e: Event) => {
                const id = (e.target as HTMLElement).getAttribute("data-id");
                this.handleFollowUp(id);
            });
        });
    },
    methods: {
        async handleFollowUp(id: any) {
            const patientData = await PatientService.findByID(id);
            await useDemographicsStore().setPatientRecord(patientData);
            this.$router.push("patientProfile");
        },
        async handleInputData(event: any) {
            if (event.inputHeader == "Start date") {
                this.startDate = HisDate.toStandardHisFormat(event.value);
            }
            if (event.inputHeader == "End date") {
                this.endDate = HisDate.toStandardHisFormat(event.value);
            }
            await this.buildTableData();
        },
        async buildTableData() {
            this.isLoading = true;

            try {
                this.reportData = [];
                const vaccineData = await getVaccinesData();

                //Loop hrough each item in the vaccineData
                vaccineData.forEach((dataItem: any) => {
                    const overdue_clients = dataItem.value.under_five_missed_visits.concat(dataItem.value.over_five_missed_visits);

                    overdue_clients.forEach((visit: any) => {
                        let doses = 0;
                        // Extract personal details from each visit
                        let item = visit.client.table;

                        visit.missed_visits.forEach((missed_visit: any) => {
                            doses += missed_visit.antigens.length;
                        });

                        this.reportData.push([
                            `${item.given_name} ${item.family_name}`,
                            item.birthdate,
                            doses,
                            `<button class="btn btn-sm btn-primary follow-up-btn" data-id="${item.patient_id}">Follow UP</button>`,
                        ]);
                    });
                });

                DataTable.use(DataTablesCore);
            } catch (error) {
                toastWarning("An error occure while loading data.");
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        async selectedButton(button: any) {
            this.selectButton = button;
            await this.buildTableData();
        },
        async selectButton(button: any) {
            this.selectedButton = button;
            await this.buildTableData();
        },
    },
});
</script>
<style scoped>
.bigGroupButton {
    margin-top: 10px;
}
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
}
.graphBackground {
    position: absolute;
    width: 100vw;
    height: 62vh;
    left: 0px;
    top: 23vh;
    background: linear-gradient(158.66deg, #d6d5d6 0.36%, #f8f8f8 40.1%);
    border-radius: 22px;
}

.total {
    position: absolute;
    width: 251px;
    height: 128px;
    top: 25px;
    left: 50%;
    transform: translate(-50%, 10%);
    text-align: center;
    background: rgba(237, 235, 238, 0.95);
    opacity: 0.8;
    border-radius: 6px;
}
.totalNumber {
    /* 3,764 */

    height: 77px;

    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 77px;

    /* text_color */
    color: #5d5d5d;
}
.totalText {
    width: 229px;
    height: 48px;

    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
    /* or 22px */
    display: flex;
    align-items: center;
    text-align: center;

    color: #08475e;
}
.dueMiss {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
.missed {
    width: 187px;
    height: 90px;
    left: 14px;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;
}
.due {
    width: 187px;
    height: 90px;
    left: 14px;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;
}
.dueMissText {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 7px;
    color: #004d4d;
}
.dueNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;
    margin-top: 10px;

    /* blue/800 */
    color: #016302;
}
.missedNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;
    margin-top: 10px;

    color: #b42318;
}
.clientSeen {
    height: 120px;
    margin-top: 15px;
    background: #ffffff;
}
.clientSeenTitle {
    padding-top: 10px;
    margin-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #2d3648;
}
.clientSeenBoxChild {
    background: #2d3648 !important;
}
.clientSeenBoxMen {
    background: #004d4d !important;
}
.clientSeenBoxWomen {
    background: #556080 !important;
}
.clientSeenBox {
    width: 68px;
    height: 68px;
    background: #006401;
    border-radius: 7px;
    padding-top: 8px;
}
.clientSeenBoxes {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
.clientSeenBoxText {
    /* text-md */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    align-items: center;
    text-align: center;

    /* White */
    color: #ffffff;
}
.clientSeenBoxNumber {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-align: center;

    color: #ffffff;
}
.graphCard {
    width: 98vw;
    margin: 0 auto;
    margin-top: 10px;
}
.modal_wrapper {
    border-radius: 8px;
}
.bigButton {
    font-weight: 500;
    height: 180px;
}
.centerBigBtnContain {
    align-items: center;
    align-content: center;
}
.bigBtnHeader {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
}
ion-button {
    height: 60px;
    margin: 20px;
    margin-left: 0px;
    margin-right: 8px;
}
.addBtn {
    height: 50px;
    align-items: center;
}
</style>
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>
