<template>
    <div class="" style="padding-bottom:5px">
        <div class="text_header_16">
                <span style="margin-right: 10px;">Clinical Notes</span> 
                <span style="cursor: pointer;" v-html="iconsContent.notes_expand" @click="openNotesModal()"></span> 
        </div>
        <div class="vitals_overview">
            <div>
                Vitals
            </div>
            <div id="vitals_dialog">
                <span style="cursor: pointer;" v-html="iconsContent.vitals_graph" @click="openVitalsModal()" ></span> 
            </div>
        </div>
        <div class="v_result">
            <div class="obese">
                <div>
                    <span v-html="iconsContent.obese" ></span> 
                </div>
                <div style="margin-left:40px"> 
                    <span style="font-weight: 700;"> 25.6</span> obese
                </div>
            </div>
            <div class="bmi">
                <div>
                    <span v-html="iconsContent.bmi_rusults" ></span> 
                </div>
                <div style="margin-left:40px">
                    110/70
                </div>
            </div>
        </div>
        <div>
            Notes
            <ul class="notes_content">
                <li  v-for="(item, index) in clinicalNotes" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { 
      IonContent, 
      IonHeader,
      IonItem,
      IonList,
      IonTitle, 
      IonToolbar, 
      IonMenu,
      modalController 
  } from '@ionic/vue';
import { defineComponent } from 'vue'
import { checkmark,pulseOutline } from 'ionicons/icons'
import { ref } from 'vue'
import { icons } from '@/utils/svg.ts'
import { mapState } from 'pinia'
import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'

import VitalsModal from '@/components/ProfileModal/VitalsModal.vue'
import NotesModal from '@/components/ProfileModal/NotesModal.vue'
import { createModal } from '@/utils/Alerts'

export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar    },
  data() {
return {
  iconsContent: icons,
  clinicalNotes: this.transformClinicalNotes()
};
},
methods:{
    openNotesModal(){
        createModal(NotesModal)
    },
    openVitalsModal(){
        createModal(VitalsModal)
    },
    transformClinicalNotes(): string[] {
        const treatmentPlanStore = useTreatmentPlanStore()
        const input = treatmentPlanStore.getNonPharmalogicalTherapyAndOtherNotes()
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
    },
}
});
</script>

<style scoped>


</style>
