<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button  v-if="can_GoBack" @click="goto(backwardsPath)">
          <ion-icon :icon="arrowBack"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ comp_title }}</ion-title>
      <ion-title style="font-size: 17px;">{{ navSubTitle }}</ion-title>
      <ion-buttons slot="end">
        <ion-button v-if="can_GoForward" @click="goForward">
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
          comp_title: '',
          can_GoBack: true,
          can_GoForward: false,
          back_Href: '/',
          navSubTitle: '',
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
  async mounted() {
    this.initNavData()
  },
  watch: {
    navigationPayload: {
          handler() {
              this.initNavData()
          },
          deep: true,
      },
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
    },
    initNavData() {
      this.comp_title = this.navigationPayload.title
      this.can_GoBack = this.navigationPayload.canGoBack
      this.can_GoForward =  this.navigationPayload.canGoForward
      this.back_Href = this.navigationPayload.backHref,
      this.backwardsPath = this.navigationPayload.previousRoute
      this.navSubTitle = this.navigationPayload.subTxt
    }
  },
});
</script>