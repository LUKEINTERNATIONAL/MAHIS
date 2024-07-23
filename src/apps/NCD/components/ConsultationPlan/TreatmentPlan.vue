<template>
    <ion-list>
        <Allergies />
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Allergies</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <div class="ionLbltp" v-for="(item, index) in FirstPreviousAllegies" :key="index">
                        <div v-if="index == 1">
                            <div>
                                <ion-label class="previousLabelDate">{{ item[0].date }}</ion-label>
                            </div>
                            <div v-for="(item1, index1) in item" :key="index1">
                                <div class="previousSecDrgs">
                                    <ion-list>
                                        <ion-label class="notes_p">{{ item1.value }} </ion-label>
                                    </ion-list>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ion-accordion-group @ionChange="accordionGroupChangeForAllergies">
                        <ion-accordion value="fith" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                            <ion-item slot="header" color="light">
                                <ion-label class="" color="primary">{{ showMoreAllergyMsg }}</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <div class="ionLbltp" v-for="(item, index) in RestOfPreviousAllegies" :key="index">
                                    <div>
                                        <ion-label class="previousLabelDate">{{ item[0] }}</ion-label>
                                    </div>
                                    <div v-for="(item1, index1) in removeOuterArray(item)" :key="index1">
                                        <!-- <div>
                                                <ion-label class="previousLabelDate">{{ item1.date }}</ion-label>
                                            </div> -->
                                        <div class="previousSecDrgs">
                                            <ion-list>
                                                <ion-label class="notes_p">{{ item1.value }} </ion-label>
                                            </ion-list>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ion-accordion>
                    </ion-accordion-group>
                </div>
            </ion-accordion>
        </ion-accordion-group>

        <ion-item lines="none">
            <ion-label>List of medications</ion-label>
        </ion-item>
        <div style="margin-left: 30px; margin-bottom: 14px">
            <dynamic-list
                :_selectedMedicalDrugsList="selectedMedicalDrugsList"
                @edit-item="editItemAtIndex"
                @remove-item="removeItemAtIndex"
                :key="componentKey"
            />

            <ion-row v-if="!addItemButton">
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input v-model="drugName" @ionInput="FindDrugName" fill="outline"></ion-input>
                        <!--  -->

                        <ion-label>
                            <ion-icon slot="start" :icon="iconsContent.search" class="selectedPatient" aria-hidden="true"></ion-icon>
                        </ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_drug_name" class="error-label">{{ drugnameErrMsg }}</ion-label>
                    </div>

                    <ion-popover
                        :is-open="popoverOpen"
                        :event="event"
                        @didDismiss="popoverOpen = false"
                        :keyboard-close="false"
                        :show-backdrop="false"
                        :dismiss-on-select="true"
                        style="top: 10px; left: -25px"
                        v-if="!show_error_msg_for_drug_name"
                    >
                        <ion-content color="light" class="ion-padding content-al">
                            <!-- <ion-row class="search_result" v-for="(item, index) in diagnosisData" :key="index" >
                                <ion-col @click="selectedDrugName(item.name, item)">{{ item.name }} </ion-col>
                            </ion-row> -->
                            <ion-list class="list-al">
                                <div class="item-al" v-for="(item, index) in diagnosisData" :key="index">
                                    <ion-col @click="selectedDrugName(item.name, item)">{{ item.name }} </ion-col>
                                </div>
                            </ion-list>
                        </ion-content>
                    </ion-popover>
                </ion-col>
            </ion-row>

            <ion-row v-if="!is_selected_insulin && !addItemButton">
                <!-- <ion-col style="margin-top: -27px;">
                    <ListPicker
                        :multiSelection="multi_Selection"
                        :uniqueId="uniqueId"
                        :name_of_list="name_of_list"
                        :choose_place_holder="list_place_holder"
                        :use_internal_filter="true"
                        :items_-list="route_list"
                        :show_label="show_list_label"
                        :disabled="false"
                        @item-list-up-dated="routeListUpdated"
                        @item-list-filtered="routeListFiltred"
                    />
                </ion-col> -->
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Dose" v-model="dose" fill="outline"></ion-input>
                        <ion-label><span class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_dose" class="error-label">{{ doseErrMsg }}</ion-label>
                    </div>
                </ion-col>
                <ion-col>
                    <sselectionList
                        :labels="drug_frequencies_n"
                        @selection-event="sselectionListUpdated"
                        style="background-color: #fff; margin: 1px;"
                    />
                    <ion-label><span class="selectedPatient"></span></ion-label>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Duration" v-model="duration" fill="outline"></ion-input>
                        <ion-label><span class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_duration" class="error-label">{{ durationErrMsg }}</ion-label>
                    </div>
                </ion-col>
                <!-- <ion-col>
                    <ion-item class="input_item" style="min-height: 50px !important; height: 5px;">
                        <ion-input  id="click-trigger2" placeholder="Prescription" v-model="prescription" ></ion-input>
                        <ion-popover
                            @didDismiss="prescPopoverOpen = false" 
                            show-backdrop="false" 
                            dismiss-on-select="false"
                            trigger="click-trigger2"
                            trigger-action="click"
                            >
                            <ion-content class="search_card" >
                                <ion-datetime ref="prescription" @ionChange="getDate($event)" presentation="date"></ion-datetime>
                            </ion-content>
                        </ion-popover>
                    </ion-item>
                </ion-col> -->
            </ion-row>

            <ion-row v-if="is_selected_insulin">
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Morning Dose" v-model="morning_dose" fill="outline"></ion-input>
                        <ion-label><span class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_morning_dose" class="error-label">{{ morning_dose_err_msg }}</ion-label>
                    </div>
                </ion-col>

                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Afternoon Dose" v-model="afternoon_dose" fill="outline"></ion-input>
                        <ion-label><span class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_afternoon_dose" class="error-label">{{ afternoon_doseerr_msg }}</ion-label>
                    </div>
                </ion-col>

                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Evening Dose" v-model="evening_dose" fill="outline"></ion-input>
                        <ion-label><span class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_evening_dose" class="error-label">{{ evening_doseerr_msg }}</ion-label>
                    </div>
                </ion-col>

                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Duration" v-model="duration_for_insulin" fill="outline"></ion-input>
                        <ion-label><span class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_err_for_duration_for_insulin" class="error-label">{{ duration_for_insulinerr_msg }}</ion-label>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row v-if="!addItemButton" style="margin-bottom: 20px">
                <dynamic-button
                    v-if="dynamic_button_properties[0].addItemButton"
                    :name="dynamic_button_properties[0].name"
                    :fill="dynamic_button_properties[0].btnFill"
                    :icon="addOutline"
                    @clicked:btn="dynamic_button_properties[0].fn"
                />

                <dynamic-button
                    v-if="dynamic_button_properties[1].addItemButton"
                    :name="dynamic_button_properties[1].name"
                    :fill="dynamic_button_properties[1].btnFill"
                    :icon="removeOutline"
                    @clicked:btn="dynamic_button_properties[1].fn"
                />
            </ion-row>

            <dynamic-button v-if="addItemButton" :name="btnName1" :fill="btnFill" :icon="addOutline" @clicked:btn="addData"></dynamic-button>

            <div style="margin-top: 14px">
                <ion-accordion-group ref="accordionGroup" class="previousView" @ionChange="accordionGroupChangeFn1">
                    <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                        <ion-item slot="header" color="light">
                            <ion-label class="previousLabel">Previous medications</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <div class="ionLbltp" v-for="(item, index) in PreviuosSelectedMedicalDrugsList" :key="index">
                                <div v-if="index == 0">
                                    <div>
                                        <ion-label class="previousLabelDate">{{ item.prescriptionDate }}</ion-label>
                                    </div>

                                    <div class="previousSecDrgs">
                                        <dynamic-list
                                            :_selectedMedicalDrugsList="item.previousPrescriptions"
                                            :show_actions_buttons="false"
                                            :key="componentKey"
                                        />
                                    </div>
                                </div>
                            </div>

                            <ion-accordion-group @ionChange="accordionGroupChange">
                                <ion-accordion value="second" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                                    <ion-item slot="header" color="light">
                                        <ion-label class="" color="primary">{{ showMoreMedicationsMsg }}</ion-label>
                                    </ion-item>
                                    <div class="ion-padding" slot="content">
                                        <div class="ionLbltp" v-for="(item, index) in PreviuosSelectedMedicalDrugsList" :key="index">
                                            <div v-if="itemWasExpanded && index > 0">
                                                <div>
                                                    <ion-label class="previousLabelDate">{{ item.prescriptionDate }}</ion-label>
                                                </div>

                                                <div class="previousSecDrgs">
                                                    <dynamic-list
                                                        :_selectedMedicalDrugsList="item.previousPrescriptions"
                                                        :show_actions_buttons="false"
                                                        :key="componentKey"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ion-accordion>
                            </ion-accordion-group>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </div>
        </div>

        <div style="margin-top: 14px; margin-left: 10px">
            <ion-label class="tpStndCls">Non-pharmalogical therapy and other notes</ion-label>

            <NonPharmacologicalIntervention/>
            
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px">
                <ion-label> <ion-icon slot="start" :icon="iconsContent.editPen" aria-hidden="true"></ion-icon> </ion-label>
                <IonTextarea
                    @ionInput="validateNotes"
                    v-model="nonPharmalogicalTherapyAndOtherNotes"
                    style="min-height: 120px"
                    class="inputTpln"
                    :auto-grow="true"
                    fill="outline"
                />
            </ion-item>
        </div>
        <div style="margin-top: 14px; margin-left: 10px">
            <ion-accordion-group ref="accordionGroup" class="previousView">
                <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Previous visits notes</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <div class="ionLbltp" v-for="(item, index) in FirstPreviousNotes" :key="index">
                            <div v-if="index == 1">
                                <div v-for="(item1, index1) in item" :key="index1">
                                    <div>
                                        <ion-label class="previousLabelDate">{{ item1.date }}</ion-label>
                                    </div>
                                    <div class="previousSecDrgs">
                                        <ion-list>
                                            <ion-label class="notes_p">{{ item1.notes }} </ion-label>
                                        </ion-list>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ion-accordion-group @ionChange="accordionGroupChangeForNotes">
                            <ion-accordion value="third" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                                <ion-item slot="header" color="light">
                                    <ion-label class="" color="primary">{{ showMoreNotesMsg }}</ion-label>
                                </ion-item>
                                <div class="ion-padding" slot="content">
                                    <div class="ionLbltp" v-for="(item, index) in RestOfPreviousNotes" :key="index">
                                        <div v-for="(item1, index1) in removeOuterArray(item)" :key="index1">
                                            <div>
                                                <ion-label class="previousLabelDate">{{ item1.date }}</ion-label>
                                            </div>
                                            <div class="previousSecDrgs">
                                                <ion-list>
                                                    <ion-label class="notes_p">{{ item1.notes }} </ion-label>
                                                </ion-list>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </div>
                </ion-accordion>
            </ion-accordion-group>
        </div>
    </ion-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import {
    checkmark,
    pulseOutline,
    addOutline,
    closeOutline,
    checkmarkOutline,
    filter,
    chevronDownOutline,
    chevronUpOutline,
    codeSlashOutline,
    removeOutline,
} from "ionicons/icons";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import { icons } from "@/utils/svg";
import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";
import { DrugService } from "@/services/drug_service";
import { ConceptName } from "@/interfaces/conceptName";
import DynamicButton from "@/components/DynamicButton.vue";
import DynamicList from "@/components/DynamicList.vue";
import { ConceptService } from "@/services/concept_service";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { Service } from "@/services/service";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useAllegyStore} from "@/apps/OPD/stores/AllergyStore"
import NonPharmacologicalIntervention from "@/apps/OPD/components/ConsultationPlan/NonPharmacologicalIntervention.vue"
import Allergies from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/Allergies.vue"
import sselectionList from "@/components/SselectionList.vue"

