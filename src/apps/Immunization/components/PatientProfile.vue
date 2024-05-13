<template>
    <div :fullscreen="true" style="--background: #fff">
        <div class="demographics">
            <ion-row>
                <ion-col size="3">
                    <div class="initialsBox">
                        <div class="initialsText">{{ demographics?.name.charAt(0) }} {{ demographics?.name.split(" ")[1].charAt(0) }}</div>
                    </div>
                </ion-col>
                <ion-col size="9">
                    <div class="demographicsFirstRow">
                        <div class="name">{{ demographics.name }}</div>
                        <div class="name" @click="openPIM()" style="color: var(--ion-color-primary)">
                            <ion-icon :icon="ellipsisVerticalSharp"></ion-icon>
                        </div>
                    </div>
                    <div class="demographicsOtherRow">
                        <div class="demographicsText">
                            {{ demographics.gender == "M" ? "Male" : "Female" }} <span class="dot">.</span> {{ formatBirthdate() }}
                        </div>
                    </div>
                    <div class="demographicsOtherRow">
                        <div class="demographicsText">Current Address:</div>
                        <div class="demographicsText mediumFontColor">{{ demographics.address }}</div>
                    </div>
                    <div class="demographicsOtherRow">
                        <div class="demographicsText smallFont">
                            MRN: <span class="mediumFontColor">{{ demographics.mrn }}</span> <span class="dot">.</span> Outcome:
                            <span class="outcomeStatus">Active</span>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
        </div>
        <div class="graphSection">
            <div class="graphBtn">
                <div class="weightHeightGraphBtns">
                    <div>
                        <ion-button class="btnText btnTextWeight" size="small" fill="outline">
                            Weight/Age Graph <ion-icon slot="end" size="small" :icon="iconsContent.networkBarDark"></ion-icon>
                        </ion-button>
                    </div>
                    <div>
                        <ion-button class="btnText" size="small" fill="solid">
                            Height/Age Graph
                            <ion-icon slot="end" size="small" :icon="iconsContent.networkBarLight"></ion-icon>
                        </ion-button>
                    </div>
                </div>
            </div>
            <div>
                <WeightHeightChart v-if="isChild()" />
                <PreviousVitals v-if="!isChild()" />
            </div>
            <div class="graphBtn">
                <div class="weightHeightGraphBtns">
                    <div>
                        <span class="warningText"> Current Height: <b>94 Cm </b> </span>
                    </div>
                    <div>
                        <span class="successText"> Current Weight: <b>22 Kg</b> </span>
                    </div>
                </div>
            </div>
            <div class="graphBtn" style="margin-bottom: 5px">
                <div class="weightHeightGraphBtns">
                    <div>
                        <ion-button class="btnText" fill="solid" @click="openWH()">
                            Enter Weight/Height <ion-icon slot="end" size="small" :icon="iconsContent.whiteHeightWeight"></ion-icon>
                        </ion-button>
                    </div>
                    <div>
                        <ion-button class="btnText" fill="solid" @click="openVitalsModal()">
                            Enter Other Vitals
                            <ion-icon slot="end" size="small" :icon="iconsContent.whiteVitals"></ion-icon>
                        </ion-button>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="graphBtn">
                <div class="dueAlert">
                    <div>
                        <ion-button class="btnText btnTextWeight" size="small" fill="solid" color="danger">
                            <ion-icon slot="start" size="small" :icon="iconsContent.alertDangerRed"></ion-icon>
                            <b> at 6 weeks overdue</b>
                        </ion-button>
                    </div>
                    <div class="dueAlertText">4 vaccines missed!</div>
                </div>
            </div>
            <div class="vaccinesTitle">
                <div style="width: 370px; display: flex; justify-content: space-between; align-content: center">
                    <div class="vaccinesTitleText">Administer Vaccines</div>
                    <div class="vaccinesTitleDate">Todays Date: <b>06 Jul 2024 </b></div>
                </div>
            </div>
            <div class="milestone">
                <div style="width: 120px; display: flex; justify-content: space-between; align-content: center">
                    <ion-icon size="small" :icon="iconsContent.calendar"></ion-icon>
                    <div style="color: #636363">at <span style="color: #636363; font-weight: bold; font-size: 14px"> 10 Weeks</span></div>
                </div>
                <div class="vaccinesTitleDate">(Swipe left or right for other milestones)</div>
            </div>
            <!--Vaccine Card-->

            <customSlider/>
            <div class="vaccinesList" @click="openAdministerVaccineModal()">
                <ion-row>
                    <ion-col size="2">
                        <ion-button fill="clear" class="arrowBtns">
                            <ion-icon size="large" :icon="iconsContent.backBlueArrow"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col size="3.9">
                        <ion-button fill="solid" color="success">
                            <ion-icon slot="start" :icon="iconsContent.greenInjection"></ion-icon>
                            OPV 2
                            <ion-icon slot="end" :icon="iconsContent.greenTickCheckbox"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col size="3.9" offset="0.1">
                        <ion-button fill="solid" color="success">
                            <ion-icon slot="start" :icon="iconsContent.greenInjection"></ion-icon>
                            OPV 2
                            <ion-icon slot="end" :icon="iconsContent.greenTickCheckbox"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col size="2">
                        <ion-button fill="clear" class="arrowBtns">
                            <ion-icon size="large" :icon="iconsContent.forwardBlueArrow"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="2"> </ion-col>
                    <ion-col size="3.9">
                        <ion-button fill="solid" color="medium">
                            <ion-icon slot="start" :icon="iconsContent.whiteInjection"></ion-icon>
                            OPV 2
                            <ion-icon slot="end" :icon="iconsContent.whiteCheckbox"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col size="3.9" offset="0.1">
                        <ion-button fill="solid" color="medium">
                            <ion-icon slot="start" :icon="iconsContent.whiteInjection"></ion-icon>
                            OPV 2
                            <ion-icon slot="end" :icon="iconsContent.whiteCheckbox"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col size="2"> </ion-col>
                </ion-row>
            </div>
            <div class="otherVaccine">
                <div class="centerBtns">
                    <ion-button @click="openAdministerOtherVaccineModal()" class="btnText" fill="solid"> Add Other Vaccines </ion-button>
                </div>
            </div>
            <div class="dotsWizard">
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.greenDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.redDot"></ion-icon>
                <ion-icon class="dotBig" slot="start" :icon="iconsContent.blueDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.grayDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.grayDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.grayDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.grayDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.grayDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.grayDot"></ion-icon>
                <ion-icon class="dotStatus" slot="start" :icon="iconsContent.grayDot"></ion-icon>
            </div>

            <div class="lastVaccine">
                <div class="lastVaccineTitle">
                    <div class="lastVaccineText">Last vaccines given</div>
                    <div class="seeFullList">
                        <ion-button @click="openVH()" style="color: #016302" class="btnText btnTextWeight" size="small" fill="clear">
                            <span>See full History</span>
                        </ion-button>
                    </div>
                </div>
                <div class="lastVaccineDate">
                    <ion-icon size="small" :icon="iconsContent.calendar"></ion-icon>
                    <div>at Birth <span class="dot">.</span> 19 Apr 2024</div>
                </div>
                <div class="lastVaccineList">
                    <ion-button fill="solid" color="success">
                        <ion-icon slot="start" :icon="iconsContent.greenInjection"></ion-icon>
                        OPV 0
                    </ion-button>
                    <ion-button fill="solid" color="success">
                        <ion-icon slot="start" :icon="iconsContent.greenInjection"></ion-icon>
                        BCG
                    </ion-button>
                </div>
            </div>
        </div>
    </div>
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
import { chevronBackOutline, checkmark, ellipsisVerticalSharp } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
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
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
import { useGeneralStore } from "@/stores/GeneralStore";
import { resetPatientData } from "@/services/reset_data";
import { PatientReferralService } from "@/services/patient_referral_service";
import { PatientAdmitService } from "@/services/patient_admit_service";
import DynamicButton from "@/components/DynamicButton.vue";
import WeightHeightChart from "@/apps/Immunization/components/Graphs/WeightHeightChart.vue";
import { createModal } from "@/utils/Alerts";
import OtherVitals from "@/apps/Immunization/components/OthervitalsModal.vue";
import vaccinationHistory from "@/apps/Immunization/components/Modals/vaccinationHistoryModal.vue";
import personalInformationModal from "@/apps/Immunization/components/Modals/personalInformationModal.vue";
import weightAndHeight from "@/apps/Immunization/components/Modals/weightAndHeight.vue";
import administerVaccineModal from "@/apps/Immunization/components/Modals/administerVaccineModal.vue";
import administerOtherVaccineModal from "@/apps/Immunization/components/Modals/administerOtherVaccineModal.vue";
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import { PatientService } from "@/services/patient_service";
import customSlider from "@/apps/Immunization/components/customSlider.vue"

