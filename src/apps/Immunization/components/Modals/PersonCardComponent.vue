<template>
  <ion-header>
    <ion-row>
      <ion-col>
        <ion-title class="modalTitle">{{ headingText }}</ion-title>
      </ion-col>
    </ion-row>
  </ion-header>

  <ion-content :fullscreen="true" class="ion-padding">
    <ion-row>
      <ion-col style="margin-left: 10px; margin-right: 10px;">
        <BasicInputField
          placeholder="Find client"
          :icon="searchOutline"
          :inputValue="searchText"
          @update:inputValue="searchTextUpdated"
        />
        <div>
          <ion-label v-if="searchTextError" class="error-label">
            Only letters allowed
          </ion-label>
        </div>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col v-for="person in displayPeople" :key="person.id">
        <ion-card class="person-card">
          <ion-card-content>
            <div class="card-header">
              <div>
                <ion-card-title>{{ person.given_name }} {{ person.family_name }}</ion-card-title>
                <ion-label style="font-size: 17px;">{{ getBirthdateAge(person.birthdate) }}</ion-label>
              </div>
              <ion-icon :icon="eyeOutline" @click="viewPatientProfile(person.patient_id)" class="eye-icon" aria-label="View patient profile"></ion-icon>
            </div>
            <ion-list lines="none" style="border-radius: 6px;">
              <ion-item class="p-inf">
                <ion-icon :icon="personOutline" slot="start" aria-hidden="true"></ion-icon>
                <ion-label> <span class="s-inf">Gender:</span> {{ person.gender }}</ion-label>
              </ion-item>
              <hr class="solid-line">
              <ion-item class="p-inf">
                <ion-icon :icon="locationOutline" slot="start" aria-hidden="true"></ion-icon>
                <ion-label> <span class="s-inf">Village:</span> {{ person.city_village }}</ion-label>
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
import { defineComponent, ref, computed } from 'vue';
import { IonGrid, IonRow, IonCol, IonCard, IonContent, IonCardContent, IonFooter, IonCardTitle, IonHeader, IonTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon, modalController } from '@ionic/vue';
import { calendarOutline, personOutline, locationOutline, eyeOutline, searchOutline } from 'ionicons/icons';
import BasicInputField from "@/components/BasicInputField.vue"
import HisDate from "@/utils/Date";

interface Person {
  id: string;
  patient_id: string;
  given_name: string;
  family_name: string;
  birthdate: string;
  gender: string;
  city_village: string;
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
    headingText: {
      type: String,
      required: true,
      default: "Provide heading text",
    }
  },
  setup(props) {
    const searchText = ref('');
    const searchTextError = ref(false);

    const displayPeople = computed(() => {
      if (!searchText.value) return props.people;
      const nameRegex = new RegExp(searchText.value, 'i');
      return props.people.filter(person => 
        nameRegex.test(person.given_name) || nameRegex.test(person.family_name)
      );
    });

    const isValidString = (input: string): boolean => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(input);
    };

    const searchTextUpdated = (event: Event) => {
      const target = event.target as HTMLInputElement;
      searchText.value = target.value;
      searchTextError.value = !isValidString(searchText.value);
    };

    const viewPatientProfile = async (clientId: string) => {
      try {
        const modal = await modalController.getTop();
        if (modal) {
          modal.dispatchEvent(new CustomEvent('view-client', { detail: { client_id: clientId } }));
        }
      } catch (error) {
        console.error('Error viewing patient profile:', error);
      }
    };

    const dismiss = async () => {
      try {
        await modalController.dismiss();
      } catch (error) {
        console.error('Error dismissing modal:', error);
      }
    };

    return {
      calendarOutline,
      personOutline,
      locationOutline,
      eyeOutline,
      searchOutline,
      searchText,
      searchTextError,
      displayPeople,
      getBirthdateAge: HisDate.getBirthdateAge,
      searchTextUpdated,
      viewPatientProfile,
      dismiss
    };
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
  font-size: 1.8rem;
  cursor: pointer;
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

.p-inf {
  margin-left: 30px;
}

.solid-line {
  border: none;
  border-top: 1px solid black;
  width: 90%;
  margin: 0 10px;
}

.s-inf {
  font-size: 16px; 
  color: gray;
}

@media (max-width: 768px) {
  .person-card {
    margin-bottom: 8px;
  }

  ion-card-title {
    font-size: 1rem;
  }

  .s-inf {
    font-size: 14px;
  }
}
</style>