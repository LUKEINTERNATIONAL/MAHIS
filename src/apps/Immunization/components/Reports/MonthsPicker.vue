<template>
  <ion-list>
    <ion-card v-for="task in tasks" :key="task.month">
      <ion-card-content style="cursor: pointer;" @click="navigationMenu(task)">
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
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import { mapState } from "pinia";
import { getMonthsList } from "@/apps/Immunization/services/vaccines_service";

interface Task {
  month: string;
  completed: boolean;
  date: string;
  other: any
}

export default defineComponent({
  name: 'TaskList',
  components: { IonList, IonCard, IonCardContent, IonItem, IonLabel, IonNote },
  data() {
    return {
      tasks: [] as Task[],
      foward_Route: '',
      backward_route: '',
      report_name: '',
    };
  },
  computed: {
    ...mapState(EIRreportsStore, ["navigationPayload"]), 
  },
  async mounted() {
    this.initN()
    this.initMonths()
    this.initOwnNavData()
  },
  props: {
    fowardRoute: {
      default: 'home',
    },
    reportName: {
      default: 'Change name',
    },
    backwardRoute: {
      default: '',
    }
  },
  watch: {
    $route: {
        async handler(data) {
          if (data.name == "EIPMReport" || data.name == "AEFIReport")
          this.initOwnNavData()
        },
        deep: true,
    },
    fowardRoute: {
        async handler(data) {
          this.initN()         
        },
        deep: true,
    },
  },
  methods: {
    initN() {
      this.foward_Route = this.$props.fowardRoute
      this.backward_route = this.$props.backwardRoute
      this.report_name = this.$props.reportName
    },
    navigationMenu(task: Task): void{
      this.initNavData(task)
      this.$router.push(this.foward_Route)
    },
    initNavData(task: Task) {
      const store = EIRreportsStore()
      const dates = task.other[1][1].split(" to ")
      store.setStartAndEndDates(dates[0],dates[1])
      const subText = task.other[1][0]
      store.setNavigationPayload(this.report_name, true, false, '/', this.backwardRoute, subText as string)
    },
    initOwnNavData() {
      const store = EIRreportsStore()
      store.setNavigationPayload('Pick Month', true, false, '/', 'home')
    },
    async initMonths() {
      const monthsArray = [] as any
      const data = await getMonthsList()
      data.forEach((month: any) => {
        const aob = {
          month: month[1][0].replace('-', ' '), completed: true, date: month[0], other: month
        }
        monthsArray.push(aob)
      })

      this.tasks = monthsArray
    }
  }
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