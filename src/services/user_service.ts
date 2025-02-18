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

    static getUserVillages(id: number) {
        return this.getJson(`users/${id}/get_user_villages`);
    }

    static doesUsernameExist(username: string) {
        return this.getJson(`/check_username`, { username });
    }

    static updateuserVillages(id: number, user_village_ids = []) {
        return this.putJson(`users/${id}/update_user_villages`, { user_village_ids });
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
    static getAllUsers(page = 1, pageSize = 10, search_string = "") {
        return this.getJson("users", { page: page, page_size: pageSize, search_string: search_string });
    }

    static getAllRoles() {
        return this.getJson("roles", { page_size: 100 });
    }

    static getUsers() {
        return super.getJson("users", { role: "Provider" });
    }

    static getUsersByRole(role: any) {
        return super.getJson("users", role);
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
    static async setNCDNumber() {
        const j = await ProgramService.getNextSuggestedNCDNumber();
        if (j) {
            const NCDNumber = useEnrollementStore();
            modifyFieldValue(NCDNumber.$state.NCDNumber, "NCDNumber", "value", j.ncd_number.replace(/^\D+|\s/g, ""));
            modifyFieldValue(NCDNumber.$state.NCDNumber, "NCDNumber", "leftText", `${j.ncd_number.replace(/\d+/g, "")}-NCD-`);
        }
    }
}
