<template>
    <ion-title>Allergies (Medication, Healthcare items, Environment and Food)</ion-title>
    <ListPicker
        :multiSelection="list_picker_prperties[0].multi_Selection"
        :show_label="list_picker_prperties[0].show_list_label"
        :uniqueId="list_picker_prperties[0].unqueId"
        :name_of_list="list_picker_prperties[0].name_of_list"
        :choose_place_holder="list_picker_prperties[0].placeHolder"
        :items_-list="allergiesList"
        :use_internal_filter="list_picker_prperties[0].use_internal_filter"
        :disabled="list_picker_prperties[0].disabled.value"
        @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
        @item-list-filtered="list_picker_prperties[0].listFilteredFN"
        @item-search-text="list_picker_prperties[0].searchTextFN"
    />
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
const selectedAllergiesList = computed(() => store.selectedMedicalAllergiesList) as any
const input = ref()
const drugName = ref("")
const allergiesList = computed(() => store.medicalAllergiesList)

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: false as any,
        unqueId: 'qwerty_8_mkghy' as any,
        name_of_list: 'allegies' as any,
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

function listUpdated1(data: any) {
    data.forEach((item: any) => {
        if (item.selected == true) {
            const allergyStore = store
            allergyStore.setSelectedMedicalAllergiesList(item)
        }
    })
    setCommonAllergiesList()
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