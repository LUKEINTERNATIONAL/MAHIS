<template>
    <div v-if="showCurrentMilestoneAlert" class="alert_banner">
        <apan>{{ msg }}</apan>
        <!-- <ion-icon style="margin-top: 7px;" slot="end" size="medium" :icon="iconsContent.greenCalender">
      </ion-icon> -->
        <!-- <span style="font-weight: 700;">{{age}}</span> -->
    </div>

    <div v-if="!showCurrentMilestoneAlert" class="alert_banner" style="background: inherit">
        <!-- <ion-icon style="margin-top: 7px;" slot="end" size="medium" :icon="iconsContent.greenCalender">
      </ion-icon>
      <span style="font-weight: 700;">{{ current_milestone }}</span> -->
    </div>

    <!-- <div class="swipe_msg">
      <div class="vaccinesTitleDate">(Swipe left or right for other milestones)</div>
    </div> -->

    <carousel v-if="vaccineSchudulesCount > 0" :items-to-show="1" :modelValue="landingSlide" @slide-end="slideEvent">
        <slide v-for="(slide, index) in vaccineSchudulesCount" :key="slide">
            <!-- {{ slide }} -->
            <div class="container">
                <customVaccine  :vaccines="vaccine_schArray[index]" :visitId="1"/>
            </div>
        </slide>
        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>

    <carousel>
        <slide v-for="slide in 12" :key="slide">
            <ion-row class="bottom-row">
                <div class="otherVaccine center-content">
                    <div class="centerBtns">
                        <ion-button @click="openAdministerOtherVaccineModal" class="btnText" fill="solid"> Add Other Vaccines </ion-button>
                    </div>
                </div>
            </ion-row>
        </slide>
    </carousel>
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
import { getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service";
import { icons } from "@/utils/svg";

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
            vaccine_schArray: [
            ] as any,
            vaccineSchudulesCount: 0,
            milestones: [],
            iconsContent: icons,
            showCurrentMilestoneAlert: false,
            age: "",
            landingSlide: 0,
            msg: "Vaccines due today",
            current_milestone: "" as string,
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
    },
    methods: {
        openAdministerOtherVaccineModal() {
            createModal(administerOtherVaccineModal, { class: "otherVitalsModal" });
        },
        async loadVaccineSchedule() {
            const data__ = await getVaccinesSchedule();
            const vaccineScheduleStore = useAdministerVaccineStore();

            vaccineScheduleStore.setVaccineSchedule(data__);
            let upcoming_f = false;
            let found = false;
            this.vaccineSchudulesCount = vaccineScheduleStore.getVaccineSchedule().vaccinSchedule.length;
            vaccineScheduleStore.resetMissedVaccineSchedules();
            vaccineScheduleStore.getVaccineSchedule().vaccinSchedule.forEach((vaccineSchudule: any) => {
                this.findMissingVaccines(vaccineSchudule);
                if (vaccineSchudule.milestone_status == "current") {
                    vaccineScheduleStore.setCurrentVisitId(vaccineSchudule.visit);
                    vaccineScheduleStore.setCurrentMilestoneToAdminister({ currentMilestone: vaccineSchudule.age });
                    this.landingSlide = vaccineSchudule.visit - 1;
                    this.age = vaccineSchudule.age;
                    found = true;
                    vaccineScheduleStore.setCurrentSchedFound(true);
                }

                if (found == false && vaccineSchudule.milestone_status == "upcoming" && upcoming_f == false) {
                    vaccineScheduleStore.setCurrentVisitId(vaccineSchudule.visit);
                    vaccineScheduleStore.setCurrentMilestoneToAdminister({ currentMilestone: vaccineSchudule.age });
                    this.landingSlide = vaccineSchudule.visit - 1;
                    this.age = vaccineSchudule.age;
                    upcoming_f = true;
                }

                if (found == false && vaccineSchudule.visit == 12 && upcoming_f == false) {
                    vaccineScheduleStore.setCurrentVisitId(vaccineSchudule.visit);
                    vaccineScheduleStore.setCurrentMilestoneToAdminister({ currentMilestone: vaccineSchudule.age });
                    this.landingSlide = vaccineSchudule.visit - 1;
                    this.age = vaccineSchudule.age;
                    upcoming_f = true;
                }
                const obj = { visit_id: vaccineSchudule.visit, age: vaccineSchudule.age };
                this.milestones = this.appendUniqueObject(this.milestones, obj);

                this.vaccine_schArray.push(vaccineSchudule.antigens)
            });

            if (found == false) {
                vaccineScheduleStore.setCurrentSchedFound(false);
            }

            if (vaccineScheduleStore.getCurrentSchedFound() == true) {
                this.msg = "Vaccines due today";
                this.showCurrentMilestoneAlert = true;
            }

            if (vaccineScheduleStore.getCurrentSchedFound() == false) {
                this.msg = "Upcoming Vaccines";
                this.showCurrentMilestoneAlert = true;
            }
        },
        slideEvent(SlideEventData: any) {
            const vaccineScheduleStore = useAdministerVaccineStore();
            const CurrentMilestoneToAdminister = vaccineScheduleStore.getCurrentMilestoneToAdminister() as any;
            this.milestones.forEach((milestone: any) => {
                if (milestone.visit_id - 1 == SlideEventData.currentSlideIndex) {
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
            const exists = arr.some((item: { visit_id: any; age: any }) => item.visit_id === obj.visit_id && item.age === obj.age);
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
                vaccines: [] as any,
            };
            if (milestone.milestone_status == "passed") {
                milestone.antigens.forEach((vaccine: any) => {
                    if (vaccine.status == "pending") {
                        obj.vaccines.push(vaccine);
                    }
                });
            }
            const vaccineScheduleStore = useAdministerVaccineStore();
            if (obj.vaccines.length > 0) {
                vaccineScheduleStore.setMissedVaccineSchedules(obj);
            }
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
