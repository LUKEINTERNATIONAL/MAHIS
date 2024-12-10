<script lang="ts">
import { defineComponent } from "vue";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState } from "pinia";
import { RelationsService } from "@/services/relations_service";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { getOfflineRecords } from "@/services/offline_service";

export default defineComponent({
    data: () => ({
        relationships: [] as any,
        relationshipsData: [] as any,
        patientGender: "male",
        filteredRelationships: [],
    }),
    computed: {
        ...mapState(useRegistrationStore, ["guardianInformation", "personInformation"]),
        ...mapState(useDemographicsStore, ["patient"]),
        gender() {
            return getRadioSelectedValue(this.personInformation, "gender") || this.patient?.personInformation?.gender;
        },
    },
    watch: {
        $route: {
            async handler(route: any) {
                await this.getRelationships();
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        async getRelationships() {
            if (this.gender) {
                this.relationshipsData = await getOfflineRecords("relationship", "");
                this.filterRelationships();

                this.relationships = this.filteredRelationships
                    .map((r: any) => {
                        return [
                            {
                                name: r.b_is_to_a,
                                id: r.relationship_type_id,
                                trackByID: r.relationship_type_id + r.b_is_to_a,
                            },
                        ];
                    })
                    .reduce((acc: any, val: any) => acc.concat(val), []);
            }
        },
        filterRelationships() {
            const maleRelationships = ["Brother", "Father", "Son", "Grandfather", "Grandson", "Boyfriend", "Stepfather", "Stepson"];
            const femaleRelationships = ["Sister", "Mother", "Daughter", "Grandmother", "Granddaughter", "Girlfriend", "Stepmother", "Stepdaughter"];
            const commonRelationships = [
                "Spouse/Partner",
                "Aunt/Uncle",
                "Niece/Nephew",
                "Doctor",
                "Other",
                "Patient",
                "TB Contact Person",
                "TB Patient",
                "treatment suporter",
            ];
            if (this.relationshipsData?.length > 0) {
                this.filteredRelationships = this.relationshipsData.filter((relationship: any) => {
                    if (this.gender === "M") {
                        return maleRelationships.includes(relationship.a_is_to_b) || commonRelationships.includes(relationship.a_is_to_b);
                    } else if (this.gender === "F") {
                        return femaleRelationships.includes(relationship.a_is_to_b) || commonRelationships.includes(relationship.a_is_to_b);
                    }
                    return false;
                });
            }
        },
    },
});
</script>
