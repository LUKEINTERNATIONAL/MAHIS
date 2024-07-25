import { defineStore } from "pinia";

export const useAdministerVaccineStore = defineStore("administerVaccineStore", {
    state: () => ({
        administeredVaccines: [] as any,
        currentSelectedDrug: null as any,
        currentMilestone: "" as any,
        currentMilestoneToAdminister: {},
        currentVisitId: "" as any,
        vaccineSchedule: {} as any,
        vaccineReload: false,
        currentSchedFound: false,
        missedVaccineSchedules: [] as any,
        overDueVaccinesCount: 0,
        tempScannedBatchNumber: null as any,
        lastVaccinesGiven: [] as any,
        lastVaccineGievenDate: "" as any,
        vaccineToBeVoided: {} as any,
        lotNumberData: [] as any,
    }),
    actions: {
        setVaccineSchedule(data: any) {
            this.vaccineSchedule = data;
            this.overDueVaccines();
        },
        getVaccineSchedule() {
            return this.vaccineSchedule;
        },
        setCurrentVisitId(data: number) {
            this.currentVisitId = data;
        },
        getCurrentVisitId() {
            return this.currentVisitId;
        },
        setAdministeredVaccine(data: any) {
            this.administeredVaccines = [];
            this.administeredVaccines.push(data);
        },
        getAdministeredVaccines() {
            return this.administeredVaccines;
        },
        setCurrentSelectedDrug(drug: any): void {
            this.currentSelectedDrug = {
                drug: drug,
            };
        },
        getCurrentSelectedDrug() {
            return this.currentSelectedDrug;
        },
        setCurrentMilestone(data: any): void {
            this.currentMilestone = data;
        },
        getCurrentMilestone() {
            return this.currentMilestone;
        },
        setCurrentMilestoneToAdminister(data: any): void {
            this.currentMilestoneToAdminister = data;
        },
        getCurrentMilestoneToAdminister() {
            return this.currentMilestoneToAdminister;
        },
        setVaccineReload(value: boolean): void {
            this.vaccineReload = value;
        },
        getVaccineReload(): boolean {
            return this.vaccineReload;
        },
        setCurrentSchedFound(value: boolean): void {
            this.currentSchedFound = value;
        },
        getCurrentSchedFound(): boolean {
            return this.currentSchedFound;
        },
        setMissedVaccineSchedules(data: any): void {
            this.missedVaccineSchedules.push(data);
        },
        getMissedVaccineSchedules(): any {
            return this.missedVaccineSchedules;
        },
        setVaccineToBeVoided(vaccine: any) {
            this.vaccineToBeVoided = vaccine
        },
        getVaccineToBeVoided() {
            return this.vaccineToBeVoided
        },
        resetMissedVaccineSchedules(): void {
            this.missedVaccineSchedules = [];
        },
        isVaccinePassed(): boolean {
            let bool = false;
            this.vaccineSchedule?.vaccine_schedule?.forEach((vaccineSchudule: any) => {
                vaccineSchudule.antigens.forEach((vaccine: any) => {
                    if (this.currentSelectedDrug.drug.drug_id == vaccine.drug_id && vaccineSchudule.milestone_status == "passed") {
                        bool = true;
                    }
                });
            });
            return bool;
        },
        overDueVaccines(): any {
            const currentVaccines = [] as any;
            this.vaccineSchedule?.vaccine_schedule?.forEach((vaccineSchudule: any) => {
                vaccineSchudule.antigens.forEach((vaccine: any) => {
                    if (vaccineSchudule.milestone_status == "passed" && vaccine.status == "pending") {
                        currentVaccines.push(vaccine);
                    }
                });
            });
            this.overDueVaccinesCount = currentVaccines.length;
            return currentVaccines;
        },
        setTempScannedBatchNumber(tempScannedBatchNumber: any) {
            this.tempScannedBatchNumber = tempScannedBatchNumber;
        },
        setLastVaccinesGiven(data: any) {
            
            this.lastVaccinesGiven.length = 0
            data.forEach((drug:any) => {
                this.lastVaccinesGiven.push(
                    {
                        drug_id:	1307,
                        drug_name:	drug.drug.name,
                        window_period:	null,
                        can_administer:	false,
                        status:	"administered",
                        date_administered:	drug.drug.date_created,
                        order: drug.order
                    }
                )
                this.lastVaccineGievenDate = drug.order.date_created
            })
        },
        setLotNumberData(data: any) {
            this.lotNumberData = data
        },
        getLotNumberData() {
            return this.lotNumberData
        }
    },
    persist: true,
});
