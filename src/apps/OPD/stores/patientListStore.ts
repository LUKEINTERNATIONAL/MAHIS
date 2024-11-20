
import { PatientOpdList } from '@/services/patient_opd_list';
import { defineStore } from 'pinia'



export const usePatientList = defineStore('counter', {
    state: () => {
      return {
        patientsWaitingForVitals:[],
        patientsWaitingForConsultation:[],
        patientsWaitingForDispensation:[],
        patientsWaitingForLab:[],
        counter:0
      };
    },
    actions: {
         async refresh(locationId: number){
        try {
            const vitalsList = await PatientOpdList.getPatientList("VITALS", locationId);
            this.patientsWaitingForVitals = vitalsList;
            this.patientsWaitingForConsultation = await PatientOpdList.getPatientList("CONSULTATION",locationId);
            this.patientsWaitingForLab = await PatientOpdList.getPatientList("LAB",locationId);
            this.patientsWaitingForDispensation = await PatientOpdList.getPatientList("DISPENSATION", locationId);
            this.counter++;
    
          } catch (e) {}
     }
    },
  });