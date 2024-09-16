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
                        <ion-searchbar :animated="true" placeholder="Search by name..."></ion-searchbar>
                    </div>
                    <div>
                        <ion-button :size="buttonSize" @click="openCreateModal()">
                            <ion-icon slot="start" :icon="add"></ion-icon>
                            Create Session
                        </ion-button>
                    </div>
                </div>

                <div class="content-container">
                    <ion-card-title>Session Schedules</ion-card-title>
                    <ion-card-subtitle>Select schedule day to view more details</ion-card-subtitle>
                    <div class="flex-between">
                        <div>
                            <ion-card v-if="!isLoading">
                                <div class="calendar-container">
                                    <VCalendar color="gray" :is-dark="false" :attributes="attributes" disable-page-swipe
                                        is-expanded borderless @dayclick="onCalendarDayClick"></VCalendar>
                                </div>
                            </ion-card>
                            <ion-list v-else>
                                <ion-item v-for="i in 3" :key="i">
                                    <ion-thumbnail slot="start">
                                        <ion-skeleton-text :animated="true"></ion-skeleton-text>
                                    </ion-thumbnail>
                                    <ion-label>
                                        <h3>
                                            <ion-skeleton-text :animated="true" class="skeleton-80"></ion-skeleton-text>
                                        </h3>
                                        <p>
                                            <ion-skeleton-text :animated="true" class="skeleton-60"></ion-skeleton-text>
                                        </p>
                                        <p>
                                            <ion-skeleton-text :animated="true" class="skeleton-30"></ion-skeleton-text>
                                        </p>
                                    </ion-label>
                                </ion-item>
                            </ion-list>
                        </div>
                        <ion-card v-if="displaySchedules.length > 0" class="w-full ion-hide-sm-down"
                            style="margin-top: 0px;">
                            <ion-list v-for="schedule, index in displaySchedules" v-bind:key="schedule.id">

                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <ion-card-header>
                                        <ion-card-title style="text-transform: uppercase; font-size: 22px;">
                                            ({{ index + 1 }}) {{ schedule.session_name }}
                                        </ion-card-title>
                                        <ion-card-subtitle>
                                            Scheduled from: {{ schedule.start_date }} to {{ schedule.end_date }}
                                        </ion-card-subtitle>
                                    </ion-card-header>

                                    <ion-button id="popover-trigger" slot="end" fill="clear">
                                        <ion-icon slot="icon-only" :icon="ellipsisVertical"></ion-icon>
                                    </ion-button>

                                    <ion-popover trigger="popover-trigger" dismiss-on-select="true">
                                        <ion-content>
                                            <ion-list>
                                                <ion-item button>
                                                    <ion-label>Edit</ion-label>
                                                </ion-item>
                                                <ion-item button>
                                                    <ion-label>Delete</ion-label>
                                                </ion-item>
                                            </ion-list>
                                        </ion-content>
                                    </ion-popover>
                                </div>

                                <ion-card-content class="-mt-40">
                                    <ion-list :inset="true">
                                        <ion-item>
                                            <div slot="start" class="icon-color">
                                                <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                    :height="svgIconHeight" viewBox="0 0 20 20">
                                                    <g fill="currentColor">
                                                        <g opacity="0.2">
                                                            <path d="M9.75 7.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                                                            <path fill-rule="evenodd"
                                                                d="M6.75 8.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                                clip-rule="evenodd" />
                                                            <path fill-rule="evenodd"
                                                                d="M6.8 11.5A1.5 1.5 0 0 0 5.3 13v1.5a1 1 0 0 1-2 0V13a3.5 3.5 0 0 1 7 0v.5a1 1 0 1 1-2 0V13a1.5 1.5 0 0 0-1.5-1.5"
                                                                clip-rule="evenodd" />
                                                            <path d="M12.75 7.75a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
                                                            <path fill-rule="evenodd"
                                                                d="M15.75 8.75a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
                                                                clip-rule="evenodd" />
                                                            <path fill-rule="evenodd"
                                                                d="M15.7 11.5a1.5 1.5 0 0 1 1.5 1.5v1.5a1 1 0 1 0 2 0V13a3.5 3.5 0 0 0-7 0v.5a1 1 0 1 0 2 0V13a1.5 1.5 0 0 1 1.5-1.5"
                                                                clip-rule="evenodd" />
                                                            <path fill-rule="evenodd"
                                                                d="M11.3 14.25a1.5 1.5 0 0 0-1.5 1.5v1.5a1 1 0 0 1-2 0v-1.5a3.5 3.5 0 0 1 7 0v1.5a1 1 0 1 1-2 0v-1.5a1.5 1.5 0 0 0-1.5-1.5"
                                                                clip-rule="evenodd" />
                                                            <path d="M14.25 10.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                                                            <path fill-rule="evenodd"
                                                                d="M11.25 11.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                                clip-rule="evenodd" />
                                                            <path d="M4.25 11.5h5v4h-5zm9 0h5v4h-5z" />
                                                            <path d="M9.25 13.5h4l.5 4.75h-5z" />
                                                        </g>
                                                        <path fill-rule="evenodd"
                                                            d="M5 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                            clip-rule="evenodd" />
                                                        <path fill-rule="evenodd"
                                                            d="M3.854 8.896a.5.5 0 0 1 0 .708l-.338.337A3.47 3.47 0 0 0 2.5 12.394v1.856a.5.5 0 1 1-1 0v-1.856a4.47 4.47 0 0 1 1.309-3.16l.337-.338a.5.5 0 0 1 .708 0m11.792-.3a.5.5 0 0 0 0 .708l.338.337A3.47 3.47 0 0 1 17 12.094v2.156a.5.5 0 0 0 1 0v-2.156a4.47 4.47 0 0 0-1.309-3.16l-.337-.338a.5.5 0 0 0-.708 0"
                                                            clip-rule="evenodd" />
                                                        <path fill-rule="evenodd"
                                                            d="M14 9a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 1a3 3 0 1 1 0-6a3 3 0 0 1 0 6m-4.5 3.25a2.5 2.5 0 0 0-2.5 2.5v1.3a.5.5 0 0 1-1 0v-1.3a3.5 3.5 0 0 1 7 0v1.3a.5.5 0 1 1-1 0v-1.3a2.5 2.5 0 0 0-2.5-2.5"
                                                            clip-rule="evenodd" />
                                                        <path fill-rule="evenodd"
                                                            d="M9.5 11.75a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                                                            clip-rule="evenodd" />
                                                    </g>
                                                </svg>
                                            </div>

                                            <ion-label>
                                                <h3 class="ion-label-h3">Expected Clients</h3>
                                                <p>{{ schedule.session_vaccines?.total_clients }} people (Under 5), {{
                                                    schedule.session_vaccines?.total_missed_doses }} doses required </p>
                                            </ion-label>
                                        </ion-item>
                                        <ion-item>
                                            <div slot="start" class="icon-color">
                                                <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                    :height="svgIconHeight" viewBox="0 0 48 48">
                                                    <g fill="currentColor">
                                                        <path fill-rule="evenodd"
                                                            d="M6.818 14.5a1.157 1.157 0 0 1 0-1.636l6.546-6.546A1.157 1.157 0 1 1 15 7.955l-.818.817l4.09 4.09l3.273-3.272a1.157 1.157 0 1 1 1.637 1.636l-1.637 1.637l13.91 13.91a5.79 5.79 0 0 1 1.295 6.205l1.159 1.159c.605.605.805 1.463.6 2.235l2.673 2.673a1.157 1.157 0 1 1-1.637 1.637l-2.673-2.673a2.31 2.31 0 0 1-2.236-.6l-1.158-1.158a5.79 5.79 0 0 1-6.205-1.296l-2.14-2.14l6.767-6.768l-11.77-11.77l-5.353 5.354L17.147 22h-2.829l-.955-.955l-1.636 1.636a1.157 1.157 0 1 1-1.636-1.636l3.273-3.273l-4.09-4.09l-.82.818a1.157 1.157 0 0 1-1.636 0m5.95-4.313l-2.08 2.08l4.09 4.09l2.08-2.08zM28.687 33.54a3.79 3.79 0 0 0 4.061.847l2.14-2.14a3.79 3.79 0 0 0-.848-4.06l-.504-.505l-5.353 5.354zm6.768 1.414q-.112.113-.229.216l.824.824a.314.314 0 1 0 .445-.444l-.824-.824a6 6 0 0 1-.216.228"
                                                            clip-rule="evenodd" />
                                                        <path
                                                            d="M16 28a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 1-1" />
                                                        <path fill-rule="evenodd"
                                                            d="M8.66 37.689A12.12 12.12 0 0 0 15.5 42a12.12 12.12 0 0 0 6.84-4.31A12.35 12.35 0 0 0 25 29.997V26.4c0-.637-.25-1.247-.695-1.697a2.36 2.36 0 0 0-1.68-.703H8.376c-.63 0-1.234.253-1.68.703A2.4 2.4 0 0 0 6 26.4v3.598a12.35 12.35 0 0 0 2.66 7.69M23 29.999v.004a10.35 10.35 0 0 1-2.228 6.445a10.13 10.13 0 0 1-5.273 3.492a10.13 10.13 0 0 1-5.271-3.492A10.35 10.35 0 0 1 8 30.002V26.4c0-.113.045-.217.117-.29a.36.36 0 0 1 .257-.11h14.252c.092 0 .185.037.257.11a.4.4 0 0 1 .117.29z"
                                                            clip-rule="evenodd" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <ion-label>
                                                <h3 class="ion-label-h3">Vaccines</h3>
                                                <p v-html="getFormattedVaccines(schedule)">
                                                </p>
                                            </ion-label>
                                        </ion-item>
                                        <ion-item>
                                            <div slot="start" class="icon-color">
                                                <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                    :height="svgIconHeight" viewBox="0 0 32 32">
                                                    <path fill="currentColor"
                                                        d="m27 25.586l-2-2V21h-2v3.414L25.586 27z" />
                                                    <path fill="currentColor"
                                                        d="M24 31c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7m0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5s5-2.243 5-5s-2.243-5-5-5m4-4h2V5c0-1.103-.897-2-2-2h-3v2h3z" />
                                                    <circle cx="9" cy="13" r="2" fill="currentColor" />
                                                    <circle cx="16" cy="13" r="2" fill="currentColor" />
                                                    <circle cx="23" cy="13" r="2" fill="currentColor" />
                                                    <path fill="currentColor"
                                                        d="M7 23H4c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h3v2H4v16h3z" />
                                                </svg>
                                            </div>

                                            <ion-label>
                                                <h3 class="ion-label-h3">Session type</h3>
                                                <p>{{ schedule.session_type }} ({{ schedule?.repeat_type }} repeat)</p>
                                            </ion-label>
                                        </ion-item>
                                        <ion-item>
                                            <div slot="start" class="icon-color">
                                                <svg xmlns="http://www.w3.org/2000/svg" :width="svgIconWidth"
                                                    :height="svgIconHeight" viewBox="0 0 256 256">
                                                    <g fill="currentColor">
                                                        <path
                                                            d="M112 168a32 32 0 1 1-32-32a32 32 0 0 1 32 32M80 32a32 32 0 1 0 32 32a32 32 0 0 0-32-32m96 104a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0-40a32 32 0 1 0-32-32a32 32 0 0 0 32 32"
                                                            opacity="0.2" />
                                                        <path
                                                            d="M27.2 126.4a8 8 0 0 0 11.2-1.6a52 52 0 0 1 83.2 0a8 8 0 0 0 11.2 1.59a7.7 7.7 0 0 0 1.59-1.59a52 52 0 0 1 83.2 0a8 8 0 0 0 12.8-9.61A67.85 67.85 0 0 0 203 93.51a40 40 0 1 0-53.94 0a67.3 67.3 0 0 0-21 14.31a67.3 67.3 0 0 0-21-14.31a40 40 0 1 0-53.94 0A67.9 67.9 0 0 0 25.6 115.2a8 8 0 0 0 1.6 11.2M176 40a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-96 0a24 24 0 1 1-24 24a24 24 0 0 1 24-24m123 157.51a40 40 0 1 0-53.94 0a67.3 67.3 0 0 0-21 14.31a67.3 67.3 0 0 0-21-14.31a40 40 0 1 0-53.94 0A67.9 67.9 0 0 0 25.6 219.2a8 8 0 1 0 12.8 9.6a52 52 0 0 1 83.2 0a8 8 0 0 0 11.2 1.59a7.7 7.7 0 0 0 1.59-1.59a52 52 0 0 1 83.2 0a8 8 0 0 0 12.8-9.61A67.85 67.85 0 0 0 203 197.51M80 144a24 24 0 1 1-24 24a24 24 0 0 1 24-24m96 0a24 24 0 1 1-24 24a24 24 0 0 1 24-24" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <ion-label>
                                                <h3 class="ion-label-h3">Assignees</h3>
                                                <p>
                                                    {{ schedule.assignees?.map((assignee: Assignee) =>
                                                        `${assignee.given_name}
                                                    ${assignee.family_name}`).join(', ') }}
                                                </p>
                                            </ion-label>
                                        </ion-item>
                                    </ion-list>
                                </ion-card-content>
                            </ion-list>
                        </ion-card>
                        <ion-card v-if="displaySchedules.length == 0" class="w-full ion-hide-sm-down">
                            <ion-card-content
                                style="display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100%;">
                                <img height="70" style="width: auto; object-fit: cover;"
                                    src="../../public/assets/icon/not-selected.png" alt="schedule-not-selected-icon" />
                                <ion-text>
                                    <h3>Please select immunization session schedules date(s) to view details</h3>
                                </ion-text>
                            </ion-card-content>
                        </ion-card>

                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
    IonContent,
    IonText,
    IonSkeletonText,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonPage,
    IonPopover,
    IonItem,
    IonCard,
    IonLabel,
    IonList,
    IonCardSubtitle,
    IonThumbnail,
    IonIcon,
    IonSpinner,
    IonSearchbar,
    IonCardContent,
} from '@ionic/vue';
import { Capacitor } from '@capacitor/core';
import Toolbar from "@/components/Toolbar.vue";
import { ellipsisVertical, add } from 'ionicons/icons';
import ViewImmunizationSessionModal from '@/components/Modal/ViewImmunizationSessionModal.vue';
import AddImmunizationSessionModal from '@/components/Modal/AddImmunizationSessionModal.vue';
import { SessionScheduleService } from '@/services/session_schedule_service';
import { Assignee, SessionSchedule } from '@/types';
import { createModal } from '@/utils/Alerts';

