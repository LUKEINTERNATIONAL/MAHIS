<template>
    <ion-modal class="pim-cls-1" :is-open="is_open" :show-backdrop="true" @didDismiss="$emit('closePopoover', false)" :keyboard-close="false">
        <ion-header class="ion-no-border">
            <ion-toolbar class="pim-cls-1">
                <ion-row>
                    <ion-col>
                        <ion-title class="pim-cls-1"><b style="color: #00190E;">Add Weight/Height</b></ion-title>
                    </ion-col>

                    <ion-col>
                        <ion-row>
                            <ion-col class="ion-text-end">
                                <ion-label class="lbl-tl" style="margin-right: 10px;">Todays Date:</ion-label>
                                <ion-label class="lbl-ct">06 Jul 2024</ion-label>
                            </ion-col>
                        </ion-row>
                    </ion-col>
               
                </ion-row>
                
                <!-- <ion-buttons slot="end">
                    <ion-button @click="$emit('closePopoover', false)">Close</ion-button>
                </ion-buttons> -->
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding pim-cls-1">
            <div class="modal_wrapper">
                <div class="center text_12">
                    <ion-row>
                        <BasicForm :content-data="store.vitals" @update:inputValue="validaterowData($event)"/>
                    </ion-row>
                    <ion-row>
                        <div style="margin-left: 10px; margin-right: 10px; width: 100%;">
                            <DatePicker
                                style="width: 100%;"
                                :place_holder="date_properties[0].placeHolder"
                                @date-up-dated="date_properties[0].dataHandler"
                            />
                        </div>
                    </ion-row>
                </div>
            </div>
        </ion-content>
        <ion-footer :translucent="true" class="ion-no-border">
                <DynamicButton @click="" name="Save" fill="solid" style="float: right; margin: 2%;" />
        </ion-footer>
    </ion-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
})
</script>
<script setup lang="ts">
import { IonContent, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonCol, IonAvatar, IonImg, IonLabel, IonPage, IonFooter } from "@ionic/vue"
import DynamicButton from "@/components/DynamicButton.vue"
import {
    createOutline  
} from "ionicons/icons"
import BasicForm from "@/components/BasicForm.vue"
import { useVitalsStore } from "@/apps/Immunization/stores/VitalsStore"
import DatePicker from "@/components/DatePicker.vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers"
import { VitalsService } from "@/services/vitals_service"
import { useDemographicsStore } from "@/stores/DemographicStore"
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import { BMIService } from "@/services/bmi_service";
const store = useVitalsStore()
const demographicsStore = useDemographicsStore()
let BMI: { color: any; index: any; result: any } 


const props = defineProps<{
    is_open: any,
    person_id: any,
}>()

const date_properties = [
    {
        placeHolder: {default: 'Enter date'} as any,
        property_name: 'dateOfWeightAndHeight',
        dataHandler: dateUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Date required',
        type: 'date',
        skip_validation: false,
    }
]

function dateUpdate_fn1(data: any) {
    const date_data = {
        day: data.value.day,
        month: data.value.month,
        year: data.value.year,
        formattedDate: data.formattedDate
    }
    date_properties[0].dataValue.value = date_data
}

async function validaterowData(event: any){
    const userID: any = Service.getUserID();
    const vitalsInstance= new VitalsService(55, userID);

    const height = vitalsInstance.validator({"inputHeader": "Height*","value":getFieldValue(store.vitals,"Height","value")})


    if(height){
        modifyFieldValue(store.vitals, "Height", "alertsErrorMassage", height.flat(Infinity)[0]);
    modifyFieldValue(store.vitals, "Height", "alertsError", true );
    }else{
        modifyFieldValue(store.vitals, "Height", "alertsErrorMassage", "");
    modifyFieldValue(store.vitals, "Height", "alertsError", false );
    }

    const weight = vitalsInstance.validator({"inputHeader": "Weight*","value":getFieldValue(store.vitals,"Weight","value")})

    if(weight){
        modifyFieldValue(store.vitals, "Weight", "alertsErrorMassage", weight.flat(Infinity)[0]);
    modifyFieldValue(store.vitals, "Weight", "alertsError", true );
    }else{
        modifyFieldValue(store.vitals, "Weight", "alertsErrorMassage", "");
    modifyFieldValue(store.vitals, "Weight", "alertsError", false );
    }

    setBMI(getFieldValue(store.vitals,"Weight","value"), getFieldValue(store.vitals,"Height","value"))
}

async function setBMI(weight: any, height: any) {
    if (demographicsStore.demographics.gender && demographicsStore.demographics.birthdate) {
        BMI = await BMIService.getBMI(
            parseInt(weight),
            parseInt(height),
            demographicsStore.demographics.gender,
            HisDate.calculateAge(demographicsStore.demographics.birthdate, HisDate.currentDate())
        )
    }
    updateBMI()
}

async function updateBMI() {
    const bmiColor = BMI?.color ?? []
    const vitals = store.vitals[0].alerts[0]
    vitals.icon = BMIService.iconBMI(bmiColor)
    vitals.backgroundColor = bmiColor[0]
    vitals.textColor = bmiColor[1]
    vitals.index = "BMI " + BMI?.index ?? ""
    vitals.value = BMI?.result ?? ""
}
</script>
<style scoped>
    .lbl-tl {
        min-width: 20px;
        color: #B3B3B3 !important;
        white-space: nowrap;
    }
    .lbl-ct {
        white-space: nowrap;
        color: #08475E;
    }
    .pim-cls-1 {
        --background: #ffff;
    }
    ion-footer {
        --ion-toolbar-background: #fff;
    }
    ion-modal {
        --width: 94%;
        --height: 70%;
        --border-radius: 10px;
    }
    .dashed-hr {
        border: none;
        border-top: 2px dashed #B3B3B3;
        margin: 20px 0; /* Adjust as needed */
    }
    .modal_wrapper {
    padding: 0px 19px;
    }
</style>