import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyWizardData,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import PatientProfileVue from "@/views/PatientProfile.vue";
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
        DynamicButton,
        WeightHeightChart,
        PreviousVitals,
        customSlider,
    },
    data() {
        return {
            wizardData: [] as any,
            StepperData: [] as any,
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        ...mapState(useGeneralStore, ["activities"]),
        ...mapState(useOutcomeStore, ["dispositions"]),
    },
    created() {
        this.getData();
    },
    mounted() {
        if (this.activities.length == 0) {
            this.$router.push("patientProfile");
        }
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
        return { chevronBackOutline, checkmark, ellipsisVerticalSharp };
    },

    methods: {
        openVitalsModal() {
            createModal(OtherVitals, { class: "otherVitalsModal" });
        },
        openPIM() {
            createModal(personalInformationModal, { class: "otherVitalsModal" });
        },
        openWH() {
            createModal(weightAndHeight, { class: "otherVitalsModal" });
        },
        openVH() {
            createModal(vaccinationHistory, { class: "otherVitalsModal" });
        },
        openAdministerVaccineModal() {
            createModal(administerVaccineModal, { class: "otherVitalsModal" });
        },
        openAdministerOtherVaccineModal() {
            createModal(administerOtherVaccineModal, { class: "otherVitalsModal" });
        },
        isChild() {
            const patient = new PatientService();
            if (patient.isUnderFive()) return true;
            else return false;
        },
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics.birthdate);
        },
        async getData() {
            const steps = ["Growth Monitor", "Immunization Services", "Next Appointment", "Change Status"];
            // const steps = this.activities;
            for (let i = 0; i < steps.length; i++) {
                const title = steps[i];
                const number = i + 1;

                this.wizardData.push({
                    title,
                    class: "common_step",
                    checked: i === 0 ? false : "",
                    disabled: false,
                    number,
                    last_step: i === steps.length - 1 ? "last_step" : "",
                });
                let component = title;
                if (title == "Next Appointment") component = "Immunization Next Appointment";
                this.StepperData.push({
                    title,
                    component: component.replace(/\s+/g, ""),
                    value: number.toString(),
                });
            }
        },
        markWizard() {
            if (this.vitals.validationStatus) {
                modifyWizardData(this.wizardData, "Vital Signs", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Vital Signs", {
                    checked: false,
                });
            }

            if (this.investigations[0].selectedData.length > 0) {
                modifyWizardData(this.wizardData, "Investigations", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Investigations", {
                    checked: false,
                });
            }

            if (this.diagnosis[0].selectedData.length > 0) {
                modifyWizardData(this.wizardData, "Diagnosis", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Diagnosis", {
                    checked: false,
                });
            }

            if (this.selectedMedicalDrugsList.length > 0) {
                modifyWizardData(this.wizardData, "Treatment Plan", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Treatment Plan", {
                    checked: false,
                });
            }

            if (this.dispositions.length > 0) {
                modifyWizardData(this.wizardData, "Outcome", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Outcome", {
                    checked: false,
                });
            }
        },

        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        async saveData() {
            await this.saveVitals();
            await this.saveDiagnosis();
            await this.saveTreatmentPlan();
            await this.saveOutComeStatus();
            resetPatientData();
            this.$router.push("patientProfile");
        },
        async saveVitals() {
            if (this.vitals.validationStatus) {
                const userID: any = Service.getUserID();
                const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
                vitalsInstance.onFinish(this.vitals);
            }
        },
        async saveDiagnosis() {
            if (this.diagnosis[0].selectedData.length > 0) {
                const userID: any = Service.getUserID();
                const diagnosisInstance = new Diagnosis();
                diagnosisInstance.onSubmit(this.demographics.patient_id, userID, this.getFormatedData(this.diagnosis[0].selectedData));
            }
        },
        async saveTreatmentPlan() {
            const userID: any = Service.getUserID();
            const patientID = this.demographics.patient_id;
            const treatmentInstance = new Treatment();

            if (!isEmpty(this.selectedMedicalAllergiesList)) {
                const allergies = this.mapToAllergies();
                treatmentInstance.onSubmitAllergies(patientID, userID, allergies);
            }

            if (!isEmpty(this.nonPharmalogicalTherapyAndOtherNotes)) {
                const treatmentNotesTxt = [
                    {
                        concept_id: 2688,
                        obs_datetime: Service.getSessionDate(),
                        value_text: this.nonPharmalogicalTherapyAndOtherNotes,
                    },
                ];
                treatmentInstance.onSubmitNotes(patientID, userID, treatmentNotesTxt);
            }

            if (!isEmpty(this.selectedMedicalDrugsList)) {
                const drugOrders = this.mapToOrders();
                const prescriptionService = new DrugPrescriptionService(patientID, userID);
                const encounter = await prescriptionService.createEncounter();
                if (!encounter) return toastWarning("Unable to create treatment encounter");
                const drugOrder = await prescriptionService.createDrugOrder(drugOrders);
                if (!drugOrder) return toastWarning("Unable to create drug orders!");
                toastSuccess("Drug order has been created");
            }
        },

        async saveOutComeStatus() {
            const userID: any = Service.getUserID();
            const patientID = this.demographics.patient_id;

            if (!isEmpty(this.dispositions)) {
                this.dispositions.forEach(async (disposition: any) => {
                    if (disposition.type == "Admitted for short stay") {
                        const prePayload = {
                            obs_datetime: disposition.date.year + "-" + disposition.date.month + "-" + disposition.date.day,
                            concept_id: disposition.concept_id,
                            value_text: disposition.name,
                        } as any;

                        const admissionOutcome = new PatientAdmitService(patientID, userID);
                        const obs = await admissionOutcome.buildValueText("Admit to ward", prePayload.value_text);
                        obs.obs_datetime = prePayload.obs_datetime;
                        obs.value_text = prePayload.value_text;
                        await admissionOutcome.createEncounter();
                        await admissionOutcome.saveObservationList([obs] as any);
                    }
                    if (disposition.type == "Referred out") {
                        const prePayload = {
                            obs_datetime: disposition.date.year + "-" + disposition.date.month + "-" + disposition.date.day,
                            concept_id: disposition.concept_id,
                            value_text: disposition.name,
                            location_id: disposition.other.location_id,
                        } as any;

                        const referralOutcome = new PatientReferralService(patientID, userID);
                        const obs = await referralOutcome.buildValueText("Referred", prePayload.value_text);
                        obs.obs_datetime = prePayload.obs_datetime;
                        obs.value_text = prePayload.location_id;
                        await referralOutcome.createEncounter();
                        await referralOutcome.saveObservationList([obs] as any);
                    }
                });
            }
        },
        openModal() {
            createModal(SaveProgressModal);
        },
        mapToOrders(): any[] {
            return this.selectedMedicalDrugsList.map((drug: any) => {
                const startDate = DrugPrescriptionService.getSessionDate();
                const frequency = DRUG_FREQUENCIES.find((f) => f.label === drug.frequency) || ({} as (typeof DRUG_FREQUENCIES)[0]);
                return {
                    drug_inventory_id: drug.drug_id,
                    equivalent_daily_dose: drug.dose == "Unknown" ? 0 : drug.dose * frequency?.value || 0,
                    start_date: startDate,
                    auto_expire_date: this.calculateExpireDate(startDate, drug.duration),
                    units: drug.units,
                    instructions: `${drug.drugName}: ${drug.dose} ${drug.units} ${frequency?.code || ""} for ${drug.duration} days`,
                    dose: drug.dose,
                    frequency: frequency?.code || "",
                };
            });
        },
        calculateExpireDate(startDate: string | Date, duration: any) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + parseInt(duration));
            return HisDate.toStandardHisFormat(date);
        },
        mapToAllergies(): any[] {
            return this.selectedMedicalAllergiesList.map((allergy: any) => {
                return {
                    concept_id: 985,
                    obs_datetime: Service.getSessionDate(),
                    value_coded: allergy.concept_id,
                };
            });
        },
    },
});
</script>

