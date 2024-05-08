<template>
    <div class="pim-cls-1">
        <div class="ion-padding pim-cls-1">
            <div class="modal_wrapper">
                <div class="center text_12">
                    <h4 class="PI-cls-1">Personal Information</h4>
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

                    <hr class="dashed-hr" />

                    <h4 class="PI-cls-1">Gurdian Information</h4>
                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Full Name:</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Jane Doe</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>

                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Age</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">42</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Relationship:</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Mother</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>

                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Contacts</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">0999526423</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>

                    <hr class="dashed-hr" />

                    <h4 class="PI-cls-1">Addresses</h4>
                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Current Address:</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Kaluluma, Side B</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col></ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">District(s):</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Mzimba</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col></ion-col>
                    </ion-row>

                    <hr class="dashed-hr" style="margin-bottom: 0px !important" />
                </div>
            </div>
        </div>
        <ion-footer :translucent="true" class="ion-no-border">
            <DynamicButton name="Edit Info" fill="solid" :icon="createOutline" style="float: right; margin: 2%" />
        </ion-footer>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import { IonContent, IonButton, IonModal, IonRow, IonCol, IonAvatar, IonImg, IonLabel, IonPage, IonFooter } from "@ionic/vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { createOutline } from "ionicons/icons";

// const props = defineProps<{
//     is_open: any;
//     person_id: any;
// }>();
</script>
<style scoped>
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.lbl-ct {
    white-space: nowrap;
    color: #08475e;
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
    --height: 70%;
    --border-radius: 10px;
}
.dashed-hr {
    border: none;
    border-top: 2px dashed #b3b3b3;
    margin: 20px 0; /* Adjust as needed */
}
.modal_wrapper {
    padding: 0px 19px;
}
.PI-cls-1 {
    color: #1F2221D4;
}
</style>
