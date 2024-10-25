<template>
    <div class="background">
        <ion-segment :value="segmentContent" style="margin-top: 5px">
            <ion-segment-button value="Lab Investigations" @click="setSegmentContent(segments[0])">
                <ion-label>Allergies</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Radiology Investigation" @click="setSegmentContent(segments[1])">
                <ion-label>Medications</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Other Investigation" @click="setSegmentContent(segments[2])">
                <ion-label>Non-pharmalogical therapy and other notes</ion-label>
            </ion-segment-button>
        </ion-segment>
        <div v-if="segmentContent == segments[0]">
            <div style="margin: 10px">
                <Allergies/>

                <ion-accordion-group ref="accordionGroup" class="previousView">
                    <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                        <ion-item slot="header" color="light">
                            <ion-label class="previousLabel">Previous Allergies</ion-label>
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
            </div>
        </div>
        <div v-if="segmentContent == segments[1]">
            <div style="margin: 10px">
                <NCDMedication/>
            </div>
        </div>
        <div v-if="segmentContent == segments[2]">
            <div style="margin: 10px">
                <NonPharmalogicalTherapyAndOtherNotes/>
            </div>
        </div>
    </div>
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
    IonItem,
    IonList,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
    IonSegment,
    IonSegmentButton,
} from "@ionic/vue";

import { ref, watch, computed, onMounted, onUpdated } from "vue";
import NCDMedication from "./NCDMedication.vue"
import NonPharmalogicalTherapyAndOtherNotes from "./NonPharmalogicalTherapyAndOtherNotes.vue"
import { DrugService } from "@/services/drug_service";
import { ConceptName } from "@/interfaces/conceptName";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { Service } from "@/services/service";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useAllegyStore} from "@/apps/OPD/stores/AllergyStore"
import Allergies from "@/apps/OPD/components/ConsultationPlan/ClinicalAssessment/Allergies.vue"


const segments = ref([
    'allergies',
    'medications',
    'other_notes',
]) as any
const segmentContent = ref(segments.value[0])
const popoverOpen = ref(false);
const componentKey = ref(0);
const diagnosisData = ref([] as any);
const drugName = ref("");
const dose = ref("");
const frequency = ref("");
const duration = ref("");
const prescription = ref("");
const units = ref("");
const drug_id = ref("");
const store = useTreatmentPlanStore();
const store2 = useAllegyStore();
const selectedAllergiesList2 = computed(() => store2.selectedMedicalAllergiesList);
const selectedMedicalDrugsList = computed(() => store.selectedMedicalDrugsList);

const values = ["first", "second", "third"];
const PreviuosSelectedMedicalDrugsList = ref();
const FirstPreviousNotes = ref();
const RestOfPreviousNotes = ref();
const itemWasExpanded = ref(false);

const itemAllegiesWasExpanded = ref(false);

const showMoreAllergyMsg = ref("Show more allergies");
const FirstPreviousAllegies = ref();
const RestOfPreviousAllegies = ref();
const currentDrugOb = ref()

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

function setSegmentContent(name: any) {
    segmentContent.value = name;
}

async function generalPrescription() {
    const systemSessionDate = Service.getSessionDate();
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
    // Check if any item in mainArray has concept_id included in idsToFilter
    return mainArray.some((item: any) => 
        idsToFilter.includes(item.concept_id as never)
    );
}

function openPopover(e: any) {
    event = e;
    popoverOpen.value = true;
}

function saveStateValuesState() {
    const treatmentPlanStore = useTreatmentPlanStore();
    treatmentPlanStore.setSelectedMedicalDrugsList(selectedMedicalDrugsList);
}


function addDaysToDate(dateString: string, daysToAdd: number): string {
    const currentDate = new Date(dateString);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
.background {
    background-color: #fff;
}
</style>
