<template>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-menu-button slot="start" />
        <ion-title><b>NCD EMR</b></ion-title>
        <ion-buttons slot="end">
            <ToolbarSearch @search="performSearch" />
        </ion-buttons>
        <ion-buttons slot="end" class="iconFont">
            <ion-icon :icon="notificationsOutline"></ion-icon>
        </ion-buttons>
        <ion-buttons slot="end" class="iconFont">
            <ion-icon :icon="personCircleOutline"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle,IonIcon, IonToolbar,IonSearchbar } from '@ionic/vue';
  import { notificationsOutline,personCircleOutline } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  export default defineComponent({
    name: "Home",
    components:{
        IonContent,
        IonHeader,
        IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        ToolbarSearch,
        IonIcon
      },
      setup() {
      return { notificationsOutline,personCircleOutline };
    },
    })
  </script>
  
  <style scoped>
  #container {
    text-align: center;
    
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    
    color: #8c8c8c;
    
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  .iconFont{
    font-size: 30px;
    margin-left: 30px;
    margin-right: 30px;
  }
  </style>
  