<style scoped>
.demographics {
    box-sizing: border-box;
    width: 95vw;
    height: 92px;
    left: calc(50% - 461px / 2 + 27.5px);
    margin-top: 10px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 7px;
}
.demographicsFirstRow {
    /* _Input dropdown menu item */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 5px;
    gap: 15px;

    height: 24px;
    justify-content: space-between;
}
.name {
    /* Text */

    height: 24px;

    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #00190e;

    flex: none;
    order: 0;
    flex-grow: 0;
}
.demographicsText {
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 5px;
    color: #636363;

    flex: none;
    order: 0;
    flex-grow: 0;
}
.demographicsOtherRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1px 5px;
    gap: 10px;

    height: 18px;
    left: calc(50% - 243px / 2 + 26.5px);
    top: calc(50% - 23px / 2 - 455.5px);
}
.smallFont {
    font-size: 12px;
}
.mediumFontColor {
    color: #00190e;
}

.weightHeightGraphBtns {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
}
.btnTextWeight {
    color: #000;
    --border-width: 1px;
    margin-right: 15px;
}
.dot {
    font-size: 25px;
}
.initialsBox {
    width: 80px;
    height: 80px;
    left: 31px;
    top: 122px;
    align-items: center;
    background: #5983ba;
    border-radius: 10px;
    align-items: center;
    display: flex;
}
.initialsText {
    width: 100%;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    align-content: center;
    color: #ffffff;
}
.outcomeStatus {
    align-items: center;
    padding: 2px 7px;
    width: 50px;
    height: 18px;
    background: #ddeedd;
    border-radius: 22px;
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    align-items: center;
    text-align: center;
}
.graphSection {
    box-sizing: border-box;
    background: #f7f7f7;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    margin-top: 7px;
}
.graphBtn {
    display: flex;
    justify-content: center;
}
.dueAlert {
    display: flex;
    justify-content: space-between;
    border: solid 1px #ccc;
    border-style: dashed;
    margin-top: 10px;
    padding: 5px;
}
.dueAlertText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #b42318;
    padding: 10px;
}
/* ion-button {
    --padding-top: 0;
    --padding-bottom: 0;
} */
.vaccinesTitle {
    display: flex;
    justify-content: space-around;
    padding: 15px;
}
.vaccinesTitleText {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    color: #00190e;
}
.vaccinesTitleDate {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #636363;
}
.milestone {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
}

