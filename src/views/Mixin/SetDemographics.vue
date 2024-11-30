<script lang="ts">
import { defineComponent } from "vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { getPersonAttribute } from "@/interfaces/personAttribute";
export default defineComponent({
    data: () => ({
        districtList: [] as any,
    }),
    methods: {
        setDemographics(item: any) {
            let fullName = "";
            if (item.person.names[0].middle_name && item.person.names[0].middle_name != "N/A") {
                fullName = item.person.names[0].given_name + " " + item.person.names[0].middle_name + " " + item.person.names[0].family_name;
            } else {
                fullName = item.person.names[0].given_name + " " + item.person.names[0].family_name;
            }
            const addressComponents = [
                item?.person?.addresses[0]?.state_province,
                item?.person?.addresses[0]?.township_division,
                item?.person?.addresses[0]?.city_village,
            ];

            const address = addressComponents.filter(Boolean).join(",");
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(this.buildPatientData(item));
        },
        setOfflineDemographics(item: any) {
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(item);
        },
        patientIdentifier(identifiers: any, id: any) {
            if (identifiers) {
                return identifiers.patient_identifiers
                    .filter((identifier: any) => identifier.identifier_type === 3)
                    .map((identifier: any) => identifier.identifier)
                    .join(", ");
            } else {
                return "";
            }
        },
        getPhone(item: any) {
            return item.person.person_attributes.find((attribute: any) => attribute.type.name === "Cell Phone Number")?.value;
        },
        buildPatientData(record: any) {
            return {
                patientID: record.patient_id,
                ID: this.patientIdentifier(record, 3),
                NcdID: this.patientIdentifier(record, 31),
                DocID: this.patientIdentifier(record, 27),
                personInformation: {
                    given_name: record.person.names[0].given_name,
                    middle_name: record.person.names[0].middle_name,
                    family_name: record.person.names[0].family_name,
                    gender: record.person.gender,
                    birthdate: record.person.birthdate,
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
                    cell_phone_number: this.getAttribute(record, "Cell Phone Number"),
                    occupation: this.getAttribute(record, "Occupation"),
                    marital_status: this.getAttribute(record, "Civil Status"),
                    religion: "",
                    education_level: this.getAttribute(record, "EDUCATION LEVEL"),
                },
                guardianInformation: "",
                birthRegistration: "",
                otherPersonInformation: {
                    nationalID: "",
                    birthID: "",
                    relationshipID: "",
                },
                vitals: {},
                saveStatusPersonInformation: "complete",
                saveStatusGuardianInformation: "complete",
                saveStatusBirthRegistration: "complete",
                date_created: "",
                creator: "",
            };
        },
        getAttribute(item: any, name: any) {
            return item.person.person_attributes.find((attribute: any) => attribute.type.name === attribute)?.value;
        },
    },
});
</script>
