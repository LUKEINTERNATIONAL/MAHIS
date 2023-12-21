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
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,
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
        },
        setSelectedMedicalAllergiesList(data: any) {
            this.selectedMedicalAllergiesList.push(data)
        },
        getSelectedMedicalAllergiesList() {
            return this.selectedMedicalAllergiesList
        }
    },
    persist:true,

})