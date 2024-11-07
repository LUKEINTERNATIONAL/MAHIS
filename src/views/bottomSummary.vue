<template>
  <div class="bottom-summary">
    <ion-segment value="medications" class="ion-no-padding">
      <ion-segment-button
        @click="setBottomSummarySegmentContent('medications')"
        class="ion-no-padding"
      >
        <ion-icon :icon="medkit"></ion-icon>
        <ion-label>Medications</ion-label>
      </ion-segment-button>

      <ion-segment-button
        @click="setBottomSummarySegmentContent('investigations')"
        class="ion-no-padding"
      >
        <ion-icon :icon="flask"></ion-icon>
        <ion-label>Investigations</ion-label>
      </ion-segment-button>

      <ion-segment-button
        @click="setBottomSummarySegmentContent('immunizations')"
        class="ion-no-padding"
      >
        <ion-icon :icon="shield"></ion-icon>
        <ion-label>Immunizations</ion-label>
      </ion-segment-button>

      <ion-segment-button
        @click="setBottomSummarySegmentContent('notes')"
        class="ion-no-padding"
      >
        <ion-icon :icon="document"></ion-icon>
        <ion-label>Notes</ion-label>
      </ion-segment-button>
    </ion-segment>

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
import { defineComponent, ref } from 'vue';
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
  data() {
    const bottomSummarySegmentContent = ref('medications')
    const setBottomSummarySegmentContent = (name: string) => {
      bottomSummarySegmentContent.value = name;
    };

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
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  padding: 16px;
}

.bottom-summary-content {
  margin-top: 16px;
}

.ion-segment-button {
  --background: transparent;
  --background-hover: transparent;
  --background-focused: transparent;
  --background-activated: transparent;
  --color: #666;
  --color-activated: #007aff;
  --padding-start: 16px;
  --padding-end: 16px;
  --border-radius: 0;
  --border-width: 0;
  font-size: 14px;
  font-weight: 500;
}

.ion-segment-button.ion-activated {
  --color: #007aff;
}

.ion-icon {
  font-size: 20px;
  margin-right: 8px;
}
</style>