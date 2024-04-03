<template>
    <div class="modal_wrapper">
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
    </div>


        <ListPicker
            :multiSelection="list_picker_prperties[1].multi_Selection"
            :show_label="list_picker_prperties[1].show_list_label"
            :uniqueId="list_picker_prperties[1].unqueId"
            :name_of_list="list_picker_prperties[1].name_of_list"
            :choose_place_holder="list_picker_prperties[1].placeHolder"
            :items_-list="list_picker_prperties[1].items"
            @item-list-up-dated="list_picker_prperties[1].listUpdatedFN"
            @item-list-filtered="list_picker_prperties[1].listFilteredFN"
        />

        <ion-row>
            <TimePicker
                :place_holder="time_properties[0].placeHolder"
                @time-up-dated="time_properties[0].dataHandler"
            />
            <TimePicker
                :place_holder="time_properties[1].placeHolder"
                @time-up-dated="time_properties[1].dataHandler"
            />
            <TimePicker
                :place_holder="time_properties[2].placeHolder"
                @time-up-dated="time_properties[2].dataHandler"
            />
  
            <DatePicker
                :place_holder="date_properties[0].placeHolder"
                @time-up-dated="date_properties[0].dataHandler"
            />

            <DatePicker
                :place_holder="date_properties[1].placeHolder"
                @time-up-dated="date_properties[1].dataHandler"
            />
        

            <Note
                :place_holder="note_properties[0].placeHolder"
                @time-up-dated="note_properties[0].dataHandler"
            />

            <Note
                :place_holder="note_properties[1].placeHolder"
                @time-up-dated="note_properties[1].dataHandler"
            />

            <Note
                :place_holder="note_properties[2].placeHolder"
                @time-up-dated="note_properties[2].dataHandler"
            />

            <Note
                :place_holder="note_properties[3].placeHolder"
                @time-up-dated="note_properties[3].dataHandler"
            />

            <Note
                :place_holder="note_properties[4].placeHolder"
                @time-up-dated="note_properties[4].dataHandler"
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
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import TimePicker from "@/apps/OPD/components/ConsultationPlan/TimePicker.vue"
import DatePicker from "@/apps/OPD/components/ConsultationPlan/DatePicker.vue"
import Note from "@/apps/OPD/components/ConsultationPlan/Note.vue"
import ListPicker from "@/apps/OPD/components/ConsultationPlan/ListPicker.vue"

const time_properties = [
    {
        placeHolder: {default: 'Enter time of death if known'} as any,
        dataHandler: timeUpdate_fn1,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter time arrived'} as any,
        dataHandler: timeUpdate_fn2,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter time confirming death'} as any,
        dataHandler: timeUpdate_fn3,
        dataValue: ref(),
    }, 
]

const date_properties = [
    {
        placeHolder: {default: 'Enter date of death'} as any,
        dataHandler: dateUpdate_fn1,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter date arrived'} as any,
        dataHandler: dateUpdate_fn2,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter date confirming death'} as any,
        dataHandler: dateUpdate_fn3,
        dataValue: ref(),
    }, 
]

const note_properties = [
    {
        placeHolder: {default: 'Enter place of death'} as any,
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter name of guardian'} as any,
        dataHandler: notesUpDated_fn2,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter name of person confirming death'} as any,
        dataHandler: notesUpDated_fn3,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter position of the person confirming death'} as any,
        dataHandler: notesUpDated_fn4,
        dataValue: ref(),
    },
    {
        placeHolder: {default: 'Enter medical council registration number of the person confirming death'} as any,
        dataHandler: notesUpDated_fn5,
        dataValue: ref(),
    },
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
    },
]

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
    date_properties[0].dataValue.value = data
}

function dateUpdate_fn2(data: any) {
    date_properties[1].dataValue.value = data
}

function dateUpdate_fn3(data: any) {
    date_properties[2].dataValue.value = data
}

function notesUpDated_fn1(data: any) {
    note_properties[0].dataValue.value = data
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

function listUpdated1(data: any) {
    console.log(data)
    mannerOfDeath.value = data
}

function listUpdated2(data: any) {
    console.log(data)
    causesOfDeath.value = data
}

function iweFn(data: any) {

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
</style>