<template>
    <ion-card v-if="selectedMedications.length > 0">
      <ion-card-header>
        <ion-card-title>
          <ion-icon :icon="medkit" class="ion-margin-end"></ion-icon>
          Selected Medications
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item v-for="(med, index) in selectedMedications" :key="index">
            <ion-label>
              <h2>{{ med.medication }}</h2>
              <p class="dosage-info">
                <span><ion-icon :icon="sunny"></ion-icon> Morning: <ion-badge color="warning">{{ med.dosage.morning || '-' }}</ion-badge></span>
                <span><ion-icon :icon="partlySunny"></ion-icon> Afternoon: <ion-badge color="warning">{{ med.dosage.afternoon || '-' }}</ion-badge></span>
                <span><ion-icon :icon="moon"></ion-icon> Evening: <ion-badge color="warning">{{ med.dosage.evening || '-' }}</ion-badge></span>
              </p>
            </ion-label>
            <ion-buttons slot="end">
              <ion-button color="primary" fill="clear" @click="editMedication(index)">
                <ion-icon :icon="pencil"></ion-icon>
              </ion-button>
              <ion-button color="danger" fill="clear" @click="confirmRemoveMedication(index)">
                <ion-icon :icon="trash"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  
    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-icon :icon="editIndex !== null ? pencil : add" class="ion-margin-end"></ion-icon>
          {{ editIndex !== null ? 'Edit' : 'Add' }} Medication
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <ion-icon :icon="medkit" slot="start"></ion-icon>
          <ion-label  class="d-lbl">Medication Category</ion-label>
          <ion-select v-model="selectedCategory" @ionChange="updateMedicationOptions">
            <ion-select-option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </ion-select-option>
          </ion-select>
        </ion-item>
  
        <ion-item>
          <ion-icon :icon="medical" slot="start"></ion-icon>
          <ion-label  class="d-lbl">Medication</ion-label>
          <ion-select v-model="selectedMedication">
            <ion-select-option v-for="medication in medicationOptions" :key="medication" :value="medication">
              {{ medication }}
            </ion-select-option>
          </ion-select>
        </ion-item>
  
        <ion-list>
          <ion-item>
            <ion-icon :icon="sunny" slot="start"></ion-icon>
            <ion-label class="d-lbl">Morning</ion-label>
            <ion-input type="number" v-model="dosage.morning" placeholder="Dose"></ion-input>
          </ion-item>
          <ion-item>
            <ion-icon :icon="partlySunny" slot="start"></ion-icon>
            <ion-label class="d-lbl">Afternoon</ion-label>
            <ion-input type="number" v-model="dosage.afternoon" placeholder="Dose"></ion-input>
          </ion-item>
          <ion-item>
            <ion-icon :icon="moon" slot="start"></ion-icon>
            <ion-label class="d-lbl">Evening</ion-label>
            <ion-input type="number" v-model="dosage.evening" placeholder="Dose"></ion-input>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  
    <ion-button expand="block" @click="saveMedication">
      <ion-icon :icon="editIndex !== null ? save : add" slot="start"></ion-icon>
      {{ editIndex !== null ? 'Update' : 'Add' }} Medication
    </ion-button>
  
    <ion-alert
      :is-open="showRemoveAlert"
      header="Confirm Removal"
      message="Are you sure you want to remove this medication?"
      :buttons="[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            showRemoveAlert = false;
          },
        },
        {
          text: 'Remove',
          handler: () => {
            removeMedication(medicationToRemove);
            showRemoveAlert = false;
          },
        },
      ]"
    ></ion-alert>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, 
    IonSelect, IonSelectOption, IonInput, IonList, IonButton, IonButtons,
    IonIcon, IonAlert, IonToast, IonBadge
  } from '@ionic/vue';
  import { 
    pencil, trash, medkit, medical, sunny, partlySunny, moon, add, save
  } from 'ionicons/icons';
  import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
  
  export default defineComponent({
    name: 'MedicationSelector',
    components: {
      IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, 
      IonSelect, IonSelectOption, IonInput, IonList, IonButton, IonButtons,
      IonIcon, IonAlert, IonToast, IonBadge
    },
    setup() {
      const categories = ['Diuretic', 'CCB', 'ACE-I', 'BB', 'Statin', 'Other'];
      const medications = reactive({
        'Diuretic': ['Hydrochlorothiazide - HCTZ', 'Furosemide - FURO', 'Spironolactone - SPIRO'],
        'CCB': ['Amlodipine - AML', 'Nifedipine Modified Release - NIF'],
        'ACE-I': ['Enalapril - ENAL', 'Captopril - CAPT', 'Lisinopril - LISIN'],
        'BB': ['Atenolol - ATEN', 'Bisoprolol - BIS', 'Propranolol - PROP'],
        'Statin': ['Simvastatin - SIMVA', 'Pravastatin - PRAVA', 'Atorvastatin - ATORVA'],
        'Other': ['Hydralazine - HYD', 'Isosorbide Mononitrate - ISSMN']
      } as any);
  
      const selectedCategory = ref('') as any;
      const selectedMedication = ref('') as any;
      const medicationOptions = ref([]) as any;
      const dosage = reactive({ morning: null, afternoon: null, evening: null } as any);
      const selectedMedications = ref([]) as any;
      const editIndex = ref(null) as any;
      const showRemoveAlert = ref(false) as any;
      const medicationToRemove = ref(null) as any;
      const errorMessage = ref('') as any;
  
      const updateMedicationOptions = () => {
        medicationOptions.value = medications[selectedCategory.value] || [];
        selectedMedication.value = '';
      };
  
      const saveMedication = () => {
        if (!selectedMedication.value) {
          errorMessage.value = 'Please select a medication';
          toastWarning(errorMessage.value)
          return;
        }
  
        if (!dosage.morning && !dosage.afternoon && !dosage.evening) {
          errorMessage.value = 'Please enter at least one dosage';
          toastWarning(errorMessage.value)
          return;
        }
  
        const medicationData = {
          category: selectedCategory.value,
          medication: selectedMedication.value,
          dosage: { ...dosage }
        };
  
        if (editIndex.value !== null) {
          selectedMedications.value[editIndex.value] = medicationData;
          editIndex.value = null;
        } else {
          selectedMedications.value.push(medicationData);
        }
  
        resetForm();
      };
  
      const resetForm = () => {
        selectedCategory.value = '';
        selectedMedication.value = '';
        Object.assign(dosage, { morning: null, afternoon: null, evening: null });
        editIndex.value = null;
      };
  
      const editMedication = (index: number) => {
        const med = selectedMedications.value[index] as any;
        selectedCategory.value = med.category;
        updateMedicationOptions();
        selectedMedication.value = med.medication;
        Object.assign(dosage, med.dosage);
        editIndex.value = index;
      };
  
      const confirmRemoveMedication = (index: number) => {
        medicationToRemove.value = index;
        showRemoveAlert.value = true;
      };
  
      const removeMedication = (index: number) => {
        selectedMedications.value.splice(index, 1);
      };
  
      return {
        categories, medications, selectedCategory, selectedMedication, medicationOptions,
        dosage, selectedMedications, editIndex, showRemoveAlert, medicationToRemove,
        errorMessage, updateMedicationOptions, saveMedication,
        resetForm, editMedication, confirmRemoveMedication, removeMedication,
        pencil, trash, medkit, medical, sunny, partlySunny, moon, add, save
      };
    }
  });
  </script>
  
  <style scoped>
  ion-card {
    margin-bottom: 20px;
  }
  
  ion-button {
    margin-top: 20px;
  }
  
  ion-icon {
    vertical-align: middle;
  }
  
  .dosage-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .dosage-info span {
    display: flex;
    align-items: center;
  }
  
  .dosage-info ion-icon {
    margin-right: 5px;
  }

  .d-lbl {
    margin-left: 10px;
  }
  </style>