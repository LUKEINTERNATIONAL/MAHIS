<template>
    <basic-card :content="cardData"></basic-card>
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
      modalController 
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';

import DispositionModal from '@/components/ProfileModal/DispositionModal.vue'
import { createModal } from '@/utils/Alerts'
import { useRegistrationStore } from '@/stores/RegistrationStore'
import { mapState } from 'pinia';
import BasicCard from '../BasicCard.vue';

export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  BasicCard    },
  data() {
return {
  iconsContent: icons,
  cardData: {} as any
  
};
},
computed:{
    ...mapState(useRegistrationStore,["personInformation"]),
    ...mapState(useRegistrationStore,["socialHistory"]),
    ...mapState(useRegistrationStore,["homeLocation"]),
    ...mapState(useRegistrationStore,["currentLocation"]),
    ...mapState(useRegistrationStore,["guardianInformation"]),
},
watch: {
    personInformation: {
        handler(){
            this.updateRegistrationStores();
            this.buidCards()
        },
        deep: true
    }
},
mounted(){
    this.updateRegistrationStores()
    this.buidCards()
},
methods:{
    buidCards(){
        this.cardData ={
            mainTitle:"Demographics",
            cards:[
                {
                    cardTitle:"Personal information",
                    content: this.personInformation
                },
                {
                    cardTitle:"Social History",
                    content: this.socialHistory
                },
                {
                    cardTitle:"Home Location",
                    content: this.homeLocation
                },
                {
                    cardTitle:"Curent Location",
                    content: this.currentLocation
                },
                {
                    cardTitle:"Guardian information",
                    content: this.guardianInformation
                }
            ]
           } 
    },
    openModal(){
        createModal(DispositionModal)
    },
    updateRegistrationStores(){
        const registrationStore = useRegistrationStore()
        registrationStore.setPersonalInformation(this.personInformation)
        registrationStore.setSocialHistory(this.socialHistory)
        registrationStore.setHomeLocation(this.homeLocation)
        registrationStore.setCurrentLocation(this.currentLocation)
        registrationStore.setGuardianInformation(this.guardianInformation)
    }
}
});
</script>

<style scoped>
.demographics_title{
    font-weight: 700;
    font-size: 24px;
    padding-bottom: 20px;
}
.gender{
    display: flex;
    justify-content: space-between;
    max-width: 170px;
    padding-top: 10px;
}
.gender_title{
    margin-top: 30px;
}
</style>



