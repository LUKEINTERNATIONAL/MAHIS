<template>
    Spinner
    <div v-if="isLoading" class="spinner-overlay">
        <ion-spinner name="bubbles"></ion-spinner>
        <div class="loading-text">Please wait...</div>
    </div>
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
        <ion-card-header>
          <ion-card-title class="sectionTitle"></ion-card-title>
        </ion-card-header>
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
  </ion-content>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-responsive";
import "datatables.net-buttons-dt";

// Import other necessary components and libraries
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonCol, IonLabel, IonRow, modalController } from "@ionic/vue";
import { icons } from "@/utils/svg";
import { useAdministerOtherVaccineStore } from "@/apps/Immunization/stores/AdministerOtherVaccinesStore";
import { mapState } from "pinia";
import BasicInputField from "@/components/BasicInputField.vue";
import BasicForm from "@/components/BasicForm.vue";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import QRCodeReadersrc from "@/components/QRCodeReader.vue";
import { createModal } from "@/utils/Alerts";
import VueMultiselect from "vue-multiselect";
import { isEmpty } from "lodash";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { getVaccinesData } from "@/apps/Immunization/services/dashboard_service";
import { getPatientsList } from "@/apps/OPD/services/opd_dashboard";
import { PatientOpdList } from "@/services/patient_opd_list";
import dates from "@/utils/Date";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import { getUserLocation } from "@/services/userService";
import { useWorkerStore } from "@/stores/workerStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import {clipboardOutline, person, pulseOutline} from "ionicons/icons";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    BasicInputField,
    BasicForm,
    PreviousVitals,
    customDatePicker,
    IonCol,
    IonRow,
    VueMultiselect,
    IonLabel,
    DataTable,
  },
  data() {
    return {
      isLoading: false,
      popoverOpen: false,
      event: null as any,
      iconsContent: icons,
      showPD: false as boolean,
      batchNumber: "" as any,
      clientDetails: [] as any,
      dueData: [] as any,
      workerStore: useWorkerStore() as any,
      sessionDate: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
      showDateBtns: true as boolean,
      patients: [] as any,

      // DataTable configuration
      tableColumns: [
        { title: "Patient Name", data: "fullName" },
        { title: "Waiting Time", data: "arrivalTime", render: (data: any) => this.waitingTime(data) },
        {
          title: "Actions",
          data: null,
          render: (data: any, type: any, row: any) => {
            const container = document.createElement('div');

            const profileButton = document.createElement('ion-button');
            profileButton.innerText = this.buttonTitle;
            profileButton.size = 'small';
            profileButton.classList.add('btn-edit');
            profileButton.style.color = '#fff';
            profileButton.style.marginRight = '8px';
            profileButton.addEventListener('click', () => this.navigateTo(row.patient_id, this.buttonLink));
            container.appendChild(profileButton);

            const patientProfileButton = document.createElement('ion-button');
            patientProfileButton.innerText = 'Profile';
            patientProfileButton.size = 'small';
            patientProfileButton.classList.add('btn-edit');
            patientProfileButton.style.color = '#fd7e14';
            patientProfileButton.style.marginRight = '8px';
            patientProfileButton.addEventListener('click', () => this.navigateTo(row.patient_id, '/patientProfile'));
            container.appendChild(patientProfileButton);

            const abscondButton = document.createElement('ion-button');
            abscondButton.innerText = 'Abscond';
            abscondButton.size = 'small';
            abscondButton.classList.add('btn-edit');
            abscondButton.style.color = '#dc3545';
            abscondButton.style.marginRight = '8px';
            abscondButton.addEventListener('click', () => this.handleAbscond(row));
            container.appendChild(abscondButton);

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
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        order: [[1, 'desc']] as Array<[number, 'asc' | 'desc']>,

      },
    };
  },
  props: {
    title: {
      default: [] as any,
    },
    list: {
      default: "" as any,
    },
    buttonTitle: {
      default: "" as string,
    },
    buttonLink: {
      default: "" as string,
    },
  },
  computed: {
    ...mapState(usePatientList, [
      "patientsWaitingForVitals",
      "patientsWaitingForConsultation",
      "patientsWaitingForLab",
      "patientsWaitingForDispensation",
      "counter",
    ]),
  },
  async mounted() {
    this.setList();
  },
  watch: {
    counter: {
      handler() {
        this.setList();
      },
    },
  },
  setup() {
    return { person, pulseOutline, clipboardOutline };
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
    async handleAbscond(patient: any) {
      try {
        const location = await getUserLocation();
        const locationId = location ? location.code : null;
        await PatientOpdList.checkOutPatient(patient.visit_id, dates.todayDateFormatted());
        this.patients = this.patients.filter((p: any) => p.patient_id !== patient.patient_id);
        toastSuccess("Patient absconded successfully.");
        await usePatientList().refresh(locationId);
      } catch (e) {
        toastDanger("Failed to abscond patient.");
      }
    },
    setList() {
      const listMapping: Record<string, any[]> = {
        VITALS: this.patientsWaitingForVitals,
        CONSULTATION: this.patientsWaitingForConsultation,
        LAB: this.patientsWaitingForLab,
        DISPENSATION: this.patientsWaitingForDispensation,
      };

      this.patients = listMapping[this.list] || [];
    },
    waitingTime(timeStamp: any) {
      return dates.calculateTimeDifference(timeStamp);
    },
  },
});
</script>

<style scoped>
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
.vitals_title {
    margin-bottom: 50px;
}
.input-with-icon {
    position: relative;
}
.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray; /* Adjust the color as needed */
}
ion-col {
    padding-bottom: 15px;
}
h5 {
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    line-height: 60px;
}
.vitalsContent {
    height: 500px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
    align-items: center;
}
.btnContent {
    display: flex;
    justify-content: center;
    line-height: 60px;
}

.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.lbl-ct {
    white-space: nowrap;
    color: #08475e;
    font-size: 14px;
}
.error-label {
    background: #fecdca;
    color: #b42318;
    text-transform: none;
    padding: 6%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
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
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

@import "bootstrap";
</style>
<style scoped>
.table-container {
    padding: 16px;
}

.table-header {
    font-weight: bold;
    background-color: #f0f0f0;
}

.table-row {
    padding: 0; /* Remove padding from rows */
    margin: 0; /* Remove margin from rows */
    border-bottom: 1px solid #e0e0e0;
}

ion-col {
    padding: 4px 8px; /* Reduce padding for each column */
}

ion-button {
    margin: 2px; /* Reduce button margin */
}
</style>
