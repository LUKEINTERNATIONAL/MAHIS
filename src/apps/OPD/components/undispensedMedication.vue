<template>
    <ion-row style="margin-bottom: 2rem; font-weight: bold;">
        <ion-col><ion-label>Undispensed Medications</ion-label></ion-col>
        <ion-col><ion-label>Why has this prescription not been dispensed?</ion-label></ion-col>
    </ion-row>
    <ion-row style="display: flex; align-items: center;">
        <dynamic-list @click="" :_selectedMedicalDrugsList="prescribedList"
            :show_actions_buttons="false" /> <ion-col>
<template>    
<ion-row style="margin-bottom: 2rem; font-weight: bold;">
    <ion-col><ion-label>Undispensed Medications</ion-label></ion-col>
    <ion-col><ion-label>Why has this prescription not been dispensed?</ion-label></ion-col>
</ion-row>
<ion-row style="display: flex; align-items: center;">
    <dynamic-list :_selectedMedicalDrugsList="prescribedList" :show_actions_buttons="false" /> <ion-col>

        <ion-item class="input_item">
            <span class="spcls" id="chooseType" @click="popoverOpenForFrequencyFn2">
                <ion-input placeholder="Select reason" v-model="frequency"></ion-input>
                <ion-icon v-if="!showPopoverOpenForFrequency" :icon="chevronDownOutline" />
                <ion-icon v-if="showPopoverOpenForFrequency" :icon="chevronUpOutline" />
            </span>

            <ion-popover class="popover-al" :show-backdrop="false" trigger="chooseType" trigger-action="click"
                @didDismiss="showPopoverOpenForFrequency = false">
                <ion-content color="light" class="ion-padding content-al">
                    <ion-label>Choose the reason:</ion-label>
                    <ion-list class="list-al">
                        <div class="item-al" v-for="(item, index) in reasonsList" :key="index">
                            <ion-label @click="selectFrequency(index)"
                                style="display: flex; justify-content: space-between">
                                {{ item.label }}
                                <ion-icon v-if="item.selected" class="icon-al" :icon="checkmarkOutline"></ion-icon>
                            </ion-label>
                        </div>
                    </ion-list>
                </ion-content>
            </ion-popover>
        </ion-item>
    </ion-col>
</ion-row>
</template>
<script lang="ts">

import { defineComponent } from "vue";
import { useDispensationStore } from '@/apps/OPD/stores/DispensationStore'
import { mapState } from "pinia";
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
} from "@ionic/vue";
import {
    checkmark,
    pulseOutline,
    addOutline,
    closeOutline,
    checkmarkOutline,
    filter,
    chevronDownOutline,
    chevronUpOutline,
    codeSlashOutline,
} from "ionicons/icons";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import DynamicList from "@/components/DynamicList.vue";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";

export default defineComponent({
    watch: {},
    name: "xxxComponent",
    computed: {
        ...mapState(useDispensationStore, ["previousDrugPrescriptions"]),
    },
});
</script>
<script setup lang="ts">

const popoverOpen = ref(false);
const prescPopoverOpen = ref(false);
const frequency = ref("");
const showPopoverOpenForFrequency = ref(false);
const reasonsList = [{ label: "Out of stock", selected: false }, { label: "Wrong prescription", selected: false }]

function selectFrequency(index: any) {
    reasonsList.forEach((item) => {
        item.selected = false;
    });
    reasonsList[index].selected = !reasonsList[index].selected;
    frequency.value = reasonsList[index].label;
}
function openPopover(e: any) {
    popoverOpen.value = true;
}

function openPrescPopover(e: any) {
    // const prescEvent = e
    prescPopoverOpen.value = true;
}
function popoverOpenForFrequencyFn2() {
    showPopoverOpenForFrequency.value = true;
}
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}

ion-item.medicalAl {
    --background: #fff;
    --border-radius: 5px;
}

ion-button.medicalAlBtn {
    --background: #fecdca;
    --color: #b42318;
    text-transform: none;
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

ion-button.addMedicalTpBtn {
    --background: #ddeedd;
    --color: #006401;
    text-transform: none;
    font-weight: 600;
    font-size: 16px;
}

ion-button.medicalAlAddBtn {
    font-size: large;
}

ion-icon.icon-al {
    /* margin-left: 40%; */
    font-size: x-large;
    margin-bottom: -5px;
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

ion-content.content-al {
    --background: #fff;
}

ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}

.input_item {
    width: fit-content;
}

.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
}

.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
}

.action_buttons:hover {
    cursor: pointer;
}

.spcls {
    display: flex;
    align-items: center;
}

.previousView {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
}

.previousLabel {
    font-weight: 600;
    color: #000;
}

.previousLabelDate {
    font-weight: 600;
    color: #000;
    margin: 2%;
}

.previousSecDrgs {
    margin: 2%;
}

.notes_p {
    margin: 4%;
}
</style>