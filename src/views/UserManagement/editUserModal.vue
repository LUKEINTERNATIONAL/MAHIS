<template>
    <ion-modal :is-open="is_open" :show-backdrop="true" @didDismiss="$emit('closePopoover', false)" :keyboard-close="false">
        <ion-header>
            <ion-toolbar>
                <ion-title
                    ><b>User Details Proile</b></ion-title
                >
                <ion-buttons slot="end">
                    <ion-button @click="$emit('closePopoover', false)">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="modal_wrapper">
                <div class="center text_12">
                    <ion-row>
                        <!-- <basic-form :contentData="[]"> </basic-form> -->
                        <ion-col>
                            <editUser/>
                        </ion-col>
                       
                    </ion-row>
                </div>
            </div>
        </ion-content>
        <ion-footer :translucent="true">
            <ion-toolbar>
                <DynamicButton @click="" name="Save" fill="clear" iconSlot="icon-only" style="float: right" />
            </ion-toolbar>
        </ion-footer>
    </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { text } from "ionicons/icons"
import { it } from "date-fns/locale"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
})
</script>
<script setup lang="ts">
import { IonButtons, IonButton, IonModal, IonAvatar, IonImg, IonLabel, IonPage, IonFooter } from "@ionic/vue"
import { IonContent, IonHeader, IonItem, IonCol, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue"
import editUser from "./editUser.vue"
import { checkmark, pulseOutline } from "ionicons/icons"
import { ref } from "vue"
import { icons } from "@/utils/svg"

import BasicForm from "@/components/BasicForm.vue"
import DynamicButton from "@/components/DynamicButton.vue"

const props = defineProps<{
    is_open: any,
}>()

const emit = defineEmits<{
    (e: "closePopoover", ObjectsArray: any): void
}>()




</script>
<style scoped>
ion-footer {
    --ion-toolbar-background: #f4f4f4f4;
}
ion-modal {
    --width: 90%;
    --height: 94%;
}
</style>
