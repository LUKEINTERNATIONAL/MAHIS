<template>
    <ion-card>
      <ion-card-content>
        <ion-grid>
          <span style="cursor: pointer;" @click="openClientProfile(person.npid)">
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
          </span>
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
  import { voidVaccine, voidVaccineEncounter } from "@/apps/Immunization/services/vaccines_service";
  import _ from 'lodash';
  import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
  import { modalController } from '@ionic/vue';
  import voidReason from '@/apps/Immunization/components/Modals/voidReason.vue';
  import { useImmunizationAppointMentStore } from "@/stores/immunizationAppointMentStore";
  
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
    data() {
      return {
        
      }
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
        this.voidAppoinment()
      },
      openNextVaccineAppoinment(patientId: string) {
        const dataToPass = { patient_Id: patientId };
        createModal(nextAppointMent, { class: "otherVitalsModal" }, false, dataToPass);
      },
      async openClientProfile(patientID: any) {
        const patientData = await PatientService.findByNpid(patientID);
        this.setDemographics(patientData[0]);
        this.$router.push("patientProfile");
      },
      async voidAppoinment() {
        await this.openVoidModal()
      },
      async openVoidModal() {
        const modal = await modalController.create({
            component: voidReason,
            componentProps: {
                
            },
        });

        modal.onDidDismiss().then(async (data) => {
            if (data && data.data) {
              try {
                await voidVaccineEncounter(this.person.encounter_id, data.data.name as string)
                await voidVaccineEncounter(this.person.encounter_id, data.data.name as string)
                this.setAppointmentMentsReload()
              } catch (error) {
                this.setAppointmentMentsReload()
              }
            }
        });

        await modal.present();
      },
      async setAppointmentMentsReload() {
        const store = useImmunizationAppointMentStore();
        store.setAppointmentsReload(!store.getAppointmentsReload());
    }
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