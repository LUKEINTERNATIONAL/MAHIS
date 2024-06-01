<template>
    <carousel :items-to-show="1" :modelValue="3" @slide-end="slideEvent">
      <slide v-for="slide in 12" :key="slide">
        <!-- {{ slide }} -->
        <div class="container">

          <span v-if="showCurrentMilestoneAlert">
            <ion-button class="btnText btnTextWeight" style="padding: 0px 5px 0px 5px;" size="small" fill="solid" color="danger">
                <ion-icon slot="start" size="small" :icon="iconsContent.alertDangerRed"></ion-icon>
                <b> at {{ age }} due today</b>
            </ion-button>
          </span>


          <ion-row class="top-row">
            <customVaccine :vaccines="vaccinesForVisit1" :visitId="1" v-if="slide == 1"/>
            <customVaccine :vaccines="vaccinesForVisit2" :visitId="2" v-if="slide == 2"/>
            <customVaccine :vaccines="vaccinesForVisit3" :visitId="3" v-if="slide == 3"/>
            <customVaccine :vaccines="vaccinesForVisit4" :visitId="4" v-if="slide == 4"/>
            <customVaccine :vaccines="vaccinesForVisit5" :visitId="5" v-if="slide == 5"/>
            <customVaccine :vaccines="vaccinesForVisit6" :visitId="6" v-if="slide == 6"/>
            <customVaccine :vaccines="vaccinesForVisit7" :visitId="7" v-if="slide == 7"/>
            <customVaccine :vaccines="vaccinesForVisit8" :visitId="8" v-if="slide == 8"/>
            <customVaccine :vaccines="vaccinesForVisit9" :visitId="9" v-if="slide == 9"/>
            <customVaccine :vaccines="vaccinesForVisit10" :visitId="10" v-if="slide == 10"/>
            <customVaccine :vaccines="vaccinesForVisit11" :visitId="11" v-if="slide == 11"/>
            <customVaccine :vaccines="vaccinesForVisit12" :visitId="12" v-if="slide == 12"/>
          </ion-row>

          <ion-row class="bottom-row">
            <div class="otherVaccine center-content">
              <div class="centerBtns">
                <ion-button @click="openAdministerOtherVaccineModal" class="btnText" fill="solid"> 
                  Add Other Vaccines 
                </ion-button>
              </div>
            </div>
          </ion-row>
        </div>
        
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
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
            vaccinesForVisit1: [],
            vaccinesForVisit2: [],
            vaccinesForVisit3: [],
            vaccinesForVisit4: [],
            vaccinesForVisit5: [],
            vaccinesForVisit6: [],
            vaccinesForVisit7: [],
            vaccinesForVisit8: [],
            vaccinesForVisit9: [],
            vaccinesForVisit10: [],
            vaccinesForVisit11: [],
            vaccinesForVisit12: [],
            milestones: [],
            iconsContent: icons,
            showCurrentMilestoneAlert: false,
            age: '',
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

        vaccineScheduleStore.setCurrentMilestone('14 weeks')
        this.showCurrentMilestoneAlert = true
        this.age = '14 weeks'
        vaccineScheduleStore.setCurrentMilestoneToAdminister({currentMilestone: '14 weeks'})
        vaccineScheduleStore.setCurrentVisitId(4)

        vaccineScheduleStore.setVaccineSchedule(data__)
        vaccineScheduleStore.getVaccineSchedule().vaccinSchedule.forEach((vaccineSchudule: any) => {
          const obj =  { visit_id: vaccineSchudule.visit, age: vaccineSchudule.age }
          this.milestones = this.appendUniqueObject(this.milestones, obj)

          if (vaccineSchudule.visit == 1) {
            this.vaccinesForVisit1 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 2) {
            this.vaccinesForVisit2 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 3) {
            this.vaccinesForVisit3 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 4) { 
            this.vaccinesForVisit4 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 5) {
            this.vaccinesForVisit5 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 6) {
            this.vaccinesForVisit6 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 7) {
            this.vaccinesForVisit7 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 8) {
            this.vaccinesForVisit8 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 9) {
            this.vaccinesForVisit9 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 10) {
            this.vaccinesForVisit10 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 11) {
            this.vaccinesForVisit11 = vaccineSchudule.antigens as any
          }

          if (vaccineSchudule.visit == 12) {
            this.vaccinesForVisit12 = vaccineSchudule.antigens as any
          }

        })
      },
      slideEvent(SlideEventData: any) {
        const vaccineScheduleStore = useAdministerVaccineStore()
        const CurrentMilestoneToAdminister = vaccineScheduleStore.getCurrentMilestoneToAdminister() as any
        this.milestones.forEach((milestone: any) => {
          if(milestone.visit_id -1 == SlideEventData.currentSlideIndex) {
            vaccineScheduleStore.setCurrentMilestone(milestone.age)
          }
        })

        const templmilesytone = vaccineScheduleStore.getCurrentMilestone()

        if (templmilesytone == CurrentMilestoneToAdminister.currentMilestone) {
            this.showCurrentMilestoneAlert = true

            console.log("qawsedrftgyh", this.showCurrentMilestoneAlert)
            return
          }

          if (templmilesytone.age != CurrentMilestoneToAdminister.currentMilestone) {
            this.showCurrentMilestoneAlert = false
            console.log("jmjmk", this.showCurrentMilestoneAlert)
          }
      },
      appendUniqueObject(arr: any, obj: any) {
        const exists = arr.some((item: { visit_id: any; age: any; }) => item.visit_id === obj.visit_id && item.age === obj.age)
        if (!exists) {
          arr.push(obj)
        }
        return arr
      }
    }
  });
</script>
<style>
    .carousel__icon {
    width: var(--vc-icn-width);
    height: var(--vc-icn-width);
    fill: currentColor;
    background: #BBDDBC;
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
</style>
  