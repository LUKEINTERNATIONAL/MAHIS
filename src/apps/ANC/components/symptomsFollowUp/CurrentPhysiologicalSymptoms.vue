<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-content>
                <basic-form :contentData="physiologicalSymptoms" @update:selected="handleInputData"></basic-form>
            </ion-card-content>
        </ion-card>
    </div>
</template>

<script lang="ts">
import { IonItem, IonList } from "@ionic/vue";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useCurrentPhysiologicalSymptomsStore } from "@/apps/ANC/store/symptomsFollowUp/currentPhysiologicalSymptomsStore";
import BasicForm from "@/components/BasicForm.vue";
import { getCheckboxSelectedValue, modifyCheckboxValue } from "@/services/data_helpers";
import { validateField } from "@/services/ANC/symptoms_validation";

export default defineComponent({
    name: "Persistent Behaviour",
    components: {
        IonItem,
        IonList,
        BasicInputField,
        BasicForm,
    },

    mounted() {
        const physiologicalSymptoms = useCurrentPhysiologicalSymptomsStore();
        this.handleNone();
    },
    watch: {
        physiologicalSymptoms: {
            handler() {
                this.handleNone();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useCurrentPhysiologicalSymptomsStore, ["physiologicalSymptoms"]),
    },
    methods: {
        handleNone() {
            const checkBoxes = [
                "Abnormal pulse rate",
                "Cough lasting more than 3 weeks",
                "Pain – Low back",
                "Constipation",
                "Headache",
                "Heartburn",
                "Pain-Leg",
                "Pain-pelvic",
            ];

            if (getCheckboxSelectedValue(this.physiologicalSymptoms, "None")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.physiologicalSymptoms, checkbox, "checked", false);
                    modifyCheckboxValue(this.physiologicalSymptoms, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.physiologicalSymptoms, checkbox, "disabled", false);
                });
            }
        },
        validationRules(event: any) {
            return validateField(this.physiologicalSymptoms, event.name, (this as any)[event.name]);
        },

        async handleInputData(event: any) {
            this.validationRules(event);
        },
    },
});
</script>
<style scoped>
.sub_item_body {
    margin-left: 45px;
}

ion-item.sub_item_body_close {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
}
</style>
@/apps/ANC/store/symptomsFollowUpStore/currentPhysiologicalSymptomsStore
