<template>
    <ion-row style="margin-top: 10px">
        <ion-col style="margin-left: -3px">
            <div class="om" style="font-weight: 600; color: #8d8686">Set Next Appointment Date</div>
        </ion-col>
        <ion-col size="6" style="text-align: right">
            <ion-label class="lbl-tl" style="font-size: 13">
                Todays Date: <span class="lbl-ct">{{ sessionDate }}</span></ion-label
            >
        </ion-col>
    </ion-row>

    <ion-row style="margin-top: 10px">
        <ion-col style="margin-left: -3px">
            <div class="om"></div>
        </ion-col>
        <ion-col size="10" style="text-align: right" v-if="show_selected_date">
            <ion-label class="lbl-tl" style="font-size: 16; font-weight: 500">
                Total Appointments
                <span class="lbl-ct">({{ currently_selected_date }})</span>:
                <span style="margin-right: 20px; color: black">
                    <ion-badge color="primary" style="margin-bottom: -5px; font-size: 15px">{{ appointment_count }}</ion-badge>
                </span></ion-label
            >
        </ion-col>
    </ion-row>

    <ion-row style="margin-top: 20px">
        <ion-col>
            <VueDatePicker v-model="date" @date-update="DateUpdated" :enable-time-picker="false" inline auto-apply :disabled-dates="disablePastDates">
                <template #day="{ day, date }">
                    <template v-if="true">
                        <p>
                            {{ day }}<sup style="color: #999">{{ getCounter(date) }}</sup>
                        </p>
                    </template>
                    <template v-else>
                        {{ day }}
                    </template>
                </template>
            </VueDatePicker>
        </ion-col>
    </ion-row>

    <ion-row v-if="show_suggested_date" style="margin-top: 0px; margin-bottom: 0px;">
        <ion-col style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 17px; color: #333; font-weight: bold;">Suggested Date:</div>
            <div style="font-size: 16px; color: #666; margin-top: 5px;">{{ suggested_date }}</div>
        </ion-col>
    </ion-row>

    <ion-row style="margin-top: 10px; margin-bottom: 10px">
        <ion-col>
            <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px">
                Cancel
                <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
            </ion-button>
        </ion-col>

        <ion-col style="text-align: right">
            <ion-button @click="save" class="btnText" fill="solid" style="width: 130px">
                save
                <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
            </ion-button>
        </ion-col>
    </ion-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { text } from "ionicons/icons";
