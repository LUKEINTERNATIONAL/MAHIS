<template>
    <ion-list>
        <ion-row>
            <ion-col>
                <div>
                    <DatePicker
                        :place_holder="date_properties[0].placeHolder"
                        @date-up-dated="date_properties[0].dataHandler"
                        :date_prop="''"
                    />

                    <div>
                        <ion-label v-if="date_properties[0].show_error.value" class="error-label">{{ date_properties[0].error_message }}</ion-label>
                    </div>
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
import { IonRow, IonCol, IonList, IonLabel } from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import {
    addOutline,
    pencilOutline,
    removeOutline
} from "ionicons/icons"
import DatePicker from "@/components/DatePicker.vue"
import { LocationService } from "@/services/location_service"
import DynamicButton from "@/components/DynamicButton.vue"
import { isEmpty } from "lodash"
import { useOutcomeStore } from "@/stores/OutcomeStore"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"
const editIndex = ref(NaN)
const FacilityData = ref([] as any)
const store = useOutcomeStore()
let temp_data_v: any[] = []

onMounted(async () => {
    findWardName('')
})

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
        unqueId: 'qwerty4' as any,
        name_of_list: 'Choose Facility' as any,
        placeHolder: 'Choose one' as any,
        items: FacilityData.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: findWardName,
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a Facility',
        disabled: ref(false) as any,
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

function timeUpdate_fn1(data: any) {
    time_properties[0].dataValue.value = data
}

const uniqueLocations = new Set()
async function findWardName(data: any) {
    const srch_text = data
    const temp_data1 = await LocationService.getFacilities({ name: srch_text })
    temp_data1.forEach((item: any) => {
        if (!uniqueLocations.has(item.location_id)) {
            uniqueLocations.add(item.location_id)
            if (isEmpty(item.name) == false) {
                FacilityData.value.push({name: item.name,selected: false, other: item})
            }
        }
    })
}

function listUpdated1(data: any) {
    FacilityData.value = data
}

function validateForm() {
  validateDate();
  if (!date_properties[0].show_error.value) {
    saveDataToStores();
  } else {
    toastWarning("Please enter a valid date", 4000);
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
    temp_data_v = []
    FacilityData.value.forEach((item: any) => {
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

function saveDataToStores() {
  const dischargeData = {
    type: 'Discharged Home',
    date: date_properties[0].dataValue,
  };

  store.addOutcomeData(dischargeData, editIndex.value);
  dataSaved({"dataSaved": false});
}

function cancelE() {
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