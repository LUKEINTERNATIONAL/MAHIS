<template>
    <ion-list>
        <ion-label>Allergies (Medication, Healthcare items, Environment and Food)</ion-label>
        <ion-row>
            <ion-item lines="none" class="medicalAl">
            <ion-row>
            <div v-for="(item, index) in selectedAllergiesList" :key="index">
                <ion-button v-if="item.selected" @click="selectAl(item)" class="medicalAlBtn">
                    {{ item.name }}
                    <ion-icon slot="end" style="font-size: x-large" :icon="closeOutline"></ion-icon>
                </ion-button>
            </div>

            <div>
                <ion-button id="click-trigger" fill="clear" class="medicalAlAddBtn" @click="setFocus">
                    <ion-icon :icon="addOutline"></ion-icon>
                </ion-button>
                <ion-popover
                    class="popover-al"
                    :show-backdrop="false"
                    trigger="click-trigger"
                    trigger-action="click"
                    @didPresent="dissmissDrugAddField"
                >
                    <ion-content color="light" class="ion-padding content-al">
                        <ion-label>Choose the allergy:</ion-label>
                        <ion-input ref="input" v-model="drugName" @ionInput="FindAllegicDrugName" fill="outline"></ion-input>
                        <ion-list class="list-al">
                            <div class="item-al" v-for="(item, index) in allergiesList" @click="selectAl(item)" :key="index">
                                <ion-label style="display: flex; justify-content: space-between">
                                    {{ item.name }}
                                    <ion-icon v-if="item.selected" class="icon-al" :icon="checkmarkOutline"></ion-icon>
                                </ion-label>
                            </div>
                        </ion-list>
                    </ion-content>
                </ion-popover>
            </div>
            </ion-row>
            </ion-item>
        </ion-row>
    </ion-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "AllergiesComponent",
})
</script>

<script setup lang="ts">
import { icons } from "@/utils/svg"
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
} from "@ionic/vue"
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
} from "ionicons/icons"
import { useAllegyStore, searchHealthcareEquipmentAllergies, concatenateArrays } from "@/apps/OPD/stores/AllergyStore";
import { ConceptService } from "@/services/concept_service"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { ConceptName } from "@/interfaces/conceptName";

const store = useAllegyStore()
const selectedAllergiesList = computed(() => store.selectedMedicalAllergiesList)
const input = ref()
const drugName = ref("")
const allergiesList = computed(() => store.medicalAllergiesList)

onMounted(async () => {
    console.log("")
    console.log("QQQQQQQQQQQQQ: ", selectedAllergiesList.value)
})

watch(
    () => selectedAllergiesList,
    async (newValue) => {
        console.log(selectedAllergiesList)
    }
);

function selectAl(item: any) {
    console.log("selectAl: ", !item.selected)
    item.selected = !item.selected
    const AllergyStore = store
    AllergyStore.setSelectedMedicalAllergiesList(item)
    //saveStateValuesState()
}

function setFocus() {
    input.value.$el.setFocus();
}

function dissmissDrugAddField(): void {
    // search_item.value = false;
    // display_item.value = true;
    // addItemButton.value = true;
}

function saveStateValuesState() {
    const allergyStore = store
    allergyStore.setMedicalAllergiesList(allergiesList);
}

async function FindAllegicDrugName(text: any) {
    const searchText = text.target.value;
    const page = 1,
        limit = 10;
    const drugs: ConceptName[] = await ConceptService.getConceptSet("OPD Medication", searchText);
    // const drugs: ConceptName[] = await DrugService.getOPDDrugs({
    // "name": searchText,
    // "page": page,
    // "selected": false as any,
    // "page_size": limit,
    // })
    drugs.map((drug) => ({
        label: drug.name,
        value: drug.name,
        other: drug,
    }));
    const allergyStore = store
    const temp_data_1 = searchHealthcareEquipmentAllergies(searchText)
    const temp_data_2 = concatenateArrays(temp_data_1, drugs as any)
    allergyStore.setMedicalAllergiesList(temp_data_2)
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
</style>