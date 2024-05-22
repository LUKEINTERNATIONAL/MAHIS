<template>
    <Toolbar />
    <ion-content :fullscreen="true">
        <div id="" style="margin-top: 30px; margin-left: 8%; margin-right: 8%;">

            <ion-row style="margin-bottom: 10px;">
                <ion-col>
                    <div class="back_profile" @click="nav('home')">
                        <ion-icon style="font-size: 20px;" :icon="chevronBackOutline"> </ion-icon>
                        <span style="cursor: pointer"> Back To Home Page</span>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row style="margin-bottom: 20px;">
                <ion-label style="font-weight: bold; font-size: 22px;">Set Clinical Days</ion-label>
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-checkbox class="ilbl" label-placement="end" :checked="isMondayChecked" @ionChange="onCheckboxChange($event, 'monday')">Monday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end" :checked="isTuesdayChecked" @ionChange="onCheckboxChange($event, 'tuesday')">Tuesday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end" :checked="isWednesdayChecked" @ionChange="onCheckboxChange($event, 'wednesday')">Wednesday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end" :checked="isThursdayChecked" @ionChange="onCheckboxChange($event, 'thursday')">Thursday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end" :checked="isFridayChecked" @ionChange="onCheckboxChange($event, 'friday')">Friday</ion-checkbox>
                    <br />
                </ion-col>

                <ion-col size="7">
                    <ion-row>
                        <ion-col>
                            <div>
                                <ion-label style="font-weight: bold; font-size: 15px;">Enbale or Disable weekends</ion-label>
                                <Toggle
                                    class="toggle-green"
                                    :classes="{
                                        container: 'inline-block rounded-full outline-none focus:ring focus:ring-green-500 focus:ring-opacity-30',
                                    }" 
                                    v-model="toggle_local"
                                    :offLabel="'disabled'"
                                    :onLabel="'enabled'"
                                />
                            </div>
                        </ion-col>
                        <ion-col size="8">
                            <div style="margin-top: 30px;">
                                <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end" :checked="isSaturdayChecked" @ionChange="onCheckboxChange($event, 'saturday')">Saturday</ion-checkbox>
                                <br />
                                <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end" :checked="isSundayChecked" @ionChange="onCheckboxChange($event, 'sunday')">Sunday</ion-checkbox>
                                <br />
                            </div>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-label style="font-weight: bold; font-size: 15px;">Set Maximum Next Appointments Vistis Per Day</ion-label>
                    </ion-row>

                    <ion-row>
                        <ion-item class="input_item">
                            <ion-input placeholder="Enter a number" v-model="maximumNumberOfDaysForEachDay" fill="outline"></ion-input>
                            <ion-label><span class="selectedPatient"></span></ion-label>
                        </ion-item>
                    </ion-row>
                </ion-col>
            </ion-row>

            <ion-row style="margin-bottom: 20px; margin-top: 20px;">
                <ion-label style="font-weight: bold; font-size: 22px;">Set Clinical Holiday(s)</ion-label>
            </ion-row>

            <ion-row>
                    <ion-col size="7">
                        <VueDatePicker
                            v-model="date"
                            :enable-time-picker="false"
                            inline
                            auto-apply
                            multi-dates
                            :disabled-dates="disabledDates"
                        />
                    </ion-col>
                    <ion-col size="3">
                        <div style="margin-left: 40px;">
                            <ion-row>
                                <ion-label style="font-weight: bold; font-size: 22px;">Total Holidays Set</ion-label>
                            </ion-row>
                            <ion-row>
                                <ion-label style="font-size: 22px; margin: 10px;">{{ totalHolidaysSelected }}</ion-label>
                            </ion-row>
                        </div>
                    </ion-col>
            </ion-row>
        </div>
    </ion-content>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { text } from "ionicons/icons"
import { it } from "date-fns/locale"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
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
    IonRow,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
    IonCheckbox
} from "@ionic/vue"
import Toolbar from '@/components/Toolbar.vue'
import { ref, onMounted,computed, watch } from "vue"
import { chevronBackOutline, checkmark } from "ionicons/icons"
import Toggle from '@vueform/toggle'
import router from '@/router'
import HisDate from "@/utils/Date"
import { useClinicalDaysStore } from "@/stores/clinicalDaysStore"
import { combineArrays } from "@/utils/GeneralUti"

