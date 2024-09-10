<template>
    <div v-if="showCurrentMilestoneAlert" class="alert_banner">
        <apan>{{ msg }}</apan>
    </div>

    <div v-if="!showCurrentMilestoneAlert" class="alert_banner" style="background: inherit"></div>

    <!-- <div class="swipe_msg">
      <div class="vaccinesTitleDate">(Swipe left or right for other milestones)</div>
    </div> -->

    <carousel v-if="vaccineSchudulesCount > 0" :items-to-show="1" :modelValue="landingSlide" @slide-end="slideEvent">
        <slide v-for="(slide, index) in vaccineSchudulesCount" :key="slide">
            <!-- {{ slide }} -->
            <ion-row class="">
                <div class="container">
                    <customVaccine
                        :vaccines="vaccine_schArray[0][index].antigens"
                        :milestone_status="vaccine_schArray[0][index].milestone_status"
                        :key="componentKey"
                    />
                </div>
                <ion-row class="bottom-row">
                    <div class="center-content">
                        <div class="centerBtns">
                            <ion-button @click="openNextVaccineAppoinment()" class="btnText" fill="solid">Set Next Appointment Date</ion-button>
                        </div>
                    </div>
                </ion-row>
            </ion-row>
        </slide>
        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>

    <ion-row class="bottom-row">
        <div class="otherVaccine center-content">
            <div class="centerBtns">
                <ion-button @click="openAdministerOtherVaccineModal" class="btnText" fill="solid"> Add Other Vaccines </ion-button>
            </div>
        </div>
    </ion-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { IonButton, IonCol, IonRow, IonLabel } from "@ionic/vue";
import customVaccine from "@/apps/Immunization/components/customVaccine.vue";
import administerOtherVaccineModal from "@/apps/Immunization/components/Modals/administerOtherVaccineModal.vue";
import { createModal } from "@/utils/Alerts";
import { mapState } from "pinia";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { getVaccinesSchedule, checkIfLastVaccineAdministered } from "@/apps/Immunization/services/vaccines_service";
import { icons } from "@/utils/svg";
import nextAppointMent from "@/apps/Immunization/components/Modals/nextAppointMent.vue";
import { concat } from "lodash";
import { Appointment } from "@/apps/Immunization/services/immunization_appointment_service";
import HisDate from "@/utils/Date";

