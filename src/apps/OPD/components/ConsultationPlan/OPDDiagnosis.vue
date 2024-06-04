<template>
    <div class="custom_card" style="padding: 10px">
        <DashBox :status="no_item" :content="'No Diagnosis added'" />

        <span v-if="display_item">
            <list :listData="OPDdiagnosis[0].selectedData" @clicked:edit="editDiagnosis($event)" @clicked:delete="deleteDiagnosis"> </list>
        </span>

        <ion-row v-if="search_item">
            <basic-form
                :contentData="OPDdiagnosis"
                @update:selected="handleInputData"
                @update:inputValue="handleInputData"
                @clicked:button="addNewRow"
                @search-change="asyncFind"
            >
            </basic-form>
        </ion-row>
        <ion-row v-if="addItemButton" style="margin-top: 10px">
            <DynamicButton fill="clear" :icon="iconsContent.plus" iconSlot="icon-only" @clicked:btn="displayInputFields()" name="Add new Diagnosis" />
        </ion-row>
    </div>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" class="custom_card">
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
            selected: null,
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
    async mounted() {
        this.updateDiagnosisStores();
        this.setDashedBox();

        this.OPDdiagnosis[0].data.rowData[0].colData[1].multiSelectData = await this.getDiagnosis("");
    },
    methods: {
        async asyncFind(query: any) {
            this.OPDdiagnosis[0].data.rowData[0].colData[1].multiSelectData = await this.getDiagnosis(query);
        },
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
                const isPrimaryValid = this.OPDdiagnosis[0].selectedData.every((item: any) => {
                    if (item.display[1] == "Primary diagnosis") {
                        this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsError = true;
                        this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = "Primary diagnosis can not be more than two";
                        return false;
                    } else return true;
                });
                console.log("🚀 ~ isPrimaryValid ~ isPrimaryValid:", isPrimaryValid);

                if (!isPrimaryValid) return false;
                else return true;
            } else {
                this.search_item = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsError = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = "Please select diagnosis from the list";
                return false;
            }
        },

        async addNewRow() {
            if (await this.validaterowData()) {
                if (this.buildDiagnosis()) {
                    this.OPDdiagnosis[0].data.rowData[0].colData[0].value = this.inputFields[0].value;
                    this.search_item = false;
                    this.display_item = true;
                    this.addItemButton = true;
                }
            }
            this.OPDdiagnosis[0].data.rowData[0].colData[0].value = "";
            this.OPDdiagnosis[0].data.rowData[0].colData[1].value = "";
            this.OPDdiagnosis[0].data.rowData[0].colData[0].popOverData.data = [];
        },
        buildDiagnosis() {
            const diagnosis = [];
            diagnosis.push({
                actionBtn: true,
                btn: ["delete"],
                name: this.inputFields[0].value,
                id: this.diagnosisData[0].concept_id,
                display: [this.inputFields[0].value, "Primary diagnosis"],
                data: {
                    concept_id: 6542, //Primary diagnosis
                    value_coded: this.diagnosisData[0].concept_id,
                    obs_datetime: Service.getSessionDate(),
                },
            });
            if (this.inputFields[1].value) {
                this.inputFields[1].value.forEach((item: any) => {
                    diagnosis.push({
                        actionBtn: true,
                        btn: ["delete"],
                        name: item.name,
                        id: item.concept_id,
                        display: [item.name, "Differential diagnosis"],
                        data: {
                            concept_id: 6543, //Secondary diagnosis
                            value_coded: item.concept_id,
                            obs_datetime: Service.getSessionDate(),
                        },
                    });
                });
            }
            const compareArrays = this.compareArrays(this.OPDdiagnosis[0].selectedData, diagnosis);
            if (compareArrays[0] === "Differential diagnosis") {
                this.OPDdiagnosis[0].data.rowData[0].colData[1].alertsError = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[1].alertsErrorMassage = "Diagnosis already selected";
                return false;
            }
            if (compareArrays[0] === "Primary diagnosis") {
                this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsError = true;
                this.OPDdiagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = "Diagnosis already selected";
                return false;
            }
            this.OPDdiagnosis[0].selectedData = [...this.OPDdiagnosis[0].selectedData, ...diagnosis];
            return true;
        },
        compareArrays(array1: any, array2: any) {
            return array1.reduce((result: any, obj1: any) => {
                const match = array2.find((obj2: any) => obj2.name === obj1.name);
                if (match) result.push(match.display[1]);
                return result;
            }, []);
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
            if (col.inputHeader == "Primary Diagnosis*") {
                this.diagnosisData = await this.getDiagnosis(col.value);
                this.OPDdiagnosis[0].data.rowData[0].colData[0].popOverData.data = this.diagnosisData;
                this.validaterowData();
            }
            if (col.inputHeader == "Differential Diagnosis") {
                this.diagnosisData = await this.getDiagnosis(col.value);
                this.OPDdiagnosis[0].data.rowData[0].colData[1].multiSelectData = this.diagnosisData;
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
            if (this.inputFields[0].value || this.inputFields[1].value) {
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
.previousView {
    margin-top: 70px;
    margin-bottom: 20px;
}
</style>
