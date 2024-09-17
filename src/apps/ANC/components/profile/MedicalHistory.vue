<template>

    <div class="container">
      <!-- Chronical Health conditions -->
      <ion-card class="section">
        <ion-card-content>
          <basic-form
              :contentData="exisitingChronicHealthConditions"
              :initialData="initialData2"
              @update:selected="handleInputData"
              @update:inputValue="handleInputData"
          ></basic-form>
        </ion-card-content>
      </ion-card>
         <!-- Past Surgeries -->
            <ion-card class="section">
            <ion-card-content>
                <basic-form
                    :contentData="medicalHistory"
                    :initialData="initialData"
                ></basic-form>
            </ion-card-content>
            </ion-card>

         <!-- Allegies -->
          <ion-card  class="section">
            <ion-card-content>
                <basic-form
                    :contentData="allegy"
                    :initialData="initialData1"
                ></basic-form>
            </ion-card-content>
            </ion-card>

<!--        &lt;!&ndash; HIV &ndash;&gt;-->
<!--            <ion-card  class="section">-->
<!--            <ion-card-header>-->
<!--                <ion-card-title class="dashed_bottom_border sub_item_header">HIV</ion-card-title>-->
<!--            </ion-card-header>-->
<!--            <ion-card-content>-->
<!--                <basic-form :contentData="hivTest"></basic-form>-->
<!--            </ion-card-content>-->
<!--            </ion-card>-->

        <!-- Syphilis Test -->

