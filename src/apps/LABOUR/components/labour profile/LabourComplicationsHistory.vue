<template>
    <div class="visitContent">
        <ion-row>
            <ion-col offset="0.1" size="7">
                <div class="visitData">
                    <!-- anc info -->
                    <div v-if="Object.values(pregnancy).every((value) => value !== '')">
                        <div style="max-width: 1000px">
                            <div class="heading">COMPLICATIONS DATA</div>
                            <div>
                                <ion-row>
                                    <ion-col class="contentTitle">GRAVIDA</ion-col>
                                    <ion-col class="contentTitle">Asphyxia</ion-col>
                                    <!-- <ion-col class="contentTitle">STILLBIRTHS</ion-col>
                                    <ion-col class="contentTitle">LIVE BIRTHS</ion-col>
                                    <ion-col class="contentTitle">PREGNANCY COMPLICATIONS</ion-col> -->
                                </ion-row>
                                <ion-row>
                                    <ion-col>{{ pregnancy.Gravida }}</ion-col>
                                    <ion-col>{{ pregnancy.Asphyxia }}</ion-col>
                                    <!-- <ion-col>{{ pregnancy["Abortions/Miscarriages"] }}</ion-col>
                                    <ion-col>{{ pregnancy.test }}</ion-col> -->
                                </ion-row>
                                <br />
                                <!-- <ion-row>
                                    <ion-col class="contentTitle">PAST SURGERIES</ion-col>
                                    <ion-col class="contentTitle">OTHER SURGERIES</ion-col>
                                    <ion-col class="contentTitle">ALLERGIES</ion-col>
                                    <ion-col class="contentTitle">CHRONIC CONDITIONS</ion-col>
                                </ion-row> -->
                                <!-- <ion-row>
                                    <ion-col>{{ pregnancy.surgeries }}</ion-col>
                                    <ion-col>{{ pregnancy["Other notes"] }}</ion-col>
                                    <ion-col>{{ pregnancy.allergies }}</ion-col>
                                    <ion-col>{{ pregnancy.chronic }}</ion-col>
                                </ion-row> -->
                                <!-- <br />
                                <ion-row>
                                    <ion-col class="contentTitle">LNMP</ion-col>
                                    <ion-col class="contentTitle">LIVE BIRTHS</ion-col>
                                    <ion-col class="contentTitle">PARITY</ion-col>
                                    <ion-col class="contentTitle">OTHER ALLERGIES</ion-col>
                                </ion-row> -->
                                <!-- <ion-row>
                                    <ion-col>{{ pregnancy.lnmp }}</ion-col>
                                    <ion-col>{{ pregnancy.LiveBirths }}</ion-col>
                                    <ion-col>{{ pregnancy.Parity }}</ion-col>
                                    <ion-col>{{ pregnancy.Other }}</ion-col>
                                </ion-row>
                                <br /> -->
                                <!-- <ion-row>
                                    <ion-col class="contentTitle">ULTRASOUND DONE</ion-col>
                                    <ion-col class="contentTitle">GESTATION AGE BY PALPATION</ion-col>
                                    <ion-col class="contentTitle">GESTATION USED</ion-col>
                                    <ion-col class="contentTitle">TETANUS DOSES</ion-col>
                                </ion-row> -->
                                <!-- <ion-row>
                                    <ion-col>{{ pregnancy.Ultrasound }}</ion-col>
                                    <ion-col>{{ pregnancy.Gestation }}</ion-col>
                                    <ion-col>{{ pregnancy.gestationUsed }}</ion-col>
                                    <ion-col>{{ pregnancy.tetanus }}</ion-col>
                                </ion-row> -->
                                <!-- <br />
                                <ion-row>
                                    <ion-col class="contentTitle">MEDICATIONS CURRENTLY PRESCRIBED</ion-col>
                                    <ion-col class="contentTitle">DAILY CAFFEINE INTAKE</ion-col>
                                    <ion-col class="contentTitle">RECENTLY QUIT TOBACCO PRODUCTS</ion-col>
                                    <ion-col class="contentTitle">EXPOSURE TO SECOND HAND SMOKE</ion-col>
                                </ion-row> -->
                                <!-- <ion-row>
                                    <ion-col>{{ pregnancy.prescription }}</ion-col>
                                    <ion-col>{{ pregnancy.caffeine }}</ion-col>
                                    <ion-col>{{ pregnancy.tobacco }}</ion-col>
                                    <ion-col>{{ pregnancy.smoke }}</ion-col>
                                </ion-row>
                                <br /> -->
                            </div>
                        </div>
                    </div>
                    <div class="noData" v-else-if="activeProgramID !== 32">PREGNANCY COMPLICATIONS IS EMPTY</div>
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
import SetPrograms from "@/views/Mixin/SetPrograms.vue";

