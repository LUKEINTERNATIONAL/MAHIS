import { Service } from "@/services/service";
// import Modal from "@/components/ApplicationModal.vue";
import { modalController } from "@ionic/vue";
export enum ProgramId {
    HIV_PROGRAM = 1,
    TB_PROGRAM = 2,
    VHW_PROGRAM = 3,
    EARLY_INFANT_DIAGNOSIS_PROGRAM = 4,
    MDR_TB_PROGRAM = 5,
    KAPOSIS_SARCOMA_PROGRAM = 6,
    FOOD_PROGRAM = 7,
    ART_PROGRAM = 8,
    PRE_ART_PROGRAM = 9,
    CHRONIC_CARE_PROGRAM = 10,
    MATERNITY_PROGRAM = 11,
    ANC_PROGRAM = 12,
    DIABETES_PROGRAM = 13,
    OPD_PROGRAM = 14,
    IPD_PROGRAM = 15,
    UNDER_5_PROGRAM = 16,
    CIVIL_REGISTRATION_PROGRAM = 17,
    HTC_PROGRAM = 18,
    ANC_CONNECT_PROGRAM = 19,
    HYPERTENSION_PROGRAM = 20,
    VMMC_PROGRAM = 21,
    IPT_PROGRAM = 22,
    LABORATORY_PROGRAM = 23,
    CXCA_PROGRAM = 24,
    LABORATORY_PROGRAM_DUPLICATE = 25,
    CXCA_PROGRAM_DUPLICATE = 26,
    TRIAGE_PROGRAM = 27,
    RADIOLOGY_PROGRAM = 28,
    PATIENT_REGISTRATION_PROGRAM = 29,
    AETC_PROGRAM = 30,
    SPINE_PROGRAM = 31,
    NCD_PROGRAM = 32,
    IMMUNIZATION_PROGRAM = 33,
    PNC_PROGRAM = 34,
    LABOUR_AND_DELIVERY_PROGRAM = 35,
}
export class ProgramService extends Service {
    constructor() {
        super();
    }

    static getAllPrograms() {
        return super.getJson("programs", { page_size: 1000 });
    }

    static getPatientPrograms(patientID: number) {
        return super.getJson(`patients/${patientID}/programs`);
    }
    static getPatientVLInfo(patientID: number) {
        const programID = super.getProgramID();
        return super.getJson(`programs/${programID}/patients/${patientID}/vl_info`, {
            date: this.getSessionDate(),
        });
    }
    static getProgramWorkflows(program: number) {
        return super.getJson(`programs/${program}/workflows`);
    }

    static getPatientStates(patientId: number, programId: number) {
        return super.getJson(`programs/${programId}/patients/${patientId}/states`);
    }
    static getPatientCurrentStates(patientId: number, programId: number) {
        return super.getJson(`programs/${programId}/patients/${patientId}/current_states`);
    }

    static voidProgram(patientProgramId: number, reason = "") {
        return super.void(`patient_programs/${patientProgramId}/`, { reason });
    }

    static createState(patientId: number, programId: number, state: Record<string, any>) {
        return super.postJson(`programs/${programId}/patients/${patientId}/states`, state);
    }

    static voidState(patientId: number, programId: number, stateId: number, reason = "") {
        return super.void(`programs/${programId}/patients/${patientId}/states/${stateId}`, {
            reason,
        });
    }

    static async getProgramInformation(patientID: number) {
        try {
            const info = await super.getJson(`/programs/${super.getProgramID()}/patients/${patientID}`);
            return info;
        } catch (error) {
            return {};
        }
    }
    static getCurrentProgramInformation(patientID: number, visitDate: any) {
        return super.getJson(`/programs/${super.getProgramID()}/patients/${patientID}/visit?date=${visitDate}`);
    }
    static getMastercardDrugInformation(patientID: number, visitDate: any) {
        return super.getJson(`/programs/${super.getProgramID()}/patients/${patientID}/mastercard_data?date=${visitDate}`);
    }
    static getNextTask(patientID: number) {
        return super.getJson(`/workflows/${super.getProgramID()}/${patientID}`, {
            date: super.getSessionDate(),
        });
    }
    static getNextSuggestedARVNumber() {
        return super.getJson(`/programs/1/next_available_arv_number`);
    }
    static getNextSuggestedNCDNumber() {
        return super.getJson(`/programs/32/next_available_ncd_number`);
    }
    static getFastTrackStatus(patientID: number) {
        return super.getJson("/on_fast_track", {
            person_id: patientID,
            date: super.getSessionDate(),
        });
    }
    static createPatient(personID: number) {
        return super.postJson(`/patients/`, {
            program_id: super.getProgramID(),
            person_id: personID,
        });
    }
    static enrollPatient(personID: number) {
        return super.postJson(`/patients/${personID}/programs`, {
            program_id: super.getProgramID(),
            date_enrolled: super.getSessionDate(),
        });
    }
    static enrollProgram(patientId: number, program: number, date: string) {
        return super.postJson(`/patients/${patientId}/programs`, {
            program_id: program,
            date_enrolled: date,
        });
    }
    static getWeightForHeightValues() {
        return super.getJson("/patient_weight_for_height_values");
    }
    // static async selectApplication() {
    //   const modal = await modalController.create({
    //     component: Modal,
    //     cssClass: "my-custom-class",
    //     backdropDismiss: false,
    //     componentProps: {
    //       appVersion: Service.getFullVersion()
    //     },
    //   });
    //   modal.present()
    //   return modal;
    // }
}
