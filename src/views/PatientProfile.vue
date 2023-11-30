<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <DemographicBar />
        <ion-row>
            <ion-col size="1" size-lg="1"></ion-col>
            <ion-col size="3" size-lg="3">
                <ion-card style="max-width: 350px; margin-bottom: 20px; background-color: #fff;">
                    <div class="p_name_image">
                        <div class="first_letter">
                            G
                        </div>
                        <div class="p_name"> Godfrey Banda  </div>
                    </div>
                    <ion-card-content>
                          <ion-row>
                              <ion-col size="4">MRN</ion-col>
                              <ion-col >10773807-00-00</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4" >Gendar</ion-col>
                              <ion-col >Male</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4" >Age</ion-col>
                              <ion-col >21y (08 June, 1996)</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4">Allergies</ion-col>
                              <ion-col >mmm</ion-col>
                          </ion-row>
                    </ion-card-content>
                </ion-card>
                <ion-card class="start_new_co" style="max-width: 350px; margin-bottom: 20px;" @click="nav('consultationPlan')">
                    + Start new consultation
                </ion-card>
                <ion-card style="max-width: 350px; margin-bottom: 20px; background-color: #fff;">
                    <ion-accordion-group :value="['first']">
                        <ion-accordion value="first" style="background-color: #fff;" toggle-icon-slot="start">
                            <ion-item slot="header" color="white">
                                <ion-label class="side_title">Templates/Forms</ion-label>
                            </ion-item>
                                <ul style="list-style: none;" slot="content">
                                    <li class="form_list">
                                        <span v-html="iconsContent.form" ></span>
                                        <div class="form_list_content">AETC Form</div>
                                    </li>
                                    <li class="form_list">
                                        <span v-html="iconsContent.inpatient" ></span>
                                        <div class="form_list_content">Medical Inpatient</div>
                                    </li>
                                    <li class="form_list">
                                        <span v-html="iconsContent.notes" ></span>
                                        <div class="form_list_content">Surgucal Notes</div>
                                    </li>
                                    <li class="form_list">
                                        <span v-html="iconsContent.gynacological" ></span>
                                        <div class="form_list_content">Gynacological</div>
                                    </li>
                                    <li class="form_list">
                                        <span v-html="iconsContent.notes" ></span>
                                        <div class="form_list_content">SOAP</div>
                                    </li>
                                    <li class="form_list">
                                        <span v-html="iconsContent.monitoring" ></span>
                                        <div class="form_list_content">Monitoring Chart</div>
                                    </li>
                                    <li class="form_list">
                                        <span v-html="iconsContent.referal" ></span>
                                        <div class="form_list_content">Referal</div>
                                    </li>
                                </ul>
