<template>
        <ion-grid>
          <ion-row>
            <ion-col size-xs="12" size-sm="6" size-md="4" size-lg="3" v-for="user in users" :key="user.userid">
              <ion-card>
                <ion-card-header>
                  <ion-card-subtitle>{{ user.role }}</ion-card-subtitle>
                  <ion-card-title>{{ user.firstName }} {{ user.lastName }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-list>
                    <ion-item>
                      <ion-label>
                        <h3>User ID</h3>
                        <p>{{ user.userid }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Username</h3>
                        <p>{{ user.username }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Gender</h3>
                        <p>{{ user.gender }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Programs</h3>
                        <p>{{ user.programs.join(', ') }}</p>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { 
    IonContent, 
    IonPage, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardContent,
    IonList,
    IonItem,
    IonLabel
  } from '@ionic/vue';
  
  interface User {
    userid: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    role: string;
    programs: string[];
  }
  
  export default defineComponent({
    name: 'UserCardList',
    components: { 
      IonContent, 
      IonPage, 
      IonGrid, 
      IonRow, 
      IonCol, 
      IonCard, 
      IonCardHeader, 
      IonCardSubtitle, 
      IonCardTitle, 
      IonCardContent,
      IonList,
      IonItem,
      IonLabel
    },
    props: {
      users: {
        type: Array as () => User[],
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  ion-card {
    margin-bottom: 1rem;
  }
  
  ion-card-content {
    padding-top: 0;
  }
  
  ion-list {
    padding: 0;
  }
  
  @media (max-width: 576px) {
    ion-card-title {
      font-size: 1.2rem;
    }
    
    ion-card-subtitle {
      font-size: 0.9rem;
    }
  }
  </style>