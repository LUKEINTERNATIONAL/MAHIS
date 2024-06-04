<template>
    <DashBox :status="no_item" :content="'No presenting complaints added'" />

    <span v-if="display_item">
        <list
            :listData="presentingComplaints[0].selectedData"
            @clicked:edit="editpresentingComplaintsList($event)"
            @clicked:delete="deletepresentingComplaintsList"
        >
        </list>
    </span>

    <ion-row v-if="search_item">
        <basic-form
            :contentData="presentingComplaints"
            @update:selected="handleInputData"
            @update:inputValue="handleInputData"
            @clicked:button="addNewRow"
        ></basic-form>
    </ion-row>
    <ion-row v-if="addItemButton" style="margin-top: 10px">
        <DynamicButton
            fill="clear"
            :icon="iconsContent.plus"
            iconSlot="icon-only"
            @clicked:btn="displayInputFields()"
            name="Add new presenting complaints"
        />
    </ion-row>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Previous presenting complaints</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <previousComplaints />
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-row>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput } from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useVitalsStore } from "@/stores/VitalsStore";
import { mapState } from "pinia";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue";
import { VitalsService } from "@/services/vitals_service";
import BasicForm from "@/components/BasicForm.vue";
import { Service } from "@/services/service";
import PreviousVitals from "@/components/previousVisits/previousVitals.vue";
import previousComplaints from "@/apps/OPD/components/ConsultationPlan/previousVisits/previousComplaints.vue";
import { usePresentingComplaintsStore } from "@/apps/OPD/stores/PresentingComplaintsStore";
import { PatientComplaintsService } from "@/apps/OPD/services/patient_complaints_service";

