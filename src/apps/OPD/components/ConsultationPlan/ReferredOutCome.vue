<template>
    <ion-list>
        <ion-row>
            <SelectFacility :show_error="show_location_error" @facility-selected="facilitySelected" :selected_district_ids="selectedDistrictIds" :selected_location="selected_location"/>
        </ion-row>

        <ion-row>
            <ion-col>
                <div>
                    <DatePicker
                        :place_holder="date_properties[0].placeHolder"
                        @date-up-dated="date_properties[0].dataHandler"
                        :date_prop="date_properties[0].dataValue.value"
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
                    :time_prop="time_properties[0].dataValue.value"
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
                :icon="addOutline" @clicked:btn="dynamic_button_properties[0].fn"
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
import { IonRow, IonCol, IonList, IonLabel } from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import {
    addOutline,
    pencilOutline,
    removeOutline
} from "ionicons/icons"
import DatePicker from "@/components/DatePicker.vue"
import TimePicker from "@/components/TimePicker.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import DynamicButton from "@/components/DynamicButton.vue"
import SelectFacility from "@/apps/OPD/components/SelectFacility.vue"
import { useOutcomeStore } from "@/stores/OutcomeStore"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"
const editIndex = ref(NaN)

const FacilityData = ref(null) as any
const store = useOutcomeStore()
const show_location_error = ref(false) as any
const selectedDistrictIds = ref([]) as any
const selected_location = ref({}) as any

const other_store_data = {
    ref_data: {},
    location_data: {},
}

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
        placeHolder: {default: 'Enter time of referral'} as any,
        dataHandler: timeUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
]

interface Props {
  selected_referral_data: any,
  selected_other_referral_data: any,
}

const props = defineProps<Props>()

watch(() => props.selected_other_referral_data,
  (newValue) => {
    if (!newValue) return;
    console.log("newValue QQ: ", newValue)
    note_properties[0].dataValue.value = newValue.reason
    date_properties[0].dataValue.value = newValue.date
    time_properties[0].dataValue.value = newValue.time
  },
    {
        immediate: true,
        deep: true
    }
)

watch(
  () => props.selected_referral_data,
  (newValue) => {
    if (!newValue) return;

    FacilityData.value = newValue.selected_location
    other_store_data.location_data = newValue
    
    const districtIds = Array.isArray(newValue.selected_district_ids) 
      ? [...newValue.selected_district_ids]
      : [];
      
    const location = newValue.selected_location 
      ? { ...newValue.selected_location }
      : null;
    
    selectedDistrictIds.value = districtIds;
    selected_location.value = location;
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
    //console.log("init: ", props.selected_referral_data)
})

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

function timeUpdate_fn1(data: any) {
    time_properties[0].dataValue.value = data
}

function validateForm() {
    validateFacility()
    validateNotes()
    validateDate()
    validateTime()
    if (date_properties[0].show_error.value == false && time_properties[0].show_error.value == false && note_properties[0].show_error.value == false && show_location_error.value == false) {
        saveDataToStores()
    } else {
        toastWarning("Please enter correct data values", 4000)
    }
}

function validateNotes() {
    if (note_properties[0].dataValue.value == "" || note_properties[0].dataValue.value === undefined) {
        note_properties[0].show_error.value = true
    } else {
        note_properties[0].show_error.value = false
    }
}

function validateDate() {
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

function validateFacility() {

    if (FacilityData.value) {
        show_location_error.value = false
    } else {
        show_location_error.value = true    
    }

}

const facilitySelected = (data: any) => {
    FacilityData.value = data.selected_location
    validateFacility()
    other_store_data.location_data = data
    console.log( data)
}

const saveDataToStores = () => {
    const referralInfo = {
        name: FacilityData.value.name,
        type: 'Referred out',
        selected: true,
        date: date_properties[0].dataValue,
        time: time_properties[0].dataValue,
        reason: note_properties[0].dataValue,
    }
    
    const referralData = {
        ...referralInfo,
        other: {
            ref_data: referralInfo,
            location_data: other_store_data.location_data
        }
    }

    store.addOutcomeData(referralData, editIndex.value)
    dataSaved({"dataSaved": false})
}

const cancelE = () =>{
    dataSaved()
}

const emit = defineEmits<{
    (e: "dataSaved", ObjectsArray: any): void
}>()

function dataSaved(data = {"dataSaved": true}) {
    emit("dataSaved", data )
}

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

</script>

<style scoped>
    .error-label {
        background: #fecdca;
        color: #b42318;
        text-transform: none;
        padding: 5%;
        padding-top: 2%;
        padding-bottom: 2%;
        border-radius: 10px;
        margin-top: 4px;
        display: flex;
        text-align: center;
    }
    .spc_btwn {
        margin-top: 2%;
    }
    .aro-cls-1 {
        margin: -1.3%;
        margin-left: 0%;
    }
    .lsp-cls-1 {
        margin: -15px; margin-left: 0px;
    }
    
</style>