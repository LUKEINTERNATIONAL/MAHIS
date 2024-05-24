<template>
    <carousel :items-to-show="1" :modelValue="2">
      <slide v-for="slide in 2" :key="slide">
        <!-- {{ slide }} -->
        <div class="container">
          <ion-row class="top-row">
            <customSlider :vaccines="vaccines" v-if="slide == 1"/>
            <customSlider :vaccines="vaccines2" v-if="slide == 2"/>
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
  
  <script>
  // If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import {
    IonButton,
    IonCol,
    IonRow,
} from "@ionic/vue"
  import customSlider from "@/apps/Immunization/components/customVaccines.vue"
  import administerOtherVaccineModal from "@/apps/Immunization/components/Modals/administerOtherVaccineModal.vue"
  import { createModal } from "@/utils/Alerts"
  
  export default {
    name: 'App',
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
      customSlider,
      IonButton,
      IonCol,
      IonRow,
    },
    data() {
        return {
            vaccineSlides: [],
            vaccines: [
                'OPV 2',
                'OPV 2',
                'OPV 2',
                'OPV 2',
            ],
            vaccines2: [
                'OPV 4',
                'OPV 5',
                'OPV 5',
                'OPV 6',
                'OPV 5',
                'OPV 5',
            ],
        };
    },
    async mounted() {
      this.vaccineSlides.push(customSlider)  
    },
    methods: {
      openAdministerOtherVaccineModal() {
        createModal(administerOtherVaccineModal, { class: "otherVitalsModal" });
      },
    }
  }
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

    ion-row {
      width: 100%;
    }

    .bottom-row {
      margin-top: 20px; /* Adjust the value as needed */
      justify-content: center; /* Centers content horizontally */
      align-items: center; /* Centers content vertically */
    }

    .center-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    

</style>
  