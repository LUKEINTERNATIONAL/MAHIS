<template>
    <div class="visitContent">
        <ion-row>
            <ion-col size="3">
                <div>
                    <DynamicButton
                        class=""
                        style="margin-bottom: 5px; width: 96%; height: 45px"
                        @click="loadSavedEncounters(date)"
                        v-for="(date, index) in visits"
                        :key="index"
                        :name="date"
                        :fill="visitDate != date ? 'outline' : 'solid'"
                        :color="visitDate == date ? 'success' : ''"
                    />
                </div>
            </ion-col>
            <ion-col offset="0.1" size="7">
                <div class="visitData">
                    <div v-if="Object.values(vitals).every((value) => value !== '')">
                        <div style="max-width: 300px">
                            <div class="heading" style="margin-top: 0px">Anthropometric Measurements</div>
                            <div>
                                <ion-row>
                                    <ion-col v-if="vitals.weight" class="contentTitle">Weight</ion-col>
                                    <ion-col v-if="vitals.height" class="contentTitle">Height</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col v-if="vitals.weight">{{ vitals.weight }} kg</ion-col>
                                    <ion-col v-if="vitals.height">{{ vitals.height }} cm</ion-col>
                                </ion-row>
                                <ion-row v-if="vitals.weight && vitals.height">
                                    <span>
                                        <ion-row
                                            v-if="vitalsWeightHeight.value"
                                            :style="
                                                'border-radius: 5px;  margin-top:10px; margin-bottom:10px;background-color:' +
                                                vitalsWeightHeight.backgroundColor
                                            "
                                        >
                                            <span class="position_content alert_content">
                                                <ion-icon slot="start" :icon="vitalsWeightHeight.icon" aria-hidden="true"></ion-icon>
                                                <span :style="'color:' + vitalsWeightHeight.textColor + '; font-weight:600; margin: 0px 20px;'">
                                                    {{ vitalsWeightHeight.index }}</span
                                                >
                                                <span :style="'color:' + vitalsWeightHeight.textColor + ';'"> {{ vitalsWeightHeight.value }} </span>
                                            </span>
                                        </ion-row>
                                    </span>
                                </ion-row>
                            </div>
                        </div>
                        <div style="max-width: 300px">
                            <div class="heading">Vital Signs</div>
                            <div>
                                <ion-row>
                                    <ion-col class="contentTitle">Systolic pressure</ion-col>
                                    <ion-col class="contentTitle">Diastolic pressure</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>{{ vitals.systolic }} mmHg</ion-col>
                                    <ion-col>{{ vitals.diastolic }} mmHg</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col class="contentTitle">Temperature</ion-col>
                                    <ion-col class="contentTitle">Oxygen Saturation</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>{{ vitals.temperature }} C</ion-col>
                                    <ion-col>{{ vitals.SAO2 }} %</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col class="contentTitle">Pulse Rate</ion-col>
                                    <ion-col class="contentTitle">Respiratory Rate</ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>{{ vitals.pulse }} BMP</ion-col>
                                    <ion-col>{{ vitals.respirationRate }} BMP</ion-col>
                                </ion-row>
                            </div>
                        </div>
                    </div>
                    <div class="noData" v-else>No Vitals were recorded</div>

                    <div v-if="presentingComplaint?.length > 0">
                        <div class="heading">Complaints Presented</div>
                        <div style="display: flex; flex-wrap: wrap">
                            <div class="spanContent" v-for="(complaint, index) in presentingComplaint" :key="index">{{ complaint }}</div>
                        </div>
                    </div>
                    <div class="noData" v-else>No complaints were recorded</div>
                    <div v-if="primaryDiagnosis?.length > 0">
                        <div class="heading">Primary Diagnoses</div>
                        <div style="display: flex; flex-wrap: wrap">
                            <div class="spanContent" v-for="(diagnosis, index) in primaryDiagnosis" :key="index">{{ diagnosis }}</div>
                        </div>
                    </div>
                    <div class="noData" v-else>No primary diagnoses were recorded</div>
                    <div v-if="secondaryDiagnosis?.length > 0">
                        <div class="heading">Secondary Diagnoses</div>
                        <div style="display: flex; flex-wrap: wrap">
                            <div class="spanContent" v-for="(diagnosis, index) in secondaryDiagnosis" :key="index">{{ diagnosis }}</div>
                        </div>
                    </div>
                    <div class="noData" v-else>No secondary diagnoses were recorded</div>
                    <div v-if="drugs">
                        <div class="heading">Treatment Plan</div>
                        <div></div>
                    </div>
                    <div class="noData" v-else>No Diagnoses were recorded</div>
                    <div v-if="nextAppointMent">
                        <span class="heading">Next Appointment:</span>
                        <span class="nextDate">06 September 2024</span>
                    </div>
                    <div class="noData" v-else>No next appointment was set</div>
                </div>
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import UpcomingFeature from "@/components/UpcomingFeature.vue";
import InvestigationsModal from "@/components/ProfileModal/InvestigationsModal.vue";
import { createModal } from "@/utils/Alerts";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { mapState } from "pinia";
import { PatientService } from "@/services/patient_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { EncounterService } from "@/services/encounter_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { ProgramService } from "@/services/program_service";
import HisDate from "@/utils/Date";
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
        UpcomingFeature,
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
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
        };
    },
    async mounted() {
        const patient = new PatientService();
        this.visits = await PatientService.getPatientVisits(patient.getID(), false);
        await this.loadSavedEncounters(this.visits[0]);
    },
    computed: {
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDemographicsStore, ["demographics", "patient"]),
        inputFields() {
            return this.investigations[0].selectedData;
        },
    },
    methods: {
        async loadSavedEncounters(patientVisitDate: any) {
            this.visitDate = patientVisitDate;
            const encounters = await EncounterService.getEncounters(this.demographics.patient_id, { date: patientVisitDate });
            console.log("🚀 ~ loadSavedEncounters ~ encounters:", encounters);
            await this.setDiagnosisEncounters(encounters);
            await this.setVitalsEncounters(encounters);
            await this.setPresentingComplainsEncounters(encounters);
            await this.setTreatmentEncounters(encounters);
        },
        findEncounter(data: any, encounterType: any) {
            return data.find((obj: any) => obj.type && obj.type.name === encounterType);
        },
        async setDiagnosisEncounters(data: any) {
            const observations = this.findEncounter(data, "OUTPATIENT DIAGNOSIS")?.observations;
            this.primaryDiagnosis = await this.getConceptValues(this.filterObs(observations, "Primary diagnosis"), "coded");
            this.secondaryDiagnosis = await this.getConceptValues(this.filterObs(observations, "Secondary diagnosis"), "coded");
        },
        async setVitalsEncounters(data: any) {
            const observations = this.findEncounter(data, "VITALS")?.observations;
            this.vitals.weight = this.filterObs(observations, "Weight")?.[0]?.value_numeric ?? "";
            this.vitals.temperature = this.filterObs(observations, "Temperature")?.[0]?.value_numeric ?? "";
            this.vitals.pulse = this.filterObs(observations, "Pulse")?.[0]?.value_numeric ?? "";
            this.vitals.SAO2 = this.filterObs(observations, "SAO2")?.[0]?.value_numeric ?? "";
            this.vitals.height = this.filterObs(observations, "Height (cm)")?.[0]?.value_numeric ?? "";
            this.vitals.systolic = this.filterObs(observations, "Systolic")?.[0]?.value_numeric ?? "";
            this.vitals.respirationRate = this.filterObs(observations, "Respiration rate")?.[0]?.value_numeric ?? "";
            this.vitals.diastolic = this.filterObs(observations, "Diastolic")?.[0]?.value_numeric ?? "";

            console.log("🚀 ~ setVitalsEncounters ~ this.vitals.weight:", this.vitals.weight);
            if (this.vitals.weight && this.vitals.height) {
                await this.setBMI(this.vitals.weight, this.vitals.height);
            }
        },
        async setTreatmentEncounters(data: any) {},
        async setPresentingComplainsEncounters(data: any) {
            const observations = this.findEncounter(data, "PRESENTING COMPLAINTS")?.observations;
            this.presentingComplaint = await this.getConceptValues(this.filterObs(observations, "Presenting complaint"), "coded");
        },
        async setLabOrderEncounters(data: any) {
            const observations = this.findEncounter(data, "LAB ORDERS")?.observations;
            this.labOrders = await this.getConceptValues(this.filterObs(observations, "Primary diagnosis"), "coded");
        },

        filterObs(observations: any, conceptName: any) {
            return observations?.filter((obs: any) => obs.concept.concept_names.some((name: any) => name.name === conceptName));
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
        openModal() {
            createModal(InvestigationsModal);
        },
        async setBMI(weight: any, height: any) {
            console.log("🚀 ~ setBMI ~ weight:", weight);
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
            this.vitalsWeightHeight.index = "BMI " + this.BMI?.index ?? "";
            this.vitalsWeightHeight.value = this.BMI?.result ?? "";
        },
    },
});
</script>

<style scoped>
.alert {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    text-align: center; /* Optional: Centers text within the alert box */
    flex-direction: column; /* Optional: Ensures children are arranged vertically */
}

.message {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
}

h3 {
    margin: 0; /* Removes default margin */
}
.visitContent {
    background: #fff;
    margin-top: 10px;
    padding: 20px;
}
.heading {
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    align-items: center;
    color: #00190e;
    margin-right: 5px;
    margin-top: 25px;
}
.contentTitle {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #636363;
}
.nextDate {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #006401;
}
.spanContent {
    margin-right: 20px;
    margin-left: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #636363;
    position: relative;
    line-height: 1.5;
}
.spanContent::before {
    content: "• ";
    color: #636363;
    font-size: 2em;
    position: absolute;
    left: -20;
    top: 50%;
    transform: translateY(-50%);
}
.visitData {
    border-left: #a3a1a1 solid 1px;
    padding-left: 20px;
}
.noData {
    border: #a3a1a1 solid 1px;
    border-style: dashed;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
}
</style>
