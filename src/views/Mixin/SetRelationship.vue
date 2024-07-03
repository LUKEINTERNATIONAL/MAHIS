<script lang="ts">
import { defineComponent } from "vue";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState } from "pinia";
import { RelationsService } from "@/services/relations_service";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
export default defineComponent({
    data: () => ({
        relationships: [] as any,
    }),
    computed: {
        ...mapState(useRegistrationStore, ["personInformation"]),
        gender() {
            return getRadioSelectedValue(this.personInformation, "gender");
        },
    },
    watch: {
        $route: {
            async handler(route: any) {
                const data = await RelationsService.getRelations();
                console.log(data);
                this.relationships = data
                    .map((r: any) => {
                        if (r.b_is_to_a == "Other") {
                            return [{ name: r.b_is_to_a, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.b_is_to_a }];
                        } else {
                            return [
                                {
                                    name: r.b_is_to_a + " to " + r.a_is_to_b,
                                    id: r.relationship_type_id,
                                    trackByID: r.relationship_type_id + r.b_is_to_a,
                                },
                            ];
                        }
                    })
                    .reduce((acc: any, val: any) => acc.concat(val), []);
            },
            immediate: true,
            deep: true,
        },
    },
});
</script>
