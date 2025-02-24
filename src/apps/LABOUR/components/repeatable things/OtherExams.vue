<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="otherExams" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
            </ion-card-content>
        </ion-card>
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header">Urine</ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="urine"></basic-form>
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
    modifyFieldValue,
    modifyRadioValue,
} from "@/services/data_helpers";
import BasicCard from "@/components/BasicCard.vue";
import { fetalSchema, useOtherExamsStore } from "@/apps/LABOUR/stores/repeatable things/otherExams";
import { YupValidateField } from "@/services/validation_service";
export default defineComponent({
    name: "FirstVaginalExamination",
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
        ...mapState(useOtherExamsStore, ["otherExams"]),
        ...mapState(useOtherExamsStore, ["urine"]),
    },
    mounted() {
        this.handleUrine();
        this.handleUrineColor();
        this.handleUrineColorOdour();
        this.handleDilated();
        this.handleGrade();
    },
    watch: {
        urine: {
            handler() {
                this.handleUrine();
                this.handleUrineColor();
                this.handleUrineColorOdour();
                this.handleDilated();
            },
            deep: true,
        },
        otherExams: {
            handler() {
                this.handleGrade();
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async handleValidateFatal(event: any) {
            YupValidateField(this.otherExams, fetalSchema, event.name, event.value);
        },
        async handleInputData(event: any) {
            this.handleValidateFatal(event);
        },
        handleGrade() {
            if (getCheckboxSelectedValue(this.otherExams, "Meconium stained")?.value == "meconium stained") {
                modifyRadioValue(this.otherExams, "Grade", "displayNone", false);
            } else {
                modifyRadioValue(this.otherExams, "Grade", "displayNone", true);
            }
        },
        handleUrine() {
            if (getRadioSelectedValue(this.urine, "woman urinated") == "yes") {
                modifyFieldValue(this.urine, "amount of urine", "displayNone", false);
            } else {
                modifyFieldValue(this.urine, "amount of urine", "displayNone", true);
            }
        },
        handleUrineColor() {
            if (getRadioSelectedValue(this.urine, "woman urinated") == "yes") {
                modifyFieldValue(this.urine, "color of urine", "displayNone", false);
            } else {
                modifyFieldValue(this.urine, "color of urine", "displayNone", true);
            }
        },
        handleUrineColorOdour() {
            if (getRadioSelectedValue(this.urine, "woman urinated") == "yes") {
                modifyFieldValue(this.urine, "Odour", "displayNone", false);
            } else {
                modifyFieldValue(this.urine, "Odour", "displayNone", true);
            }
        },
        handleDilated() {
            if (getRadioSelectedValue(this.urine, "Fully dilated") == "yes") {
                modifyFieldValue(this.urine, "Time fully dilated", "displayNone", false);
            } else {
                modifyFieldValue(this.urine, "Time fully dilated", "displayNone", true);
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