const iconsContent = icons;
const drug_frequencies = DRUG_FREQUENCIES;
const drug_frequencies_n = DRUG_FREQUENCIES.map(drug => drug.label);
const search_item = ref(false);
const display_item = ref(false);
const addItemButton = ref(true);
const popoverOpen = ref(false);
let event: null = null;
const componentKey = ref(0);
const drugnameErrMsg = ref("");
const show_error_msg_for_drug_name = ref(false);
const doseErrMsg = ref("");
const show_error_msg_for_dose = ref(false);
const durationErrMsg = ref();
const show_error_msg_for_duration = ref(false);
const diagnosisData = ref([] as any);
const drugName = ref("");
const dose = ref("");
const frequency = ref("");
const duration = ref("");
const prescription = ref("");
const units = ref("");
const drug_id = ref("");
const btnName1 = "Add new medication";
const btnFill = "clear";
const showMoreMedicationsMsg = ref("Show more medications");
const store = useTreatmentPlanStore();
const store2 = useAllegyStore();
const selectedAllergiesList2 = computed(() => store2.selectedMedicalAllergiesList);
const selectedMedicalDrugsList = computed(() => store.selectedMedicalDrugsList);
const nonPharmalogicalTherapyAndOtherNotes = computed(() => store.nonPharmalogicalTherapyAndOtherNotes);
const selectedMedicalAllergiesList = computed(() => store.selectedMedicalAllergiesList);
const input = ref();
const values = ["first", "second", "third"];
const PreviuosSelectedMedicalDrugsList = ref();
const FirstPreviousNotes = ref();
const RestOfPreviousNotes = ref();
const itemWasExpanded = ref(false);
const itemNotesWasExpanded = ref(false);
const itemAllegiesWasExpanded = ref(false);
const showMoreNotesMsg = ref("Show more notes");
const showMoreAllergyMsg = ref("Show more allergies");
const FirstPreviousAllegies = ref();
const RestOfPreviousAllegies = ref();
const currentDrugOb = ref()

