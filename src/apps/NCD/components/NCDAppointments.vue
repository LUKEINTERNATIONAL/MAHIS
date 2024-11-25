<template>
      <div class="appointments-container">
        <!-- Date Range Filter -->
        <div class="date-filter">
          <ion-row>
            <ion-col>
              <label>Start Date:</label>
              <input 
                type="date" 
                v-model="startDate" 
                @change="getAppointments"
              />
            </ion-col>
            <ion-col>
              <label>End Date:</label>
              <input 
                type="date" 
                v-model="endDate" 
                @change="getAppointments"
              />
            </ion-col>
          </ion-row>
        </div>

        <!-- Appointments Table -->
        <ion-card v-if="people.length > 0">
          <table class="appointments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>NPID</th>
                <th>Age/DOB</th>
                <th>Gender</th>
                <th>Village</th>
                <th>Appointment Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="person in people" :key="person.npid">
                <td>{{ person.name }}</td>
                <td>{{ person.npid }}</td>
                <td>{{ person.ageDob }}</td>
                <td>{{ person.gender }}</td>
                <td>{{ person.village }}</td>
                <td>{{ person.appointmentDate }}</td>
              </tr>
            </tbody>
          </table>
        </ion-card>
        
        <!-- No Appointments Message -->
        <ion-card v-else>
          <div class="no-appointments">
            No appointments found for the selected date range.
          </div>
        </ion-card>
      </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import HisDate from "@/utils/Date";
import { Appointment } from "@/apps/Immunization/services/ncd_appointment_service";

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        Toolbar,
        IonRow,
    },
    data() {
        const startDate = ref(HisDate.currentDate());
        const endDate = ref(HisDate.currentDate());
        const people = ref([]) as any;
        return {
            startDate,
            endDate,
            people,
        };
    },
    computed: {

    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {

    },
    async mounted() {
        this.getAppointments()
    },
    methods: {
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
        async getAppointments() {
            this.people = [];
            const appointments = await Appointment.getDailiyAppointments(
                this.startDate,
                this.endDate,
                ""
            );
            appointments.forEach((client: any) => {
                const apptOb = {
                    person_id: client.person_id,
                    npid: client.npid,
                    appointment_id: 103,
                    encounter_id: client.encounter_id,
                    name: client.given_name.concat(" ", client.family_name),
                    gender: client.gender,
                    ageDob: this.formatBirthdate(client.birthdate),
                    village: client.city_village,
                    appointmentDate: HisDate.toStandardHisDisplayFormat(client.appointment_date),
                };
                this.people.push(apptOb);
            });

        }
    },
});
</script>

<style scoped>
.appointments-container {
  padding: 16px;
}

.date-filter {
  margin-bottom: 16px;
}

.appointments-table {
  width: 100%;
  border-collapse: collapse;
}

.appointments-table th, 
.appointments-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.appointments-table thead {
  background-color: #f2f2f2;
  font-weight: bold;
}

.no-appointments {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>