import { IonPopover } from "@ionic/vue";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { popoverConfirmation } from "@/utils/Alerts";
import List from "@/components/List.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import Validation from "@/validations/StandardValidations";

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
        previousComplaints,
        IonPopover,
        DashBox,
        SelectionPopover,
        List,
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
            BMI: {} as any,
            BPStatus: {} as any,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            vitalsInstance: {} as any,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            conditionStatus: "" as any,
            data: [] as any,
            presentingComplaintsListData: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedCondition: "" as any,
            complaints: [] as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(usePresentingComplaintsStore, ["presentingComplaints"]),
        inputFields() {
            return this.presentingComplaints[0].data.rowData[0].colData;
        },
    },
    mounted() {
        this.updatePresentingComplaintsListStores();
        this.setDashedBox();
        this.getPresenting();
    },
    watch: {
        presentingComplaints: {
            handler() {
                this.setDashedBox();
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async getPresenting() {
            const data = await PatientComplaintsService.getComplaintsList("Presenting complaint group");

            const promises = data.map(async (item: any) => {
                const complaints = await PatientComplaintsService.getComplaintsList(item.name);
                return [...complaints];
            });

            this.complaints = await Promise.all(promises);

            this.complaints = this.complaints.flat();
        },
        displayInputFields() {
            this.conditionStatus = "";
            this.selectedText = "";
            this.no_item = false;
            this.addItemButton = false;
            this.search_item = true;
        },
        async validaterowData() {
            this.presentingComplaints[0].data.rowData[0].colData[0].alertsError = false;
            this.presentingComplaints[0].data.rowData[0].colData[0].alertsErrorMassage = "";

            if (this.isNameInArray(this.inputFields[0].value, this.complaints)) {
                return true;
            } else {
                this.search_item = true;
                this.presentingComplaints[0].data.rowData[0].colData[0].alertsError = true;
                this.presentingComplaints[0].data.rowData[0].colData[0].alertsErrorMassage = "Please select presenting complaints from the list";
                return false;
            }
        },
        isNameInArray(name: any, arrayOfObjects: any) {
            return arrayOfObjects.some((obj: any) => obj.name === name);
        },
        async addNewRow() {
            if ((await this.validaterowData()) && this.validateDurationUnits()) {
                this.presentingComplaints[0].data.rowData[0].colData[0].value = this.inputFields[0].value;
                this.search_item = false;
                this.display_item = true;
                this.addItemButton = true;
                this.buildpresentingComplaintsList();
            } else {
                return;
            }
            this.presentingComplaints[0].data.rowData[0].colData[0].value = "";
            this.presentingComplaints[0].data.rowData[0].colData[1].value = "";
            this.presentingComplaints[0].data.rowData[0].colData[2].value = "";
            this.presentingComplaints[0].data.rowData[0].colData[0].popOverData.data = [];
        },
        buildpresentingComplaintsList() {
            const duration = this.inputFields[1].value + " " + this.inputFields[2].value.name;
            this.presentingComplaints[0].selectedData.push({
                actionBtn: true,
                btn: ["edit", "delete"],
                name: this.inputFields[0].value,
                id: this.presentingComplaintsListData[0].concept_id,
                display: [this.inputFields[0].value, duration],
                data: [
                    {
                        concept_id: 6542, //primary presentingComplaints
                        value_coded: this.presentingComplaintsListData[0].concept_id,
                        obs_datetime: Service.getSessionDate(),
                    },
                    {
                        concept_id: 1294, //Duration of symptom in days
                        value_text: this.presentingComplaintsListData[0].concept_id,
                        obs_datetime: Service.getSessionDate(),
                    },
                ],
            });
            console.log("🚀 ~ buildpresentingComplaintsList ~ this.presentingComplaints[0].selectedData:", this.presentingComplaints[0].selectedData);
        },
        updatePresentingComplaintsListStores() {
            const presentingComplaintsListStore = usePresentingComplaintsStore();
            presentingComplaintsListStore.setPresentingComplaints(this.presentingComplaints);
        },
        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        async handleInputData(col: any) {
            if (col.inputHeader == "Presenting Complaints") {
                this.presentingComplaintsListData = this.complaints;
                this.presentingComplaints[0].data.rowData[0].colData[0].popOverData.data = this.presentingComplaintsListData;
                this.validaterowData();
            } else if (col.inputHeader == "Duration") {
                this.validateDuration();
            } else if (col.inputHeader == "Duration Units") {
                this.validateDurationUnits();
            }
        },
        validateDuration() {
            this.presentingComplaints[0].data.rowData[0].colData[1].alertsError = false;
            this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = "";

            if (Validation.isNumber(this.inputFields[1].value) == null) {
                return true;
            } else {
                this.search_item = true;
                this.presentingComplaints[0].data.rowData[0].colData[1].alertsError = true;
                this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = " Value must be a number";
                return false;
            }
        },
        validateDurationUnits() {
            this.presentingComplaints[0].data.rowData[0].colData[2].alertsError = false;
            this.presentingComplaints[0].data.rowData[0].colData[2].alertsErrorMassage = "";

            if (this.inputFields[2].value) {
                return true;
            } else {
                this.search_item = true;
                this.presentingComplaints[0].data.rowData[0].colData[2].alertsError = true;
                this.presentingComplaints[0].data.rowData[0].colData[2].alertsErrorMassage = "Please select duration units";
                return false;
            }
        },
        editpresentingComplaintsList(test: any) {
            this.deletepresentingComplaintsList(test);
            this.selectedText = test.name;
            this.presentingComplaints[0].data.rowData[0].colData[0].value = test.name;
            this.addItemButton = false;
            this.search_item = true;
            this.updatePresentingComplaintsListStores();
        },
        async openDeletePopover(e: any) {
            // const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e.name} ?`, e.event);
            // if (deleteConfirmed) {
            //     this.deletepresentingComplaintsList(e.name);
            // }
        },
        deletepresentingComplaintsList(presentingComplaints: any) {
            this.presentingComplaints[0].selectedData = this.presentingComplaints[0].selectedData.filter(
                (item: any) => item.display[0] !== presentingComplaints.name
            );
            this.updatePresentingComplaintsListStores();
        },
        setDashedBox() {
            if (this.inputFields[0]?.value) {
                this.addItemButton = false;
                this.search_item = true;
                this.no_item = false;
            }
            if (this.presentingComplaints[0].selectedData.length > 0) {
                this.display_item = true;
                this.no_item = false;
            } else if (!this.search_item) {
                this.no_item = true;
                console.log("🚀 ~ setDashedBox ~ this.no_item :", this.no_item);
            }
        },
    },
});
</script>

<style scoped>
.vitals_title {
    border-bottom: 1px solid #b3b3b3;
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
.previousView {
    margin-top: 70px;
    margin-bottom: 20px;
}
</style>
