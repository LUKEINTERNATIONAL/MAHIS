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
  locationData: [] as any,
  districtList: [] as any,
  religionsList: [
        { name: 'Christianity' },
        { name: 'Islam' },
        { name: 'Judaism' },
        { name: 'Hinduism' },
        { name: 'Buddhism' },
        { name: 'Sikhism' },
        { name: 'Jainism' },
        { name: 'Bahá\'í Faith' },
        { name: 'Zoroastrianism' },
        { name: 'Confucianism' },
        { name: 'Taoism' },
        { name: 'Shinto' },
        { name: 'Baha\'i Faith' },
        { name: 'Juche' },
        { name: 'Rastafari' }
    ],
  occupationsList : [
  { name: 'Doctor' },
  { name: 'Teacher' },
  { name: 'Engineer' },
  { name: 'Software Developer' },
  { name: 'Artist' },
  { name: 'Chef' },
  { name: 'Police Officer' },
  { name: 'Firefighter' },
  { name: 'Accountant' },
  { name: 'Writer' },
  { name: 'Electrician' },
  { name: 'Carpenter' },
  { name: 'Nurse' },
  { name: 'Scientist' },
  { name: 'Entrepreneur' },
  { name: 'Librarian' },
  { name: 'Graphic Designer' },
  { name: 'Architect' },
  { name: 'Pilot' },
  { name: 'Mechanic' },
  { name: 'Dentist' },
  { name: 'Veterinarian' },
  { name: 'Lawyer' },
  { name: 'Plumber' },
  { name: 'Psychologist' },
  { name: 'Social Worker' },
  { name: 'Translator' },
  { name: 'Biologist' },
  { name: 'Economist' },
  { name: 'Photographer' },
  { name: 'Actor' },
  { name: 'Dancer' },
  { name: 'Musician' },
  { name: 'Fashion Designer' },
  { name: 'Athlete' },
  { name: 'Journalist' },
  { name: 'Diplomat' },
  { name: 'Geologist' },
  { name: 'Pharmacist' },
  { name: 'Historian' },
  { name: 'Meteorologist' },
  { name: 'Archaeologist' },
  { name: 'Physicist' },
  { name: 'Astronomer' },
  { name: 'Real Estate Agent' },
  { name: 'Biomedical Engineer' },
  { name: 'Mathematician' },
  { name: 'Speech Therapist' },
  { name: 'Personal Trainer' },
  { name: 'Philosopher' },
  { name: 'Flight Attendant' },
  { name: 'Interior Designer' },
  { name: 'Forensic Scientist' },
  { name: 'Marine Biologist' },
]
  
};
},
computed:{
    ...mapState(useRegistrationStore,["personInformation"]),
    ...mapState(useRegistrationStore,["socialHistory"]),
    ...mapState(useRegistrationStore,["homeLocation"]),
    ...mapState(useRegistrationStore,["currentLocation"]),
    ...mapState(useRegistrationStore,["guardianInformation"]),
    nationalID(){ return getFieldValue(this.personInformation, 'nationalID','value')},
    firstname(){ return getFieldValue(this.personInformation, 'firstname','value')},
    lastname(){ return getFieldValue(this.personInformation, 'lastname','value')},
    middleName(){ return this.getInputData(this.personInformation,3,0,0,'value')},
    gender(){ return getRadioSelectedValue(this.personInformation, 'gender')},
    birthdate(){ return HisDate.toStandardHisFormat(getFieldValue(this.personInformation, 'birthdate','value'))},
    birthdateEstimated(){ return this.getInputData(this.personInformation,5,0,0,'value')},
    homeRegion(){ return this.getRegion(this.getInputData(this.homeLocation,0,0,0,'value'))},
    homeDistrict(){ return this.getInputData(this.homeLocation,0,0,0,'value')},
    homeTraditionalAuthority(){ return this.getInputData(this.homeLocation,2,0,0,'value')},
    homeVillage(){ return this.getInputData(this.homeLocation,1,0,0,'value')},
    currentRegion(){ return this.getRegion(this.getInputData(this.currentLocation,0,0,0,'value'))},
    currentDistrict(){ return this.getInputData(this.currentLocation,0,0,0,'value')   },
    currentTraditionalAuthority(){ return this.getInputData(this.currentLocation,2,0,0,'value')},
    currentVillage(){ return this.getInputData(this.currentLocation,1,0,0,'value')},
    landmark(){ return this.getInputData(this.currentLocation,3,0,0,'value')},
    phoneNumber(){ return getFieldValue(this.personInformation, 'phoneNumber','value')} ,
    
    maritalStatus(){ return this.getRadioValue(this.socialHistory,0)},
    religion(){ return this.getInputData(this.socialHistory,1,0,0,'value')},
    occupationStatus(){ return this.getRadioValue(this.socialHistory,2)},

    guardianGivenName(){ return this.getInputData(this.guardianInformation,0,0,0,'value')},
    guardianFamilyName(){ return this.getInputData(this.guardianInformation,1,0,0,'value')},
    guardianMiddleName(){ return this.getInputData(this.guardianInformation,2,0,0,'value')},
    // guardianGender(){ return this.getRadioValue(this.guardianInformation,5)},
    // guardianBirthdate(){ return HisDate.toStandardHisFormat(this.getInputData(this.guardianInformation,5,0,0,'value'))},
    // guardianBirthdateEstimated(){ return this.getInputData(this.guardianInformation,5,0,0,'value')},

    // guardianHomeRegion(){ return this.getRegion(this.getInputData(this.homeLocation,0,0,0,'value'))},
    // guardianHomeDistrict(){ return this.getInputData(this.homeLocation,0,0,0,'value')},
    // guardianHomeTraditionalAuthority(){ return this.getInputData(this.homeLocation,2,0,0,'value')},
    // guardianHomeVillage(){ return this.getInputData(this.homeLocation,1,0,0,'value')},
    // guardianCurrentRegion(){ return this.getRegion(this.getInputData(this.currentLocation,0,0,0,'value'))},
    // guardianCurrentDistrict(){ return this.getInputData(this.currentLocation,0,0,0,'value')   },
    // guardianCurrentTraditionalAuthority(){ return this.getInputData(this.currentLocation,2,0,0,'value')},
    // guardianCurrentVillage(){ return this.getInputData(this.currentLocation,1,0,0,'value')},
    // guardianLandmark(){ return this.getInputData(this.currentLocation,3,0,0,'value')},
    guardianPhone(){ return this.getInputData(this.guardianInformation,4,0,0,'value')} 
},
watch: {
    personInformation: {
        handler(){
            // this.updateRegistrationStores();
            this.buildPersonalInformation()
            // this.buidCards()
        },
        deep: true
    },
    homeLocation: {
        handler(){
        },
        deep: true
    },
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
    },
    buildPersonalInformation(){
        this.personInformation[0].selectdData = {
            "given_name": getFieldValue(this.personInformation, 'firstname','value'),
            "middle_name": getFieldValue(this.personInformation, 'middleName','value'),
            "family_name" : getFieldValue(this.personInformation, 'lastname','value'),
            "gender" : this.gender,
            "birthdate" : getFieldValue(this.personInformation, 'birthdate','value'),
            "birthdate_estimated" : getFieldValue(this.personInformation, 'firstname','value'),
            "home_region" : getFieldValue(this.personInformation, 'homeDistrict','value'),
            "home_district" : getFieldValue(this.personInformation, 'homeDistrict','value'),
            "home_traditional_authority" : getFieldValue(this.personInformation, 'homeTraditionalAuthority','value'),
            "home_village" : getFieldValue(this.personInformation, 'homeVillage','value'),
            "current_region" : getFieldValue(this.personInformation, 'currentDistrict','value'),
            "current_district" : getFieldValue(this.personInformation, 'currentDistrict','value'),
            "current_traditional_authority" : getFieldValue(this.personInformation, 'currentTraditionalAuthority','value'),
            "current_village" : getFieldValue(this.personInformation, 'currentVillage','value'),
            "landmark" : getFieldValue(this.personInformation, 'closestLandmark','value'),
            "cell_phone_number" : getFieldValue(this.personInformation, 'phoneNumber','value'),
        }
        
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
    buildSocialHistory(){
        if(this.validatedSocialHistory())
        this.socialHistory[0].selectdData = {
            "marital_status": this.maritalStatus,
            "religion": this.religion,
            "occupation_status": this.occupationStatus
        }
    },

    validationRules(event: any) {
        return validateField(this.personInformation,event.name, this[event.name]);
    },
    guardianValidationRules(){
        if( Validation.isName(this.guardianGivenName) == null &&
            Validation.isName(this.guardianFamilyName) == null ) 
            return true 
        else {
            return false
        }
    },
    validatedSocialHistory(){
        if( Validation.required(this.maritalStatus) == null ||
            Validation.required(this.religion) == null ||
            Validation.required(this.occupationStatus) == null ) 
            return true 
        else {
            return false
        }
    },
    getRadioValue(data: any, section: any){
        return data[section].radioBtnContent.header.selectedValue
    },
    getRegion(district: any){
        return district
    },
    getInputData(data: any, section: any, row: any, col: any, type: any) {
    const rowData = data[section].data.rowData[row].colData[col];
    switch (type) {
        case 'value':
            return rowData.value;
        case 'inputHeader':
            return rowData.inputHeader;
        case 'id':
            return rowData.id;
        default:
            return null;
    }
},

async buildDistricts() {
        this.locationData = this.setName === 'homeLocation' ? this.homeLocation : this.currentLocation;
        if (this.locationData[0].data.rowData[0].colData[0].popOverData?.data.length === 0) {
            for (let i of [1, 2, 3]) {
                const districts: any = await LocationService.getDistricts(i);
                this.districtList.push(...districts);
            }
        }
        this.setName === 'homeLocation'
            ? this.homeLocation[0].data.rowData[0].colData[0].popOverData.data = this.districtList
            : this.currentLocation[0].data.rowData[0].colData[0].popOverData.data = this.districtList;

},

async buildTAs() {
    const targetData = await LocationService.getTraditionalAuthorities(
        this.getInputData(this.locationData, 0, 0, 0, 'id'),
        this.getInputData(this.locationData, 1, 0, 0, 'value')
    );
    this.setName === 'homeLocation'
        ? this.homeLocation[1].data.rowData[0].colData[0].popOverData.data = targetData
        : this.currentLocation[1].data.rowData[0].colData[0].popOverData.data = targetData;
},

async buildVillages() {
    const targetData = await LocationService.getVillages(
        this.getInputData(this.locationData, 1, 0, 0, 'id'),
        this.getInputData(this.locationData, 2, 0, 0, 'value')
    );
    this.setName === 'homeLocation'
        ? this.homeLocation[2].data.rowData[0].colData[0].popOverData.data = targetData
        : this.currentLocation[2].data.rowData[0].colData[0].popOverData.data = targetData;
},

async handleInputData(event: any) {
    this.validationRules(event)
    this.handleLocation(event)
    this.handleReligion(event.name)
    this.handleOccupation(event.name)
},
handleReligion(name: any){
    if(name == 'religion'){
        modifyFieldValue(this.socialHistory,name,'popOverData',{
            filterData: true,
            data: this.religionsList
        })
    }
},
handleOccupation(name: any){
    if(name == 'occupation'){
        modifyFieldValue(this.socialHistory,name,'popOverData',{
            filterData: true,
            data: this.occupationsList
        })
    }
},
async handleLocation(event: any) {
    this.setName = event.setName;
    if(this.setName == 'homeLocation' || this.setName == 'currentLocation' ){
        await this.buildDistricts();

        await this.buildTAs();
        const taDisplayNone = this.locationData[1].data.rowData[0].colData[0];
        this.handleDisplayNone(taDisplayNone, 0);

        await this.buildVillages();
        const villageDisplayNone = this.locationData[2].data.rowData[0].colData[0];
        this.handleDisplayNone(villageDisplayNone, 1);
    }
},
async handleDisplayNone(targetData: any, inputField: any) {
    if (await this.checkSelected(inputField) && this.locationData[inputField].data.rowData[0].colData[0].value != '') {
        this.setName === 'homeLocation' 
        ? this.homeLocation[1+inputField].data.rowData[0].colData[0].displayNone = false
        :this.currentLocation[1+inputField].data.rowData[0].colData[0].displayNone =false;
    } else {
        if(this.setName === 'homeLocation'){
            this.homeLocation[1+inputField].data.rowData[0].colData[0].value = '';
            this.homeLocation[1+inputField].data.rowData[0].colData[0].displayNone = true;
        }else{
            this.currentLocation[1+inputField].data.rowData[0].colData[0].value = '';
            this.currentLocation[1+inputField].data.rowData[0].colData[0].displayNone = true;
        }
    }
},

async checkSelected(inputField: any) {
    return new Promise(async (resolve) => {
        const inputData = this.getInputData(this.locationData, inputField, 0, 0, 'value');
        const obj = this.locationData[inputField].data.rowData[0].colData[0].popOverData.data.find((obj: any) => obj.name === inputData);
        resolve(obj);
    });
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



