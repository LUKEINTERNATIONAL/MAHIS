<template>
    <ion-header style="display: flex; justify-content: space-between">
        <ion-title class="modalTitle">
            <div class="medication-details-header">
                <ion-icon :icon="medkit" class="ion-margin-end"></ion-icon>
                <span>Medication Details</span>
            </div>
        </ion-title>
        <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="modal_wrapper">
            <div class="medication-details-modal">
                <h2 class="text-xl font-bold mb-4">{{ selectedMedication.drug.name }}</h2>
                <div class="grid grid-cols-2 gap-3">
                    <div><strong>Order ID:</strong> {{ selectedMedication.order_id }}</div>
                    <div><strong>Drug ID:</strong> {{ selectedMedication.drug_inventory_id }}</div>
                    <div><strong>Dose:</strong> {{ selectedMedication.dose }} {{ selectedMedication.units }}</div>
                    <div><strong>Equivalent Daily Dose:</strong> {{ selectedMedication.equivalent_daily_dose }}</div>
                    <div><strong>Frequency:</strong> {{ getFrequencyLabel(selectedMedication.frequency) }}</div>
                    <div><strong>Order Type:</strong> {{ selectedMedication.order.order_type_id }}</div>
                    <div><strong>Start Date:</strong> {{ formatFullDate(selectedMedication.order.start_date) }}</div>
                    <div><strong>Date Created:</strong> {{ formatFullDate(selectedMedication.order.date_created) }}</div>
                    <div><strong>Orderer:</strong> {{ selectedMedication.order.orderer }}</div>
                    <div><strong>Instructions:</strong> {{ selectedMedication.order.instructions }}</div>
                </div>
            </div>
        </div>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button @click="dismiss" color="primary" style="float: right; margin-bottom: 20px; margin-right: 20px;">
                    <ion-icon :icon="closeIcon" slot="start"></ion-icon>
                    Close
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonIcon,
  IonPage,
  IonTitle,
  IonRow,
  IonCol,
  IonButton,
  modalController,
} from "@ionic/vue";
import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";
import { medkit, close } from "ionicons/icons";
import { icons } from "@/utils/svg";

export default defineComponent({
    name: "MedicationDetailsModal",
    components: {
        IonContent,
        IonHeader,
        IonFooter,
        IonPage,
        IonTitle,
        IonRow,
        IonCol,
        IonButton,
        IonIcon,
    },
    props: {
        selectedMedication: {
            type: Object,
            default: null,
        },
    },
    data() {
      const dismiss = () => {
        this.$emit("close");
        return modalController.dismiss();
            
        };

        return {
            iconsContent: icons,
            medkit,
            closeIcon: close,
            dismiss,
        };
    },
    methods: {
        formatFullDate(dateString: any) {
            if (!dateString) return "N/A";
            return new Date(dateString).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
        },
        getFrequencyLabel(code: any) {
            const frequency = DRUG_FREQUENCIES.find((f) => f.code === code);
            return frequency ? frequency.label : "Unknown";
      },
    },
});
</script>

<style scoped>
.medication-details-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.medication-details-modal {
    font-family: Arial, sans-serif;
}

.text-xl {
    font-size: 1.25rem;
}

.font-bold {
    font-weight: bold;
}

.mb-4 {
    margin-bottom: 1rem;
}

.grid {
    display: grid;
}

.grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
}

.gap-3 {
    gap: 1rem;
}
</style>
