<template>
    <ion-page>
      <!-- Spinner -->
      <div v-if="isLoading" class="spinner-overlay">
        <ion-spinner name="bubbles"></ion-spinner>
        <div class="loading-text">Please wait...</div>
      </div>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Vitals" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData" />
        </ion-content>
        <BasicFooter :name="actionBtn" @finishBtn="saveData()" />
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
import BasicFooter from "@/components/BasicFooter.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { VitalsService } from "@/services/vitals_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { defineComponent } from "vue";
import { useVitalsStore } from "@/stores/VitalsStore";
import { resetOPDPatientData } from "@/apps/OPD/config/reset_opd_data";
import {getFieldValue} from "@/services/data_helpers";
import HisDate from "@/utils/Date";
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
        BasicFooter,
    },
    data() {
        return {
          isLoading:false,
            hasValidationErrors: [] as any,
            dispositions: "" as any,
            actionBtn: "" as any,
            wizardData: [
                {
                    title: "Vital Signs",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Vital Signs",
                    component: "VitalSigns",
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
      "Height Weight Reason"() {
        return getFieldValue(this.vitals, "Height Weight Reason", "value");
      },
    },
    async created() {
        // this.getData();
    },
    mounted() {
        this.markWizard();
    },
    watch: {
        vitals: {
            handler() {
                this.markWizard();
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
        markWizard() {
            this.actionBtn = this.vitals[0].actionBtn;
            if (this.vitals.validationStatus) {
                this.wizardData[0].checked = true;
                this.wizardData[0].class = "open_step common_step";
            } else {
                this.wizardData[0].checked = false;
            }
        },
      async saveData() {
        this.isLoading = true;
        try {
          if (this.actionBtn != "Finish") {
            if (this.vitals.validationStatus) {
              await this.saveVitals();
              resetOPDPatientData();
              this.$router.push("OPDConsultationPlan");
            } else {
              await this.validaterowData();
              toastWarning("Please fill all required fields");
            }
          } else {
            this.$router.push("OPDConsultationPlan");
            // this.$router.push("patientProfile");
          }
        } catch (error) {
          console.error("Error in saveData: ", error);
        } finally {
          this.isLoading = false;
        }
      },

      async saveVitals() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            await vitalsInstance.onFinish(this.vitals);
        },
      async validaterowData() {
        const userID: any = Service.getUserID();
        const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
        const age = HisDate.getAgeInYears(this.demographics?.birthdate);

        this.vitals.forEach((section: any, sectionIndex: any) => {
          if (section?.data?.rowData) {
            section?.data?.rowData.forEach((col: any, colIndex: any) => {
              col.colData.some((input: any, inputIndex: any) => {
                if (input.name === "Respiratory rate" && age <= 5) {
                  const validateResult = vitalsInstance.validator(input);
                  if (validateResult?.length > 0) {
                    this.hasValidationErrors.push("false");
                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = validateResult.flat(Infinity)[0];
                    return true;
                  } else {
                    this.hasValidationErrors.push("true");
                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = false;
                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = "";
                  }
                } else {
                  const validateResult = vitalsInstance.validator(input);
                  if (validateResult?.length > 0) {
                    this.hasValidationErrors.push("false");
                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = validateResult.flat(Infinity)[0];
                    return true;
                  } else {
                    this.hasValidationErrors.push("true");
                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = false;
                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = "";
                  }
                }

                return false;
              });
            });
          }
        });

        this.vitals.validationStatus = !this.hasValidationErrors.includes("false");
      },

      openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
}

ion-spinner {
  width: 80px;
  height: 80px;
}

.loading-text {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}

.loading {
  pointer-events: none;
}
</style>