const schedules = ref<SessionSchedule[]>([]);
const displaySchedules = ref<SessionSchedule[]>([]);
const isLoading = ref<boolean>(false);
const svgIconHeight: number = 50;
const svgIconWidth: number = 50;
const attributes = ref<any[]>([
    {
        key: 'today',
        content: 'green',
        highlight: {
            color: 'green',
            fillMode: 'light',
        },
        bar: 'green',
        dates: new Date(),
        order: 0,
    },
]);

onMounted(async (): Promise<void> => {
    await getSessionSchedules();
});

async function getSessionSchedules(): Promise<void> {
    isLoading.value = true;
    try {
        const sessionService = new SessionScheduleService();
        const data: any = await sessionService.getSessions();
        data.forEach((item: SessionSchedule) => {
            attributes.value.push({
                description: item.session_name,
                isComplete: false,
                dot: {
                    color: new Date(item.end_date) < new Date() ? "gray" : "green",
                    ...(new Date(item.end_date) < new Date() && { class: 'opacity-50' })
                },
                color: new Date(item.end_date) < new Date() ? "gray" : "green",
                content: {
                    color: new Date(item.end_date) < new Date() ? "gray" : "green",
                },
                dates: {
                    start: item.start_date,
                    end: item.end_date,
                },
                popover: {
                    label: item.session_name,
                },
            });
        });
        schedules.value = data;
    } catch (exception: any) {
        console.error(exception);
    } finally {
        isLoading.value = false;
    }
}

