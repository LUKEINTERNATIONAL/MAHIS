<template>
    <ion-header style="display: flex; justify-content: space-between">
        <ion-title class="modalTitle">Follow up visits</ion-title>
        <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="">
            <ion-accordion-group ref="accordionGroup" class="">
                <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Change Guardian</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content" style="padding-bottom: 200px">
                        <div class="">
                            <basic-form :contentData="changeGuardianInfo" @update:inputValue="handleInputData"></basic-form>
                        </div>
                    </div>
                </ion-accordion>
                <ion-accordion value="second" toggle-icon-slot="start" class="custom_card">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Vaccine adverse effects</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <div>
                            <div slot="content">
                                <basic-form :contentData="vaccineAdverseEffects" @update:inputValue="handleInputData"></basic-form>
                            </div>
                        </div>
                        <div>
                            <div slot="content">
                                <basic-form
                                    :contentData="serious"
                                    :initialData="initialSeriousData"
                                    @update:inputValue="handleInputData"
                                ></basic-form>
                            </div>
                        </div>
                        <div>
                            <div slot="content">
                                <basic-form
                                    :contentData="outcome"
                                    :initialData="initialOutcomeData"
                                    @update:inputValue="handleInputData"
                                ></basic-form>
                            </div>
                        </div>
                        <div>
                            <div slot="content">
                                <basic-form
                                    :contentData="firstDecision"
                                    :initialData="initialFirstDecisionData"
                                    @update:inputValue="handleInputData"
                                ></basic-form>
                            </div>
                        </div>
                    </div>
                </ion-accordion>
                <ion-accordion value="third" toggle-icon-slot="start" class="custom_card" v-if="protectedStatus != 'Yes'">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Child protected at birth</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content" style="padding-bottom: 120px">
                        <basic-form :contentData="protectedAtBirth" @update:inputValue="handleInputData"></basic-form>
                    </div>
                </ion-accordion>
            </ion-accordion-group>
        </div>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <DynamicButton @click="saveData()" name="Save" fill="solid" style="float: right; margin: 2%; width: 130px" />
            </ion-col>
        </ion-row>
    </ion-footer>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonFooter,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonInput,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useFollowUpStoreStore } from "@/apps/Immunization/stores/FollowUpStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import { ObservationService } from "@/services/observation_service";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
    modifyCheckboxData,
} from "@/services/data_helpers";
import { RelationsService } from "@/services/relations_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { ConceptService } from "@/services/concept_service";
import { formatRadioButtonData, formatCheckBoxData, formatInputFiledData } from "@/services/formatServerData";
import { AppEncounterService } from "@/services/app_encounter_service";
import { PersonService } from "@/services/person_service";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { validateInputFiledData, validateRadioButtonData, validateCheckBoxData } from "@/services/group_validation";
import { RelationshipService } from "@/services/relationship_service";
import Relationship from "@/views/Mixin/SetRelationship.vue";
import { DrugOrderService } from "@/services/drug_order_service";

