<template>
    <BasicInputField
        :placeholder="timePlaceholder"
        :inputValue="refTime"
        :icon="time"
        :-inner-action-btn-propeties="InnerActionBtnPropeties"
        @clicked:inputValue="openDatePopOver"
        :key="componentKey"
    />
    <ion-popover
        :show-backdrop="false"
        :keep-contents-mounted="true"
        :is-open="popoverProperties.isOpen"
        :event="popoverProperties.event"
        @didDismiss="popoverProperties.isOpen = false"
    >
        <ion-datetime v-if="showPicker" @ionChange="saveTime" id="datetime" presentation="time" :show-default-buttons="true"></ion-datetime>
    </ion-popover>
</template>
<script setup lang="ts">
import { IonDatetime } from "@ionic/vue"
import { time } from "ionicons/icons"
import { ref, watch } from "vue"
import BasicInputField from "@/components/BasicInputField.vue"
import DynamicButton from "@/components/DynamicButton.vue"

const refTime = ref()
const timePlaceholder = ref("Select Time")
const popoverProperties = ref({
    title: "Set Time",
    popoverOpen: false,
    isOpen: false,
    event: {} as Event,
    keyboardClose: false,
    popoverData: {} as Object,
})
const timeObject = ref()
const InnerActionBtnPropeties = {
                name: 'Now',
                show: true,
                fn: setTimeNow,
            }
const showPicker = ref(true)
const isSetTimeNowPressed = ref(false)
const componentKey = ref(0 as any)

const emit = defineEmits<{
  (e: "timeUpDated", timeObject: any): void;
}>();

function timeUpDated() {
  emit("timeUpDated", timeObject)
}

function openDatePopOver(event: Event) {
    if (isSetTimeNowPressed.value == true) {
        showPicker.value = false
        isSetTimeNowPressed.value = false
    } else {
        showPicker.value = true
    }
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
    isSetTimeNowPressed.value = true
    refTime.value = formatTime(new Date)
    showPicker.value = false
    componentKey.value++
}

</script>
