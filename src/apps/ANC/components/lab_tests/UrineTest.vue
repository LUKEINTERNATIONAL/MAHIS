<template>
    <div class="container">
        <ion-card v-if="currentSection === 0" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="urineTest"></basic-form>
                <basic-form :contentData="testType"></basic-form>
                 <basic-form :contentData="reason"></basic-form>
                  <basic-form :contentData="culture"></basic-form>
                   <basic-form :contentData="gram"></basic-form>
                   <basic-form :contentData="nitrites"></basic-form>
                   <basic-form :contentData="leukocytes"></basic-form>
                    <basic-form :contentData="protein"></basic-form>
                    <basic-form :contentData="glucose"></basic-form>
            </ion-card-content>
    </ion-card>

<<<<<<< HEAD
    <!-- <ion-card v-if="currentSection === 1" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header">Reason urine test not done</ion-card-title></ion-card-header>
=======
    <ion-card v-if="currentSection === 1" class="section">
            <ion-card-header> <ion-card-title class="sub_item_header">Reason urine test not done</ion-card-title></ion-card-header>
>>>>>>> e57f0de82302c77f3001a5843149cc3fbbb90319
            <ion-card-content>
               
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 2" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
               
            </ion-card-content>
    </ion-card>


    <ion-card v-if="currentSection === 3" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
               
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 4" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 5" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 6" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
               
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 7" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                
            </ion-card-content>
    </ion-card> -->

        <!-- Navigation Buttons -->
    <!-- <div class="navigation-buttons">
      <ion-button @click="goToPreviousSection" expand="block" color="primary" size="medium">Previous</ion-button>
      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Next</ion-button>
    </div>  -->
    
    
  
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonRow,
            IonToolbar, 
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            IonRadio,
            IonRadioGroup
        } from '@ionic/vue';
import {useUrineTestStore} from '@/apps/ANC/store/UrineTestStore'
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 

export default defineComponent({
    name:"UrineTest",
    components:{   
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonRow,
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            BasicForm,
            IonRadio,
            IonRadioGroup,},
    data(){
        return {
            iconsContent: icons,
          urineTestInstance: {} as any,
          currentSection: 0, // Initialize currentSection to 0
        }
    },
    computed:{
        ...mapState(useUrineTestStore, ["reason"]),
        ...mapState(useUrineTestStore, ["testType"]),
        ...mapState(useUrineTestStore, ["urineTest"]),
        ...mapState(useUrineTestStore, ["protein"]),
        ...mapState(useUrineTestStore, ["nitrites"]),
        ...mapState(useUrineTestStore, ["culture"]),
        ...mapState(useUrineTestStore, ["gram"]),
        ...mapState(useUrineTestStore, ["leukocytes"]),
        ...mapState(useUrineTestStore, ["glucose"]),

    },
    mounted(){
        const urineTests = useUrineTestStore()
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
                //Method for navigating sections
    // goToNextSection() {
    //   if (this.currentSection < 7) {
    //     this.currentSection++;
    //   }
    // },
    // goToPreviousSection() {
    //   if (this.currentSection > 0) {
    //     this.currentSection--;
    //   }
    // },
    }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px; 
  margin-bottom: 20px;
}

ion-card {
 box-shadow:none;
  background-color:inherit;   
  width: 100%;
 color: black;
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
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}



</style>