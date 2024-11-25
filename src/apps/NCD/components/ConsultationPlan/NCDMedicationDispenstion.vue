<template>
    <ion-page>
        <NavigationMenu />
        <ViewToggleComponent @view-changed="handleViewChange"/>
        <ion-content>
            <div class="p-4" v-if="currentView === 'list'">
                <ion-card>
                    <ion-card-content>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="bg-gray-100">
                                        <th class="p-3 text-left">Date</th>
                                        <th class="p-3 text-left">Medication</th>
                                        <th class="p-3 text-left">Dose</th>
                                        <th class="p-3 text-left">Frequency</th>
                                        <th class="p-3 text-left">Amount to Dispense</th>
                                        <th class="p-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="medication in medications" 
                                        :key="medication.order_id"
                                        class="border-b hover:bg-gray-50">
                                        <td class="p-3">
                                            {{ formatHeaderDate(medication.order.date_created.split('T')[0]) }}
                                        </td>
                                        <td class="p-3">
                                            <div class="flex items-center">
                                                <ion-icon :icon="medkit" class="mr-2"></ion-icon>
                                                {{ medication.drug.name }}
                                            </div>
                                        </td>
                                        <td class="p-3">
                                            {{ medication.dose }} {{ medication.units }}
                                        </td>
                                        <td class="p-3">
                                            {{ getFrequencyLabel(medication.frequency) }}
                                        </td>
                                        <td class="p-3">
                                            <div class="flex items-center space-x-2">
                                                <ion-input
                                                    type="text"
                                                    placeholder="Amount"
                                                    v-model="medication.amountToDispense"
                                                    @input="validateAmount(medication)"
                                                    :class="['w-24 dose-input bordered-input', medication.error ? 'input-error' : '']"
                                                ></ion-input>
                                                <ion-button
                                                    size="small"
                                                    color="light"
                                                    @click="setAmountAsPrescribed(medication)"
                                                    style="margin-top: 10px;"
                                                >
                                                    <ion-icon :icon="clipboardOutline" class="mr-1"></ion-icon>
                                                    <span class="text-green-700">As Prescribed</span>
                                                </ion-button>
                                            </div>
                                            <div v-if="medication.error" class="error-text text-sm">
                                                {{ medication.error }}
                                            </div>
                                        </td>
                                        <td class="p-3">
                                            <div class="flex space-x-2">
                                                <ion-button 
                                                    color="primary" 
                                                    size="small"
                                                    @click="dispenseMedication(medication)"
                                                    :disabled="!medication.amountToDispense || medication.dispensed"
                                                >
                                                    <ion-icon :icon="checkmarkDoneCircleOutline" class="mr-1" style="margin-right: 5px;"></ion-icon>
                                                    {{ medication.dispensed ? 'Dispensed' : 'Dispense' }}
                                                </ion-button>
                                                <ion-button 
                                                    color="secondary"
                                                    size="small"
                                                    @click="viewDetails(medication)"
                                                    style="margin-left: 10px;"
                                                >
                                                    <ion-icon :icon="eye" class="mr-1" style="margin-right: 5px;"></ion-icon>
                                                    Details
                                                </ion-button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-if="medications.length === 0" class="text-center py-8">
                                <ion-icon :icon="alertCircleOutline" size="large" class="mb-2"></ion-icon>
                                <p>No medications prescribed</p>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>

            <div class="p-4" v-else>
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
                                    <ion-card-title class="medication-details-header">
                                        <ion-icon :icon="medkit"  class="ion-margin-end"></ion-icon>
                                        <span>{{ medication.drug.name }}</span>
                                    </ion-card-title>
                                </ion-card-header>
                                <ion-card-content>
                                    <div class="medication-details">
                                        <div class="flex justify-between mb-3">
                                            <!-- <ion-icon :icon="timeOutline" class="mr-2"></ion-icon> -->
                                            <span class="flex items-center">
                                                <ion-icon :icon="medication" class="mr-2"></ion-icon>
                                                Dose: {{ medication.dose }} {{ medication.units }}
                                            </span>
                                            <span class="flex items-center">
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
                                                @input="validateAmount(medication)"
                                                :class="['mr-2 dose-input bordered-input', medication.error ? 'input-error' : '']"
                                            ></ion-input>
                                            <ion-button
                                                size="small"
                                                color="light"
                                                style="margin-top: 10px"
                                                @click="setAmountAsPrescribed(medication)"
                                            >
                                                <ion-icon :icon="clipboardOutline" size="small" style="margin-right: 5px;" class="mr-1"></ion-icon>
                                                <span style="color: darkseagreen;"> As Prescribed</span>
                                            </ion-button>
                                        </div>
                                        <div v-if="medication.error" class="error-text">
                                            {{ medication.error }}
                                        </div>
                                        <div class="mt-3 flex space-x-2">
                                            <ion-button 
                                                color="primary" 
                                                @click="dispenseMedication(medication)"
                                                :disabled="!medication.amountToDispense || medication.dispensed"
                                            >
                                                <ion-icon :icon="checkmarkDoneCircleOutline" class="mr-2" style="margin-right: 5px;"></ion-icon>
                                                {{ medication.dispensed ? 'Dispensed' : 'Dispense' }}
                                            </ion-button>
                                            <ion-button 
                                                color="secondary"
                                                style="margin-left: 20px;" 
                                                @click="viewDetails(medication)"
                                            >
                                                <ion-icon :icon="eye" class="mr-2" style="margin-right: 5px;"></ion-icon>
                                                 Details
                                            </ion-button>
                                        </div>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </template>
                <div v-if="medications.length === 0" class="text-center">
                    <ion-icon name="alertCircleOutline" size="large" class="mb-2"></ion-icon>
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
import ViewToggleComponent from '@/apps/NCD/components/ViewToggleComponent.vue'
import { useDemographicsStore } from "@/stores/DemographicStore";
import { DrugOrderService } from "@/services/drug_order_service";
import SetUser from "@/views/Mixin/SetUser.vue";
import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";
import MedicationDetailsModal from "./MedicationDetailsModal.vue";
import { createModal, toastDanger, toastSuccess } from "@/utils/Alerts";
import { DispensationService } from "@/apps/NCD/services/dispensation_service"
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
        IonIcon,
        ViewToggleComponent,
    },
    data() {
        return {
            medications: [] as any,
            selectedMedication: null as any,
            medkit,
            repeat,
            eye,
            alertCircleOutline,
            checkmarkDoneCircleOutline,
            clipboardOutline,
            timeOutline,
            currentView: 'list',
        };
    },
    computed: {
        ...mapState(EIRreportsStore, ["navigationPayload"]),
        ...mapState(useDemographicsStore, ["demographics"]),
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
        this.medications = []
        this.initOwnNavData();
        await this.prescribedMedications();
    },
    methods: {
        initOwnNavData() {
            const store = EIRreportsStore();
            store.setNavigationPayload('Dispense Medication', true, false, '/', 'home');
        },
        async prescribedMedications() {
            this.medications = await DrugOrderService.findProgramDrugOrdersAwaitingDispensation(this.demographics.patient_id);
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
        validateAmount(medication: any) {
            const value = parseFloat(medication.amountToDispense);
            if (isNaN(value) || value <= 0) {
                medication.error = "Please enter a valid amount greater than 0.";
            } else {
                medication.error = null;
            }
        },
        setAmountAsPrescribed(medication: any) {
            medication.amountToDispense = medication.dose;
            this.validateAmount(medication);
        },
        async dispenseMedication(medication: any) {
            if (medication.error) {
                toastDanger("Fix errors before dispensing.");
                return;
            }
            try {
                const dispensationService = new DispensationService()
                const dispensationArryObj = dispensationService.getDispensationArryObj(medication.order_id, medication.amountToDispense)
                await dispensationService.saveDispensations(dispensationArryObj)
                medication.dispensed = true;
                toastSuccess("Medication dispensed successfully.");
            } catch (error) {
                toastDanger("Dispensing failed. Please try again.");
                console.error(error);
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
        handleViewChange(view: string) {
            this.currentView = view;
        },
    },
    watch: {
        demographics: {
            async handler() {
                this.medications = []
                await this.prescribedMedications();
            },
        deep:true
        }   
    }
});
</script>
<style scoped>
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

    .medication-details-header {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .input-error {
        border-color: red;
    }

    .error-text {
        color: red;
        font-size: 0.875rem;
        margin-top: 4px;
    }

    .dose-input {
        --padding-start: 8px;
        --padding-end: 8px;
        border: 2px solid #ccc;
        border-radius: 4px;
        padding: 4px;
    }

    .input-error {
        border-color: red;
    }

    .error-text {
        color: red;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th {
        font-weight: 600;
        text-align: left;
    }

    td, th {
        padding: 12px;
        border-bottom: 1px solid #e2e8f0;
    }

    tr:hover {
        background-color: #f8fafc;
    }
</style>