<template>
    <ion-list>
        <ion-row>
            <ion-col class="lsp-cls-1">
                <ListPicker class="aro-cls-1"
                    :multiSelection="list_picker_prperties[0].multi_Selection"
                    :show_label="list_picker_prperties[0].show_list_label"
                    :uniqueId="list_picker_prperties[0].unqueId"
                    :name_of_list="list_picker_prperties[0].name_of_list"
                    :choose_place_holder="list_picker_prperties[0].placeHolder"
                    :items_-list="list_picker_prperties[0].items"
                    :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                    :disabled="list_picker_prperties[0].disabled.value"
                    @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
                    @item-list-filtered="list_picker_prperties[0].listFilteredFN"
                />

                <div style="margin-bottom: 15px;">
                    <ion-label v-if="list_picker_prperties[0].show_error.value" class="error-label">{{ list_picker_prperties[0].error_message }}</ion-label>
                </div>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <div>
                    <DatePicker
                        :place_holder="date_properties[0].placeHolder"
                        @date-up-dated="date_properties[0].dataHandler"
                    />

                    <div>
                        <ion-label v-if="date_properties[0].show_error.value" class="error-label">{{ date_properties[0].error_message }}</ion-label>
                    </div>
                </div>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <div>
                    <TimePicker
                    :place_holder="time_properties[0].placeHolder"
                    @time-up-dated="time_properties[0].dataHandler"
                />

                <div>
                    <ion-label v-if="time_properties[0].show_error.value" class="error-label">{{ time_properties[0].error_message }}</ion-label>
                </div>
                </div>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="pencilOutline"
                    :inputValue="note_properties[0].dataValue.value"
                    @update:inputValue="note_properties[0].dataHandler"
                />

                <div>
                    <ion-label v-if="note_properties[0].show_error.value" class="error-label">{{ note_properties[0].error_message }}</ion-label>
                </div>
            </ion-col>
        </ion-row>

        <ion-row class="spc_btwn" v-if="dynamic_button_properties[0].showAddItemButton">
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
    </ion-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "xxxComponent",
});
</script>

<script setup lang="ts">
import { IonRow, IonCol, IonLabel, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import DynamicButton from "@/components/DynamicButton.vue"
import {
    addOutline,
    pencilOutline,
    removeOutline
} from "ionicons/icons";
import ListPicker from "@/components/ListPicker.vue"
import DatePicker from "@/components/DatePicker.vue"
import TimePicker from "@/components/TimePicker.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import { useOutcomeStore } from "@/stores/OutcomeStore"
import { getSpecialistClinics, getFacilityWards } from "@/apps/OPD/services/outcome"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"

const WardsData = ref([] as any)
const store = useOutcomeStore()
let temp_data_v: any[] = []
const editIndex = ref(NaN)

onMounted(async () => {
    findWardName({})
})

const dynamic_button_properties = [
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "save",
        btnFill: 'clear',
        fn: validateForm,
    },

    {
        showAddItemButton: true,
        addItemButton: true,
        name: "cancel",
        btnFill: 'clear',
        fn: cancelE,
    }
]

const note_properties = [
    {
        placeHolder: 'Reason',
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'please provide a reason'
    },
]

const date_properties = [
    {
        placeHolder: {default: 'Enter date'} as any,
        dataHandler: dateUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'please provide date'
    }
]

const time_properties = [
    {
        placeHolder: {default: 'Enter time of admission'} as any,
        dataHandler: timeUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
]

function timeUpdate_fn1(data: any) {
    time_properties[0].dataValue.value = data
}

function dateUpdate_fn1(data: any) {
    const date_data = {
        day: data.value.day,
        month: data.value.month,
        year: data.value.year,
        formattedDate: data.formattedDate
    }

    date_properties[0].dataValue.value = date_data
}

function notesUpDated_fn1(event: any) {
    const reason = event.target.value
    note_properties[0].dataValue.value = reason
}

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty3' as any,
        name_of_list: 'Choose Ward' as any,
        placeHolder: 'Choose one' as any,
        items: WardsData.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a ward',
        disabled: ref(false) as any,
    }
]

async function findWardName(data: any) {
    const srch_text = data.value
    const temp_data1 = await getFacilityWards(srch_text)
    temp_data1.forEach((item: any) => {
        const _item_ = {
            name: item.name,
            selected: false,
            other: item
        }
        WardsData.value.push(_item_)
    })
}

function listUpdated1(data: any) {
    WardsData.value = data
}

function validateForm() {
    validateWard()
    validateNotes()
    validateDate()
    validateTime()
    if (date_properties[0].show_error.value == false && time_properties[0].show_error.value == false && note_properties[0].show_error.value == false && list_picker_prperties[0].show_error.value == false) {
        saveDataToStores()
    } else {
        toastWarning("Please enter correct data values", 4000)
    }
}

function validateWard() {
    temp_data_v = []
    WardsData.value.forEach((item: any) => {
        if (item.selected == true) {
            temp_data_v.push(item)
        }
    })
    if (temp_data_v.length > 0) {
        list_picker_prperties[0].show_error.value = false 
    } else {
        list_picker_prperties[0].show_error.value = true
        console.log( list_picker_prperties[0].show_error)
    }
}

function validateNotes() {
    if (note_properties[0].dataValue.value == "" || note_properties[0].dataValue.value === undefined) {
        note_properties[0].show_error.value = true
    } else {
        note_properties[0].show_error.value = false
    }
}

function saveDataToStores() {
    const referralData = {
        name: temp_data_v[0].name,
        type: 'Admitted for short stay',
        date: date_properties[0].dataValue,
        time: time_properties[0].dataValue,
        reason: note_properties[0].dataValue,
        other: temp_data_v[0].other
        // dataItem: refDataItem.value,
    }

    store.addOutcomeData(referralData, editIndex.value)
    dataSaved({"dataSaved": false})
}

const emit = defineEmits<{
    (e: "dataSaved", ObjectsArray: any): void
}>()

function dataSaved(data = {"dataSaved": true}) {
    emit("dataSaved", data )
}

function cancelE() {
    dataSaved()
}

function validateDate() {
    console.log(date_properties[0].dataValue.value)
    if (date_properties[0].dataValue.value === undefined || date_properties[0].dataValue.value == "") {
        date_properties[0].show_error.value = true 
    } else {
        date_properties[0].show_error.value = false
    }
}

function validateTime() {
    console.log(time_properties[0].dataValue.value)
    if (time_properties[0].dataValue.value === undefined || date_properties[0].dataValue.value == "") {
        time_properties[0].show_error.value = true 
    } else {
        time_properties[0].show_error.value = false
    }
}
</script>

<style scoped>
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
.spc_btwn {
    margin-top: 2%;
}
.lsp-cls-1 {
    margin: -15px; margin-left: 0px;
}
</style>