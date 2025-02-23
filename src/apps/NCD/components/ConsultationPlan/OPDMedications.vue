<template>
    <div>
        <ion-row>
            <ion-col>
                <VueMultiselect
                    v-model="selected_drug"
                    @update:model-value="selectedDrugName"
                    :multiple="false"
                    :taggable="false"
                    :hide-selected="false"
                    :close-on-select="true"
                    openDirection="bottom"
                    tag-placeholder="Select medication"
                    placeholder="Select medication"
                    selectLabel=""
                    label="name"
                    :searchable="true"
                    @search-change="FindDrugName"
                    track-by="uuid"
                    :options="OPDDrugList"
                />
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonInput, IonPopover, IonLabel, IonCol, IonRow } from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import VueMultiselect from "vue-multiselect"
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore"
import { mapState } from "pinia";
import { DrugService } from "@/services/drug_service";
import { ConceptName } from "@/interfaces/conceptName";

export default defineComponent({
    name: "DrugSelector",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        IonPopover,
        VueMultiselect,
        IonLabel,
        IonCol,
        IonRow
    },
    emits: ['drug-selected'],  // Declare the emit event
    data() {
        const selectedDrugName = (data: ConceptName) => {
            // Emit the selected drug data to parent component
            this.$emit('drug-selected', data);
        }

        const FindDrugName = async (text: string) => {
            const treatment_plan_store = useTreatmentPlanStore()
            
            const searchText = text
            const page = 1,
                limit = 20;

            const drugs: any = await DrugService.getOfflineOPDDrugs({
                name: searchText,
                page: page,
                page_size: limit,
            })

            const formattedDrugs = drugs.map((drug: ConceptName) => ({
                label: drug.name,
                value: drug.name,
                other: drug,
                ...drug // Spread the original drug properties
            }))
            
            treatment_plan_store.setPartialOPDdrugList(formattedDrugs)
        }

        const OPDDrugList = computed(() => this.partialOPDdrugList)
        const selected_drug = ref<ConceptName | null>(null)

        return {
            selected_drug,
            selectedDrugName,
            FindDrugName,
            OPDDrugList
        };
    },
    computed: {
        ...mapState(useTreatmentPlanStore, ["partialOPDdrugList"]),
    },
})
</script>

<style scoped>
.multiselect {
    width: 100%;
}
</style>