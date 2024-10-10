
import { PatientOpdList } from '@/services/patient_opd_list';
import { defineStore } from 'pinia'



export const usePatientList = defineStore('counter', {
    state: () => {
      return {
        patientsWaitingForVitals:[],
        patientsWaitingForConsultation:[],
        patientsWaitingForDispensation:[],
        counter:0
      };
    },
    actions: {
     async refresh(){
        try {
            this.patientsWaitingForVitals = await PatientOpdList.getPatientList("VITALS");
            
            this.patientsWaitingForConsultation = await PatientOpdList.getPatientList(
              "CONSULTATION"
            );
            this.patientsWaitingForDispensation = await PatientOpdList.getPatientList(
              "DISPENSATION"
            );
            
            this.counter++;
    
          } catch (e) {}
     }
    },
  });