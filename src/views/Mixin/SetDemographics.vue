<script lang="ts">
import { defineComponent } from "vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { getPersonAttribute } from "@/interfaces/personAttribute";
export default defineComponent({
    data: () => ({
        districtList: [] as any,
        workerApi: "" as any,
    }),
    methods: {
        setDemographics(item: any) {
            const addressComponents = [
                item?.person?.addresses[0]?.state_province,
                item?.person?.addresses[0]?.township_division,
                item?.person?.addresses[0]?.city_village,
            ];
            const address = addressComponents.filter(Boolean).join(",");
            const demographicsStore = useDemographicsStore();
            demographicsStore.setPatient(item);
        },
        getPatientIdentifier(identifiers: any, id: any) {
            if (identifiers) {
                return identifiers.patient_identifiers
                    .filter((identifier: any) => identifier.identifier_type === id)
                    .map((identifier: any) => identifier.identifier)
                    .join(", ");
            } else {
                return "";
            }
        },
    },
});
</script>
