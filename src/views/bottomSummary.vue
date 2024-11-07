<template>
    <div class="bottomSummary">
        <ion-segment value="custom">

            <ion-segment-button @click="setBottomSummarySegmentContent('Medication Timeline')">
                <ion-label>Medications</ion-label>
            </ion-segment-button>

            <ion-segment-button @click="setBottomSummarySegmentContent('Investigations')">
                <ion-label>Investigations</ion-label>
            </ion-segment-button>

            <ion-segment-button @click="setBottomSummarySegmentContent('Immunizations')">
                <ion-label>Immunizations</ion-label>
            </ion-segment-button>

            <ion-segment-button @click="setBottomSummarySegmentContent('Notes Timeline')">
                <ion-label>Notes</ion-label>
            </ion-segment-button>  
        </ion-segment>
    </div>

    <div class="bottomSummaryContent"  v-if="bottomSummarySegmentContent == 'Medication Timeline'">
        <MedicationsGrid />
    </div>

    <div class="bottomSummaryContent"  v-if="bottomSummarySegmentContent == 'Investigations'">
        <div>...</div>
    </div>  

    <div class="bottomSummaryContent"  v-if="bottomSummarySegmentContent == 'Immunizations'">
        <div>...</div>
    </div>

    <div class="bottomSummaryContent"  v-if="bottomSummarySegmentContent == 'Notes Timeline'">
        <NotesGrid />
    </div>
</template>

<script lang="ts">
import { } from "@ionic/vue";
import { defineComponent } from "vue";
import {
  medkit,
  grid,
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
  add,
  checkboxOutline,
  closeCircleOutline,
} from "ionicons/icons";

import MedicationsGrid from "@/components/PatientProfileGrid/MedicationsGrid.vue";
import NotesGrid from "@/components/PatientProfileGrid/NotesGrid.vue";

export default defineComponent({
    components: {
        MedicationsGrid,
        NotesGrid,
    },
    data() {
        const setBottomSummarySegmentContent = (name: any) => {
            this.bottomSummarySegmentContent = name;
        }

        return {
            bottomSummarySegmentContent: "Medication Timeline",
            setBottomSummarySegmentContent,
        }
     }
})
</script>