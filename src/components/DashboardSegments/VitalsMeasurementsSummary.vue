<template>
    <div class="table-responsive">
        <DataTable ref="dataTable" :options="options" :data="tableData" class="display nowrap" width="100%">
            <thead>
                <tr>
                    <th v-for="head in header" :key="head">{{ head }}</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { PatientDiagnosisService } from "@/services/patient_diagnosis_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import List from "@/components/List.vue";
import BasicForm from "@/components/BasicForm.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { Service } from "@/services/service";
import previousDiagnosis from "@/apps/NCD/components/ConsultationPlan/previousVisits/previousDiagnosis.vue";
import HisDate from "@/utils/Date";
import { ObservationService } from "@/services/observation_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import DataTablesResponsive from "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-dt";
import "datatables.net-responsive";
import "datatables.net-select";
import "datatables.net-buttons";
import { createModal, toastDanger, toastSuccess } from "@/utils/Alerts";
import { EncounterService } from "@/services/encounter_service";
import { PatientService } from "@/services/patient_service";
import { ConceptService } from "@/services/concept_service";
import { BMIService } from "@/services/bmi_service";

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
        IonInput,
        IonPopover,
        DashBox,
        SelectionPopover,
        BasicInputField,
        List,
        BasicForm,
        DynamicButton,
        previousDiagnosis,
        DataTable,
    },
    data() {
        return {
            iconsContent: icons,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            conditionStatus: "" as any,
            data: [] as any,
            diagnosisData: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedCondition: "" as any,
            tableData: [] as any,
            options: {
                responsive: true,
                select: false,
                layout: {
                    topStart: "",
                    topEnd: "search",
                    bottomStart: "info",
                    bottomEnd: "paging",
                },
                ordering: false,
            } as any,

            header: ["Date", "Weight", "Temperature", "Pulse", "SAO2", "Height (cm)", "Systolic", "Respiration rate", "Diastolic", "BMI"] as any,
            visits: [] as any,
            BMI: "" as any,
            nextAppointMent: "" as any,
            drugs: "" as any,
            visitDate: [] as any,
            primaryDiagnosis: [] as any,
            presentingComplaint: [] as any,
            secondaryDiagnosis: [] as any,
            labOrders: [] as any,
            vitals: {} as any,
            vitalsWeightHeight: {} as any,
            savedEncounters: [] as any,
            pregnancy: {} as any,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    watch: {
        $route: {
            async handler() {
                await this.setListData();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.updateData();
        await this.setListData();
        this.$nextTick(() => {
            const table = (this.$refs.dataTable as any).dt;
            table.columns.adjust().draw();
            table.on("click", ".delete-btn", (e: Event) => {
                const data: any = (e.target as HTMLElement).getAttribute("data-id");
                this.voidDiagnosis(JSON.parse(data), e);
            });
        });
    },
    methods: {
        async voidDiagnosis(data: any, event: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${data.name} ?`, event);
            if (deleteConfirmed) {
                await ObservationService.voidObs(data.id);
                await this.setListData();
            }
        },
        async openEnterResultModal() {
            await this.setListData();
        },
        async updateData() {
            const patient = new PatientService();
            this.visits = await PatientService.getPatientVisits(patient.getID(), false);
            console.log("🚀 ~ updateData ~ this.visits:", this.visits);
            this.tableData = [];
            this.visits.map(async (visit: any) => {
                await this.loadSavedEncounters(visit);
            });
        },
        covertDate(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
        },
        async loadSavedEncounters(patientVisitDate: any) {
            this.visitDate = patientVisitDate;
            const encounters = await EncounterService.getEncounters(this.demographics.patient_id, { date: patientVisitDate });
            await this.setVitalsEncounters(encounters, patientVisitDate);
        },
        findEncounter(data: any, encounterType: any) {
            return data.find((obj: any) => obj.type && obj.type.name === encounterType);
        },
        async getConceptValues(filteredObservations: any, type: any) {
            if (filteredObservations) {
                return await Promise.all(
                    filteredObservations?.map(async (item: any) => {
                        return await ConceptService.getConceptName(item.value_coded);
                    })
                );
            }
        },
        filterObs(observations: any, conceptName: any) {
            return observations?.filter((obs: any) => obs.concept.concept_names.some((name: any) => name.name === conceptName));
        },
        async setVitalsEncounters(data: any, patientVisitDate: any) {
            const observations = this.findEncounter(data, "VITALS")?.observations;
            let bmi: any = "";
            if (this.vitals.weight && this.vitals.height) {
                bmi = await this.setBMI(this.vitals.weight, this.vitals.height);
            }
            this.tableData.push([
                patientVisitDate,
                this.filterObs(observations, "Weight")?.[0]?.value_numeric ?? "",
                this.filterObs(observations, "Temperature")?.[0]?.value_numeric ?? "",
                this.filterObs(observations, "Pulse")?.[0]?.value_numeric ?? "",
                this.filterObs(observations, "SAO2")?.[0]?.value_numeric ?? "",
                this.filterObs(observations, "Height (cm)")?.[0]?.value_numeric ?? "",
                this.filterObs(observations, "Systolic")?.[0]?.value_numeric ?? "",
                this.filterObs(observations, "Respiration rate")?.[0]?.value_numeric ?? "",
                this.filterObs(observations, "Diastolic")?.[0]?.value_numeric ?? "",
                bmi,
            ]);
        },
        async setBMI(weight: any, height: any) {
            if (this.demographics.gender && this.demographics.birthdate) {
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height),
                    this.demographics.gender,
                    HisDate.calculateAge(this.demographics.birthdate, HisDate.currentDate())
                );
            }
            this.updateBMI();
        },
        async updateBMI() {
            const bmiColor = this.BMI?.color ?? [];
            this.vitalsWeightHeight.icon = BMIService.iconBMI(bmiColor);
            this.vitalsWeightHeight.backgroundColor = bmiColor[0];
            this.vitalsWeightHeight.textColor = bmiColor[1];
            this.vitalsWeightHeight.index = "BMI " + (this.BMI?.index ?? "");
            this.vitalsWeightHeight.value = this.BMI?.result ?? "";
        },
        async setListData() {
            const obsP = await ObservationService.getAll(this.demographics.patient_id, "Primary diagnosis");
            const obsS = await ObservationService.getAll(this.demographics.patient_id, "Secondary diagnosis");
            const observations = [...(obsP || []), ...(obsS || [])];
            // this.tableData = await this.generateListItems(observations);
            DataTable.use(DataTablesCore);
        },
        async generateListItems(data: any) {
            if (data.length > 0) {
                const promiseResults = await Promise.all(
                    data.map(async (item: any) => {
                        const name = await ObservationService.getConceptName(item.value_coded);
                        const obs_date = item.obs_datetime;
                        return [name, HisDate.toStandardHisFormat(obs_date)];
                    })
                );

                return promiseResults;
            } else {
                return [];
            }
        },
    },
});
</script>
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

.table-responsive {
    width: 100%;
    overflow-x: auto;
}
div.dt-buttons > .dt-button:first-child {
    border: 1px solid #fff;
    background: #046c04;
    border-radius: 5px;
}
div.dt-buttons > .dt-button:hover:not(.disabled) {
    background: #188907 !important;
    border: 1px solid #fff !important;
}
.dt-type-date {
    text-align: left !important;
}
</style>
<style scoped>
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

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}
.modify_buttons {
    padding-left: 20px;
}
.item_no_border {
    --border-color: transparent;
}
.search_result {
    padding: 10px;
}
</style>
