<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-content>
                <basic-form :contentData="labourPrevPregnancies" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
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
import { icons } from "@/utils/svg";
import BasicInputField from "../../../../components/BasicInputField.vue";
import { mapState } from "pinia";
import { pastObstreticValidationShema, useObstreticHistoryStore } from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { checkmark, pulseOutline } from "ionicons/icons";
import {
    dynamicValue,
    getCheckboxSelectedValue,
    getFieldValue,
    getRadioSelectedValue,
    modifyCheckboxHeader,
    modifyCheckboxValue,
    modifyDynamicFieldValue,
    modifyFieldValue,
    modifyRadioValue,
} from "@/services/data_helpers";
import StandardValidations from "@/validations/StandardValidations";
import { validateField } from "@/services/ANC/profile_validation_service";
import BasicCard from "@/components/BasicCard.vue";
import { Service } from "@/services/service";
import { YupValidateField } from "@/services/validation_service";
import { useLabourCoplicationsStore } from "../../stores/labour profile/labourComplications";
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
            modeOfDelieveryRef: {},
            iconsContent: icons,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            prevPregnanciesInstance: {} as any,
            modeOfDeliveryInstance: {} as any,
            currentSection: 0,
            inputField: "" as any,
            alertMessage: "" as string,
        };
    },
    computed: {
        ...mapState(useLabourCoplicationsStore, ["labourPrevPregnancies"]),
    },
    mounted() {
        this.prevPregnanciesInstance = useObstreticHistoryStore();
        // this.prevPregnanciesInstance.setModeOfDelivery([])
        this.handleOther();

        this.validaterowData({});
    },
    watch: {
        LiveBirths: {
            handler(val) {
                if (val == 0 || !val) {
                    this.prevPregnanciesInstance.setModeOfDelivery(0);
                }
            },
        },
        prevPregnancies: {
            handler(val) {
                if (val && val[2].data.rowData[0].colData[0].value) {
                    const liveBirths = parseInt(val[2].data.rowData[0].colData[0].value);
                    this.prevPregnanciesInstance.setModeOfDelivery(liveBirths);
                }

                this.handleOther();
            },

            deep: true,
        },
        modeOfDelivery: {
            handler() {
                this.prevPregnanciesInstance.checkChanges();
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async handleObstreticValidation(event: any) {
            YupValidateField(this.labourPrevPregnancies, pastObstreticValidationShema, event.name, event.value);
        },
        handleOther() {
            if (getCheckboxSelectedValue(this.labourPrevPregnancies, "Other")?.value == "other") {
                modifyFieldValue(this.labourPrevPregnancies, "Other notes", "displayNone", false);
            } else {
                modifyFieldValue(this.labourPrevPregnancies, "Other notes", "displayNone", true);
            }
            const checkBoxes = [
                "Asphyxia",
                "Does not know",
                "Pre-eclampsia",
                "Eclampsia",
                "Puerperal Sepsis",
                "Baby died within 24hrs of birth",
                "Convulsions",
                "Forceps",
                "Gestational diabetes mellitus",
                "Heavy bleeding",
                "Macrosomia",
                "Perineal tear (3rd or 4th degree)",
                "Other",
            ];

            if (getCheckboxSelectedValue(this.labourPrevPregnancies, "None")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourPrevPregnancies, checkbox, "checked", false);
                    modifyCheckboxValue(this.labourPrevPregnancies, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.labourPrevPregnancies, checkbox, "disabled", false);
                });
            }
        },

        //Handling input data on Profile-Past Obstetric history
        async handleInputData(event: any) {
            this.validaterowData(event);
            this.handleObstreticValidation(event);
        },

        // Validations
        validaterowData(event: any) {
            //this.validationRules(event)
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
