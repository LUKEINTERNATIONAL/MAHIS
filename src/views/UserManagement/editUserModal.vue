<template>
    <ion-modal :is-open="is_open" :show-backdrop="true" @didDismiss="$emit('closePopoover', false)" :keyboard-close="false">
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <div style="display: flex; align-items: center;">
                        <ion-icon :icon="personAddOutline" class="sub-menu-icon"></ion-icon>
                        <b style="margin-left: 6px;">User Profile</b>
                     </div>
                </ion-title>
                <ion-buttons slot="end">
                    <ion-title>
                        <ion-button @click="$emit('closePopoover', false)" fill="solid">
                            <span style="font-weight: 400; font-size: 19px;">
                                <div style="display: flex; align-items: center;">
                                    <ion-icon :icon="closeOutline" slot="start" class="sub-menu-icon"></ion-icon>
                                    <span style="margin-left: 6px;">Close</span>
                                </div>
                            </span>
                        </ion-button>
                    </ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="" >
                <div class="center text_12">
                    <ion-row>
                        <!-- <basic-form :contentData="[]"> </basic-form> -->
                        <ion-col>
                            <editUser
                                :user_id="user_id"
                                :toggle="true"
                                :action="action"
                                @save="isFormValid"
                            />
                        </ion-col>
                       
                    </ion-row>
                </div>
            </div>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-title>
                        <ion-button @click="saveAction" fill="solid" color="success">
                            <span style="font-weight: 400; font-size: 20px;">
                                <div style="display: flex; align-items: center;">
                                    <ion-icon :icon="saveOutline" slot="start" class="sub-menu-icon"></ion-icon>
                                    <span style="margin-left: 6px;">Save</span>
                                </div>
                            </span>
                        </ion-button>
                    </ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { closeOutline, saveOutline, personAddOutline } from "ionicons/icons"
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
import { ref } from "vue"

const action = ref('') as any

const props = defineProps<{
    is_open: any,
    user_id: any,
}>()

const emit = defineEmits<{
    (e: "closePopoover", ObjectsArray: any): void
    (e: "save", ObjectsArray: any): void
}>()

function saveAction() {
    action.value = generateRandomStrings(100, 3)
}

function isFormValid(data: any) {
    if (data == true) {
        emit("save", data)
        closeModal()
    }
    if (data == false) {
        
    }
}

function closeModal() {
    modalController.dismiss()
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
    --border-radius: 12px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    --backdrop-opacity: var(--ion-backdrop-opacity, 0.32);
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>
