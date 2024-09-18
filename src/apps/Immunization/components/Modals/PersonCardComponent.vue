<template>
    <ion-header>
        <ion-row>
          <ion-col>
            <ion-title style="margin-bottom: 1px;" class="modalTitle">{{ heading_text }}</ion-title>
          </ion-col>
        </ion-row>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-row>
        <ion-col style="margin-left: 10px; margin-right: 10px;">
            <BasicInputField
              placeholder=""
              :icon="searchOutline"
              :inputValue="search_text"
              @update:inputValue="searchTextUpdated"
            />
            <div>
                <ion-label v-if="search_txt_error" class="error-label">
                    {{ 'only letters allowed' }}
                </ion-label>
            </div>
          </ion-col>
      </ion-row>

      <ion-row>
      <ion-col v-for="person in people" :key="person.id">
        <ion-card class="person-card">
          <ion-card-content>
            <div class="card-header">
              <div>
                <ion-card-title>{{ person.firstName }} {{ person.lastName }}</ion-card-title>
                <ion-card-subtitle>{{ person.age }} yrs ({{ formatDate(person.dob) }})</ion-card-subtitle>
              </div>
              <ion-icon :icon="eyeOutline" class="eye-icon"></ion-icon>
            </div>
            <ion-list lines="none">
              <ion-item>
                <ion-icon :icon="personOutline" slot="start"></ion-icon>
                <ion-label>Gender: {{ person.sex }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="locationOutline" slot="start"></ion-icon>
                <ion-label>Village: {{ person.village }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
                <ion-label>Appointment: {{ formatDate(person.appointmentDate) }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
    </ion-content>

    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="dismiss()"> Cancel </ion-button>
            </ion-col>
        </ion-row>
    </ion-footer>
    
 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol, IonCard, IonContent, IonCardContent, IonFooter, IonCardTitle, IonHeader, IonTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { calendarOutline, personOutline, locationOutline, eyeOutline, searchOutline } from 'ionicons/icons';
import BasicInputField from "@/components/BasicInputField.vue"

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
  sex: string;
  village: string;
  appointmentDate: string;
}

export default defineComponent({
  name: 'PersonCardComponent',
  components: {
    IonGrid, IonRow, IonCol, BasicInputField, IonContent, IonCard, IonHeader, IonFooter, IonTitle, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon
  },
  props: {
    people: {
      type: Array as () => Person[],
      required: true,
    },
    heading_text: {
      type: String,
      required: true,
      default: "provide heading text",
    }
  },
  setup() {
    return {
      calendarOutline,
      personOutline,
      locationOutline,
      eyeOutline,
      searchOutline,
      search_text: '',
      search_txt_error: false,
    };
  },
  methods: {
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },
    searchTextUpdated(event: any) {
        // const reason = event.target.value
        // this.search_text = reason

        // if (this.isValidString(this.search_text) == true) {
        //     this.search_txt_error = false
        //     this.searchFirstLastName(this.search_text)
        // } else {
        //     this.search_txt_error = true
        // }
    },
    searchFirstLastName(srch_str: string) {
            // const people_array_tem = [] as any
            // const nameRegex = new RegExp(srch_str, 'i');
            // this.people_cpy.forEach((person: any) => {
            //     if (nameRegex.test(person.name) == true) {
            //         people_array_tem.push(person)
            //     }
            // })
            // this.people = people_array_tem;
      }
  },
});
</script>

<style scoped>
.person-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

ion-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px;
}

ion-card-subtitle {
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

.eye-icon {
  font-size: 1.2rem;
  color: var(--ion-color-success);
}

ion-icon {
  color: var(--ion-color-primary);
}

ion-item {
  --padding-start: 0;
}
.error-label {
    color: #b42318;
    text-transform: none;
    float: right;
}
</style>