export default defineComponent({
    name: "xxxComponent",
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        customVaccine,
        IonButton,
        IonCol,
        IonRow,
        IonLabel,
    },
    data() {
        return {
            vaccine_schArray: [] as any,
            vaccineSchudulesCount: 0,
            milestones: [],
            iconsContent: icons,
            showCurrentMilestoneAlert: false,
            landingSlide: 0,
            msg: "Upcoming Vaccines",
            current_milestone: "" as string,
            componentKey: 0,
        };
    },
    computed: {
        ...mapState(useAdministerVaccineStore, ["vaccineReload"]),
    },
    async mounted() {
        this.loadVaccineSchedule();
    },
    watch: {
        vaccineReload: {
            handler() {
                this.loadVaccineSchedule();
            },
            deep: true,
        },
        vaccine_schArray: {
            handler() {
                this.reloadVaccines();
            },
        },
    },
    methods: {
        openAdministerOtherVaccineModal() {
            createModal(administerOtherVaccineModal, { class: "otherVitalsModal" });
        },
        async loadVaccineSchedule() {
            this.setAppointmentDate()
            const data__ = await getVaccinesSchedule();
            const vaccineScheduleStore = useAdministerVaccineStore();

            vaccineScheduleStore.setVaccineSchedule(data__);
            vaccineScheduleStore.setLastVaccinesGiven([]);
            checkIfLastVaccineAdministered();

            this.vaccineSchudulesCount = vaccineScheduleStore.getVaccineSchedule()?.vaccine_schedule?.length;
            vaccineScheduleStore.resetMissedVaccineSchedules();
            this.vaccine_schArray = [];
            this.vaccine_schArray.push(vaccineScheduleStore.getVaccineSchedule()?.vaccine_schedule);

            vaccineScheduleStore.getVaccineSchedule()?.vaccine_schedule?.forEach((vaccineSchudule: any) => {
                this.findMissingVaccines(vaccineSchudule);
                
                this.findPreviouslyAdministeredVaccineSchedule(vaccineSchudule);
                this.handleSchedule(vaccineSchudule);
                const obj = { visit: vaccineSchudule.visit, age: vaccineSchudule.age };
                this.milestones = this.appendUniqueObject(this.milestones, obj);
            });

            let shouldStop = false;
            vaccineScheduleStore.getVaccineSchedule()?.vaccine_schedule?.forEach((vaccineSchudule: any) => {
                if (shouldStop) return;
                if (this.findSingleUpcomingMilestone(vaccineSchudule) == true) {
                    shouldStop = true;
                    return;
                }
            });

            vaccineScheduleStore.getVaccineSchedule()?.vaccine_schedule?.forEach((vaccineSchudule: any) => {
                this.findCurrentMilestone(vaccineSchudule);
            });
        },
        setSB(vaccineSchudule: any) {
            const vaccineScheduleStore = useAdministerVaccineStore();
            vaccineScheduleStore.setCurrentMilestoneToAdminister({ currentMilestone: vaccineSchudule.age });
            this.landingSlide = vaccineSchudule.visit - 1;
            this.current_milestone = vaccineSchudule.age;
            vaccineScheduleStore.setCurrentMilestone(vaccineSchudule.age);
        },
        handleSchedule(vaccineSchudule: any) {
            if (vaccineSchudule.milestone_status == "upcoming") {
                const vaccineScheduleStore = useAdministerVaccineStore();
                vaccineScheduleStore.setCurrentSchedFound(false);
                this.msg = "Upcoming Vaccines";
                this.showCurrentMilestoneAlert = true;
                this.setSB(vaccineSchudule);
            } else {
                this.setSB(vaccineSchudule);
                const vaccineScheduleStore = useAdministerVaccineStore();
                vaccineScheduleStore.setCurrentSchedFound(false);
            }
        },
        findSingleUpcomingMilestone(vaccineSchudule: any) {
            if (vaccineSchudule.milestone_status == "upcoming") {
                this.setSB(vaccineSchudule);
                return true;
            }
            return false;
        },
        findCurrentMilestone(vaccineSchudule: any) {
            if (vaccineSchudule.milestone_status == "current") {
                this.msg = "Vaccines due today";
                const vaccineScheduleStore = useAdministerVaccineStore();
                vaccineScheduleStore.setCurrentSchedFound(true);
                this.showCurrentMilestoneAlert = true;
                this.setSB(vaccineSchudule);
            }
        },
        slideEvent(SlideEventData: any) {
            const vaccineScheduleStore = useAdministerVaccineStore();
            const CurrentMilestoneToAdminister = vaccineScheduleStore.getCurrentMilestoneToAdminister() as any;
            this.milestones.forEach((milestone: any) => {
                if (milestone.visit - 1 == SlideEventData.currentSlideIndex) {
                    vaccineScheduleStore.setCurrentMilestone(milestone.age);
                    this.current_milestone = milestone.age;
                }
            });

            const templmilesytone = vaccineScheduleStore.getCurrentMilestone();

            if (templmilesytone == CurrentMilestoneToAdminister.currentMilestone) {
                if (vaccineScheduleStore.getCurrentSchedFound() == false) {
                    this.msg = "Upcoming Vaccines";
                }
                if (vaccineScheduleStore.getCurrentSchedFound() == true) {
                    this.msg = "Vaccines due today";
                }
                this.showCurrentMilestoneAlert = true;
                return;
            }

            if (templmilesytone.age != CurrentMilestoneToAdminister.currentMilestone) {
                this.showCurrentMilestoneAlert = false;
            }
        },
        appendUniqueObject(arr: any, obj: any) {
            const exists = arr.some((item: { visit: any; age: any }) => item.visit === obj.visit && item.age === obj.age);
            if (!exists) {
                arr.push(obj);
            }
            return arr;
        },
        isListEmpty(arr: any) {
            if (arr.length > 0) {
                return true;
            }

            if (arr.length == 0) {
                return false;
            }
        },
        findMissingVaccines(milestone: any) {
            const obj = {
                age: milestone.age,
                antigens: [] as any,
            };
            if (milestone.milestone_status == "passed") {
                milestone.antigens.forEach((vaccine: any) => {
                    if (vaccine.status == "pending") {
                        obj.antigens.push(vaccine);
                    }
                });
            }
            const vaccineScheduleStore = useAdministerVaccineStore();
            if (obj.antigens.length > 0) {
                vaccineScheduleStore.setMissedVaccineSchedules(obj);
            }
        },
        findPreviouslyAdministeredVaccineSchedule(milestone: any) {
            const vaccinesPreviouslyAdministered = [] as any
            milestone.antigens.forEach((vaccine: any) => {
                    if (vaccine.status == "administered") {
                        vaccinesPreviouslyAdministered.push(vaccine)
                    }

                })
            if (vaccinesPreviouslyAdministered.length > 0) {
                const vaccineScheduleStore = useAdministerVaccineStore()
                vaccineScheduleStore.setLastVaccinesGiven(vaccinesPreviouslyAdministered)
            }
        },
        reloadVaccines() {
            this.componentKey += 1;
        },
        openNextVaccineAppoinment() {
            createModal(nextAppointMent, { class: "otherVitalsModal" }, false);
        },
        async setAppointmentDate() {
            const store = useAdministerVaccineStore();
            const appointment_service = new Appointment();
            const data = await appointment_service.getNextAppointment();
            const appointmentDate = data.next_appointment_date ? data.next_appointment_date : ''
            store.setNextAppointMentDate(appointmentDate)
        },
    },
});
</script>
<style>
.carousel__icon {
    width: var(--vc-icn-width);
    height: var(--vc-icn-width);
    fill: currentColor;
    background: none;
    /* background: #BBDDBC; */
    color: #016302;
}

.carousel__pagination-button--active {
    background-color: #016302;
}
.carousel__pagination-button::after .carousel__pagination-button--active {
    background-color: hotpink;
}
.otherVaccine {
    padding: 10px;
    margin-bottom: 10px;
}
.centerBtns {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
}
.container {
    display: flex;
    flex-direction: column;
}

.btnTextWeight {
    color: #000;
    --border-width: 1px;
    margin-right: 0px;
}

ion-row {
    width: 100%;
}

.bottom-row {
    margin-top: 20px;
    justify-content: center;
    align-items: center;
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.alert_banner {
    /* Milestone */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    gap: 9px;
    height: 33px;

    /* green/300 */
    background: #ddeedd;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}
.swipe_msg {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;

    /* Inside auto layout */
    flex: none;
    order: 3;
    flex-grow: 0;
}
.vaccinesTitleDate {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #636363;
}
</style>
