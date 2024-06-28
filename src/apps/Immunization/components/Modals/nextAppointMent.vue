<template>
    <ion-row style="margin-top: 10px;">
        <ion-col style="margin-left: -3px">
            <div class="om">Set Next Appointment Date</div>
        </ion-col>
        <ion-col size="6" style="text-align: right;">
            <ion-label class="lbl-tl" style="font-size: 13"> Todays Date: <span class="lbl-ct">{{ sessionDate }}</span></ion-label>
        </ion-col>
    </ion-row>

    <ion-row style="margin-top: 20px; ">
        <ion-col >
            <VueDatePicker
                v-model="date"
                :enable-time-picker="false"
                inline
                auto-apply
                multi-dates
                :disabled-dates="disablePastDates"
            >
                <template #day="{ day }">
                        <template v-if="true">
                            <p>
                                {{ day }}<sup style="color: #999">{{ 34 }}</sup>
                            </p>
                        </template>
                        <template v-else>
                            {{ day }}
                        </template>
                    </template>
            </VueDatePicker>
        </ion-col>
    </ion-row>

    <ion-row style="margin-top: 10px; margin-bottom: 10px;">
        <ion-col>
            <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid"  style="width: 130px">
                Cancel
                <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
            </ion-button>
        </ion-col>

        <ion-col style="text-align: right">
            <ion-button @click="saveBatch" class="btnText" fill="solid"  style="width: 130px">
                save
                <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
            </ion-button>
        </ion-col>
    </ion-row>
    
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
    IonCheckbox,
    modalController
} from "@ionic/vue"
import { ref, onMounted,computed, watch } from "vue"
import { chevronBackOutline, checkmark } from "ionicons/icons"
import Toggle from '@vueform/toggle'
import router from '@/router'
import HisDate from "@/utils/Date"
import { useClinicalDaysStore } from "@/stores/clinicalDaysStore"
import { combineArrays } from "@/utils/GeneralUti"
import { Service } from '@/services/service'


const date = ref()
const sessionDate = HisDate.toStandardHisDisplayFormat(Service.getSessionDate())

// watch(
//     () => toggle_local.value,
//     async (newValue) => {
//         disable_weekends.value = !disable_weekends.value
//     }
// )

onMounted(async () => {
    loadDataFromStore()
})

function loadDataFromStore() {
    const store = useClinicalDaysStore()
    date.value = store.getHolidaydates()

}

// watch(
//     () => maximumNumberOfDaysForEachDay.value,
//     async (newValue) => {
//         saveAndReload()
//     }
// )

// watch(
//     () => date.value,
//     async (newValue) => {
//         saveAndReload()
//     }
// )

function saveAndReload() {
    saveStateValues()
    loadDataFromStore()
}

function disablePastDates(date: any) {
      const today = new Date(Service.getSessionDate())
      // Set the time of today to 00:00:00 to disable dates based only on the date part
      today.setHours(0, 0, 0, 0);
      return date < today;
}

function saveStateValues() {
    const storeClinicalDaysStore = useClinicalDaysStore()
}

function nav(url: any) {
    router.push(url)
}

function dismiss() {
    modalController.dismiss()
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
    .lbl-tl {
        min-width: 20px;
        color: #b3b3b3 !important;
        white-space: nowrap;
    }
    .lbl-ct {
        white-space: nowrap;
        color: #08475e;
        font-size: 14px;
    }
    .btnText {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
    }
</style>