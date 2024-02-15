<template>

    <div class="container">
         <!-- Past Surgeries -->
            <ion-card v-if="currentSection === 0" class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Past Surgeries</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="medicalHistory"></basic-form>
            </ion-card-content>
            </ion-card>

         <!-- Allegies -->
          <ion-card v-if="currentSection === 1" class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Allergies</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="allegy"></basic-form>
            </ion-card-content>
            </ion-card>

        <!-- Chronical Health conditions -->
            <ion-card v-if="currentSection === 2" class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Existing Chronic Health Conditions</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="exisitingChronicHealthConditions"></basic-form>
            </ion-card-content>
            </ion-card>

        <!-- HIV -->
            <ion-card v-if="currentSection === 3" class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">HIV</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hivTest"></basic-form>
            </ion-card-content>
            </ion-card>

        <!-- Syphilis Test -->

            <ion-card v-if="currentSection === 4" class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Syphilis</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="syphilisTest"></basic-form>
            </ion-card-content>
            </ion-card>


    <!-- Navigation Buttons -->
    <div class="navigation-buttons">
      <ion-button @click="goToPreviousSection" expand="block" color="primary" size="medium">Previous</ion-button>
      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Next</ion-button>
    </div>

    </div>



</template>

<script lang="ts">
 import{
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect
 } from "@ionic/vue";
 import { mapState } from 'pinia';
 import {defineComponent} from 'vue';
 import {ref} from 'vue';
 import BasicInputField from "@/components/BasicInputField.vue";
 import {useMedicalHistoryStore} from "@/apps/ANC/store/profile/medicalHistoryStore";
 import BasicForm from '@/components/BasicForm.vue';
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue} from '@/services/data_helpers'

//  import {icons} from "@/utils/svg.ts"

export default defineComponent({
    name:"Past Surguries",
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonToggle,
        IonSelect,
        IonSelectOption,
        IonInput,
        BasicInputField,
        BasicForm
    },
    data(){
        return{
            currentSection: 0
        }
    },
    mounted(){
        const medicalHistory =useMedicalHistoryStore()
        const allegy = useMedicalHistoryStore()
        const exisitingChronicHealthConditions = useMedicalHistoryStore()
        const blood = useMedicalHistoryStore()
        const cancerIssue = useMedicalHistoryStore()
        const heartProblem = useMedicalHistoryStore()
        const diabetes = useMedicalHistoryStore()
        const hivTest = useMedicalHistoryStore()
        const syphilisTest = useMedicalHistoryStore()
        const  hKTMI = useMedicalHistoryStore()
        const  otherSite = useMedicalHistoryStore()  
        this.handleHivResults()
        this.handleSyphilis()
        this.handleSurgries()
        this.handleAllergies()
        this.handleChronicCondition()
        this.handleHivConducted()
        this.handleOtherHiv()
        // this.handleTestNotDone()
        
        
        
    },

    watch:{
        hivTest:{
            handler(){
                this.handleHivResults()
                this.handleOtherHiv()
                this.handleHivConducted()

                // this.handleTestNotDone()
            },
             deep:true,
        },
        syphilisTest:{
            handler(){
                this.handleSyphilis()
            },
            deep:true
        },
        medicalHistory:{
            handler(){
                this.handleSurgries()
            },
            deep:true
        },
        allegy:{
            handler(){
                this.handleAllergies()
            },
            deep:true
        },
        exisitingChronicHealthConditions:{
            handler(){
                this.handleChronicCondition()
            },
            deep:true
        }
        
    },
      computed:{
        ...mapState(useMedicalHistoryStore,["medicalHistory"]),
        ...mapState(useMedicalHistoryStore,["allegy"]),
        ...mapState(useMedicalHistoryStore,["exisitingChronicHealthConditions"]),
        ...mapState(useMedicalHistoryStore,["hivTest"]),
        ...mapState(useMedicalHistoryStore,["syphilisTest"]),
       
    },
    methods:{
        handleHivResults(){
            
            if(getRadioSelectedValue(this.hivTest,'test2') == 'hivPositive'){
                modifyRadioValue(this.hivTest,'test1','displayNone',false)
            }else{
                modifyRadioValue(this.hivTest,'test1','displayNone',true)
            }
             
        },
        handleOtherHiv(){
            if(getCheckboxSelectedValue(this.hivTest,'Other')=='other'){
                modifyFieldValue(this.hivTest,'reasonsTestNotDone','displayNone',false)
            }else{
                modifyFieldValue(this.hivTest,'reasonsTestNotDone','displayNone',true)
            }
        },
        handleSyphilis(){
           if(getRadioSelectedValue(this.syphilisTest,'syphilisOption') == 'syphilisTestConducted'){
              modifyRadioValue(this.syphilisTest,'syphilisDetails','displayNone',false)
           }else{
             modifyRadioValue(this.syphilisTest,'syphilisDetails','displayNone',true)
           }
           

        },
        handleSurgries(){
            if(getCheckboxSelectedValue(this.medicalHistory,'Other') == 'otherSurguries'){
                modifyFieldValue(this.medicalHistory,'specify','displayNone',false)
            }else{
                modifyFieldValue(this.medicalHistory,'specify','displayNone',true)
            }

 
        },
        handleAllergies(){
            if(getCheckboxSelectedValue(this.allegy,'Other')=='otherAllergies'){
                modifyFieldValue(this.allegy,'other',"displayNone",false)
            }else{
                modifyFieldValue(this.allegy,'other',"displayNone",true)
            }
        },
        handleChronicCondition(){
            if(getCheckboxSelectedValue(this.exisitingChronicHealthConditions,'Other')=='other'){
                modifyFieldValue(this.exisitingChronicHealthConditions,'Specify',"displayNone",false)
            }else{
                modifyFieldValue(this.exisitingChronicHealthConditions,'Specify',"displayNone",true)
            }
              console.log(getCheckboxSelectedValue(this.exisitingChronicHealthConditions,'Other'))
        },
        handleHivConducted(){
            if(getRadioSelectedValue(this.hivTest,'hivOption')=='hivTestConducted'){
                modifyFieldValue(this.hivTest,'birthdate','displayNone',false)
            }else{
                 modifyFieldValue(this.hivTest,'birthdate','displayNone',true)
            }
        },


      goToNextSection() {
        if (this.currentSection < 4) {
          this.currentSection++;
        }
      },
      goToPreviousSection() {
        if (this.currentSection > 0) {
          this.currentSection--;
        }
      },
      
    }
})
</script>
<style scoped>


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; /* Adjust max-width as needed */
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}
ion-card {
  box-shadow:none;
  background-color:inherit;
}
    
</style>