<!--            <ion-card class="section">-->
<!--            <ion-card-header>-->
<!--                <ion-card-title class="dashed_bottom_border sub_item_header">Syphilis</ion-card-title>-->
<!--            </ion-card-header>-->
<!--            <ion-card-content>-->
<!--                <basic-form :contentData="syphilisTest"></basic-form>-->
<!--            </ion-card-content>-->
<!--            </ion-card>-->


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
import { LocationService } from "@/services/location_service"
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue,
    // modifyCheckboxHeaderValue,
    modifyCheckboxInputField,
    modifyCheckboxHeader} from '@/services/data_helpers'
 import {validateField} from "@/services/ANC/profile_validation_service";

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
            currentSection: 0,
            initialData:[] as any,
            initialData1:[] as any,
            initialData2:[] as any,

            //art data
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            conditionStatus: "" as any,
            data: [] as any,
            facilityData: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedCondition: "" as any,
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
        this.initialData=medicalHistory.getInitial()
        this.initialData1=allegy.getInitial1()
        this.initialData2=exisitingChronicHealthConditions.getInitial2()
        this.handleHivResults()
        this.handleSyphilis()
        this.handleSurgries()
        this.handleAllergies()
        this.handleChronicCondition()
        this.handleHivConducted()
        this. handleHivConductedOptin()
        this.handleOtherHiv()
        this. handleSyphlisdate()
        this.handleDisable()
        this. handleSyphilisNotDone()
        this.handleSpecifySyphilis()
        this.handleTestNotDone()
      this.handleHIVPositive()

    },

    watch:{
        hivTest:{
            handler(){
                this.handleHivResults()
                this.handleOtherHiv()
                this.handleHivConducted()
                this.handleTestNotDone()
                this. handleHivConductedOptin()

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
            handler(col){
                this.handleChronicCondition()
                this.handleHIVPositive()
              this.handleInputData(col)
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
        ExistingChronicConditions(){ return getCheckboxSelectedValue(this.exisitingChronicHealthConditions, 'chronic conditions')},


      },
    methods:{
      validationRules(col: any) {
        return validateField(this.exisitingChronicHealthConditions,col.name, (this as any)[col.name]);
      },
        async handleInputData(col:any){
          this.validationRules(col)
          if(col.inputHeader  == "Facility for ART"){

                this.facilityData = await this.getFacility(col.value);
                modifyFieldValue(this.exisitingChronicHealthConditions,'facility for art',"popOverData",{
                filterData: false,
                data: this.facilityData,
              },)

            }

        },
        async getFacility(value:any){
           const data = await LocationService.getFacilities({ name: value })
            return data
        },
        // displaying other input fields when hiv positive is checked
      handleHIVPositive(){
         if(getCheckboxSelectedValue(this.exisitingChronicHealthConditions,'HIV positive')?.value=='hiv positive')
         {
           modifyFieldValue(this.exisitingChronicHealthConditions,'HIV test date', 'displayNone', false)
           modifyRadioValue(this.exisitingChronicHealthConditions, 'Is client on ART','displayNone', false)


         }else {
           modifyFieldValue(this.exisitingChronicHealthConditions,'HIV test date', 'displayNone', true)
           modifyRadioValue(this.exisitingChronicHealthConditions, 'Is client on ART','displayNone', true)
         }
      },
        handleHivResults(){
            if(getRadioSelectedValue(this.hivTest,'test2') == 'hivPositive'){
                modifyRadioValue(this.hivTest,'test1','displayNone',false)
            }else{
                modifyRadioValue(this.hivTest,'test1','displayNone',true)
            }

        },

        handleHivConductedOptin(){
            if(getRadioSelectedValue(this.hivTest,'hivOption') == 'hivTestConducted'){
                modifyRadioValue(this.hivTest,'test2','displayNone',false)
            }else{
                modifyRadioValue(this.hivTest,'test2','displayNone',true)
            }

        },
        handleOtherHiv(){
            if(getCheckboxSelectedValue(this.hivTest,'Other')?.value =='other'){
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
            const checkBoxes=["Dilation and currettage","Myomectomy","Removal of ovarian cystst",
                              "Oophorectomy","Salpingectomy","Cervical cone", "Other",]

               if (getCheckboxSelectedValue(this.medicalHistory, 'None')?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.medicalHistory, checkbox, 'checked', false);
                    modifyCheckboxValue(this.medicalHistory, checkbox, 'disabled', true);
                });
                } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.medicalHistory, checkbox, 'disabled', false);
                });
                }


        },

        handleAllergies(){

            const checkBoxes = ['Other','PrEP(TDF)','Albendazole','Aluminium-hydroxide',
                                 'Calcium','Chamomile','Folic-acid','Ginger','Fish',
                                'Iron','sulfadoxine-pyrimethamine','Mebendazole','Penicillin'];

                if (getCheckboxSelectedValue(this.allegy, 'None')?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.allegy, checkbox, 'checked', false);
                    modifyCheckboxValue(this.allegy, checkbox, 'disabled', true);
                });
                } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.allegy, checkbox, 'disabled', false);
                });
                }

        },
        handleChronicCondition(){

            const checkBoxes=["Auto-immune desease","Asthma","Sickle cell","Anemia", "HIV positive",
                             "Thalassemia","Gynaecological","CCF","RHD","Gynae Cancer","Diabetes Type 1","Diabetes Type 2","Gestational diabetes",
                             "pre-existing type 1","pre-existing type 2","Epilepsy","Hypertension","Kidney Disease","TB","Mental illness","Other"]

                if (getCheckboxSelectedValue(this.exisitingChronicHealthConditions, 'None')?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.exisitingChronicHealthConditions, checkbox, 'checked', false);
                    modifyCheckboxValue(this.exisitingChronicHealthConditions, checkbox, 'disabled', true);
                });
                } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.exisitingChronicHealthConditions, checkbox, 'disabled', false);
                });
                }





        },
        handleHivConducted(){
            if(getRadioSelectedValue(this.hivTest,'hivOption')=='hivTestConducted'){
                modifyFieldValue(this.hivTest,'testDate','displayNone',false)
            }else{
                 modifyFieldValue(this.hivTest,'testDate','displayNone',true)
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
            if(getCheckboxSelectedValue(this.medicalHistory,'NoSurgery') =='otherSurguries'){
                modifyCheckboxHeader(this.medicalHistory,'Other','disabled',true)
            }else{
                 modifyCheckboxHeader(this.medicalHistory,'Other','disabled',false)
            }

        },
        handleSyphilisNotDone(){
            if(getRadioSelectedValue(this.syphilisTest,'syphilisOption')?.value =='syphilisTestNotDone'){
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

  color:black;
  width:100%
}
    
</style>