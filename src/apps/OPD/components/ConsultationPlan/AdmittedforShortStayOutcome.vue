<template>
    <ListPicker
        :multiSelection="list_picker_prperties[0].multi_Selection"
        :show_label="list_picker_prperties[0].show_list_label"
        :uniqueId="list_picker_prperties[0].unqueId"
        :name_of_list="list_picker_prperties[0].name_of_list"
        :choose_place_holder="list_picker_prperties[0].placeHolder"
        :items_-list="list_picker_prperties[0].items"
        @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
        @item-list-filtered="list_picker_prperties[0].listFilteredFN"
    />
    <BasicInputField
        :placeholder="note_properties[0].placeHolder"
        :icon="pencilOutline"
        :inputValue="note_properties[0].dataValue.value"
    />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import { IonRow, IonCol, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
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
    phoneLandscape,
    phonePortraitOutline,
    locationOutline,
    personCircleOutline,
    medicalOutline,
    pencilOutline
} from "ionicons/icons";
import ListPicker from "@/apps/OPD/components/ConsultationPlan/ListPicker.vue"
import DatePicker from "@/apps/OPD/components/ConsultationPlan/DatePicker.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import { getSpecialistClinics, getFacilityWards } from "@/apps/OPD/services/outcome";

const WardsData = ref([] as any)

onMounted(async () => {
    findWardName({})
})


const note_properties = [
    {
        placeHolder: 'Reason',
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
    },
]

function notesUpDated_fn1(data: any) {
    note_properties[0].dataValue.value = data
}

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty3' as any,
        name_of_list: 'Choose ward' as any,
        placeHolder: 'Choose one' as any,
        items: WardsData.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
    }
]

async function findWardName(data: any) {
    const srch_text = data.value
    const temp_data1 = await getFacilityWards(srch_text)
    temp_data1.forEach((item: any) => {
        const _item_ = {
            name: item.name,
            selected: false,
        }
        WardsData.value.push(_item_)
    })
}

function listUpdated1(data: any) {
    WardsData.value = data
}
</script>