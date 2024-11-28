<template>
    <div class="container">
        <ion-accordion-group ref="accordionGroup" class="previousView ion-margin-bottom">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Chronical Health conditions History</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <LabourChronicHistory />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <!-- Chronical Health conditions -->
        <ion-card class="section">
            <ion-card-content>
                <basic-form
                    :contentData="labourChronicHealthConditions"
                    :initialData="initialData2"
                    @update:selected="handleInputData"
                    @update:inputValue="handleInputData"
                ></basic-form>
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
import LabourChronicHistory from "@/apps/LABOUR/components/labour profile/LabourChronicHistory.vue";
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
import { useLabourChronicHealthConditionsStore } from "../../stores/labour profile/labourChronicHealthConditions";

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
        LabourChronicHistory,
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
        this.handleHivResults();
        this.handleSyphilis();
        this.handleChronicCondition();
        this.handleHivConducted();
        this.handleHivConductedOptin();
        this.handleOtherHiv();
        this.handleSyphlisdate();
        this.handleSyphilisNotDone();
        this.handleSpecifySyphilis();
        this.handleTestNotDone();
        this.handleHIVPositive();
    },

    watch: {
        hivTest: {
            handler() {
                this.handleHivResults();
                this.handleOtherHiv();
                this.handleHivConducted();
                this.handleTestNotDone();
                this.handleHivConductedOptin();
            },
            deep: true,
        },
        syphilisTest: {
            handler() {
                this.handleSyphilis();
                this.handleSyphlisdate();
                this.handleSyphilisNotDone();
                this.handleSpecifySyphilis();
            },
            deep: true,
        },

        exisitingChronicHealthConditions: {
            handler(col) {
                this.handleChronicCondition();
                this.handleHIVPositive();
                this.handleInputData(col);
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useLabourChronicHealthConditionsStore, ["labourChronicHealthConditions"]),
        ...mapState(useLabourChronicHealthConditionsStore, ["labourHivTest"]),
        ...mapState(useLabourChronicHealthConditionsStore, ["labourSyphilisTest"]),
        ExistingChronicConditions() {
            return getCheckboxSelectedValue(this.labourChronicHealthConditions, "chronic conditions");
        },
    },
    methods: {
        validationRules(col: any) {
            return validateField(this.labourChronicHealthConditions, col.name, (this as any)[col.name]);
        },
        async handleInputData(col: any) {
            this.validationRules(col);
            if (col.inputHeader == "Facility for ART") {
                this.facilityData = await this.getFacility(col.value);
                modifyFieldValue(this.labourChronicHealthConditions, "facility for art", "popOverData", {
                    filterData: false,
                    data: this.facilityData,
                });
            }
        },
        async getFacility(value: any) {
            const data = await LocationService.getFacilities({ name: value });
            return data;
        },
        // displaying other input fields when hiv positive is checked
        handleHIVPositive() {
            if (getCheckboxSelectedValue(this.labourChronicHealthConditions, "HIV positive")?.value == "hiv positive") {
                modifyFieldValue(this.labourChronicHealthConditions, "HIV test date", "displayNone", false);
                modifyRadioValue(this.labourChronicHealthConditions, "Is client on ART", "displayNone", false);
            } else {
                modifyFieldValue(this.labourChronicHealthConditions, "HIV test date", "displayNone", true);
                modifyRadioValue(this.labourChronicHealthConditions, "Is client on ART", "displayNone", true);
            }
        },
        handleHivResults() {
            if (getRadioSelectedValue(this.labourHivTest, "test2") == "hivPositive") {
                modifyRadioValue(this.labourHivTest, "test1", "displayNone", false);
            } else {
                modifyRadioValue(this.labourHivTest, "test1", "displayNone", true);
            }
        },

        handleHivConductedOptin() {
            if (getRadioSelectedValue(this.labourHivTest, "hivOption") == "hivTestConducted") {
                modifyRadioValue(this.labourHivTest, "test2", "displayNone", false);
            } else {
                modifyRadioValue(this.labourHivTest, "test2", "displayNone", true);
            }
        },
        handleOtherHiv() {
            if (getCheckboxSelectedValue(this.labourHivTest, "Other")?.value == "other") {
                modifyFieldValue(this.labourHivTest, "reasonsTestNotDone", "displayNone", false);
            } else {
                modifyFieldValue(this.labourHivTest, "reasonsTestNotDone", "displayNone", true);
            }
        },
        handleSyphilis() {
            if (getRadioSelectedValue(this.labourSyphilisTest, "syphilisOption") == "syphilisTestConducted") {
                modifyRadioValue(this.labourSyphilisTest, "syphilisDetails", "displayNone", false);
            } else {
                modifyRadioValue(this.labourSyphilisTest, "syphilisDetails", "displayNone", true);
            }
        },

        handleChronicCondition() {
            const checkBoxes = [
                "Auto-immune desease",
                "Asthma",
                "Sickle cell",
                "Anemia",
                "HIV positive",
                "Thalassemia",
                "Gynaecological",
                "CCF",
                "RHD",
                "Gynae Cancer",
                "Diabetes Type 1",
                "Diabetes Type 2",
                "Gestational diabetes",
                "pre-existing type 1",
                "pre-existing type 2",
                "Epilepsy",
                "Hypertension",
                "Kidney Disease",
                "TB",
                "Mental illness",
                "Other",
            ];

            if (getCheckboxSelectedValue(this.labourChronicHealthConditions, "None")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourChronicHealthConditions, checkbox, "checked", false);
                    modifyCheckboxValue(this.labourChronicHealthConditions, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourChronicHealthConditions, checkbox, "disabled", false);
                });
            }
        },
        handleHivConducted() {
            if (getRadioSelectedValue(this.labourHivTest, "hivOption") == "hivTestConducted") {
                modifyFieldValue(this.labourHivTest, "testDate", "displayNone", false);
            } else {
                modifyFieldValue(this.labourHivTest, "testDate", "displayNone", true);
            }
        },
        handleTestNotDone() {
            if (getRadioSelectedValue(this.labourHivTest, "hivOption") == "hivTestNotDone") {
                modifyCheckboxHeader(this.labourHivTest, "hivOutcome", "displayNone", false);
            } else {
                modifyCheckboxHeader(this.labourHivTest, "hivOutcome", "displayNone", true);
            }
        },
        handleSyphlisdate() {
            if (getRadioSelectedValue(this.labourSyphilisTest, "syphilisOption") == "syphilisTestConducted") {
                modifyFieldValue(this.labourSyphilisTest, "syphilisDate", "displayNone", false);
            } else {
                modifyFieldValue(this.labourSyphilisTest, "syphilisDate", "displayNone", true);
            }
        },

        handleSyphilisNotDone() {
            if (getRadioSelectedValue(this.labourSyphilisTest, "syphilisOption")?.value == "syphilisTestNotDone") {
                modifyCheckboxHeader(this.labourSyphilisTest, "notDone", "displayNone", false);
            } else {
                modifyCheckboxHeader(this.labourSyphilisTest, "notDone", "displayNone", true);
            }
        },
        handleSpecifySyphilis() {
            if (getCheckboxSelectedValue(this.labourSyphilisTest, "Other") == "other") {
                modifyFieldValue(this.labourSyphilisTest, "Reason", "displayNone", false);
            } else {
                modifyFieldValue(this.labourSyphilisTest, "Reason", "displayNone", true);
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
