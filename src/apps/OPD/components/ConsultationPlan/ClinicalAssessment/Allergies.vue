<template>
    <ion-card>
        <ion-card-header>
            <ion-label class="header-container">
                <ion-icon :icon="alertCircleOutline" class="allergy-icon"></ion-icon>
                <span style="font-size: 16px; font-weight: 600"> Allergies (Medication, Healthcare items, Environment and Food) </span>
            </ion-label>
        </ion-card-header>
        <ion-card-content>
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

            <div v-if="showOtherInput" class="custom-allergy-container">
                <ion-input v-model="allergyToAdd" placeholder="Please specify the allergy" fill="outline" class="custom-input"></ion-input>
                <ion-button @click="addCustomAllergy(allergyToAdd)" class="addCustomAllergyBtn"> Add Allergy </ion-button>
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "AllergiesComponent",
});
</script>

<script setup lang="ts">
import { IonButton, IonLabel, IonCard, IonCardContent, IonCardHeader, IonIcon, IonInput } from "@ionic/vue";
import { alertCircleOutline } from "ionicons/icons";
import { useAllegyStore, searchHealthcareEquipmentAllergies, concatenateArrays } from "@/apps/OPD/stores/AllergyStore";
import { ConceptService } from "@/services/concept_service";
import { ref, watch, computed, onMounted } from "vue";
import { ConceptName } from "@/interfaces/conceptName";
import ListPicker from "../../../../../components/ListPicker.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";

const allergyStore = useAllegyStore();
const DemographicsStore = useDemographicsStore();
const selectedAllergiesList = computed(() => allergyStore.selectedMedicalAllergiesList) as any;
const demographics = computed(() => DemographicsStore.patient) as any;
const allergiesList = computed(() => allergyStore.medicalAllergiesList);
const uniqueId = ref(generateUniqueId(8, "item-"));

const allergyToAdd = ref();
const showOtherInput = ref(false);

const filteredAllergiesList = computed(() => {
    return allergiesList.value;
});

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: uniqueId.value as any,
        name_of_list: "Add/Remove allergies" as any,
        placeHolder: "Search for an allergy" as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: () => {},
        searchTextFN: FindAllegicDrugName,
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: "please select a User",
        disabled: ref(false) as any,
    },
];
const addingCustomAllergy = ref(false);
onMounted(async () => {
  // allergyStore.clearSelectedMedicalAllergiesList();
});

watch(
    () => demographics.value,
    async (newValue) => {
        allergyStore.clearSelectedMedicalAllergiesList();
    }
);
function resetAllergies() {
  allergyStore.clearSelectedMedicalAllergiesList();
}

function listUpdated1(data: any) {
    data.forEach((item: any) => {
        if (item.selected == true && item.name === "Other") {
            showOtherInput.value = item.name === "Other";
        }
        allergyStore.setSelectedMedicalAllergiesList(item);
    });
    setCommonAllergiesList();
}
async function FindAllegicDrugName(text: any) {
    const searchText = text;
    const drugs: ConceptName[] = await ConceptService.getConceptSet("OPD Medication", searchText);
    drugs.map((drug) => ({
        label: drug.name,
        value: drug.name,
        other: drug,
    }));

    const temp_data_1 = searchHealthcareEquipmentAllergies(searchText);
    const temp_data_2 = concatenateArrays(temp_data_1, drugs as any);
    allergyStore.setMedicalAllergiesList(temp_data_2);
    setCommonAllergiesList();
}

function setCommonAllergiesList() {
    const temp_data_2 = allergiesList.value;
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
    const op_ = temp_data_2.filter(
        (item: any, index: any, self: any) => index === self.findIndex((t: { concept_id: any }) => t.concept_id === item.concept_id)
    );
    allergyStore.setMedicalAllergiesList(op_);
}

function generateUniqueId(length = 8, prefix = "") {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = prefix;

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    result += `-${Date.now()}`;
    return result;
}
async function addCustomAllergy(allergyName: string) {
    try {
        const customAllergy = allergyName.trim();
        if (customAllergy) {
            const newAllergy = {
                name: customAllergy,
                selected: true,
            };

            allergyStore.setMedicalAllergiesList([...allergiesList.value, newAllergy]);
            allergyStore.setSelectedMedicalAllergiesList(newAllergy);

            showOtherInput.value = false;
            addingCustomAllergy.value = true;
            allergyToAdd.value = "";

            const Other = allergyStore.findSelectedAllergyByName("Other");
            allergyStore.removeSelectedAllergy(Other);
        }
    } catch (error) {
        console.error(error);
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
.custom-allergy-container {
    display: flex;
    align-items: center;
    gap: 10px;
}
.custom-input {
    max-width: 300px;
    width: 100%;
}

.header-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.allergy-icon {
    font-size: 24px;
    color: #b42318;
}

/* Rest of the styles remain the same */
</style>
