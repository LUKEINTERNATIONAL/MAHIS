import { UserService } from "@/services/user_service"
import { LocationService } from "@/services/location_service"
import { Service } from "@/services/service"

// old way of using locations table
export async function getUserLocation() {
    const userId: any = Service.getUserID();
    const user_data = await UserService.getUserByID(userId)
    if (user_data.location_id != null) {
            const response = await LocationService.getLocation(user_data.location_id)
            return response
    }
}

export async function getUserFacility() {
    const userId: any = Service.getUserID();
    const user_data = await UserService.getUserByID(userId);
    if (user_data.location_id != null) {
        const response = await LocationService.getFacility(user_data.location_id);
        console.log(response);
        return response;
    }
}