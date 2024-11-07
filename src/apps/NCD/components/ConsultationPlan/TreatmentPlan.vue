<template>
    <div class="background">
        <ion-segment :value="segmentContent" style="margin-top: 5px">
            <ion-segment-button value="Lab Investigations" @click="setSegmentContent(segments[0])">
                <ion-label>Medications</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Radiology Investigation" @click="setSegmentContent(segments[1])">
                <ion-label>Allergies</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Other Investigation" @click="setSegmentContent(segments[2])">
                <ion-label>Non-pharmalogical therapy and other notes</ion-label>
            </ion-segment-button>
        </ion-segment>
        <div v-if="segmentContent == segments[0]">
            <div style="margin: 10px">
                <NCDMedication/>
            </div>
        </div>
        <div v-if="segmentContent == segments[1]">
            <div style="margin: 10px">
                <Allergies/>
                <PreviousAllergies style="margin-top: 10px;"/>
            </div>
        </div>
        <div v-if="segmentContent == segments[2]">
            <div style="margin: 10px">
                <NonPharmalogicalTherapyAndOtherNotes/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import {
    IonItem,
    IonList,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
    IonSegment,
    IonSegmentButton,
} from "@ionic/vue";

import { ref, watch, computed, onMounted, onUpdated } from "vue";
import NCDMedication from "./NCDMedication.vue"
import NonPharmalogicalTherapyAndOtherNotes from "./NonPharmalogicalTherapyAndOtherNotes.vue"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useAllegyStore} from "@/apps/OPD/stores/AllergyStore"
import Allergies from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/Allergies.vue"
import PreviousAllergies from './PreviousAllergies.vue'

const segments = ref([
    'allergies',
    'medications',
    'other_notes',
]) as any
const segmentContent = ref(segments.value[0])
const store2 = useAllegyStore();

const PreviuosSelectedMedicalDrugsList = ref();
const FirstPreviousAllegies = ref();
const RestOfPreviousAllegies = ref();

onMounted(async () => {
    const previousTreatment = new PreviousTreatment();
    const { previousDrugPrescriptions, previousDrugAllergies } = await previousTreatment.getPatientEncounters();
    PreviuosSelectedMedicalDrugsList.value = previousDrugPrescriptions;
    FirstPreviousAllegies.value = Object.entries(previousDrugAllergies)[0];
    const [, ...restEntriesAllegies] = Object.entries(previousDrugAllergies);
    RestOfPreviousAllegies.value = restEntriesAllegies;
});

function setSegmentContent(name: any) {
    segmentContent.value = name;
}
</script>

<style scoped>

.segment-button-checked {
  background: #ddeedd !important;
}

ion-segment-button {
    background: #fff;
    margin-right: 1px;
    font-size: 12px;
    text-transform: unset;
}
</style>
