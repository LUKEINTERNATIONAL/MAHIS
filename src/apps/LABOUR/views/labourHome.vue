<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <div class="container">
        <ion-grid class="ion-grid">
          <div class="back_profile">
            <DynamicButton
                name="Back to profile"
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
  chevronBackOutline, pulse, checkmarkDone, notificationsOutline, documentText, medical
} from "ionicons/icons";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import {ObservationService} from "@/services/observation_service";
import {mapState} from "pinia";
import {useScheduleNextAppointmentStore} from "@/apps/ANC/store/others/scheduleNextAppointment";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {useObstreticHistoryStore} from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
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
  data(){
    return{
      gravida:'',
    }
  },
  setup() {
    const router = useRouter();

    const navigateTo = (path: string) => {
      router.push({ path });
    };
    const cardsData = [
      { title: "Labour assessment", path: "/labourAssessment", icon: medical, color: "grey", isSaved: false },
      { title: "Delivery details", path: "/labourDeliveryDetails", icon: documentText, color: "grey" },
      { title: "Immediate postnatal checks", path: "/postnatalChecks", icon: checkmarkCircle, color: "grey", isSaved: false },
      { title: "Continuous monitoring", path: "/continuousMonitoring", icon: notificationsOutline, color: "grey", isSaved: false },
      { title: "Referral", path: "/labourReferral", icon: people, color: "grey", isSaved: false },
      { title: "End labour program", path: "/labourEnd", icon: checkmarkDone, color: "grey", isSaved: false },
    ];


    return {
      navigateTo,
      cardsData,
    };
  },
  computed: {
    ...mapState(useObstreticHistoryStore, ["prevPregnancies"]),
    ...mapState(useDemographicsStore, ["demographics","patient"])

  },
  mounted(){
    this.handleProfile();
  },
  methods: {
    checkmarkCircle() {
      return checkmarkCircle
    },
    chevronBackOutline() {
      return chevronBackOutline
    },
    backToANChome() {
      this.$router.push('/patientProfile');
    },

    async handleProfile(){
      const gravida = await ObservationService.getFirstObsValue(this.demographics.patient_id,"Gravida", "value_text");
      this.gravida = gravida;
    },
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
    margin-top:20%;
    padding-left: 10px;
    padding-right: 10px;
  }

  .card {
    width: 90%;
  }
}
</style>

