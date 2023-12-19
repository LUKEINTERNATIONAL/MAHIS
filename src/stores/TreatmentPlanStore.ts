import { defineStore } from 'pinia'

export const useTreatmentPlanStore = defineStore('TreatmentPlanStore', {
    state: () => ({
        selectedMedicalDrugsList: [
            // {
            //     drugName: 'Metformin67 Extentend',
            //     dose: '750mg',
            //     frequency: 'twice',
            //     duration: '30days',
            //     prescription: '2023-09-23'
            // },
            // {
            //     drugName: 'Metformin56 Extentend',
            //     dose: '750mg',
            //     frequency: 'twice',
            //     duration: '30days',
            //     prescription: '2023-09-29'
            // }
        ] as any,
        medicalAllergiesList: [
            {
                name: 'Eye too short',
                selected: false,
            },
            {
                name: 'Glibenclamide 2',
                selected: false,
            },
            {
                name: 'Gliben',
                selected: false,
            },
            {
                name:  'Metformin',
                selected: false,
            },
            {
                name: 'Short acting insulin',
                selected: false,
            },
            {
                name: 'Glibenclamide',
                selected: false,
            }
          ] as any,
        isUseOfTraditionalMedicineSelected: false as boolean,
        nonPharmalogicalTherapyAndOtherNotes: '' as string,
    }),
    actions:{
        setSelectedMedicalDrugsList(data: any) {
            this.selectedMedicalDrugsList = data
        },
        setMedicalAllergiesList(data: any) {
            this.medicalAllergiesList = data
        },
        setIsUseOfTraditionalMedicineSelected(value: boolean) {
            this.isUseOfTraditionalMedicineSelected = value
        },
        setNonPharmalogicalTherapyAndOtherNotes(value: string) {
            this.nonPharmalogicalTherapyAndOtherNotes = value
        },
        getNonPharmalogicalTherapyAndOtherNotes() {
            return this.nonPharmalogicalTherapyAndOtherNotes
        }
    },
    persist:true,

})