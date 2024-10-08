<template>
    <ion-page :class="{ loading: isLoading }">
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content>
            <div class="container">
                <h1 class="heading">Schedule Immunization Sessions</h1>
                <div style="margin-top: 15px;">
                    <ScheduleXCalendar :calendar-app="calendarApp" />
                </div>
            </div>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button @click="openCreateModal()">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    IonContent,
    IonPage,
    IonIcon,
    IonFab,
    IonFabButton,
    IonSpinner,
    modalController,
} from '@ionic/vue';
import Toolbar from "@/components/Toolbar.vue";
import { add } from 'ionicons/icons';
import ViewImmunizationSessionModal from '@/components/Modal/ViewImmunizationSessionModal.vue';
import AddImmunizationSessionModal from '@/components/Modal/AddImmunizationSessionModal.vue';
import { SessionScheduleService } from '@/services/session_schedule_service';
import { startOfMonth, format, parse, addWeeks, differenceInDays, startOfDay, addDays, isSunday, addMonths } from 'date-fns';
import { Assignee, SessionSchedule } from '@/types';
import { createModal } from '@/utils/Alerts';
import EditImmunizationSessionModal from '@/components/Modal/EditImmunizationSessionModal.vue';
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
    createCalendar,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const schedules = ref<SessionSchedule[]>([]);
const isLoading = ref<boolean>(false);
const monthView = createViewMonthGrid();
const calendarApp = createCalendar({
    selectedDate: format(new Date(), "yyyy-MM-dd"),
    defaultView: monthView.name,
    isDark: false,
    isResponsive: true,
    views: [
        createViewMonthGrid(),
        createViewDay(),
        createViewWeek(),
        createViewMonthAgenda(),
    ],
    events: [],
    callbacks: {
        onEventClick(calendarEvent) {
            const eventSchedules = schedules.value.filter(
                (event) => event.session_schedule_id === calendarEvent.id
            );
            onCalendarDayClick(eventSchedules)
        },
    }
});

async function getSessionSchedules(): Promise<void> {
    isLoading.value = true;
    try {
        const sessionService = new SessionScheduleService();
        const data: any = await sessionService.getSessions();
        calendarApp.events.getAll().forEach((event) => {
            calendarApp.events.remove(event.id);
        });
        data.forEach((item: SessionSchedule) => {
            const datesMap: Record<string, { start_date: Date, end_date: Date }[]> = {
                "Weekly": generateDateRangesWeekly(
                    format(new Date(item.start_date), "yyyy-MM-dd '08:00'"),
                    format(new Date(item.end_date), "yyyy-MM-dd '16:00'"),
                    item.frequency || 1
                ),
                "Never": [{ start_date: new Date(item.start_date), end_date: new Date(item.end_date) }],
                "Daily": generateDateRangesDaily(
                    format(new Date(item.start_date), "yyyy-MM-dd '08:00'"),
                    item.frequency || 1
                ),
                "Monthly": generateDateRangesMonthly(
                    format(new Date(item.start_date), "yyyy-MM-dd '08:00'"),
                    format(new Date(item.end_date), "yyyy-MM-dd '16:00'"),
                    item.frequency || 1
                ),
            };

            const repeatType = item.repeat_type?.toString() || "Never";
            datesMap[repeatType].forEach((range) => {
                calendarApp.events.add({
                    id: Number(item.session_schedule_id),
                    title: item.session_name,
                    start: format(new Date(range.start_date), "yyyy-MM-dd HH:mm"),
                    end: format(new Date(range.end_date), "yyyy-MM-dd HH:mm"),
                    people: item.assignees?.map((assignee: Assignee) => assignee.username),
                    location: item.target
                });
            })
        });
        schedules.value = data;
    } catch (exception: any) {
        console.error(exception);
    } finally {
        isLoading.value = false;
    }
}

