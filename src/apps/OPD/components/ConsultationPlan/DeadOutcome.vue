<template>
        <ion-row class="checkbox_content md">
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="locationOutline"
                    :inputValue="note_properties[0].dataValue.value"
                    @update:inputValue="note_properties[0].dataHandler"
                />

                <div>
                    <ion-label v-if="note_properties[0].show_error.value" class="error-label">
                        {{ note_properties[0].error_message }}
                    </ion-label>
                </div>
            </ion-col>
            <ion-col>
                <DatePicker
                    :place_holder="date_properties[0].placeHolder"
                    @date-up-dated="date_properties[0].dataHandler"
                />

                <div>
                    <ion-label v-if="date_properties[0].show_error.value" class="error-label">{{ date_properties[0].error_message }}</ion-label>
                </div>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <TimePicker
                    :place_holder="time_properties[0].placeHolder"
                    @time-up-dated="time_properties[0].dataHandler"
                />
            </ion-col>
            <ion-col></ion-col>
        </ion-row>

        <ion-row class="checkbox_content md">
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[1].placeHolder"
                    :icon="personCircleOutline"
                    :inputValue="note_properties[1].dataValue.value"
                />
            </ion-col>
            <ion-col>
                <ion-checkbox 
                    :value="checkbox_properties[0].value"
                    alignment="start"
                    class="ion-lblCls"
                    > 
                        {{ checkbox_properties[0].lblTxt }}
                    </ion-checkbox>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="phone_number_place_holder"
                    :icon="phonePortraitOutline"
                    :inputValue="phone_number_value"
                />
            </ion-col>
            <ion-col></ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <DatePicker
                    :place_holder="date_properties[1].placeHolder"
                    @time-up-dated="date_properties[1].dataHandler"
                />
            </ion-col>
            <ion-col>
                <TimePicker
                    :place_holder="time_properties[1].placeHolder"
                    @time-up-dated="time_properties[1].dataHandler"
                />
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <ListPicker
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
            </ion-col>

            <ion-col>
                <ListPicker
                    :multiSelection="list_picker_prperties[1].multi_Selection"
                    :show_label="list_picker_prperties[1].show_list_label"
                    :uniqueId="list_picker_prperties[1].unqueId"
                    :name_of_list="list_picker_prperties[1].name_of_list"
                    :choose_place_holder="list_picker_prperties[1].placeHolder"
                    :items_-list="list_picker_prperties[1].items"
                    :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                    :disabled="temP_A"
                    @item-list-up-dated="list_picker_prperties[1].listUpdatedFN"
                    @item-list-filtered="list_picker_prperties[1].listFilteredFN"
                />
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[5].placeHolder"
                    :icon="pencilOutline"
                    :inputValue="note_properties[5].dataValue.value"
                    :disabled="temP_AA"
                />
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <TimePicker
                    :place_holder="time_properties[2].placeHolder"
                    @time-up-dated="time_properties[2].dataHandler"
                />
            </ion-col>
            
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[2].placeHolder"
                    :icon="personCircleOutline"
                    :inputValue="note_properties[2].dataValue.value"
                />
            </ion-col>

        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[3].placeHolder"
                    :icon="medicalOutline"
                    :inputValue="note_properties[3].dataValue.value"
                />
            </ion-col>

            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[4].placeHolder"
                    :icon="pencilOutline"
                    :inputValue="note_properties[4].dataValue.value"
                />
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


</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import { IonRow, IonCol, IonCheckbox, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import TimePicker from "@/components/TimePicker.vue"
import DatePicker from "@/components/DatePicker.vue"
import Note from "@/apps/OPD/components/ConsultationPlan/Note.vue"
import ListPicker from "@/components/ListPicker.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import DynamicButton from "@/components/DynamicButton.vue"
import { PatientService } from "@/services/patient_service"
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
    pencilOutline,
    removeOutline
} from "ionicons/icons";

const phone_number_value = ref()
const phone_number_place_holder = ref('gurdian phone number')
const isClientFemale = ref(true)
const temP_A = ref(true as any)
const temP_AA = ref(true as any)

