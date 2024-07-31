<template>
    <ion-modal :is-open="is_open" :show-backdrop="true" @didDismiss="$emit('closePopoover', false)" :keyboard-close="false">
        <ion-header>
            <ion-toolbar>
                <ion-title
                    ><b>Add User Details</b></ion-title
                >
                <ion-buttons slot="end">
                    <ion-button @click="$emit('closePopoover', false)">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="">
                <div class="center text_12">
                    <ion-row>
                        <!-- <basic-form :contentData="[]"> </basic-form> -->
                        <ion-col>
                            <adduser
                                :user_id="user_id"
                                :action="action"
                                @save-event="closeModalAndOpenEditUser"
                            />
                        </ion-col>
                       
                    </ion-row>
                </div>
            </div>
        </ion-content>
        <ion-footer :translucent="true">
            <ion-toolbar>
                <DynamicButton @click="saveAction" name="Save" fill="clear" iconSlot="icon-only" style="float: right" />
            </ion-toolbar>
        </ion-footer>
    </ion-modal>

    <editUserModal
        :is_open="isPopooverOpen"
        :user_id="user_id"
        @close-popoover="isPopooverOpen = false"
    />
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
import adduser from "./addUser.vue"
import { checkmark, pulseOutline } from "ionicons/icons"
import { ref } from "vue"
import { icons } from "@/utils/svg"

import BasicForm from "@/components/BasicForm.vue"
import DynamicButton from "@/components/DynamicButton.vue"
import editUserModal from "./editUserModal.vue"

const action = ref('') as any
const isPopooverOpen = ref(false)
const user_id = ref() as any

const props = defineProps<{
    is_open: any,
    user_id: any,
}>()

const emit = defineEmits<{
    (e: "closePopoover", ObjectsArray: any): void
}>()

function saveAction() {
    action.value = generateRandomStrings(100, 3)
}

function closeModal() {
    modalController.dismiss()
}

function closeModalAndOpenEditUser(data: any) {
    user_id.value = data
    isPopooverOpen.value = true
    closeModal()
}

function generateRandomStrings(numStrings: number, stringLength: number): any{
  const getRandomChar = (type: string) => {
    const start = type === 'number' ? 48 : type === 'uppercase' ? 65 : 97;
    return String.fromCharCode(Math.floor(Math.random() * (type === 'number' ? 10 : 26)) + start);
  };

  return Array.from({ length: numStrings }, () =>
    Array.from({ length: stringLength }, () => getRandomChar(['number', 'uppercase', 'lowercase'][Math.floor(Math.random() * 3)]))
      .join('')
  );
}

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
