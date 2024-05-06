<template>
        <ion-modal class="pim-cls-1" :is-open="is_open" :show-backdrop="true" @didDismiss="$emit('closePopoover', false)" :keyboard-close="false">

        <ion-content class="ion-padding pim-cls-1">
            <div class="modal_wrapper">
                <div class="center text_12">
                   
                        <ion-row>
                            <ion-col>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="lbl-tl">Full Name:</ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label class="lbl-ct">John Doe</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-col>

                            <ion-col>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="lbl-tl">Sex</ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label class="lbl-ct">Male</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-col> 
                        </ion-row>

                        <ion-row>
                            <ion-col>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="lbl-tl">Date of Birth:</ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label class="lbl-ct">19 April 2024</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-col>

                            <ion-col>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="lbl-tl">Age:</ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label class="lbl-ct">11 weeks</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-col> 
                        </ion-row>


                        <ion-row>
                            <ion-col>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="lbl-tl">Contacts:</ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label class="lbl-ct">09994587345</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-col>

                            <ion-col></ion-col>
                        </ion-row>

                        <hr class="dashed-hr">

                        
                    
                </div>
            </div>


        </ion-content>
        <ion-footer :translucent="true" class="ion-no-border">
                <DynamicButton @click="" name="Edit Info" fill="solid" iconSlot="icon-only" style="float: right; margin: 2%;" />
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
import { IonContent, IonButton, IonModal, IonRow, IonCol, IonAvatar, IonImg, IonLabel, IonPage, IonFooter } from "@ionic/vue"
import DynamicButton from "@/components/DynamicButton.vue"

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
    }
    pim-cls-1 {
        --background: #ffff;
    }
    .custom-toolbar-cls {
        --background: #ffff; 
    }
    ion-footer {
        --ion-toolbar-background: #fff;
    }
    ion-modal {
        --width: 94%;
        --height: 50%;
        --border-radius: 10px;

    }
    .dashed-hr {
        border: none;
        border-top: 2px dashed #B3B3B3;
        margin: 20px 0; /* Adjust as needed */
    }
</style>