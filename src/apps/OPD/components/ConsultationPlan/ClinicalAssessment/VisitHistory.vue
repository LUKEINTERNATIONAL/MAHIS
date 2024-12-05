<template>
    <div class="visitContent">
        <ion-row>
            <ion-col offset="0.1" size="10">
                <div class="visitData">
                    <!-- Level of consciousness section -->
                    <div v-if="Object.values(vitals).every((value) => value !== '')">
                        <div style="max-width: 300px">
                            <div class="heading">1. Level of consciousness presented</div>
                        </div>
                    </div>
                    <div class="noData" v-else>1. No level of consciousness were recorded</div>

                    <!-- Presenting Complaints Section -->
                    <div v-if="uniquePresentingComplaints?.length > 0">
                        <div class="heading">2. Presenting Complaints recorded</div>
                        <div style="display: flex; flex-wrap: wrap">
                            <div class="spanContent" v-for="(complaint, index) in uniquePresentingComplaints" :key="index">{{ complaint }}</div>
                        </div>
                    </div>
                    <div class="noData" v-else>2. No presenting complaints were recorded</div>

                    <!-- Primary Diagnosis Section -->
                    <div v-if="primaryDiagnosis?.length > 0">
                        <div class="heading">3. Pregnancy and breastfeeding status recorded</div>
                        <div style="display: flex; flex-wrap: wrap">
                            <div class="spanContent" v-for="(diagnosis, index) in primaryDiagnosis" :key="index">{{ diagnosis }}</div>
                        </div>
                    </div>
                    <div class="noData" v-else>3. No pregnancy and breastfeeding status was recorded</div>

                    <!-- Past Medical History Section -->
                    <div v-if="uniquePastMedicalHistory?.length > 0">
                        <div class="heading">4. Past medical history recorded</div>
                        <div style="display: flex; flex-wrap: wrap">
                            <div class="spanContent" v-for="(medicalHistory, index) in uniquePastMedicalHistory" :key="index">
                                {{ medicalHistory }}
                            </div>
                        </div>
                    </div>
                    <div class="noData" v-else>4. No past medical history was recorded</div>

                    <!-- Allergies Section -->
                    <div v-if="selectedAllergiesList2?.length > 0">
                        <div class="heading">5. Allergies recorded</div>
                        <ion-item lines="none" class="medicalAl">
                            <ion-row>
                                <div v-for="(item, index) in selectedAllergiesList2" :key="index">
                                    <ion-button style="padding: 2px" v-if="item.selected" class="medicalAlBtn">
                                        {{ item.name }}
                                    </ion-button>
                                </div>
                            </ion-row>
                        </ion-item>
                    </div>
                    <div class="noData" v-else>5. No allergies were recorded</div>

                    <!-- Physical Exam Section -->
                    <div v-if="nextAppointMent">
                        <span class="heading">6. Physical examinations recorded</span>
                        <span class="nextDate">06 September 2024</span>
                    </div>
                    <div class="noData" v-else>6. No physical exams were recorded</div>
                </div>
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController, IonButton } from "@ionic/vue";
import { computed, defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import UpcomingFeature from "@/components/UpcomingFeature.vue";
import InvestigationsModal from "@/components/ProfileModal/InvestigationsModal.vue";
import { createModal } from "@/utils/Alerts";
import { mapState } from "pinia";
import { PatientService } from "@/services/patient_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { EncounterService } from "@/services/encounter_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { ProgramService } from "@/services/program_service";
import HisDate from "@/utils/Date";
import { ConceptService } from "@/services/concept_service";
import { BMIService } from "@/services/bmi_service";
import { useAllegyStore } from "@/apps/OPD/stores/AllergyStore";
export default defineComponent({
    name: "Menu",
    components: {
        IonButton,
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
    setup() {
        const store = useAllegyStore();
        const selectedAllergiesList2 = computed(() => store.selectedMedicalAllergiesList);
        return {
            selectedAllergiesList2,
        };
    },
    data() {
        return {
            iconsContent: icons,
            visits: [] as any,
            BMI: "" as any,
            nextAppointMent: "" as any,
            drugs: "" as any,
            allergies: "" as any,
            visitDate: [] as any,
            primaryDiagnosis: [] as any,
            presentingComplaint: [] as any,
            selectedAllergiesList2: [] as any,
            pastMedicalHistory: [] as any,
            secondaryDiagnosis: [] as any,
            labOrders: [] as any,
            vitals: {} as any,
            vitalsWeightHeight: {} as any,
            savedEncounters: [] as any,
            pregnancy: {} as any,
        };
    },
    watch: {
        patient: {
            async handler() {
                await this.updateData();
            },
            deep: true,
        },
        $route: {
            async handler() {
                await this.updateData();
            },
            deep: true,
        },
    },

    async mounted() {
        await this.updateData();
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        todayVisit() {
            const todayDate = HisDate.toStandardHisFormat(new Date());
            return this.visits.find((date: any) => date === todayDate) || null;
        },
        uniquePastMedicalHistory() {
            return [...new Map(this.pastMedicalHistory.map((item: any) => [item, item])).values()];
        },
        uniquePresentingComplaints() {
            return [...new Map(this.presentingComplaint.map((item: any) => [item, item])).values()];
        },
    },
    methods: {
        async updateData() {
            const patient = new PatientService();
            this.visits = await PatientService.getPatientVisits(patient.getID(), false);
            await this.loadSavedEncounters(this.visits[0]);
        },
        covertDate(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
        },
        async loadSavedEncounters(patientVisitDate: any) {
            this.visitDate = patientVisitDate;
            const encounters = await EncounterService.getEncounters(this.patient.patientID, { date: patientVisitDate });
            await this.setDiagnosisEncounters(encounters);
            await this.setVitalsEncounters(encounters);
            await this.setPresentingComplainsEncounters(encounters);
            await this.setLevelOfConsciousnessEncounters(encounters);
            await this.setTreatmentEncounters(encounters);
            await this.setPastMedicalHistoryEncounters(encounters);
            await this.setAllergiesEncounters(encounters);
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

            if (this.vitals.weight && this.vitals.height) {
                await this.setBMI(this.vitals.weight, this.vitals.height);
            }
        },
        async setTreatmentEncounters(data: any) {},
        async setPresentingComplainsEncounters(data: any) {
            const observations = this.findEncounter(data, "PRESENTING COMPLAINTS")?.observations;
            this.presentingComplaint = await this.getConceptValues(this.filterObs(observations, "Presenting complaint"), "coded");
        },
        async setLevelOfConsciousnessEncounters(data: any) {
            const observations = this.findEncounter(data, "PRESENTING COMPLAINTS")?.observations;
            this.presentingComplaint = await this.getConceptValues(this.filterObs(observations, "Presenting complaint"), "coded");
        },
        async setPastMedicalHistoryEncounters(data: any) {
            const observations = this.findEncounter(data, "MEDICAL HISTORY")?.observations;
            this.pastMedicalHistory = await this.getConceptValues(this.filterObs(observations, "Chronic disease"), "coded");
        },
        async setAllergiesEncounters(data: any) {
            const observations = this.findEncounter(data, "MEDICAL HISTORY")?.observations;
            this.allergies = await this.getConceptValues(this.filterObs(observations, "Chronic disease"), "coded");
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
            if (this.patient?.personInformation?.gender && this.patient?.personInformation?.birthdate) {
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height),
                    this.patient?.personInformation?.gender,
                    HisDate.calculateAge(this.patient?.personInformation?.birthdate, HisDate.currentDate())
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
    padding: 10px;
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
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
}
.visitData {
    border-left: #a3a1a1 solid 1px;
    padding-left: 20px;
}
ion-button.medicalAlBtn {
    --background: #fecdca;
    --color: #b42318;
    text-transform: none;
}
.noData {
    border: #a3a1a1 solid 1px;
    border-style: dashed;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 30px;
}
</style>
