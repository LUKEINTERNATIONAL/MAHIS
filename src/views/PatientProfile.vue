<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <div class="content_manager">
        <ion-row class="content_width">
            <ion-col size="3" size-lg="3">
                <ion-card style=" margin-bottom: 20px; background-color: #fff;">
                    <div class="p_name_image">
                        <div class="first_letter">
                            {{ demographics.name.charAt(0) }}
                        </div>
                        <div class="p_name"> {{ demographics.name }}  </div>
                    </div>
                    <ion-card-content>
                          <ion-row>
                              <ion-col size="4">MRN</ion-col>
                              <ion-col >{{ demographics.mrn }}</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4" >Gendar</ion-col>
                              <ion-col >{{ covertGender(demographics.gender) }}</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4" >Age</ion-col>
                              <ion-col >{{ formatBirthdate() }}</ion-col>
                          </ion-row>
                          <ion-row>                              
                              <ion-col size="4">Allergies</ion-col>
                              <ion-col size="8" >
                                <span  v-for="(item, index) in selectedMedicalAllergiesList" :key="index" >
                                    <span class="allergies" v-if="item.selected">{{ item.name }}</span>
                                </span>
                              </ion-col> 
                          </ion-row>
                    </ion-card-content>
                </ion-card>
                <ion-card class="start_new_co" style=" margin-bottom: 20px;" @click="nav()">
                    {{ NCDProgramActionName }}
                </ion-card>
                <ion-card class="start_new_co" style=" margin-bottom: 20px;" >
                    + Enroll in ANC Program
                </ion-card>
                <ion-card class="start_new_co" style=" margin-bottom: 20px;" >
                    + Enroll in OPD Program
                </ion-card>
                <ion-card style=" margin-bottom: 20px; background-color: #fff;">
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
                                
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-card>
                <ion-card style=" margin-bottom: 20px; background-color: #fff;">
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
            
            
            <ion-col size="9" size-lg="9">
                <ion-card style="background-color: #fff;">
                    <div class="p_dash_header">
                        <div class="p_title">Consultation Overview</div>
                        <div class="date">
                            <span class="diplay_space_between" id="open-dates-trigger" >
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
                                <VitalsGrid />
                            
                            </ion-col>
                            <ion-col class="col" style="border-top-right-radius: 4px;">
                                <InvestigationsGrid />
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col class="col" style="border-bottom-left-radius: 4px;">
                                <MedicationsGrid />
                            </ion-col>
                            <ion-col class="col" style="border-bottom-right-radius: 4px;" expand="block">
                                <DispositionGrid />
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card>
            </ion-col>
        </ion-row>
    </div>

        <ion-popover trigger="open-dates-trigger" trigger-action="click" 
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
  import { chevronBackOutline,checkmark } from 'ionicons/icons';
  import { modalController } from '@ionic/vue';
  import { icons } from '@/utils/svg'

  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import DemographicBar from '@/components/DemographicBar.vue'

  
  import DispositionGrid from '@/components/PatientProfileGrid/DispositionGrid.vue'
  import InvestigationsGrid from '@/components/PatientProfileGrid/InvestigationsGrid.vue'
  import MedicationsGrid from '@/components/PatientProfileGrid/MedicationsGrid.vue'
  import VitalsGrid from '@/components/PatientProfileGrid/VitalsGrid.vue'


  import { useDemographicsStore } from '@/stores/DemographicStore'
  import { useGeneralStore } from '@/stores/GeneralStore'
  import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'
  import { mapState } from 'pinia';
  import HisDate from "@/utils/Date";
  import { useEnrollementStore } from '@/stores/EnrollmentStore'

  import { ref } from 'vue';
  export default defineComponent({
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
        IonModal,
        DispositionGrid,
        InvestigationsGrid,
        MedicationsGrid,
        VitalsGrid  
    },
    data(){
        return {
            iconsContent: icons,
            isModalOpen: false,
            NCDProgramActionName: '+ Enroll in NCD Program' as any
        };
    },
    computed:{
        ...mapState(useDemographicsStore,["demographics"]),
        ...mapState(useTreatmentPlanStore,["selectedMedicalAllergiesList"]),
        ...mapState(useEnrollementStore,["NCDNumber"]),
        ...mapState(useGeneralStore,["saveProgressStatus"]),
    },
    mounted() {
        this.NCDProgramActionName = this.setProgramActionName()
    },
    setup() {
        const modal = ref();

        return { chevronBackOutline,checkmark};
        
    },
    
      methods:{
        openModal() {
            this.isModalOpen = true;
        },
        dismiss(){
            modalController.dismiss()
        },
        nav(){
            sessionStorage.setItem("app", JSON.stringify({'programID':14,'applicationName':'OPD'}));
            let url =''
            if(this.NCDProgramActionName == '+ Start new NCD consultation' || this.NCDProgramActionName == '+ Continue NCD consultation')
                url ='consultationPlan'
            if(this.NCDProgramActionName = '+ Enroll in NCD Program')
                url ='NCDEnrollment'

            this.$router.push(url);
        },
        covertGender(gender: any){
            return ['Male', 'M'].includes(gender) ? 'Male' : ['Female', 'F'].includes(gender) ? 'Female' : ''
        },
        formatBirthdate(){
          return  HisDate.getBirthdateAge(this.demographics.birthdate) 
        },
        setProgramActionName(){
            if(this.NCDNumber[0].data.rowData[0].colData[0].value != '')
                return '+ Start new NCD consultation' 
            else if(this.saveProgressStatus)
               return "+ Continue NCD consultation"
            else
                return '+ Enroll in NCD Program'
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
    width: 600px;
    height: 37.4vh;
  }
  .row{
    border-radius: 4px;
    border: solid 1px #ccc ;
  }
  .grid{
    padding: 20px;
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
    font-weight: 500;
    cursor: pointer;
}
.allergies{
    background: #FECDCA;
    color: #B42318;
    padding: 1px 8px;
    border-radius: 4px ;
    margin-right:5px ;
    display: inline-block; 
    margin-bottom: 5px;
}
</style>
  