<template>
  <ion-page>
    <NavigationMenu/>
    <ion-content class="ion-padding">
      <EIR_Report_Template/>
      <AEFIReportTemplate/>
    </ion-content>
  </ion-page>

  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonContent , IonPage, IonRow, IonCol } from '@ionic/vue';
  import NavigationMenu from './NavigationMenu.vue';
  import AEFIReportTemplate from "./AEFIReportTemplate.vue"
  import EIR_Report_Template from "./EIR_Report_Template.vue"
  
  export default defineComponent({
    name: 'TableComponent',
    components: { IonContent, IonPage, NavigationMenu, AEFIReportTemplate, EIR_Report_Template, IonRow, IonCol },
    data() {
      return {

      };
    },
    watch: {

    },
    computed: {
      
    },
    async mounted() {

  },
    methods: {

    },
  });
  </script>
  
  <style scoped>
  ::v-deep(ion-content) {
      --background: white;
  }
  
  </style>
  