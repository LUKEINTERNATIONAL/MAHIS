<template>
    <ion-card>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col size="6">
              <strong>Name:</strong> {{ person.name }}
            </ion-col>
            <ion-col size="6">
              <strong>Gender:</strong> {{ person.gender }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="6">
              <strong>Age/DOB:</strong> {{ person.ageDob }}
            </ion-col>
            <ion-col size="6">
              <strong>Village:</strong> {{ person.village }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <strong>Appointment Date:</strong> {{ person.appointmentDate }}
            </ion-col>
          </ion-row>
          <ion-row class="divider">
            <ion-col size="12">
              <div class="line"></div>
            </ion-col>
          </ion-row>
          <ion-row class="actions">
            <ion-col size="12">
              <div class="button-container">
                <ion-button @click="handleReschedule" color="primary" fill="outline" size="small">
                  <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
                  Reschedule
                </ion-button>
                <ion-button @click="handleRemove" color="danger" fill="outline" size="small">
                  <ion-icon :icon="trashOutline" slot="start"></ion-icon>
                  Remove
                </ion-button>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue';
  import { calendarOutline, trashOutline } from 'ionicons/icons';
  import { createModal } from "@/utils/Alerts";
  import nextAppointMent from "@/apps/Immunization/components/Modals/nextAppointMent.vue";
  import { PatientService } from "@/services/patient_service";
  import SetDemographics from "@/views/Mixin/SetDemographics.vue";
  
  export default defineComponent({
    name: 'PersonCard',
    mixins: [SetDemographics],
    components: {
      IonCard,
      IonCardContent,
      IonGrid,
      IonRow,
      IonCol,
      IonButton,
      IonIcon,
    },
    props: {
      person: {
        type: Object,
        required: true,
      },
    },
    setup() {
      return {
        calendarOutline,
        trashOutline,
      };
    },
    methods: {
      handleReschedule() {
        this.openNextVaccineAppoinment(this.person.person_id)
      },
      handleRemove() {
        console.log('Remove clicked for:', this.person.name);
        console.log('Person ID:', this.person.person_id);
        console.log('Appointment ID:', this.person.appointment_id);
      },
      openNextVaccineAppoinment(patientId: string) {
        const dataToPass = { patient_Id: patientId };
        console.log("handleReschedule: " +dataToPass.patient_Id)
        createModal(nextAppointMent, { class: "otherVitalsModal" }, false, dataToPass);
      },
      async openClientProfile(patientID: any) {
        const patientData = await PatientService.findByNpid(patientID);
        this.setDemographics(patientData[0]);
        this.$router.push("patientProfile");
      },
    },
  });
  </script>
  
  <style scoped>
  .divider {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .line {
    height: 1px;
    background-color: #ccc;
    width: 100%;
  }
  
  .actions {
    margin-top: 10px;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>