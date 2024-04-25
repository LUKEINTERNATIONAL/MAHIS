<template>
    <div class="modal_wrapper">
        <basic-form
            :contentData="fourteenWeeksImmunization"
            :initialData="initialData"
            @update:inputValue="handleInputData"
            @update:selected="handleInputData"
        ></basic-form>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { useImmunizationStore } from "@/apps/Immunization/stores/ImmunizationStore";
import { mapState } from "pinia";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyFieldValue,
    modifyRadioValue,
} from "@/services/data_helpers";
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
        BasicForm,
    },

    data() {
        return {
            initialData: [] as any,
        };
    },
    computed: {
        ...mapState(useImmunizationStore, ["fourteenWeeksImmunization"]),
    },
    mounted() {
        const medicationHistory = useImmunizationStore();
        // this.initialData = medicationHistory.getInitial();
    },
    methods: {
        handleInputData(event: any) {
            modifyFieldValue(this.fourteenWeeksImmunization, "Current hypertension treatment regimen", "popOverData", {
                filterData: true,
                data: [
                    { name: "Captopril 12.5mg" },
                    { name: "Aspirin 75mg" },
                    { name: "Hydrochlorothiazide 25mg" },
                    { name: "Enalapril Meleate 5mg" },
                    { name: "Enalapril Maleate 10mg" },
                ],
            });
        },
    },
});
</script>

<style scoped></style>
