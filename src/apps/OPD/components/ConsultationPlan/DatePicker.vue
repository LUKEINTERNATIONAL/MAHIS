<template>
    <BasicInputField
        :placeholder="datePlaceholder"
        :inputValue="refDate"
        :icon="today"
        @update:inputValue="refDate"
        @clicked:inputValue="openDate"
    />

    <dynamic-button
        :name="todayBtn"
        :icon="today"
        @clicked:btn="setDateNow"
    />

    <ion-popover
        :show-backdrop="false"
        :keep-contents-mounted="true"
        :is-open="popoverProperties.isOpen"
        :event="popoverProperties.event"
        @didDismiss="popoverProperties.isOpen = false"
    >
        <ion-datetime @ionChange="saveTheDate" id="datetime" presentation="date" :show-default-buttons="true"/>
    </ion-popover>
</template>
<script setup lang="ts">
import { IonDatetime } from "@ionic/vue"
import BasicInputField from "@/components/BasicInputField.vue"
import DynamicButton from "@/components/DynamicButton.vue"
import { today } from "ionicons/icons"
import { ref } from "vue"
import { icons } from "@/utils/svg"

const datePlaceholder = ref("Select Date")
const refDate = ref()
const calenderIcon = icons.calendar
const popoverProperties = ref({
    title: "Set Time",
    popoverOpen: false,
    isOpen: false,
    event: {} as Event,
    keyboardClose: false,
    popoverData: {} as Object,
})
const todayBtn = ref("Today")
const dateObject = ref()

function openDate(event: any) {
    popoverProperties.value.isOpen = true
    popoverProperties.value.event = event
}

function saveTheDate(event: any) {
    refDate.value = event.detail.value
    refDate.value = formatDate(refDate.value)
}

function setDateNow() {
    refDate.value = formatDate( new Date())
}

function formatDate(date: any) {
    let theDate = new Date(date)
    let tempDate = new Date(theDate.getFullYear() + "-" + ("0" + (theDate.getMonth() + 1)).slice(-2) + "-" + ("0" + theDate.getDate()).slice(-2))
    let options: Intl.DateTimeFormatOptions = { day: "2-digit", weekday: "long", month: "short", year: "numeric" }
    let formattedDate = tempDate.toLocaleDateString("en-US", options)

    const data_data: { day: number, month: number, year: number } = {
        day: theDate.getDate(),
        month: theDate.getMonth() + 1,
        year: theDate.getFullYear()
    }
    dateObject.value = data_data
    dateUpDated()
    return formattedDate;
}

const emit = defineEmits<{
  (e: "dateUpDated", dateObject: any): void;
}>();

function dateUpDated() {
  emit("dateUpDated", dateObject)
}

</script>