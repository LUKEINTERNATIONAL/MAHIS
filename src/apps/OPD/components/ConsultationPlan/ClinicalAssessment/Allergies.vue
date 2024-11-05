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
                <ion-input v-model="otherAllergy" placeholder="Please specify the allergy" fill="outline" class="custom-input"></ion-input>
                <ion-button @click="addCustomAllergy" class="addCustomAllergyBtn"> Add Allergy </ion-button>
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
import { IonButton, IonLabel, IonCard, IonCardContent, IonCardHeader, IonIcon } from "@ionic/vue";
import { alertCircleOutline } from 'ionicons/icons';
import { useAllegyStore, searchHealthcareEquipmentAllergies, concatenateArrays } from "@/apps/OPD/stores/AllergyStore";
import { ConceptService } from "@/services/concept_service";
import { ref, watch, computed, onMounted } from "vue";
import { ConceptName } from "@/interfaces/conceptName";
import ListPicker from "../../../../../components/ListPicker.vue";

const store = useAllegyStore();
const selectedAllergiesList = computed(() => store.selectedMedicalAllergiesList) as any;
const allergiesList = computed(() => store.medicalAllergiesList);
const uniqueId = ref(generateUniqueId(8, "item-"));

const otherAllergy = ref("");
const showOtherInput = ref(false);

const filteredAllergiesList = computed(() => {
    return allergiesList.value;
});
const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: uniqueId.value as any,
        name_of_list: "Add/Remove allegies" as any,
        placeHolder: "Search for an allegy" as any,
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
watch(
    selectedAllergiesList,
    (newList) => {
        if (!addingCustomAllergy.value) {
            showOtherInput.value = newList.some((item: any) => item.name === "Other" && item.selected);
        }
    },
    { deep: true }
);
onMounted(async () => {
    //
});

function listUpdated1(data: any) {
    data.forEach((item: any) => {
        if (item.selected == true && item.name === "Other") {
            const allergyStore = store;
            allergyStore.setSelectedMedicalAllergiesList(item);
            showOtherInput.value = item.name === "Other";
        }
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
    const allergyStore = store;
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
    const allergyStore = store;
    allergyStore.setMedicalAllergiesList(op_);
}

function generateUniqueId(length = 8, prefix = "") {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = prefix;

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Append a timestamp or random number for uniqueness
    result += `-${Date.now()}`; // Append timestamp
    return result;
}
async function addCustomAllergy() {
    const customAllergy = otherAllergy.value.trim();
    if (customAllergy) {
        const newAllergy = {
            name: customAllergy,
            selected: true,
        };

        store.setMedicalAllergiesList([...allergiesList.value, newAllergy]);
        store.setSelectedMedicalAllergiesList(newAllergy);

        otherAllergy.value = "";
        showOtherInput.value = false;
        addingCustomAllergy.value = true;

        setTimeout(() => {
            addingCustomAllergy.value = false;
        }, 100);
    } else {
        console.log("Allergy name cannot be empty");
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