import { it } from "date-fns/locale";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    IonRow,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
    IonCheckbox,
    modalController,
    IonBadge,
} from "@ionic/vue";
import { ref, onMounted, computed, watch } from "vue";
import HisDate from "@/utils/Date";
import { useImmunizationAppointMentStore } from "@/stores/immunizationAppointMentStore";
import { Appointment } from "@/apps/Immunization/services/immunization_appointment_service";
import smsConfirmation from "@/apps/Immunization/components/Modals/smsConfirmation.vue";
import { SmsService } from "@/apps/Immunization/services/sms_service";
import { toastWarning } from "@/utils/Alerts";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { Service } from "@/services/service";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import {  voidVaccineEncounter, getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service";
import { RelationshipService } from "@/services/relationship_service";
import { PatientService } from "@/services/patient_service";
import { AppointmentService } from "@/services/appointment_service";

const client = useDemographicsStore();
const date = ref();
const suggested_date = ref();
const show_suggested_date = ref(false);
const configsSms = ref(false);
const sessionDate = HisDate.toStandardHisDisplayFormat(Service.getSessionDate());
const show_selected_date = ref(false);
const currently_selected_date = ref();
const appointment_count = ref(0);
const phoneNumbers = ref<string[]>([]);
const vaccinesPreviouslyAdministered = [] as any

function disablePastDates(date: any) {
    const today = new Date(Service.getSessionDate());
    // Set the time of today to 00:00:00 to disable dates based only on the date part
    today.setHours(0, 0, 0, 0);
    return date < today;
}

async function createModal(component: any, options: any) {
    const modal = await modalController.create({
        component,
        ...options,
    });
    return modal.present();
}

const props = defineProps<{
    patient_Id: string;
    encounter_Id: string;
}>();


async function save() {
    const store = useImmunizationAppointMentStore()
    if (store.selectedAppointmentMent.length >0) {
        try {
            await voidApt()
            await getMobilePhones()
            const appointment_service = props.patient_Id ? new Appointment(props.patient_Id as any) : new Appointment();
            const appointmentDetails = await appointment_service.createAppointment();
            setMilestoneReload();
            setAppointmentMentsReload();
            dismiss();
            smspost(appointmentDetails);
        } catch (error) {
            
        }
    } else {
        toastWarning("please select next appointment date on the calendar");
    }

}

async function smspost(appointmentDetails:any){

    if (phoneNumbers.value.length == 0){ 
        toastWarning("No phone numbers available for sms reminder!");
        return;
    }

    if (Array.isArray(appointmentDetails) && appointmentDetails.length > 0) {
        if (configsSms.value) {
            
            const modal = await modalController.create({
                    component: smsConfirmation,
               componentProps: { 
                         date: appointmentDetails[1],
                      patient: appointmentDetails[0],
                  modalaction: 'saveAppointment' } });

           await modal.present();

        } else {
            await SmsService.appointment(appointmentDetails[0], appointmentDetails[1]);
        }
    }

}


async function setMilestoneReload() {
    const store = useAdministerVaccineStore();
    store.setVaccineReload(!store.getVaccineReload());
}

async function setAppointmentMentsReload() {
    const store = useImmunizationAppointMentStore();
    store.setAppointmentsReload(!store.getAppointmentsReload());
}

async function voidApt() {
    try {
        await voidVaccineEncounter(props.encounter_Id as any, 'Rescheduled' as string)
        await voidVaccineEncounter(props.encounter_Id as any, 'Rescheduled' as string)
    } catch (error) {
        
    }
}

onMounted(async () => {
    const store = useImmunizationAppointMentStore();
    store.clearAppointmentMent();
    await getfacilityConfiguration();
    await suggestNextAppointmentDate();
});

async function suggestNextAppointmentDate() {
    try {
        const patient = new PatientService();
        const patientId = props.patient_Id !== undefined ? props.patient_Id : patient.getID();
        const mileStone = await getFirstUpcomingVaccineMilestone(patientId as any);
        
        if (vaccinesPreviouslyAdministered.length > 0) {
            const lastVaccine = vaccinesPreviouslyAdministered[vaccinesPreviouslyAdministered.length - 1];
            console.log(lastVaccine)
            const is_timely_adminstred = await isTimelyAdminstred(lastVaccine, patientId as any)
            if (is_timely_adminstred == false) {
                date.value = addDaysAndFormat(lastVaccine.vaccine.date_administered, convertToDays(mileStone.age) as any)
                suggested_date.value = HisDate.toStandardHisDisplayFormat(date.value)
                DateUpdated(date.value)
                getCounter(date.value)
                show_suggested_date.value = true
            }
        }
    } catch (error) {
        
    }
}

async function isTimelyAdminstred(vaccine: any, patientId: number) {
    try {
        const patientData = await PatientService.findByID(patientId);
        const DOB = new Date(patientData.person.birthdate);
        const expectedAdminstrationDate = addDaysAndFormat(DOB as any, convertToDays(vaccine.age) as any)
        const DA = convertToDate(vaccine.vaccine.date_administered)
        const EAD = new Date(expectedAdminstrationDate)
        console.log(isLater(DA, EAD))
        return isLater(DA, EAD)
    } catch (error) {
        
    }
}

function convertToDate(dateStr: any) {
    const monthMap = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    } as any;
    const parts = dateStr.split(/[:/ ]/);
    const formattedDate = `${parts[2]}-${monthMap[parts[1]]}-${parts[0]}T${parts[3]}:${parts[4]}:${parts[5]}`;
    return new Date(formattedDate);
}

function isLater(dateA: Date, dateB: Date): boolean {
    // Extract year, month, and day from dateA
    const yearA = dateA.getFullYear();
    const monthA = dateA.getMonth();
    const dayA = dateA.getDate();

    // Extract year, month, and day from dateB
    const yearB = dateB.getFullYear();
    const monthB = dateB.getMonth();
    const dayB = dateB.getDate();

    // Compare year, month, and day
    if (yearA !== yearB) {
        return yearA > yearB;
    }
    if (monthA !== monthB) {
        return monthA > monthB;
    }
    return dayA > dayB;
}

function findPreviouslyAdministeredVaccineSchedule(vaccine_schedule: any) {
    vaccine_schedule.forEach((milestone: any) => {
        milestone.antigens.forEach((vaccine: any) => {
            if (vaccine.status == "administered") {
                vaccinesPreviouslyAdministered.push({
                    age: milestone.age,
                    vaccine: vaccine,
                })
            }
        })
    
    })
    return vaccinesPreviouslyAdministered
}

async function getFirstUpcomingVaccineMilestone(patientId: string): Promise<any | null> {
    try {
        const data = await getVaccinesSchedule(patientId as any);
    findPreviouslyAdministeredVaccineSchedule(data.vaccine_schedule)
    for (const milestone of data.vaccine_schedule) {
        if (milestone.milestone_status === 'current') {
            return milestone;
        }
        if (milestone.milestone_status === 'upcoming') {
            return milestone;
        }
    }
    
    return null;
    } catch (error) {
        return null;
    }
}

async function getAppointmentMents(date: any) {
    try {
        const res = await AppointmentService.getDailiyAppointments(HisDate.toStandardHisFormat(date), HisDate.toStandardHisFormat(date));
        appointment_count.value = res.length + 1;
    } catch (error) {
        
    }
}

