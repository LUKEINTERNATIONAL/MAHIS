import { UserService } from "@/services/user_service"
import { LocationService } from "@/services/location_service"
import { Service } from "@/services/service"

export async function getUserLocation() {
    const userId: any = Service.getUserID();
    const user_data = await UserService.getUserByID(userId)
    if (user_data.location_id != null) {
            const response = await LocationService.getLocation(user_data.location_id)
            return response
    }
}