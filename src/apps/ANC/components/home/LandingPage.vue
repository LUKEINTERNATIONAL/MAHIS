<template>
    <ion-grid>
       <ion-row>
        <ion-col>
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
           <router-link to="/profile">
             <ion-card color="secondary">
               <ion-card-header>
                 <ion-card-title>Profile</ion-card-title>

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

<!-- <style scoped>
ion-grid {
text-align: center;
position: absolute;
margin-left: 10em;
width: 100%;
top: 50%;
transform: translateY(-50%);
}

@media (min-width: 1300px) {
  ion-grid {
    margin-left: 4rem;
    top: 2rem;
    max-width: 1470px;
  }

 ion-card{
   width: 21em !important;
   height: 12em !important;
   max-width: 1470px;
  }
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
</style> -->

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.section {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 300px;
  margin: 10px;
}

.card:hover {
  animation: bounce 0.3s ease-in-out;
  cursor: pointer;
}

@keyframes bounce {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

img {
  width: 70%;
  max-width: 70px;
  height: auto;
}

@media (max-width: 768px) {
  .section {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
  }
}
</style>