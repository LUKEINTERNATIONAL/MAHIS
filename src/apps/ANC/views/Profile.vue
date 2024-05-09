<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Profile" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData" />
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
} from "@ionic/vue";
import { ConceptService } from "@/services/concept_service";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import PastObstreticHistory from "@/apps/ANC/components/profile/PastObstreticHistory.vue";
import CurrentPregnancies from "../components/profile/CurrentPregnancies.vue";
import Medications from "../components/profile/Medications.vue";
import MedicalHistory from "@/apps/ANC/components/profile/MedicalHistory.vue";
import WomanBehaviour from "../components/profile/WomanBehaviour.vue";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { useMedicalHistoryStore } from "@/apps/ANC/store/profile/medicalHistoryStore";
import { useObstreticHistoryStore } from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import { useMedicationStore } from "@/apps/ANC/store/profile/MedicationStore";
import { useWomanBehaviourStore } from "@/apps/ANC/store/profile/womanBehaviourStore";
import { Service } from "@/services/service";
//import { ProfileService } from "@/services/anc_profile_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { Preterms } from "../service/preterm";
import { currentPregnancyService, MedicalHistoryService, PastObstetricHistoryService } from "@/services/anc_profile_service";
import { resetPatientData } from "@/services/reset_data";
import { ObservationService } from "@/services/observation_service";
import {validateField} from "@/services/ANC/profile_validation_service"
import Validation from "@/validations/StandardValidations";

