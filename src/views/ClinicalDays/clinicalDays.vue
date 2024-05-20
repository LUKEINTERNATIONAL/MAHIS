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

                <ion-col>
                    <ion-label style="font-weight: bold; font-size: 15px;">Enbale or disable weekends</ion-label>
                    <Toggle
                        class="toggle-green"
                        :classes="{
                            container: 'inline-block rounded-full outline-none focus:ring focus:ring-green-500 focus:ring-opacity-30',
                        }" 
                        v-model="toggle_local"
                        :offLabel="'inactive'"
                        :onLabel="'active'"
                    />

                    <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end">Saturday</ion-checkbox>
                    <br />
                    <ion-checkbox class="ilbl" :disabled="disable_weekends" label-placement="end">Sunday</ion-checkbox>
                    <br />
                </ion-col>
            </ion-row>

            <ion-row style="margin-bottom: 20px; margin-top: 20px;">
                <ion-label style="font-weight: bold; font-size: 22px;">Set Clinical Holiday(s)</ion-label>
            </ion-row>

            
            <ion-row>
                
                    <ion-col size="7">
                        <VueDatePicker
                            :enable-time-picker="false"
                            inline
                            auto-apply
                        />
                    </ion-col>

                    <ion-col size="3">
                        <div style="margin-left: 40px;">
                            <ion-label style="font-weight: bold; font-size: 22px;">Total Holidays Set</ion-label>
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
import { ref, onMounted, watch } from "vue"
import { chevronBackOutline, checkmark } from "ionicons/icons"
import Toggle from '@vueform/toggle'
import router from '@/router'

const toggle_local = ref(false)
const disable_weekends = ref(true)

watch(
    () => toggle_local.value,
    async (newValue) => {
        disable_weekends.value = !disable_weekends.value
    }
)

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
    }
</style>