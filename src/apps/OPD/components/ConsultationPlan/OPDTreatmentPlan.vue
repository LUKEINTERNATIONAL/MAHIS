<template>
    <ion-list>
        <ion-label>Allergies (Medication, Healthcare items, Environment and Food)</ion-label>
        <ion-row>
            <ion-item lines="none" class="medicalAl">
                <ion-row>
                    <div v-for="(item, index) in selectedAllergiesList2" :key="index">
                        <ion-button v-if="item.selected" class="medicalAlBtn">
                            {{ item.name }}
                        </ion-button>
                    </div>
                </ion-row>
            </ion-item>
        </ion-row>

        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Documented allergies timeline</ion-label>
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
                    <VueMultiselect
                        style="margin-top: 27px;"
                        v-model="selected_drug"
                        @update:model-value="selectedDrugName($event)"
                        :multiple="false"
                        :taggable="false"
                        :hide-selected="false"
                        :close-on-select="true"
                        openDirection="bottom"
                        tag-placeholder="Select medication"
                        placeholder="Select medication"
                        selectLabel=""
                        label="name"
                        :searchable="true"
                        @search-change="FindDrugName($event)"
                        track-by="drug_id"
                        :options="OPDDrugList"
                    />
                    <div>
                        <ion-label style="padding: 3%;;" v-if="show_error_msg_for_drug" class="error-label">{{ drugErrMsg }}</ion-label>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row v-if="!addItemButton">
                <ion-col class="qaws">
                    <VueMultiselect
                        style="margin-top: 27px;"
                        v-model="selected_pres_method"
                        @update:model-value="routeListUpdated($event)"
                        :multiple="false"
                        :taggable="false"
                        :hide-selected="false"
                        :close-on-select="true"
                        tag-placeholder="Select route"
                        placeholder="Select route"
                        selectLabel=""
                        label="name"
                        :searchable="true"
                        @search-change="$emit('search-change', $event)"
                        track-by="concept_id"
                        :options="route_list"
                    />
                    <div>
                        <ion-label v-if="show_error_msg_for_pres_method" class="error-label">{{ pres_methodErrMsg }}</ion-label>
                    </div>
                </ion-col>


                <ion-col class="qaws">
                    <VueMultiselect
                        style="margin-top: 27px;"
                        v-model="selected_frequency"
                        @update:model-value="frequencyDropDownUpdated($event)"
                        :multiple="false"
                        :taggable="false"
                        :hide-selected="false"
                        :close-on-select="true"
                        tag-placeholder="Frequency"
                        placeholder="Frequency"
                        selectLabel=""
                        label="label"
                        :searchable="true"
                        @search-change="$emit('search-change', $event)"
                        track-by="code"
                        :options="drug_frequencies"
                    />
                    <div>
                        <ion-label v-if="show_error_msg_for_frequency" class="error-label">{{ frequencyErrMsg }}</ion-label>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row v-if="!addItemButton">
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
                    <ion-item class="input_item">
                        <ion-input placeholder="Duration in days" v-model="duration" fill="outline"></ion-input>
                        <ion-label><span class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <div>
                        <ion-label v-if="show_error_msg_for_duration" class="error-label">{{ durationErrMsg }}</ion-label>
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
            <!-- <ion-row>
                <dynamic-button class="addMedicalTpBtn" :name="btnName2"></dynamic-button>
                <dynamic-button class="addMedicalTpBtn" :name="btnName3" style="margin-left: 4%"></dynamic-button>
            </ion-row> -->

            <div style="margin-top: 14px">
                <ion-accordion-group ref="accordionGroup" class="previousView" @ionChange="accordionGroupChangeFn1">
                    <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                        <ion-item slot="header" color="light">
                            <ion-label class="previousLabel">Documented medications timeline</ion-label>
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
                <ion-textarea
                    @ionInput="validateNotes"
                    v-model="nonPharmalogicalTherapyAndOtherNotes"
                    style="min-height: 120px"
                    class="inputTpln"
                    :auto-grow="true"
                    fill="outline"
                ></ion-textarea>
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
import { DRUG_FREQUENCIES, getDrugRouteList } from "@/services/drug_prescription_service";
import { DrugService } from "@/services/drug_service";
import { ConceptName } from "@/interfaces/conceptName";
import DynamicButton from "@/components/DynamicButton.vue";
import DynamicList from "@/components/DynamicList.vue";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { Service } from "@/services/service";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore"
import { useAllegyStore} from "@/apps/OPD/stores/AllergyStore"
import VueMultiselect from "vue-multiselect"
import NonPharmacologicalIntervention from "@/apps/OPD/components/ConsultationPlan/NonPharmacologicalIntervention.vue"
import { isEmpty } from "lodash"

