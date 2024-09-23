<template>
  <ion-header>
    <ion-row>
      <ion-col style="padding: 1px;">
        <ion-title class="modalTitle">{{ headingText }}</ion-title>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col style="margin-left: 10px; margin-right: 10px;">
        <BasicInputField
          placeholder="Find client"
          :icon="searchOutline"
          :inputValue="searchText"
          @update:inputValue="searchTextUpdated"
          :minHeight="40"
        />
        <div>
          <ion-label v-if="searchTextError" class="error-label">
            Only letters allowed
          </ion-label>
        </div>
      </ion-col>
    </ion-row>
  </ion-header>

  <ion-content :fullscreen="true" class="ion-padding">
    <div v-if="isLoading" class="loading-spinner">
      <ion-spinner name="crescent"></ion-spinner>
    </div>

    <div v-else-if="error" class="error-message">
      <ion-icon :icon="alertCircleOutline"></ion-icon>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="paginatedItems.length === 0" class="no-results">
      <p>No results found</p>
    </div>

    <div v-else style="overflow-y: auto;">
      <ion-row>
        <ion-col style="width: 900px;"v-for="person in paginatedItems" :key="person.id">
          <ion-card class="person-card">
            <ion-card-content class="person-card-23">
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
    </div>


  </ion-content>

  <ion-footer collapse="fade" class="ion-no-border">
    <ion-row>
      <ion-col>
        <bottomNavBar
          v-if="displayPeople.length > 0"
          style="margin-left: 20px; margin-right: 20px;"
          :totalItems="displayPeople.length" 
          :currentPage="pagination.page"
          :itemsPerPage="pagination.itemsPerPage"
          @update:pagination="handlePaginationUpdate"
        />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="dismiss()"> Cancel </ion-button>
      </ion-col>
    </ion-row>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, watch } from 'vue';
import { IonGrid, IonRow, IonCol, IonCard, IonContent, IonCardContent, IonFooter, IonCardTitle, IonHeader, IonTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon, modalController, IonSpinner } from '@ionic/vue';
import { calendarOutline, personOutline, locationOutline, eyeOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';
import BasicInputField from "@/components/BasicInputField.vue"
import HisDate from "@/utils/Date";
import bottomNavBar from "@/apps/Immunization/components/bottomNavBar.vue";

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
    IonGrid, IonRow, bottomNavBar, IonCol, BasicInputField, IonContent, IonCard, IonHeader, IonFooter, IonTitle, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon, IonSpinner
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
    const isLoading = ref(false);
    const error = ref('');
    const pagination = reactive({
      page: 1,
      itemsPerPage: 6
    });

    const displayPeople = computed(() => {
      if (!searchText.value) return props.people;
      const nameRegex = new RegExp(searchText.value, 'i');
      return props.people.filter(person => 
        nameRegex.test(person.given_name) || nameRegex.test(person.family_name)
      );
    });

    const paginatedItems = computed(() => {
      const start = (pagination.page - 1) * pagination.itemsPerPage;
      const end = start + pagination.itemsPerPage;
      return displayPeople.value.slice(start, end);
    });

    const isValidString = (input: string): boolean => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(input);
    };

    const searchTextUpdated = (event: Event) => {
      const target = event.target as HTMLInputElement;
      searchText.value = target.value;
      searchTextError.value = !isValidString(searchText.value);
      pagination.page = 1; // Reset to first page when search changes
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

    const handlePaginationUpdate = ({ page, itemsPerPage }: { page: number, itemsPerPage: number }) => {
      pagination.page = page;
      pagination.itemsPerPage = itemsPerPage;
    };

    // Simulating an API call to fetch data
    const fetchData = async () => {
      isLoading.value = true;
      error.value = '';
      try {
        // Simulating an API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // If the API call was real, we would update props.people here
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        error.value = 'Failed to fetch data. Please try again.';
        console.error('Error fetching data:', err);
      }
    };

    onMounted(() => {
      fetchData();
    });

    // Reset page when search changes
    watch(searchText, () => {
      pagination.page = 1;
    });

    return {
      calendarOutline,
      personOutline,
      locationOutline,
      eyeOutline,
      searchOutline,
      alertCircleOutline,
      searchText,
      searchTextError,
      isLoading,
      error,
      displayPeople,
      paginatedItems,
      getBirthdateAge: HisDate.getBirthdateAge,
      searchTextUpdated,
      viewPatientProfile,
      dismiss,
      handlePaginationUpdate,
      pagination,
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

.loading-spinner, .error-message, .no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  flex-direction: column;
}

.error-message ion-icon {
  font-size: 48px;
  color: var(--ion-color-danger);
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

  .person-card-23 {
    min-width: 30rem;
  }
}

.person-card-23 {
    min-width: 30rem;
  }

.modalTitle {
  font-size: 17px;
  padding: 0px;
  margin-left: 16px
}
</style>