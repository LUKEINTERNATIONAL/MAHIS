<template>
    <div class="card_content">
        <ion-row>
            <ion-col size-sm="12" size-md="12" size-lg="12" size-xl="8">
                <VueDatePicker
                    class="calender"
                    @date-update="openCornfirmModal"
                    inline
                    auto-apply
                    :enable-time-picker="false"
                    :disabled-dates="disabledDates"
                >
                    <template #day="{ day, date }">
                        <template v-if="true">
                            <p>
                                <span
                                    >{{ day }}<sup class="count-badge">{{ getCounter(date) }}</sup></span
                                >
                            </p>
                        </template>
                        <template v-else>
                            {{ day }}
                        </template>
                    </template>
                </VueDatePicker>
            </ion-col>
            <ion-col>
                <ion-item>
                    <div class="dates_title">
                        <div>Medication run out date</div>
                        <div class="sub_data">- - -</div>
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
                        <div class="sub_data">{{ appointment_count }}</div>
                    </div>
                </ion-item>
                <ion-item>
                    <div class="dates_title">
                        <div>Appointment limit (per/day)</div>
                        <div class="sub_data">{{ appointment_count }}/{{ maximumNumberOfDaysForEachDay }}</div>
                    </div>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size="4">
                <DateInputField
                    :inputHeader="'Preferred Next Appointment Date'"
                    :sectionHeaderFontWeight="20"
                    :unit="''"
                    :icon="calendarOutline"
                    :placeholder="'press to select date'"
                    :iconRight="''"
                    :inputWidth="'100%'"
                    :inputValue="inputPRDate"
                    :eventType="''"
                    :minDate="minDate"
                    :maxDate="''"
                    :disabled="false"
                    @update:rawDateValue="handleInput($event)"
                />
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonBadge, IonToolbar, IonMenu, modalController, IonDatetime } from "@ionic/vue";
import { calendarOutline, checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { createModal } from "@/utils/Alerts";
import BasicInputField from "../../../../components/BasicInputField.vue";
import HisDate from "@/utils/Date";
import { useNextAppointmentStore } from "@/stores/NextAppointmentStore";
import { mapState } from "pinia";
import { AppointmentService } from "@/services/appointment_service";
import { Service } from "@/services/service";
import { PatientService } from "@/services/patient_service";
import { useClinicalDaysStore, setValueProps } from "@/stores/clinicalDaysStore";
import { Appointment } from "@/apps/Immunization/services/ncd_appointment_service";
import confirmModal from "@/apps/NCD/components/confirmModal.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { DrugOrderService } from "@/services/drug_order_service";
import DateInputField from "@/components/DateInputField.vue";

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
        IonBadge,
        DateInputField,
    },
    setup() {
        const clinicalDaysStore = useClinicalDaysStore();
        const appointment_count = ref(0);
        const disabledDates = computed(() => clinicalDaysStore.getDisabledDates());
        const datesCounts = computed(() => clinicalDaysStore.getAssignedAppointments());
        const inputPRDate = ref();

        return {
            disabledDates,
            datesCounts,
            appointment_count,
            calendarOutline,
            inputPRDate,
        };
    },
    data() {
        return {
            iconsContent: icons,
            calendarDate: "" as any,
            date: new Date(Service.getSessionDate()),
            bookedPatient: 20,
            tomorrow: new Date().getDate() + 1,
            appointment: "" as any,
            drugRunoutDate: "" as any,
            nextAppointmentDate: "" as any,
            minDate: new Date() as any,
            appointmentCountsCache: {} as { [key: string]: number },
        };
    },
    computed: {
        ...mapState(useNextAppointmentStore, ["nextAppointment"]),
        ...mapState(useClinicalDaysStore, ["maximumNumberOfDaysForEachDay", "assignedAppointmentsDates"]),
        ...mapState(useDemographicsStore, ["patient"]),
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
        await this.preloadAppointmentCounts();
        setValueProps();
        const userID: any = Service.getUserID();
        const patient = new PatientService();
        this.appointment = new AppointmentService(patient.getID(), userID);
        this.nextAppointmentDate = this.appointment.date;
        this.supposedRunOutDate();
    },
    methods: {
        updateNextAppointment() {
            const nextAppointmentStore = useNextAppointmentStore();
            nextAppointmentStore.setNextAppointment(this.calendarDate);
        },
        async handleDateUpdate(date: any) {
            const storeClinicalDaysStore = useClinicalDaysStore();
            storeClinicalDaysStore.setsssignedAppointmentsDates(date, true);
            this.calendarDate = HisDate.toStandardHisDisplayFormat(date);
            await this.save();
            await this.getAppointmentMents(date);
            await this.updateAppointmentCache(date);
        },
        async getAppointmentMents(date: any) {
            try {
                const res = await AppointmentService.getDailiyAppointments(HisDate.toStandardHisFormat(date), HisDate.toStandardHisFormat(date));
                this.appointment_count = res.length;
            } catch (error) {}
        },
        getCounter(date: Date): number | string {
            const dateKey = HisDate.toStandardHisFormat(date);
            return this.appointmentCountsCache[dateKey] || "";
        },
        async save() {
            if (this.assignedAppointmentsDates.length > 0) {
                try {
                    const appointment_service = new Appointment();
                    const appointmentDetails = await appointment_service.createAppointment();
                } catch (error) {}
            } else {
                // toastWarning("please select next appointment date on the calendar");
            }
        },
        async openCornfirmModal(date: any) {
            this.calendarDate = HisDate.toStandardHisDisplayFormat(date);
            await this.getAppointmentMents(date);
            const handleCancel = (event: CustomEvent<any>) => {
                console.log(event.detail);
            };
            const handleConfirm = async (event: CustomEvent<any>) => {
                if (event.detail == true) {
                    await this.handleDateUpdate(date);
                }
            };
            const dataToPass = { message: "Are you sure you want to add this Appointment?" };
            createModal(confirmModal, { class: "otherVitalsModal" }, true, dataToPass, { cancel: handleCancel, confirm: handleConfirm });
        },

        async handleInput(date: any) {
            this.inputPRDate = HisDate.toStandardHisDisplayFormat(date);
            await this.openCornfirmModal(date);
        },

        async supposedRunOutDate() {
            const lastMedication = await DrugOrderService.getLastDrugsReceived(this.patient.patientID);
            console.log(lastMedication);
        },
        async preloadAppointmentCounts() {
            try {
                const startDate = new Date(Service.getSessionDate());
                startDate.setDate(1);
                const endDate = new Date(Service.getSessionDate());
                endDate.setMonth(endDate.getMonth() + 2);
                endDate.setDate(0);
                const dates = this.generateDateRange(startDate, endDate);
                for (const date of dates) {
                    try {
                        const appointments = await AppointmentService.getDailiyAppointments(
                            HisDate.toStandardHisFormat(date),
                            HisDate.toStandardHisFormat(date)
                        );
                        const dateKey = HisDate.toStandardHisFormat(date);
                        this.appointmentCountsCache[dateKey] = appointments.length;
                    } catch (error) {
                        console.error(`Error fetching appointments for ${date}:`, error);

                        const dateKey = HisDate.toStandardHisFormat(date);
                        this.appointmentCountsCache[dateKey] = 0;
                    }
                }
            } catch (error) {
                console.error("Error in preload process:", error);
            }
        },

        generateDateRange(startDate: Date, endDate: Date): Date[] {
            const dates: Date[] = [];
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
        },
        async updateAppointmentCache(date: Date) {
            try {
                const dateKey = HisDate.toStandardHisFormat(date);
                const appointments = await AppointmentService.getDailiyAppointments(
                    HisDate.toStandardHisFormat(date),
                    HisDate.toStandardHisFormat(date)
                );
                this.appointmentCountsCache[dateKey] = appointments.length;
            } catch (error) {
                console.error("Error updating appointment cache:", error);
            }
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
.count-badge {
    padding: 1px 4px;
    font-size: 19px;
    margin-left: 1px;
    position: relative;
    font-weight: bold;
}
</style>
