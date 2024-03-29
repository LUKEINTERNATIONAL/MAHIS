<template>
    <ion-item class="input_item" style="min-height: 120px; margin-top: 14px">
    <ion-label> <ion-icon slot="start" :icon="editPen" aria-hidden="true"></ion-icon> </ion-label>
    <ion-textarea
        @ionInput="validateNotes"
        v-model="refNotes"
        style="min-height: 120px"
        class="inputTpln"
        :auto-grow="true"
        fill="outline"
    ></ion-textarea>
</ion-item>
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
} from "@ionic/vue";
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { icons } from "@/utils/svg"

const editPen = icons.editPen;
const refNotes = ref()
function validateNotes(ev: any) {
    let value = ev.target.value
}


</script>