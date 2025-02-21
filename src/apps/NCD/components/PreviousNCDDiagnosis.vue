<template>
    <div class="diagnosis-container" v-if="diagnoses.length > 0">
        <div class="heading">
            <ion-icon :icon="medkitOutline" class="diagnosis-icon"></ion-icon>
            <h2>Diagnosis</h2>
        </div>
        <ion-row class="ion-padding">
            <ion-col>
                <div class="diagnosis-list">
                    <ion-chip
                        v-for="(diagnosis, index) in diagnoses"
                        :key="index"
                        :class="{ 'diagnosis-chip-selected': selectedDiagnoses.includes(diagnosis) }"
                        @click="toggleDiagnosisSelection(diagnosis)"
                    >
                        <ion-label>{{ diagnosis }}</ion-label>
                    </ion-chip>
                </div>
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonChip, IonLabel, IonIcon } from "@ionic/vue";
import { defineComponent, ref, watch, computed } from "vue";
import { medkitOutline } from "ionicons/icons";
import { getNCDDiagnosis } from "@/apps/NCD/services/treatment";
import { getDiabetesDrugs, getAntiHypertensivesMedication, clearMedicationData } from "@/stores/NCDMedicationStore";
import SetUser from "@/views/Mixin/SetUser.vue";
import { mapState } from "pinia";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

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
        IonRow,
        IonCol,
        IonChip,
        IonLabel,
        IonIcon,
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    data() {
        const diagnoses = ref([] as any);
        const selectedDiagnoses = ref([] as any);

        const initC = async () => {
            try {
                const client_has_ncd_diagnosis = ref(false);
                const setClientHasNCDDiagnosis = (value: boolean) => {
                    client_has_ncd_diagnosis.value = value
                };
                diagnoses.value = await getNCDDiagnosis();

                const hasHypertension = diagnoses.value.some((diagnosis: any) => diagnosis.toLowerCase().includes("hypertension"));

                const hasDiabetes = diagnoses.value.some((diagnosis: any) => diagnosis.toLowerCase().includes("diabetes"));

                if (hasHypertension) {
                    setClientHasNCDDiagnosis(true);
                    getAntiHypertensivesMedication();
                }
                if (hasDiabetes) {
                    setClientHasNCDDiagnosis(true);
                    getDiabetesDrugs();
                }

                if (diagnoses.value.length == 0) {
                    clearMedicationData();
                }

                if (client_has_ncd_diagnosis.value == false) {
                    toastWarning("Client has no NCD related Diagnosis!");
                }
            } catch (error) {}
        };

        const fetchMedications = async () => {
            const hasHypertension = selectedDiagnoses.value.some((diagnosis: any) => diagnosis.toLowerCase().includes("hypertension"));

            const hasDiabetes = selectedDiagnoses.value.some((diagnosis: any) => diagnosis.toLowerCase().includes("diabetes"));

            if (hasHypertension) {
                await getAntiHypertensivesMedication();
            }
            if (hasDiabetes) {
                await getDiabetesDrugs();
            }
        };

        const toggleDiagnosisSelection = (diagnosis: string) => {
            const index = selectedDiagnoses.value.indexOf(diagnosis);
            if (index === -1) {
                selectedDiagnoses.value.push(diagnosis);
                clearMedicationData();
                fetchMedications();
            } else {
                selectedDiagnoses.value.splice(index, 1);
                clearMedicationData();
                fetchMedications();
            }

            const selectedDiagnosesCount = selectedDiagnoses.value.length as number;
            if (selectedDiagnosesCount === 0) {
                clearMedicationData();
                initC();
            }
        };

        return {
            diagnoses,
            selectedDiagnoses,
            medkitOutline,
            initC,
            toggleDiagnosisSelection,
        };
    },
    async mounted() {
        this.initC();
    },
    watch: {
        patient: {
            handler() {
                clearMedicationData();
                this.initC();
            },
            deep: true,
        },
    },
});
</script>

<style scoped>
.diagnosis-container {
    width: 100%;
    overflow-x: auto;
}

.heading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 16px 0 16px;
}

.heading h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
}

.diagnosis-icon {
    font-size: 1.4rem;
    color: var(--ion-color-primary);
}

.diagnosis-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
    min-width: min-content;
}

.diagnosis-chip {
    white-space: nowrap;
}

.diagnosis-chip-selected {
    background-color: var(--ion-color-primary);
    color: var(--ion-color-primary-contrast);
}
</style>
