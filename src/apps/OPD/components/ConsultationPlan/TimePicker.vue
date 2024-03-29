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
<script setup lang="ts">
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


const emit = defineEmits<{
  (e: "timeUpDated", timeObject: any): void;
}>();

function timeUpDated() {
  emit("timeUpDated", timeObject);
}

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
    timeObject.value = {
        time: formattedTime,
        meridian: ampm
    }
    timeUpDated()
    return formattedTime
}

function setTimeNow() {
    console.log("wwww: ",refTime.value)
    refTime.value = formatTime(new Date)
}

</script>
