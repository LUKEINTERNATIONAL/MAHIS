<template>
        <ListPicker
            :multiSelection="multi_Selection"
            :uniqueId="id_1"
            :name_of_list="name"
            :choose_place_holder="name"
            :items_-list="items_List"
            @item-list-up-dated="listUpdated"
            @item-list-filtered="iweFn"
        />

        <ListPicker
            :multiSelection="multi_Selection2"
            :uniqueId="id_2"
            :name_of_list="name"
            :choose_place_holder="name"
            :items_-list="items_List2"
            @item-list-up-dated="listUpdated2"
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

const name = "nnnnnn" as any
const multi_Selection = true as any
const multi_Selection2 = false as any
const id_1 = "1" as any
const id_2 = "2" as any
const  items_List = ref([
        {"name": "Toyota Camry", "selected": true},
        {"name": "Honda Civic", "selected": false},
        {"name": "Ford Mustang", "selected": true},
        {"name": "Chevrolet Corvette", "selected": false},
        {"name": "BMW 3 Series", "selected": true},
        {"name": "Mercedes-Benz E-Class", "selected": false},
        {"name": "Audi A4", "selected": true},
        {"name": "Tesla Model S", "selected": false},
        {"name": "Subaru Outback", "selected": true},
        {"name": "Volkswagen Golf", "selected": false}
    ] as any)

const items_List2 = ref([
    {"name": "New York", "selected": true},
    {"name": "Los Angeles", "selected": false},
    {"name": "Chicago", "selected": false},
    {"name": "Houston", "selected": false},
    {"name": "Phoenix", "selected": false},
    {"name": "Philadelphia", "selected": false},
    {"name": "San Antonio", "selected": false},
    {"name": "San Diego", "selected": false},
    {"name": "Dallas", "selected": false},
    {"name": "San Jose", "selected": false}
] as any);



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

function listUpdated(data: any) {
    console.log(data)
    items_List.value = data
}

function listUpdated2(data: any) {
    console.log(data)
    items_List2.value = data
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