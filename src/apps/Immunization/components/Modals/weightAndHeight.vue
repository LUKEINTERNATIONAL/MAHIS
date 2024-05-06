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
                            <ion-col>
                                <ion-label class="lbl-tl">Todays Date:</ion-label>
                            </ion-col>
                            <ion-col>
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

                </div>
            </div>
        </ion-content>
        <ion-footer :translucent="true" class="ion-no-border">
                <DynamicButton @click="" name="Edit Info" fill="solid" :icon="createOutline" style="float: right; margin: 2%;" />
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

const props = defineProps<{
    is_open: any,
    person_id: any,
}>()

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