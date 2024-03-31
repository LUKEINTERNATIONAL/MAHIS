<template>
   <ListPicker/>
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