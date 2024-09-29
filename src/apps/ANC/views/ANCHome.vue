<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <div class="container">
        <div class="back_profile">
          <DynamicButton
              :name="backBtn"
              iconSlot="start"
              fill="clear"
              :icon="chevronBackOutline()"
              @click="openBackController()"
          />
        </div>

        <div class="button-container">
          <DynamicButton
              name="New ANC contact"
              iconSlot="start"
              fill="solid"
              :icon="checkmark"
              @click="navigateToContact"
          />
          <DynamicButton
              name="View ANC contacts"
              iconSlot="start"
              fill="solid"
              :icon="eye()"
          />
          <DynamicButton
              name="Schedule next contact"
              iconSlot="start"
              fill="solid"
              :icon="calendar()"
          />
        </div>

        <hr />
        <LandingPage/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonContent,
  IonPage
} from '@ionic/vue';
import {calendar, checkmark, chevronBackOutline, eye, pulseOutline} from 'ionicons/icons';
import Toolbar from "@/components/Toolbar.vue";
import DemographicBar from '../components/DemographicBar.vue';
import LandingPage from "@/apps/ANC/components/home/LandingPage.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import {createModal, toastDanger} from "@/utils/Alerts";
import SaveProgressModal from "@/components/SaveProgressModal.vue";

export default defineComponent({
  name: "TB screening",
  components: {
    DynamicButton,
    IonContent,
    IonPage,
    Toolbar,
    DemographicBar,
    LandingPage
  },
  props: {
    backBtn: {
      type: String,
      default: "Back to profile",
    },
    backUrl: {
      type: String,
      default: "",
    },
    contact:{
      type:String,
      default:""
    }
  },
  setup() {
    return { checkmark, pulseOutline };
  },
  methods: {
    calendar() {
      return calendar
    },
    eye() {
      return eye
    },
    chevronBackOutline() {
      return chevronBackOutline;
    },
    openBackController() {
      if (this.backUrl) {
        this.$router.push(this.backUrl);
      } else {
        createModal(SaveProgressModal);
      }
    },
    navigateToContact() {
      this.$router.push('/contact');
    }

  }
})
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 35%;
  transform: translateY(-50%);
}

.back_profile {
  display: flex;
  justify-content: start;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  z-index: 1000;
  padding-left: 25%;

}
ion-card {
  width: 300px;
  margin: 8px;
}

.button-container {
  display: block;
  justify-content: space-around;
  margin: 10px 0;
}

.dynamic-button {
  flex: 1;
  margin: 0 5px;
  min-width: 120px;
}

@media (max-width: 768px) {
  .dynamic-button {
    margin: 0 15px;
  }
  .container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 43%;
    transform: translateY(-50%);
  }
  ion-card {
    width: 400px;
    margin: 4px;
  }
  .button-container {
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
  }
  .back_profile {
    display: flex;
    justify-content: start;
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    z-index: 1000;
   padding-left: 1%;
  }
}

hr {
  margin: 20px 0;
  border: 2px solid #ccc;
}
</style>
