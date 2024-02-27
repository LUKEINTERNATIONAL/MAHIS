<template>
  <div class="container">
    <!-- Height and Weight Section -->
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Height and Weight</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="heightWeight" @update:inputValue="validaterowData($event)"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- Blood Pressure Section -->
    <ion-card  class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Blood Pressure</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="bloodPressure" @update:inputValue="validaterowData($event)"></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Temperature and Pulse Section -->
    <ion-card  class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Temperature and Pulse</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="temperature" @update:inputValue="validaterowData($event)"></basic-form>
        <basic-form :contentData="pulse" @update:inputValue="validaterowData($event)"></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Respiratory Exam -->
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Respiration Exam</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="respiration"></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- Pre-eclampsia Section -->
    <ion-card  class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header"> Pre-eclampsia with severe symptoms</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="preEclampsia" @update:inputValue="validaterowData($event)"></basic-form>
      </ion-card-content>
    </ion-card>

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
  menuController,
  IonInput, IonToggle
} from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { icons } from '@/utils/svg';
    import { iconBloodPressure } from '@/utils/SvgDynamicColor';
    import { BMIService } from "@/services/bmi_service"
    import { useDemographicsStore } from '@/stores/DemographicStore'
    import { useAncVitalsStore} from "@/apps/ANC/store/physical exam/AncVitalsStore";
    import { mapState } from 'pinia';
    import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
    import { arePropertiesNotEmpty } from "@/utils/Objects";
    import HisDate from "@/utils/Date";
    import BasicInputField from "@/components/BasicInputField.vue"
    import { VitalsService} from "@/services/ANC/anc_vitals_service";
    import BasicForm from '@/components/BasicForm.vue';
    import { Service } from "@/services/service";
    import {
    modifyRadioValue,
    modifyCheckboxValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyFieldValue
  } from "@/services/data_helpers";

