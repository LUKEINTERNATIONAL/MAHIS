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
                <div class="search-create-container">
                    <div>
                    </div>
                    <div>
                        <ion-button :size="buttonSize" @click="openCreateModal()">
                            <ion-icon slot="start" :icon="add"></ion-icon>
                            Create Session
                        </ion-button>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <ScheduleXCalendar :calendar-app="calendarApp" />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
    IonContent,
    IonButton,
    IonPage,
    IonIcon,
    IonSpinner,
    modalController,
} from '@ionic/vue';
import { Capacitor } from '@capacitor/core';
import Toolbar from "@/components/Toolbar.vue";
import { add } from 'ionicons/icons';
import ViewImmunizationSessionModal from '@/components/Modal/ViewImmunizationSessionModal.vue';
import AddImmunizationSessionModal from '@/components/Modal/AddImmunizationSessionModal.vue';
import { SessionScheduleService } from '@/services/session_schedule_service';
import { startOfMonth, endOfMonth, isAfter, format, parse, addWeeks, differenceInDays, startOfDay, addDays, subDays, isSunday, addMonths } from 'date-fns';
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
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
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

onMounted(async (): Promise<void> => {
    await getSessionSchedules();
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
                    parseInt(format(new Date(item.start_date), 'yyyy')),
                    parseInt(format(new Date(item.start_date), 'M')) - 1,
                    format(new Date(item.start_date), "yyyy-MM-dd '08:00'"),
                    format(new Date(item.end_date), "yyyy-MM-dd '16:00'")
                ),
                "Never": [{ start_date: new Date(item.start_date), end_date: new Date(item.end_date) }],
                "Daily": generateDateRangesDaily(
                    format(new Date(item.start_date), "yyyy-MM-dd '08:00'"),
                    7
                ),
                "Monthly": generateDateRangesMonthly(
                    parseInt(format(new Date(item.start_date), 'yyyy')),
                    parseInt(format(new Date(item.start_date), 'M')) - 1,
                    format(new Date(item.start_date), "yyyy-MM-dd '08:00'"),
                    format(new Date(item.end_date), "yyyy-MM-dd '16:00'")
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

const generateDateRangesWeekly = (year: number, month: number, startDateStr: string, endDateStr: string): { start_date: Date, end_date: Date }[] => {
    const startDate = parse(startDateStr, 'yyyy-MM-dd HH:mm', new Date());
    const endDate = parse(endDateStr, 'yyyy-MM-dd HH:mm', new Date());

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
    }

    const dayDifference = differenceInDays(endDate, startDate);
    const endOfMonthDate = endOfMonth(new Date(year, month));
    const dateRanges: { start_date: Date, end_date: Date }[] = [];

    let currentStartDate = startOfDay(startDate);
    const yesterday = startOfDay(subDays(new Date(), 1));
    while (currentStartDate <= endOfMonthDate) {
        const currentEndDate = addDays(currentStartDate, dayDifference);

        if (isAfter(currentEndDate, yesterday)) {
            dateRanges.push({
                start_date: isAfter(currentStartDate, yesterday) ? currentStartDate : addDays(yesterday, 1),
                end_date: currentEndDate > endOfMonthDate ? endOfMonthDate : currentEndDate
            });
        }
        currentStartDate = addWeeks(currentStartDate, 1);
    }
    return dateRanges;
}

const generateDateRangesDaily = (startDateStr: string, numberOfDays: number): { start_date: Date, end_date: Date }[] => {
    const startDate = parse(startDateStr, 'yyyy-MM-dd HH:mm', new Date());
    if (isNaN(startDate.getTime())) {
        throw new Error('Invalid start date format');
    }
    const dateRanges: { start_date: Date, end_date: Date }[] = [];
    let currentStartDate = startDate;
    let count = 0;
    while (count < numberOfDays) {
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
}

const generateDateRangesMonthly = (year: number, month: number, startDateStr: string, endDateStr: string): { start_date: Date, end_date: Date }[] => {
    const startDate = parse(startDateStr, 'yyyy-MM-dd HH:mm', new Date());
    const endDate = parse(endDateStr, 'yyyy-MM-dd HH:mm', new Date());
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
    }
    const dayDifference = differenceInDays(endDate, startDate);
    const dateRanges: { start_date: Date, end_date: Date }[] = [];
    let currentStartDate = startOfMonth(startDate);
    currentStartDate = new Date(year, month, startDate.getDate());
    while (currentStartDate.getFullYear() <= year) {
        const currentEndDate = endOfMonth(currentStartDate);
        const rangeEndDate = addDays(currentStartDate, dayDifference);
        if (rangeEndDate > currentStartDate) {
            dateRanges.push({
                start_date: currentStartDate,
                end_date: rangeEndDate > currentEndDate ? currentEndDate : rangeEndDate
            });
        }
        currentStartDate = addMonths(currentStartDate, 1);
        if (currentStartDate.getFullYear() > year) break;
    }

    return dateRanges;
}

async function onCalendarDayClick(selectedCalendarSchedules: any) {
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
            data: origin === "modal" ? props.edit : props,
        },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data === "dismiss") {
        getSessionSchedules();
    }
}

