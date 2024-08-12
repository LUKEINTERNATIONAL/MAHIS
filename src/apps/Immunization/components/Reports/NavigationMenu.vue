<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button  v-if="canGoBack" @click="goto(backwardsPath)">
          <ion-icon :icon="arrowBack"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button v-if="canGoForward" @click="goForward">
          <ion-icon :icon="arrowForward"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon } from '@ionic/vue';
import { arrowForward, arrowBack } from 'ionicons/icons';
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import { mapState } from "pinia";

export default defineComponent({
  name: 'NavigationMenu',
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon
  },
  data() {
      return {
          backwardsPath: '',
      }
  },
  props: {
    title: {
      type: String,
      default: 'Months List'
    },
    canGoBack: {
      type: Boolean,
      default: true
    },
    canGoForward: {
      type: Boolean,
      default: false
    },
    backHref: {
      type: String,
      default: '/'
    }
  },
  computed: {
    ...mapState(EIRreportsStore, ["navigationPayload"]), 
  },
  setup() {
    const goForward = () => {
      // Implement your forward navigation logic here
      console.log('Navigate forward');
    };

    return {
      arrowBack,
      arrowForward,
      goForward
    };
  },
  methods: {
    goto(url: string) {
      this.$router.push(url)
    }
  },
});
</script>