async function onCalendarDayClick(calendarDay: any) {
    let hasOverlap = false;
    const selectedSchedules: SessionSchedule[] = [];

    displaySchedules.value = [];

    calendarDay.attributes.forEach((attribute: { description: string }) => {
        schedules.value
            .filter((schedule) => schedule.session_name === attribute.description)
            .forEach((schedule) => {
                const overlappingSchedule = selectedSchedules.find(
                    (s) =>
                        s.session_name === schedule.session_name &&
                        new Date(s.start_date) <= new Date(schedule.end_date) &&
                        new Date(s.end_date) >= new Date(schedule.start_date)
                );

                if (overlappingSchedule) {
                    hasOverlap = true;
                } else {
                    selectedSchedules.push(schedule);
                }
            });
    });

    if (hasOverlap) {
        calendarDay.attributes.forEach((attribute: { description: string }) => {
            schedules.value
                .filter((schedule) => schedule.session_name === attribute.description)
                .forEach((schedule) => {
                    if (!selectedSchedules.some((s) => s.session_name === schedule.session_name)) {
                        selectedSchedules.push(schedule);
                    }
                });
        });
    }

    displaySchedules.value = selectedSchedules;
    const platform = Capacitor.getPlatform();

    if (displaySchedules.value.length > 0) {
        if (platform === 'android' || platform === 'ios' || window.innerWidth < 768) {
            await createModal(ViewImmunizationSessionModal, {
                class: 'otherVitalsModal largeModal mobileView'
            }, true, {
                data: displaySchedules.value,
            });
        }
    }
}

const getFormattedVaccines = (schedule: SessionSchedule): string => {
    const vaccines = schedule.session_vaccines?.vaccines || [];
    return vaccines
        .map((vaccine) => `${vaccine.drug_name}: <b>(${vaccine.missed_doses})</b>`)
        .join(', ');
};

const buttonSize = computed((): "default" | "small" | "large" | undefined => {
    const platform = Capacitor.getPlatform();
    return platform === 'android' || platform === 'ios' ? 'small' : 'large';
});

const openCreateModal = (): void => {
    createModal(AddImmunizationSessionModal, { class: 'otherVitalsModal largeModal' });
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
</style>