const morning_dose = ref()
const morning_dose_err_msg = ref()
const show_error_msg_for_morning_dose = ref(false)


const afternoon_dose = ref()
const afternoon_doseerr_msg = ref()
const show_error_msg_for_afternoon_dose = ref(false)

const evening_dose = ref()
const evening_doseerr_msg = ref()
const show_error_msg_for_evening_dose = ref(false)

const is_selected_insulin = ref(false)

const duration_for_insulin = ref()
const duration_for_insulinerr_msg = ref()
const show_err_for_duration_for_insulin = ref()

const multi_Selection = false as any
const uniqueId = "125389317452" as any
const name_of_list = ref("List" as any)
const list_place_holder = ref("Please select method of prescribing medication" as any)
const route_list = ref([
    { name: "Oral" },
    { name: "Intravenous (IV)" },
    { name: "Intramuscular (IM)" },
    { name: "Intradermal" },
    { name: "Rectally" },
    { name: "Sublingual" },
    { name: "Vaginally" },
    { name: "Buccal" },
    { name: "Subcutaneous" },
    { name: "Intraosseous" },
    { name: "Other"}
] as any)
const show_list_label = false as any

function routeListUpdated(data: any) {

}

function routeListFiltred(data: any) {

}

onMounted(async () => {
    const previousTreatment = new PreviousTreatment();
    const { previousDrugPrescriptions, previousClinicalNotes, previousDrugAllergies } = await previousTreatment.getPatientEncounters();
    PreviuosSelectedMedicalDrugsList.value = previousDrugPrescriptions;
    FirstPreviousNotes.value = Object.entries(previousClinicalNotes)[0];
    const [, ...restEntries] = Object.entries(previousClinicalNotes);
    RestOfPreviousNotes.value = restEntries;
    FirstPreviousAllegies.value = Object.entries(previousDrugAllergies)[0];
    const [, ...restEntriesAllegies] = Object.entries(previousDrugAllergies);
    RestOfPreviousAllegies.value = restEntriesAllegies;
});

