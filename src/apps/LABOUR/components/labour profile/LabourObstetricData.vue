<template>
    <div class="visitContent">
        <ion-row>
            <ion-col offset="0.1" size="7">
                <div class="visitData">
                    <!-- anc info -->
                    <div v-if="Object.values(pregnancy).every((value) => value !== '')">
                        <div style="max-width: 1000px">
                            <div class="heading">OBSTETRIC DATA</div>
                            <div>
                                <ion-row>
                                    <ion-col size="2" class="contentTitle">GRAVIDA</ion-col>
                                    <ion-col size="3" class="contentTitle">ABORTIONS/MISCARRIAGES</ion-col>
                                    <ion-col class="contentTitle">STILLBIRTHS</ion-col>
                                    <ion-col class="contentTitle">LIVE BIRTHS</ion-col>
                                    <ion-col size="2" class="contentTitle">PARITY</ion-col>
                                </ion-row>
                                <br />
                                <ion-row>
                                    <ion-col size="2"> {{ pregnancy.Gravida }}</ion-col>
                                    <ion-col size="3">{{ pregnancy["Abortions/Miscarriages"] }}</ion-col>
                                    <ion-col>{{ pregnancy.Stillbirths }}</ion-col>
                                    <ion-col>{{ pregnancy.LiveBirths }}</ion-col>
                                    <ion-col size="2">{{ pregnancy.Parity }}</ion-col>
                                </ion-row>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="noData" v-else-if="activeProgram.program_id !== 32">OBSTETRIC DATA IS EMPTY</div>
                    <!-- end of anc info -->
                    <!-- <div class="noData" v-else>ANC-Profile</div> -->
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
import { useProgramStore } from "@/stores/ProgramStore";

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
            pregnancy: {} as any,
        };
    },
    watch: {
        demographics: {
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
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useProgramStore, ["activeProgram"]),
        inputFields() {
            return this.investigations[0].selectedData;
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
            await this.setANCProfileEncounters(encounters);
        },
        findEncounter(data: any, encounterType: any) {
            return data.find((obj: any) => obj.type && obj.type.name === encounterType);
        },
        async setANCProfileEncounters(data: any) {
            const observations = this.findEncounter(data, "CURRENT PREGNANCY")?.observations;
            this.pregnancy.Gravida = this.filterObs(observations, "Gravida")?.[0]?.value_text ?? "";
            this.pregnancy["Abortions/Miscarriages"] = this.filterObs(observations, "Abortions/Miscarriages")?.[0]?.value_text ?? "";
            this.pregnancy.Stillbirths = this.filterObs(observations, "Stillbirths")?.[0]?.value_text ?? "";
            this.pregnancy.LiveBirths = this.filterObs(observations, "LiveBirths")?.[0]?.value_text ?? "";
            this.pregnancy.Parity = this.filterObs(observations, "Parity")?.[0]?.value_text ?? "";
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
    left: -20px;
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
