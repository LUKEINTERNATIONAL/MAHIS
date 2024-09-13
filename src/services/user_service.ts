import { Role } from "@/interfaces/role";
import { Service } from "./service";
import { User } from "@/interfaces/user";
import { useGeneralStore } from "@/stores/GeneralStore";
import { PatientService } from "@/services/patient_service";
import HisDate from "@/utils/Date";
import { Program } from "../interfaces/program";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { ProgramService } from "@/services/program_service";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { OrderService } from "@/services/order_service";
import { useDemographicsStore } from "@/stores/DemographicStore";

export class UserService extends Service {
    constructor() {
        super();
    }

    static getCurrentUser(): Promise<User> | undefined {
        const userID: null | number = Service.getUserID();
        if (userID) {
            return this.getUserByID(userID);
        }
    }

    static getUserByID(userID: number) {
        return this.getJson(`users/${userID}`);
    }

    static createUser(data: Record<string, any>) {
        return this.postJson(`users`, data);
    }

    static updateUser(id: number, data: Record<string, any>) {
        return this.putJson(`users/${id}`, data);
    }

    static updateusername(id: number, data: Record<string, any>) {
        return this.putJson(`users/${id}/update_username`, data);
    }

    static activateUser(id: number) {
        return this.postJson(`users/${id}/activate`, {});
    }

    static deactivateUser(id: number) {
        return this.postJson(`users/${id}/deactivate`, {});
    }
    static isAdmin() {
        const roles = super.getUserRoles().filter((role: Role) => {
            return role.role.match(/Program Manager|Superuser|System Developer/i);
        });
        return roles.length > 0;
    }
    static isDataManager() {
        return super.getUserRoles().some(({ role }: any) => role.match(/data manager|Superuser/i));
    }
    static isNurse() {
        const roles = super.getUserRoles().filter((role: Role) => {
            return role.role.match(/Nurse/i);
        });
        return roles.length > 0;
    }
    static isDoctor() {
        const roles = super.getUserRoles().filter((role: Role) => {
            return role.role.match(/Doctor/i);
        });
        return roles.length > 0;
    }
    static isClinician() {
        const roles = super.getUserRoles().filter((role: Role) => {
            return role.role.match(/Clinician/i);
        });
        return roles.length > 0;
    }
    static getAllUsers() {
        return this.getJson("users", { page_size: 100 });
    }

    static getAllRoles() {
        return this.getJson("roles", { page_size: 100 });
    }

    static getUsers() {
        return super.getJson("users", { role: "Provider" });
    }

    static getSystemUsageByUsers(startDate: string, endDate: string) {
        return super.getJson("user_system_usage", {
            start_date: startDate,
            end_date: endDate,
            program_id: super.getProgramID(),
            date: super.getSessionDate(),
        });
    }
    static async getUserActivities(activities: any) {
        try {
            const userID = Service.getUserID();
            const userData = await UserService.getJson("user_properties", {
                user_id: userID,
                property: activities,
            });
            if (userData.property_value) {
                return userData.property_value.split(",");
            } else {
                return []; // Return an empty array if property_value is not available
            }
        } catch (error) {
            // console.error("Error fetching user activities:", error);
            return []; // Return an empty array in case of error
        }
    }
    static async userProgramData(patientID = "") {
        const accessPrograms: any = localStorage.getItem("userPrograms");
        const programs = JSON.parse(accessPrograms);

        const filteredPrograms = [];
        for (const item of programs) {
            if (patientID) {
                if (item.name === "NCD PROGRAM") {
                    const NCDData: any = await this.setNCDValue();
                    if (NCDData) {
                        item.url = NCDData.url;
                        item.actionName = NCDData.actionName;
                        filteredPrograms.push(item);
                    }
                } else if (item.name === "IMMUNIZATION PROGRAM") {
                    item.url = "patientProfile";
                    item.actionName = "+ Enroll in Immunization program";
                    filteredPrograms.push(item);
                } else if (item.name === "OPD Program") {
                    const demographicsInstance = useDemographicsStore();
                    const demographics = demographicsInstance.getPatient();
                    const orders = await OrderService.getOrders(demographics.patient_id);
                    const filteredArray = await orders.filter((obj: any) => {
                        return HisDate.toStandardHisFormat(HisDate.currentDate()) === HisDate.toStandardHisFormat(obj.order_date);
                    });
                    if (filteredArray.length > 0) {
                        item.url = "OPDConsultationPlan";
                        item.actionName = "+ Continue OPD consultation";
                    } else {
                        item.url = "OPDvitals";
                        item.actionName = "+ Start OPD consultation";
                    }
                    filteredPrograms.push(item);
                } else if (item.name === "ANC PROGRAM") {
                    let ANCItem = { ...item }; // Create a new object
                    ANCItem.url = "ANCEnrollment";
                    ANCItem.actionName = "+ Enroll in ANC Program";
                    filteredPrograms.push(ANCItem);

                    let labourItem = { ...item }; // Create a new object
                    labourItem.url = "labour/labourHome";
                    labourItem.actionName = "+ Enroll in Labour and delivery program";
                    filteredPrograms.push(labourItem);

                    let pncItem = { ...item }; // Create a new object
                    pncItem.url = "pnc/Home";
                    pncItem.actionName = "+ Enroll in PNC program";
                    filteredPrograms.push(pncItem);
                }
            } else {
                item.url = "";
                item.actionName = item.name;
                filteredPrograms.push(item);
            }
        }

        // Return a Promise that resolves with filteredPrograms
        return Promise.resolve(filteredPrograms);
    }

    static async updateUserPrograms() {
        const userID: any = Service.getUserID();
        const data = await UserService.getUserByID(userID);
        localStorage.setItem("userPrograms", JSON.stringify(data.programs));
    }
    static async setNCDValue() {
        const patient = new PatientService();
        if (patient.getID()) {
            console.log("🚀 ~ UserService ~ setNCDValue ~ patient.getID():", patient.getID());
            const visits = await PatientService.getPatientVisits(patient.getID(), false);
            const activities = await this.getUserActivities("NCD_activities");
            let url = "";
            let NCDProgramActionName = "";
            if (patient.getNcdNumber() != "Unknown") {
                if (activities.length == 0) {
                    this.setNCDNumber();
                    url = "patientProfile";
                    NCDProgramActionName = "+ Edit NCD Enrollment";
                } else {
                    if (localStorage.getItem("saveProgressStatus") == "true") {
                        NCDProgramActionName = "+ Continue NCD consultation";
                    } else if (visits.includes(HisDate.currentDate())) {
                        NCDProgramActionName = "+ Edit NCD consultation";
                    } else NCDProgramActionName = "+ Start new NCD consultation";
                    url = "consultationPlan";
                }
            } else {
                this.setNCDNumber();
                url = "NCDEnrollment";
                NCDProgramActionName = "+ Enroll in NCD Program";
            }

            return {
                actionName: NCDProgramActionName,
                url: url,
            };
        }
    }
    static async setNCDNumber() {
        const j = await ProgramService.getNextSuggestedNCDNumber();
        const NCDNumber = useEnrollementStore();
        modifyFieldValue(NCDNumber.$state.NCDNumber, "NCDNumber", "value", j.ncd_number.replace(/^\D+|\s/g, ""));
        modifyFieldValue(NCDNumber.$state.NCDNumber, "NCDNumber", "leftText", `${j.ncd_number.replace(/\d+/g, "")}-NCD-`);
    }
    static async setProgramUserActions() {
        const actions = await this.setNCDValue();
        const generalStore = useGeneralStore();
        generalStore.setNCDUserActions([actions]);
    }
}
