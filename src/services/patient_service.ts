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
import { useDemographicsStore } from "@/stores/DemographicStore";

export class PatientService extends Service {
    patient: any;
    constructor() {
        super();
        const demographicsStore = useDemographicsStore();
        this.patient = demographicsStore.getPatient();
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
        return super.postJson(`/patients/${patientId}/npid`, { program_id: programID });
    }
    public static reassignMRNumber(patientIdentifierId: number | string, data: Record<string, any>) {
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

    updateNCDNumber(newNCDNumber: string) {
        return PatientService.reassignMRNumber(this.patient.NcdID, {
            identifier: newNCDNumber,
        });
    }

    updateMWNationalId(newId: string, patientID: any = "") {
        return PatientIdentifierService.create(this.getID() || patientID, 28, newId);
    }
    updateBirthId(newId: string, patientID: any = "") {
        return PatientIdentifierService.create(this.getID() || patientID, 23, newId);
    }

    isMale() {
        return ["Male", "M"].includes(this.getGender());
    }

    isFemale() {
        return ["Female", "F"].includes(this.getGender());
    }

    async isPregnant() {
        const obs = await ObservationService.getFirstObs(this.getID(), "Is patient pregnant");
        return obs && (obs.value_coded.match(/Yes/i) ? true : false) && ObservationService.obsInValidPeriod(obs);
    }

    async isBreastfeeding() {
        const obs = await ObservationService.getFirstObs(this.getID(), "Is patient breast feeding");
        return obs && (obs.value_coded.match(/Yes/i) ? true : false) && ObservationService.obsInValidPeriod(obs);
    }

    async hasPregnancyObsToday() {
        const date = await ObservationService.getFirstObsDatetime(this.getID(), "Is patient pregnant");
        return date && HisDate.toStandardHisFormat(date) === Service.getSessionDate() && this.isFemale();
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

    isChildBearing() {
        const age = this.getAge();
        return this.isFemale() && age >= 12 && age <= 50;
    }
    isUnderFive() {
        const age = this.getAge();
        return age <= 5;
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

    async getBMI() {
        //TODO: weight and height should have optional parameters to get weight and height
        const weight = await this.getRecentWeight();
        const height = await this.getRecentHeight();

        if (!(weight && height)) return 0;

        const gender = this.isMale() ? "M" : "F";
        const bmi: any = await BMIService.getBMI(weight, height, gender, this.getAge());

        return bmi;
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

    getObj() {
        return this.patient;
    }

    getID() {
        return this.patient.patientID;
    }

    getPatientInfoString() {
        const data = [this.getFullName(), `(${this.getGender()})`, this.getBirthdate(), `, ${this.getCurrentDistrict()}`];
        return data.join(" ");
    }

    getCurrentDistrict() {
        return this.getAddresses().currentDistrict;
    }

    getGender() {
        return this.patient?.personInformation?.gender;
    }

    getAge() {
        return dayjs(Service.getSessionDate()).diff(this.patient?.personInformation?.birthdate, "years");
    }

    getAgeInMonths() {
        return this.getAge() * 12;
    }

    getBirthdate() {
        return this.patient?.personInformation?.birthdate;
    }

    getGivenName() {
        return this.patient?.personInformation?.given_name;
    }

    getFamilyName() {
        return this.patient?.personInformation?.family_name;
    }

    private normaliseName(name: string) {
        return name.replace(/n\/a|unknown|null|undefined/gi, "").trim();
    }

    async printNationalID() {
        return new PatientPrintoutService(this.getID()).printNidLbl();
    }

    getFullName() {
        try {
            const name = this.patient.personInformation;
            const firstName = name.given_name;
            const lastName = name.family_name;
            const middleName = name.middle_name;
            return this.normaliseName(`${firstName} ${middleName} ${lastName}`);
        } catch (e) {
            console.error(e);
            return "Unknown";
        }
    }

    getDocID() {
        return this.patient.DocID;
    }

    getNationalID() {
        return this.patient.ID;
    }

    getMWNationalID() {
        return "";
    }

    getArvNumber() {
        return "";
    }

    getNcdNumber() {
        return this.patient.NcdID;
    }

    getHomeDistrict() {
        return this.getAddresses().ancestryDistrict;
    }

    getHomeTA() {
        return this.getAddresses().ancestryTA;
    }

    getHomeVillage() {
        return this.getAddresses().ancestryVillage;
    }

    getCurrentVillage() {
        return this.getAddresses().currentVillage;
    }

    getCurrentTA() {
        return this.getAddresses().currentTA;
    }

    getClosestLandmark() {
        return this.patient?.personInformation?.landmark;
    }

    getOccupation() {
        return this.patient?.personInformation?.occupation;
    }

    getPhoneNumber() {
        return this.patient?.personInformation?.cell_phone_number;
    }

    patientIsComplete() {
        return [this.getGender(), this.getBirthdate(), this.getGivenName(), this.getFamilyName(), ...Object.values(this.getAddresses())].every(
            (a: any) => !isValueEmpty(a)
        );
    }

    getAddresses() {
        const addressOBJ = {
            ancestryDistrict: "",
            ancestryTA: "",
            ancestryVillage: "",
            currentDistrict: "",
            currentTA: "",
            currentVillage: "",
        };
        if (this.patient.personInformation) {
            const addresses = this.patient.personInformation;

            addressOBJ.ancestryDistrict = addresses.home_district;
            addressOBJ.ancestryTA = addresses.home_traditional_authority;
            addressOBJ.ancestryVillage = addresses.home_village;
            addressOBJ.currentDistrict = addresses.current_district;
            addressOBJ.currentTA = addresses.current_traditional_authority;
            addressOBJ.currentVillage = addresses.current_village;
        }
        return addressOBJ;
    }

    public static async getCachedClientProfileDuplicates() {
        const res = await Service.getJson("/dde/patients/matches");
        return res;
    }
}
