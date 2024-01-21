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
            <DynamicButton v-if="currentStep =='Next appointment'" name="Save" iconSlot="end" :icon="iconsContent.saveWhite" @click="nextStep" />
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
        }
      }
      
    });

//     {
//   "given_name": "petros",
//   "family_name": "kanymba",
//   "gender": "M",
//   "birthdate": "1984-07-15",
//   "birthdate_estimated": true,
//   "home_region": "Northern Region",
//   "home_district": "Karonga",
//   "home_traditional_authority": "Chawinga Simeon",
//   "home_village": "kaporo",
//   "current_region": "Southern Region",
//   "current_district": "Chikwawa",
//   "current_traditional_authority": "Chikwawa Boma",
//   "current_village": "Ling'awa",
//   "landmark": "Seventh Day",
//   "cell_phone_number": "Unknown"
// }
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