const displaMdDown = computed(() => {
    const platform = Capacitor.getPlatform();
    return platform === 'android' || platform === 'ios' || window.innerWidth < 768
})


const buttonSize = computed((): "default" | "small" | "large" | undefined => {
    return displaMdDown.value ? 'small' : 'large';
});

const openCreateModal = (): void => {
    const modal = createModal(AddImmunizationSessionModal, { class: 'otherVitalsModal largeModal' });
    modal.then((update) => {
        if (update) getSessionSchedules();
    })
}
</script>


<style scoped>
.heading {
    width: 100%;
    text-align: center;
    font-weight: 700;
}

.search-create-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.skeleton-80 {
    width: 80%;
}

.skeleton-60 {
    width: 60%;
}

.skeleton-30 {
    width: 30%;
}

.schedule-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.session-title {
    text-transform: uppercase;
    font-size: 22px;
}

.calendar-container {
    width: 100%;
    margin: 0 auto;
}

.calendar-container :deep(.vc-header) {
    margin-bottom: 10px;
}

.calendar-container :deep(.vc-header button) {
    background-color: transparent;
    font-size: 22px;
    background-image: none;
}

.calendar-container :deep(.vc-container) {
    width: 100%;
}

.calendar-container :deep(.vc-weeks) {
    grid-template-columns: repeat(7, 1fr);
}

.calendar-container :deep(.vc-day) {
    padding: 0;
}

@media (max-width: 767px) {
    .calendar-container :deep(.vc-day) {
        padding: 10px;
    }
}

.calendar-container :deep(.vc-header) {
    padding: 10px 0;
    font-size: 16px;
    font-weight: 600;
}

.calendar-container :deep(.vc-header-label) {
    font-size: 18px;
}

.calendar-container :deep(.vc-arrow) {
    font-size: 20px;
}

@media (max-width: 767px) {
    .calendar-container {
        max-width: 100%;
        padding: 0;
    }
}

.content-container {
    margin-top: 10px;
    margin-bottom: 10px;
}

.w-full {
    width: 100%;
}

.-mt-40 {
    margin-top: -40px;
}

#svg {
    height: 50px;
    width: 50px;
}

.flex-between {
    display: flex;
    justify-content: space-between;
}

.flex-between>.center {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-title {
    font-size: 22px;
    font-weight: 600;
}

.icon-color {
    color: #969696;
}

.vc-highlight {
    background-color: green !important;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

@media (max-width: 600px) {
    .icon-container svg {
        height: 30px;
        width: 30px;
    }
}

@media (min-width: 601px) {
    .icon-container svg {
        height: 50px;
        width: 50px;
    }
}

.popover-container {
    display: flex;
    align-items: center;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #bbf7d0;
    padding: 5px;
    border-radius: 5px;
    width: 35px;
    height: 35px;
    margin-right: 5px;
}

.text-container {
    margin-left: 10px;
}

.title {
    font-size: 15px;
    margin: 0;
}

.date-range {
    font-size: 15px;
    font-weight: 400;
    margin: 5px 0 0;
}
</style>