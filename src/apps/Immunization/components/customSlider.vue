<template>

    <div v-if="showCurrentMilestoneAlert" class="alert_banner">
      <apan>{{ msg }}</apan>
      <!-- <ion-icon style="margin-top: 7px;" slot="end" size="medium" :icon="iconsContent.greenCalender">
      </ion-icon> -->
      <!-- <span style="font-weight: 700;">{{age}}</span> -->
    </div>

    <div v-if="!showCurrentMilestoneAlert" class="alert_banner" style="background: inherit;">
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

          <ion-row class="top-row" v-if="vaccineSchudulesCount == 14">
            <!-- <customVaccine v-for="(item, index2) in vaccine_schArray" :key="index2"  :vaccines="item" :visitId="2"/> -->
            <customVaccine :vaccines="vaccinesScheduleAtBirth" :visitId="1" v-if="slide == 1 && isListEmpty(vaccinesScheduleAtBirth)"/>
            <customVaccine :vaccines="vaccinesSchedule6Weeks" :visitId="2" v-if="slide == 2 && isListEmpty(vaccinesSchedule6Weeks)"/>
            <customVaccine :vaccines="vaccinesSchedule10Weeks" :visitId="3" v-if="slide == 3 && isListEmpty(vaccinesSchedule10Weeks)"/>
            <customVaccine :vaccines="vaccinesSchedule14Weeks" :visitId="4" v-if="slide == 4 && isListEmpty(vaccinesSchedule14Weeks)"/>
            <customVaccine :vaccines="vaccinesSchedule5Months" :visitId="5" v-if="slide == 5 && isListEmpty(vaccinesSchedule5Months)"/>
            <customVaccine :vaccines="vaccinesSchedule6Months" :visitId="6" v-if="slide == 6 && isListEmpty(vaccinesSchedule6Months)"/>
            <customVaccine :vaccines="vaccinesSchedule7Months" :visitId="7" v-if="slide == 7 && isListEmpty(vaccinesSchedule7Months)"/>
            <customVaccine :vaccines="vaccinesSchedule9Months" :visitId="8" v-if="slide == 8 && isListEmpty(vaccinesSchedule9Months)"/>
            <customVaccine :vaccines="vaccinesSchedule15Months" :visitId="9" v-if="slide == 9 && isListEmpty(vaccinesSchedule15Months)"/>
            <customVaccine :vaccines="vaccinesSchedule22Months" :visitId="10" v-if="slide == 10 && isListEmpty(vaccinesSchedule22Months)"/>
            <customVaccine :vaccines="vaccinesSchedule9Years" :visitId="11" v-if="slide == 11 && isListEmpty(vaccinesSchedule9Years)"/>
            <customVaccine :vaccines="vaccinesSchedule12YearsAbove" :visitId="12" v-if="slide == 12 && isListEmpty(vaccinesSchedule12YearsAbove)"/>
            <customVaccine :vaccines="vaccinesSchedule15Years" :visitId="13" v-if="slide == 13 && isListEmpty(vaccinesSchedule15Years)"/>
            <customVaccine :vaccines="vaccinesSchedule18YearsAbove" :visitId="14" v-if="slide == 14 && isListEmpty(vaccinesSchedule18YearsAbove)"/>
          </ion-row>

          <ion-row class="top-row" v-if="vaccineSchudulesCount == 12">
            <!-- <customVaccine v-for="(item, index2) in vaccine_schArray" :key="index2"  :vaccines="item" :visitId="2"/> -->
            <customVaccine :vaccines="vaccinesScheduleAtBirth" :visitId="1" v-if="slide == 1 && isListEmpty(vaccinesScheduleAtBirth)"/>
            <customVaccine :vaccines="vaccinesSchedule6Weeks" :visitId="2" v-if="slide == 2 && isListEmpty(vaccinesSchedule6Weeks)"/>
            <customVaccine :vaccines="vaccinesSchedule10Weeks" :visitId="3" v-if="slide == 3 && isListEmpty(vaccinesSchedule10Weeks)"/>
            <customVaccine :vaccines="vaccinesSchedule14Weeks" :visitId="4" v-if="slide == 4 && isListEmpty(vaccinesSchedule14Weeks)"/>
            <customVaccine :vaccines="vaccinesSchedule5Months" :visitId="5" v-if="slide == 5 && isListEmpty(vaccinesSchedule5Months)"/>
            <customVaccine :vaccines="vaccinesSchedule6Months" :visitId="6" v-if="slide == 6 && isListEmpty(vaccinesSchedule6Months)"/>
            <customVaccine :vaccines="vaccinesSchedule7Months" :visitId="7" v-if="slide == 7 && isListEmpty(vaccinesSchedule7Months)"/>
            <customVaccine :vaccines="vaccinesSchedule9Months" :visitId="8" v-if="slide == 8 && isListEmpty(vaccinesSchedule9Months)"/>
            <customVaccine :vaccines="vaccinesSchedule15Months" :visitId="9" v-if="slide == 9 && isListEmpty(vaccinesSchedule15Months)"/>
            <customVaccine :vaccines="vaccinesSchedule22Months" :visitId="10" v-if="slide == 10 && isListEmpty(vaccinesSchedule22Months)"/>
            <customVaccine :vaccines="vaccinesSchedule12YearsAbove" :visitId="12" v-if="slide == 11 && isListEmpty(vaccinesSchedule12YearsAbove)"/>
            <customVaccine :vaccines="vaccinesSchedule18YearsAbove" :visitId="14" v-if="slide == 12 && isListEmpty(vaccinesSchedule18YearsAbove)"/>
          </ion-row>
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
              <ion-button @click="openAdministerOtherVaccineModal" class="btnText" fill="solid"> 
                Add Other Vaccines 
              </ion-button>
            </div>
          </div>
        </ion-row>
      </slide>
    </carousel>
