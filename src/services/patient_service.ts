import { Patient } from "@/interfaces/patient";
import { getPersonAttribute } from "@/interfaces/personAttribute";
import { getPatientIdentifier } from "@/interfaces/patientIdentifier";
import { ObservationService } from "./observation_service";
import { ConceptService } from "./concept_service";
import { Service } from "@/services/service";
import HisDate from "@/utils/Date";
import { Observation } from "@/interfaces/observation";
import { BMIService } from "@/services/bmi_service";
import { find, isEmpty } from "lodash";
import { isValueEmpty } from "@/utils/Strs";
import { PatientIdentifierService } from "./patient_identifier_service";
import { PatientPrintoutService } from "./patient_printout_service";
import dayjs from "dayjs";

export class PatientService extends Service {
    patient_id: any;
    constructor(patient_id: any) {
        super();
        this.patient_id = patient_id;
    }

    public static mergePatients(payload: any) {
        payload["program_id"] = super.getProgramID();
        return super.postJson("dde/patients/merge", payload);
    }

    public static voidPatient(patientID: number, reason = "") {
        return super.void(`patients/${patientID}`, { reason });
    }

    public static async search(params: Record<string, string>) {
        return super.getJson(`/search/patients`, params);
    }

    public static findByNpid(npid: string, params = {}) {
        return super.getJson(`search/patients/by_npid`, { npid, ...params });
    }

    public static findByOtherID(idType: string | number, identifier: string | number) {
        return super.getJson("search/patients/by_identifier", {
            type_id: idType,
            identifier,
        });
    }

    public static async findByID(patientId: number | string) {
        return super.getJson(`/patients/${patientId}`);
    }
    public static async assignNHID(patientId: number | string, programID: number) {
        return super.postJson(`/patients/${patientId}/npid`, {
            program_id: programID,
        });
    }
    public static reassignARVNumber(
        patientIdentifierId: number | string,
        data: Record<string, any>
    ) {
        return super.putJson("patient_identifiers/" + patientIdentifierId, data);
    }
    public static toPatient(json: string): Patient {
        return JSON.parse(json);
    }

    public static patientToJson(value: Patient): string {
        return JSON.stringify(value);
    }

    public static async getPatientVisits(patientId: number, includeDefaulterDates: boolean) {
        const dates: string[] = await super.getJson(`patients/${patientId}/visits`, {
            program_id: super.getProgramID(),
            include_defaulter_dates: includeDefaulterDates == true,
        });
        if (dates) {
            return dates.sort((a, b) => (new Date(a) < new Date(b) ? 1 : 0));
        }
        return [];
    }

    getWeightLossPercentageFromTrail(trail: any) {
        const [curWeight, prevWeight] = trail.map((w: any) => w.weight);
        if (!(curWeight && prevWeight)) return false;
        const decrease = parseFloat(prevWeight) - parseFloat(curWeight);
        const weightLossPercent = (decrease / prevWeight) * 100;
        return Math.round(weightLossPercent);
    }

    getGuardian() {
        return PatientService.getJson(`people/${this.getID()}/relationships`);
    }

    assignNpid() {
        return PatientService.assignNHID(this.getID(), Service.getProgramID());
    }

    createArvNumber(arvNumber: string) {
        return PatientIdentifierService.create(this.getID(), 4, arvNumber);
    }

    createNcdNumber(ncdNumber: string) {
        return PatientIdentifierService.create(this.getID(), 31, ncdNumber);
    }

    // updateARVNumber(newARVNumber: string) {
    //     const patientIdentifierId =
    //         this.getIdentifiers().find((i) => i.type.name === "ARV Number")
    //             ?.patient_identifier_id || "";
    //     return PatientService.reassignARVNumber(patientIdentifierId, {
    //         identifier: newARVNumber,
    //     });
    // }

    public static updateMWNationalId(newId: string, patientID: any) {
        return PatientIdentifierService.create(patientID, 28, newId);
    }

    async isPregnant() {
        const obs = await ObservationService.getFirstObs(this.getID(), "Is patient pregnant");
        return (
            obs &&
            (obs.value_coded.match(/Yes/i) ? true : false) &&
            ObservationService.obsInValidPeriod(obs)
        );
    }

    async isBreastfeeding() {
        const obs = await ObservationService.getFirstObs(this.getID(), "Is patient breast feeding");
        return (
            obs &&
            (obs.value_coded.match(/Yes/i) ? true : false) &&
            ObservationService.obsInValidPeriod(obs)
        );
    }

    async nextAppointment(programID = Service.getProgramID()) {
        try {
            const res = await Service.getJson("next_appointment", {
                patient_id: this.getID(),
                date: Service.getSessionDate(),
                program_id: programID,
            });
            return res.appointment_date;
        } catch (e) {
            return null;
        }
    }

    async getInitialObs(concept: string, attr = "value_numeric") {
        try {
            const initialObs = await ObservationService.getAll(this.getID(), concept);
            if (!initialObs) return;
            const lastIndex = initialObs.length - 1;
            if (attr === "value_coded") {
                return ConceptService.getConceptName(initialObs[lastIndex][attr]);
            }
            return initialObs[lastIndex][attr];
        } catch (e) {
            console.error(e);
        }
    }

    async getInitialWeight() {
        return this.getInitialObs("weight");
    }

    async getRecentWeight() {
        const concept = await ConceptService.getConceptID("weight", true);
        const obs = await ObservationService.getObs({
            person_id: this.getID(),
            concept_id: concept,
            page_size: 1,
        });
        return obs.length >= 1 ? obs[0].value_numeric : -1;
    }

    async getInitialHeight() {
        return this.getInitialObs("Height");
    }

    getRecentHeightObs() {
        return ObservationService.getFirstObs(this.getID(), "Height");
    }

    async getRecentHeight() {
        const concept = await ConceptService.getConceptID("Height", true);
        const obs = await ObservationService.getObs({
            person_id: this.getID(),
            concept_id: concept,
            page_size: 1,
        });
        return obs.length >= 1 ? obs[0].value_numeric : -1;
    }
    async getWeightHistory() {
        try {
            const weights = await ObservationService.getAll(this.getID(), "weight");
            return weights.map((obs: Observation) => ({
                weight: obs.value_numeric,
                date: obs.obs_datetime,
            }));
        } catch (e) {
            console.warn(e);
            return [];
        }
    }
    async getCompleteTBTherapyHistory() {
        const data = await ObservationService.getAll(this.getID(), "TB treatment history");
        return data.filter((data: any) => {
            return data.value_text.match(/Complete/i);
        });
    }

    async getInitialBMI() {
        return this.getInitialObs("BMI");
    }

    async calculateWeightPercentile() {
        const currentWeight = await this.getRecentWeight();
        const medianWeightHeight = await this.getMedianWeightHeight();
        try {
            return (parseFloat(currentWeight) / parseFloat(medianWeightHeight["weight"])) * 100;
        } catch (e) {
            return 0;
        }
    }

    async getMedianWeightHeight() {
        return Service.getJson(`patients/${this.getID()}/median_weight_height`, {
            date: Service.getSessionDate(),
        });
    }

    getID() {
        return this.patient_id;
    }

    private normaliseName(name: string) {
        return name.replace(/n\/a|unknown|null|undefined/gi, "").trim();
    }

    async printNationalID() {
        return new PatientPrintoutService(this.getID()).printNidLbl();
    }
}
