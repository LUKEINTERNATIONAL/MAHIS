import { Service } from "@/services/service";

export async function getPatientsList() {
    try {
        const data = await Service.getJson("mahis_dashboard");
        return data;
    } catch (error) {
        console.error("Error fetching patients list:", error);
        throw error;
    }
}