export default defineComponent({
    mixins: [Relationship],
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        BasicInputField,
        BasicForm,
        PreviousVitals,
        customDatePicker,
        DynamicButton,
        IonFooter,
    },
    data() {
        return {
            iconsContent: icons,
            BMI: {} as any,
            BPStatus: {} as any,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            validationStatus: { heightWeight: false, bloodPressure: false } as any,
            showPD: false as boolean,
            initialSeriousData: [] as any,
            initialFirstDecisionData: [] as any,
            initialOutcomeData: [] as any,
        };
    },
    props: {
        protectedStatus: String,
    },
    watch: {
        personInformation: {
            async handler() {
                await this.setRelationShip();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useFollowUpStoreStore, [
            "changeGuardianInfo",
            "vaccineAdverseEffects",
            "protectedAtBirth",
            "serious",
            "outcome",
            "firstDecision",
        ]),

        guardianFirstname() {
            return getFieldValue(this.changeGuardianInfo, "guardianFirstname", "value");
        },
        guardianLastname() {
            return getFieldValue(this.changeGuardianInfo, "guardianLastname", "value");
        },
        guardianMiddleName() {
            return getFieldValue(this.changeGuardianInfo, "guardianMiddleName", "value");
        },
        guardianPhoneNumber() {
            return getFieldValue(this.changeGuardianInfo, "guardianPhoneNumber", "value");
        },
        relationship() {
            return getFieldValue(this.changeGuardianInfo, "relationship", "value");
        },
    },
    async mounted() {
        const followUp = useFollowUpStoreStore();
        this.initialSeriousData = followUp.getInitialSerious();
        this.initialFirstDecisionData = followUp.getInitialFirstDecision();
        this.initialOutcomeData = followUp.getInitialOutcome();
        const guardianData = await RelationshipService.getRelationships(this.demographics.patient_id);

        modifyFieldValue(this.changeGuardianInfo, "guardianNationalID", "value", this.setAttribute("Regiment ID", guardianData[0]?.relation));
        modifyFieldValue(this.changeGuardianInfo, "guardianFirstname", "value", guardianData[0]?.relation.names[0]?.given_name);
        modifyFieldValue(this.changeGuardianInfo, "guardianLastname", "value", guardianData[0]?.relation.names[0]?.family_name);
        modifyFieldValue(this.changeGuardianInfo, "guardianMiddleName", "value", guardianData[0]?.relation.names[0]?.middle_name);
        modifyFieldValue(this.changeGuardianInfo, "guardianPhoneNumber", "value", this.setAttribute("Cell Phone Number", guardianData[0]?.relation));
        modifyFieldValue(this.changeGuardianInfo, "relationship", "value", {
            id: guardianData[0]?.type.relationship_type_id,
            name: guardianData[0]?.type.b_is_to_a,
        });
        await this.setRelationShip();
        this.resetData();
        await this.getVaccineAdverseEffects();
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async setRelationShip() {
            if (this.gender) {
                await this.getRelationships();
                modifyFieldValue(this.changeGuardianInfo, "relationship", "displayNone", false);
                modifyFieldValue(this.changeGuardianInfo, "relationship", "multiSelectData", this.relationships);
            } else {
                modifyFieldValue(this.changeGuardianInfo, "relationship", "displayNone", true);
            }
        },
        setAttribute(name: string | undefined, data: any) {
            if (!data || Object.keys(data).length === 0) return;
            let str = data.person_attributes.find((x: any) => x.type.name == name);
            if (str == undefined) return;
            else return str.value;
        },
        resetData() {
            const rest = useFollowUpStoreStore();
            rest.setProtectedAtBirth(rest.getInitialProtectedAtBirth());
            rest.setVaccineAdverseEffects(rest.getInitialVaccineAdverseEffects());
        },
        async createGuardian() {
            const data = await this.guardianData();
            if (validateInputFiledData(this.changeGuardianInfo)) {
                const guardian: any = new PatientRegistrationService();
                await guardian.registerGuardian(data);
                const guardianID = guardian.getPersonID();
                const selectedID = getFieldValue(this.changeGuardianInfo, "relationship", "value").id;
                if (selectedID) await RelationsService.createRelation(this.demographics.patient_id, guardianID, selectedID);
                toastSuccess("Guarding information save successfully", 3000);
                return true;
            } else {
                toastWarning("Guarding Information not save", 3000);
                return false;
            }
        },

        async getVaccineAdverseEffects() {
            const vaccineEffect = await ConceptService.getConceptSet("Vaccine adverse effects");
            const Seriousness = await ConceptService.getConceptSet("Seriousness of adverse effects");
            const outcome = await ConceptService.getConceptSet("Adverse effects outcome");
            modifyCheckboxData(
                this.vaccineAdverseEffects,
                "checkboxBtnContent",
                "Vaccine adverse effects",
                this.buildCheckboxData(vaccineEffect, 12)
            );
            modifyCheckboxData(this.serious, "checkboxBtnContent", "Seriousness of adverse effects", this.buildCheckboxData(Seriousness, ""));
            modifyCheckboxData(this.outcome, "radioBtnContent", "Adverse effects outcome", this.buildCheckboxData(outcome, ""));
        },
        buildCheckboxData(data: any, colSize: any) {
            return data.map((item: any) => {
                return {
                    name: item.name == "Patient died" ? "Died" : item.name == "Cured - TB" ? "Recovered" : item.name,
                    value: item.name,
                    colSize: colSize,
                    checked: false,
                };
            });
        },
        async saveData() {
            const guardianCreated = await this.createGuardian();
            const vaccineAdverseEffectsSaved = await this.saveVaccineAdverseEffects();
            if (guardianCreated && vaccineAdverseEffectsSaved) {
                modalController.dismiss();
            }
        },
        async saveVaccineAdverseEffects() {
            if (this.demographics.patient_id) {
                const lastVaccine = await DrugOrderService.getLastDrugsReceived(this.demographics.patient_id);
                const date = getFieldValue(this.outcome, "Date of death", "value") || HisDate.currentDate();
                const serious = await formatCheckBoxData(this.serious, HisDate.currentDate(), lastVaccine);
                const outcome = await formatRadioButtonData(this.outcome, date, lastVaccine);
                const vaccineAdverseEffects = await formatCheckBoxData(this.vaccineAdverseEffects, HisDate.currentDate(), lastVaccine);
                const investigationDate = getFieldValue(this.firstDecision, "Investigation needed", "value");
                let investigationNeeded: any = [];
                if (investigationDate) {
                    investigationNeeded = [
                        {
                            concept_id: 11887,
                            value_text: investigationDate,
                            obs_datetime: HisDate.currentDate(),
                        },
                    ];
                }
                const result = [...serious, ...outcome, ...vaccineAdverseEffects, ...investigationNeeded].filter((item) => item !== undefined);

                const userID: any = Service.getUserID();
                if (vaccineAdverseEffects.length > 0) {
                    const registration = new AppEncounterService(this.demographics.patient_id, 203, userID);
                    await registration.createEncounter();
                    await registration.saveObservationList(result);
                    toastSuccess("Vaccine adverse effects saved success", 1500);
                    return true;
                } else {
                    toastWarning("Vaccine adverse effects not saved", 1500);
                    return false;
                }
            }
        },

        async guardianData() {
            return {
                person_id: this.demographics.patient_id,
                given_name: this.guardianFirstname,
                family_name: this.guardianLastname,
                middle_name: this.guardianMiddleName,
                gender: "",
                birthdate: "",
                cell_phone_number: this.guardianPhoneNumber,
                birthdate_estimated: false,
                home_district: "",
                home_traditional_authority: "",
                home_village: "",
                current_district: "",
                current_traditional_authority: "",
                current_village: "",
                landmark: "",
                occupation: "",
                facility_name: "",
                patient_type: "",
                national_id: getFieldValue(this.changeGuardianInfo, "guardianNationalID", "value"),
            };
        },
        handleInputData(event: any) {
            // if (event.name == "SeriousCheck") {
            //     if(displayNext)
            // }
            console.log("🚀 ~ handleInputData ~ event:", event);
        },

        dismiss() {
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
.vitals_title {
    margin-bottom: 50px;
}
.input-with-icon {
    position: relative;
}
.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray; /* Adjust the color as needed */
}
ion-col {
    padding-bottom: 15px;
}
h5 {
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 10px;
}
.vitalsContent {
    height: 500px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
    align-items: center;
}
.btnContent {
    display: flex;
    justify-content: center;
    line-height: 60px;
}
.custom_card {
    margin-bottom: 20px;
}
</style>
