import {LocationService} from "@/services/location_service"
import { PatientAdmitService } from '@/services/patient_admit_service'
import { PatientReferralService } from '@/services/patient_referral_service'

export class OutCome {
    async onSubmitAdmission(patientID: any, providerID: any, admissionData: any) {
        const admissionService = new PatientAdmitService(patientID, providerID)
        await admissionService.createEncounter()
        await admissionService.saveObservationList(admissionData)

    }

    async onSubmitReferral(patientID: any, providerID: any, referralData: any) {
        const referralService = new PatientReferralService(patientID, providerID)
        await referralService.createEncounter()
        await referralService.saveObservationList(referralData)
    }
}

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