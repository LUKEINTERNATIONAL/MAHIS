<template>
    <ion-grid>
       <ion-row>
        <ion-col>
<<<<<<< HEAD
=======
            <router-link to="/profile">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Profile</ion-card-title>
    </ion-card-header>

    <ion-card-content>   
      <img src="../../public/icons/girl.png" alt="Profile Icon"/> 
    </ion-card-content>
  </ion-card>
</router-link>
        </ion-col>
        <ion-col>
>>>>>>> f04755f4fb731c32e5b7ab84da0d5bc3f8ca1dad
            <router-link to="/quickCheck">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Quick Check</ion-card-title>

    </ion-card-header>

    <ion-card-content> <img src="../../public/icons/checkup.png" alt="Profile Icon"/> </ion-card-content>
  </ion-card>
</router-link>
        </ion-col>

        <ion-col>
            <router-link to="/symptomsFollowUp">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Symptoms and follow up</ion-card-title>
     
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/symptom.png" alt="Profile Icon"/></ion-card-content>
  </ion-card>
</router-link>
        </ion-col>
        <ion-col>
            <router-link to="/labTests">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Lab tests and imaging</ion-card-title>
    
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/candidate.png" alt="Profile Icon"/> </ion-card-content>
  </ion-card>
</router-link>
        </ion-col>
       </ion-row>
       <ion-row>
        <ion-col>
            <router-link to="/physicalExamination">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Physical Examination</ion-card-title>
      
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/heart.png" alt="Profile Icon"/></ion-card-content>
  </ion-card>
</router-link>
        </ion-col>
        <ion-col>
            <router-link to="/counselling">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Counselling</ion-card-title>
    
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/conversation.png" alt="Profile Icon"/> </ion-card-content>
  </ion-card>
  </router-link>
        </ion-col>
        <ion-col>
            <router-link to="/ANCtreatment">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Treatment and prevention</ion-card-title>
      
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/patient.png" alt="Profile Icon"/></ion-card-content>
  </ion-card>
</router-link>
        </ion-col>
 
       </ion-row>

       <ion-row>
        <ion-col>
            <router-link to="ANCreferral">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>Referral</ion-card-title>
   
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/hospital.png" alt="Profile Icon"/> </ion-card-content>
  </ion-card>
</router-link>
        </ion-col>
        <ion-col>
            <router-link to="/ancEnd">
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>ANC End</ion-card-title>
     
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/bed.png" alt="Profile Icon"/> </ion-card-content>
  </ion-card>
   </router-link>
        </ion-col>
        <ion-col>
            <ion-card color="secondary">
    <ion-card-header>
      <ion-card-title>User Management</ion-card-title>
    
    </ion-card-header>

    <ion-card-content>  <img src="../../public/icons/user-settings.png" alt="Profile Icon"/> </ion-card-content>
  </ion-card>
        </ion-col>
       </ion-row>
    </ion-grid>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { 
            IonContent, 
            IonHeader,
            IonImg,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            IonRadio,
            IonRadioGroup,
            IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonGrid
        } from '@ionic/vue';
import BasicForm from '../../../../components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 


export default defineComponent({
    name:"Home",
    components:{   
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            IonImg,
            BasicForm,
            IonRadio,
            IonRadioGroup,
            IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid },
    data(){
        return {
            iconsContent: icons,
        }
    },
    computed:{
       

    },
    mounted(){
      
    },
    watch:{
    
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
   
    }
})


</script>

<style scoped>
ion-grid {
text-align: center;
position: absolute;
margin-left: 10em;
left: 0;
right: 0;
top: 50%;
transform: translateY(-50%);
}

.section {
  width: 100%;
  max-width: 1300px; 
  margin-bottom: 20px;
}

 ion-card {
    width: 25em;
    height: 13em;
} 

ion-card:hover {
  animation: bounce 0.3s ease-in-out;
  cursor: pointer; 
}

@keyframes bounce {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; 
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
img {
    width: 20%;
    height: 10%;
    object-fit:inherit;
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}
</style>