watch(
    () => drugName.value,
    async (newValue) => {
        validatedDrugName();
    }
)

watch(
    () => morning_dose.value,
    async (newValue) => {
        validateMorningDose();
    }
)

watch(
    () => afternoon_dose.value,
    async (newValue) => {
        validateAfternoonDose();
    }
)

watch(
    () => evening_dose.value,
    async (newValue) => {
        validateEveningDose();
    }
)

watch(
    () => dose.value,
    async (newValue) => {
        validateDose();
    }
)

watch(
    () => duration.value,
    async (newValue) => {
        validateDuration();
    }
)

function addData() {
    addItemButton.value = !addItemButton.value;
    search_item.value = true;
}

async function validatedDrugName() {
    const drugNameExists = await findIfDrugNameExists();
    if (!drugNameExists) {
        drugnameErrMsg.value = "please select a valid drug name";
        show_error_msg_for_drug_name.value = true;
    } else {
        show_error_msg_for_drug_name.value = false;
    }
    return show_error_msg_for_drug_name.value;
}

async function validateDose() {
    const isNum = isNumeric(dose.value);
    if (!isNum) {
        doseErrMsg.value = "please enter a number";
        show_error_msg_for_dose.value = true;
    } else {
        show_error_msg_for_dose.value = false;
    }
    return show_error_msg_for_dose.value;
}
async function validateDuration() {
    const isNum = isNumeric(duration.value);
    if (!isNum) {
        durationErrMsg.value = "please enter a number";
        show_error_msg_for_duration.value = true;
    } else {
        show_error_msg_for_duration.value = false;
    }
    return show_error_msg_for_duration.value;
}

