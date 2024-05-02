<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Vitals" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData" />
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
    IonModal,
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/apps/NCD/services/lab_order";
// import { OPDVitalsService } from "@/services/vitals_service";
import { OPDVitalsService } from "@/apps/OPD/services/vitals"
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
import { useVitalsStore } from "../stores/OpdVitalsStore";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue, modifyCheckboxValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
import { formatCheckBoxData, formatInputFiledData } from "@/services/formatServerData";
export default defineComponent({
    name: "Home",
    components: {
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
        Stepper,
    },
    data() {
        return {
            dispositions: "" as any,
            wizardData: [
                {
                    title: "Vitals",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
            ],
            StepperData: [
                {
                    title: "Vitals",
                    component: "OPDVitals",
                    value: "1",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
    },
    mounted() {
        this.markWizard();
        this.pulseRateValidate()
        this.respiratoryValidate()
        this.systolicValidate()
        this.diastolicValidate()
        this.handleTemperature()
        this.validateTemperature()
    },
    watch: {
        vitals: {
            handler() {
                this.markWizard();
                this.pulseRateValidate()
                this.respiratoryValidate()
                this.systolicValidate()
                this.diastolicValidate()
                this.handleTemperature()
                this.validateTemperature()
                this.handlePulseRate()
                this.handleBPD()
                this.handleBPS()
                this.handleRespiratory()
            },
            deep: true,
        },
        investigations: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        diagnosis: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        selectedMedicalDrugsList: {
            handler() {
                this.markWizard();
            },
        },
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        pulseRateValidate() {
            const triggerError = (errorMessage: string) => {
                modifyFieldValue(this.vitals, "Pulse", "alertsError", true);
                modifyFieldValue(this.vitals, "Pulse", "alertsErrorMassage", errorMessage);
            };

            const clearErrors = () => {
                modifyFieldValue(this.vitals, "Pulse", "alertsError", false);
                modifyFieldValue(this.vitals, "Pulse", "alertsErrorMassage", "");
            };

            const age= HisDate.calculateAge(this.demographics.birthdate,new Date());
            const value= getFieldValue(this.vitals,'Pulse', 'value')

            let ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);
            ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);
            
            if(value == "")return
                        
           if(age<1 && (ageInMonth == 1) && !(value>=70 && value<=190)){ 
            triggerError(`Pulse Rate can't be ${value}`)
           }else if(age<1 && (ageInMonth >= 1 && ageInMonth <=11 ) && !(value>=80 && value<=160)){ 
            triggerError(`Pulse Rate can't be ${value}`)
           } else if(age>10 && !(value>=60 && value<=100)){
                triggerError(`Pulse Rate can't be ${value}`)
            }else if((age>=1 && age<=2) && !(value>=80 && value<=130)){
                triggerError(`Pulse Rate can't be ${value}`)
            }else if((age>=3 && age<=4) && !(value>=80 && value<=120)){
                triggerError(`Pulse Rate can't be ${value}`)
            }else if((age>=5 && age<=6) && !(value>=75 && value<=115)){
                triggerError(`Pulse Rate can't be ${value}`)
            }else if((age>=7 && age<=9) && !(value>=70 && value<=110)){
                triggerError(`Pulse Rate can't be ${value}`)
            }
            else {
                clearErrors()
            }

           
        },
        respiratoryValidate(){

            
              let ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);
                


            const triggerError = (errorMessage:string)=>{
            modifyFieldValue(this.vitals,'RespiratoryRate','alertsError',true)
            modifyFieldValue(this.vitals,'RespiratoryRate','alertsErrorMassage',errorMessage)
            }

            const clearErrors = ()=>{
            modifyFieldValue(this.vitals,'RespiratoryRate','alertsError',false)
            modifyFieldValue(this.vitals,'RespiratoryRate','alertsErrorMassage',"")
            }



            const age= HisDate.calculateAge(this.demographics.birthdate,new Date());
            const value= getFieldValue(this.vitals,'RespiratoryRate','value')

                 ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);
                console.log({ageInMonth})

                console.log({age,value,ageInMonth})

           if(value == "")return




           if(age<1 && (ageInMonth >= 1 && ageInMonth <=5 ) && !(value>=25 && value<=40)){ 
            triggerError(`Respiratory Rate can't be ${value}`)
           }else if(age<1 && (ageInMonth >= 6 && ageInMonth <=12 ) && !(value>=20 && value<=30)){ 
            triggerError(`Respiratory Rate can't be ${value}`)
           }
           else if((age>=1 && age<=3) && !(value>=20 && value<=30)){
                triggerError(`Respiratory Rate can't be ${value}`)
            }else if((age>=3 && age<=5) && !(value>=20 && value<=30)){
                triggerError(`Respiratory Rate can't be ${value}`)
            }else if((age>=6 && age<=10) && !(value>=15 && value<=30)){
                triggerError(`Respiratory Rate can't be ${value}`)
            }else if((age>=11 && age<=14) && !(value>=12 && value<=20)){
                triggerError(`Respiratory Rate can't be ${value}`)
            }else if((age>=15 && age<=20) && !(value>=12 && value<=30)){
                triggerError(`Respiratory Rate can't be ${value}`)
            }else 
            if(age>20 && !(value>=16 && value<=20)){
                triggerError(`Respiratory Rate can't be ${value}`)
            }
            else {
                clearErrors()
            }
        },
        systolicValidate() {
            const triggerError = (errorMessage: string) => {
                modifyFieldValue(this.vitals, "Systolic", "alertsError", true);
                modifyFieldValue(this.vitals, "Systolic", "alertsErrorMassage", errorMessage);
            };

            const clearErrors = () => {
                modifyFieldValue(this.vitals, "Systolic", "alertsError", false);
                modifyFieldValue(this.vitals, "Systolic", "alertsErrorMassage", "");
            };

            const age = HisDate.calculateAge(this.demographics.birthdate, new Date());
            const value = getFieldValue(this.vitals, "Systolic", "value");


            let ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);
            ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);

            if (value == "") return;
            
           if(age<1 && (ageInMonth >= 1 && ageInMonth <=12 ) && !(value>=75 && value<=100)){ 
            triggerError(`Systolic can't be ${value}`)
           }else if (age >= 1 && age <= 4 && !(value >= 80 && value <= 110)) {
                triggerError(`Systolic can't be ${value}`);
            } else if (age >= 3 && age <= 5 && !(value >= 80 && value <= 110)) {
                triggerError(`Systolic can't be ${value}`);
            } else if (age >= 6 && age <= 13 && !(value >= 85 && value <= 120)) {
                triggerError(`Systolic can't be ${value}`);
            } else if (age >= 13 && age <= 18 && !(value >= 95 && value <= 140)) {
                triggerError(`Systolic can't be ${value}`);
            } else if (age > 18 && !(value >= 100 && value <= 130)) {
                triggerError(`Systolic can't be ${value}`);
            } else {
                clearErrors();
            }
        },
        diastolicValidate() {
            const triggerError = (errorMessage: string) => {
                modifyFieldValue(this.vitals, "Diastolic", "alertsError", true);
                modifyFieldValue(this.vitals, "Diastolic", "alertsErrorMassage", errorMessage);
            };

            const clearErrors = () => {
                modifyFieldValue(this.vitals, "Diastolic", "alertsError", false);
                modifyFieldValue(this.vitals, "Diastolic", "alertsErrorMassage", "");
            };

            const age = HisDate.calculateAge(this.demographics.birthdate, new Date());
            const value = getFieldValue(this.vitals, "Diastolic", "value");

            let ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);
            ageInMonth = HisDate.ageInMonths(this.demographics.birthdate);

            if(value == "")return
           
           if(age<1 && (ageInMonth >= 1 && ageInMonth <=12 ) && !(value>=50 && value<=70)){ 
            triggerError(`Diastolic can't be ${value}`)
           }
           else if((age>=1 && age<=4) && !(value>=50 && value<=80)){
                triggerError(`Diastolic can't be ${value}`)
            }else if((age>=3 && age<=5) && !(value>=50 && value<=80)){
                triggerError(`Diastolic can't be ${value}`)
            }else if((age>=6 && age<=13) && !(value>=55 && value<=80)){
                triggerError(`Diastolic can't be ${value}`)
            }else if((age>=13 && age<=18) && !(value>=60 && value<=90)){
                triggerError(`Diastolic can't be ${value}`)
            }else if(age>18  && !(value>=60 && value<=90)){
                triggerError(`Diastolic can't be ${value}`)
            }
            else {
                clearErrors()
            }
        },
        validateTemperature(){
                const triggerError = (errorMessage: string) => {
                modifyFieldValue(this.vitals, "Temp", "alertsError", true);
                modifyFieldValue(this.vitals, "Temp", "alertsErrorMassage", errorMessage);
            };
                const clearErrors = () => {
                modifyFieldValue(this.vitals, "Temp", "alertsError", false);
                modifyFieldValue(this.vitals, "Temp", "alertsErrorMassage", "");
            };
              const value = getFieldValue(this.vitals, "Temp", "value");
            if(value == "")return

           if (!(value>=35.5 && value<=37.4)){ 
              triggerError(`Temperature can't be ${value}`)
           }else {
                clearErrors()
          }
          
        },
        handleTemperature(){
            if(!getCheckboxSelectedValue(this.vitals,'Temperature not Done')?.checked){
                modifyFieldValue(this.vitals, 'Temp', 'disabled', false);
            }else{
                modifyFieldValue(this.vitals, 'Temp', 'disabled', true);
            }
           
        },
        handlePulseRate(){
            if(!getCheckboxSelectedValue(this.vitals,'Pulse rate not done')?.checked){
                modifyFieldValue(this.vitals, 'Pulse', 'disabled', false);
            }else{
                modifyFieldValue(this.vitals, 'Pulse', 'disabled', true);
            }
            
        },
        handleBPD(){
            if(!getCheckboxSelectedValue(this.vitals,'Blood Pressure not done')?.checked){
                modifyFieldValue(this.vitals, 'Systolic', 'disabled', false);
            }else{
                modifyFieldValue(this.vitals, 'Systolic', 'disabled', true);
            }
            
        },
        handleBPS(){
            if(!getCheckboxSelectedValue(this.vitals,'Blood Pressure not done')?.checked){
                modifyFieldValue(this.vitals, 'Diastolic', 'disabled', false);
            }else{
                modifyFieldValue(this.vitals, 'Diastolic', 'disabled', true);
            }
            
        },
        handleRespiratory(){
            if(!getCheckboxSelectedValue(this.vitals,'Respiratory rate not done')?.checked){
                modifyFieldValue(this.vitals, 'Respiratory Rate', 'disabled', false);
            }else{
                modifyFieldValue(this.vitals, 'Respiratory Rate', 'disabled', true);
            }
            
        },
        markWizard() {
            if (this.vitals.validationStatus) {
                this.wizardData[0].checked = true;
                this.wizardData[0].class = "open_step common_step";
            } else {
                this.wizardData[0].checked = false;
            }
        },
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        saveData() {
            this.saveVitals()
        },
       async saveVitals() {
        //   if (this.vitals[0].selectedData.length > 0) {
        //         const userID: any = Service.getUserID();
        //         const Vital = new OPDVitalsService(this.demographics.patient_id, userID);
        //         const encounter = await Vital.createEncounter();
        //         if (!encounter) return toastWarning("Unable to create Opd Vitals encounter");
        //         const patientStatus = await Vital.saveObservationList(await this.buildVitals());
        //         if (!patientStatus) return toastWarning("Unable to create patient Opd Vitals  !");
        //         toastSuccess("OPD vitals has been created");
        //     }
            console.log(await this.buildVitals())
        },
        async buildVitals() {
        return [
             ...(await formatInputFiledData(this.vitals)),
        ];
    },

        async saveOutComeStatus() {},
        openModal() {
            createModal(SaveProgressModal);
        },
        calculateExpireDate(startDate: string | Date, duration: any) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + parseInt(duration));
            return HisDate.toStandardHisFormat(date);
        },
    },
});
</script>

<style scoped></style>
