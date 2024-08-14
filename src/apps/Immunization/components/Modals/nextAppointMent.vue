<template>
    <ion-row style="margin-top: 10px;">
        <ion-col style="margin-left: -3px">
            <div class="om" style="font-weight: 600; color:#8d8686;">Set Next Appointment Date</div>
        </ion-col>
        <ion-col size="6" style="text-align: right;">
            <ion-label class="lbl-tl" style="font-size: 13"> Todays Date: <span class="lbl-ct">{{ sessionDate }}</span></ion-label>
        </ion-col>
    </ion-row>

    <ion-row style="margin-top: 10px;">
        <ion-col style="margin-left: -3px">
            <div class="om"></div>
        </ion-col>
        <ion-col size="10" style="text-align: right;" v-if="show_selected_date">
            <ion-label class="lbl-tl" style="font-size: 16; font-weight: 500;">
                Total Appointments
                <span class="lbl-ct">({{ currently_selected_date }})</span>: 
                <span style="margin-right: 20px; color: black;">
                    <ion-badge color="primary" style="margin-bottom: -5px; font-size: 15px;">{{ appointment_count }}</ion-badge>
                </span></ion-label>
        </ion-col>
    </ion-row>

    <ion-row style="margin-top: 20px; ">
        <ion-col >
            <VueDatePicker
                v-model="date"
                 @date-update="DateUpdated"
                :enable-time-picker="false"
                inline
                auto-apply
                
                :disabled-dates="disablePastDates"
            >
                <template #day="{ day, date }"  >
                    <template v-if="true">
                        <p >
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

    <ion-row style="margin-top: 10px; margin-bottom: 10px;">
        <ion-col>
            <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid"  style="width: 130px">
                Cancel
                <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
            </ion-button>
        </ion-col>

        <ion-col style="text-align: right">
            <ion-button @click="save" class="btnText" fill="solid"  style="width: 130px">
                save
                <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
            </ion-button>
        </ion-col>
    </ion-row>
    
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { text } from "ionicons/icons"
import { it } from "date-fns/locale"
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
    IonBadge
} from "@ionic/vue"
import { ref, onMounted,computed, watch } from "vue"
import HisDate from "@/utils/Date"
import { useImmunizationAppointMentStore } from "@/stores/immunizationAppointMentStore"
import { Appointment } from "@/apps/Immunization/services/immunization_appointment_service"
import smsConfirmation from "@/apps/Immunization/components/Modals/smsConfirmation.vue";
import { SmsService } from "@/apps/Immunization/services/sms_service";
import { toastWarning } from "@/utils/Alerts";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { Service } from '@/services/service'
const store = useImmunizationAppointMentStore()
const user = useDemographicsStore();


const date = ref()
const configsSms = ref(false);
const sessionDate = HisDate.toStandardHisDisplayFormat(Service.getSessionDate())
const show_selected_date = ref(false)
const currently_selected_date = ref()
const appointment_count = ref(0)
const phoneNumber = ref()

function disablePastDates(date: any) {
    const today = new Date(Service.getSessionDate())
    // Set the time of today to 00:00:00 to disable dates based only on the date part
    today.setHours(0, 0, 0, 0);
    return date < today;
}

async function createModal(component: any, options: any) {
    const modal = await modalController.create({
        component,
        ...options
    });
    return modal.present();
}

const props = defineProps<{
    patient_Id: string,
}>()

async function save() {
    const appointment_service = new Appointment();
    if (props.patient_Id?.length > 0) {
        appointment_service.setPatientID(props?.patient_Id)
    }
    const appointmentDetails = await appointment_service.createAppointment();
    dismiss();
    
    if (!phoneNumber.value.includes("+")) {
        toastWarning("Invalid phone number for sms reminder");
        return;
     }
     
   if (Array.isArray(appointmentDetails) && appointmentDetails.length > 0) {
          if(configsSms.value){        
             createModal(smsConfirmation, {
                   componentProps: { patient: appointmentDetails[0], date: appointmentDetails[1] },
                   class: "smsConfirmation"
             });       
        }
        else{
               await SmsService.appointment(appointmentDetails[0],appointmentDetails[1]);
            }
   }

}

onMounted(async () => {
    let data = await SmsService.getConfigurations();
    let phone = await SmsService.fetchphone(user.demographics.patient_id);
    configsSms.value = data.show_sms_popup; 
    phoneNumber.value = phone.message;
    store.clearAppointmentMent()      
})

async function getAppointmentMents(date: any) {
    const appointment_service = new Appointment()
    const res =  await appointment_service.getDailiyAppointments(HisDate.toStandardHisFormat(date))
    appointment_count.value = res.length + 1
    console.log(res)
}

function dismiss() {
    modalController.dismiss()
}

async function DateUpdated(date: any) {
    const store = useImmunizationAppointMentStore()
    const appointment = {
            counter: 1,
            date: date
        }
    store.setAppointmentMent(appointment)
    show_selected_date.value = false
    await getAppointmentMents(date)
    show_selected_date.value = true
    currently_selected_date.value = HisDate.toStandardHisDisplayFormat(date)
}

function getCounter(date: any) {
    const _selectedAppointments = store.getAppointmentMents();
    
    // Normalize the input date to midnight
    const normalizeDate = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    };

    const dateTimestamp = normalizeDate(new Date(date)); // Normalize input date
    const found = _selectedAppointments.find((d: { date: any })  => {
        return normalizeDate(new Date(d.date)) === dateTimestamp; // Normalize and compare dates
    });

    return found ? found.counter : null;
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