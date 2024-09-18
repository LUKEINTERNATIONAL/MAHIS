<template>
  <!-- Spinner -->
<!--  <div v-if="isLoading" class="spinner-overlay">-->
<!--    <ion-spinner name="bubbles"></ion-spinner>-->
<!--    <div class="loading-text">Please wait...</div>-->
<!--  </div>-->
  <ion-header>
    <div class="header position_content">
      <div style="display: flex; align-items: center" @click="dismiss()">
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
        </ion-card-header>
        <ion-card-content>
          <div class="dueCardContent">
            <DataTable :options="options" :data="patientList" class="display nowrap" width="100%">
              <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Wisdom</td>
                <td>Changala</td>
                <td>Vitals</td>
                <td>
                  <button @click="">Go to profile</button>
                </td>
              </tr>
              </tbody>
            </DataTable>
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
  IonSpinner
} from "@ionic/vue";
import { defineComponent } from "vue";
import DataTable from "datatables.net-vue3";
import { icons } from "@/utils/svg";
import {getPatientsList} from "@/apps/OPD/services/opd_dashboard";

export default defineComponent({
  components: {
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
    IonSpinner
  },
  data() {
    return {
      isLoading: false,
      popoverOpen: false,
      event: null as any,
      iconsContent: icons,
      patientList: [] as any,
      options: {
        responsive: true,
        select: true,
        searching: false,
        ordering: false,
        pageLength: 25,
        lengthChange: false,
      } as any,
    };
  },
  props: {
    title: {
      default: 'Patient List',
    },
  },
  async mounted() {
    this.isLoading = true;
    this.patientList = await getPatientsList()
    this.isLoading = false;
  },
  methods: {
    openPopover(e: Event) {
      this.event = e;
      this.popoverOpen = true;
    },
    dismiss() {
      modalController.dismiss();
    },
    goToPatientProfile(patient: any) {
      // Redirect to patient profile or handle accordingly
      console.log('Navigating to profile of:', patient.firstName, patient.lastName);
    }
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
