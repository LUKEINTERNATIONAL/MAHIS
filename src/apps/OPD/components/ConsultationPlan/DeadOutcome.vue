<template>
    <ion-row>
        <ion-col>
            <TimePicker :place_holder="place" @time-up-dated="timeUpdate"/>
        </ion-col>
        <ion-col>
            <DatePicker :place_holder="place" @dateUpDated="dateUpdate"/>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col>
            <Note :place_holder="place" @notes-up-dated="notesUpDated"/>
        </ion-col>
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
import Note from "@/apps/OPD/components/ConsultationPlan/Note.vue";

const timeData = ref()
const place = ref({default: 'Select time'} as any)

function timeUpdate(data: any) {
    console.log(data)
}

function dateUpdate(data: any) {
    console.log(data)
}

function notesUpDated(data: any) {
    console.log(data)
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