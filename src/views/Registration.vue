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
                <homeLocationRegistration  />
                <CurrentLocationRegistration />   
                <GuardianInformationRegistration />
            </div>
            <div v-if="currentStep =='Social history'">
                <SocialHistory />
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
            <ion-breadcrumb @click="setCurrentStep('Social history')" :class="{ 'active': currentStep === 'Social history' }">
                <span class="breadcrumb-text">Social history</span>
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
            <DynamicButton name="Next" iconSlot="end" :icon="iconsContent.arrowRightWhite" @click="nextStep" />
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
    import HomeLocationRegistration from '@/components/Registration/HomeLocationRegistration.vue';
    import CurrentLocationRegistration from '@/components/Registration/CurrentLocationRegistration.vue';
    import GuardianInformationRegistration from '@/components/Registration/GuardianInformationRegistration.vue'
    import SocialHistory from '@/components/Registration/SocialHistory.vue';
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
        HomeLocationRegistration,
        CurrentLocationRegistration,
        GuardianInformationRegistration,
        SocialHistory,
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
                steps: ['Demographics', 'Social history', 'Enrollment', 'Next appointment'],
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