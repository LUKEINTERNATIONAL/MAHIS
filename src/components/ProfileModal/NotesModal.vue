<template>
    <div class="modal_wrapper">
        <div class="modal_title diplay_space_between">
            <span>Clinical Notes</span>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300">x</span>
        </div>
        <span v-if="vitals[0].alerts[0].backgroundColor && vitals[1].data.rowData[0].colData[0].value">
            <div class="vitals_overview">
                <div>Vitals</div>
                <div id="vitals_dialog">
                    <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.vitals_graph" style="cursor: pointer"></ion-icon>
                </div>
            </div>
            <div class="v_result">
                <div class="obese" :style="'background-color:' + vitals[0].alerts[0].backgroundColor">
                    <div>
                        <ion-icon slot="start" aria-hidden="true" :icon="vitals[0].alerts[0].icon"></ion-icon>
                    </div>
                    <div :style="'margin-left:40px; color:' + vitals[0].alerts[0].textColor">
                        <span style="font-weight: 700"> {{ vitals[0].alerts[0].index }}</span> {{ vitals[0].alerts[0].value }}
                    </div>
                </div>
                <div class="bmi">
                    <div>
                        <ion-icon slot="start" aria-hidden="true" :icon="iconsContent.bmi_rusults"></ion-icon>
                    </div>
                    <div style="margin-left: 40px">
                        {{ vitals[1].data.rowData[0].colData[0].value }} / {{ vitals[1].data.rowData[0].colData[1].value }}
                    </div>
                </div>
            </div>
        </span>
        <div>
            Notes
            <ul class="notes_content">
                <li v-for="(item, index) in clinicalNotes" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController, IonCard, IonCardContent } from "@ionic/vue";
import { defineComponent } from "vue";

import { ref, computed, onMounted } from "vue";
import { icons } from "@/utils/svg";
import { mapState } from "pinia";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useVitalsStore } from "@/stores/VitalsStore";

const iconsContent = icons;
const clinicalNotes = ref();
const store = useVitalsStore();
const vitals = computed(() => store.vitals);

function dismiss() {
    modalController.dismiss();
}

onMounted(() => {
    clinicalNotes.value = transformClinicalNotes();
});

function transformClinicalNotes(): string[] {
    const treatmentPlanStore = useTreatmentPlanStore();
    const input = treatmentPlanStore.getNonPharmalogicalTherapyAndOtherNotes();
    const lines: string[] = [];
    let startIndex = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "\n" || input[i] === "\r") {
            const line = input.substring(startIndex, i);
            if (line.length > 0) {
                //const processedLine = line.startsWith('• ') ? line : '• ' + line
                lines.push(line);
                startIndex = i + 1;
            }
        }
    }

    const lastLine = input.substring(startIndex);
    if (lastLine.length > 0) {
        //const processedLastLine = lastLine.startsWith('• ') ? lastLine : '• ' + lastLine;
        lines.push(lastLine);
    }
    return lines;
}
</script>

<style scoped>
.modal_wrapper {
    padding: 30px;
}
</style>
