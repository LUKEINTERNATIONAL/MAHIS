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
            <ion-icon :icon="medical" slot="start"></ion-icon>
            <ion-label>
              <h2>{{ med.medication }}</h2>
              <p>
                <ion-icon :icon="sunny" class="ion-margin-end"></ion-icon>Morning: {{ med.dosage.morning || '-' }},
                <ion-icon :icon="partlySunny" class="ion-margin-end"></ion-icon>Afternoon: {{ med.dosage.afternoon || '-' }},
                <ion-icon :icon="moon" class="ion-margin-end"></ion-icon>Evening: {{ med.dosage.evening || '-' }}
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
          <ion-label position="stacked">Medication Category</ion-label>
          <ion-select v-model="selectedCategory" @ionChange="updateMedicationOptions">
            <ion-select-option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </ion-select-option>
          </ion-select>
        </ion-item>
  
        <ion-item>
          <ion-icon :icon="medical" slot="start"></ion-icon>
          <ion-label position="stacked">Medication</ion-label>
          <ion-select v-model="selectedMedication">
            <ion-select-option v-for="medication in medicationOptions" :key="medication" :value="medication">
              {{ medication }}
            </ion-select-option>
          </ion-select>
        </ion-item>
  
        <ion-list>
          <ion-item>
            <ion-icon :icon="sunny" slot="start"></ion-icon>
            <ion-label>Morning</ion-label>
            <ion-input type="number" v-model="dosage.morning" placeholder="Dose"></ion-input>
          </ion-item>
          <ion-item>
            <ion-icon :icon="partlySunny" slot="start"></ion-icon>
            <ion-label>Afternoon</ion-label>
            <ion-input type="number" v-model="dosage.afternoon" placeholder="Dose"></ion-input>
          </ion-item>
          <ion-item>
            <ion-icon :icon="moon" slot="start"></ion-icon>
            <ion-label>Evening</ion-label>
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
            this.showRemoveAlert = false;
          },
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeMedication(this.medicationToRemove);
            this.showRemoveAlert = false;
          },
        },
      ]"
    ></ion-alert>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, 
    IonSelect, IonSelectOption, IonInput, IonList, IonButton, IonButtons,
    IonIcon, IonAlert
  } from '@ionic/vue';
  import { 
    pencil, trash, medkit, medical, sunny, partlySunny, moon, add, save
  } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'MedicationSelector',
    components: {
      IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, 
      IonSelect, IonSelectOption, IonInput, IonList, IonButton, IonButtons,
      IonIcon, IonAlert
    },
    data() {
      return {
        categories: ['Diuretic', 'CCB', 'ACE-I', 'BB', 'Statin', 'Other'],
        medications: {
          'Diuretic': ['Hydrochlorothiazide - HCTZ', 'Furosemide - FURO', 'Spironolactone - SPIRO'],
          'CCB': ['Amlodipine - AML', 'Nifedipine Modified Release - NIF'],
          'ACE-I': ['Enalapril - ENAL', 'Captopril - CAPT', 'Lisinopril - LISIN'],
          'BB': ['Atenolol - ATEN', 'Bisoprolol - BIS', 'Propranolol - PROP'],
          'Statin': ['Simvastatin - SIMVA', 'Pravastatin - PRAVA', 'Atorvastatin - ATORVA'],
          'Other': ['Hydralazine - HYD', 'Isosorbide Mononitrate - ISSMN']
        } as any,
        selectedCategory: '',
        selectedMedication: '',
        medicationOptions: [],
        dosage: {
          morning: null,
          afternoon: null,
          evening: null
        } as any,
        selectedMedications: [] as any[],
        editIndex: null as number | null,
        showRemoveAlert: false as any,
        medicationToRemove: null as number | null,
        pencil, trash, medkit, medical, sunny, partlySunny, moon, add, save
      };
    },
    methods: {
      updateMedicationOptions() {
        this.medicationOptions = this.medications[this.selectedCategory] || [];
        this.selectedMedication = '';
      },
      saveMedication() {
        if (this.selectedMedication && (this.dosage.morning || this.dosage.afternoon || this.dosage.evening)) {
          const medicationData = {
            category: this.selectedCategory,
            medication: this.selectedMedication,
            dosage: { ...this.dosage }
          };
  
          if (this.editIndex !== null) {
            // Update existing medication
            this.selectedMedications[this.editIndex] = medicationData;
            this.editIndex = null;
          } else {
            // Add new medication
            this.selectedMedications.push(medicationData);
          }
  
          this.resetForm();
        }
      },
      resetForm() {
        this.selectedCategory = '';
        this.selectedMedication = '';
        this.dosage = { morning: null, afternoon: null, evening: null };
        this.editIndex = null;
      },
      editMedication(index: number) {
        const med = this.selectedMedications[index];
        this.selectedCategory = med.category;
        this.updateMedicationOptions();
        this.selectedMedication = med.medication;
        this.dosage = { ...med.dosage };
        this.editIndex = index;
      },
      confirmRemoveMedication(index: number) {
        this.medicationToRemove = index;
        this.showRemoveAlert = true;
      },
      removeMedication(index: number) {
        this.selectedMedications.splice(index, 1);
      }
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
  </style>