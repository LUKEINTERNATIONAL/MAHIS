import { Service } from "@/services/service";
import { Encounter } from "@/interfaces/encounter";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { AppEncounterService } from "@/services/app_encounter_service";

interface CreateEncounterPayload {
    encounter_type_id: number;
    patient_id: number;
    encounter_datetime: Date;
    provider_id?: number;
}

export class OutcomeService extends Service {
    protected encounterTypeID: number;
    private date: Date;

    constructor() {
        super();
        this.encounterTypeID = 40;
        this.date = Service.getSessionDate() as any;
    }

    async createEncounter(data: []): Promise<Encounter | undefined> {
        const payload: CreateEncounterPayload = {
            encounter_type_id: this.encounterTypeID,
            patient_id: OutcomeService.getPatientID(),
            encounter_datetime: this.date,
        };

        const providerID = OutcomeService.getProviderID();
        if (providerID !== -1) {
            payload.provider_id = providerID;
        }
        if (data.length > 0) {
            const encounter = new AppEncounterService(OutcomeService.getPatientID(), this.encounterTypeID, OutcomeService.getProviderID());
            await encounter.createEncounter();
            return await encounter.saveObservationList(data);
        } else {
            return undefined;
        }
    }

    private static getPatientID(): number {
        const store = useDemographicsStore();
        const demographics = store.patient;
        return demographics.patientID;
    }

    private static getProviderID(): number {
        return Service.getUserID() as number;
    }
}