export default defineComponent({
    components:{
      IonToggle,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        BasicInputField,
        BasicForm
    },
    data() {
    return {
        iconsContent: icons,
        BMI: {} as any,
        BPStatus: {} as any,
        vValidations: '' as any,
        hasValidationErrors: [] as any,
        vitalsInstance: {} as any,
        currentSection: 0, // Initialize currentSection to 0
    };
  },
  computed:{

        ...mapState(useAncVitalsStore,["vitals"]),
        ...mapState(useAncVitalsStore,["heightWeight"]),
        ...mapState(useAncVitalsStore,["bloodPressure"]),
        ...mapState(useAncVitalsStore,["respiration"]),
        ...mapState(useAncVitalsStore,["temperature"]),
        ...mapState(useAncVitalsStore,["pulse"]),
        ...mapState(useAncVitalsStore,["preEclampsia"]),
    },
    mounted(){
        const userID: any  = Service.getUserID()
        this.vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
        const bloodPressure=useAncVitalsStore()
        const respiration=useAncVitalsStore()
        this.handleUnAbleToRecordBloodPressure()
        this.handleRespirationExam()
        this.handleOther()
        this.validaterowData({})

    },
    watch: {
        vitals: {
            handler(){
                this.updateVitalsStores();
            },
            deep: true
        },
        bloodPressure:{
            handler(){
              this.handleUnAbleToRecordBloodPressure();
               this.handleOther()
            },
            deep:true
        },
        respiration:{
            handler(){
              this.handleRespirationExam();
            },
          deep:true
        }

    },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
      handleUnAbleToRecordBloodPressure() {
        const unableToRecordBloodPressureValue = getCheckboxSelectedValue(this.bloodPressure, 'Unable to record blood pressure');

        // Check if the checkbox is checked
        if (unableToRecordBloodPressureValue == 'unable to record blood pressure') {
          // Set the display of the reason radio buttons to true
          modifyRadioValue(this.bloodPressure, 'reasonsBloodPressureCannotBeTaken', 'displayNone', false);
        } else {
          // Set the display of the reason radio buttons to false
          modifyRadioValue(this.bloodPressure, 'reasonsBloodPressureCannotBeTaken', 'displayNone', true);
        }
      },
      handleOther() {
        if (getRadioSelectedValue(this.bloodPressure, 'reasonsBloodPressureCannotBeTaken') == 'otherBloodPressure') {
          modifyFieldValue(this.bloodPressure, 'OtherReasonForNotRecordingBloodPressure', 'displayNone', false)
        } else {
          modifyFieldValue(this.bloodPressure, 'OtherReasonForNotRecordingBloodPressure', 'displayNone', true)
        }
        console.log(getRadioSelectedValue(this.bloodPressure, 'reasonsBloodPressureCannotBeTaken'))
      },
//
//       if(getRadioSelectedValue(this.bloodPressure, 'reasonsBloodPressureCannotBeTaken')=='other'){
//   modifyFieldValue(this.bloodPressure,'Other','displayNone', false)
// }   else {modifyFieldValue(this.bloodPressure,'Other','displayNone', true)}


// handleRespirationExam(){
      //   const respirationExamValue = getCheckboxSelectedValue(this.respiration, 'Other respiratory exam');
      //   if(respirationExamValue=='other respiratory exam'){
      //     modifyFieldValue(this.respiration, 'Other','displayNone', false)
      //   }else {modifyFieldValue(this.respiration,'Other','displayNone', true)}
      //
      // },

      handleRespirationExam(){
        if(getCheckboxSelectedValue(this.respiration, 'Other respiratory exam')=='other respiratory exam'){
          modifyFieldValue(this.respiration,'Other','displayNone', false)
        }   else {modifyFieldValue(this.respiration,'Other','displayNone', true)}
      },


      //Method for navigating
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

      updateVitalsStores(){
            const vitalsStore = useVitalsStore()
            vitalsStore.setVitals(this.vitals)
        },
      validaterowData(inputData: any) {
        this.hasValidationErrors = [];

        this.heightWeight.forEach((section, sectionIndex) => {
          section.data.rowData.forEach((col: any, colIndex) => {
            col.colData.forEach((input: any, inputIndex) => {
              const validateResult = this.vitalsInstance.validator(input);
              if (validateResult?.length > 0) {
                this.hasValidationErrors.push(false);
                if (input.inputHeader === inputData.inputHeader) {
                  this.heightWeight[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsError = true;
                  this.heightWeight[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = validateResult.flat(Infinity)[0];
                }
              } else {
                this.hasValidationErrors.push(true);
                this.heightWeight[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsError = false;
                this.heightWeight[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = '';
              }
            });
          });
        });

        // Update the validation status of the section
        this.heightWeight.validationStatus = !this.hasValidationErrors.includes(false);
      },

      async setBMI(weight: any,height: any){
            if(this.demographics.gender && this.demographics.birthdate){
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height) , 
                    this.demographics.gender,
                    HisDate.calculateAge(this.demographics.birthdate,HisDate.currentDate())
                )
            }
            this.updateBMI()
        },
        async updateBMI(){
            const bmiColor = this.BMI?.color ?? [];
            const vitals =this.vitals[0].alerts[0]
            vitals.icon = BMIService.iconBMI(bmiColor);
            vitals.backgroundColor = bmiColor[0];
            vitals.textColor = bmiColor[1];
            vitals.index = this.BMI?.index ?? '';
            vitals.value = this.BMI?.result ?? '';
        },
        async updateBP(systolic: any,diastolic: any){
            const vitals =this.vitals[1].alerts[0]
            const bpColor = this.BPStatus?.colors ?? []
            vitals.icon = iconBloodPressure(bpColor)
            vitals.backgroundColor = bpColor[0];
            vitals.textColor = bpColor[1];
            vitals.index = systolic+ '/'+ diastolic;
            vitals.value = this.BPStatus?.value ?? '';
        },
        getBloodPressureStatus(systolic: any,diastolic: any){
            if(diastolic && systolic){
                if( (parseInt(diastolic) >= 30 && parseInt(diastolic) <= 60)  &&  (parseInt(systolic) >= 40 && parseInt(systolic) <= 90 )){
                    return {colors:["#B9E6FE","#026AA2","#9ADBFE"],value:"Low"}
                }else
                if( (parseInt(diastolic) >= 60 && parseInt(diastolic) <= 80)  &&  (parseInt(systolic) >= 90 && parseInt(systolic) <= 120 )){
                    return {colors:["#DDEEDD","#016302","#BBDDBC"],value:"Normal"}
                }else
                if( (parseInt(diastolic) >= 80 && parseInt(diastolic) <= 90) &&  (parseInt(systolic) >= 120 && parseInt(systolic) <= 140) ){
                    let value = "Pre-high blood pressure"
                    if( (parseInt(diastolic) >= 85 && parseInt(diastolic) <= 89) &&  (parseInt(systolic) >= 130 && parseInt(systolic) <= 139) )
                        value = "Pre-high blood pressure (Class: Borderline)"
                    return {colors:["#FEDF89","#B54708","#FED667"],value:value}
                }else
                if( (parseInt(diastolic) >= 90 && parseInt(diastolic) <= 109)  &&  (parseInt(systolic) >= 140 && parseInt(systolic) <= 190 )){
                    let value = "High blood pressure"
                    if( (parseInt(diastolic) >= 90 && parseInt(diastolic) <= 99)  &&  (parseInt(systolic) >= 140 && parseInt(systolic) <= 159 ))
                        value = "High blood pressure (Class: Mild/ I)"
                    if( (parseInt(diastolic) >= 100 && parseInt(diastolic) <= 109)  &&  (parseInt(systolic) >= 160 && parseInt(systolic) <= 179 ))
                        value = "High blood pressure (Class: Moderate/ II)"
                    return {colors:["#FECDCA","#B42318","#FDA19B"],value:value}
                }else
                if( (parseInt(diastolic) >= 110 && parseInt(diastolic) <= 200)  &&  (parseInt(systolic) >= 180 && parseInt(systolic) <= 250 ) ){
                    return {colors:["#FECDCA","#B42318","#FDA19B"],value:"The patient has hypertension (Class: Severe/ III)"}
                }else{
                    toastWarning("Invalid BP values",4000);
                    this.hasValidationErrors.push('false');
                    return {}
                }
            }else{
                return {colors:[],value:""}
            }
        },
      
    }
    });

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

ion-card {
  box-shadow:none;
  background-color:inherit;
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
  