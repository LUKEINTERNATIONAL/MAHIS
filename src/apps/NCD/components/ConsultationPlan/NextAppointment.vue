<template>
    <div class="card_content">
        <ion-row>
            <ion-col>
                <VueDatePicker
                    class="calender"
                    @date-update="handleDateUpdate"
                    v-model="date"
                    :min-date="minDate"
                    inline
                    auto-apply
                    :enable-time-picker="false"
                >
                    <template #day="{ day }">
                        <template v-if="day === tomorrow">
                            <p>
                                {{ day }}<sup style="color: #999">{{ bookedPatient }}</sup>
                            </p>
                        </template>
                        <template v-else>
                            {{ day }}
                        </template>
                    </template>
                </VueDatePicker>
            </ion-col>
            <ion-col size="3.7">
                <ion-item>
                    <div class="dates_title">
                        <div>Medication run out date</div>
                        <div class="sub_data">20 June 2024</div>
                    </div>
                </ion-item>
                <ion-item>
                    <div class="dates_title">
                        <div>User set appointment date</div>
                        <div class="sub_data">{{ calendarDate }}</div>
                    </div>
                </ion-item>
                <ion-item>
                    <div class="dates_title">
                        <div>Appointments</div>
                        <div class="sub_data">{{ bookedPatient }}</div>
                    </div>
                </ion-item>
                <ion-item>
                    <div class="dates_title">
                        <div>Appointment limit (per/day)</div>
                        <div class="sub_data">{{ bookedPatient }}/120</div>
                    </div>
                </ion-item>
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController, IonDatetime } from "@ionic/vue";
import { defineComponent } from "vue";
import { calendar, checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";

import { createModal } from "@/utils/Alerts";
import BasicInputField from "../../../../components/BasicInputField.vue";
import HisDate from "@/utils/Date";
import { useNextAppointmentStore } from "@/stores/NextAppointmentStore";
import { mapState } from "pinia";
import { AppointmentService } from "@/services/appointment_service";
import { Service } from "@/services/service";
import { PatientService } from "@/services/patient_service";

export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        BasicInputField,
        IonDatetime,
    },
    data() {
        return {
            iconsContent: icons,
            calendarDate: "" as any,
            date: new Date(),
            bookedPatient: 20,
            tomorrow: new Date().getDate() + 1,
            appointment: "" as any,
            drugRunoutDate: "" as any,
            nextAppointmentDate: "" as any,
            minDate: new Date(),
        };
    },
    computed: {
        ...mapState(useNextAppointmentStore, ["nextAppointment"]),
    },
    watch: {
        calendarDate: {
            handler() {
                this.updateNextAppointment();
            },
            deep: true,
        },
    },
    async mounted() {
        const userID: any = Service.getUserID();
        const patient = new PatientService();
        this.appointment = new AppointmentService(patient.getID(), userID);
        this.nextAppointmentDate = this.appointment.date;
    },
    methods: {
        updateNextAppointment() {
            const nextAppointmentStore = useNextAppointmentStore();
            nextAppointmentStore.setNextAppointment(this.calendarDate);
        },
        handleDateUpdate(value: any) {
            this.calendarDate = HisDate.toStandardHisDisplayFormat(value);
            this.saveData();
        },
        async saveData() {
            try {
                const res = await this.appointment.getNextAppointment();
                this.nextAppointmentDate = res.appointment_date;
                this.drugRunoutDate = res.drugs_run_out_date;
                console.log(res);
            } catch {}
            // const res = await this.appointment.getDailiyAppointments("2024-03-01");
            // console.log("🚀 ~ mounted ~ res:", res);
            const ttt = [
                await this.appointment.buildValueDate("Appointment date", "2024-03-28"),
                await this.appointment.buildValueDate("Estimated date", this.nextAppointmentDate),
            ];
            // await this.appointment.createEncounter();
            // await this.appointment.saveObservationList(ttt);
            console.log("🚀 ~ mounted ~ ttt:", ttt);
        },
    },
});
</script>

<style scoped>
.demographics {
    display: block;
    width: 40vw;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px;
}
.demographics_title {
    font-weight: 700;
    font-size: 24px;
}
.sub_title {
    font-weight: 400;
    font-size: 14px;
    color: #636363;
    margin: 10px 0px 30px;
    padding-top: 20px;
    line-height: 25px;
}
.card_hearder {
    font-weight: 600;
    color: #00190e;
    font-size: 16px;
    padding-bottom: 20px;
}
.input_fields {
    padding: 10px 100px 70px 100px;
    text-align: left;
}
.gender {
    display: flex;
    justify-content: space-between;
    max-width: 170px;
    padding-top: 10px;
}
.gender_title {
    margin-top: 30px;
}
.marital_status {
    display: flex;
    justify-content: space-between;
}
ion-datetime::part(calendar-day) {
    padding: 25px;
    margin: 10px;
}
.dp__flex_display {
    display: inherit;
}
.enrollment_card {
    padding: 20px;
    width: 1200px;
}
.card_content {
    width: 100%;
}
.sub_data {
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 15px;
    font-weight: 300;
}
.dates_title {
    padding: 20px;
}
.calender {
    --dp-cell-padding: 30px; /*Padding in the cell*/
    --dp-menu-padding: 20px 5px; /*Menu padding*/
    --dp-font-size: 18px; /*Default font-size*/
}
</style>
