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
            <div>
                <basic-form :contentData="stock" @update:inputValue="handleInputData" @search-change="getDrugs"></basic-form>
            </div>
        </div>
        <div style="display: flex; justify-content: end; padding-bottom: 3px" @click="createBatch()">
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
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
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
            stockService: {} as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useStockStore, ["stock"]),
    },
    props: {
        data: {
            default: {} as any,
        },
    },
    created() {
        this.stockService = new StockService();
    },
    async mounted() {
        await this.handleWaste(7);
        this.resetData();
        modifyFieldValue(this.stock, "product name", "value", this.data.drug_legacy_name);
        modifyFieldValue(this.stock, "batch", "value", this.data.batch_number);
        modifyFieldValue(this.stock, "manufacturer", "value", this.data.drug_legacy_name);
        modifyFieldValue(this.stock, "expire date", "value", this.data.expiry_date);
        modifyFieldValue(this.stock, "dosage forme", "value", this.data.drug_legacy_name);
        modifyFieldValue(this.stock, "vvm stage", "value", this.data.drug_legacy_name);
        modifyFieldValue(this.stock, "stock receive", "value", this.data.dispensed_quantity);
        modifyFieldValue(this.stock, "delivery_date", "value", this.data.delivery_date);
        modifyFieldValue(this.stock, "unit doses", "value", this.data.drug_legacy_name);

        await this.getDrugs();
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async createBatch() {
            if (validateInputFiledData(this.stock)) {
                const drug_id = getFieldValue(this.stock, "product name", "value").drug_id;
                const data = [
                    {
                        batch_number: getFieldValue(this.stock, "batch", "value"),
                        location_id: "",
                        vvm_stage: "",
                        items: [
                            {
                                barcode: "",
                                drug_id: drug_id,
                                expiry_date: getFieldValue(this.stock, "expire date", "value"),
                                unit_doses: getFieldValue(this.stock, "unit_doses", "value"),
                                vvm_stage: getFieldValue(this.stock, "vvm_stage", "value")?.name,
                                manufacture: getFieldValue(this.stock, "manufacture", "value"),
                                dosage_form: getFieldValue(this.stock, "dosage_form", "value")?.name,
                                quantity: getFieldValue(this.stock, "quantity", "value"),
                                delivery_date: getFieldValue(this.stock, "delivery_date", "value") || HisDate.currentDate(),
                                product_code: "",
                                pack_size: "",
                            },
                        ],
                    },
                ];
                const response = await this.stockService.postItems(data);
                await this.handleWaste(response[0].items[0].id);
                toastSuccess("Batch save successfully");
                modalController.dismiss("dismiss");
            } else {
                toastWarning("Batch not save");
                return false;
            }
        },
        async handleWaste(drug_id: any) {
            const doses_wasted = getFieldValue(this.stock, "doses_wasted", "value");
            if (doses_wasted) {
                const data = {
                    reallocation_code: "MA2020",
                    quantity: doses_wasted,
                    date: HisDate.currentDate(),
                    reason: "Incorrect data",
                };
                await this.stockService.disposeItems(drug_id, data);
            }
        },
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        resetData() {
            const rest = useStockStore();
            rest.setStock(rest.getInitialStock());
        },
        async getDrugs(filter: any = "") {
            // modifyFieldValue(this.stock, "product name", "value", "");
            const drugs = await DrugService.getDrugs({
                name: filter,
                page: 1,
                page_size: 10,
                concept_set: "OPD Medication",
            });
            modifyFieldValue(this.stock, "product name", "multiSelectData", drugs);
        },

        handleInputData(event: any) {
            this.getDrugs(" ");
        },

        dismiss() {
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
.OtherVitalsTitle {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #00190e;
}
</style>
