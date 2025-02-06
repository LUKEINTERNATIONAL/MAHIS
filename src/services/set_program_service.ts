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
            const isToday = (order: any) => HisDate.toStandardHisFormat(HisDate.currentDate()) === HisDate.toStandardHisFormat(order.order_date);

            const hasTodayOrders = orders?.some(isToday);

            return {
                url: hasTodayOrders ? "OPDConsultationPlan" : "OPDvitals",
                actionName: hasTodayOrders ? "Continue OPD consultation" : "Start OPD consultation",
            };
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
        const authorizedPrograms = programStore.programs.authorizedPrograms;

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
        const programData = programStore.programs;
        if (!programs) {
            programs = {
                activeProgramID: programData.activeProgramID,
                name: programData.name,
            };
        }
        programStore.setProgramInformation(programs, authorizedPrograms);
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
                    } else if (visits.includes(HisDate.currentDate())) {
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
    static async setProgramUserActions() {
        const actions = await this.setNCDValue();
        const generalStore = useGeneralStore();
        generalStore.setNCDUserActions(actions);
        return actions;
    }
}
