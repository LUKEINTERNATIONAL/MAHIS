import {LocationService} from "@/services/location_service"

export async function getSpecialistClinics(): Promise<[]> {
    const clinics = await LocationService.getSpecialistClinics()
    return clinics.map((clinic: any) => ({
        name: clinic.name,
        value: clinic.name,
        other: clinic
    }))
}

export async function getFacilityWards(filter=''): Promise<[]> {
    const wards = await LocationService.getFacilities({
        name: filter,
        tag: 'Facility adult sections'
    })

    return wards.map((ward: any) => ({
        name: ward.name,
        value: ward.name,
        other: ward
    }))
}