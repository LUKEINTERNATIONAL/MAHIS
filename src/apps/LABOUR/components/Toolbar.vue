<template>
    <ion-header :translucent="true" class="primary_color_background">
      <div class="content_manager" style="margin-top: unset;">
        <ion-toolbar  class="content_width primary_color_background">
          <ion-menu-button slot="start" />
          <ion-title style="cursor: pointer;" @click="nav('/home')"><b>MaHIS-MNH</b></ion-title>
          <ion-buttons slot="end" style="max-width: 500px;">
              <ToolbarSearch />
          </ion-buttons>
          <div class="notifaction_person" slot="end">
            <ion-buttons style="cursor: pointer;" slot="end" class="iconFont">
                <ion-icon :icon="notificationsOutline"></ion-icon>
                <ion-badge slot="start" class="badge">9</ion-badge>
            </ion-buttons>
            <ion-buttons style="cursor: pointer;" slot="end" @click="openPopover($event)" class="iconFont" id="popover-button">
                <ion-icon :icon="personCircleOutline"></ion-icon>
            </ion-buttons>
          </div>
          <ion-popover :is-open="popoverOpen" :show-backdrop="false" :dismiss-on-select="true" :event="event" @didDismiss="popoverOpen = false">
            <ion-content>
              <ion-list>
                <ion-item :button="true" :detail="false" style="cursor: pointer;">Profile</ion-item>
                <ion-item :button="true" :detail="false" @click="nav('/login')" style="cursor: pointer;">Logout</ion-item>
              </ion-list>
            </ion-content>
          </ion-popover>
        </ion-toolbar>
      </div>
    </ion-header>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle,IonIcon, IonToolbar,IonSearchbar,IonPopover } from '@ionic/vue';
  import { notificationsOutline,personCircleOutline } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import ToolbarSearch from "@/apps/ANC/components/ToolbarSearch.vue";
  export default defineComponent({
    name: "Home",
    components:{
        IonContent,
        IonHeader,
        // IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        ToolbarSearch,
        IonIcon,
        IonPopover
      },
      data() {
      return {
        popoverOpen: false,
        event: null as any,
      };
    },
      setup() {
      return { notificationsOutline,personCircleOutline };
    },
    methods :{
      nav(url:any){
        this.$router.push(url);
      },
      openPopover(e: Event){
        this.event = e;
        this.popoverOpen = true;
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
  .notifaction_person{
    display: flex;
    margin-left: 50px;
    margin-right: 20px;
    align-items: center;
/* justify-content: center; */
  }
  </style>
  