import { Service } from "@/services/service";
export async function buildPatientRecord(record: any) {
    if (!record?.person) return "";
    return {
        patientID: record.patient_id,
        ID: patientIdentifier(record, 3),
        NcdID: patientIdentifier(record, 31),
        personInformation: {
            given_name: record?.person?.names[0]?.given_name,
            middle_name: record?.person?.names[0]?.middle_name,
            family_name: record?.person?.names[0]?.family_name,
            gender: record?.person?.gender,
            birthdate: record?.person?.birthdate,
            birthdate_estimated: "false",
            home_region: "",
            home_district: record?.person?.addresses[0]?.address2,
            home_traditional_authority: record?.person?.addresses[0]?.county_district,
            home_village: record?.person?.addresses[0]?.neighborhood_cell,
            current_region: "",
            current_district: record?.person?.addresses[0]?.state_province,
            current_traditional_authority: record?.person?.addresses[0]?.township_division,
            current_village: record?.person?.addresses[0]?.city_village,
            country: record?.person?.addresses[0]?.country,
            landmark: "",
            cell_phone_number: getAttribute(record, "Cell Phone Number"),
            occupation: getAttribute(record, "Occupation"),
            marital_status: getAttribute(record, "Civil Status"),
            religion: "",
            education_level: getAttribute(record, "EDUCATION LEVEL"),
        },
        guardianInformation: "",
        birthRegistration: await getBirthRegistration(record.patient_id),
        otherPersonInformation: {
            nationalID: "",
            birthID: "",
            relationshipID: "",
        },
        vitals: {
            saved: await getVitals(record.patient_id),
            unsaved: [],
        },
        vaccineSchedule: await getVaccineAdministration(record.patient_id),
        vaccineAdministration: {
            orders: [],
            obs: [],
            voided: [],
        },
        saveStatusPersonInformation: "complete",
        saveStatusGuardianInformation: "complete",
        saveStatusBirthRegistration: "complete",
        date_created: "",
        creator: "",
    };
}

function patientIdentifier(identifiers: any, identifier_type_id: any) {
    if (identifiers) {
        return identifiers.patient_identifiers
            .filter((identifier: any) => identifier.identifier_type === identifier_type_id)
            .map((identifier: any) => identifier.identifier)
            .join(", ");
    } else {
        return "";
    }
}
function getAttribute(item: any, name: any) {
    return item.person.person_attributes.find((attribute: any) => attribute.type.name === name)?.value;
}
async function getBirthRegistration(patientId: any) {
    const encounters = await Service.getJson("/encounters", {
        encounter_type_id: 5,
        patient_id: patientId,
        paginate: false,
    });
    return encounters.flatMap((encounter: any) => {
        return encounter.observations
            .filter((observation: any) => [11764, 11759, 3753].includes(observation.concept_id))
            .map((observation: any) => ({
                concept_id: observation.concept_id,
                obs_datetime: observation.obs_datetime,
                value_text: observation.value_text,
            }));
    });
}
async function getVitals(patientId: any) {
    const encounters = await Service.getJson("/encounters", {
        encounter_type_id: 6,
        patient_id: patientId,
        paginate: false,
    });
    return encounters.flatMap((encounter: any) => {
        return encounter.observations
            .filter((observation: any) => [5089, 5088, 5087, 5086, 5085, 5090, 5092, 5242, 2137].includes(observation.concept_id))
            .map((observation: any) => ({
                concept_id: observation.concept_id,
                obs_datetime: observation.obs_datetime,
                value_numeric: observation.value_numeric,
                obs_id: observation.obs_id,
            }));
    });
}
async function getVaccineAdministration(patientID: any) {
    return await Service.getJson("eir/schedule", { patient_id: patientID });
}
