<template>
    <div class="container">
        <!-- Past Surgeries -->
        <ion-card class="section">
            <ion-card-content>
                <basic-form :contentData="labourPastSurgeries" :initialData="initialData"></basic-form>
            </ion-card-content>
        </ion-card>

        <!--        &lt;!&ndash; HIV &ndash;&gt;-->
        <!--            <ion-card  class="section">-->
        <!--            <ion-card-header>-->
        <!--                <ion-card-title class="dashed_bottom_border sub_item_header">HIV</ion-card-title>-->
        <!--            </ion-card-header>-->
        <!--            <ion-card-content>-->
        <!--                <basic-form :contentData="hivTest"></basic-form>-->
        <!--            </ion-card-content>-->
        <!--            </ion-card>-->

        <!-- Syphilis Test -->

        <!--            <ion-card class="section">-->
        <!--            <ion-card-header>-->
        <!--                <ion-card-title class="dashed_bottom_border sub_item_header">Syphilis</ion-card-title>-->
        <!--            </ion-card-header>-->
        <!--            <ion-card-content>-->
        <!--                <basic-form :contentData="syphilisTest"></basic-form>-->
        <!--            </ion-card-content>-->
        <!--            </ion-card>-->

        <!--    &lt;!&ndash; Navigation Buttons &ndash;&gt;-->
        <!--    <div class="navigation-buttons">-->
        <!--      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Save</ion-button>-->
        <!--    </div>-->
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
import { useLabourPastSurgeriesStore } from "../../stores/labour profile/labourPastSurgeries";

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

        this.handleSurgries();
    },

    watch: {
        medicalHistory: {
            handler() {
                this.handleSurgries();
                this.handleDisable();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useLabourPastSurgeriesStore, ["labourPastSurgeries"]),
    },
    methods: {
        async getFacility(value: any) {
            const data = await LocationService.getFacilities({ name: value });
            return data;
        },

        handleSurgries() {
            const checkBoxes = [
                "Dilation and currettage",
                "Myomectomy",
                "Removal of ovarian cystst",
                "Oophorectomy",
                "Removal of ovarian cyst",
                "Salpingectomy",
                "Cervical cone",
                "Other",
            ];

            if (getCheckboxSelectedValue(this.labourPastSurgeries, "None")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourPastSurgeries, checkbox, "checked", false);
                    modifyCheckboxValue(this.labourPastSurgeries, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourPastSurgeries, checkbox, "disabled", false);
                });
            }
        },

        handleDisable() {
            if (getCheckboxSelectedValue(this.labourPastSurgeries, "NoSurgery") == "otherSurguries") {
                modifyCheckboxHeader(this.labourPastSurgeries, "Other", "disabled", true);
            } else {
                modifyCheckboxHeader(this.labourPastSurgeries, "Other", "disabled", false);
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
