<template>
  <ion-row>
    <!-- Show a loading spinner while data is being fetched -->
    <div v-if="loading" style="width: 100%; text-align: center; padding: 20px;">
      <ion-spinner name="crescent"></ion-spinner>
      <p>Loading...</p>
    </div>

    <!-- Show VisitHistory if presentingComplaints is available -->
    <div v-else-if="presentingComplaints && presentingComplaints.length > 0" style="width: 100%">
      <VisitHistory />
    </div>

    <!-- Show the accordion groups if presentingComplaints is empty -->
    <div v-else style="width: 100%">
      <ion-accordion-group ref="accordionGroup" class="previousView">
        <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
          <ion-item slot="header" color="light">
            <ion-label class="previousLabel">Level of consciousness</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <LevelOfConsciousness />
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <ion-accordion-group ref="accordionGroup" class="previousView">
        <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
          <ion-item slot="header" color="light">
            <ion-label class="previousLabel">Presenting complaints</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <PresentingComplaints />
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <ion-accordion-group ref="accordionGroup" class="previousView" v-if="checkPatient()">
        <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
          <ion-item slot="header" color="light">
            <ion-label class="previousLabel">Pregnancy and breastfeeding status</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <PregnancyBreastfeeding />
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <ion-accordion-group ref="accordionGroup" class="previousView">
        <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
          <ion-item slot="header" color="light">
            <ion-label class="previousLabel">Past medical history</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <PastMedicalHistory />
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <ion-accordion-group ref="accordionGroup" class="previousView">
        <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
          <ion-item slot="header" color="light">
            <ion-label class="previousLabel">Allergies</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <Allergies />
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <ion-accordion-group ref="accordionGroup" class="previousView">
        <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
          <ion-item slot="header" color="light">
            <ion-label class="previousLabel">Physical examination</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <PhysicalExamination />
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </div>
  </ion-row>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { build, checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { OrderService } from "@/services/order_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { mapState } from "pinia";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import BasicForm from "@/components/BasicForm.vue";
import List from "@/components/List.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import labOrderResults from "@/components/Lab/labOrderResults.vue";
import { EncounterService } from "@/services/encounter_service";
import { LabOrder } from "@/services/lab_order";
import Allergies from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/Allergies.vue";
import LevelOfConsciousness from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/LevelOfConsciousness.vue";
import PastMedicalHistory from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PastMedicalHistory.vue";
import PhysicalExamination from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PhysicalExamination.vue";
import PregnancyBreastfeeding from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PregnancyBreastfeeding.vue";
import PresentingComplaints from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/PresentingComplaints.vue";
import VisitHistory from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/VisitHistory.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { ConceptService } from "@/services/concept_service";
import { PatientService } from "@/services/patient_service";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        IonPopover,
        DashBox,
        SelectionPopover,
        BasicInputField,
        BasicForm,
        List,
        DynamicButton,
        labOrderResults,
        Allergies,
        LevelOfConsciousness,
        PastMedicalHistory,
        PhysicalExamination,
        PregnancyBreastfeeding,
        PresentingComplaints,
        VisitHistory,
    },
    data() {
        return {
            iconsContent: icons,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            testResult: "" as any,
            test: "" as any,
            orders: "" as any,
            filteredSpecimen: "" as any,
            labOrders: "" as any,
            testData: [] as any,
            popoverOpen: false,
            levelOfConsciousnessStatus: false,
            presentingComplaintsStatus: false,
            pregnancyBreastfeedingStatus: false,
            pastMedicalHistory: false,
            allergiesStatus: false,
            physicalExamination: false,
            event: "" as any,
            specimen: "" as any,
            radiologyOrdersStatus: false,
            otherOrdersStatus: false,
        };
    },
  setup() {
    const presentingComplaints = ref<string[]>([]);
    const loading = ref(true);

    async function loadSavedEncounters(patientVisitDate: any) {
      const patient = new PatientService();
      const encounters = await EncounterService.getEncounters(patient.getID(), { date: patientVisitDate });
      await setPresentingComplainsEncounters(encounters);
    }

    async function setPresentingComplainsEncounters(data: any) {
      const observations = data.find((encounter: any) => encounter.type.name === "PRESENTING COMPLAINTS")?.observations;
      if (observations) {
        presentingComplaints.value = await getConceptValues(filterObs(observations, "Presenting complaint"), "coded");
      } else {
        presentingComplaints.value = [];
      }
      loading.value = false;
    }

    function filterObs(observations: any, conceptName: string) {
      return observations?.filter((obs: any) => obs.concept.concept_names.some((name: any) => name.name === conceptName));
    }

    async function getConceptValues(filteredObservations: any, type: string) {
      if (filteredObservations) {
        return Promise.all(
            filteredObservations.map(async (item: any) => {
              return await ConceptService.getConceptName(item.value_coded);
            })
        );
      }
      return [];
    }

    const mounted = async () => {
      const todayDate = new Date().toISOString().split("T")[0];
      await loadSavedEncounters(todayDate);
    };
    mounted();

    return {
      presentingComplaints,
      loading,
    };
  },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    watch: {
      presentingComplaints: {
        handler(newValue) {

        },
        deep: true
      }
    },

    methods: {
        checkPatient() {
            const patient = new PatientService();
            return patient.isChildBearing();
        },
    },
});
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

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}

.modify_buttons {
    padding-left: 20px;
}

.item_no_border {
    --border-color: transparent;
}

.search_result {
    padding: 10px;
}
.action_buttons {
    opacity: 0; /* Initially hide the action buttons */
    transition: opacity 0.3s; /* Add a smooth transition effect */
}

.dashed_bottom_border:hover .action_buttons {
    opacity: 1; /* Show the action buttons when the row is hovered over */
}
.dashed_bottom_border {
    font-weight: 700;
}
.sub_item_body {
    margin-left: 45px;
}
.presentingComplaint {
    margin-top: 10px;
}
</style>
