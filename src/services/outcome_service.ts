import { Service } from "@/services/service";
import { ObservationService } from "@/services/observation_service";
import { Encounter } from "@/interfaces/encounter";
import { EncounterService } from "@/services/encounter_service";
import { useDemographicsStore } from "@/stores/DemographicStore";

export class OutcomeService extends Service {
    patientID: number;
    providerID: number;

    constructor() {
        super();
    }

    async createEncounter(): Promise<Encounter | undefined> {
        const payload: any = {
            encounter_type_id: this.encounterTypeID,
            patient_id: this.getPatientID(),
            encounter_datetime: this.date,
        };
        if (this.providerID != -1) {
            payload["provider_id"] = this.providerID;
        }
        const encounter = await EncounterService.create(payload);
        if (encounter) {
            this.encounterID = encounter.encounter_id;
            return encounter;
        }
    }

    private static getPatientID(): number {
        const store = useDemographicsStore();
        const demographics = store.patient;
        const patientID = demographics.patientID;
        return patientID;
    }

    private static getProviderID(): number {
        const providerID = Service.getUserID() as number;
        return providerID;
    }

    saveObs(obs: ObsValue) {
        // return AppEncounterService.saveObs(this.encounterID, obs);
    }
}
