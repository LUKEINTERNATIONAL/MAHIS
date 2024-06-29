<template>
    <div class="container">
        <!--  Fetal assessment-->
        <ion-card class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header">Fetal assessment results</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="fetalAssessment"></basic-form>
            </ion-card-content>
        </ion-card>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonToggle } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { useFetalAssessment } from "@/apps/ANC/store/physical exam/FetalAssessmentStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import { getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";

export default defineComponent({
    components: {
        IonToggle,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        BasicInputField,
        BasicForm,
    },
    data() {
        return {
            iconsContent: icons,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
        };
    },
    computed: {
        ...mapState(useFetalAssessment, ["fetalAssessment"]),
    },
    mounted() {
        this.handleFetalAssessment();
        this.handleFetalRate()
    },
    watch: {
        fetalAssessment: {
            handler() {
                this.handleFetalAssessment();
                this.handleFetalRate()
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        handleFetalAssessment() {
            if (getRadioSelectedValue(this.fetalAssessment, "Number of fetuses known") == "yes") {
                modifyFieldValue(this.fetalAssessment, "Number of fetuses", "displayNone", false);
            } else {
                modifyFieldValue(this.fetalAssessment, "Number of fetuses", "displayNone", true);
            }
        },
        handleFetalRate() {
            if (getRadioSelectedValue(this.fetalAssessment, "Fetal heartbeat") == "yes") {
                modifyFieldValue(this.fetalAssessment, "Fetal heart rate", "displayNone", false);
                modifyFieldValue(this.fetalAssessment, "Repeated fetal rate", "displayNone", false);
            } else {
                modifyFieldValue(this.fetalAssessment, "Fetal heart rate", "displayNone", false);
                modifyFieldValue(this.fetalAssessment, "Repeated fetal rate", "displayNone", false);
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
    box-shadow: none;
    background-color: inherit;
}
</style>