async function areFieldsValid() {
    const isDrugnameValid = await validatedDrugName()
    const isDoseValid = await validateDose()
    const isDurationValid = await validateDuration()
    
    if (!isDrugnameValid && !isDoseValid && !isDurationValid) {
        return true;
    } else {
        return false;
    }
}

async function areInsulinFieldsValid() {
    const isDrugnameValid = await validatedDrugName()
    const is_morning_dose_valid = await validateMorningDose()
    const is_afternoon_dose_valid = await validateAfternoonDose()
    const is_evening_dose_valid = await validateEveningDose()
    const is_duration_for_insulin_valid = await validateDurationForInsulin()

    if (!isDrugnameValid && !is_morning_dose_valid && !is_afternoon_dose_valid && !is_evening_dose_valid && !is_duration_for_insulin_valid) {
        return true;
    } else {
        return false;
    }
}

async function validateMorningDose() {
    const isNum = isNumeric(morning_dose.value)
    if (!isNum) {
        morning_dose_err_msg.value = "please enter a number"
        show_error_msg_for_morning_dose.value = true
    } else {
        show_error_msg_for_morning_dose.value = false
    }
    return show_error_msg_for_morning_dose.value
}

async function validateAfternoonDose() {
    const isNum = isNumeric(afternoon_dose.value)
    if (!isNum) {
        afternoon_doseerr_msg.value = "please enter a number"
        show_error_msg_for_afternoon_dose.value = true
    } else {
        show_error_msg_for_afternoon_dose.value = false
    }
    return show_error_msg_for_afternoon_dose.value
}

async function validateEveningDose() {
    const isNum = isNumeric(evening_dose.value)
    if (!isNum) {
        evening_doseerr_msg.value = "please enter a number"
        show_error_msg_for_evening_dose.value = true
    } else {
        show_error_msg_for_evening_dose.value = false
    }
    return show_error_msg_for_evening_dose.value  
}

