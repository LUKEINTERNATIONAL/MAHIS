<template>
    <ion-menu side="start" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item @click="navigationMenu('home')">Home</ion-item>
                <ion-item @click="navigationMenu('consultationPlan')">Consultation</ion-item>
                <ion-item @click="navigationMenu('report')">Reports</ion-item>
                <ion-item @click="navigationMenu('profile')">Profile</ion-item>
                <ion-item @click="navigationMenu('settings')">Settings</ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>
  
<script lang="ts">
    import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            menuController 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';

    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        }
        
    }
    });
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
</style>
  