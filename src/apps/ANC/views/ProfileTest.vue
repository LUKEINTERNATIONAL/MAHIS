<template>
  <ion-accordion-group @ionAccordionDidOpen="onAccordionOpen">
    <ion-accordion :value="accordions[0].value">
      <ion-item slot="header" color="light">
        <ion-label>{{ accordions[0].label }}</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">{{ accordions[0].content }}</div>
    </ion-accordion>
    <ion-accordion :value="accordions[1].value" v-show="!isFirstAccordionExpanded">
      <ion-item slot="header" color="light">
        <ion-label>{{ accordions[1].label }}</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">{{ accordions[1].content }}</div>
    </ion-accordion>
    <ion-accordion :value="accordions[2].value" v-show="!isFirstAccordionExpanded">
      <ion-item slot="header" color="light">
        <ion-label>{{ accordions[2].label }}</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">{{ accordions[2].content }}</div>
    </ion-accordion>
  </ion-accordion-group>
</template>

<script lang="ts">
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, AccordionGroupCustomEvent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

interface Accordion {
  value: string;
  label: string;
  content: string;
}

export default defineComponent({
  components: {
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
  },
  setup() {
    const isFirstAccordionExpanded = ref(false);

    const accordions: Accordion[] = [
      { value: 'first', label: 'First Accordion', content: 'First Content' },
      { value: 'second', label: 'Second Accordion', content: 'Second Content' },
      { value: 'third', label: 'Third Accordion', content: 'Third Content' }
    ];

    const onAccordionOpen = (event: CustomEvent<AccordionGroupCustomEvent>) => {
      if (event.detail.accordion === 'first') {
        isFirstAccordionExpanded.value = true;
      }
    };

    return {
      isFirstAccordionExpanded,
      accordions,
      onAccordionOpen,
    };
  },
});
</script>

<style scoped>
ion-accordion[value="second"],
ion-accordion[value="third"] {
  display: none;
}
</style>