async function validateDurationForInsulin() {
    const isNum = isNumeric(duration_for_insulin.value)
    if (!isNum) {
        duration_for_insulinerr_msg.value = "please enter a number"
        show_err_for_duration_for_insulin.value = true
    } else {
        show_err_for_duration_for_insulin.value = false
    }
    return show_err_for_duration_for_insulin.value
}

// function selectAl(item: any) {
//     item.selected = !item.selected;
//     const treatmentPlanStore = useTreatmentPlanStore();
//     treatmentPlanStore.setSelectedMedicalAllergiesList(item);
//     saveStateValuesState();
// }

function selectFrequency(index: any) {
    drug_frequencies.forEach((item) => {
        item.selected = false;
    });
    drug_frequencies[index].selected = !drug_frequencies[index].selected;
    frequency.value = drug_frequencies[index].label;
}

async function generalPrescription() {
    const are_fieldsValid = await areFieldsValid()
    if (!are_fieldsValid) {
        toastWarning("Please enter correct data values", 4000)
        return;
    }
    dissmissDrugAddField()
    const systemSessionDate = Service.getSessionDate();
    const daysToAdd = duration.value;
    const generatedPrescriptionDate = addDaysToDate(systemSessionDate, parseInt(duration.value))
    let highlightbackground = false

    if (isPresentInAllergyList(currentDrugOb.value) == true) {
        highlightbackground = true
    }

    const drugString = {
        drugName: drugName.value,
        dose: dose.value,
        frequency: frequency.value,
        duration: duration.value,
        prescription: generatedPrescriptionDate,
        drug_id: drug_id.value,
        units: units.value,
        highlightbackground: highlightbackground
    };
    selectedMedicalDrugsList.value.push(drugString);
    drugName.value = "";
    dose.value = "";
    frequency.value = "";
    duration.value = "";
    prescription.value = "";
    componentKey.value++;
    saveStateValuesState();
}

async function insulinPrescription() {
    const are_fieldsValid = await areInsulinFieldsValid()
    if (!are_fieldsValid) {
        toastWarning("Please enter correct data values", 4000)
        return;
    }
    dissmissDrugAddField()
    const systemSessionDate = Service.getSessionDate();
    const daysToAdd = duration.value;
    const generatedPrescriptionDate = addDaysToDate(systemSessionDate, parseInt(duration.value))
    let highlightbackground = false

    if (isPresentInAllergyList(currentDrugOb.value) == true) {
        highlightbackground = true
    }

    const drugString = {
        drugName: drugName.value,
        // dose: morning_dose.value,
        // frequency: frequency.value,
        duration: duration_for_insulin.value,
        prescription: generatedPrescriptionDate,
        drug_id: drug_id.value,
        units: units.value,
        highlightbackground: highlightbackground
    };
    selectedMedicalDrugsList.value.push(drugString);
    drugName.value = "";
    // dose.value = "";
    // frequency.value = "";
    // duration.value = "";
    morning_dose.value = "";
    afternoon_dose.value = "";
    evening_dose.value = "";
    duration_for_insulin.value = "";
    prescription.value = "";
    componentKey.value++;
    saveStateValuesState();
}

async function saveData() {
    if (is_selected_insulin.value == false) {
        generalPrescription()
    }
    if (is_selected_insulin.value == true) {
        insulinPrescription()
    }
}

async function FindDrugName(text: any) {
    const searchText = text.target.value;
    openPopover(text);
    const page = 1,
        limit = 10;
    const drugs: ConceptName[] = await DrugService.getOPDDrugs({
        name: searchText,
        page: page,
        page_size: limit,
    })

    drugs.map((drug: any) => ({
        label: drug.name,
        value: drug.name,
        other: drug,
    }));

    diagnosisData.value = drugs;
}

