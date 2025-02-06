import { ObservationService } from "./observation_service";
import { ConceptService } from "./concept_service";
import { Observation } from "@/interfaces/observation";

async function alertSideEffects(patientId: number, typeConceptID: any = "Malawi ART side effects") {
    const conceptID: any = await ConceptService.getCachedConceptID(typeConceptID);
    const data: Observation[] = await ObservationService.getObservations(patientId, conceptID);
    return data.filter((observation) => {
        try {
            return observation.children[0].value_coded == ConceptService.getCachedConceptID("Yes");
        } catch (e) {
            return false;
        }
    });
}

export default {
    alertSideEffects,
};
