<template>

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



