<template>
    <ion-list style="margin-left: 10px;">
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

                    <div v-if="showOtherInput">
                        <ion-input v-model="otherAllergy" placeholder="Please specify the allergy" fill="outline"></ion-input>
                        
                        <ion-button @click="addCustomAllergy" class="addCustomAllergyBtn">
                            Add Allergy
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
import ListPicker from "../../../../../components/ListPicker.vue"

const store = useAllegyStore()
const selectedAllergiesList = computed(() => store.selectedMedicalAllergiesList)
const input = ref()
const drugName = ref("")
const otherAllergy = ref("") 
const showOtherInput = ref(false)
const allergiesList = computed(() => store.medicalAllergiesList)
const uniqueId = ref(generateUniqueId(8, 'item-'))

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId:  uniqueId.value as any,
        name_of_list: 'Add/Remove allegies' as any,
        placeHolder: 'Search for an allegy' as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: FindAllegicDrugName,
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a User',
        disabled: ref(false) as any,
    },
]

onMounted(async () => {
    // 
})


function selectAl(item: any) {
    console.log("selectAl: ", !item.selected)
    item.selected = !item.selected
    const AllergyStore = store

    // if item = other
    // display text input

    if (item.name === 'Other') {
        showOtherInput.value = true
    } else {
        showOtherInput.value = false
    }

    console.log({item})
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

async function FindAllegicDrugName(text: any) {
    const searchText = text;
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

    const temp_data_1 = searchHealthcareEquipmentAllergies(searchText)
    const temp_data_2 = concatenateArrays(temp_data_1, drugs as any)
    const allergyStore = store
    allergyStore.setMedicalAllergiesList(temp_data_2)
    setCommonAllergiesList()
}

function setCommonAllergiesList() {
    const temp_data_2 = allergiesList.value
    selectedAllergiesList.value.forEach((selected_alle: any) => {
    let found = false;
        temp_data_2.forEach((alle_dat_itm: any, index: number) => {
            if (alle_dat_itm.concept_id == selected_alle.concept_id && selected_alle.selected === true) {
                temp_data_2[index] = selected_alle;
                found = true;
            }
        });
        if (!found && selected_alle.selected === true) {
            temp_data_2.push(selected_alle);
        }
    });
    const op_ = temp_data_2.filter((item: any, index: any, self: any) =>
        index === self.findIndex((t: { concept_id: any; }) => t.concept_id === item.concept_id)
    );
    const allergyStore = store
    allergyStore.setMedicalAllergiesList(op_)
}

function generateUniqueId(length = 8, prefix = '') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = prefix;

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Append a timestamp or random number for uniqueness
    result += `-${Date.now()}`; // Append timestamp
    return result;
}

function addCustomAllergy() {
    const customAllergy = otherAllergy.value.trim()
    if (customAllergy) {
        const newAllergy = {
            name: customAllergy,
            selected: true
        }

        store.setMedicalAllergiesList([...allergiesList.value, newAllergy])
        store.setSelectedMedicalAllergiesList(newAllergy)

        otherAllergy.value = ""
        showOtherInput.value = false
    } else {
        console.log("Allergy name cannot be empty")
    }
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