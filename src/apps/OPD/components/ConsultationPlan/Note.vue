<template>
    <ion-item class="input_item">
    <ion-label> <ion-icon slot="start" :icon="editPen" aria-hidden="true"></ion-icon> </ion-label>
    <ion-textarea
        @ionInput="validateNotes"
        v-model="refNotes"
        style="min-height: 3px !important"
        class="inputTpln"
        :auto-grow="true"
        fill="outline"
        :placeholder="props.place_holder.default"
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
const notesObject = ref()

const props = defineProps<{
    place_holder: {
      type: string,
      default: ''
    }
}>()

function validateNotes(ev: any) {
    let value = ev.target.value
    notesObject.value = value
    notesUpDated()
}

const emit = defineEmits<{
  (e: "notesUpDated", notesObject: any): void;
}>();

function notesUpDated() {
  emit("notesUpDated", notesObject)
}


</script>