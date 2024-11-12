<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-content>
                <basic-form :contentData="pastProblems"></basic-form>
            </ion-card-content>
        </ion-card>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect,
    IonRadio,
    IonRadioGroup,
} from "@ionic/vue";
import BasicForm from "../../../../components/BasicForm.vue";
import { icons } from "../../../../utils/svg";
import BasicInputField from "../../../../components/BasicInputField.vue";
import { mapState } from "pinia";
import { checkmark, pulseOutline } from "ionicons/icons";
import {
    dynamicValue,
    getCheckboxSelectedValue,
    getFieldValue,
    getRadioSelectedValue,
    modifyCheckboxValue,
    modifyFieldValue,
    modifyRadioValue,
} from "@/services/data_helpers";
import BasicCard from "@/components/BasicCard.vue";
import { useLabourQuickCheckStore } from "@/apps/LABOUR/stores/physical exam/labourQuickCheck";
export default defineComponent({
    name: "History",
    components: {
        BasicCard,
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
        IonRadio,
        IonRadioGroup,
    },

    data() {
        return {
            iconsContent: icons,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            inputField: "" as any,
        };
    },
    computed: {
        ...mapState(useLabourQuickCheckStore, ["pastProblems"]),
    },
    mounted() {
        this.handleDangerSigns();
        this.handleChckedDangerSigns();
        this.handleInLabour();
    },
    watch: {
        pastProblems: {
            handler() {
                this.handleDangerSigns();
                this.handleChckedDangerSigns();
                this.handleInLabour();
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        handleDangerSigns() {
            if (getCheckboxSelectedValue(this.pastProblems, "Other danger signs")?.value == "other danger signs") {
                modifyFieldValue(this.pastProblems, "otherC", "displayNone", false);
            } else {
                modifyFieldValue(this.pastProblems, "otherC", "displayNone", true);
            }
        },
        handleChckedDangerSigns() {
            const checkBoxes = [
                "Bleeding vaginally",
                "Central cyanosis",
                "Pre-term labour",
                "Severe vomiting",
                "Fever",
                "Visual disturbance",
                "Severe abdominal pain",
                "Unconscious",
                "No fetal movement",
                "Difficulties in breathing",
                "Jaundice",
                "Other danger signs",
            ];

            if (getCheckboxSelectedValue(this.pastProblems, "No danger signs")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.pastProblems, checkbox, "checked", false);
                    modifyCheckboxValue(this.pastProblems, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.pastProblems, checkbox, "disabled", false);
                });
            }
        },

        handleInLabour() {
            if (getRadioSelectedValue(this.pastProblems, "reason") == "In labour") {
                modifyFieldValue(this.pastProblems, ["Time"], "displayNone", false);
                modifyRadioValue(this.pastProblems, "Labour onset type", "displayNone", false);
                modifyRadioValue(this.pastProblems, "Membranes ruptured", "displayNone", false);
                modifyFieldValue(this.pastProblems, "Time Membrane", "displayNone", false);
                modifyRadioValue(this.pastProblems, "food in 4 hours", "displayNone", false);
                modifyRadioValue(this.pastProblems, "Homemade medicines taken", "displayNone", false);
                modifyRadioValue(this.pastProblems, "Sleep", "displayNone", false);
            } else {
                modifyFieldValue(this.pastProblems, "Time", "displayNone", true);
                modifyRadioValue(this.pastProblems, "Labour onset type", "displayNone", true);
                modifyRadioValue(this.pastProblems, "Membranes ruptured", "displayNone", true);
                modifyFieldValue(this.pastProblems, "Time Membrane", "displayNone", true);
                modifyRadioValue(this.pastProblems, "food in 4 hours", "displayNone", true);
                modifyRadioValue(this.pastProblems, "Homemade medicines taken", "displayNone", true);
                modifyRadioValue(this.pastProblems, "Sleep", "displayNone", true);
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
    max-width: 1300px;
    margin-bottom: 20px;
}

ion-card {
    box-shadow: none;
    background-color: inherit;
    width: 100%;
    color: black;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
}

@media (max-width: 1500px) {
    .container {
        padding: 10px;
    }
}
.sub_item_header {
    font-weight: bold;
    font-size: 14px;
}
</style>