const iconsContent = icons;
const drug_frequencies = DRUG_FREQUENCIES;
const search_item = ref(false);
const display_item = ref(false);
const addItemButton = ref(true);

const componentKey = ref(0);
const drugnameErrMsg = ref("");
const show_error_msg_for_drug_name = ref(false);
const doseErrMsg = ref("");
const show_error_msg_for_dose = ref(false);
const durationErrMsg = ref();
const show_error_msg_for_duration = ref(false);
const drugName = ref("");
const dose = ref("");
const duration = ref("");
const prescription = ref("");
const units = ref("");
const drug_id = ref("");
const showPopoverOpenForFrequency = ref(false);
const btnName1 = "Add new medication";
const btnName2 = "Send to pharmacy";
const btnName3 = "Send to dispensation";
const btnFill = "clear";
const showMoreMedicationsMsg = ref("Show more medications");
const store = useTreatmentPlanStore();
const store2 = useAllegyStore();
const selectedAllergiesList2 = computed(() => store2.selectedMedicalAllergiesList)
const selectedMedicalDrugsList = computed(() => store.selectedMedicalDrugsList)
const OPDDrugList = computed(() => store.partialOPDdrugList)
const nonPharmalogicalTherapyAndOtherNotes = computed(() => store.nonPharmalogicalTherapyAndOtherNotes);
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

const pres_methodErrMsg = ref('Select a route')
const show_error_msg_for_pres_method = ref(false)
const frequencyErrMsg = ref('Select frequency')
const show_error_msg_for_frequency = ref(false)
const drugErrMsg = ref('Select drug')
const show_error_msg_for_drug = ref(false)

const selected_pres_method = ref()
const selected_frequency = ref()
const selected_drug = ref()
const route_list = ref([] as any)
const show_list_label = false as any

function routeListUpdated(data: any) {
    selected_pres_method.value = data
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
    route_list.value = await getDrugRouteList()
});

watch(
    () => drugName.value,
    async (newValue) => {
        validatedDrugName();
    }
);


watch(
    () => dose.value,
    async (newValue) => {
        validateDose();
    }
);

watch(
    () => duration.value,
    async (newValue) => {
        validateDuration();
    }
);

function validateRoute() {
    if (isEmpty(selected_pres_method.value) == true) {
        show_error_msg_for_pres_method.value = true
        return false
    }

    if (isEmpty(selected_pres_method.value) == false) {
        show_error_msg_for_pres_method.value = false
        return true
    }
}

function validateFrequency() {
    if (isEmpty(selected_frequency.value) == true) {
        show_error_msg_for_frequency.value = true
        return false
    }

    if (isEmpty(selected_frequency.value) == false) {
        show_error_msg_for_frequency.value = false
        return true
    }
}

function validateDrug() {
    if (isEmpty(selected_drug.value) == true) {
        show_error_msg_for_drug.value = true
        return false
    }

    if (isEmpty(selected_drug.value) == false) {
        show_error_msg_for_drug.value = false
        return true
    }
}

function addData() {
    addItemButton.value = !addItemButton.value;
    search_item.value = true;
    show_error_msg_for_dose.value = false
    show_error_msg_for_duration.value = false
}

