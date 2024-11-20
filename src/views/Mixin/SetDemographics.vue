<script lang="ts">
import { defineComponent } from "vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
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
            demographicsStore.setPatient(item);
            demographicsStore.setDemographics({
                name: fullName,
                mrn: this.patientIdentifier(item),
                NCDNumber: this.patientIdentifierNCD(item),
                birthdate: item.person.birthdate,
                category: "",
                gender: item.person.gender,
                patient_id: item.patient_id,
                address: address,
                phone: this.getPhone(item),
                country: item?.person?.addresses[0]?.country,
            });
        },
        setOfflineDemographics(item: any) {
            const demographicsStore = useDemographicsStore();
            let fullName = "";
            if (item.personInformation.middle_name && item.personInformation.middle_name != "N/A") {
                fullName = item.personInformation.given_name + " " + item.personInformation.middle_name + " " + item.personInformation.family_name;
            } else {
                fullName = item.personInformation.given_name + " " + item.personInformation.family_name;
            }
            demographicsStore.setPatient(item.patientData);
            demographicsStore.setDemographics({
                name: fullName,
                mrn: item.offlinePatientID,
                birthdate: item.personInformation.birthdate,
                category: "",
                gender: item.personInformation.gender,
                patient_id: item.offlinePatientID,
                address:
                    item?.personInformation?.current_district +
                    "," +
                    item?.personInformation?.current_traditional_authority +
                    "," +
                    item?.personInformation?.current_village,
                phone: item.personInformation.cell_phone_number,
            });
        },
        patientIdentifier(identifiers: any) {
            if (identifiers) {
                return identifiers.patient_identifiers
                    .filter((identifier: any) => identifier.identifier_type === 3)
                    .map((identifier: any) => identifier.identifier)
                    .join(", ");
            } else {
                return "";
            }
        },
        patientIdentifierNCD(identifiers: any) {
            if (identifiers) {
                return identifiers.patient_identifiers
                    .filter((identifier: any) => identifier.identifier_type === 31)
                    .map((identifier: any) => identifier.identifier)
                    .join(", ");
            } else {
                return "";
            }
        },
        getPhone(item: any) {
            return item.person.person_attributes.find((attribute: any) => attribute.type.name === "Cell Phone Number")?.value;
        },
    },
});
</script>
