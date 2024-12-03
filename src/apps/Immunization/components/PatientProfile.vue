<template>
    <div :fullscreen="true" style="--background: #fff">
        <div class="demographics">
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                <div
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-content: center;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        padding-left: 5px;
                    "
                >
                    <div style="margin-right: 5px">
                        <div :class="patient.personInformation.gender == 'M' ? 'initialsBox maleColor' : 'initialsBox femaleColor'">
                            <ion-icon style="color: #fff; font-size: 100px" :icon="person"></ion-icon>
                        </div>
                    </div>
                    <div>
                        <div class="demographicsFirstRow">
                            <div class="name">
                                {{ patient.personInformation.given_name }} {{ patient.personInformation.middle_name }}
                                {{ patient.personInformation.family_name }}
                            </div>
                        </div>
                        <div class="demographicsOtherRow" style="margin-top: 10px">
                            <div class="demographicsText">
                                {{ patient.personInformation.gender == "M" ? "Male" : "Female" }} <span class="dot">.</span>
                                {{ getAge(patient.personInformation.birthdate) }} ({{ formatBirthdate() }})
                            </div>
                        </div>
                        <div class="demographicsOtherRow" v-if="patient.personInformation.current_district">
                            <div class="demographicsText">Current Address:</div>
                            <div class="demographicsText mediumFontColor">{{ patient.personInformation.current_district }}</div>
                        </div>
                        <div class="demographicsOtherRow" v-if="patient.personInformation.country">
                            <div class="demographicsText">Country:</div>
                            <div class="demographicsText mediumFontColor">{{ patient.personInformation.country }}</div>
                        </div>
                        <div class="demographicsOtherRow">
                            <div class="demographicsText smallFont">
                                MRN: <span class="mediumFontColor">{{ patient.ID }}</span>
                            </div>
                        </div>
                        <div class="demographicsOtherRow">
                            <div class="demographicsText smallFont" v-if="selectedStatus == 7">
                                Outcome: <span class="outcomeStatus"> Active</span>
                            </div>
                            <div class="demographicsText smallFont" v-if="selectedStatus == 6">
                                Outcome: <span class="outcomeStatus" style="background: #fecdca; color: #b42318"> Inactive</span>
                            </div>
                            <div class="demographicsText smallFont" v-if="selectedStatus == 3">
                                Outcome: <span class="outcomeStatus" style="background: #fecdca; color: #b42318"> Died</span>
                            </div>
                        </div>
                        <div class="demographicsOtherRow" style="margin-bottom: 10px">
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
                    </div>
                </div>
            </div>
            <div class="name" style="color: var(--ion-color-primary); margin-top: 10px" @click="openPopover($event)">
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
            <div class="graphBtn" v-if="overDueVaccinesCount > 0">
                <div class="dueAlert">
                    <ion-row>
                        <ion-col
                            v-if="overDueVaccinesCount > 0"
                            style="display: flex; justify-content: center; cursor: pointer"
                            @click="showMissedVaccines"
                        >
                            <div class="missed_vaccine_alert">
                                <ion-icon slot="start" :icon="iconsContent.alertDangerRed" />
                                <span style="margin-right: 5px">{{ overDueVaccinesCount }} vaccine(s) overdue</span>
                            </div>
                        </ion-col>
                        <!-- <ion-col v-if="overDueVaccinesCount > 0" style="display: flex; justify-content: center; cursor: pointer" @click="showMissedVaccines">
                        <ion-col
                            v-if="overDueVaccinesCount > 0"
                            style="display: flex; justify-content: center; cursor: pointer"
                            @click="showMissedVaccines"
                        >
                            <div class="missed_vaccine_alert_txt">
                                <span>click to see missed vaccines</span>
                            </div>
                        </ion-col> -->
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
                <div style="width: 100%; display: flex; justify-content: space-between; align-content: center">
                    <div class="vaccinesTitleText">Administer Vaccines</div>
                    <div class="vaccinesTitleDate">
                        <span style="font-size: 13px">Next Appt. Date: </span><b>{{ nextAppointMentDate }}</b>
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
                    <div v-if="lastVaccinesGiven.length > 0" class="lastVaccineText">Last vaccines given</div>
                    <div class="seeFullList">
                        <ion-button @click="openVH()" style="color: #016302" class="btnText btnTextWeight" size="small" fill="clear">
                            <span>See full History</span>
                        </ion-button>
                    </div>
                </div>

                <row v-if="lastVaccinesGiven.length > 0">
                    <ion-icon size="medium" style="margin-bottom: -6px" :icon="iconsContent.calendar"></ion-icon>
                    <!-- <span> at <span style="color: #016302;">{{ item.age }}</span></span> -->
                    <span style="color: #316cba; margin-left: 1%">{{ getLastVaccinesGivenDisplayDate() }}</span>
                </row>

                <row v-if="lastVaccinesGiven.length > 0">
                    <customVaccine :vaccines="lastVaccinesGiven" :milestone_status="''" />
                </row>
            </div>
        </div>
    </div>
    <ion-popover style="--offset-x: -10px" :is-open="popoverOpen" :show-backdrop="false" :event="event" @didDismiss="popoverOpen = false">
        <div>
            <ion-accordion-group :multiple="true">
                <ion-accordion value="first" toggle-icon="" @click="openPIM()">
                    <ion-item slot="header" color="light">
                        <ion-label>Update demographics</ion-label>
                    </ion-item>
                </ion-accordion>
                <ion-accordion value="second" toggle-icon="" @click="printVisitSummary()">
                    <ion-item slot="header" color="light">
                        <ion-label>Print visit summary</ion-label>
                    </ion-item>
                </ion-accordion>
                <ion-accordion value="third" toggle-icon="" @click="printID()">
                    <ion-item slot="header" color="light">
                        <ion-label>Print client identifier</ion-label>
                    </ion-item>
                </ion-accordion>
                <ion-accordion value="fourth">
                    <ion-item slot="header" color="light">
                        <ion-label>Update outcome</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <ion-list>
                            <ion-item>
                                <ion-toggle :checked="selectedStatus == 7" value="active" @ionChange="updateState(7)"> Active </ion-toggle>
                            </ion-item>
                            <ion-item>
                                <ion-toggle :checked="selectedStatus == 6" value="inactive" @ionChange="updateState(6)"> Inactive </ion-toggle>
                            </ion-item>
                            <ion-item>
                                <ion-toggle :checked="selectedStatus == 3" value="died" @ionChange="updateState(3)"> Died </ion-toggle>
                            </ion-item>
                        </ion-list>
                    </div>
                </ion-accordion>
            </ion-accordion-group>
        </div>
    </ion-popover>
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
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
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
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import { PatientService } from "@/services/patient_service";
import customSlider from "@/apps/Immunization/components/customSlider.vue";
import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { ConceptService } from "@/services/concept_service";
import { ObservationService } from "@/services/observation_service";
import missedVaccinesModal from "@/apps/Immunization/components/Modals/missedVaccinesModal.vue";
import { DrugOrderService } from "@/services/drug_order_service";
import customVaccine from "@/apps/Immunization/components/customVaccine.vue";
import PatientProfileMixin from "@/views/Mixin/PatientProfile.vue";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

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
import Enrollment from "@/apps/NCD/views/Enrollment.vue";
import { PatientProgramService } from "@/services/patient_program_service";
export default defineComponent({
    mixins: [PatientProfileMixin],
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
        customVaccine,
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
            visits: [] as any,
            selectedStatus: 7 as any,
        };
    },
    computed: {
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        ...mapState(useOutcomeStore, ["dispositions"]),
        ...mapState(useAdministerVaccineStore, [
            "currentMilestone",
            "missedVaccineSchedules",
            "overDueVaccinesCount",
            "lastVaccinesGiven",
            "lastVaccineGievenDate",
            "nextAppointMentDate",
        ]),
    },
    async mounted() {
        this.loadCurrentMilestone();
        this.checkAge();
        await this.checkProtectedStatus();
        await this.openFollowModal();
        await this.programEnrollment();
    },
    watch: {
        currentMilestone: {
            handler() {
                this.loadCurrentMilestone();
            },
        },
        $route: {
            async handler(data) {
                if (data.name == "patientProfile") {
                    await this.checkProtectedStatus();
                    await this.programEnrollment();
                }
            },
        },
        patient: {
            async handler() {
                if (this.patient) {
                    await this.checkProtectedStatus();
                    await this.programEnrollment();
                    if (!this.patient.active) await this.openFollowModal();
                    this.checkAge();
                    this.setMilestoneReload();
                }
            },
        },
    },
    setup() {
        return { chevronBackOutline, checkmark, ellipsisVerticalSharp, person };
    },

    methods: {
        handleChange(status: any) {
            this.selectedStatus = status;
        },
        async programEnrollment() {
            this.program = new PatientProgramService(this.patient.patientID);
            const checkEnrollment = await this.program.getProgramCurrentStates();
            if (!checkEnrollment) {
                try {
                    await this.program.enrollProgram();
                    await this.program.setStateId(7);
                } catch (error) {
                    await this.program.setStateId(7);
                }
                await this.program.updateState();

                this.selectedStatus = 7;
            } else {
                this.selectedStatus = checkEnrollment.state;
            }
        },
        async updateState(state: any) {
            this.selectedStatus = state;
            await this.program.setStateId(state);
            await this.program.updateState();
        },
        getAge(dateOfBirth: string): string {
            return HisDate.calculateDisplayAge(HisDate.toStandardHisFormat(dateOfBirth));
        },
        async checkProtectedStatus() {
            this.protectedStatus = this.getData(this.patient.birthRegistration, 11759)[0];
        },
        getData(data: any, concept_id: any) {
            return data.filter((w: any) => w.concept_id == concept_id).map((w: any) => w.value_text);
        },
        checkAge() {
            if (!isEmpty(this.patient.personInformation.birthdate)) {
                this.checkUnderSixWeeks = HisDate.dateDiffInDays(HisDate.currentDate(), this.patient.personInformation.birthdate) < 42 ? true : false;
            }
        },
        openVitalsModal() {
            createModal(OtherVitals, { class: "otherVitalsModal" });
        },
        openWH() {
            createModal(weightAndHeight, { class: "otherVitalsModal" });
        },
        openVH() {
            createModal(vaccinationHistory, { class: "otherVitalsModal vaccineHistoryModal" });
        },
        async openFollowModal() {
            if (this.patient?.patientID) {
                this.lastVaccine = await DrugOrderService.getLastDrugsReceived(this.patient.patientID);
                const dataToPass = { protectedStatus: this.protectedStatus };
                if (this.lastVaccine.length > 0) createModal(followUpVisitModal, { class: "fullScreenModal" }, true, dataToPass);
            }
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
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        async saveVitals() {
            if (this.vitals.validationStatus) {
                const userID: any = Service.getUserID();
                const vitalsInstance = new VitalsService(this.patient.patientID, userID);
                vitalsInstance.onFinish(this.vitals);
            }
        },
        async saveTreatmentPlan() {
            const userID: any = Service.getUserID();
            const patientID = this.patient.patientID;
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
            const patientID = this.patient.patientID;

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
        formatBirthdate() {
            return HisDate.toStandardHisDisplayFormat(this.patient.personInformation.birthdate);
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
                createModal(missedVaccinesModal, { class: "otherVitalsModal vaccineHistoryModal" });
            }
        },
        setMilestoneReload() {
            const store = useAdministerVaccineStore();
            store.setVaccineReload(!store.getVaccineReload());
        },
        getLastVaccinesGivenDisplayDate() {
            return HisDate.toStandardHisDisplayFormat(this.lastVaccineGievenDate);
        },
    },
});
</script>

<style scoped>
ion-accordion {
    background: #fff;
}
ion-list {
    --ion-background-color: #fff;
}
.demographics {
    box-sizing: border-box;
    width: 98vw;
    /* height: 92px; */
    left: calc(50% - 461px / 2 + 27.5px);
    margin-top: 10px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    margin-left: 1vw;
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
    gap: 10px;
    margin-top: 20px;
    margin-left: 5px;
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
    display: flex;
    justify-content: center;
}
.dueAlert {
    justify-content: space-between;
    border: solid 1px #ccc;
    border-style: dashed;
    border-left: none;
    border-right: none;
    margin-top: 10px;
    padding: 5px;
    width: 100%;
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
    font-size: 18px;
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
    padding-top: 12px;
    padding-bottom: 12px;
    color: #b42318;

    width: content;
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
