<template>
  <ion-page>
    <Toolbar />
    <ion-content>
      <div class="container">
        <div class="title">
          <div class="demographics_title">Enrollment</div>
        </div>
      </div>
      <div>
        <ion-col size-sm="12" size-md="12" size-lg="6" size-xl="4">
          <Elligibility />
        </ion-col>
        <div class="footer" style="display: flex; justify-content: space-between; margin-right: 520px; margin-left: 520px;">
          <DynamicButton
              name="Cancel"
              iconSlot="start"
              :icon="iconsContent.arrowLeft"
              @click="nav('patientProfile')"
          />
          <DynamicButton
              name="Save"
              iconSlot="end"
              :icon="iconsContent.saveWhite"
              @click="saveData()"
          />
        </div>
      </div>
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
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import ANCNumber from "@/apps/ANC/components/Enrollment/ANCNumber.vue";
import Elligibility from "@/apps/ANC/components/Enrollment/Elligibility.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { useConfigurationStore } from "@/stores/ConfigurationStore";
import { arrowForwardCircle, grid, list } from "ionicons/icons";
import { PatientService } from "@/services/patient_service";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { GlobalPropertyService } from "@/services/global_property_service";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    getCheckboxInputField,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { formatRadioButtonData, formatCheckBoxData } from "@/services/formatServerData";
import { IdentifierService } from "@/services/identifier_service";
import { resetPatientData } from "@/services/reset_data";
import { UserService } from "@/services/user_service";
import { useANCenrollementStore } from "@/apps/ANC/store/Enrollment/EnrollmentStore";

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
        Elligibility,
        ANCNumber,
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
            demographic: true,
            currentStep: "",
            scanner: false,
            steps: "" as any,
            isOpen: false,
            iconListStatus: "active_icon",
            iconGridStatus: "inactive_icon",
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useConfigurationStore, ["enrollmentDisplayType"]),
        ...mapState(useANCenrollementStore, ["eligibility"]),
        ...mapState(useEnrollementStore, ["NCDNumber", "enrollmentDiagnosis", "substance", "patientHistoryHIV", "patientHistory"]),
    },

    setup() {
        return { chevronBackOutline, checkmark, arrowForwardCircle, grid, list };
    },

    methods: {
        async saveData() {
            this.$router.push("ANCHome");
        },
        openModal() {
            createModal(SaveProgressModal);
        },
        nav(url: any) {
            this.$router.push(url);
        },
        async buildEnrollmentData() {
            return [

                ...(await formatCheckBoxData(this.eligibility)),

            ];
        },
        async saveEnrollment() {
            const data: any = await this.buildEnrollmentData();
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const diagnosisInstance = new Diagnosis();
                diagnosisInstance.onSubmit(this.demographics.patient_id, userID, data);
            }
        },
    },
});
</script>

<style scoped>
.breadcrumbs {
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}
ion-toolbar {
    --opacity: 0.5;
    --background: var(--ion-background-color, #fff);
}
.header {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
.footer {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
}
ion-breadcrumb ion-icon {
    margin-inline: 30px;
}
.breadcrumb-active {
    color: var(--color);
}
.active {
    color: #00190e;
    display: flex;
    height: 40px;
    padding: 0px 16px;
    align-items: center;
    gap: 8px;
}
.active .breadcrumb-text {
    border-bottom: 1px solid #00190e; /* Set the desired color for the underline */
}
ion-footer {
    border-top: 1px solid #e6e6e6;
    display: block;
    position: relative;
    -ms-flex-order: 1;
    order: 1;
    width: 100%;
    background: #f4f4f4f4;
}

.breadcrumbs {
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}
ion-toolbar {
    --opacity: 0.5;
    --background: var(--ion-background-color, #fff);
}
.header {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
}
.footer {
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
}
.footer2 {
    color: #000;
    display: flex;
    justify-content: right;
    padding: 5px 0px 5px 0px;
    margin-right: 40px;
}
ion-breadcrumb ion-icon {
    margin-inline: 30px;
}
.breadcrumb-active {
    color: var(--color);
}
.active {
    color: #00190e;
    display: flex;
    height: 40px;
    padding: 0px 16px;
    align-items: center;
    gap: 8px;
}
.active .breadcrumb-text {
    border-bottom: 1px solid #00190e; /* Set the desired color for the underline */
}
ion-footer {
    border-top: 1px solid #e6e6e6;
}

.icon_div {
    display: flex;
    justify-content: space-between;
    width: 70px;
    position: absolute;
    right: 70px;
    top: 20px;
}
.active_icon {
    font-size: 25px;
    background-color: #ddeedd;
    color: #6fbd70;
    border-radius: 5px;
}
.inactive_icon {
    font-size: 25px;
    color: #ccc;
}
.footer {
    margin-left: 59%;
}
@media screen and (max-width: 768px) {
    .footer {
        margin-left: 65%;
    }
}

.container {
    position: relative;
}

.title {
    text-align: center;
    margin-bottom: 10px;
}
.demographics_title {
    font-weight: 700;
    font-size: 24px;
    padding-top: 20px;
}
.demographics {
    display: flex;
    width: unset;
    justify-content: center;
}
</style>
