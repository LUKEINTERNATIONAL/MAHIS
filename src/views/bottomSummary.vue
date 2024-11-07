<template>
  <div class="bottom-summary">
    <div class="ion-segment ion-no-padding">
      <ion-segment-button
        @click="setBottomSummarySegmentContent('medications')"
        class="ion-no-padding"
        :class="{ 'segment-button-checked': bottomSummarySegmentContent === 'medications' }"
      >
        <ion-icon :icon="medkit"></ion-icon>
        <ion-label>Medications</ion-label>
      </ion-segment-button>
      <ion-segment-button
        @click="setBottomSummarySegmentContent('investigations')"
        class="ion-no-padding"
        :class="{ 'segment-button-checked': bottomSummarySegmentContent === 'investigations' }"
      >
        <ion-icon :icon="flask"></ion-icon>
        <ion-label>Investigations</ion-label>
      </ion-segment-button>
      <ion-segment-button
        @click="setBottomSummarySegmentContent('immunizations')"
        class="ion-no-padding"
        :class="{ 'segment-button-checked': bottomSummarySegmentContent === 'immunizations' }"
      >
        <ion-icon :icon="shield"></ion-icon>
        <ion-label>Immunizations</ion-label>
      </ion-segment-button>
      <ion-segment-button
        @click="setBottomSummarySegmentContent('notes')"
        class="ion-no-padding"
        :class="{ 'segment-button-checked': bottomSummarySegmentContent === 'notes' }"
      >
        <ion-icon :icon="document"></ion-icon>
        <ion-label>Notes</ion-label>
      </ion-segment-button>
    </div>

    <div class="bottom-summary-content">
      <div v-if="bottomSummarySegmentContent === 'medications'">
        <MedicationsGrid />
      </div>
      <div v-if="bottomSummarySegmentContent === 'investigations'">
        <div></div>
      </div>
      <div v-if="bottomSummarySegmentContent === 'immunizations'">
        <div></div>
      </div>
      <div v-if="bottomSummarySegmentContent === 'notes'">
        <NotesGrid />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  medkit,
  flask,
  shield,
  document,
} from 'ionicons/icons';
import MedicationsGrid from '@/components/PatientProfileGrid/MedicationsGrid.vue';
import NotesGrid from '@/components/PatientProfileGrid/NotesGrid.vue';

export default defineComponent({
  components: {
    MedicationsGrid,
    NotesGrid,
  },
  setup() {
    const bottomSummarySegmentContent = ref('medications');

    const setBottomSummarySegmentContent = (name: string) => {
      bottomSummarySegmentContent.value = name;
    };

    onMounted(() => {
      // Set the initial state to 'medications' to ensure it is selected by default
      setBottomSummarySegmentContent('medications');
    });

    return {
      bottomSummarySegmentContent,
      setBottomSummarySegmentContent,
      medkit,
      flask,
      shield,
      document,
    };
  },
});
</script>

<style scoped>
.bottom-summary {
  border-top: 1px solid #e0e0e0;
}

.ion-segment {
  display: flex;
  justify-content: space-between;
}

.segment-button-checked {
  background: #ddeedd !important;
}

ion-segment-button {
  background: #fff;
  margin-right: 1px;
  font-size: 12px;
  text-transform: unset;
  flex: 1;
}
</style>