const generateDateRangesWeekly = (
  startDateStr: string, 
  endDateStr: string, 
  frequency: number
): { start_date: Date, end_date: Date }[] => {
    const startDate = parse(startDateStr, 'yyyy-MM-dd HH:mm', new Date());
    const endDate = parse(endDateStr, 'yyyy-MM-dd HH:mm', new Date());

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
    }

    const dayDifference = differenceInDays(endDate, startDate);
    const dateRanges: { start_date: Date, end_date: Date }[] = [];
    let currentStartDate = startOfDay(startDate);
    let count = 0;

    while (count < frequency) {
        const currentEndDate = addDays(currentStartDate, dayDifference);
        if (!isSunday(currentStartDate)) {
            dateRanges.push({
                start_date: currentStartDate,
                end_date: currentEndDate
            });
            count++;
        }
        currentStartDate = addWeeks(currentStartDate, 1);
    }
    return dateRanges;
};



const generateDateRangesDaily = (
  startDateStr: string, 
  frequency: number
): { start_date: Date, end_date: Date }[] => {
    const startDate = parse(startDateStr, 'yyyy-MM-dd HH:mm', new Date());
    if (isNaN(startDate.getTime())) {
        throw new Error('Invalid start date format');
    }
    
    const dateRanges: { start_date: Date, end_date: Date }[] = [];
    let currentStartDate = startDate;
    let count = 0;

    while (count < frequency) {
        if (!isSunday(currentStartDate)) {
            dateRanges.push({
                start_date: new Date(currentStartDate.setHours(0, 0, 0, 0)),
                end_date: new Date(currentStartDate.setHours(23, 59, 59, 999))
            });
            count++;
        }
        currentStartDate = addDays(currentStartDate, 1);
    }
    
    return dateRanges;
};

const generateDateRangesMonthly = (
  startDateStr: string, 
  endDateStr: string, 
  frequency: number
): { start_date: Date, end_date: Date }[] => {
    const startDate = parse(startDateStr, 'yyyy-MM-dd HH:mm', new Date());
    const endDate = parse(endDateStr, 'yyyy-MM-dd HH:mm', new Date());

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
    }

    const dayDifference = differenceInDays(endDate, startDate);
    const dateRanges: { start_date: Date, end_date: Date }[] = [];
    let currentStartDate = startOfMonth(startDate);
    let count = 0;

    while (count < frequency) {
        const rangeEndDate = addDays(currentStartDate, dayDifference);
        if (!isSunday(currentStartDate)) {
            dateRanges.push({
                start_date: currentStartDate,
                end_date: rangeEndDate
            });
            count++;
        }
        currentStartDate = addMonths(currentStartDate, 1);
    }

    return dateRanges;
};

async function onCalendarDayClick(selectedCalendarSchedules: any): Promise<void> {
    if (selectedCalendarSchedules.length > 0) {
        const modal = await modalController.create({
            component: ViewImmunizationSessionModal,
            componentProps: {
                data: selectedCalendarSchedules,
            },
            cssClass: 'otherVitalsModal largeModal mobileView'
        })
        await modal.present();
        const { data } = await modal.onDidDismiss()
        if (data) {
            if (data.update) {
                getSessionSchedules();
            }
            if (data.edit) {
                showEditModal(data, "modal")
            }
        }
    }
}

const showEditModal = async (props: any, origin: "modal" | "view" = "view"): Promise<void> => {
    const modal = await modalController.create({
        component: EditImmunizationSessionModal,
        cssClass: "otherVitalsModal",
        componentProps: {
            data: props.edit,
            showName: ""
        },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data === "dismiss") {
        getSessionSchedules();
    }
}

const openCreateModal = (): void => {
    const modal = createModal(AddImmunizationSessionModal, { class: 'otherVitalsModal largeModal' });
    modal.then((update) => {
        if (update) getSessionSchedules();
    })
}

onMounted(async (): Promise<void> => {
    await getSessionSchedules();
});
</script>

<style lang="css" scoped>
.heading {
    width: 100%;
    text-align: center;
    font-weight: 700;
}
</style>