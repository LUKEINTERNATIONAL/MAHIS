import { NotesService } from "@/services/notes_service";
import { DrugAllergyService } from "@/services/drug_allargy_service";
import { isEmpty } from "lodash";
import { EncounterService } from "@/services/encounter_service";
import { ObservationService, ObsValue } from "@/services/observation_service";
import { ConceptService } from "@/services/concept_service";
import { Service } from "@/services/service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { PatientService } from "@/services/patient_service";
import { ProgramService } from "@/services/program_service";
import { DrugOrderService } from "@/services/drug_order_service";
import HisDate from "@/utils/Date";
import { getFrequencyLabelOrCheckCode } from "@/services/drug_prescription_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

export class Treatment {
    async onSubmitNotes(patientID: any, providerID: any, treatmentNotesData: any) {
        const notesService = new NotesService(patientID, providerID);
        await notesService.createEncounter();
        await notesService.saveObservationList(treatmentNotesData);
    }

    async onSubmitAllergies(patientID: any, providerID: any, allergiesDataObs: any) {
        try {
            const drug_allergy_service = new DrugAllergyService(patientID, providerID);
            await drug_allergy_service.createEncounter();
            await drug_allergy_service.saveObservationList(allergiesDataObs);
            toastSuccess("Allergies saved successfully");
        } catch (error) {}
    }
}

export class PreviousTreatment {
    programID: number;
    providerID: number;
    patientID: number;
    date: string;
    demographics: any;
    previousDrugPrescriptions: any[] = [];
    previousClinicalNotes: any;
    previousDrugAllergies: any;

    constructor() {
        const store = useDemographicsStore();
        this.demographics = store.patient;
        this.patientID = this.demographics.patientID;
        this.date = ObservationService.getSessionDate();
        this.providerID = Service.getUserID() as number;
        this.programID = ObservationService.getProgramID();
        this.previousClinicalNotes = {};
        this.previousDrugAllergies = {};
    }

    async getPatientEncounters() {
        const patientVisits = await this.getPatientVisitDates();
        const encounterPromises = patientVisits.map(async (patientVisit) => {
            const date = patientVisit.value;
            const encounters = await EncounterService.getEncounters(this.patientID, { date });
            await Promise.all(
                encounters.map(async (encounter: any) => {
                    if (encounter.type.name == "NOTES") {
                        const { observations } = encounter;
                        if (!isEmpty(observations)) {
                            observations.forEach((observation: any) => {
                                if (observation.concept_id == "2688") {
                                    const date = HisDate.toStandardHisDisplayFormat(observation.obs_datetime);
                                    if (isEmpty(this.previousClinicalNotes.hasOwnProperty(date))) {
                                        this.previousClinicalNotes[date] = [];
                                    }
                                    this.previousClinicalNotes[date].push({
                                        date,
                                        notes: observation.value_text,
                                    });
                                }
                            });
                        }
                    }

                    if (encounter.type.name == "TREATMENT") {
                        const { observations } = encounter;
                        if (!isEmpty(observations)) {
                            for (const _index in observations) {
                                let concept = "<UNKNOWN CONCEPT>";
                                const obs = observations[_index];
                                try {
                                    if (obs?.concept?.concept_names) {
                                        concept = obs.concept.concept_names[0].name;
                                    } else {
                                        concept = await ConceptService.getConceptName(obs.concept_id);
                                    }
                                } catch (e) {
                                    console.error(obs, e);
                                }
                                const value = await ObservationService.resolvePrimaryValue(obs);
                                const time = HisDate.toStandardHisDisplayFormat(obs.date_created);
                                if (concept == "Allergic") {
                                    if (!this.previousDrugAllergies.hasOwnProperty(time)) {
                                        this.previousDrugAllergies[time] = [];
                                    }
                                    this.previousDrugAllergies[time].push({ date: time, value });
                                }
                            }
                        }
                    }
                })
            );
        });

        await Promise.all(encounterPromises);

        const medicationPromises = patientVisits.map(async (patientVisit) => {
            const medications = await DrugOrderService.getOrderByPatient(this.patientID, {
                start_date: patientVisit.value,
            });
            if (!isEmpty(medications)) {
                const previousPrescriptions = medications.map((medication: any) => ({
                    drugName: medication.drug.name,
                    value: HisDate.toStandardHisTimeFormat(medication.order.start_date),
                    dose: medication.dose,
                    frequency: getFrequencyLabelOrCheckCode(medication.frequency),
                    prescription: HisDate.toStandardHisFormat(medication.order.auto_expire_date),
                    duration: extractNumberBeforeDays(medication.order.instructions),
                    other: medication,
                }));

                this.previousDrugPrescriptions.push({
                    prescriptionDate: HisDate.toStandardHisDisplayFormat(patientVisit.value),
                    previousPrescriptions: previousPrescriptions,
                });
            }
        });

        await Promise.all(medicationPromises);

        return {
            previousDrugPrescriptions: this.previousDrugPrescriptions,
            previousClinicalNotes: this.previousClinicalNotes,
            previousDrugAllergies: this.previousDrugAllergies,
        };
    }

    async getPatientVisitDates() {
        return (await PatientService.getPatientVisits(this.patientID, false)).map((date: string) => ({
            label: HisDate.toStandardHisDisplayFormat(date),
            value: date,
            other: {
                isActive: date === ProgramService.getSessionDate(),
            },
        }));
    }
}

function extractNumberBeforeDays(text: string): number | null {
    const regex = /(\d+)\s+days/i;
    const match = text.match(regex);
    if (match && match.length > 1) {
        return parseInt(match[1]);
    }
    return null;
}

function sortObjectByDateDescending(obj: { [key: string]: any }) {
    const sortedKeys = Object.keys(obj).sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());
    const sortedObj: { [key: string]: any } = {};
    sortedKeys.forEach((key: string) => {
        sortedObj[key] = obj[key];
    });
    return sortedObj;
}

function reverseObjectKeys(obj: any) {
    return Object.fromEntries(Object.entries(obj).reverse());
}

export async function getNCDDiagnosis() {
    const store = useDemographicsStore();
    const patientId = store.patient.patientID;
    const ncdConceptIds = [8809, 6410, 6409];
    const names = [];

    try {
        const observations = await ObservationService.getAll(patientId, "Primary diagnosis");

        if (observations) {
            for (const obs of observations) {
                if (ncdConceptIds.includes(obs.value_coded)) {
                    const name = await ObservationService.getConceptName(obs.value_coded);
                    names.push(name);
                }
            }
        }

        return names;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}
