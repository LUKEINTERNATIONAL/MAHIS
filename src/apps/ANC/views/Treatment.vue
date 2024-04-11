<template>
    <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar/>
      <Stepper stepperTitle="Treatment & Prevention" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
      IonContent, 
      IonHeader,
      IonItem,
      IonPage,
      IonList,
      IonTitle, 
      IonToolbar, 
      IonMenu,
  } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue'
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Stepper from '@/components/Stepper.vue';
import DiagnosisTreatment from '../components/Treatment/DiagnosisTreatment.vue';
import MedicationDispensed from '@/apps/ANC/components/Treatment/MedicationDispensed.vue'
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import DiagnosisCounselling from '@/apps/ANC/components/Treatment/DiagnosisCounselling.vue'
import Immunization from '@/apps/ANC/components/Treatment/Immunization.vue'
import IntimatePartner from '@/apps/ANC/components/Treatment/IntimatePartner.vue';
import Deworming from '@/apps/ANC/components/Treatment/Deworming.vue';
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from '@/services/formatServerData';
import { mapState } from 'pinia';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { useMedicationDispensedStore } from '../store/medicationDispensed';
import { useDiagnosisCounsellingStore } from '../store/diagnosisCounsellingStore';
import { useImmunizationStore } from '../store/immunizationStore';
import { useIntimatePartnerStore } from '../store/intimatePartnerStore';
import { useDewormingStore } from '../store/dewormingStore';