.arrowBtns {
    position: absolute;
    top: 30px;
}
.vaccinesList {
    margin-top: 8px;
}
.seeFullList {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #316cba;
    float: right;
}
.warningText {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    gap: 1px;
    background: #fedf89;
    border-radius: 4px;
    font-size: 13px;
    margin-right: 10px;
    color: #636363;
}
.successText {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    gap: 1px;
    background: #ddeedd;
    border-radius: 4px;
    font-size: 13px;
    color: #636363;
}
.centerBtns {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.otherVaccine {
    padding: 10px;
    margin-bottom: 10px;
}
.dotsWizard {
    display: flex;
    justify-content: space-between;
    width: 150px;
    margin: 0 auto;
    align-items: center;
}
.dotBig {
    font-size: 0.7rem !important;
}
.dotStatus {
    font-size: 0.4rem !important;
}
.lastVaccineTitle {
    display: flex;
    justify-content: space-between;
}
.lastVaccine {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
}
.lastVaccineText {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    color: #00190e;
}
.lastVaccineList {
    display: flex;
    justify-content: space-between;
    width: 210px;
    margin-bottom: 20px;
}
.lastVaccineDate {
    display: flex;
    justify-content: space-between;
    width: 210px;
    margin-bottom: 10px;
    align-items: center;
}
</style>
