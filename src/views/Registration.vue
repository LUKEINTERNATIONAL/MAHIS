<template>
    <ion-page>
        <ion-header>
            <div class="header position_content">
                <div style="display: flex; align-items: center;" @click="nav('/home')">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeft"></ion-icon>
                    <span style="padding-left: 10px;">Go back</span>
                </div>
                <div>
                    New patient registration
                </div>
                <div style="display: flex; align-items: center;">
                    <ion-icon slot="separator" size="large" :icon="iconsContent.help"></ion-icon>
                    <span style="padding-left: 10px;"> Need any help?</span> 
                </div>
            </div>
        </ion-header>
    <ion-content>
        <div v-if="registrationType == 'scan'">
            <ScanRegistration />
        </div>
        <div v-if="registrationType == 'manual'">
            <div v-if="currentStep =='Demographics'">
                <DemographicsRegistration  />
            </div>
            <div v-if="currentStep =='Enrollment'">
                <Enrollment />
            </div>
            <div v-if="currentStep =='Next appointment'">
                <NextAppointment />
            </div>
        </div>
    </ion-content>
    <ion-footer v-if="registrationType == 'manual'">
        <div class="footer position_content">
            <DynamicButton name="Previous" :icon="iconsContent.arrowLeftWhite" color="medium" @click="previousStep" />
            <ion-breadcrumbs class="breadcrumbs">
            <ion-breadcrumb @click="setCurrentStep('Demographics')" :class="{ 'active': currentStep === 'Demographics' }">
                <span class="breadcrumb-text">Demographics</span>
                <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
            </ion-breadcrumb>
            <ion-breadcrumb @click="setCurrentStep('Enrollment')" :class="{ 'active': currentStep === 'Enrollment' }">
                <span class="breadcrumb-text">Enrollment</span>
                <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
            </ion-breadcrumb>
            <ion-breadcrumb @click="setCurrentStep('Next appointment')" :class="{ 'active': currentStep === 'Next appointment' }">
                <span class="breadcrumb-text">Next appointment</span>
                <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
            </ion-breadcrumb>
            </ion-breadcrumbs>
            <DynamicButton v-if="currentStep =='Next appointment'" name="Save" iconSlot="end" :icon="iconsContent.saveWhite" @click="saveData()" />
            <DynamicButton v-else name="Next" iconSlot="end" :icon="iconsContent.arrowRightWhite" @click="nextStep" />
        </div>
  </ion-footer>
  </ion-page>
  </template>
  
  <script lang="ts">
    import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonBreadcrumb, IonBreadcrumbs, IonIcon } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { arrowForwardCircle } from 'ionicons/icons';
    import { icons } from '@/utils/svg';    
    import DynamicButton from '@/components/DynamicButton.vue';
    import DemographicsRegistration from '@/components/Registration/DemographicsRegistration.vue';
    import Enrollment from '@/components/Registration/Enrollment.vue';
    import NextAppointment from '@/components/Registration/NextAppointment.vue';
    import ScanRegistration from '@/components/Registration/ScanRegistration.vue';
    import { useRegistrationStore } from '@/stores/RegistrationStore'
    import { mapState } from 'pinia';
    import { PatientRegistrationService } from "@/services/patient_registration_service"
    import { Patientservice } from "@/services/patient_service"
    import { RelationsService } from "@/services/relations_service"
    import { SocialHistoryService } from "@/services/social_history_service";
    import { Service } from "@/services/service";
    import { useDemographicsStore } from '@/stores/DemographicStore'
    import { resetPatientData } from '@/services/reset_data'
    import { validateField } from '@/services/validation_service'
    import { toastSuccess, toastWarning } from '@/utils/Alerts';
    import { modifyFieldValue,getFieldValue,getRadioSelectedValue } from '@/services/data_helpers'
    import HisDate from "@/utils/Date";
  
    export default defineComponent({
      components: { 
        IonBreadcrumb, 
        IonBreadcrumbs, 
        IonIcon,
        IonContent, 
        IonHeader, 
        IonMenuButton, 
        IonPage, 
        IonTitle,
        DynamicButton,
        DemographicsRegistration,
        Enrollment, 
        NextAppointment,
        ScanRegistration
    },
      data() {
            return {
                iconsContent: icons,
                demographic: true,
                currentStep: 'Demographics',
                scanner: false,
                steps: ['Demographics','Enrollment', 'Next appointment'],
            };
        },
        props:['registrationType'],
        computed:{
            ...mapState(useRegistrationStore,["personInformation"]),
            ...mapState(useRegistrationStore,["socialHistory"]),
            ...mapState(useRegistrationStore,["homeLocation"]),
            ...mapState(useRegistrationStore,["currentLocation"]),
            ...mapState(useRegistrationStore,["guardianInformation"]),
            nationalID(){ return getFieldValue(this.personInformation, 'nationalID','value')},
            firstname(){ return getFieldValue(this.personInformation, 'firstname','value')},
            lastname(){ return getFieldValue(this.personInformation, 'lastname','value')},
            gender(){ return getRadioSelectedValue(this.personInformation, 'gender')},
            birthdate(){ return HisDate.toStandardHisFormat(getFieldValue(this.personInformation, 'birthdate','value'))},
        },
        setup() {
            return { arrowForwardCircle };
        },
        methods:{
            setCurrentStep(name: any){
                this.currentStep = name
            },
            nav(url: any){
                this.$router.push(url);
            },
            nextStep() {
                const currentIndex = this.steps.indexOf(this.currentStep);
                if (currentIndex < this.steps.length - 1) {
                    this.currentStep = this.steps[currentIndex + 1];
                }
            },
            previousStep() {
                const currentIndex = this.steps.indexOf(this.currentStep);
                if (currentIndex > 0) {
                    this.currentStep = this.steps[currentIndex - 1];
                }
            },
            async findPatient(patientID: any){
                this.openNewPage('/patientProfile', await Patientservice.findByID(patientID))
            },
            saveData(){
                this.createPatient()
            },
            validations(){
                const fields = ['nationalID', 'firstname', 'lastname', 'birthdate', 'gender'];
                return fields.every(fieldName => validateField(this.personInformation,fieldName, this[fieldName]));
            },
            async createPatient(){
                if(this.validations()){
                    if(Object.keys(this.personInformation[0].selectdData).length === 0) return
                    const registration: any = new PatientRegistrationService()
                    new Patientservice((await registration.registerPatient(this.personInformation[0].selectdData, [])))
                    const patientID = registration.getPersonID()
                    // this.createGuardian(patientID)
                    // this.createSocialHistory(patientID)
                    this.findPatient(patientID)
                    toastSuccess('Successfuly Created Patient')
                }else{
                    toastWarning("Please complete all required fields")
                }
            },
            async createGuardian(patientID: any){
                if(this.guardianInformation[0].selectdData?.length === 0) return
                const guardian: any = new PatientRegistrationService()
                await guardian.registerGuardian(this.guardianInformation[0].selectdData)
                const guardianID = guardian.getPersonID()
                await RelationsService.createRelation(
                    patientID, guardianID, 13
                )
            },
            async createSocialHistory(patientID: any){
                if(this.socialHistory[0].selectdData?.length === 0) return
                const userID: any  = Service.getUserID()
                const socialHistory = new SocialHistoryService(patientID, userID)
                const encounter = await socialHistory.createEncounter();
                const obs = await socialHistory.saveObservationList(this.socialHistory[0].selectdData)
            },
            openNewPage(url: any,item:any){
                const demographicsStore = useDemographicsStore()
                demographicsStore.setDemographics({
                'name':item.person.names[0].given_name+" "+item.person.names[0].family_name,
                'mrn':this.patientIdentifier(item),
                'birthdate': item.person.birthdate ,
                'category': '',
                'gender': item.person.gender,
                'patient_id': item.patient_id
                })
                resetPatientData()
                this.$router.push(url);
            },
            patientIdentifier(item: any){
                // return item
                const ids =item.patient_identifiers.length - 1
                if(ids >= 0)
                return item.patient_identifiers[ids].identifier
                else
                return ""
            },
        }
        
        });
  </script>
<style scoped>
.breadcrumbs{
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}
ion-toolbar {
    --opacity: 0.5;
    --background:var(--ion-background-color, #fff);
  }
  .header{
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
  }
  .footer{
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
  }
  ion-breadcrumb ion-icon{
    margin-inline: 30px;
  }
  .breadcrumb-active{
    color: var(--color);
    }
.active {
    color: #00190E; 
    display: flex;
    height: 40px;
    padding: 0px 16px;
    align-items: center;
    gap: 8px;
}
.active .breadcrumb-text {
  border-bottom: 1px solid #00190E; /* Set the desired color for the underline */
}
</style>