const toggle_local = ref(false)
const disable_weekends = ref(true)
const totalHolidaysSelected = ref(0)
const date = ref()
const maximumNumberOfDaysForEachDay = ref(0)
const disabledDates = ref([])
const isMondayChecked = ref(false)
const isTuesdayChecked = ref(false)
const isThursdayChecked = ref(false)
const isWednesdayChecked = ref(false)
const isFridayChecked = ref(false)
const isSaturdayChecked = ref(false)
const isSundayChecked = ref(false)

const onCheckboxChange = (event: Event, id: string) => {
    const target = event.target as HTMLIonCheckboxElement
    if (id == "monday") {
        isMondayChecked.value = target.checked
    }
    if (id == "tuesday") {
        isTuesdayChecked.value = target.checked
    }
    if (id == "wednesday") {
        isWednesdayChecked.value = target.checked
    }
    if (id == "thursday") {
        isThursdayChecked.value = target.checked
    }
    if (id == "friday") {
        isFridayChecked.value = target.checked
    }
    if (id == "saturday") {
        isSaturdayChecked.value = target.checked
    }
    if (id == "sunday") {
        isSundayChecked.value = target.checked
    }
    saveAndReload()
}

watch(
    () => toggle_local.value,
    async (newValue) => {
        disable_weekends.value = !disable_weekends.value
    }
)

onMounted(async () => {
    loadDataFromStore()
})

function loadDataFromStore() {
    const store = useClinicalDaysStore()
    totalHolidaysSelected.value = store.getHolidaydatesDataSize()
    date.value = store.getHolidaydates()
    maximumNumberOfDaysForEachDay.value = store.getMaximumNumberOfDaysForEachDay()
    disabledDates.value = store.getDisabledDates2() as any
    isMondayChecked.value = store.getAreMondaysDisabled()
    isTuesdayChecked.value = store.getAreTuesdaysDisabled()
    isWednesdayChecked.value = store.getAreWednesdaysDisabled()
    isThursdayChecked.value = store.getAreThursdaysDisabled()
    isFridayChecked.value = store.getAreFridaysDisabled()
    isSaturdayChecked.value = store.getAreSaturdaysDisabled()
    isSundayChecked.value = store.getAreSundaysDisabled()

    if (isSaturdayChecked.value == true || isSundayChecked.value == true) {
        toggle_local.value = true
    }
    if (isSaturdayChecked.value == false && isSundayChecked.value == false) {
        toggle_local.value = false
    }
}

watch(
    () => maximumNumberOfDaysForEachDay.value,
    async (newValue) => {
        saveAndReload()
    }
)

watch(
    () => date.value,
    async (newValue) => {
        saveAndReload()
    }
)

function saveAndReload() {
    saveStateValues()
    loadDataFromStore()
}

function saveStateValues() {
    const storeClinicalDaysStore = useClinicalDaysStore()
    storeClinicalDaysStore.setSelectedMedicalDrugsList(date.value)
    storeClinicalDaysStore.setMaximumNumberOfDaysForEachDay(maximumNumberOfDaysForEachDay.value)
    storeClinicalDaysStore.setAreMondaysDisabled(isMondayChecked.value)
    storeClinicalDaysStore.setAreTuesdaysDisabled(isTuesdayChecked.value)
    storeClinicalDaysStore.setAreWednesdaysDisabled(isWednesdayChecked.value)
    storeClinicalDaysStore.setAreThursdaysDisabled(isThursdayChecked.value)
    storeClinicalDaysStore.setAreFridaysDisabled(isFridayChecked.value)
    storeClinicalDaysStore.setAreSaturdaysDisabled(isSaturdayChecked.value)
    storeClinicalDaysStore.setAreSundaysDisabled(isSundayChecked.value)
}

function nav(url: any) {
    router.push(url)
}
</script>

<style scoped>
    .ilbl {
        font-size: 23px;
    }
    .calender {
        --dp-cell-padding: 30px; /*Padding in the cell*/
        --dp-menu-padding: 20px 5px; /*Menu padding*/
        --dp-font-size: 18px; /*Default font-size*/
    }
    .card_content {
        width: 100%;
    }
    .dp__flex_display {
        display: inherit;
    }
    .toggle-green {
        --toggle-bg-on: #006401;
        --toggle-border-on: #006401;
        --toggle-width: 6.3rem;
        --toggle-height: 1.9rem;
        --toggle-border: 0.525rem;
        --toggle-font-size: 1rem;
        margin-bottom: 30px;
    }
</style>