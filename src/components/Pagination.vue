<template>
  <ion-button fill="outline" :disabled="disablePrevious" @click="handlePrevious">
    <ion-icon :icon="chevronBack"></ion-icon>
  </ion-button>
  <ion-button fill="clear">
    <h3>{{ page }}</h3>
  </ion-button>
  <ion-button fill="outline" :disabled="disableNext" @click="handleNext">
    <ion-icon :icon="chevronForward"></ion-icon>
  </ion-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonButton, IonIcon } from "@ionic/vue";
import { chevronForward, chevronBack } from "ionicons/icons";

export default defineComponent({
  name: "Pagination",
  components: { IonButton, IonIcon },
  props: {
    onClickPrevious: {
      type: Function,
      required: true,
    },
    onClickNext: {
      type: Function,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    disableNext: {
      type: Boolean,
      required: true,
    },
    disablePrevious: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handlePrevious() {
      this.onClickPrevious();
    },
    handleNext() {
      this.onClickNext();
    },
  },
  setup() {
    return { chevronForward, chevronBack };
  },
});
</script>