async function validatedDrugName() {
    const drugNameExists = await findIfDrugNameExists();

    console.log({drugNameExists})
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
    const isDrugnameValid = await validatedDrugName();
    const isDoseValid = await validateDose();
    const isDurationValid = await validateDuration();
    const isFrequencyValid = validateFrequency()
    const isDrugValid = validateDrug()
    const isRouteValid = validateRoute()

console.log({isDrugnameValid,isDoseValid,isDurationValid,isFrequencyValid,isDrugValid,isRouteValid })


    if (!isDrugnameValid && !isDoseValid && !isDurationValid && isFrequencyValid == true && isDrugValid == true && isRouteValid == true) {
        return true;
    } else {
        return false;
    }
}


function frequencyDropDownUpdated(event: any) {
    selected_frequency.value = event
}


async function saveData() {
    const are_fieldsValid = await areFieldsValid();

    if (!are_fieldsValid) {
        toastWarning("Please enter correct data values", 4000);
        return;
    }
    dissmissDrugAddField();
    const systemSessionDate = Service.getSessionDate();
    const generatedPrescriptionDate = addDaysToDate(systemSessionDate, parseInt(duration.value));
    let highlightbackground = false

    if (isPresentInAllergyList(currentDrugOb.value) == true) {
        highlightbackground = true;
    }

    const drugString = {
        drugName: drugName.value,
        dose: dose.value,
        frequency: selected_frequency.value.label,
        frequency_code: selected_frequency.value.code,
        duration: duration.value,
        prescription: generatedPrescriptionDate,
        drug_id: drug_id.value,
        units: units.value,
        route_concept_id: selected_pres_method.value.concept_id,
        route_name: selected_pres_method.value.name,
        highlightbackground: highlightbackground
    };
    
    selectedMedicalDrugsList.value.push(drugString);
    drugName.value = "";
    dose.value = "";
    selected_frequency.value = null;
    duration.value = "";
    prescription.value = "";
    componentKey.value++;
    selected_drug.value = null;
    selected_pres_method.value = null;
}

async function FindDrugName(text: any) {
    const searchText = text
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
    }))

    store.setPartialOPDdrugList(drugs)
}

async function FindDrugName2(text: any) {
    let search_value;
    if (text.target === undefined) {
        search_value = text;
    } else search_value = text.target.value;

    const page = 1,
        limit = 10;

    const drugs: ConceptName[] = await DrugService.getOPDDrugs({
        name: encodeURIComponent(search_value),
        page: page,
        page_size: limit,
    })

    drugs.map((drug: any) => ({
        label: drug.name,
        value: drug.name,
        other: drug,
    }));
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

async function findIfDrugNameExists() {
    const filteredDrugs = await FindDrugName2(drugName.value);
    if (filteredDrugs.length > 0) {
        if (drugName.value.length == 0) {
            return false;
        }
        return true;
    } else return false;
}

function hasMatchingIDs(mainArray: any[], idsToFilter: any[]): boolean {
    return mainArray.some((item: any) => 
        idsToFilter.includes(item.concept_id as never)
    );
}

function selectedDrugName(data: any) {
    drugName.value = data.name;
    drug_id.value = data.drug_id;
    units.value = data.units;
    currentDrugOb.value = data
    isPresentInAllergyList(data)
}

function editItemAtIndex(index: any) {
    const dataItem = selectedMedicalDrugsList.value[index]
    selectedMedicalDrugsList.value.splice(index, 1)
    drugName.value = dataItem.drugName
    dose.value = dataItem.dose
    selected_frequency.value = {label: dataItem.frequency, code: dataItem.frequency_code}
    duration.value = dataItem.duration
    prescription.value = dataItem.prescription
    addItemButton.value = !addItemButton
    selected_drug.value = dataItem
    selected_pres_method.value = { concept_id: dataItem.route_concept_id, name: dataItem.route_name }
    componentKey.value++
}

function removeItemAtIndex(index: any) {
    selectedMedicalDrugsList.value.splice(index, 1);
    componentKey.value++;
    saveStateValuesState();
    toastWarning("you have removed a drug from list", 6000)
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

const dynamic_button_properties = [
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "Add",
        btnFill: 'clear',
        fn: saveData,
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "Cancel",
        btnFill: 'clear',
        fn: addData,
    }
]
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
    padding: 6%;
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
.qaws {
    margin-top: -27px;
}
</style>
