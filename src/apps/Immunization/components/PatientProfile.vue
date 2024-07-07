<template>
    <div :fullscreen="true" style="--background: #fff">
        <div class="demographics">
            <div style="max-width: 500px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                <ion-row>
                    <ion-col size="3.3">
                        <div :class="demographics.gender == 'M' ? 'initialsBox maleColor' : 'initialsBox femaleColor'" @click="openPIM()">
                            <ion-icon style="color: #fff; font-size: 100px" :icon="person"></ion-icon>
                        </div>
                    </ion-col>
                    <ion-col size="8.7">
                        <div class="demographicsFirstRow">
                            <div class="name">{{ demographics.name }}</div>
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
                                MRN: <span class="mediumFontColor">{{ demographics.mrn }}</span>
                            </div>
                        </div>
                        <div class="demographicsOtherRow">
                            <div class="demographicsText smallFont">Outcome: <span class="outcomeStatus"> Active</span></div>
                        </div>
                        <div class="demographicsOtherRow">
                            <div class="demographicsText smallFont">
                                Status:
                                <span v-if="protectedStatus == 'No'" style="background: #fedf89; color: #b54708" class="protectedStatus"
                                    >Unprotected at birth</span
                                >
                                <span v-else-if="protectedStatus == 'Yes'" style="background: #ddeedd" class="protectedStatus"
                                    >Protected at birth</span
                                >
                                <span v-else class="protectedStatus" style="background: #fecdca; color: #b42318">Unknown protection at birth</span>
                            </div>
                        </div>
                    </ion-col>
                </ion-row>
            </div>
            <div class="name" style="color: var(--ion-color-primary); margin-top: 10px">
                <ion-icon :icon="ellipsisVerticalSharp"></ion-icon>
            </div>
        </div>
        <div class="graphSection">
            <div>
                <WeightHeightChart :checkUnderSixWeeks="checkUnderSixWeeks" :showHeightWeight="true" v-if="isChild()" />
                <PreviousVitals v-if="!isChild()" />
            </div>

            <div class="graphBtn" style="margin-bottom: 5px">
                <div class="weightHeightGraphBtns">
                    <div>
                        <ion-button class="btnText" fill="solid" @click="openWH()">
                            <span v-if="!checkUnderSixWeeks"> Enter Weight/Height</span>
                            <span v-else> Enter Weight</span>
                            <ion-icon slot="end" size="small" :icon="iconsContent.whiteHeightWeight"></ion-icon>
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
                    <ion-row>
                        <div class="box-line"></div>
                        <ion-col v-if="overDueVaccinesCount > 0" style="display: flex; justify-content: center">
                            <div class="missed_vaccine_alert">
                                <ion-icon slot="start" size="small" :icon="iconsContent.alertDangerRed" />
                                <span style="margin: 10px">{{ overDueVaccinesCount }} vaccine(s) overdue</span>
                            </div>
                        </ion-col>
                        <ion-col style="display: flex; justify-content: center; cursor: pointer" @click="showMissedVaccines">
                            <div class="missed_vaccine_alert_txt">
                                <span>click to see missed vaccines</span>
                            </div>
                        </ion-col>
                        <div class="box-line"></div>
                    </ion-row>

                    <!-- <ion-row v-for="(item, index) in missedVaccineSchedules" :key="index">
                        <div>
                            <ion-button class="btnText btnTextWeight" size="small" fill="solid" color="danger">
                                <ion-icon slot="start" size="small" :icon="iconsContent.alertDangerRed"></ion-icon>
                                <b> at {{ item.age }}</b>
                            </ion-button>
                        </div>
                        <div class="dueAlertText">{{ item.vaccines.length }} vaccine(s) missed!</div>
                    </ion-row> -->
                </div>
            </div>
            <div class="vaccinesTitle">
                <div style="width: 370px; display: flex; justify-content: space-between; align-content: center">
                    <div class="vaccinesTitleText">Administer Vaccines</div>
                    <div class="vaccinesTitleDate">
                        Todays Date: <b>{{ todays_date }}</b>
                    </div>
                </div>
            </div>
            <div class="milestone">
                <div style="display: flex; justify-content: space-between; align-content: center">
                    <ion-icon size="small" :icon="iconsContent.greenCalender"></ion-icon>
                    <div style="color: #636363; margin-left: 5px; margin-top: -4px">
                        at <span style="color: #636363; font-weight: bold; font-size: 14px"> {{ current_milestone }}</span>
                    </div>
                </div>
                <div class="vaccinesTitleDate">(Swipe left or right for other milestones)</div>
            </div>
            <!--Vaccine Card-->

            <customSlider />

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
    IonRow,
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark, ellipsisVerticalSharp, person } from "ionicons/icons";
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
import { resetPatientData } from "@/services/reset_data";
import { PatientReferralService } from "@/services/patient_referral_service";
import { PatientAdmitService } from "@/services/patient_admit_service";
import DynamicButton from "@/components/DynamicButton.vue";
import WeightHeightChart from "@/apps/Immunization/components/Graphs/WeightHeightChart.vue";
import { createModal } from "@/utils/Alerts";
import OtherVitals from "@/apps/Immunization/components/OthervitalsModal.vue";
import vaccinationHistory from "@/apps/Immunization/components/Modals/vaccinationHistoryModal.vue";
import followUpVisitModal from "@/apps/Immunization/components/Modals/followUpVisitModal.vue";
import personalInformationModal from "@/apps/Immunization/components/Modals/personalInformationModal.vue";
import weightAndHeight from "@/apps/Immunization/components/Modals/weightAndHeight.vue";
import administerVaccineModal from "@/apps/Immunization/components/Modals/administerVaccineModal.vue";
import administerOtherVaccineModal from "@/apps/Immunization/components/Modals/administerOtherVaccineModal.vue";
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import { PatientService } from "@/services/patient_service";
import customSlider from "@/apps/Immunization/components/customSlider.vue";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { ConceptService } from "@/services/concept_service";
import { ObservationService } from "@/services/observation_service";
import missedVaccinesModal from "@/apps/Immunization/components/Modals/missedVaccinesModal.vue";
import { DrugOrderService } from "@/services/drug_order_service";

