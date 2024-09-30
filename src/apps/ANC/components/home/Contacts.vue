<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <div class="container">
        <ion-grid class="ion-grid">
          <div class="back_profile">
            <DynamicButton
                name="Back"
                iconSlot="start"
                fill="clear"
                :icon="chevronBackOutline()"
                @click="backToANChome"
            />
          </div>
          <ion-row class="card-row">
            <ion-col
                v-for="(card, index) in cardsData"
                :key="index"
                size-xs="6"
                size-sm="6"
                size-md="4"
                size-lg="4"
                size-xl="4"
            >
              <ion-card
                  :color="card.isSaved ? 'success' : 'secondary'"
                  :class="{ 'card-saved': card.isSaved }"
                  @click="!card.isSaved && navigateTo(card.path)"
              >
                <ion-card-header>
                  <ion-card-title class="ion-title">
                    {{ card.title }}
                    <ion-icon
                        v-if="card.isSaved"
                        :icon="checkmarkCircle()"
                        class="check-icon"
                    ></ion-icon>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-icon :icon="card.icon" :style="{ color: card.color, fontSize: '30px' }"></ion-icon>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonPage
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import Toolbar from "@/components/Toolbar.vue";
import {
  checkmarkCircle,
  personCircle,
  alertCircle,
  heart,
  flask,
  medkit,
  chatbubbles,
  people,
  bed,
  chevronBackOutline, pulse
} from "ionicons/icons";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import DynamicButton from "@/components/DynamicButton.vue";
export default defineComponent({
  name: 'Home',
  components: {
    DynamicButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    Toolbar,
    DemographicBar,
    IonPage
  },
  props:{
    backBtn: {
      type: String,
      default: "Back",
    },
  },
  setup() {
    const router = useRouter();

    const navigateTo = (path: string) => {
      router.push({ path });
    };
    const cardsData = [
      { title: "Quick Check", path: "/quickCheck", icon: pulse, color: "grey", isSaved: false },
      { title: "Profile", path: "/profile", icon: personCircle, color: "grey" },
      { title: "Symptoms and Follow Up", path: "/symptomsFollowUp", icon: alertCircle, color: "grey" , isSaved: false},
      { title: "Physical Examination", path: "/physicalExamination", icon: heart, color: "grey" , isSaved: false},
      { title: "Lab Tests and Imaging", path: "/labTests", icon: flask, color: "grey" , isSaved: false},
      { title: "Treatment and Prevention", path: "/ANCtreatment", icon: medkit, color: "grey" , isSaved: false},
      { title: "Counselling", path: "/counselling", icon: chatbubbles, color: "grey" , isSaved: false},
    ];

    return {
      navigateTo,
      cardsData,
    };
  },
  methods: {
    checkmarkCircle() {
      return checkmarkCircle
    },
    chevronBackOutline() {
      return chevronBackOutline
    },
    backToANChome() {
      this.$router.push('/ANCHome');
    },
    submitDataForCard(index:any) {
      // Submit your data logic here
      // Example: this.cardsData[index].isSaved = true;
      this.cardsData[index].isSaved = true; // Setting the card as saved
    }
  }
});
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.section {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

ion-card-title {
  font-size: 14px;
}
.ion-grid {
  margin-top:-5%;
  padding-left: 300px;
  padding-right: 300px;
}


ion-card {
  width: 200px;
  margin: 8px;
}
.back_profile {
  display: flex;
  justify-content: start;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  z-index: 1000;

}

.card:hover {
  animation: bounce 0.3s ease-in-out;
  cursor: pointer;
}

@keyframes bounce {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

ion-icon {
  width: 40px;
  height: 40px;
}
.card-saved {
  border: 2px solid green; /* Adds a green border to saved cards */
  opacity: 0.7; /* Optional: makes the card slightly transparent when saved */
}
.check-icon {
  color: green; /* Color for the checkmark icon */
  margin-left: 10px;
}

@media (max-width: 768px) {
  .section {
    flex-direction: column;
    align-items: center;
    .ion-grid {
      top:7000%;
    }
  }
  .back_profile {
    justify-content: start;
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    z-index: 1000;

  }

  .ion-grid {
    margin-top:35%;
    padding-left: 10px;
    padding-right: 10px;
  }

  .card {
    width: 90%;
  }
}
</style>

