<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Counselling"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"
            />
        </ion-content>
      <BasicFooter @finishBtn="saveData()" />

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
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/apps/NCD/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import {DangerSignsService} from "@/apps/ANC/service/danger_signs_service";
import {useBehaviourCousellingStore} from "@/apps/ANC/store/counselling/behaviourCousellingStore";
import {usePhysiologicalCounselingStore} from "@/apps/ANC/store/counselling/physiologicalCounselingStore";
import {useDietCounsellingStore} from "@/apps/ANC/store/counselling/dietCounsellingStore";
import {BehaviourCounsellingService} from "@/apps/ANC/service/behaviour_counselling_service";
import {formatCheckBoxData, formatInputFiledData, formatRadioButtonData} from "@/services/formatServerData";
import {DietCounsellingService} from "@/apps/ANC/service/diet_counselling_service";
import { resetPatientData } from "@/services/reset_data";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
import {useClinicalCounsellingStore} from "@/apps/ANC/store/counselling/clinicalCousellingStore";
import {usePreventativeCounsellingStore} from "@/apps/ANC/store/counselling/preventativeCounsellingStore";
import {CounsellingService} from "@/apps/ANC/service/physiological_counselling_service";

export default defineComponent({
    name: "Home",
  mixins: [SetUserRole, SetEncounter],

  components: {
      BasicFooter,
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
            wizardData: [
                {
                    title: "Behavior counselling",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Physiological counselling",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Diet counselling",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
              {
                title: "Clinical counselling",
                class: "common_step",
                checked: "",
                icon: false,
                disabled: false,
                number: 4,
                last_step: "",
              },
              {
                title: "Preventative counselling",
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
                    title: "Behavior counselling",
                    component: "BehaviourCounselling",
                    value: "1",
                },
                {
                    title: "Physiological counselling",
                    component: "PhysiologicalCounseling",
                    value: "2",
                },
                {
                    title: "Diet counselling",
                    component: "DietCounselling",
                    value: "3",
                },
              {
                title: "Clinical counselling",
                component: "ClinicalCounselling",
                value: "4",
              },
              {
                title: "Preventative counselling",
                component: "DiagnosisCounselling",
                value: "5",
              },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    mounted() {
        this.markWizard();
    },
  computed:{
    ...mapState(useDemographicsStore, ["demographics"]),
    ...mapState(useBehaviourCousellingStore,["behaviourInfo"]),
    ...mapState(usePhysiologicalCounselingStore,["physiologicalCounselingInfo"]),
    ...mapState(useDietCounsellingStore,["dietCounsellingInfo"]),
    ...mapState(useClinicalCounsellingStore,["clinicalCounselling"]),
    ...mapState(usePreventativeCounsellingStore,["preventativeCounselling"]),
  },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {},
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        async saveData() {
          await this.saveCounselling()
          resetPatientData();
          this.$router.push("ANChome");
        },
      async saveCounselling() {
        if (this.physiologicalCounselingInfo.length >= 0 || this.dietCounsellingInfo>=0 || this.behaviourInfo>=0 || this.clinicalCounselling>=0 || this.preventativeCounselling>=0 ) {
          const userID: any = Service.getUserID();
          const  counsellingInfo= new CounsellingService(this.demographics.patient_id, userID);
          const encounter = await counsellingInfo.createEncounter();
          if (!encounter) return toastWarning("Unable to create patient counselling encounter");
          const patientStatus = await counsellingInfo.saveObservationList(await this.buildCounselling());
          if (!patientStatus) return toastWarning("Unable to create counselling details!");
          toastSuccess("Counselling details have been saved");
        }
        console.log(await this.buildCounselling())

      },
      async buildCounselling() {
        return [
          ...(await formatCheckBoxData(this.dietCounsellingInfo)),
          ...(await formatRadioButtonData(this.dietCounsellingInfo)),
          ...(await formatInputFiledData(this.dietCounsellingInfo)),
          ...(await formatCheckBoxData(this.behaviourInfo)),
          ...(await formatRadioButtonData(this.behaviourInfo)),
          ...(await formatInputFiledData(this.behaviourInfo)),
          ...(await formatCheckBoxData(this.physiologicalCounselingInfo)),
          ...(await formatRadioButtonData(this.physiologicalCounselingInfo)),
          ...(await formatInputFiledData(this.physiologicalCounselingInfo)),
          ...(await formatCheckBoxData(this.clinicalCounselling)),
          ...(await formatRadioButtonData(this.clinicalCounselling)),
          ...(await formatInputFiledData(this.clinicalCounselling)),
          ...(await formatCheckBoxData(this.preventativeCounselling)),
          ...(await formatRadioButtonData(this.preventativeCounselling)),
          ...(await formatInputFiledData(this.preventativeCounselling)),
        ];
      },
    },
});
</script>

<style scoped></style>