export default defineComponent ({
   name : 'treatment',
   components : {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonList,
  Toolbar,
  DemographicBar,
  IonMenu,
  IonTitle,
  IonToolbar,
  BasicInputField,
  Stepper,
  DiagnosisTreatment,
  MedicationDispensed,
  DiagnosisCounselling,
  Immunization,
  IntimatePartner,
  Deworming,
   },
   data(){
    return {
  iconsContent: icons,
  isOpen: false,
  wizardData: [
               {
                    'title': 'Diagnosis and treatment',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 1,
                    'last_step': ''
                },
                {
                    'title': 'Medication dispensed',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 2,
                    'last_step': ''
                },
                {
                    'title': 'Counselling',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 3,
                    'last_step': ''
                },
                {
                    'title': 'Immunization',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 4,
                    'last_step': ''
                },
                {
                    'title': 'Intimate Partner',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number':5,
                    'last_step': ''
                },
                {
                    'title': 'Deworming and malaria prophylaxis',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number':6,
                    'last_step': 'last_step'
                },      
  
              ],
  StepperData: [
               {
                    'title': 'Diagnosis and treatment',
                    'componet': 'DiagnosisTreatment',
                    'value': '1'
                },
                {
                    'title': 'Medication dispensed',
                    'componet': 'MedicationDispensed',
                    'value': '2'
                },
                {
                    'title': 'Counselling',
                    'componet': 'DiagnosisCounselling',
                    'value': '3'
                },
                {
                    'title': 'Immunization',
                    'componet': 'Immunization',
                    'value': '4'
                },
                {
                    'title': 'Intimate partner',
                    'componet': 'IntimatePartner',
                    'value': '5'
                },
                {
                    'title': 'Deworming and malaria prophylaxis',
                    'componet': 'Deworming',
                    'value': '6'
                },
  ],

    }
   },
setup () {
  return {chevronBackOutline, checkmark}
},
computed:{        
  ...mapState(useDiagnosisStore, ["diagnoses","hypertension","preEclampsia",
                                  "hyper","hiv","hepatitisB","hepatitisC",
                                  "syphilis","syphilisTesting","tbScreening",
                                  "GDM","diabetes","anaemia","hypertensionReason"]),
  ...mapState(useMedicationDispensedStore, ["iron",'calciumReason']),
  ...mapState(useDiagnosisCounsellingStore, ["preEclampsia","preEclampsiaCounselling",
                                             "aspirin","gdm","gdmCounselling","hivRisk",
                                            "prEp","seekingCare","dangerSigns","ancContact",
                                            "birth","modeOfTransport","intrapartum","birthPlace","postpartum","breastFeeding"]),
                                            
  ...mapState(useImmunizationStore,['ttDoses','HepBCounselling','HepB1','HepB2','HepB3','hepBReason']),
  ...mapState( useIntimatePartnerStore,['ipv','additionalCare','safety_assessment','physical_violence','beaten_pregnant',
                                 'woman_threatened','constant_jealous','strangling','murder_threat','referrals']),
  ...mapState(useDewormingStore,['treatment','malaria','malariaReason'])
},

methods: {
  markWizard(){},
  saveData(){
    this.saveDiagnosis();
    this.saveMedicationDispensed();
    this.saveCouselling();
    this.saveImmunisation();
    this.saveIntimatePartner();
    this.saveDeworming();
    //this.$router.push('counselling');

  },
  async saveDiagnosis(){
    console.log(await this.buildDiagnosis())
  },
  async saveMedicationDispensed(){
    console.log(await this.buildMedicationDispensed())
  },
  async saveCouselling(){
    console.log(await this.buildCouselling())
  },
  async saveImmunisation(){
    console.log(await this.buildImmunisation())
  },
  async saveIntimatePartner(){
    console.log(await this.buildIntimatePartner())
  },
  async saveDeworming(){
    console.log(await this.buildDeworming())
  },
    async buildDiagnosis(){
      return[
          ...(await formatCheckBoxData(this.diagnoses)),
          ...(await formatRadioButtonData(this.hypertension)),
          ...(await formatRadioButtonData(this.preEclampsia)),
          ...(await formatRadioButtonData(this.hyper)),
          ...(await formatRadioButtonData(this.hiv)),
          ...(await formatInputFiledData(this.hiv)),
          ...(await formatInputFiledData(this.hypertensionReason)),
          ...(await formatRadioButtonData(this.hepatitisB)),
          ...(await formatRadioButtonData(this. hepatitisC)),
          ...(await formatRadioButtonData(this.syphilis)),
          ...(await formatRadioButtonData(this.syphilisTesting)),
          ...(await formatRadioButtonData(this.tbScreening)),
          ...(await formatRadioButtonData(this.GDM)),
          ...(await formatRadioButtonData(this.diabetes)),
          ...(await formatRadioButtonData(this.anaemia)),
      ]
  },
  async buildMedicationDispensed(){
    return[
       ...(await formatRadioButtonData(this.iron)),
       ...(await formatRadioButtonData(this.calciumReason)),
    ]
  },  
   async buildCouselling(){
    return[
       ...(await formatRadioButtonData(this.preEclampsia)),
       ...(await formatRadioButtonData(this.preEclampsiaCounselling)),
       ...(await formatRadioButtonData(this.aspirin)),
       ...(await formatRadioButtonData(this.gdm)),
       ...(await formatRadioButtonData(this.gdmCounselling)),
       ...(await formatRadioButtonData(this.hivRisk)),
       ...(await formatRadioButtonData(this.prEp)),
       ...(await formatRadioButtonData(this.seekingCare)),
       ...(await formatRadioButtonData(this.dangerSigns)),
       ...(await formatRadioButtonData(this.birth)),
       ...(await formatRadioButtonData(this.modeOfTransport)),
       ...(await formatRadioButtonData(this.intrapartum)),
       ...(await formatRadioButtonData(this.birthPlace)),
       ...(await formatRadioButtonData(this.postpartum)),
       ...(await formatRadioButtonData(this.breastFeeding)),
    ]
  },
  async buildImmunisation(){
    return[
       ...(await formatRadioButtonData(this.ttDoses)),
       ...(await formatRadioButtonData(this.HepBCounselling)),
       ...(await formatRadioButtonData(this.HepB1)),
       ...(await formatRadioButtonData(this.HepB2)),
       ...(await formatRadioButtonData(this.HepB3)),
       ...(await formatRadioButtonData(this.hepBReason)),
    ]
  },
  async buildIntimatePartner(){
    return[
       ...(await formatRadioButtonData(this.ipv)),
       ...(await formatRadioButtonData(this.additionalCare)),
       ...(await formatRadioButtonData(this.safety_assessment)),
       ...(await formatRadioButtonData(this.physical_violence)),
       ...(await formatRadioButtonData(this.beaten_pregnant)),
       ...(await formatRadioButtonData(this.woman_threatened)),
       ...(await formatRadioButtonData(this.constant_jealous)),
       ...(await formatRadioButtonData(this.strangling)),
       ...(await formatRadioButtonData(this.murder_threat)),
       ...(await formatCheckBoxData(this.referrals))
    ]
  },
  async buildDeworming(){
    return[
       ...(await formatRadioButtonData(this.treatment)),
       ...(await formatRadioButtonData(this.malaria)),
       ...(await formatRadioButtonData(this.malariaReason)),
    ]
  },
}
})

</script>


<style scoped>

</style>