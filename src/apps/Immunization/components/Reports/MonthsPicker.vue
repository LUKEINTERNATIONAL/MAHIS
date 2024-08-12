<template>
  <ion-list>
    <ion-card v-for="task in tasks" :key="task.month">
      <ion-card-content style="cursor: pointer;" @click="navigationMenu('EIRReport')">
        <ion-item lines="none">
          <ion-label>
            <h2>{{ task.month }}</h2>
            <p v-if="task.completed" class="completed-text">✓ Completed</p>
          </ion-label>
          <ion-note slot="end">{{ task.date }}</ion-note>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonList, IonCard, IonCardContent, IonItem, IonLabel, IonNote } from '@ionic/vue';

interface Task {
  month: string;
  completed: boolean;
  date: string;
}

export default defineComponent({
  name: 'TaskList',
  components: { IonList, IonCard, IonCardContent, IonItem, IonLabel, IonNote },
  data() {
    return {
      tasks: [
        { month: 'Mar 2025', completed: false, date: '3/8/2024' },
        { month: 'Dec 2024', completed: true, date: '5/8/2024' },
        { month: 'Sep 2024', completed: true, date: '12/10/2016' },
        { month: 'Aug 2024', completed: true, date: '10/10/2017' },
        { month: 'Jul 2024', completed: false, date: '5/8/2024' },
        { month: 'Jun 2024', completed: true, date: '3/1/2014' },
        { month: 'May 2024', completed: true, date: '7/8/2024' },
      ] as Task[]
    };
  },
  methods: {
    navigationMenu(url: string) {
      this.$router.push(url)
    }
  },
});
</script>

<style scoped>
ion-list {
  background-color: inherit;
  padding: 10px;
}

ion-card {
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

ion-item {
  --background: transparent;
}

ion-label h2 {
  font-weight: bold;
  color: #333;
}

ion-note {
  color: #999;
  font-size: 0.8em;
}

.completed-text {
  color: #4CAF50;
  margin-top: 4px;
}
</style>