</template>

  
<script lang="ts">
  import { defineComponent } from "vue";
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import {
    IonButton,
    IonCol,
    IonRow,
    IonLabel
  } from "@ionic/vue"
  import customVaccine from "@/apps/Immunization/components/customVaccine.vue"
  import administerOtherVaccineModal from "@/apps/Immunization/components/Modals/administerOtherVaccineModal.vue"
  import { createModal } from "@/utils/Alerts"
  import { mapState } from "pinia"
  import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"
  import { getVaccinesSchedule } from "@/apps/Immunization/services/vaccines_service"
  import { icons } from "@/utils/svg"
    
  export default defineComponent ({
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
      IonLabel
    },
    data() {
        return {
          vaccinesScheduleAtBirth: [],
          vaccinesSchedule6Weeks: [],
          vaccinesSchedule10Weeks: [],
          vaccinesSchedule14Weeks: [],
          vaccinesSchedule5Months: [],
          vaccinesSchedule6Months: [],
          vaccinesSchedule7Months: [],
          vaccinesSchedule9Months: [],
          vaccinesSchedule15Months: [],
          vaccinesSchedule22Months: [],
          vaccinesSchedule9Years: [],
          vaccinesSchedule12YearsAbove: [],
          vaccinesSchedule15Years: [],
          vaccinesSchedule18YearsAbove: [],
          vaccine_schArray: [
            this.vaccinesScheduleAtBirth,
            this.vaccinesSchedule6Weeks,
            this.vaccinesSchedule10Weeks,
            this.vaccinesSchedule14Weeks,
            this.vaccinesSchedule5Months,
            this.vaccinesSchedule6Months,
            this.vaccinesSchedule7Months,
            this.vaccinesSchedule9Months,
            this.vaccinesSchedule15Months,
            this.vaccinesSchedule22Months,
            this.vaccinesSchedule9Years,
            this.vaccinesSchedule12YearsAbove,
            this.vaccinesSchedule15Years,
            this.vaccinesSchedule18YearsAbove,
          ],
          ages: [
              "At birth",
              "6 weeks",
              "10 weeks",
              "14 weeks",
              "5 months",
              "6 months",
              "7 months",
              "9 months",
              "15 months",
              "22 months",
              "9 years",
              "12 years above",
              "15 years",
              "18 years above"
          ],
            vaccineSchudulesCount: 0,
            milestones: [],
            iconsContent: icons,
            showCurrentMilestoneAlert: false,
            age: '',
            landingSlide: 0,
            msg: 'Vaccines due today',
            current_milestone: "" as string,
        };
    },
    computed: {
      ...mapState(useAdministerVaccineStore, ["vaccineReload"]),
    },
    async mounted() {
      this.loadVaccineSchedule()
    },
    watch: {
      vaccineReload: {
            handler() {
              this.loadVaccineSchedule()
            },
            deep: true,
        },
    },
    methods: {
      openAdministerOtherVaccineModal() {
        createModal(administerOtherVaccineModal, { class: "administerOtherVaccineModal" });
      },
      async loadVaccineSchedule() {
        const data__ = await getVaccinesSchedule()
        const vaccineScheduleStore = useAdministerVaccineStore()

        vaccineScheduleStore.setVaccineSchedule(data__)
        let upcoming_f = false
        let found = false
        this.vaccineSchudulesCount = vaccineScheduleStore.getVaccineSchedule().vaccinSchedule.length
        vaccineScheduleStore.getVaccineSchedule().vaccinSchedule.forEach((vaccineSchudule: any) => {

          console.log(vaccineSchudule.milestone_status)
          if (vaccineSchudule.milestone_status == 'current' ) {
            vaccineScheduleStore.setCurrentVisitId(vaccineSchudule.visit)
            vaccineScheduleStore.setCurrentMilestoneToAdminister({currentMilestone: vaccineSchudule.age})
            this.landingSlide = vaccineSchudule.visit - 1
            this.age = vaccineSchudule.age
            found = true
            vaccineScheduleStore.setCurrentSchedFound(true)
          }

          if (found == false && vaccineSchudule.milestone_status == 'upcoming' && upcoming_f == false) {
            vaccineScheduleStore.setCurrentVisitId(vaccineSchudule.visit)
            vaccineScheduleStore.setCurrentMilestoneToAdminister({currentMilestone: vaccineSchudule.age})
            this.landingSlide = vaccineSchudule.visit - 1
            this.age = vaccineSchudule.age
            upcoming_f = true
          }

          if (found == false && vaccineSchudule.visit == 12 && upcoming_f == false) {
            vaccineScheduleStore.setCurrentVisitId(vaccineSchudule.visit)
            vaccineScheduleStore.setCurrentMilestoneToAdminister({currentMilestone: vaccineSchudule.age})
            this.landingSlide = vaccineSchudule.visit - 1
            this.age = vaccineSchudule.age
            upcoming_f = true
          }

          const obj =  { visit_id: vaccineSchudule.visit, age: vaccineSchudule.age }
          this.milestones = this.appendUniqueObject(this.milestones, obj)

          if (vaccineSchudule.age == this.ages[0]) {
            this.vaccinesScheduleAtBirth = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[1]) {
            this.vaccinesSchedule6Weeks = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[2]) {
            this.vaccinesSchedule10Weeks = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[3]) { 
            this.vaccinesSchedule14Weeks = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[4]) {
            this.vaccinesSchedule5Months = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[5]) {
            this.vaccinesSchedule6Months = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[6]) {
            this.vaccinesSchedule7Months = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[7]) {
            this.vaccinesSchedule9Months = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[8]) {
            this.vaccinesSchedule15Months = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[9]) {
            this.vaccinesSchedule22Months = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[10]) {
            this.vaccinesSchedule9Years = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[11]) {
            this.vaccinesSchedule12YearsAbove = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[12]) {
            this.vaccinesSchedule15Years = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.age == this.ages[13]) {
            this.vaccinesSchedule18YearsAbove = vaccineSchudule.antigens as any
          }

        })
        if (found == false) {
          vaccineScheduleStore.setCurrentSchedFound(false)
        }
      },
      slideEvent(SlideEventData: any) {
        const vaccineScheduleStore = useAdministerVaccineStore()
        const CurrentMilestoneToAdminister = vaccineScheduleStore.getCurrentMilestoneToAdminister() as any
        this.milestones.forEach((milestone: any) => {
          if(milestone.visit_id -1 == SlideEventData.currentSlideIndex) {
            vaccineScheduleStore.setCurrentMilestone(milestone.age)
            this.current_milestone = milestone.age
          }
        })

        const templmilesytone = vaccineScheduleStore.getCurrentMilestone()

        if (templmilesytone == CurrentMilestoneToAdminister.currentMilestone) {
           if (vaccineScheduleStore.getCurrentSchedFound() == false) {
            this.msg = "Upcoming Vaccines"
           }
           if (vaccineScheduleStore.getCurrentSchedFound() == true) {
            this.msg = "Vaccines due today"
           }
            this.showCurrentMilestoneAlert = true
            return
          }

          if (templmilesytone.age != CurrentMilestoneToAdminister.currentMilestone) {
            this.showCurrentMilestoneAlert = false
            
          }
      },
      appendUniqueObject(arr: any, obj: any) {
        const exists = arr.some((item: { visit_id: any; age: any; }) => item.visit_id === obj.visit_id && item.age === obj.age)
        if (!exists) {
          arr.push(obj)
        }
        return arr
      },
      isListEmpty(arr: any) {
        if (arr.length > 0) {
          return true
        }

        if (arr.length == 0) {
          console.log("jere it is")
          return false
        }
      }
    }
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
      font-size: 12px;
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

      width: 430px;
      height: 33px;

      /* green/300 */
      background: #DDEEDD;

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
        font-size: 12px;
        color: #636363;
    }
</style>
  