async function FindDrugName2(text: any) {
    let search_value;
    if (text.target === undefined) {
        search_value = text;
    } else search_value = text.target.value;

    const page = 1,
        limit = 10;
    const drugs: ConceptName[] = await DrugService.getOPDDrugs({
        name: search_value,
        page: page,
        page_size: limit,
    })

    drugs.map((drug: any) => ({
        label: drug.name,
        value: drug.name,
        other: drug,
    }));

    diagnosisData.value = drugs;
    return drugs;
}

function isPresentInAllergyList(obj: any) {
    const filter_id_array: any[] = []
    selectedAllergiesList2.value.forEach((selectedMedicalAllergy: any) => {
        if (selectedMedicalAllergy.selected) {
            filter_id_array.push(selectedMedicalAllergy.concept_id);
        }
    })
    const filteredDrugs = hasMatchingIDs([obj] as any, filter_id_array as any)
    if (filteredDrugs == true) {
        toastWarning("Client is allergic to the selected medication", 4000)
        return true;
    } else {
        return false
    }
}

function isInsulinPresent(obj: any) {
    const insulin_concept_ids = [
        279,
        282,
    ]
    const filteredDrugs = hasMatchingIDs([obj] as any, insulin_concept_ids as any)
    if (filteredDrugs == true) {
        return true
    } else {
        return false
    }
}

const dynamic_button_properties = [
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "save",
        btnFill: 'clear',
        fn: saveData,
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "cancel",
        btnFill: 'clear',
        fn: addData,
    }
]

function sselectionListUpdated(data: any) {
    selectFrequency(getLabelIndex(data.label))
}

function getLabelIndex(label: string) {
  return DRUG_FREQUENCIES.findIndex(drug => drug.label === label);
}

async function findIfDrugNameExists() {
    const filteredDrugs = await FindDrugName2(drugName.value);
    if (filteredDrugs.length > 0) {
        if (drugName.value.length == 0) {
            return false;
        }
        return true;
    } else return false;
}

function filterArrayByIDs(mainArray: [], idsToFilter: []) {
    return mainArray.filter((item: any) => 
        !idsToFilter.includes(item.concept_id as never)
    );
}

function hasMatchingIDs(mainArray: any[], idsToFilter: any[]): boolean {
    // Check if any item in mainArray has concept_id included in idsToFilter
    return mainArray.some((item: any) => 
        idsToFilter.includes(item.concept_id as never)
    );
}

function openPopover(e: any) {
    event = e;
    popoverOpen.value = true;
}


function selectedDrugName(name: any, obj: any) {
    drugName.value = name;
    drug_id.value = obj.drug_id;
    units.value = obj.units;
    currentDrugOb.value = obj
    isPresentInAllergyList(obj)
    const is_insulin_present = isInsulinPresent(obj)

    if (is_insulin_present == true) {
        is_selected_insulin.value = true
    } else if (is_insulin_present == false) {
        is_selected_insulin.value = false
    }
}


function editItemAtIndex(index: any) {
    const dataItem = selectedMedicalDrugsList.value[index];
    selectedMedicalDrugsList.value.splice(index, 1);
    drugName.value = dataItem.drugName;
    dose.value = dataItem.dose;
    frequency.value = dataItem.frequency;
    duration.value = dataItem.duration;
    prescription.value = dataItem.prescription;
    addItemButton.value = !addItemButton;
    componentKey.value++;
    saveStateValuesState();
}

function getDate(ev: any) {
    const inputDate = new Date(ev.detail.value);
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    prescription.value = formattedDate;
}

function removeItemAtIndex(index: any) {
    selectedMedicalDrugsList.value.splice(index, 1);
    componentKey.value++;
    saveStateValuesState();
}

function validateNotes(ev: any) {
    let value = ev.target.value
    refSetNonPharmalogicalTherapyAndOtherNotes(value)
}

