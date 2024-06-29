<template>
    <div class="modal_wrapper">
        <div class="modal_title diplay_space_between">
            <span></span>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300">x</span>
        </div>
        <div class="OtherVitalsHeading">
            <div class="OtherVitalsTitle">Add Stock</div>
        </div>
        <div class="ion-padding" slot="content" style="padding-bottom: 200px">
            <div class="">
                <basic-form :contentData="stock" @update:inputValue="handleInputData"></basic-form>
            </div>
        </div>
        <div style="display: flex; justify-content: end; padding-bottom: 3px" @click="saveData()">
            <DynamicButton fill="solid" name="Save" />
        </div>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useStockStore } from "@/stores/StockStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import { ObservationService } from "@/services/observation_service";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import { PatientService } from "@/services/patient_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { RelationsService } from "@/services/relations_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { ConceptService } from "@/services/concept_service";
import { formatRadioButtonData, formatCheckBoxData, formatInputFiledData } from "@/services/formatServerData";
import { AppEncounterService } from "@/services/app_encounter_service";
import { PersonService } from "@/services/person_service";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { validateInputFiledData, validateRadioButtonData, validateCheckBoxData } from "@/services/group_validation";
import { StockService } from "@/services/stock_service";
import { DrugService } from "@/services/drug_service";

export default defineComponent({
    components: {
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
        PreviousVitals,
        customDatePicker,
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
            BMI: {} as any,
            BPStatus: {} as any,
            vValidations: "" as any,
            relationships: "" as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            validationStatus: { heightWeight: false, bloodPressure: false } as any,
            showPD: false as boolean,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useStockStore, ["stock"]),

        guardianFirstname() {
            return getFieldValue(this.stock, "guardianFirstname", "value");
        },
        guardianLastname() {
            return getFieldValue(this.stock, "guardianLastname", "value");
        },
        guardianMiddleName() {
            return getFieldValue(this.stock, "guardianMiddleName", "value");
        },
        guardianPhoneNumber() {
            return getFieldValue(this.stock, "guardianPhoneNumber", "value");
        },
        relationship() {
            return getFieldValue(this.stock, "relationship", "value");
        },
    },
    async mounted() {
        this.resetData();
        await this.getRelations();
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async createBatch() {
            const stockService = new StockService();
            const data = {
                batch_number: getFieldValue(this.stock, "batch", "value"),
                location_id: 721,
                items: [
                    {
                        barcode: "",
                        drug_id: getFieldValue(this.stock, "stock in", "value"),
                        expiry_date: getFieldValue(this.stock, "expire date", "value"),
                        quantity: getFieldValue(this.stock, "product name", "value"),
                        delivery_date: "",
                        product_code: "",
                        pack_size: "",
                    },
                ],
            };
            await stockService.postItems(data);
        },
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        resetData() {
            const rest = useStockStore();
            rest.setStock(rest.getInitialStock());
        },
        async createGuardian() {
            const data = await this.guardianData();
            if (validateInputFiledData(this.stock)) {
                const guardian: any = new PatientRegistrationService();
                await guardian.registerGuardian(data);
                const guardianID = guardian.getPersonID();
                const selectedID = getFieldValue(this.stock, "relationship", "value").id;
                if (selectedID) await RelationsService.createRelation(this.demographics.patient_id, guardianID, selectedID);
                toastSuccess("Guarding information save successfully", 3000);
                return true;
            } else {
                toastWarning("Guarding Information not save", 3000);
                return false;
            }
        },
        async getRelations() {
            modifyFieldValue(this.stock, "product name", "value", "");
            const drugs = await DrugService.getDrugs();
            console.log("🚀 ~ getRelations ~ drugs:", drugs);
            this.relationships = await RelationsService.getRelations();
            const data = this.relationships
                .map((r: any) => {
                    if (r.b_is_to_a == "Other") {
                        return [{ name: r.b_is_to_a, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.b_is_to_a }];
                    } else {
                        return [
                            { name: r.b_is_to_a + " to " + r.a_is_to_b, id: r.relationship_type_id, trackByID: r.relationship_type_id + r.b_is_to_a },
                        ];
                    }
                })
                .reduce((acc: any, val: any) => acc.concat(val), []);

            modifyFieldValue(this.stock, "product name", "multiSelectData", data);
        },

        async saveData() {
            if (await this.createGuardian()) modalController.dismiss();
        },
        async guardianData() {
            return {
                person_id: this.demographics.patient_id,
                given_name: this.guardianFirstname,
                family_name: this.guardianLastname,
                middle_name: this.guardianMiddleName,
                gender: "",
                birthdate: "",
                cell_phone_number: this.guardianPhoneNumber,
                birthdate_estimated: false,
                home_district: "",
                home_traditional_authority: "",
                home_village: "",
                current_district: "",
                current_traditional_authority: "",
                current_village: "",
                landmark: "",
                occupation: "",
                facility_name: "",
                patient_type: "",
                national_id: getFieldValue(this.stock, "guardianNationalID", "value"),
            };
        },
        handleInputData(event: any) {},

        dismiss() {
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
.vitals_title {
    margin-bottom: 50px;
}
.input-with-icon {
    position: relative;
}
.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray; /* Adjust the color as needed */
}
ion-col {
    padding-bottom: 15px;
}
h5 {
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
.OtherVitalsHeading {
    display: flex;
    justify-content: space-between;
    margin: 10px;
}
.vitalsContent {
    height: 500px;
}
.saveBtn {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
    align-items: center;
}
.btnContent {
    display: flex;
    justify-content: center;
    line-height: 60px;
}
.custom_card {
    margin-bottom: 20px;
}
</style>