import {
    getFieldValue,
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyWizardData,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import PatientProfileVue from "@/views/PatientProfile.vue";
import { useRegistrationStore } from "@/stores/RegistrationStore";
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
        IonRow,
    },
    data() {
        return {
            wizardData: [] as any,
            StepperData: [] as any,
            isOpen: false,
            iconsContent: icons,
            current_milestone: "" as string,
            checkUnderSixWeeks: false,
            unprotected_at_birth: "" as string,
            protectedStatus: "" as string,
            todays_date: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            lastVaccine: [] as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        ...mapState(useOutcomeStore, ["dispositions"]),
        ...mapState(useAdministerVaccineStore, ["currentMilestone", "missedVaccineSchedules", "overDueVaccinesCount"]),
    },
    created() {
        this.getData();
    },
    async mounted() {
        this.markWizard();
        this.loadCurrentMilestone();
        this.checkAge();
        await this.checkProtectedStatus();
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
        currentMilestone: {
            handler() {
                this.loadCurrentMilestone();
            },
        },
        $route: {
            async handler(data) {
                console.log("patientProfile", data.name);
                if (data.name == "patientProfile") {
                    await this.checkProtectedStatus();
                }
            },
        },
        demographics: {
            async handler() {
                await this.checkProtectedStatus();
                await this.openFollowModal();
                this.checkAge();
            },
        },
    },
    setup() {
        return { chevronBackOutline, checkmark, ellipsisVerticalSharp, person };
    },

    methods: {
        async checkProtectedStatus() {
            this.protectedStatus = await ObservationService.getFirstValueText(this.demographics.patient_id, "Protected at birth");
        },
        checkAge() {
            if (!isEmpty(this.demographics.birthdate)) {
                this.checkUnderSixWeeks = HisDate.dateDiffInDays(HisDate.currentDate(), this.demographics.birthdate) < 42 ? true : false;
            }
        },
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
            createModal(vaccinationHistory, { class: "otherVitalsModal vaccineHistoryModal" });
        },
        async openFollowModal() {
            this.lastVaccine = await DrugOrderService.getLastDrugsReceived(this.demographics.patient_id);
            const dataToPass = { protectedStatus: this.protectedStatus };
            if (this.lastVaccine.length > 0) createModal(followUpVisitModal, { class: "otherVitalsModal" }, true, dataToPass);
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
        loadCurrentMilestone() {
            const store = useAdministerVaccineStore();
            this.current_milestone = store.getCurrentMilestone();
        },
        showMissedVaccines() {
            if (this.missedVaccineSchedules.length > 0) {
                createModal(missedVaccinesModal, { class: "otherVitalsModal" });
            }
            
        },
    },
});
</script>

<style scoped>
.demographics {
    box-sizing: border-box;
    width: 95vw;
    /* height: 92px; */
    left: calc(50% - 461px / 2 + 27.5px);
    margin-top: 10px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
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
    font-size: 14px;
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
    height: 25px;
    left: calc(50% - 243px / 2 + 26.5px);
    top: calc(50% - 23px / 2 - 455.5px);
}
.smallFont {
    font-size: 14px;
}
.mediumFontColor {
    color: #00190e;
}

.weightHeightGraphBtns {
    display: flex;
    justify-content: space-around;
    margin-top: 8px;
    width: 100%;
    max-width: 500px;
}
.btnText {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
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
    width: 95px;
    height: 115px;
    left: 31px;
    top: 122px;
    align-items: center;
    border-radius: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
}
.maleColor {
    background: #5983ba;
}
.femaleColor {
    background: #876d9b;
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
    font-size: 14px;
    align-items: center;
    text-align: center;
}
.protectedStatus {
    align-items: center;
    padding: 2px 7px;
    width: 50px;
    height: 18px;
    border-radius: 22px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    align-items: center;
    color: #006401;
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
    display: contents;
    justify-content: center;
}
.dueAlert {
    justify-content: space-between;
    /* border: solid 1px #ccc;
    border-style: dashed; */
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
    margin-top: -7px;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.vaccinesTitleDate {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
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
.administerVac {
    height: 58px;
    width: 150px;
}
.dashed-hr {
    border: none;
    border-top: 1px dashed #b3b3b3;
    margin: 20px 0; /* Adjust as needed */
}
.missed_vaccine_alert {
    /* Toast */

    /* box-sizing: border-box; */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px;

    width: 240px;
    height: 25px;

    /* red/300 */
    background: #fecdca;
    /* red/500 */
    border: 1px solid #fda19b;
    box-shadow: 0px 4px 5px rgba(189, 13, 0, 0.1);
    border-radius: 8px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}
.missed_vaccine_alert_txt {
    /* click to see missed vaccines */

    width: 190px;
    height: 17px;

    /* btn */
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    /* red/900 */
    color: #b42318;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}
.box-line {
    /* warning */

    /* Line 3 */

    width: 100%;
    height: 0px;

    /* Tertiary */
    border: 1px dashed #b3b3b3;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}
</style>
