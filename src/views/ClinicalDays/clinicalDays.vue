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
                    <ion-checkbox class="ilbl" label-placement="end">Monday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end">Tuesday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end">Wednesday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end">Thursday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" label-placement="end">Friday</ion-checkbox>
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
                                    :offLabel="'inactive'"
                                    :onLabel="'active'"
                                />
                            </div>
                        </ion-col>
                        <ion-col size="8">
                            <div style="margin-top: 30px;">
                                <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end">Saturday</ion-checkbox>
                                <br />
                                <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end">Sunday</ion-checkbox>
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
}

watch(
    () => maximumNumberOfDaysForEachDay.value,
    async (newValue) => {
        saveStateValuesState()
        loadDataFromStore()
    }
)

watch(
    () => date.value,
    async (newValue) => {
        saveStateValuesState()
        loadDataFromStore()
    }
)

function saveStateValuesState() {
    const storeClinicalDaysStore = useClinicalDaysStore()
    storeClinicalDaysStore.setSelectedMedicalDrugsList(date.value)
    storeClinicalDaysStore.setMaximumNumberOfDaysForEachDay(maximumNumberOfDaysForEachDay.value)
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
        --toggle-width: 5.3rem;
        --toggle-height: 1.9rem;
        --toggle-border: 0.525rem;
        --toggle-font-size: 1rem;
        margin-bottom: 30px;
    }
</style>