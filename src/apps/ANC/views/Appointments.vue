<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <div class="container">
        <div class="back_profile">
          <DynamicButton
              name="Back to home"
              iconSlot="start"
              fill="clear"
              :icon="chevronBackOutline()"
              @click="openBackController()"
          />
          <div class="AppointmentDate">
            <span style="font-size: 14px">Next Appt. Date: </span>
            <b>12/10/2024</b>
          </div>
        </div>
        <AppointmentsHistory/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonContent,
  IonPage
} from '@ionic/vue';
import {calendar, checkmark, chevronBackOutline, eye, pulseOutline} from 'ionicons/icons';
import Toolbar from "@/components/Toolbar.vue";
import DemographicBar from '../components/DemographicBar.vue';
import LandingPage from "@/apps/ANC/components/home/LandingPage.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import {createModal, toastDanger, toastSuccess, toastWarning} from "@/utils/Alerts";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import NextAppointmentModal from "@/apps/ANC/components/others/NextAppointmentModal.vue";
import FeatusModal from "@/apps/ANC/components/physical exam/FeatusModal.vue";
import {Service} from "@/services/service";
import {mapState} from "pinia";
import {useScheduleNextAppointmentStore} from "@/apps/ANC/store/others/scheduleNextAppointment";
import {useDemographicsStore} from "@/stores/DemographicStore";
import {formatCheckBoxData, formatInputFiledData} from "@/services/formatServerData";
import {NextAppointmentService} from "@/apps/ANC/service/next_appointment";
import {useFetalAssessment} from "@/apps/ANC/store/physical exam/FetalAssessmentStore";
import {resetPatientData} from "@/services/reset_data";
import AppointmentsHistory from "@/apps/ANC/components/others/AppointmentsHistory.vue";

export default defineComponent({
  name: "TB screening",
  components: {
    FeatusModal,
    DynamicButton,
    IonContent,
    IonPage,
    Toolbar,
    DemographicBar,
    LandingPage,
    NextAppointmentModal,
    AppointmentsHistory,
  },
  props: {
    backBtn: {
      type: String,
      default: "Back to profile",
    },
    backUrl: {
      type: String,
      default: "",
    },
    contact:{
      type:String,
      default:""
    }
  },

  data(){
    return{
      isModalOpen:false,
    }
  },
  setup() {
    return { checkmark, pulseOutline };
  },
  computed: {
    ...mapState(useScheduleNextAppointmentStore, ["nextAppointmentDate"]),
    ...mapState(useDemographicsStore, ["demographics"]),

  },
  methods: {
    calendar() {
      return calendar
    },
    eye() {
      return eye
    },
    chevronBackOutline() {
      return chevronBackOutline;
    },
    openBackController() {
      this.$router.push('/ANCHome');
    },
   async saveData(){
      const store = useScheduleNextAppointmentStore();
      const isFormValid = await store.validate();
      if (!isFormValid) {
        toastDanger('Next appointment date has errors');
        return;
      }
       await this.saveDate();
       this.closeAppointmentModal();
        await this.$router.push("ANCHome");
       await resetPatientData();

   },
    async saveDate(){
      if (this.nextAppointmentDate.length >= 0) {
        const userID: any = Service.getUserID();
        const  AppointmentDate= new NextAppointmentService(this.demographics.patient_id, userID);
        const encounter = await AppointmentDate.createEncounter();
        if (!encounter) return toastWarning("Unable to create appointment date encounter");
        const patientStatus = await AppointmentDate.saveObservationList(await this.buildNextAppointment());
        if (!patientStatus) return toastWarning("Unable to create date!");
        toastSuccess("Client has been scheduled for next contact");
      }
      console.log(await this.buildNextAppointment())
    },
    async buildNextAppointment() {
      return [
        ...(await formatInputFiledData(this.nextAppointmentDate)),
      ]
    },
    cancelModal() {
      this.closeAppointmentModal();
    },

    async nextAppointment() {
     this.toggleAppointmentModal()
    },
    toggleAppointmentModal(){
      this.isModalOpen=!this.isModalOpen
    },
    closeAppointmentModal() {
      this.isModalOpen = false;
    },
    navigateToContact() {
      this.$router.push('/contact');
    }
  }
})
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.back_profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  z-index: 1000;
  padding-left: 25%;
  padding-right: 25%;
}

.AppointmentDate {
  margin-left: auto;
}
ion-card {
  width: 300px;
  margin: 8px;
}

.button-container {
  display: block;
  justify-content: space-around;
  margin: 10px 0;
}

.dynamic-button {
  flex: 1;
  margin: 0 5px;
  min-width: 120px;
}

@media (max-width: 768px) {
  .dynamic-button {
    margin: 0 15px;
  }
  .container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 43%;
    transform: translateY(-50%);
  }
  ion-card {
    width: 400px;
    margin: 4px;
  }
  .button-container {
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
  }
  .back_profile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    z-index: 1000;
    padding: 0 5%; /* Avoids too much padding */
    margin-bottom: 10px;
  }
  .AppointmentDate {
    margin-left: 0;
      }
}

hr {
  margin: 20px 0;
  border: 2px solid #ccc;
}
</style>
