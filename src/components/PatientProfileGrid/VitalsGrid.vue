<template>
    <div class="" style="padding-bottom:5px">
        <div class="text_header_16">
            <span style="margin-right: 10px;">Clinical Notes </span> 
            <span v-if="clinicalNotes.length > 0" style="cursor: pointer;" v-html="iconsContent.notes_expand" @click="openNotesModal()"></span> 
        </div>
        <span v-if="vitals[0].alerts[0].backgroundColor && vitals[1].data.rowData[0].colData[0].value">
            <div class="vitals_overview">
                <div>
                    Vitals
                </div>
                <div id="vitals_dialog">
                    <span style="cursor: pointer;" v-html="iconsContent.vitals_graph" @click="openVitalsModal()" ></span> 
                </div>
            </div>
            <div class="v_result">
                <div class="obese" :style="'background-color:'+vitals[0].alerts[0].backgroundColor">
                    <div>
                        <span v-html="vitals[0].alerts[0].icon" ></span> 
                    </div>
                    <div :style="'margin-left:40px; color:'+vitals[0].alerts[0].textColor"> 
                        <span style="font-weight: 700;"> {{ vitals[0].alerts[0].index }}</span> {{ vitals[0].alerts[0].value }}
                    </div>
                </div>
                <div class="bmi">
                    <div>
                        <span v-html="iconsContent.bmi_rusults" ></span> 
                    </div>
                    <div style="margin-left:40px">
                        {{ vitals[1].data.rowData[0].colData[0].value }} / {{ vitals[1].data.rowData[0].colData[1].value }}
                    </div>
                </div>
            </div>
        </span>
        <div v-if="clinicalNotes.length > 0">
            Notes
            <ul class="notes_content">
                <li  v-for="(item, index) in clinicalNotes" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="no_content" v-if="clinicalNotes.length == 0 && !vitals[0].alerts[0].backgroundColor && !vitals[1].data.rowData[0].colData[0].value">
            <div>
                <div class="no_content_title">
                    No notes added today. 
                </div> 
                <div class="start_consultation">
                    Start new consultation
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonCard, IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue'
import { checkmark,pulseOutline } from 'ionicons/icons'
import { ref, onMounted, computed, watch } from 'vue'
import { icons } from '@/utils/svg'
import { mapState } from 'pinia'
import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'

import VitalsModal from '@/components/ProfileModal/VitalsModal.vue'
import NotesModal from '@/components/ProfileModal/NotesModal.vue'
import { createModal } from '@/utils/Alerts'
import { useVitalsStore } from '@/stores/VitalsStore'

const store = useVitalsStore()

const iconsContent = icons
const clinicalNotes = ref([]) as any
const treatmentPlanStore = useTreatmentPlanStore()

const vitals = computed(() => store.vitals)


onMounted(() => {
    clinicalNotes.value = transformClinicalNotes()
})

watch(treatmentPlanStore, () => {
    clinicalNotes.value = transformClinicalNotes()
});

function openNotesModal(){
    createModal(NotesModal)
}

function openVitalsModal(){  
    createModal(VitalsModal)
}

function transformClinicalNotes(): string[] {
    const input = treatmentPlanStore.getNonPharmalogicalTherapyAndOtherNotes()

    console.log("jajajajaj: ", input)
    const lines: string[] = [];
    let startIndex = 0

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '\n' || input[i] === '\r') {
            const line = input.substring(startIndex, i)
            if(line.length > 0) {
                //const processedLine = line.startsWith('• ') ? line : '• ' + line
                lines.push(line)
                startIndex = i + 1
            }
        }
    }
    
    const lastLine = input.substring(startIndex)
    if(lastLine.length > 0) {
        //const processedLastLine = lastLine.startsWith('• ') ? lastLine : '• ' + lastLine;
        lines.push(lastLine);
    }
    return lines;
}

</script>

<style scoped>

</style>
