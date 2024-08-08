<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <ion-grid style="margin-top: 30px; margin-left: 8%; margin-right: 8%;">
        <ion-row>
          <ion-col size="12">
            <iframe
                :src="reportUrl"
                width="100%"
                height="700px"
                frameborder="0"
            ></iframe>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Toolbar from '@/components/Toolbar.vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonContent,
} from "@ionic/vue";
import { getUserLocation } from "@/services/userService";
export default defineComponent({
  setup() {
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonPage,
    IonContent,
    Toolbar,
  },
  props: {
    resetList: {
      type: Number,
      required: true
    },
    items: {
      required: true
    }
  },
  data: () => ({
    reportUrl: '',
    facilityName: '',
    locationID: ''
  }),
  mounted() {
    this.loadUserFacilityDetails();
    console.log(this.loadUserFacilityDetails);
  },
  methods: {
    async loadUserFacilityDetails() {
      const data = await getUserLocation();
      // this.facilityName = `Facility name: ${data.name}`;
      this.locationID = data.location_id;
      this.updateReportUrl();
    },
    updateReportUrl() {
      this.reportUrl = `http://10.10.100.97:3001/public/dashboard/309f3a3a-56fa-4854-ad91-5b217054f487?tab=5-registrations&location=${this.locationID}&date_filter=&today=`;
    },

  }
});
</script>
