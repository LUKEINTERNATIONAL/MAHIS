<template>
  <div class="modal_wrapper">
    <div class="modal_title diplay_space_between">
      <div class="diplay_space_between" style="min-width: 270px">
          <span>Vitals</span>
          <div class="diplay_space_between bmi_blood">
              <div class="_bmi">BMI</div>
              <div class="bp">Blood pressure</div>
          </div>
      </div>
      <span @click="dismiss()" style="font-weight: 300;">x</span>
    </div>
    <div>
      <ApexChart width="100%" height="390px" type="area" :options="options" :series="series" />
    </div>
  </div>
</template>
  
<script lang="ts">
    import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            modalController 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';
    import ApexChart from "vue3-apexcharts";

    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        ApexChart    },
        data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        fill: {
            colors: ['#006401'] ,
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  },
  stroke: {
    curve: 'straight',
    colors: ['#006401'],  // Specify the color you want for the line on top of the area
    width: 2,  // Set the width of the line
  },
  markers: {
    size: 3,  // Set the size of the dots
    colors: ['#006401'],
    strokeColors: ['#006401'],
    hover: {
      size: 5,
      sizeOffset: 3
    }
  },
  dataLabels: {
    enabled: false,  
  },
  grid: {
    show: true,
    borderColor: '#B3B3B3',
    strokeDashArray: 4,
    position: 'front',
    xaxis: {
        lines: {
            show: true
        }
    },   
    yaxis: {
        lines: {
            show: true
        }
    },  
    row: {
        colors: '',
        opacity: 0.5
    },  
    column: {
        colors: '',
        opacity: 0.5
    },  
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },  
},
        xaxis: {
            categories: [
            "02-13",
            "03-14",
            "04-12",
            "05-13",
            "06-13",
            "07-13",
            "08-13",
            "09-13",
            "10-13",
            "11-13"
            ]
        },
        yaxis: {
          min: 0,
          forceNiceScale: true,
          title: {
            text: 'Number of clients',
            align: 'left'
          }
        },
      },
            series: [
                {
                name: "Series 1",
                data: [15, 14, 14.5, 13.7, 15.5, 16, 17, 17, 16.5, 17.5]
                }
            ],
        iconsContent: icons,
    };
  },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
      dismiss(){
        modalController.dismiss()
      }
    }
    });
</script>

<style scoped>


.bmi_blood{
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #DDEEDD;
    border-radius: 4px;
    padding: 4px;
    min-width: 190px;
}
._bmi{
    background-color: #DDEEDD;
    color: #006401;
    padding: 5px;
    border-radius: 4px;
    
}
</style>
  