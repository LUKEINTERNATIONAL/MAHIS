<template>
    <BasicInputField
        :placeholder="timePlaceholder"
        :inputValue="refTime"
        @clicked:inputValue="openDatePopOver"
        @update:inputValue="refTime"
    />
    <dynamic-button
        :name="nowBtn"
        :icon="time"
        @clicked:btn="setTimeNow"
    />
    <ion-popover
        :show-backdrop="false"
        :keep-contents-mounted="true"
        :is-open="popoverProperties.isOpen"
        :event="popoverProperties.event"
        @didDismiss="popoverProperties.isOpen = false"
    >
        <ion-datetime @ionChange="saveTime" id="datetime" presentation="time" :show-default-buttons="true"></ion-datetime>
    </ion-popover>
</template>
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
} from "@ionic/vue"
import {
    checkmark,
    pulseOutline,
    addOutline,
    closeOutline,
    checkmarkOutline,
    filter,
    chevronDownOutline,
    chevronUpOutline,
    time,
    codeSlashOutline,
} from "ionicons/icons"
import { defineComponent } from "vue"
export default defineComponent({
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import BasicInputField from "@/components/BasicInputField.vue"
import DynamicButton from "@/components/DynamicButton.vue"
const btnFill = "clear"

const refTime = ref()
const timePlaceholder = ref("Select refTime")
const popoverProperties = ref({
    title: "Set Time",
    popoverOpen: false,
    isOpen: false,
    event: {} as Event,
    keyboardClose: false,
    popoverData: {} as Object,
})
const nowBtn = ref("Now")
const timeObject = ref()

function openDatePopOver(event: Event) {
    popoverProperties.value.isOpen = true;
    popoverProperties.value.event = event;
}

function saveTime(event: any) {
    refTime.value = event.detail.value
    const time = formatTime(refTime.value)
    if(containsNaN(time) == true) {
        setTimeNow()
        return
    }
    refTime.value = time
}

function containsNaN(str: string) {
    return str.indexOf('NaN') !== -1;
}

function formatTime(date: any) {
    let theDate = new Date(date)
    let hours = theDate.getHours()
    let minutes = theDate.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    let formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm
    return formattedTime
}

function setTimeNow() {
    console.log("wwww: ",refTime.value)
    refTime.value = formatTime(new Date)
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