<template>
    <ion-page>
        <NavigationMenu/>
        <ion-content :fullscreen="true">
            <div class="p-4">
                <ion-card v-for="medication in medications" :key="medication.order_id" class="mb-4">
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
                            <div class="mt-3 flex space-x-2">
                                <ion-button color="primary" @click="dispenseMedication(medication)">Dispense</ion-button>
                                <ion-button color="secondary" @click="viewDetails(medication)">View Details</ion-button>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
                <div v-if="medications.length === 0" class="text-center">
                    No medications prescribed
                </div>
            </div>
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
    IonButton
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
        IonButton
    },
    data() {
        return {
            medications: []
        };
    },
    computed: {
        ...mapState(EIRreportsStore, ["navigationPayload"]),
        ...mapState(useDemographicsStore, ["demographics"]),
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
        },
        getFrequencyLabel(code) {
            const frequency = DRUG_FREQUENCIES.find(f => f.code === code);
            return frequency ? frequency.label : 'Unknown';
        },
        dispenseMedication(medication) {
            console.log('Dispensing medication', medication);
        },
        viewDetails(medication) {
            console.log('Viewing medication details', medication);
        }
    }
});
</script>