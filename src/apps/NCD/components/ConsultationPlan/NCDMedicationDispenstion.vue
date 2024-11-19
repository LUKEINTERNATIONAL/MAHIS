<template>
    <ion-page>
        <NavigationMenu/>
        <ion-content :fullscreen="true">
            <div class="p-4">
                <template v-for="(medicationGroup, date) in groupedMedications" :key="date">
                    <h2 class="text-lg font-bold mb-2">{{ formatHeaderDate(date) }}</h2>
                    <ion-card v-for="medication in medicationGroup" :key="medication.order_id" class="mb-4">
                        <ion-card-header>
                            <ion-card-title>{{ medication.drug.name }}</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <div class="medication-details">
                                <div class="flex justify-between mb-3">
                                    <span>Dose: {{ medication.dose }} {{ medication.units }}</span>
                                    <span>Frequency: 
                                        {{ getFrequencyLabel(medication.frequency) }} 
                                        ({{ medication.frequency }})
                                    </span>
                                </div>
                                <div class="flex items-center mb-3">
                                    <ion-input 
                                        type="text" 
                                        placeholder="Amount to Dispense"
                                        v-model="medication.amountToDispense"
                                        class="mr-2 dose-input bordered-input"
                                    ></ion-input>
                                    <ion-button 
                                        size="small" 
                                        color="light"
                                        style="margin-top: 10px"
                                        @click="setAmountAsPrescribed(medication)"
                                    >
                                        As Prescribed
                                    </ion-button>
                                </div>
                                <div class="mt-3 flex space-x-2">
                                    <ion-button 
                                        color="primary" 
                                        @click="dispenseMedication(medication)"
                                        :disabled="!medication.amountToDispense || medication.dispensed"
                                    >
                                        {{ medication.dispensed ? 'Dispensed' : 'Dispense' }}
                                    </ion-button>
                                    <ion-button 
                                        color="secondary"
                                        style="margin-left: 20px;" 
                                        @click="viewDetails(medication)"
                                    >
                                        View Details
                                    </ion-button>
                                </div>
                            </div>
                        </ion-card-content>
                    </ion-card>
                </template>
                <div v-if="medications.length === 0" class="text-center">
                    No medications prescribed
                </div>
            </div>

            <ion-modal :is-open="selectedMedication !== null" @did-dismiss="selectedMedication = null">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Medication Details</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="selectedMedication = null">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content v-if="selectedMedication" class="p-4">
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
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { 
    IonContent, 
    IonPage, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonInput
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import NavigationMenu from '@/apps/Immunization/components/Reports/NavigationMenu.vue';
import { useDemographicsStore } from "@/stores/DemographicStore";
import { DrugOrderService } from "@/services/drug_order_service";
import SetUser from "@/views/Mixin/SetUser.vue";
import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";

export default defineComponent({
    name: "MedicationDispensation",
    mixins: [SetUser],
    components: {
        IonContent,
        IonPage,
        NavigationMenu,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonButton,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonInput
    },
    data() {
        return {
            medications: [],
            selectedMedication: null as any
        };
    },
    computed: {
        ...mapState(EIRreportsStore, ["navigationPayload"]),
        ...mapState(useDemographicsStore, ["demographics"]),
        groupedMedications() {
            return this.medications.reduce((groups: any, medication: any) => {
                const date = medication.order.date_created.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(medication);
                return groups;
            }, {}) as any;
        }
    },
    async mounted() {
        this.initOwnNavData();
        await this.prescribedMedications();
    },
    methods: {
        initOwnNavData() {
            const store = EIRreportsStore();
            store.setNavigationPayload('Dispense Medication', true, false, '/', 'patientProfile');
        },
        async prescribedMedications() {
            this.medications = await DrugOrderService.drugOrders(this.demographics.patient_id);
            this.medications = this.medications.map((med: any) => ({
                ...med,
                amountToDispense: null,
                dispensed: false
            })) as any;
        },
        getFrequencyLabel(code: any) {
            const frequency = DRUG_FREQUENCIES.find(f => f.code === code);
            return frequency ? frequency.label : 'Unknown';
        },
        setAmountAsPrescribed(medication: any) {
            medication.amountToDispense = medication.dose;
        },
        async dispenseMedication(medication: any) {
            try {
                // await DrugOrderService.dispenseMedication({
                //     order_id: medication.order_id,
                //     amount: medication.amountToDispense
                // });
                // medication.dispensed = true;
            } catch (error) {
                console.error('Dispensation failed', error);
            }
        },
        viewDetails(medication: any) {
            this.selectedMedication = medication;
        },
        formatHeaderDate(dateString: any) {
            return new Date(dateString).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        },
        formatFullDate(dateString: any) {
            return new Date(dateString).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
});
</script>
<style>
    .dose-input {
        --padding-start: 8px;
        --padding-end: 8px;
        margin-left: 10px;
        width: 200px;
    }

    .bordered-input {
        border: 2px solid #ccc;
        border-radius: 4px;
        padding: 4px;
    }
</style>