// function someChecked(options, errorMassage) {
//   if (!options.filter(v => v.checkboxBtnContent).some(v => v.checkboxBtnContent.data.some(d => d.checked))) {
//     return errorMassage
//   }
// }
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
        PastObstreticHistory,
        WomanBehaviour,
        CurrentPregnancies,
        Medications,
        MedicalHistory,
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Past Obstetric History",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Medical History",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Current Pregnancy",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Medications",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },

                {
                    title: "Woman behaviour",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Past Obstetric History",
                    component: "PastObstreticHistory",
                    value: "1",
                },
                {
                    title: "Past Medical History",
                    component: "MedicalHistory",
                    value: "2",
                },
                {
                    title: "Current Pregnancy",
                    component: "CurrentPregnancies",
                    value: "3",
                },
                {
                    title: "Medications",
                    component: "Medications",
                    value: "4",
                },
                {
                    title: "Woman behaviour",
                    component: "WomanBehaviour",
                    value: "5",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {
      lmnp:{
          handler(){
            const data =useCurrentPregnanciesStore()
            this.lmnp
          },
          deep:true
        }

    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useObstreticHistoryStore, ["preterm","prevPregnancies","Complications",'modeOfDelivery']),
        ...mapState(useMedicalHistoryStore,['medicalHistory','allegy','exisitingChronicHealthConditions']),
        ...mapState(useCurrentPregnanciesStore,['palpation','tetanus','lmnp','ultrasound']),
        ...mapState(useMedicationStore,['Medication']),
        ...mapState(useWomanBehaviourStore,['dailyCaffeineIntake','Tobacco']),
      LNMPKnown() {return getRadioSelectedValue(this.lmnp, "LNMP Known?");},
      // LMNP(){ return getRadioSelectedValue(this.lmnp, 'LMNP')},
      // lmnpEED(){ return getFieldValue(this.lmnp, 'lmnpEED','value')},
      // lmnpGestationAge(){ return getFieldValue(this.lmnp, 'lmnpGestationAge','value')},
      // lmnpDate(){ return getFieldValue(this.lmnp, 'lmnpDate','value')},
      // UltrasoundDone(){ return getRadioSelectedValue(this.ultrasound, 'Ultrasound done?')},
      // UltrasoundDate(){ return getFieldValue(this.ultrasound, 'Ultrasound','value')},
      // UltrasoundGestationAge(){ return getFieldValue(this.ultrasound, 'specify','value')},
      // GestationAgeByPalpationKnown(){ return getRadioSelectedValue(this.palpation, 'Gestation')},
      // GestationAgeByPalpation(){ return getFieldValue(this.palpation, 'Gestation age by palpation','value')},
      // GestationAgeUsed(){ return getRadioSelectedValue(this.palpation, 'Gestation age to be used')},
      // TetanusDosesForImmunisation(){ return getRadioSelectedValue(this.tetanus, 'The woman received tetanus doses for immunization?')},
      // NumberOfUnderImmunisedDoses(){ return getRadioSelectedValue(this.tetanus, 'Number of tetanus doses')},
      // tt1Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt2Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt3Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt4Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt5Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt6Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt7Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt8Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt9Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt10Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt11Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      // tt12Date(){ return getFieldValue(this.tetanus, '12','value')},
      // tt13Date(){ return getFieldValue(this.tetanus, '13','value')},
      // tt14Date(){ return getFieldValue(this.tetanus, '14','value')},
      // tt15Date(){ return getFieldValue(this.tetanus, '15','value')},
      // ReasonTTVnotConducted(){ return getRadioSelectedValue(this.tetanus, 'Reason Tetanus toxoid (TT) was not conducted')},
      // DailyCaffeineIntake(){ return getCheckboxSelectedValue(this.dailyCaffeineIntake, 'Daily caffeine use')},
      // SubstanceAbuse(){ return getRadioSelectedValue(this.Tobacco, 'Recently quit tobacco products')},
      // SecondHandSmoke(){ return getRadioSelectedValue(this.Tobacco, 'Exposure to second hand smoke')},
      // ExistingChronicConditions(){ return getCheckboxSelectedValue(this.exisitingChronicHealthConditions, 'chronic conditions')},
      // Medications(){ return getCheckboxSelectedValue(this.Medication, 'Which medications is the woman currently prescribed?')},
      // Stillbirths(){ return getFieldValue(this.prevPregnancies, 'Stillbirths','value')},
      // LiveBirths(){ return getFieldValue(this.prevPregnancies, 'LiveBirths','value')},
      // Parity(){ return getFieldValue(this.prevPregnancies, 'Parity','value')},
      // Abortions(){ return getFieldValue(this.prevPregnancies, 'Abortions','value')},
    },
    mounted() {
        this.markWizard()
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {
        },
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
       
         async saveData() {
           await this.saveProfile()
          await   resetPatientData();
        },
      async validations(data: any, fields: any) {
        return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
      },
      async saveProfile(){
        // "lmnpGestationAge","lmnpDate","UltrasoundDone","UltrasoundDate","UltrasoundGestationAge",
        //     "GestationAgeByPalpationKnown","GestationAgeByPalpation","GestationAgeUsed","TetanusDosesForImmunisation","NumberOfUnderImmunisedDoses",
        //     "tt1Date","tt2Date","tt3Date","tt4Date","tt5Date","tt6Date","tt7Date","tt8Date","tt9Date","tt10Date","tt11Date","tt12Date","tt13Date","tt14Date",
        //     "tt15Date","ReasonTTVnotConducted","DailyCaffeineIntake","SubstanceAbuse","SecondHandSmoke","ExistingChronicConditions","Medications","Stillbirths",
        //     "LiveBirths","Parity","Abortions"
        const fields: any=["LNMPKnown",
        ]
        if(await this.validations(this.lmnp && this.ultrasound && this.palpation && this.exisitingChronicHealthConditions
            && this.Medication && this.dailyCaffeineIntake && this.Tobacco && this.tetanus && this.prevPregnancies, fields)){
          if (this.prevPregnancies.length > 0 && this.lmnp.length > 0 && this.exisitingChronicHealthConditions.length > 0 && this.allegy.length > 0
              && this.medicalHistory.length > 0 && this.Complications.length > 0 && this.preterm.length > 0
              && this.Medication.length > 0 && this.dailyCaffeineIntake.length > 0) {
            const userID: any = Service.getUserID();
            const profile = new  currentPregnancyService(this.demographics.patient_id, userID);
            const encounter = await profile.createEncounter();
            if (!encounter) return toastWarning("Unable to create profile encounter");
            const patientStatus = await profile.saveObservationList(await this.buildProfile());
            if (!patientStatus) return toastWarning("Unable to create profile information!");
            await  toastSuccess("Profile information have been created");
            // console.log(await this.buildProfile())

          }

          const number = this.modeOfDelivery.length / 2;
          const children = []
          for (let i = 0; i < number; i++) {
            const value = getRadioSelectedValue(
                this.modeOfDelivery,
                `Mode of delivery ${i}`
            );
            const other = getFieldValue(this.modeOfDelivery,`Specify ${i}`,'value')
            children.push({concept:"Mode of delivery",value,other})

            const concept_id = await ConceptService.getConceptID("Mode of delivery", true);
            console.log(";;;;;;;;",concept_id)
            const concept_other = await ConceptService.getConceptID("other", true);
            console.log(";;;;;;;;",concept_other)
            const obs_datetime = ConceptService.getSessionDate();
            const obs:any = children.map(child=>{
              return {
                concept_id:concept_id,
                value_text:child.value,
                obs_datetime
              }
            })
            const obs_service = ObservationService.saveObs(82,obs)

          }

          this.$router.push("headssAssessment");

        } else {
          await toastWarning("Please complete all required fields")
        }

      },
      async buildProfile(){
        return[
          ...(await formatInputFiledData(this.prevPregnancies)),
          ...(await formatRadioButtonData(this.preterm)),
          ...(await formatCheckBoxData(this.Complications)),
          ...(await formatInputFiledData(this.Complications)),
          ...(await formatCheckBoxData(this.medicalHistory)),
          ...(await formatInputFiledData(this.medicalHistory)),
          ...(await formatCheckBoxData(this.exisitingChronicHealthConditions)),
          ...(await formatInputFiledData(this.exisitingChronicHealthConditions)),
          ...(await formatRadioButtonData(this.palpation)),
          ...(await formatRadioButtonData(this.tetanus)),
          ...(await formatRadioButtonData(this.lmnp)),
          ...(await formatRadioButtonData(this.ultrasound)),
          ...(await formatInputFiledData(this.ultrasound)),
          ...(await formatCheckBoxData(this.allegy)),
          ...(await formatInputFiledData(this.allegy)),
          ...(await formatCheckBoxData(this.Medication)),
          ...(await formatInputFiledData(this.Medication)),
          ...(await formatCheckBoxData(this.dailyCaffeineIntake)),
          ...(await formatRadioButtonData(this.Tobacco)),
        ]
      },


      //   async savePrevPregnancies(){
      //   if (this.prevPregnancies[0].selectedData.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const PrevPregnancies = new PastObstetricHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await PrevPregnancies.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create Pregnancies encounter");
      //       const patientStatus = await PrevPregnancies.saveObservationList(await this.buildPregnancyHistory());
      //       if (!patientStatus) return toastWarning("Unable to create Pregnancies!");
      //       await toastSuccess("Prev Pregnancies has been created");
      //   }
      //
      //
      //       const number = this.modeOfDelivery.length / 2;
      //       const children = []
      //       for (let i = 0; i < number; i++) {
      //           const value = getRadioSelectedValue(
      //           this.modeOfDelivery,
      //           `Mode of delivery ${i}`
      //           );
      //           const other = getFieldValue(this.modeOfDelivery,`Specify ${i}`,'value')
      //           children.push({concept:"Mode of delivery",value,other})
      //
      //           const concept_id = await ConceptService.getConceptID("Mode of delivery", true);
      //           console.log(";;;;;;;;",concept_id)
      //           const concept_other = await ConceptService.getConceptID("other", true);
      //           console.log(";;;;;;;;",concept_other)
      //           const obs_datetime = ConceptService.getSessionDate();
      //            const obs:any = children.map(child=>{
      //               return {
      //                   concept_id:concept_id,
      //                   value_text:child.value,
      //                   obs_datetime
      //               }
      //           })
      //           const obs_service = ObservationService.saveObs(82,obs)
      //
      // }
      // console.log("++++++++>",children)
      //   },
      //   async savePreterm(){
      //   if (this.preterm.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const Preterm = new PastObstetricHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await Preterm.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create profile encounter");
      //       const patientStatus = await Preterm.saveObservationList(await this.buildPreterm());
      //       if (!patientStatus) return toastWarning("Unable to create Profile!");
      //       toastSuccess("Profile has been created");
      //   }
      //   //console.log(await this.buildPreterm())
      //   },
      //   async savePastPregnancyComplication(){
      //   if (this.Complications.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const complication = new PastObstetricHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await complication.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create complications encounter");
      //       const patientStatus = await complication.saveObservationList(await this.buildPastPregnancyComplication());
      //       if (!patientStatus) return toastWarning("Unable to create Complications!");
      //       toastSuccess("Complications has been created");
      //   }
      //   //console.log(await this.buildPastPregnancyComplication())
      //   },
      //   async savePastSurgeries(){
      //       if (this.medicalHistory.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const MedicalHistory = new  MedicalHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await MedicalHistory.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create past surgery encounter");
      //       const patientStatus = await MedicalHistory.saveObservationList(await this.buildPastSurgeries());
      //       if (!patientStatus) return toastWarning("Unable to create Past surgeries!");
      //       toastSuccess("Past surgeries has been created");
      //   }
      //     //  console.log(await this.buildPastSurgeries())
      //   },
      //   async saveAllergy(){
      //   if (this.allegy.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const MedicalHistory = new  MedicalHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await MedicalHistory.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create allergy encounter");
      //       const patientStatus = await MedicalHistory.saveObservationList(await this.buildAllergy());
      //       if (!patientStatus) return toastWarning("Unable to create Allergies!");
      //       toastSuccess("Past Allergies has been created");
      //   }
      //       //console.log(await this.buildAllergy())
      //   },
      //   async saveChronicHealthCondition(){
      //   if (this.exisitingChronicHealthConditions.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const healthCondition = new  MedicalHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await healthCondition.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create Chronic Health Condition encounter");
      //       const patientStatus = await healthCondition.saveObservationList(await this.buildChronicHealthCondition());
      //       if (!patientStatus) return toastWarning("Unable to create Chronic Health Condition!");
      //       toastSuccess("Chronic Health Condition has been created");
      //   }
      //      // console.log(await this.buildChronicHealthCondition())
      //   },
      //
      //   async saveMedication(){
      //   if (this.Medication.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const Medications = new  MedicalHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await Medications.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create Medications encounter");
      //       const patientStatus = await Medications.saveObservationList(await this.buildMedication());
      //       if (!patientStatus) return toastWarning("Unable to create Medications!");
      //       toastSuccess("Medications has been created");
      //   }
      //       //console.log(await this.buildMedication())
      //   },
      //   async saveCaffeinIntake(){
      //   if (this.dailyCaffeineIntake.length > 0) {
      //       const userID: any = Service.getUserID();
      //       const caffeineIntake = new  MedicalHistoryService(this.demographics.patient_id, userID);
      //       const encounter = await caffeineIntake.createEncounter();
      //       if (!encounter) return toastWarning("Unable to create daily caffeine intake encounter");
      //       const patientStatus = await caffeineIntake.saveObservationList(await this.buildCaffeinIntake());
      //       if (!patientStatus) return toastWarning("Unable to create Daily Caffeine Intake!");
      //       toastSuccess("Daily Caffeine Intake has been created");
      //   }
      //      // console.log(await this.buildCaffeinIntake())
      //   },
      //   async buildPregnancyHistory(){
      //       return[
      //           ...(await formatInputFiledData(this.prevPregnancies)), //modeOfDelivery
      //           //...(await formatRadioButtonData(this.modeOfDelivery))
      //       ]
      //   },
      //   async buildPreterm(){
      //       return [
      //           ...(await formatRadioButtonData(this.preterm)),
      //       ];
      //   },
      //   async buildPastPregnancyComplication(){
      //       return [
      //           ...(await formatCheckBoxData(this.Complications)),
      //           ...(await formatInputFiledData(this.Complications))
      //       ];
      //   },
      //   async buildPastSurgeries(){
      //       return[
      //           ...(await formatCheckBoxData(this.medicalHistory)),
      //           ...(await formatInputFiledData(this.medicalHistory))
      //       ]
      //   },
      //   async buildAllergy(){
      //       return[
      //           ...(await formatCheckBoxData(this.allegy)),
      //            ...(await formatInputFiledData(this.allegy))
      //       ]
      //   },
      //   async buildChronicHealthCondition(){
      //       return[
      //           ...(await formatCheckBoxData(this.exisitingChronicHealthConditions)),
      //           ...(await formatInputFiledData(this.exisitingChronicHealthConditions))
      //       ]
      //   },

        // async buildMedication(){
        //     return[
        //         ...(await formatCheckBoxData(this.Medication)),
        //         ...(await formatInputFiledData(this.Medication))
        //     ]
        // },
        // async buildCaffeinIntake(){
        //     return[
        //         ...(await formatCheckBoxData(this.dailyCaffeineIntake)),
        //         ...(await formatRadioButtonData(this.dailyCaffeineIntake)),
        //         ...(await formatRadioButtonData(this.dailyCaffeineIntake)),
        //     ]
        // },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
@/apps/ANC/store/profile/MedicationStore