<template>
    <DashBox :status="no_item" :content="'No Diagnosis added'" />

    <span v-if="display_item">
        <list :listData="OPDdiagnosis[0].selectedData" @clicked:edit="editDiagnosis($event)" @clicked:delete="deleteDiagnosis"> </list>
    </span>

    <ion-row v-if="search_item">
        <basic-form :contentData="OPDdiagnosis" @update:selected="handleInputData" @update:inputValue="handleInputData" @clicked:button="addNewRow">
        </basic-form>
    </ion-row>
    <ion-row v-if="addItemButton" style="margin-top: 10px">
        <DynamicButton fill="clear" :icon="iconsContent.plus" iconSlot="icon-only" @clicked:btn="displayInputFields()" name="Add new Diagnosis" />
    </ion-row>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Previous Diagnosis</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <previousDiagnosis />
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-row>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { PatientDiagnosisService } from "@/services/patient_diagnosis_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useOPDDiagnosisStore } from "@/apps/OPD/stores/DiagnosisStore";
import { mapState } from "pinia";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import List from "@/components/List.vue";
import BasicForm from "@/components/BasicForm.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { Service } from "@/services/service";
import previousDiagnosis from "@/apps/NCD/components/ConsultationPlan/previousVisits/previousDiagnosis.vue";
import { Diagnosis } from "../../services/diagnosis";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        IonPopover,
        DashBox,
        SelectionPopover,
        BasicInputField,
        List,
        BasicForm,
        DynamicButton,
        previousDiagnosis,
    },
    data() {
        return {
            iconsContent: icons,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            conditionStatus: "" as any,
            data: [] as any,
            diagnosisData: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedCondition: "" as any,
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useOPDDiagnosisStore, ["OPDdiagnosis"]),
        inputFields() {
            return this.OPDdiagnosis[0].data.rowData[0].colData;
        },
    },
    watch: {
        OPDdiagnosis: {
            handler() {
                this.setDashedBox();
            },
            deep: true,
        },
    },
    mounted() {
        this.updateDiagnosisStores();
        this.setDashedBox();
    },
    methods: {
        displayInputFields() {
            this.conditionStatus = "";
            this.selectedText = "";
            this.no_item = false;
            this.addItemButton = false;
            this.search_item = true;
        },
        async validaterowData() {
            this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsError = false;
            this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = "";

            this.diagnosisData = await this.getDiagnosis(this.inputFields[0].value);
            if (this.inputFields[0].value == this.diagnosisData[0]?.name) {
                return true;
            } else {
                this.search_item = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsError = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = "Please select diagnosis from the list";
                return false;
            }
        },
        async validateDifferentialrowData() {
            this.OPDdiagnosis[0].data.rowData[0].colData[1].alertsError = false;
            this.OPDdiagnosis[0].data.rowData[0].colData[1].alertsErrorMassage = "";

            this.diagnosisData = await this.getDiagnosis(this.inputFields[1].value);
            if (this.inputFields[0].value == this.diagnosisData[1]?.name) {
                return true;
            } else {
                this.search_item = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[1].alertsError = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[1].alertsErrorMassage = "Please select diagnosis from the list";
                return false;
            }
        },
        async addNewRow() {
            if (await this.validaterowData()) {
                this.OPDdiagnosis[0].data.rowData[0].colData[0].value = this.inputFields[0].value;
                this.search_item = false;
                this.display_item = true;
                this.addItemButton = true;
                this.buildDiagnosis();
            }
            this.OPDdiagnosis[0].data.rowData[0].colData[0].value = "";
            this.OPDdiagnosis[0].data.rowData[0].colData[0].popOverData.data = [];
        },
        buildDiagnosis() {
            this.OPDdiagnosis[0].selectedData.push({
                actionBtn: true,
                btn: ["edit", "delete"],
                name: this.inputFields[0].value,
                id: this.diagnosisData[0].concept_id,
                display: [this.inputFields[0].value],
                data: {
                    concept_id: 6542, //primary OPDdiagnosis
                    value_coded: this.diagnosisData[0].concept_id,
                    obs_datetime: Service.getSessionDate(),
                },
            });
        },
        updateDiagnosisStores() {
            const diagnosisStore = useOPDDiagnosisStore();
            diagnosisStore.setOPDDiagnosis(this.OPDdiagnosis);
        },
        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        async handleInputData(col: any) {
            if (col.inputHeader == "Primary Diagnosis") {
                this.diagnosisData = await this.getDiagnosis(col.value);
                this.OPDdiagnosis[0].data.rowData[0].colData[0].popOverData.data = this.diagnosisData;
                this.validaterowData();
            }
            if (col.inputHeader == "Differential Diagnosis") {
                this.diagnosisData = await this.getDiagnosis(col.value);
                this.OPDdiagnosis[0].data.rowData[0].colData[1].popOverData.data = this.diagnosisData;
                this.validateDifferentialrowData();
            }
        },
        async getDiagnosis(value: any) {
            return await PatientDiagnosisService.getDiagnosis(value, 1, 5);
        },
        editDiagnosis(test: any) {
            this.deleteDiagnosis(test);
            this.selectedText = test.name;
            this.OPDdiagnosis[0].data.rowData[0].colData[0].value = test.name;
            this.addItemButton = false;
            this.search_item = true;
            this.updateDiagnosisStores();
        },
        async openDeletePopover(e: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e.name} ?`, e.event);
            if (deleteConfirmed) {
                this.deleteDiagnosis(e.name);
            }
        },
        deleteDiagnosis(OPDdiagnosis: any) {
            this.OPDdiagnosis[0].selectedData = this.OPDdiagnosis[0].selectedData.filter((item: any) => item.display[0] !== OPDdiagnosis.name);
            this.updateDiagnosisStores();
        },
        setDashedBox() {
            if (this.inputFields[0].value) {
                this.addItemButton = false;
                this.search_item = true;
                this.no_item = false;
            }
            if (this.OPDdiagnosis[0].selectedData.length > 0) {
                this.display_item = true;
                this.no_item = false;
            } else if (!this.search_item) {
                this.no_item = true;
            }
        },
    },
});
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}
.modify_buttons {
    padding-left: 20px;
}
.item_no_border {
    --border-color: transparent;
}
.search_result {
    padding: 10px;
}
</style>
