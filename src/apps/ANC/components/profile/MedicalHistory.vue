<template>

    <div class="container">
         <!-- Past Surgeries -->
            <ion-card class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Past Surgeries</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="medicalHistory"></basic-form>
            </ion-card-content>
            </ion-card>

         <!-- Allegies -->
          <ion-card  class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Allergies</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="allegy"></basic-form>
            </ion-card-content>
            </ion-card>

        <!-- Chronical Health conditions -->
            <ion-card class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Existing Chronic Health Conditions</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="exisitingChronicHealthConditions"></basic-form>
            </ion-card-content>
            </ion-card>

        <!-- HIV -->
            <ion-card  class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">HIV</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hivTest"></basic-form>
            </ion-card-content>
            </ion-card>

        <!-- Syphilis Test -->

            <ion-card class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Syphilis</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="syphilisTest"></basic-form>
            </ion-card-content>
            </ion-card>


<!--    &lt;!&ndash; Navigation Buttons &ndash;&gt;-->
<!--    <div class="navigation-buttons">-->
<!--      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Save</ion-button>-->
<!--    </div>-->

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
    modifyCheckboxValue,
    // modifyCheckboxHeaderValue,
    modifyCheckboxInputField,
    modifyCheckboxHeader} from '@/services/data_helpers'

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
        // this. handleReasonNotDone()
        this. handleSyphlisdate()
        // this.handleTestNotDone()
        this.handleDisable()
        this. handleSyphilisNotDone()
        this.handleSpecifySyphilis()
        this.handleTestNotDone()
    
    },

    watch:{
        hivTest:{
            handler(){
                this.handleHivResults()
                this.handleOtherHiv()
                this.handleHivConducted()
                this.handleTestNotDone()
                // this. handleReasonNotDone()
            },
             deep:true,
        },
        syphilisTest:{
            handler(){
                this.handleSyphilis()
                this. handleSyphlisdate()
                this. handleSyphilisNotDone()
                this.handleSpecifySyphilis()
            },
            deep:true
        },
        medicalHistory:{
            handler(){
                this.handleSurgries()
                this.handleDisable()
                
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
        handleTestNotDone(){
            if(getRadioSelectedValue(this.hivTest,'hivOption')=='hivTestNotDone'){
                modifyCheckboxHeader(this.hivTest,'hivOutcome','displayNone',false)
            }else{
                 modifyCheckboxHeader(this.hivTest,'hivOutcome','displayNone',true)
            }
        },
        handleSyphlisdate(){
            if(getRadioSelectedValue(this.syphilisTest,'syphilisOption')=='syphilisTestConducted'){
                modifyFieldValue(this.syphilisTest,'syphilisDate','displayNone',false)
            }else{
                modifyFieldValue(this.syphilisTest,'syphilisDate','displayNone',true)
            }
        },
        handleDisable(){
            if(getCheckboxSelectedValue(this.medicalHistory,'trydis')=='otherSurguries'){
                modifyCheckboxHeader(this.medicalHistory,'OtherS','disableStatus',true)
            }else{
                 modifyCheckboxHeader(this.medicalHistory,'OtherS','disableStatus',false)
            }
            console.log(getCheckboxSelectedValue(this.medicalHistory,'NoSurgery'))
        },
        handleSyphilisNotDone(){
            if(getRadioSelectedValue(this.syphilisTest,'syphilisOption')=='syphilisTestNotDone'){
                modifyCheckboxHeader(this.syphilisTest,'notDone','displayNone',false)
            }else{
                modifyCheckboxHeader(this.syphilisTest,'notDone','displayNone',true)
            }
        },
        handleSpecifySyphilis(){
            if(getCheckboxSelectedValue(this.syphilisTest,'Other')=='other'){
                modifyFieldValue(this.syphilisTest,'Reason','displayNone',false)
            }else{
                 modifyFieldValue(this.syphilisTest,'Reason','displayNone',true)
            }
            console.log(getCheckboxSelectedValue(this.syphilisTest,'notDone'))
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