function saveStateValuesState() {
    const treatmentPlanStore = useTreatmentPlanStore();
    treatmentPlanStore.setSelectedMedicalDrugsList(selectedMedicalDrugsList);
}

function refSetNonPharmalogicalTherapyAndOtherNotes(value: string) {
    const treatmentPlanStore = useTreatmentPlanStore();
    treatmentPlanStore.setNonPharmalogicalTherapyAndOtherNotes(value as string);
}

function isNumeric(text: string): boolean {
    return /^[0-9]+$/.test(text);
}

function addDaysToDate(dateString: string, daysToAdd: number): string {
    const currentDate = new Date(dateString);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function dissmissDrugAddField(): void {
    search_item.value = false;
    display_item.value = true;
    addItemButton.value = true;
    is_selected_insulin.value = false;
}


function accordionGroupChangeFn1(ev: AccordionGroupCustomEvent) {}

function accordionGroupChange(ev: AccordionGroupCustomEvent) {
    const collapsedItems = values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;
    // console.log(
    //     `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    // )
    if (selectedValue !== undefined) {
        if (selectedValue == "second") {
            showMoreMedicationsMsg.value = "Show less medications";
            itemWasExpanded.value = !itemWasExpanded.value;
        }
    } else {
        // its a hack
        showMoreMedicationsMsg.value = "Show more medications";
        itemWasExpanded.value = !itemWasExpanded.value;
    }
}

function accordionGroupChangeForNotes(ev: AccordionGroupCustomEvent) {
    const collapsedItems = values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;
    if (selectedValue !== undefined) {
        if (selectedValue == "third") {
            showMoreNotesMsg.value = "Show less notes";
            itemNotesWasExpanded.value = !itemWasExpanded.value;
        }
    } else {
        showMoreNotesMsg.value = "Show more notes";
        itemNotesWasExpanded.value = !itemWasExpanded.value;
    }
}

function accordionGroupChangeForAllergies(ev: AccordionGroupCustomEvent) {
    const collapsedItems = values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;
    if (selectedValue !== undefined) {
        if (selectedValue == "fith") {
            showMoreAllergyMsg.value = "Show less allegies";
            itemAllegiesWasExpanded.value = !itemWasExpanded.value;
        }
    } else {
        showMoreAllergyMsg.value = "Show more allegies";
        itemAllegiesWasExpanded.value = !itemWasExpanded.value;
    }
}

function removeOuterArray(arr: any) {
    return arr[1];
}
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
ion-item.medicalAl {
    --background: #fff;
    --border-radius: 5px;
}
ion-button.medicalAlBtn {
    --background: #fecdca;
    --color: #b42318;
    text-transform: none;
}
.error-label {
    background: #fecdca;
    color: #b42318;
    text-transform: none;
    padding: 8px;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
ion-button.addMedicalTpBtn {
    --background: #ddeedd;
    --color: #006401;
    text-transform: none;
    font-weight: 600;
    font-size: 16px;
}
ion-button.medicalAlAddBtn {
    font-size: large;
}
ion-icon.icon-al {
    /* margin-left: 40%; */
    font-size: x-large;
    margin-bottom: -5px;
}
.item-al {
    cursor: pointer;
    padding: 5px;
    background-color: #ebebeb;
    margin-top: 8px;
}
.item-al:hover {
    background-color: #55515148;
    padding: 5px;
    border-radius: 3px;
}
ion-popover.popover-al {
    --background: #fff;
}
ion-content.content-al {
    --background: #fff;
}
ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}

.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
}
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}
.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
}
.action_buttons:hover {
    cursor: pointer;
}
.spcls {
    display: flex;
    align-items: center;
}
.previousView {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
}
.previousLabel {
    font-weight: 600;
    color: #000;
}
.previousLabelDate {
    font-weight: 600;
    color: #000;
    margin: 2%;
}
.previousSecDrgs {
    margin: 2%;
}
.notes_p {
    margin: 4%;
}
</style>