=                                
                                
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-card>
                <ion-card style="max-width: 350px; margin-bottom: 20px; background-color: #fff;">
                    <ion-accordion-group>
                        <ion-accordion value="first" style="background-color: #fff;" toggle-icon-slot="start">
                            <ion-item slot="header" color="white">
                                <ion-label class="side_title">AETC Clerking Sheet</ion-label>
                            </ion-item>
                            <ion-card-content slot="content">
                               
                            </ion-card-content>
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-card>
            </ion-col>
            
            
            <ion-col size="7" size-lg="7">
                <ion-card style="background-color: #fff;">
                    <div class="p_dash_header">
                        <div class="p_title">Consultation Overview</div>
                        <div class="date">
                            <span class="diplay_space_between" id="click-trigger" >
                                <span v-html="iconsContent.calendar" 

                                style="margin-right: 15px; " ></span> 
                                <div>6th Oct, 2023</div>
                            </span>
                            <span v-html="iconsContent.today_date" ></span> 
                        </div>
                    </div>
                    <ion-grid class="grid">
                        <ion-row>
                            <ion-col class="col" style="border-top-left-radius: 4px;">
                            <div class="c_header">
                                   <span style="margin-right: 10px;">Clinical Notes</span> 
                                   <span v-html="iconsContent.notes_expand" id="notes_dialog"></span> 
                            </div>
                            <div class="vitals_overview">
                                <div>
                                    Vitals
                                </div>
                                <div id="vitals_dialog">
                                    <span v-html="iconsContent.vitals_graph" ></span> 
                                </div>
                            </div>
                            <div class="v_result">
                                <div class="obese">
                                    <div>
                                        <span v-html="iconsContent.obese" ></span> 
                                    </div>
                                    <div style="margin-left:40px"> 
                                        <span style="font-weight: 700;"> 25.6</span> obese
                                    </div>
                                </div>
                                <div class="bmi">
                                    <div>
                                        <span v-html="iconsContent.bmi_rusults" ></span> 
                                    </div>
                                    <div style="margin-left:40px">
                                        110/70
                                    </div>
                                </div>
                            </div>
                            <div>
                                Notes
                                <ul class="notes_content">
                                    <li>The patient presents today with concerns related to diabetes 
                                        management and seeks guidance on optimizing</li>
                                    <li>The patient appears well-nourished and in no acute distress</li>
                                    <li>The patient appears well-nourished and in no acute distress .....</li>
                                </ul>
                            </div>
                            
                            </ion-col>
                            <ion-col class="col" style="border-top-right-radius: 4px;" id="investigations_dialog">
                               <div class="c_header">
                                Investigations
                               </div>
                               <div class="laboratory">
                                    <div>RBG (laboratory)</div>
                                    <div><ion-button color="medium" > Open</ion-button></div>
                               </div>
                               <div class="laboratory">
                                    <div>RBG (manual)</div>
                                    <div>Result displays here</div>
                               </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col class="col" style="border-bottom-left-radius: 4px;" id="medications_dialog">
                                <div class="c_header">
                                    Medications
                                </div>
                                <div class="m_name_dosage">
                                    <div class="m_name">
                                        <div>Metformin Extended</div>
                                        <div class="m_btns">
                                            <span v-html="iconsContent.refresh" ></span> 
                                            <span v-html="iconsContent.tree_dot" ></span> 
                                        </div>
                                    </div>
                                    <div class="m_dosage">
                                        750mg / Twice/daily / 30days/ until 2023-09-23
                                    </div>
                                </div>
                                <div class="m_name_dosage">
                                    <div class="m_name">
                                        <div>Metformin Extended</div>
                                        <div class="m_btns">
                                            <span v-html="iconsContent.refresh" ></span> 
                                            <span v-html="iconsContent.tree_dot" ></span> 
                                        </div>
                                    </div>
                                    <div class="m_dosage">
                                        750mg / Twice/daily / 30days/ until 2023-09-23
                                    </div>
                                </div>
                                <div class="m_name_dosage">
                                    <div class="m_name">
                                        <div>Metformin Extended</div>
                                        <div class="m_btns">
                                            <span v-html="iconsContent.refresh" ></span> 
                                            <span v-html="iconsContent.tree_dot" ></span> 
                                        </div>
                                    </div>
                                    <div class="m_dosage">
                                        750mg / Twice/daily / 30days/ until 2023-09-23
                                    </div>
                                </div>
                                
                            </ion-col>
                            <ion-col class="col" style="border-bottom-right-radius: 4px;" id="disposition_dialog" expand="block">
                                <div class="c_header">
                                    Disposition
                                </div>
                                <div class="disposition_title">
                                    Facility 1
                                </div>
                                <div class="diplay_space_between">
                                    <div>
                                        Internal / 2023-11-16 / some reason typing.
                                    </div>
                                    <div>
                                        <span v-html="iconsContent.tree_dot" ></span>
                                    </div>
                                </div>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card>
            </ion-col>
        </ion-row>



        <ion-modal id="example-modal" ref="modal" trigger="disposition_dialog" :is-open="isModalOpen" @dismiss="dismiss">
            <div class="wrapper">
                <div class="modal_title diplay_space_between">
                    <span>Disposition</span>
                    <span @click="dismiss()" style="font-weight: 300;">x</span>
                </div>
                <div class="dashed_bottom_border">
                    <div   div class="disposition_title">
                        Facility 1
                    </div>
                    <div class="diplay_space_between" style="margin-bottom: 10px;">
                        <div>
                            Internal / 2023-11-16 / some reason typing.
                        </div>
                        <div>
                            <span v-html="iconsContent.tree_dot" ></span>
                        </div>
                    </div>
                </div>
            </div>
        </ion-modal>
        <ion-modal id="example-modal" ref="modal" trigger="medications_dialog" :is-open="isModalOpen" @dismiss="dismiss">
            <div class="wrapper">
                <div class="modal_title diplay_space_between">
                    <span>Medications</span>
                    <span @click="dismiss()" style="font-weight: 300;">x</span>
                </div>
                <div class="m_name_dosage">
                    <div class="m_name">
                        <div>Metformin Extended</div>
                        <div class="m_btns">
                            <span v-html="iconsContent.refresh" ></span> 
                            <span v-html="iconsContent.tree_dot" ></span> 
                        </div>
                    </div>
                    <div class="m_dosage">
                        750mg / Twice/daily / 30days/ until 2023-09-23
                    </div>
                </div>
                <div class="m_name_dosage">
                    <div class="m_name">
                        <div>Metformin Extended</div>
                        <div class="m_btns">
                            <span v-html="iconsContent.refresh" ></span> 
                            <span v-html="iconsContent.tree_dot" ></span> 
                        </div>
                    </div>
                    <div class="m_dosage">
                        750mg / Twice/daily / 30days/ until 2023-09-23
                    </div>
                </div>
                <div class="m_name_dosage">
                    <div class="m_name">
                        <div>Metformin Extended</div>
                        <div class="m_btns">
                            <span v-html="iconsContent.refresh" ></span> 
                            <span v-html="iconsContent.tree_dot" ></span> 
                        </div>
                    </div>
                    <div class="m_dosage">
                        750mg / Twice/daily / 30days/ until 2023-09-23
                    </div>
                </div>
            </div>
        </ion-modal>
        <ion-modal id="example-modal" ref="modal" trigger="investigations_dialog" :is-open="isModalOpen" @dismiss="dismiss">
            <div class="wrapper">
                <div class="modal_title diplay_space_between">
                    <span>Investigations</span>
                    <span @click="dismiss()" style="font-weight: 300;">x</span>
                </div>
                <div class="laboratory">
                    <div>RBG (laboratory)</div>
                    <div><ion-button color="medium" > Open</ion-button></div>
                </div>
                <div class="laboratory">
                    <div>RBG (manual)</div>
                    <div>Result displays here</div>
                </div>
            </div>
        </ion-modal>
        <ion-modal id="example-modal" ref="modal" trigger="notes_dialog" :is-open="isModalOpen" @dismiss="dismiss">
            <div class="wrapper">
                <div class="modal_title diplay_space_between">
                    <span>Clinical Notes</span>
                    <span @click="dismiss()" style="font-weight: 300;">x</span>
                </div>
                <div class="vitals_overview">
                    <div>
                        Vitals
                    </div>
                    <div>
                        <span v-html="iconsContent.vitals_graph" ></span> 
                    </div>
                </div>
                <div class="v_result">
                    <div class="obese">
                        <div>
                            <span v-html="iconsContent.obese" ></span> 
                        </div>
                        <div style="margin-left:40px"> 
                            <span style="font-weight: 700;"> 25.6</span> obese
                        </div>
                    </div>
                    <div class="bmi">
                        <div>
                            <span v-html="iconsContent.bmi_rusults" ></span> 
                        </div>
                        <div style="margin-left:40px">
                            110/70
                        </div>
                    </div>
                </div>
                <div>
                    Notes
                    <ul class="notes_content">
                        <li>The patient presents today with concerns related to diabetes 
                            management and seeks guidance on optimizing</li>
                        <li>The patient appears well-nourished and in no acute distress</li>
                        <li>The patient appears well-nourished and in no acute distress .....</li>
                    </ul>
                </div>
            </div>
        </ion-modal>
        <ion-modal id="example-modal" ref="modal" trigger="vitals_dialog" :is-open="isModalOpen" @dismiss="dismiss">
            <div class="wrapper">
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
        </ion-modal>

        <ion-popover trigger="click-trigger" trigger-action="click" 
        :show-backdrop="false" size="auto">
                <ul style="list-style: none; line-height: 50px;">
                    <li>Novermber,2023</li>
                    <li>Today</li>
                    <li>14th Oct, 2023</li>
                    <li>October, 2023</li>
                    <li>14th Oct, 2023</li>
                    <li>1September, 2023</li>
                </ul>
        </ion-popover>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { 
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle,
    IonToolbar,
    IonButton, 
    IonCard, 
    IonCardContent, 
    IonCardHeader,
    IonCardSubtitle, 
    IonCardTitle, 
    IonAccordion, 
    IonAccordionGroup, 
    IonItem, 
    IonLabel,
    IonModal
     } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import DemographicBar from '@/components/DemographicBar.vue'
  import { chevronBackOutline,checkmark } from 'ionicons/icons';
  import Vitals from '@/components/ConsultationPlan/Vitals.vue'
  import Diagnosis from '@/components/ConsultationPlan/Diagnosis.vue'
  import Complications from '@/components/ConsultationPlan/Complications.vue'
  import ConfirmDiagnosis from '@/components/ConsultationPlan/ConfirmDiagnosis.vue'
  import Disposition from '@/components/ConsultationPlan/Disposition.vue'
  import Investigations from '@/components/ConsultationPlan/Investigations.vue'
  import TreatmentPlan from '@/components/ConsultationPlan/TreatmentPlan.vue'
  import { modalController } from '@ionic/vue';
  import { icons } from '@/utils/svg.ts'
  import ApexChart from "vue3-apexcharts";
  import { ref } from 'vue';
  export default defineComponent({
    name: "Home",
    components:{
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        DemographicBar,
        IonButton, 
        IonCard, 
        IonCardContent, 
        IonCardHeader, 
        IonCardSubtitle, 
        IonCardTitle,
        IonAccordion,
        IonAccordionGroup,
        IonItem,
        IonLabel,
        Vitals,
        Diagnosis,
        Complications,
        ConfirmDiagnosis,
        Disposition,
        Investigations,
        TreatmentPlan,
        IonModal,
        ApexChart

    },
    data(){
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
            wizardData: [
                {
                    'title': 'Vitals and other measures',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 1,
                    'last_step': ''
                },
                {
                    'title': 'Provisional diagnosis',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 2,
                    'last_step': ''
                },
                {
                    'title': 'Investigations',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 3,
                    'last_step': ''
                },
                {
                    'title': 'Confirm diagnosis',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 4,
                    'last_step': ''
                },
                {
                    'title': 'Complications',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 5,
                    'last_step': ''
                },
                {
                    'title': 'Treatment',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 6,
                    'last_step': ''
                },
                {
                    'title': 'Disposition',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 7,
                    'last_step': 'last_step'
                },
        ],
        iconsContent: icons,
        isModalOpen: false,
        };
    },
    setup() {
        const modal = ref();

        return { chevronBackOutline,checkmark};
        
    },
    
      methods:{
        openModal() {
            this.isModalOpen = true;
            console.log("fdsfsdfsd")
        },
        dismiss(){
            modalController.dismiss()
        },
        nav(url: any){
            this.$router.push(url);
        }
      }
    })
  </script>
  
  <style scoped>
  #container {
    text-align: center;
    
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    
    color: #8c8c8c;
    
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  .centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ion-item[slot='header']{
    font-size: 20px;
    padding-top:25px;
    font-weight: 600;
  }

 
  .first_letter{
    background-color: #E6E6E6;
    padding: 20px;
    margin-right: 20px;
    font-size: 24px;
    border-radius:4px;
    color:#636363 !important;
  }
  .p_name_image{
    font-size: 24px;
    padding: 0px;
    margin-left: 15px;
    color: #00190E;
    display: flex;
    font-weight: 700;
    height: 64px;
    margin-top: 15px;
    overflow: hidden;
  }
  .p_name{
    max-width: 180px;
  }
  .p_dash_header{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom:solid #cccccc 1px;
  }
  .p_title{
    font-weight: 700;
    font-size: 24px;
    color: #00190E;
  }
  .col{
    border: solid 1px #ccc ;
    padding: 20px;
  }
  .row{
    border-radius: 4px;
    border: solid 1px #ccc ;
  }
  .grid{
    padding: 20px;
  }
  .c_header{
    color:#00190E;
    font-size: 16px;
    font-weight: 600;
    display: flex;
  }
  .v_result{
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .obese{
    background-color:#DDEEDD;
    padding: 0.7vw;
    border-radius: 8px;
    padding-right: 3vw;
    padding-left: 30px;
    display: flex;
    color:#016302;
    align-items: center;
 }
 .bmi{
    background-color: #E6E6E6;
    padding: 0.7vw;
    border-radius: 8px;
    padding-right: 3vw;
    padding-left: 30px;
    display: flex;
    color:#00190E;
    align-items: center;
 }
 .vitals_overview{
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    padding-top: 10px;
 }
 .notes_content{
    color:#00190E;
    font-size:14px;
 }
 .notes_content li{
    padding-bottom: 15px ;
    line-height: 25px;
 }
 .m_name{
    font-weight: 400;
    color: #00190E;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
 }
 .m_name_dosage{
    border-bottom: 1px solid #ccc;
    border-bottom-style: dashed;
    padding-bottom: 20px;
 }
 .m_btns{
    justify-content: space-between;;
    display: flex;
    width: 50px;
 }
 .laboratory{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #00190E;
    border-bottom:solid 1px #ccc;
    border-bottom-style: dashed;
    line-height: 60px;
 }
 .disposition_title{
    font-weight: 700;
    padding: 6px 0px;
 }
 .date{
    display: flex;
    font-weight: 600;
    color: #00190E;
    align-items: center;
    justify-content: space-between;
    width: 200px;
 }
 ion-item[slot="header"] {
  padding-top: 1px;
}
.side_title{
    font-size:14px;
}

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }

  ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
  }

  ion-modal#example-modal ion-icon {
    margin-right: 6px;

    width: 48px;
    height: 48px;

    padding: 4px 0;

    color: #aaaaaa;
  }

  ion-modal#example-modal .wrapper {
    margin-bottom: 10px;
  }
  .diplay_space_between{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal_title{
    font-weight: 700;
    font-size:24px;
    margin-bottom: 15px;
  }

  ion-modal .wrapper {
    width: 50vw;
    padding: 15px 19px;
    min-height: 500px;
}
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
.form_list{
    display: flex;
}
.form_list_content{
    padding-left: 10px;
    color: #00190E;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 15px;
}
.start_new_co{
    background-color: #DDEEDD ;
    color: #006401;
    padding: 15px;
    border-radius:4px;
    margin-bottom: 20px;
    margin-left: 7px;
    max-width: 327px;
    font-weight: 500;
}
</style>
  