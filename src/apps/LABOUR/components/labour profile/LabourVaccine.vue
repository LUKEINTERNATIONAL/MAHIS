<template>
    <div class="container">
        <ion-accordion-group ref="accordionGroup" class="previousView ion-margin-bottom">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Vaccine History</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <LabourMedications />
                </div>
            </ion-accordion>
        </ion-accordion-group>
        <ion-card class="section">
            <ion-card-content>
                <basic-form
                    :contentData="labourTetanus"
                    @update:selected="handleInputData"
                    @update:inputValue="handleInputData"
                    :initialData="initialData"
                ></basic-form>
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
    menuController,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect,
    IonRadio,
    IonRadioGroup,
} from "@ionic/vue";
import LabourMedications from "@/apps/LABOUR/components/labour profile/LabourMedications.vue";
import BasicForm from "../../../../components/BasicForm.vue";
import { icons } from "../../../../utils/svg";
import BasicInputField from "../../../../components/BasicInputField.vue";
import { mapState } from "pinia";
import { checkmark, pulseOutline } from "ionicons/icons";
import { pastObstreticValidationShema, useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import { getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
import BasicCard from "@/components/BasicCard.vue";
import { validateField } from "@/services/ANC/profile_validation_service";
import StandardValidations from "@/validations/StandardValidations";
import HisDate from "@/utils/Date";
import { YupValidateField } from "@/services/validation_service";
import { useLabourVaccineStore } from "../../stores/labour profile/labourVaccineHistory";

export default defineComponent({
    name: "Current",
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
        LabourMedications,
    },

    data() {
        return {
            iconsContent: icons,
            currentPregnanciesInstance: {} as any,
            inputField: "" as any,
            setName: "" as any,
            initialData: [] as any,
            initialData1: [] as any,
            initialData2: [] as any,
        };
    },
    computed: {
        // ...mapState(useCurrentPregnanciesStore, ["palpation"]),
        // ...mapState(useCurrentPregnanciesStore, ["lmnp"]),
        ...mapState(useLabourVaccineStore, ["labourTetanus"]),
        // ...mapState(useCurrentPregnanciesStore, ["tetanus"]),
        // ...mapState(useCurrentPregnanciesStore, ["ultrasound"]),
    },
    mounted() {
        const palpation = useCurrentPregnanciesStore();
        const lnmp = useCurrentPregnanciesStore();
        const ultrasound = useCurrentPregnanciesStore();
        const tetanus = useCurrentPregnanciesStore();
        this.initialData = lnmp.getInitial();
        this.initialData1 = ultrasound.getInitial1();
        this.initialData2 = tetanus.getInitial2();
        this.handleTetanus();
        this.validaterowData({});
        // this.handlettv1()

        this.handleUnderImmunised();
        this.handleOneDose();
        this.handleTwoDose();
        this.handleThreeDose();
        this.handleFourDose();
        this.handleNodoses();
        this.handleOtherDoses();

        // this.resetDoseFields()
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    watch: {
        lmnp: {
            handler(event) {
                this.handleInputData(event);
                this.handleTetanus();
                // this.handlettv1()

                this.handleUnderImmunised();
                this.handleOneDose();
                this.handleTwoDose();
                this.handleThreeDose();
                this.handleFourDose();
                this.handleNodoses();
                this.handleOtherDoses();

                //this.resetDoseFields()
            },
            deep: true,
        },
    },
    methods: {
        async handleImmunValidation(event: any) {
            YupValidateField(this.labourTetanus, pastObstreticValidationShema, event.name, event.value);
        },
        validationRules(event: any) {
            return validateField(this.labourTetanus, event.name, (this as any)[event.name]);
        },

        // Validations
        validaterowData(event: any) {
            this.validationRules(event);
        },

        async handleInputData(event: any) {
            this.handleImmunValidation(event);
            this.validaterowData(event);
        },

        handleTetanus() {
            if (getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "fully immunised") {
                modifyFieldValue(this.labourTetanus, "tt1Date", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "tt2Date", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "tt3Date", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "tt4Date", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "tt5Date", "displayNone", false);
            } else {
                modifyFieldValue(this.labourTetanus, "tt1Date", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "tt2Date", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "tt3Date", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "tt4Date", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "tt5Date", "displayNone", true);
            }
        },
        handleUnderImmunised() {
            if (getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "under immunised") {
                modifyRadioValue(this.labourTetanus, "Number of tetanus doses", "displayNone", false);
            } else {
                modifyRadioValue(this.labourTetanus, "Number of tetanus doses", "displayNone", true);
            }
        },
        handleOneDose() {
            if (
                getRadioSelectedValue(this.labourTetanus, "Number of tetanus doses") == "one dose" &&
                getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "under immunised"
            ) {
                modifyFieldValue(this.labourTetanus, "tt6Date", "displayNone", false);
            } else {
                modifyFieldValue(this.labourTetanus, "tt6Date", "displayNone", true);
            }
        },
        handleTwoDose() {
            if (
                getRadioSelectedValue(this.labourTetanus, "Number of tetanus doses") == "two doses" &&
                getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "under immunised"
            ) {
                modifyFieldValue(this.labourTetanus, "tt7Date", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "tt8Date", "displayNone", false);
            } else {
                modifyFieldValue(this.labourTetanus, "tt7Date", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "tt8Date", "displayNone", true);
            }
        },
        handleThreeDose() {
            if (
                getRadioSelectedValue(this.labourTetanus, "Number of tetanus doses") == "three doses" &&
                getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "under immunised"
            ) {
                modifyFieldValue(this.labourTetanus, "tt9Date", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "tt10Date", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "tt11Date", "displayNone", false);
            } else {
                modifyFieldValue(this.labourTetanus, "tt9Date", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "tt10Date", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "tt11Date", "displayNone", true);
            }
        },
        handleFourDose() {
            if (
                getRadioSelectedValue(this.labourTetanus, "Number of tetanus doses") == "four doses" &&
                getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "under immunised"
            ) {
                modifyFieldValue(this.labourTetanus, "12", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "13", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "14", "displayNone", false);
                modifyFieldValue(this.labourTetanus, "15", "displayNone", false);
            } else {
                modifyFieldValue(this.labourTetanus, "12", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "13", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "14", "displayNone", true);
                modifyFieldValue(this.labourTetanus, "15", "displayNone", true);
            }
        },
        handleNodoses() {
            if (getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "no doses") {
                modifyRadioValue(this.labourTetanus, "Reason Tetanus toxoid (TT) was not conducted", "displayNone", false);
            } else {
                modifyRadioValue(this.labourTetanus, "Reason Tetanus toxoid (TT) was not conducted", "displayNone", true);
            }
        },
        handleOtherDoses() {
            if (
                getRadioSelectedValue(this.labourTetanus, "Reason Tetanus toxoid (TT) was not conducted") == "other" &&
                getRadioSelectedValue(this.labourTetanus, "The woman received tetanus doses for immunization?") == "no doses"
            ) {
                modifyFieldValue(this.labourTetanus, "Other", "displayNone", false);
            } else {
                modifyFieldValue(this.labourTetanus, "Other", "displayNone", true);
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
    margin-bottom: 6px;
}

ion-card {
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
    font-size: medium;
}
</style>
