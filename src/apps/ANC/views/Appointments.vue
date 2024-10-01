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
          <div class="AppointmentDate" >
            <span style="font-size: 14px">Next Appt. Date: </span>
            <b style="color: #0b5ed7">{{dateOfAppointment}}</b>
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
import {EncounterService} from "@/services/encounter_service";
import {ConceptService} from "@/services/concept_service";
import {PatientService} from "@/services/patient_service";
import {ObservationService} from "@/services/observation_service";

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
      visitDate: [] as any,
      appointmentDate:"" as any,
      visits: [] as any,
      dateOfAppointment: '',
    }
  },
  setup() {
    return { checkmark, pulseOutline };
  },
  mounted(){
    this.handleAppointment()
  },
  computed: {
    ...mapState(useScheduleNextAppointmentStore, ["nextAppointmentDate"]),
    ...mapState(useDemographicsStore, ["demographics", "patient"]),

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
    async handleAppointment(){
      const dateOfAppointment = await ObservationService.getFirstObsValue(this.demographics.patient_id,"Appointment date", "value_text");
      this.dateOfAppointment = dateOfAppointment;

    },
    async updateData() {
      const patient = new PatientService();
      this.visits = await PatientService.getPatientVisits(patient.getID(), false);
      await this.loadSavedEncounters(this.visits[0]);
    },
    async loadSavedEncounters(patientVisitDate: any) {
      this.visitDate = patientVisitDate;
      const encounters = await EncounterService.getEncounters(this.demographics.patient_id, { date: patientVisitDate });
      await this.setNextAppointmentEncounter(encounters)
    },
    findEncounter(data: any, encounterType: any) {
      return data.find((obj: any) => obj.type && obj.type.name === encounterType);
    },
    async setNextAppointmentEncounter(data:any){
      const observations=this.findEncounter(data, "APPOINTMENT")?.observations;
      console.log('Observations:', observations); // Log to check if you have data
      this.appointmentDate['Appointment date'] = this.filterObs(observations, "Appointment date")?.[0]?.value_text ?? "";
      console.log('Appointment Date:', this.appointmentDate['Appointment date']);

    },

    filterObs(observations: any, conceptName: any) {
      return observations?.filter((obs: any) => obs.concept.concept_names.some((name: any) => name.name === conceptName));
    },
    async getConceptValues(filteredObservations: any, type: any) {
      if (filteredObservations) {
        return await Promise.all(
            filteredObservations?.map(async (item: any) => {
              return await ConceptService.getConceptName(item.value_coded);
            })
        );
      }
    },


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
    top: 60%;
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
    padding: 0 5%;
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
