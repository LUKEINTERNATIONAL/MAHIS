<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Immediate postnatal checks" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()"  :StepperData="StepperData"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonModal,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from "@/apps/LABOUR/components/Toolbar.vue";
import ToolbarSearch from "@/apps/LABOUR/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal, toastSuccess, toastWarning } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import Stepper from "@/apps/LABOUR/components/Stepper.vue";
import { mapState } from 'pinia';
import { useImmediatePostnatalChecksForMotherStore } from '../stores/delivery details/immediatepostnatalChecksForMother';
import { formatInputFiledData, formatRadioButtonData } from '@/services/formatServerData';
import { useImmediatePostnatalChecksForChildStore } from '../stores/delivery details/immediatepostnatalChecksForChild';
import { useDemographicsStore } from '@/stores/DemographicStore';
import { Service } from '@/services/service';
import {ChildService, MotherService} from "@/services/LABOUR/postnatal_checks_service";
export default defineComponent({
  name: "postnatalChecks",
  components:{
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    Toolbar,
    ToolbarSearch,
    DemographicBar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    Stepper
  },
  data(){
    return {
      wizardData: [
        {
          'title': 'For mother',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': ''
        },
        {
          'title': 'For child',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 2,
          'last_step': 'last_step'
        },

      ],
      StepperData:[
        {
          title: 'Immediate postnatal check for mother',
          component: 'ImmidiatePostnatalChecksForMother',
          value: '1'
        },
        {
          title: 'Immediate postnatal check for child',
          component: 'ImmidiatePostnatalChecksForChild',
          value: '2'
        },
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },

  computed:{
     ...mapState(useDemographicsStore, ["demographics"]),
    ...mapState(useImmediatePostnatalChecksForMotherStore,['examsAfterDelivery']),
     ...mapState(useImmediatePostnatalChecksForChildStore,['examsAfterDeliveryforChild']),
  },
  mounted(){
    this.markWizard()

  },
  watch: {

  },
  setup() {
    return { chevronBackOutline,checkmark };
  },

  methods:{
    markWizard(){
      //   if(this.medications.validationStatus){
      //     this.wizardData[0].checked = true;
      //     this.wizardData[0].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[0].checked = false;
      //   }

      //   if(this.medicalHistory[0].selectdData.length > 0){
      //     this.wizardData[1].checked = true;
      //     this.wizardData[1].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[1].checked = false;
      //   }

      //   if(this.womanBehaviour[0].selectdData.length > 0){
      //     this.wizardData[2].checked = true;
      //     this.wizardData[2].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[2].checked = false;
      //   }
      //   if(this.medications[0].selectdData.length > 0){
      //     this.wizardData[2].checked = true;
      //     this.wizardData[2].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[2].checked = false;
      //   }
    },
    deleteDisplayData(data: any){
      return  data.map((item: any) => {
        delete item?.display;
        return item?.data;
      });
    },
    saveData(){
     // this.$router.push("labourHome");
     this.saveMotherChecks();
     this.saveChildChecks();
    },
    async saveMotherChecks(){
      if (this.examsAfterDelivery.length > 0) {
          const userID: any = Service.getUserID();
          const Mother = new  MotherService(this.demographics.patient_id, userID);
          const encounter = await Mother.createEncounter();
          if (!encounter) return toastWarning("Unable to create Mother encounter");
          const patientStatus = await Mother.saveObservationList(await this.buildMotherChecks());
          if (!patientStatus) return toastWarning("Unable to create Mother !");
          toastSuccess("Mother  has been created");
      }
     // console.log(await this.buildMotherChecks())
    },
    async saveChildChecks(){
      if (this.examsAfterDeliveryforChild.length > 0) {
          const userID: any = Service.getUserID();
          const Child = new  ChildService(this.demographics.patient_id, userID);
          const encounter = await Child.createEncounter();
          if (!encounter) return toastWarning("Unable to create Child encounter");
          const patientStatus = await Child.saveObservationList(await this.buildMotherChecks());
          if (!patientStatus) return toastWarning("Unable to create Child !");
          toastSuccess("Child has been created");
      }
     // console.log(await this.buildChildChecks())
    },
    async  buildMotherChecks(){
     return[
     ...(await formatRadioButtonData(this.examsAfterDelivery)),
     ...(await formatInputFiledData(this.examsAfterDelivery)),
      ]
    },
    async  buildChildChecks(){
     return[
     ...(await formatRadioButtonData(this.examsAfterDeliveryforChild)),
     ...(await formatInputFiledData(this.examsAfterDeliveryforChild)),
      ]
    },
    //
    // async saveConfirmPregnancy() {
    //   if (this.ConfirmPregnancy.length > 0) {
    //     const userID: any = Service.getUserID();
    //     const ConfirmPregnancy = new ConfirmPregnancyService(this.demographics.patient_id, userID);
    //     const encounter = await ConfirmPregnancy.createEncounter();
    //     if (!encounter) return toastWarning("Unable to create patient pregnancy confirmation encounter");
    //     const patientStatus = await ConfirmPregnancy.saveObservationList(await this.buildConfirmPregnancy());
    //     if (!patientStatus) return toastWarning("Unable to create patient pregnancy confirmation details!");
    //     toastSuccess("Pregnancy confirmation details have been created");
    //   }
    //   console.log(await this.buildConfirmPregnancy())
    // },
    // async saveHealthConcerns() {
    //   if (this.HealthConcerns.length > 0) {
    //     const userID: any = Service.getUserID();
    //     const HealthConcerns = new SpecificHealthConcernsService(this.demographics.patient_id, userID);
    //     const encounter = await HealthConcerns.createEncounter();
    //     if (!encounter) return toastWarning("Unable to create patient health concerns encounter");
    //     const patientStatus = await HealthConcerns.saveObservationList(await this.buildHealthConcerns());
    //     if (!patientStatus) return toastWarning("Unable to create patient health concerns!");
    //     toastSuccess("Patient's specific health concerns have been created");
    //   }
    //   console.log(await this.buildHealthConcerns())
    // },

    openModal() {
      createModal(SaveProgressModal);
    },

    // async buildChecksForChild() {
    //   return [
    //     ...(await formatCheckBoxData(this.examsAfterDeliveryForChild)),
    //     ...(await formatRadioButtonData(this.examsAfterDeliveryForChild)),
    //     ...(await formatInputFiledData(this.examsAfterDeliveryForChild)),
    //   ];
    // },
    // async buildChecksForMother() {
    //   return [
    //     ...(await formatCheckBoxData(this.examsAfterDelivery)),
    //     ...(await formatRadioButtonData(this.examsAfterDelivery)),
    //     ...(await formatInputFiledData(this.examsAfterDelivery)),
    //   ];
    // },
    //
    // async buildHealthConcerns() {
    //   return [
    //     ...(await formatCheckBoxData(this.HealthConcerns)),
    //     ...(await formatRadioButtonData(this.HealthConcerns)),
    //     ...(await formatInputFiledData(this.HealthConcerns)),
    //   ];
    // },
    // async buildReasonForVisit() {
    //   return [
    //     ...(await formatCheckBoxData(this.HealthConcerns)),
    //     ...(await formatRadioButtonData(this.HealthConcerns)),
    //     ...(await formatInputFiledData(this.HealthConcerns)),
    //   ];
    // },


  }
})
</script>

<style scoped>

</style>
