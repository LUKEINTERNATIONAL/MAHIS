<template>
    <ion-header :translucent="true" class="primary_color_background">
      <ion-toolbar  class="position_content primary_color_background">
        <ion-menu-button slot="start" />
        <ion-title><b>NCD EMR</b></ion-title>
        <ion-buttons slot="end">
            <ToolbarSearch @search="performSearch" />
        </ion-buttons>
        <ion-buttons slot="end" class="iconFont">
            <ion-icon :icon="notificationsOutline"></ion-icon>
            <ion-badge slot="start" class="badge">91</ion-badge>
        </ion-buttons>
        <ion-buttons slot="end" class="iconFont" id="popover-button">
            <ion-icon :icon="personCircleOutline"></ion-icon>
        </ion-buttons>
        <ion-popover trigger="popover-button" :show-backdrop="false" :dismiss-on-select="true">
          <ion-content>
            <ion-list>
              <ion-item :button="true" :detail="false" >Profile</ion-item>
              <ion-item :button="true" :detail="false" @click="openLogout">Logout</ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle,IonIcon, IonToolbar,IonSearchbar,IonPopover } from '@ionic/vue';
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
        IonIcon,
        IonPopover
      },
      setup() {
      return { notificationsOutline,personCircleOutline };
    },
    methods :{
      openLogout(){
        this.$router.push("/login");
      }
    }
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
  .badge{
    position: relative;
    background: #c82424;
    border: 2px solid #fff;
    border-radius: 50%;
    min-width: 25px;
    padding: 5px;
    display: inline-block;
    font-size: 10px;
    text-align: center;
    top: -12px;
    left: -18px;
    color: #fff;
  }
  </style>
  