function dismiss() {
    modalController.dismiss();
}
async function getfacilityConfiguration() {
    try {
        let data = await SmsService.getConfigurations();
        configsSms.value = data.show_sms_popup;
    } catch (error) {
        
    }
}

async function getMobilePhones(){
    try {
        const guardianData = await RelationshipService.getRelationships(client.demographics.patient_id);
        if(guardianData.length > 0){ 
            const phone = guardianData[0].relation.person_attributes.find((x: any) => x.type.name == "Cell Phone Number")
            if(phone){ phoneNumbers.value.push(phone.value); }
        }
        
        if (client.demographics.phone){
            phoneNumbers.value.push(client.demographics.phone)
        }
    } catch (error) {
        
    }
}

async function DateUpdated(date: any) {
    const store = useImmunizationAppointMentStore();
    const appointment = {
        counter: 1,
        date: date,
    };
    store.setAppointmentMent(appointment);
    show_selected_date.value = false;
    await getAppointmentMents(date);
    show_selected_date.value = true;
    currently_selected_date.value = HisDate.toStandardHisDisplayFormat(date);
}

function getCounter(date: any) {
    const store = useImmunizationAppointMentStore();
    const _selectedAppointments = store.getAppointmentMents();

    // Normalize the input date to midnight
    const normalizeDate = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    };

    const dateTimestamp = normalizeDate(new Date(date));
    const found = _selectedAppointments.find((d: { date: any }) => {
        return normalizeDate(new Date(d.date)) === dateTimestamp;
    });

    return found ? found.counter : null;
}

function convertToDays(input: string) {
  // Regular expression to match number and time unit
  const regex = /(\d+)\s*(week|month|year)s?/i;
  const match = input.match(regex);

  if (!match) {
    return "Invalid input format";
  }

  const number = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  // Convert to days based on the unit
  switch (unit) {
    case 'week':
      return number * 7;
    case 'month':
      return number * 30; // Approximation, as months vary
    case 'year':
      return number * 365; // Not accounting for leap years
    default:
      return "Invalid time unit";
  }
}

function addDaysAndFormat(dateInput: string | Date, daysToAdd: number): string {
    let date: Date;

    if (dateInput instanceof Date) {
        // If the input is already a Date object, use it directly
        date = new Date(dateInput);
    } else {
        // Parse the original date string
        const [datePart, timePart] = dateInput.split(' ');
        const [day, month, year] = datePart.split('/');
        const [hours, minutes, seconds] = timePart.split(':');
        
        const months: { [key: string]: number } = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, 
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };

        date = new Date(Number(year), months[month], Number(day), Number(hours), Number(minutes), Number(seconds));
    }
    
    date.setDate(date.getDate() + daysToAdd);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formatNumber = (num: number): string => String(num).padStart(2, '0');

    const dayName = days[date.getDay()];
    const monthName = monthsArr[date.getMonth()];
    const dayOfMonth = formatNumber(date.getDate());
    const newYear = date.getFullYear();
    const newHours = formatNumber(date.getHours());
    const newMinutes = formatNumber(date.getMinutes());
    const newSeconds = formatNumber(date.getSeconds());

    const timeZoneOffset = -date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
    const offsetMinutes = Math.abs(timeZoneOffset) % 60;
    const timeZoneString = `GMT${timeZoneOffset >= 0 ? '+' : '-'}${formatNumber(offsetHours)}${formatNumber(offsetMinutes)}`;

    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let localizedTimeZoneName: string;
    try {
        const timeZonePart = new Intl.DateTimeFormat('en', {
            timeZone: timeZoneName,
            timeZoneName: 'long'
        }).formatToParts(date).find(part => part.type === 'timeZoneName');

        localizedTimeZoneName = timeZonePart ? timeZonePart.value : timeZoneName;
    } catch (error) {
        console.error("Error getting localized time zone name:", error);
        localizedTimeZoneName = timeZoneName;
    }

    return `Date ${dayName} ${monthName} ${dayOfMonth} ${newYear} ${newHours}:${newMinutes}:${newSeconds} ${timeZoneString} (${localizedTimeZoneName})`;
}
</script>

<style scoped>
.ilbl {
    font-size: 23px;
}
.calender {
    --dp-cell-padding: 30px; /*Padding in the cell*/
    --dp-menu-padding: 20px 5px; /*Menu padding*/
    --dp-font-size: 18px; /*Default font-size*/
}
.card_content {
    width: 100%;
}
.dp__flex_display {
    display: inherit;
}
.toggle-green {
    --toggle-bg-on: #006401;
    --toggle-border-on: #006401;
    --toggle-width: 6.3rem;
    --toggle-height: 1.9rem;
    --toggle-border: 0.525rem;
    --toggle-font-size: 1rem;
    margin-bottom: 30px;
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
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
}
</style>