const time_properties = [
    {
        placeHolder: {default: 'Enter time of death if known'} as any,
        dataHandler: timeUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
    {
        placeHolder: {default: 'Enter time arrived'} as any,
        dataHandler: timeUpdate_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
    {
        placeHolder: {default: 'Enter time confirming death'} as any,
        dataHandler: timeUpdate_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    }, 
]

const date_properties = [
    {
        placeHolder: {default: 'Enter date of death'} as any,
        dataHandler: dateUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
    {
        placeHolder: {default: 'Enter date arrived'} as any,
        dataHandler: dateUpdate_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error'
    },
    {
        placeHolder: {default: 'Enter date confirming death'} as any,
        dataHandler: dateUpdate_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    }, 
]

const checkbox_properties = [
    {
        lblTxt: 'Was the individual pregnant at the time of death?',
        value: ref(false),
    }
]

const note_properties = [
    {
        placeHolder: 'Enter place of death',
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false) as any,
        error_message: 'error',
    },
    {
        placeHolder: 'Enter name of guardian',
        dataHandler: notesUpDated_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
    {
        placeHolder: 'Enter name of person confirming death',
        dataHandler: notesUpDated_fn3,
        dataValue: ref(),
    },
    {
        placeHolder:'Enter position of the person confirming death',
        dataHandler: notesUpDated_fn4,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
    {
        placeHolder: 'Enter medical council registration number of the person confirming death',
        dataHandler: notesUpDated_fn5,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
    },
    {
        placeHolder: 'Other (specify)',
        dataHandler: notesUpDated_fn6,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'error',
        dissabled: temP_AA.value
    }, 
]

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

const mannerOfDeath = ref([
    { name: "Natural" },
    { name: "Accident" },
    { name: "Homicide" },
    { name: "Suicide" },
    { name: "Pending investigation" },
    { name: "Could not be determined" },
    { name: "Other - specify" }
] as any)

const causesOfDeath = ref([
    { name: "Motor vehicle (passenger)" },
    { name: "Motor vehicle (pedestrian)" },
    { name: "Drowning" },
    { name: "Other - specify" }
] as any)

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty' as any,
        name_of_list: 'Manner of death ' as any,
        placeHolder: 'Choose one' as any,
        items: mannerOfDeath.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        use_internal_filter: true as any,
        disabled: ref(false) as any,
    },
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty1' as any,
        name_of_list: 'How did it occur?' as any,
        placeHolder: 'Choose one' as any,
        items: causesOfDeath.value,
        listUpdatedFN: listUpdated2,
        listFilteredFN: ()=>{},
        use_internal_filter: true as any,
        disabled: temP_A.value,
    },
]

function cancelE() {
    dataSaved()
}

const emit = defineEmits<{
    (e: "dataSaved", ObjectsArray: any): void
}>()

function dataSaved(data = {"dataSaved": true}) {
    emit("dataSaved", data )
}

function timeUpdate_fn1(data: any) {
    time_properties[0].dataValue.value = data
}

function timeUpdate_fn2(data: any) {
    time_properties[1].dataValue.value = data
}

function timeUpdate_fn3(data: any) {
    time_properties[2].dataValue.value = data
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

function dateUpdate_fn2(data: any) {
    date_properties[1].dataValue.value = data
}

function dateUpdate_fn3(data: any) {
    date_properties[2].dataValue.value = data
}

function notesUpDated_fn1(event: any) {
    const reason = event.target.value
    note_properties[0].dataValue.value = reason
}
function notesUpDated_fn2(data: any) {
    note_properties[1].dataValue.value = data
}

function notesUpDated_fn3(data: any) {
    note_properties[2].dataValue.value = data
}

function notesUpDated_fn4(data: any) {
    note_properties[3].dataValue.value = data
}

function notesUpDated_fn5(data: any) {
    note_properties[4].dataValue.value = data
}

function notesUpDated_fn6(data: any) {
    note_properties[5].dataValue.value = data
}

function listUpdated1(data: any) {
    data.forEach((datum: any, index: number) => {
        if (index == 1 && datum.selected == true) {
            temP_A.value = false
            return
        } else if (index == 1 && datum.selected == false) {
            resetSelectionForCausesOfDeath()
            temP_A.value = true
        }

        if (index == 6 && datum.selected == true) {
            temP_AA.value = false
            return
        } else if (index == 6 && datum.selected == false) {
            resetSelectionForCausesOfDeath()
            temP_AA.value = true
        }
    })
    mannerOfDeath.value = data
}

function resetSelectionForCausesOfDeath() {
    causesOfDeath.value.forEach((item: any) =>{
            item.selected = false
        })
}

function listUpdated2(data: any) {
    data.forEach((datum: any, index: number) => {
        if (index == 3 && datum.selected == true) {
            temP_AA.value = false
            return
        } else if (index == 3 && datum.selected == false) {
            resetSelectionForCausesOfDeath()
            temP_AA.value = true
        }
    })
            
    causesOfDeath.value = data
}

function iweFn(data: any) {

}

function checkPatient() {
    const patient = new PatientService()
    return patient.isChildBearing()
}

function validateForm() {
    validatePlaceOfDeath()
    validateDateOfDeath()
}

function validatePlaceOfDeath() {
    if (note_properties[0].dataValue.value == "" || note_properties[0].dataValue.value === undefined) {
        note_properties[0].show_error.value = true
    } else {
        note_properties[0].show_error.value = false
    }
}

function validateDateOfDeath() {
    if (date_properties[0].dataValue.value === undefined || date_properties[0].dataValue.value == "") {
        date_properties[0].show_error.value = true 
    } else {
        date_properties[0].show_error.value = false
    }
}

</script>

<style scoped>
    .initTxt {
        text-align: center;
    }
    .spc_btwn {
        margin-top: 2%;
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
    ion-list.list-al {
        --background: #fff;
        -ion-item-background: #fff;
    }
    .saveContainer {
        display: flex;
        align-items: flex-end;
    }
    .action_buttons {
        margin-top: 5px;
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
    .spc_btwn {
        margin-top: 2%;
    }
    .ion-lblCls {
        font-weight: bold;
    }
</style>