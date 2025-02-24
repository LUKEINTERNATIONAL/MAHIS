<template>
  <ion-header>
    <div class="header position_content">
      <div style="display: flex; align-items: center" @click="dismiss">
        <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeftWhite"></ion-icon>
      </div>
      <div style="font-size: 1.2em; font-weight: 700">{{ title }}</div>
      <div style="display: flex; align-items: center" @click="openPopover($event)">
        <ion-icon slot="separator" size="large" :icon="iconsContent.fillerWhite"></ion-icon>
      </div>
    </div>
  </ion-header>
  <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
    <div>
      <ion-card class="section" style="margin-bottom: 25px; margin-inline: 0px">
        <ion-card-content>
          <div class="dueCardContent">
            <DataTable
                :data="patients"
                :columns="tableColumns"
                :options="tableOptions"
                class="display nowrap"
                width="100%"
            />
          </div>
        </ion-card-content>
      </ion-card>
    </div>

    <ion-popover
        style="--offset-x: -10px"
        :is-open="popoverOpen"
        :show-backdrop="false"
        :dismiss-on-select="true"
        :event="event"
        @didDismiss="popoverOpen = false"
    >
      <div>
        <ion-list style="--ion-background-color: #fff; --offset-x: -30px">
          <ion-item :button="true" :detail="false" style="cursor: pointer"></ion-item>
        </ion-list>
      </div>
    </ion-popover>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  modalController,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonPopover,
  IonSpinner,
  IonCol,
  IonRow,
} from "@ionic/vue";
import { defineComponent } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";
import { icons } from "@/utils/svg";
import { getPatientsList } from "@/apps/OPD/services/opd_dashboard";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";
import { PatientOpdList } from "@/services/patient_opd_list";
import { PatientService } from "@/services/patient_service";
import dates from "@/utils/Date";
import { useWorkerStore } from "@/stores/workerStore";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import { getUserLocation } from "@/services/userService";
import { useDemographicsStore } from "@/stores/DemographicStore";

export default defineComponent({
  components: {
    IonRow,
    IonCol,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonPopover,
    DataTable,
    IonSpinner,
  },
  data() {
    return {
      isLoading: false,
      popoverOpen: false,
      event: null as any,
      iconsContent: icons,
      patientList: [] as any,
      patients: [] as any,

      // DataTable configuration
      tableColumns: [
        { title: "Patient Name", data: "fullName" },
        { title: "Service Time", data: "arrivalTime", render: (data: any) => this.formatArrivalTime(data) },
        {
          title: "Actions",
          data: null,
          render: (data: any, type: any, row: any) => {
            const container = document.createElement('div');
            const profileButton = document.createElement('ion-button');
            profileButton.innerText = 'Profile';
            profileButton.size = 'small';
            profileButton.style.color = '#fff';
            profileButton.style.padding = '8px 12px';
            profileButton.style.marginRight = '8px';
            profileButton.addEventListener('click', () => this.navigateTo(row.patient_id, '/patientProfile'));
            container.appendChild(profileButton);

            return container;
          },
          orderable: false,
        },
      ],
      tableOptions: {
        responsive: true,
        searching: true,
        ordering: true,
        pageLength: 20,
        lengthChange: false,
        dom: 'Bfrtip',
        order: [[1, 'asc']] as Array<[number, 'asc' | 'desc']>,
      },
    };
  },
  props: {
    title: {
      default: "Patient List",
    },
  },
  async mounted() {
    this.isLoading = true;
    try {
      const location = await getUserLocation();
      const locationId = location ? location.code : null;
      const visitsToday = await PatientOpdList.getAllPatientsVisitsToday();
      const filteredVisits = visitsToday.filter((visit: any) => visit.location_id === locationId);
      this.patients = await Promise.all(
          filteredVisits.map(async (visit: any) => {
            const patientDetails = await PatientService.findByID(visit.patientId);
            if (patientDetails && patientDetails.person) {
              const names = patientDetails.person.names;
              const fullName = names && names.length > 0 ? `${names[0].given_name || ""} ${names[0].family_name || ""}`.trim() : "Unknown";

              return {
                fullName,
                arrivalTime: visit.startDate,
                patient_id: visit.patientId,
              };
            } else {
              return {
                fullName: "Unknown",
                arrivalTime: visit.startDate,
                patient_id: visit.patientId,
              };
            }
          })
      );
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    openPopover(e: Event) {
      this.event = e;
      this.popoverOpen = true;
    },
    dismiss() {
      modalController.dismiss();
    },
    async navigateTo(id: any, route: string) {
      const patient = await PatientService.findByID(id);
      await useDemographicsStore().setPatientRecord(patient);
      this.$router.push(route);
    },
    formatArrivalTime(dateTime: string) {
      const date = new Date(dateTime);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
  },
});
</script>

<style scoped>
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.loading-text {
    color: white;
    font-size: 1.2em;
    margin-top: 10px;
}

.position_content {
    max-width: 100vw;
}
.sectionTitle {
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 1.1em;
    border-bottom: #ccc 1px solid;
    line-height: 30px;
}
.table-header {
    font-weight: bold;
    background-color: #f0f0f0;
}
.header {
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
ion-header {
    background: #006401;
}
</style>
