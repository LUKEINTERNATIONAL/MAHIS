<!-- ViewToggle.vue -->
<template>
  <div class="view-toggle-container">
    <ion-buttons slot="end" class="toggle-buttons">
      <ion-button 
        fill="clear"
        :class="{ 'active': currentView === 'list' }" 
        @click="switchView('list')"
      >
        <ion-icon :icon="listOutline" size="large"></ion-icon>
      </ion-button>
      <ion-button 
        fill="clear"
        :class="{ 'active': currentView === 'card' }" 
        @click="switchView('card')"
      >
        <ion-icon :icon="gridOutline" size="large"></ion-icon>
      </ion-button>
    </ion-buttons>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { listOutline, gridOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'ViewToggle',
  components: {
    IonButtons,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      currentView: 'list',
      listOutline,
      gridOutline,
    };
  },
  methods: {
    switchView(view: 'list' | 'card') {
      this.currentView = view;
      this.$emit('view-changed', view);
    },
  },
});
</script>

<style scoped>
.view-toggle-container {
  display: flex;
  justify-content: flex-end;
  padding: 0 0.5rem;
  background: transparent;
  margin: 10px;
}

.toggle-buttons {
  display: flex;
  gap: 0.25rem;
  background: transparent;
}

ion-button {
  --background: transparent;
  --background-hover: rgba(var(--ion-color-primary-rgb), 0.1);
  --background-activated: transparent;
  --background-focused: transparent;
  --box-shadow: none;
  --color: var(--ion-color-medium);
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  height: 2rem;
}

ion-button.active {
  --color: var(--ion-color-primary);
  --background: transparent;
  position: relative;
}

ion-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background: var(--ion-color-primary);
  border-radius: 1px;
}

ion-icon {
  font-size: 1.25rem;
}
</style>