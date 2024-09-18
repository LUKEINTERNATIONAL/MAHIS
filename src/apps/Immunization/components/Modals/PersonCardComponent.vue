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
                <ion-card-title>{{ person.given_name }} {{ person.family_name }}</ion-card-title>
                <ion-label style="font-size: 17px;">{{ getBirthdateAge(person.birthdate) }}</ion-label>
              </div>
              <ion-icon :icon="eyeOutline" class="eye-icon"></ion-icon>
            </div>
            <ion-list lines="none" style="border-radius: 6px;">
              <ion-item class="p-inf">
                <ion-icon :icon="personOutline" slot="start"></ion-icon>
                <ion-label>Gender: {{ person.gender }}</ion-label>
              </ion-item>
              <hr class="solid-line">

              <ion-item  class="p-inf">
                <ion-icon :icon="locationOutline" slot="start"></ion-icon>
                <ion-label>Village: {{ person.city_village }}</ion-label>
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
import { IonGrid, IonRow, IonCol, IonCard, IonContent, IonCardContent, IonFooter, IonCardTitle, IonHeader, IonTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon, modalController } from '@ionic/vue';
import { calendarOutline, personOutline, locationOutline, eyeOutline, searchOutline } from 'ionicons/icons';
import BasicInputField from "@/components/BasicInputField.vue"
import HisDate from "@/utils/Date";

export default defineComponent({
  name: 'PersonCardComponent',
  components: {
    IonGrid, IonRow, IonCol, BasicInputField, IonContent, IonCard, IonHeader, IonFooter, IonTitle, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon
  },
  props: {
    people: {
      type: Array as () => any[],
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
    getBirthdateAge(dateString: string) {
      return HisDate.getBirthdateAge(dateString)
    },
    dismiss() {
      try {
        modalController.dismiss()
      } catch (error) {
        
      }
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
  font-size: 1.8rem;
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
  border-top: 1px solid black; /* Adjust thickness and color */
  width: 90%;  /* Line length */
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>