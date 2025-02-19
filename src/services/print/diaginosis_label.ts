import { ConceptService } from "../concept_service";
import { EncounterService } from "../encounter_service";

export async function print_diagnosis(label: any, patient: any, visitDate: any) {
    const encounters = await EncounterService.getEncounters(patient.patientID, { date: visitDate });
    const diagnosis = await setDiagnosisEncounters(encounters);
    console.log("🚀 ~ print_diagnosis ~ encounters:", encounters);
    label.drawLine(20, 60, 800, 2);
    label.drawText(`Primary diagnosis`, { fontSize: 3 });
    label.drawText(`${diagnosis.primaryDiagnosis}`, { fontSize: 2 });
    label.drawText(`Secondary diagnosis`, { fontSize: 3 });
    label.drawText(`${diagnosis.secondaryDiagnosis}`, { fontSize: 2 });
    label.drawText("___________________________________________________", { fontSize: 3 });
    return label;
}

function findEncounter(data: any, encounterType: any) {
    return data.find((obj: any) => obj.type && obj.type.name === encounterType);
}
async function setDiagnosisEncounters(data: any) {
    const observations = findEncounter(data, "OUTPATIENT DIAGNOSIS")?.observations;
    const primaryDiagnosis = await getConceptValues(filterObs(observations, "Primary diagnosis"), "coded");
    const secondaryDiagnosis = await getConceptValues(filterObs(observations, "Secondary diagnosis"), "coded");
    return { primaryDiagnosis: primaryDiagnosis, secondaryDiagnosis: secondaryDiagnosis };
}
function filterObs(observations: any, conceptName: any) {
    return observations?.filter((obs: any) => obs.concept.concept_names.some((name: any) => name.name === conceptName));
}
async function getConceptValues(filteredObservations: any, type: any) {
    if (filteredObservations) {
        return await Promise.all(
            filteredObservations?.map(async (item: any) => {
                return await ConceptService.getConceptName(item.value_coded);
            })
        );
    }
}
