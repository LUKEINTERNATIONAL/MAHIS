<template>
    <BasicInputField
        :placeholder="props.place_holder.default"
        :inputValue="refDate"
        :icon="today"
        :-inner-action-btn-propeties="InnerActionBtnPropeties"
        @update:InnerActionBtnPropetiesAction="InnerActionBtnPropeties.fn"
        @clicked:inputValue="openDate"
        :key="componentKey"
    />

    <ion-popover
        :show-backdrop="false"
        :keep-contents-mounted="true"
        :is-open="popoverProperties.isOpen"
        :event="popoverProperties.event"
        side="top"
        @didDismiss="popoverProperties.isOpen = false"
    >
    <ion-datetime v-if="showPicker" @ionChange="saveTheDate" id="datetime" presentation="date" :max="maxdate" :show-default-buttons="true" />
    </ion-popover>
</template>
<script setup lang="ts">
import { IonDatetime } from "@ionic/vue";
import BasicInputField from "./BasicInputField.vue";
import { today } from "ionicons/icons";
import { ref, watch } from "vue";
import { icons } from "../utils/svg";
import { Service } from "@/services/service";

const refDate = ref();

const maxdate = Service.getSessionDate();
const calenderIcon = icons.calendar;
const popoverProperties = ref({
    title: "Set Time",
    popoverOpen: false,
    isOpen: false,
    event: {} as Event,
    keyboardClose: false,
    popoverData: {} as Object,
});
const todayBtn = ref("Today");
const dateObject = ref();
const InnerActionBtnPropeties = {
    name: "Today",
    show: true,
    fn: setDateNow as any,
} as any;
const showPicker = ref(true);
const isSetTimeNowPressed = ref(false);
const componentKey = ref(0 as any);

interface Props {
  place_holder: any,
  date_prop: any,
}

const props = defineProps<Props>()

function createDate(day: any, month: any, year: any) {
    let date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

watch(() => props.date_prop,
  (newValue) => {
    if (!newValue) return;
    refDate.value = createDate(newValue.day, newValue.month, newValue.year)
  },
    {
        immediate: true,
        deep: true
    }
)

function openDate(event: any) {
    if (isSetTimeNowPressed.value == true) {
        showPicker.value = false;
        isSetTimeNowPressed.value = false;
    } else {
        showPicker.value = true;
    }
    popoverProperties.value.isOpen = true;
    popoverProperties.value.event = event;
}

function saveTheDate(event: any) {
    refDate.value = event.detail.value;
    refDate.value = formatDate(refDate.value);
    showPicker.value = false;
}

function setDateNow() {
    isSetTimeNowPressed.value = true;
    refDate.value = formatDate(new Date());
    componentKey.value++;
}

function formatDate(date: any) {
    let theDate = new Date(date);
    let tempDate = new Date(theDate.getFullYear() + "-" + ("0" + (theDate.getMonth() + 1)).slice(-2) + "-" + ("0" + theDate.getDate()).slice(-2));
    let options: Intl.DateTimeFormatOptions = { day: "2-digit", weekday: "long", month: "short", year: "numeric" };
    let formattedDate = tempDate.toLocaleDateString("en-US", options);

    const data_data: { day: number; month: number; year: number; formattedDate: string } = {
        day: theDate.getDate(),
        month: theDate.getMonth() + 1,
        year: theDate.getFullYear(),
        formattedDate: formattedDate
    }
    dateObject.value = data_data;
    dateUpDated();
    return formattedDate;
}

const emit = defineEmits<{
    (e: "dateUpDated", dateObject: any): void;
}>();

function dateUpDated() {
    emit("dateUpDated", dateObject);
}
</script>