export default defineComponent({
    name: "Menu",
    mixins: [SetPrograms],
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
        ...mapState(useDemographicsStore, ["demographics", "patient"]),
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
            const encounters = await EncounterService.getEncounters(this.demographics.patient_id, { date: patientVisitDate });
            await this.setANCProfileEncounters(encounters);
        },
        findEncounter(data: any, encounterType: any) {
            return data.find((obj: any) => obj.type && obj.type.name === encounterType);
        },
        async setANCProfileEncounters(data: any) {
            const observations = this.findEncounter(data, "CURRENT PREGNANCY")?.observations;
            console.log("+++++This is pulling data++++", observations);
            this.pregnancy.Gravida = this.filterObs(observations, "Gravida")?.[0]?.value_text ?? "";
            // this.pregnancy.Asphyxia = (await this.getConceptValues(this.filterObs(observations, "past pregnancies complications"), "coded"))?.[0];
            this.pregnancy.Asphyxia = (await this.getConceptValues(this.filterObs(observations, "past pregnancies complications"), "coded"))?.[0];
            console.log("Asphyxia:", this.pregnancy.Asphyxia);

            //this.pregnancy.LiveBirths = this.filterObs(observations, "LiveBirths")?.[0]?.value_text ?? "";
            //this.pregnancy.Parity = this.filterObs(observations, "Parity")?.[0]?.value_text ?? "";
            // this.pregnancy["Abortions/Miscarriages"] = this.filterObs(observations, "Abortions/Miscarriages")?.[0]?.value_text ?? "";
            // console.log("lets seeee", observations);
            // this.pregnancy.test = (await this.getConceptValues(this.filterObs(observations, "past pregnancies complications"), "coded"))?.[0];
            // this.pregnancy.surgeries = (
            //     await this.getConceptValues(this.filterObs(observations, "Does the woman have any past surgeries done?"), "coded")
            // )?.[0];
            // this.pregnancy["Other notes"] = this.filterObs(observations, "Other notes")?.[0]?.value_text ?? "";
            // this.pregnancy.allergies = (
            //     await this.getConceptValues(this.filterObs(observations, "Does the woman have any allergies?"), "coded")
            // )?.[0];
            // this.pregnancy.chronic = (await this.getConceptValues(this.filterObs(observations, "chronic conditions"), "coded"))?.[0];
            // this.pregnancy.lnmp = (await this.getConceptValues(this.filterObs(observations, "LNMP Known?"), "coded"))?.[0];
            //this.pregnancy.lmnpDate = this.filterObs(observations, "lmnpDate")?.[0]?.value_text ?? "";
            //this.pregnancy.lmnpGestationAge = this.filterObs(observations, "lmnpGestationAge")?.[0]?.value_text ?? "";
            // this.pregnancy["Other"] = this.filterObs(observations, "Other notes")?.[0]?.value_text ?? "";
            // this.pregnancy.Ultrasound = (await this.getConceptValues(this.filterObs(observations, "Ultrasound done?"), "coded"))?.[0];
            // this.pregnancy.Gestation = (await this.getConceptValues(this.filterObs(observations, "Gestation"), "coded"))?.[0];
            // this.pregnancy.gestationUsed = (await this.getConceptValues(this.filterObs(observations, "Gestation age to be used"), "coded"))?.[0];
            // this.pregnancy.tetanus = (
            //     await this.getConceptValues(this.filterObs(observations, "The woman received tetanus doses for immunization?"), "coded")
            // )?.[0];
            // this.pregnancy.prescription = (
            //     await this.getConceptValues(this.filterObs(observations, "Which medications is the woman currently prescribed?"), "coded")
            // )?.[0];
            // this.pregnancy.caffeine = (await this.getConceptValues(this.filterObs(observations, "Daily caffeine use"), "coded"))?.[0];
            // this.pregnancy.tobacco = (await this.getConceptValues(this.filterObs(observations, "Recently quit tobacco products"), "coded"))?.[0];
            // this.pregnancy.smoke = (await this.getConceptValues(this.filterObs(observations, "Exposure to second hand smoke"), "coded"))?.[0];
            //
            // this.pregnancy['HIV test date'] = this.filterObs(observations, "HIV test date")?.[0]?.value_text ?? "";
            // this.pregnancy.art = (await this.getConceptValues(this.filterObs(observations, "chronic conditions"), "coded"))?.[0];
            // this.pregnancy['facility for art'] = this.filterObs(observations, "facility for art")?.[0]?.value_text ?? "";
            // this.pregnancy['Estimated date of delivery'] = this.filterObs(observations, "Estimated date of delivery")?.[0]?.value_text ?? "";
            // this.pregnancy['Date for ultrasound'] = this.filterObs(observations, "Ultrasound")?.[0]?.value_text ?? "";
            // this.pregnancy['Gestation age from ultrasound'] = this.filterObs(observations, "specify")?.[0]?.value_text ?? "";
            // this.pregnancy.smoke = (await this.getConceptValues(this.filterObs(observations, "The woman received tetanus doses for immunization?"), "coded"))?.[0];
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
