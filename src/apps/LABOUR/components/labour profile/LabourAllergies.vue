<template>
    <div class="container">
        <ion-accordion-group ref="accordionGroup" class="previousView ion-margin-bottom">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Allergies History</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <LabourMedications />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <!-- Allegies -->
        <ion-card class="section">
            <ion-card-content>
                <basic-form :contentData="labourAllergies" :initialData="initialData1"></basic-form>
            </ion-card-content>
        </ion-card>
    </div>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect,
} from "@ionic/vue";
import LabourMedications from "@/apps/LABOUR/components/labour profile/LabourMedications.vue";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import { ref } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useMedicalHistoryStore } from "@/apps/ANC/store/profile/medicalHistoryStore";
import BasicForm from "@/components/BasicForm.vue";
import { LocationService } from "@/services/location_service";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue,
    // modifyCheckboxHeaderValue,
    modifyCheckboxInputField,
    modifyCheckboxHeader,
} from "@/services/data_helpers";
import { validateField } from "@/services/ANC/profile_validation_service";
import { useLabourAllergiesStore } from "../../stores/labour profile/labourAllergies";

//  import {icons} from "@/utils/svg.ts"

export default defineComponent({
    name: "Past Surguries",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonToggle,
        IonSelect,
        IonSelectOption,
        IonInput,
        BasicInputField,
        BasicForm,
    },
    data() {
        return {
            currentSection: 0,
            initialData: [] as any,
            initialData1: [] as any,
            initialData2: [] as any,

            //art data
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            conditionStatus: "" as any,
            data: [] as any,
            facilityData: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedCondition: "" as any,
        };
    },
    mounted() {
        const medicalHistory = useMedicalHistoryStore();
        const allegy = useMedicalHistoryStore();
        const exisitingChronicHealthConditions = useMedicalHistoryStore();
        const blood = useMedicalHistoryStore();
        const cancerIssue = useMedicalHistoryStore();
        const heartProblem = useMedicalHistoryStore();
        const diabetes = useMedicalHistoryStore();
        const hivTest = useMedicalHistoryStore();
        const syphilisTest = useMedicalHistoryStore();
        const hKTMI = useMedicalHistoryStore();
        const otherSite = useMedicalHistoryStore();
        this.initialData = medicalHistory.getInitial();
        this.initialData1 = allegy.getInitial1();
        this.initialData2 = exisitingChronicHealthConditions.getInitial2();

        this.handleAllergies();
    },

    watch: {
        allegy: {
            handler() {
                this.handleAllergies();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useLabourAllergiesStore, ["labourAllergies"]),
    },
    methods: {
        async getFacility(value: any) {
            const data = await LocationService.getFacilities({ name: value });
            return data;
        },
        // displaying other input fields when hiv positive is checked

        handleAllergies() {
            const checkBoxes = [
                "Other",
                "PrEP(TDF)",
                "Albendazole",
                "Aluminium-hydroxide",
                "Calcium",
                "Sulfadoxine-Pyrimethamine",
                "Chamomile",
                "Folic-acid",
                "Ginger",
                "Fish",
                "Iron",
                "Mebendazole",
                "Penicillin",
            ];

            if (getCheckboxSelectedValue(this.labourAllergies, "None")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourAllergies, checkbox, "checked", false);
                    modifyCheckboxValue(this.labourAllergies, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourAllergies, checkbox, "disabled", false);
                });
            }
        },
    },
});
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section {
    width: 100%;
    max-width: 1300px; /* Adjust max-width as needed */
    margin-bottom: 20px;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 500px; /* Adjust max-width as needed */
}

@media (max-width: 1500px) {
    .container {
        padding: 10px;
    }
}
.sub_item_header {
    font-weight: bold;
    font-size: medium;
}
ion-card {
    color: black;
    width: 100%;
}
</style>
