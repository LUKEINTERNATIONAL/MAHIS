<template>
    <div>
        <ion-row>
            <ion-col>
                <VueMultiselect
                    style="margin-top: 27px;"
                    v-model="selected_drug"
                    @update:model-value="selectedDrugName($event)"
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
                    @search-change="FindDrugName($event)"
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
    name: "Menu",
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
    data() {
        const selectedDrugName = (data: any) => {

        }
        const FindDrugName = async (text: any) => {
            const treatment_plan_store = useTreatmentPlanStore() 
            const searchText = text
            const page = 1,
                limit = 10;
            const drugs: ConceptName[] = await DrugService.getOPDDrugs({
                name: searchText,
                page: page,
                page_size: limit,
            })
            drugs.map((drug: any) => ({
                label: drug.name,
                value: drug.name,
                other: drug,
            }))

            treatment_plan_store.setPartialOPDdrugList(drugs)
        }
        const OPDDrugList = computed(() => this.partialOPDdrugList)
        const selected_drug = ref()
        return {
            test: '',
            selected_drug,
            selectedDrugName,
            FindDrugName,
            OPDDrugList
        };
    },
    setup() {
        return {  };
    },
    computed: {
        ...mapState(useTreatmentPlanStore, ["partialOPDdrugList",]), 
    },
    watch: {
        
    },
    async mounted() {

    },
    methods: {
        
    },
})
</script>

<style scoped>

</style>