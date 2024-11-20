<template>
    <ion-card>
        <ion-card-header>
            <ion-label class="tpStndCls">
                <ion-icon :icon="clipboardOutline" class="header-icon" aria-hidden="true"></ion-icon>
                Non-pharmalogical therapy and other notes
            </ion-label>
        </ion-card-header>
        <ion-card-content>
            <div>
                <NonPharmacologicalIntervention/>
                
                <ion-item class="input_item" style="min-height: 120px; margin-top: 14px">
                    <ion-label> <ion-icon slot="start" :icon="iconsContent.editPen" aria-hidden="true"></ion-icon> </ion-label>
                    <IonTextarea
                        @ionInput="validateNotes"
                        v-model="nonPharmalogicalTherapyAndOtherNotes"
                        style="min-height: 120px"
                        class="inputTpln"
                        :auto-grow="true"
                        fill="outline"
                    />
                </ion-item>
            </div>
            
            <div style="margin-top: 14px; margin-left: 10px">
                <PreviousNotes/>
            </div>
        </ion-card-content>
    </ion-card>
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
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonIcon
} from "@ionic/vue";

import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { icons } from "@/utils/svg";
import { clipboardOutline } from 'ionicons/icons';
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import NonPharmacologicalIntervention from "@/apps/OPD/components/ConsultationPlan/NonPharmacologicalIntervention.vue"
import PreviousNotes from './PreviousNotes.vue'

const store = useTreatmentPlanStore();
const iconsContent = icons;
const nonPharmalogicalTherapyAndOtherNotes = computed(() => store.nonPharmalogicalTherapyAndOtherNotes);

function validateNotes(ev: any) {
    let value = ev.target.value
    refSetNonPharmalogicalTherapyAndOtherNotes(value)
}

function refSetNonPharmalogicalTherapyAndOtherNotes(value: string) {
    const treatmentPlanStore = useTreatmentPlanStore();
    treatmentPlanStore.setNonPharmalogicalTherapyAndOtherNotes(value as string);
}
</script>

<style scoped>
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.header-icon {
    font-size: 1.4rem;
    color: var(--ion-color-primary);
}
.previousLabel {
    font-weight: 600;
    color: #000;
}
.previousSecDrgs {
    margin: 2%;
}
.notes_p {
    margin: 4%;
}
</style>