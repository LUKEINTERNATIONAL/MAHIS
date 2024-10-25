<template>
    <ion-modal :is-open="popoverOpen" :show-backdrop="true" @didDismiss="$emit('closePopoover', false)" :keyboard-close="keyboardClose">
        <ion-header>
            <ion-toolbar>
                <ion-title
                    ><b>Lab results for ({{ content.name }}) test</b></ion-title
                >
                <ion-buttons slot="end">
                    <ion-button @click="$emit('closeModal')">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="modal_wrapper">
                <div class="center text_12">
                    <ion-row>
                        <ion-col size="4" v-for="(item1, index1) in content.result" :key="index1">
                            <ion-row>
                                <ion-col size="8">{{ item1.indicator.name }}</ion-col>
                                <ion-col class="bold" size="0.5">:</ion-col>
                                <ion-col class="bold" size="2">{{ item1.value }}</ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">
import { IonButtons, IonButton, IonModal, IonAvatar, IonImg, IonLabel, IonPage, IonFooter } from "@ionic/vue";
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import { resetPatientData } from "@/services/reset_data";
import { useLabResultsStore } from "@/stores/LabResults";
import { mapState } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import { PatientLabResultService } from "@/services/patient_lab_result_service";
import HisDate from "@/utils/Date";
import { useDemographicsStore } from "@/stores/DemographicStore";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import DynamicButton from "@/components/DynamicButton.vue";

export default defineComponent({
    components: {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonList,
        IonAvatar,
        IonImg,
        IonLabel,
        IonPage,
        IonMenu,
        BasicForm,
        IonFooter,
        DynamicButton,
    },
    data() {
        return {
            popoverStatus: null,
        };
    },
    props: {
        keyboardClose: {
            type: Boolean,
            default: false,
        },
        keepContentsMounted: {
            type: Boolean,
            default: false,
        },
        content: {
            default: [] as any,
        },
        popoverOpen: {
            type: Boolean,
            default: false,
        },
        event: {
            type: Event,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
    methods: {
        dismiss() {
            modalController.dismiss();
        },

        nav(url: any, action: any) {
            this.dismiss();
            this.$router.push(url);
        },
    },
});
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
