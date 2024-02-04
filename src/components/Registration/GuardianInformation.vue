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
import DispositionModal from '@/components/ProfileModal/DispositionModal.vue'
import { createModal } from '@/utils/Alerts'
import { useRegistrationStore } from '@/stores/RegistrationStore'
import { mapState } from 'pinia';
import BasicCard from '../BasicCard.vue';
import {LocationService} from "@/services/location_service"
import Validation from "@/validations/StandardValidations"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import HisDate from "@/utils/Date";
import { modifyFieldValue,getFieldValue,getRadioSelectedValue } from '@/services/data_helpers'
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
  setName: '' as any,
  
};
},
computed:{
    ...mapState(useRegistrationStore,["guardianInformation"]),
    guardianGivenName(){ return getFieldValue(this.guardianInformation, 'guardianFirstname','value')},
    guardianFamilyName(){ return getFieldValue(this.guardianInformation, 'guardianLastname','value')},
    guardianMiddleName(){ return getFieldValue(this.guardianInformation, 'guardianMiddleName','value')},
    guardianPhone(){ return getFieldValue(this.guardianInformation, 'guardianPhoneNumber','value')} 
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
        registrationStore.setGuardianInformation(this.guardianInformation)
    },
    buildGuardianInformation(){
        if(this.guardianValidationRules()){
        this.guardianInformation[0].selectdData = {
            "given_name":  getFieldValue(this.guardianInformation, 'guardianFirstname','value'),
            "middle_name": getFieldValue(this.guardianInformation, 'guardianMiddleName','value'),
            "family_name": getFieldValue(this.guardianInformation, 'guardianLastname','value'),
            "gender": '',
            "birthdate": '',
            "birthdate_estimated": '',

            "home_region": '',
            "home_district": '',
            "home_traditional_authority": '',
            "home_village": '',

            "current_region": '',
            "current_district": '',
            "current_traditional_authority": '',
            "current_village": '',
            "landmark": '',

            "cell_phone_number": getFieldValue(this.guardianInformation, 'guardianPhoneNumber','value')
        }}else{
            this.guardianInformation[0].selectdData = {}
        }
        
    },

    validationRules(event: any) {
        return validateField(this.guardianInformation,event.name, this[event.name]);
    },
    guardianValidationRules(){
        if( Validation.isName(this.guardianGivenName) == null &&
            Validation.isName(this.guardianFamilyName) == null ) 
            return true 
        else {
            return false
        }
    },
    getRegion(district: any){
        return district
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



