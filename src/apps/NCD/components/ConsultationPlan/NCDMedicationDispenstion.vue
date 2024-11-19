<template>
    <ion-page>
        <NavigationMenu />
        <ion-content>
            <div class="p-4">
                <template v-for="(medicationGroup, date) in groupedMedications" :key="date">
                    <h2 class="text-lg font-bold mb-2">{{ formatHeaderDate(date) }}</h2>
                    <ion-row>
                        <!-- Responsive Column for Date Header -->
                        <ion-col size="12" size-md="6" size-lg="4">
                            <h3 class="text-md font-medium">{{ date }}</h3>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <!-- Each Medication Card in its Column -->
                        <ion-col 
                            v-for="medication in medicationGroup" 
                            :key="medication.order_id" 
                            size="12" 
                            size-md="6" 
                            size-lg="4"
                        >
                            <ion-card class="mb-4">
                                <ion-card-header>
                                    <ion-card-title>
                                        <ion-icon :icon="medkit"></ion-icon>
                                        {{ medication.drug.name }}
                                    </ion-card-title>
                                </ion-card-header>
                                <ion-card-content>
                                    <div class="medication-details">
                                        <div class="flex justify-between mb-3">
                                            <span>
                                                <ion-icon :icon="medication"></ion-icon>
                                                Dose: {{ medication.dose }} {{ medication.units }}
                                            </span>
                                            <span>
                                                <ion-icon :icon="timeOutline"></ion-icon>
                                                Frequency: 
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
                                                <ion-icon :icon="clipboardOutline" size="small"></ion-icon>
                                                <span style="color: darkseagreen;">
                                                    As Prescribed
                                                </span>
                                            </ion-button>
                                        </div>
                                        <div class="mt-3 flex space-x-2">
                                            <ion-button 
                                                color="primary" 
                                                @click="dispenseMedication(medication)"
                                                :disabled="!medication.amountToDispense || medication.dispensed"
                                            >
                                                <ion-icon :icon="checkmarkDoneCircleOutline"></ion-icon>
                                                {{ medication.dispensed ? 'Dispensed' : 'Dispense' }}
                                            </ion-button>
                                            <ion-button 
                                                color="secondary"
                                                style="margin-left: 20px;" 
                                                @click="viewDetails(medication)"
                                            >
                                                <ion-icon :icon="eye"></ion-icon>
                                                View Details
                                            </ion-button>
                                        </div>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </template>
                <div v-if="medications.length === 0" class="text-center">
                    <ion-icon name="alertCircleOutline" size="large"></ion-icon>
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
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonInput,
    IonRow,
    IonCol,
    IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import NavigationMenu from '@/apps/Immunization/components/Reports/NavigationMenu.vue';
import { useDemographicsStore } from "@/stores/DemographicStore";
import { DrugOrderService } from "@/services/drug_order_service";
import SetUser from "@/views/Mixin/SetUser.vue";
import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";
import MedicationDetailsModal from "./MedicationDetailsModal.vue";
import { createModal, toastDanger, toastSuccess } from "@/utils/Alerts";
import { medkit, repeat, eye, alertCircleOutline, checkmarkDoneCircleOutline, clipboardOutline, timeOutline  } from 'ionicons/icons';

export default defineComponent({
    name: "MedicationDispensation",
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
        IonInput,
        MedicationDetailsModal,
        IonRow,
        IonCol,
        IonIcon
    },
    data() {
        return {
            medications: [],
            selectedMedication: null as any,
            medkit,
            repeat,
            eye,
            alertCircleOutline,
            checkmarkDoneCircleOutline,
            clipboardOutline,
            timeOutline,
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
            console.log(this.medications)
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
        async viewDetails(medication: any) {
            this.selectedMedication = medication;
            await createModal(MedicationDetailsModal, { class: "large-modal" }, true, {selectedMedication: this.selectedMedication});
        },
        formatHeaderDate(dateString: any) {
            return new Date(dateString).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        },
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