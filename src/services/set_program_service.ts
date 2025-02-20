import { Role } from "@/interfaces/role";
import { Service } from "./service";
import { User } from "@/interfaces/user";
import { useGeneralStore } from "@/stores/GeneralStore";
import { PatientService } from "@/services/patient_service";
import HisDate from "@/utils/Date";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { ProgramService } from "@/services/program_service";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { OrderService } from "@/services/order_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useProgramStore } from "@/stores/ProgramStore";
import { UserService } from "./user_service";
import {getUserLocation} from "@/services/userService";
import {usePatientList} from "@/apps/OPD/stores/patientListStore";
import {storeToRefs} from "pinia";
import {toastWarning} from "@/utils/Alerts";
import {PatientOpdList} from "@/services/patient_opd_list";


interface ProgramData {
    url: string;
    actionName: string;
}

interface Program {
    name: string;
    url?: string;
    actionName?: string;
}
export class SetProgramService extends Service {
    constructor() {
        super();
    }

    private static readonly PROGRAM_CONFIGS: Record<string, () => Promise<ProgramData> | ProgramData> = {
        "NCD PROGRAM": async () => await SetProgramService.setNCDValue(),
        "IMMUNIZATION PROGRAM": () => ({
            url: "patientProfile",
            actionName: "Enroll in Immunization program",
        }),
        "OPD Program": async () => {
            const demographicsInstance = useDemographicsStore();
            const demographics = demographicsInstance.getPatient();
            const orders = await OrderService.getOrders(demographics.patient_id);
            const isToday = (order: any) => HisDate.toStandardHisFormat(HisDate.sessionDate()) === HisDate.toStandardHisFormat(order.order_date);
            const hasTodayOrders = orders?.some(isToday);

            // Fetch user location
            const location = await getUserLocation();
            const locationId = location ? location.code : null;
            // Fetch patient lists dynamically using locationId
            const patientListStore = usePatientList();
            await patientListStore.refresh(locationId);

            const patientsWaitingForVitals = await PatientOpdList.getPatientList("VITALS", locationId);
            const patientsWaitingForConsultation = await PatientOpdList.getPatientList("CONSULTATION", locationId);
            const patientsWaitingForLab = await PatientOpdList.getPatientList("LAB", locationId);
            const patientsWaitingForDispensation = await PatientOpdList.getPatientList("DISPENSATION", locationId);

            // Check if the patient is in the waiting list for each stage
            const isWaitingForVitals = patientsWaitingForVitals.some((p: any) => p.patient_id === demographics.patientID);
            const isWaitingForConsultation = patientsWaitingForConsultation.some((p: any) => p.patient_id === demographics.patientID);
            const isWaitingForLab = patientsWaitingForLab.some((p: any) => p.patient_id === demographics.patientID);
            const isWaitingForDispensation = patientsWaitingForDispensation.some((p: any) => p.patient_id === demographics.patientID);
            // Fetch user roles
            const userRoles = this.getUserRoles();

            // Determine action based on user role and patient stage
            if ((userRoles.includes("Clinician") || userRoles.includes("Nurse") || userRoles.includes("Superuser")) && isWaitingForVitals) {
                return {
                    url: "/OPDVitals",
                    actionName: "Collect OPD vitals",
                };
            } else if ((userRoles.includes("Clinician") || userRoles.includes("Superuser")) && isWaitingForConsultation) {
                return {
                    url: "/OPDConsultationPlan",
                    actionName: "Start OPD consultation",
                };
            } else if ((userRoles.includes("Clinician") || userRoles.includes("Pharmacist") || userRoles.includes("Superuser")) && isWaitingForDispensation) {
                return {
                    url: "/dispensation",
                    actionName: "Start OPD dispensation",
                };
            } else if (userRoles.includes("Lab") && isWaitingForLab) {
                return {
                    url: "/OPDConsultationPlan",
                    actionName: "Start OPD Lab",
                };
            } else {
                // If the patient is not in the waiting list for any stage, show a toast warning
                toastWarning("The visit is not active or you don't have permissions for the current stage");
                return {
                    url: "",
                    actionName: "OPD program",
                };
            }
        },

        "ANC PROGRAM": () => ({
            url: "ANChome",
            actionName: "Enroll in ANC Program",
        }),
        "LABOUR AND DELIVERY PROGRAM": () => ({
            url: "LabourHome",
            actionName: "Enroll in Labour and delivery program",
        }),
        "PNC PROGRAM": () => ({
            url: "PNCHome",
            actionName: "Enroll in PNC program",
        }),
    };

    static async userProgramData(patientID: string = "", programs: any = "") {
        const programStore = useProgramStore();
        const authorizedPrograms = programStore.authorizedPrograms;

        if (!patientID) {
            return;
        }

        for (const program of authorizedPrograms) {
            const configHandler = this.PROGRAM_CONFIGS[program.name];

            if (configHandler) {
                const programData = await configHandler();
                Object.assign(program, programData);
            } else {
                program.url = "";
                program.actionName = program.name;
            }
        }
        const programData = programStore.activeProgram;
        if (!programs) {
            programs = programData;
        }
        programStore.setActiveProgram(programs);
        programStore.setAuthorizedPrograms(authorizedPrograms);
    }

    static async setNCDValue(): Promise<ProgramData> {
        const patient = new PatientService();
        if (patient.getID()) {
            const visits = await PatientService.getPatientVisits(patient.getID(), false);
            const activities = await UserService.getUserActivities("NCD_activities");
            let url = "";
            let NCDProgramActionName = "";
            if (patient.getNcdNumber() != "Unknown") {
                if (activities.length == 0) {
                    this.setNCDNumber();
                    url = "/patientProfile";
                    NCDProgramActionName = "Edit NCD Enrollment";
                } else {
                    if (localStorage.getItem("saveProgressStatus") == "true") {
                        NCDProgramActionName = "Continue NCD consultation";
                    } else if (visits.includes(HisDate.sessionDate())) {
                        NCDProgramActionName = "Edit NCD consultation";
                    } else NCDProgramActionName = "Start new NCD consultation";
                    url = "/consultationPlan";
                }
            } else {
                this.setNCDNumber();
                url = "/NCDEnrollment";
                NCDProgramActionName = "Enroll in NCD Program";
            }

            return {
                actionName: NCDProgramActionName,
                url: url,
            };
        }
        return {
            actionName: "",
            url: "",
        };
    }
    static async setNCDNumber() {
        const j = await ProgramService.getNextSuggestedNCDNumber();
        if (j) {
            const NCDNumber = useEnrollementStore();
            modifyFieldValue(NCDNumber.$state.NCDNumber, "NCDNumber", "value", j.ncd_number.replace(/^\D+|\s/g, ""));
            modifyFieldValue(NCDNumber.$state.NCDNumber, "NCDNumber", "leftText", `${j.ncd_number.replace(/\d+/g, "")}-NCD-`);
        }
    }
}
