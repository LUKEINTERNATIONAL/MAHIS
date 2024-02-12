<template>
    <basic-card :content="cardData" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-card>
</template>

<script lang="ts">
import { 
      IonContent, 
      IonHeader,
      IonItem,
      IonList,
      IonTitle, 
      IonToolbar, 
      IonMenu
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import DispositionModal from '@/components/ProfileModal/OutcomeModal.vue'
import { createModal } from '@/utils/Alerts'
import { useRegistrationStore } from '@/stores/RegistrationStore'
import { mapState } from 'pinia';
import BasicCard from '../BasicCard.vue';
import HisDate from "@/utils/Date";
import { getFieldValue,getRadioSelectedValue } from '@/services/data_helpers'
import { validateField } from '@/services/validation_service'

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
  BasicCard
      },
  data() {
return {
  cardData: {} as any,
  inputField: '' as any,
  setName: '' as any
  
};
},
computed:{
    ...mapState(useRegistrationStore,["personInformation"]),
    nationalID(){ return getFieldValue(this.personInformation, 'nationalID','value')},
    firstname(){ return getFieldValue(this.personInformation, 'firstname','value')},
    lastname(){ return getFieldValue(this.personInformation, 'lastname','value')},
    middleName(){ return getFieldValue(this.personInformation, 'middleName','value')},
    gender(){ return getRadioSelectedValue(this.personInformation, 'gender')},
    birthdate(){ return HisDate.toStandardHisFormat(getFieldValue(this.personInformation, 'birthdate','value'))},
    birthdateEstimated(){ return 'false'},
    phoneNumber(){ return getFieldValue(this.personInformation, 'phoneNumber','value')} 
},
async mounted(){
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
    },
   

    validationRules(event: any) {
        return validateField(this.personInformation,event.name, this[event.name]);
    },

    async handleInputData(event: any) {
        this.validationRules(event)
    },
}
});
</script>

<style scoped>
.demographics_title{
    font-weight: 700;
    font-size: 24px;
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



