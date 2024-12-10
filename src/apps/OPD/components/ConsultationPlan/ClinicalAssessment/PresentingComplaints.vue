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
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
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
import { validateField } from "@/services/validation_service";
import { ObservationService } from "@/services/observation_service";
import { isEmpty } from "lodash";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
} from "@/services/data_helpers";

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
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(usePresentingComplaintsStore, ["presentingComplaints"]),
        inputFields() {
            return this.presentingComplaints[0].data.rowData[0].colData;
        },

        "Other (specify)"() {
            return getFieldValue(this.presentingComplaints, "Other (specify)", "value");
        },
        selectedComplaintValue() {
            return this.presentingComplaints[0].data.rowData[0].colData[0].value;
        },
    },
    async mounted() {
        this.updatePresentingComplaintsListStores();
        this.setDashedBox();
        this.getPresenting();
        this.validaterowData({});
        this.checkComplaints();
    },
    watch: {
        selectedComplaintValue(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.checkComplaints();
            }
        },
        presentingComplaints: {
            handler() {
                this.setDashedBox();
            },
            deep: true,
        },
        $router: {
            handler() {
                this.getPresenting();
                console.log("getting presenting complaint");
            },
            deep: true,
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        async getPresenting() {
            this.complaints = await PatientComplaintsService.getComplaintsList("Presenting complaint");
            modifyFieldValue(this.presentingComplaints, "PresentingComplaints", "multiSelectData", this.complaints);
        },
        displayInputFields() {
            this.conditionStatus = "";
            this.no_item = false;
            this.addItemButton = false;
            this.search_item = true;
        },
        isNameInArray(name: any, arrayOfObjects: any) {
            return arrayOfObjects.some((obj: any) => obj.name === name);
        },
        async addNewRow() {
            if (this.validateDuration() && this.checkPresentingComplaints()) {
                this.presentingComplaints[0].data.rowData[0].colData[0].value = this.inputFields[0].value;
                this.search_item = false;
                this.display_item = true;
                this.addItemButton = true;
                this.buildpresentingComplaintsList();
            }
            this.presentingComplaints[0].data.rowData[0].colData[0].value = "";
            this.presentingComplaints[0].data.rowData[0].colData[1].value = "";
            this.presentingComplaints[0].data.rowData[0].colData[1].unitsData.value = "";
            modifyFieldValue(this.presentingComplaints, "Other (specify)", "displayNone", true);
            modifyFieldValue(this.presentingComplaints, "Other (specify)", "value", "");
        },
        checkPresentingComplaints() {
            const complaintName =
                this.inputFields[0].value.name === "Other"
                    ? getFieldValue(this.presentingComplaints, "Other (specify)", "value")
                    : this.inputFields[0].value.name;

            if (!this.isNameInData(complaintName, this.presentingComplaints[0].selectedData)) {
                modifyFieldValue(this.presentingComplaints, "PresentingComplaints", "alertsErrorMassage", "");
                return true;
            } else {
                modifyFieldValue(this.presentingComplaints, "PresentingComplaints", "alertsErrorMassage", "Presenting complaint already added");
                return false;
            }
        },
        buildpresentingComplaintsList() {
            const duration = this.inputFields[1].value + " " + this.inputFields[1].unitsData.value.name;
            const complaintName =
                this.inputFields[0].value.name === "Other"
                    ? getFieldValue(this.presentingComplaints, "Other (specify)", "value")
                    : this.inputFields[0].value.name;

            this.presentingComplaints[0].selectedData.push({
                actionBtn: true,
                btn: ["edit", "delete"],
                name: complaintName,
                concept_id: this.inputFields[0].value.concept_id,
                duration: this.inputFields[1].value,
                durationUnits: this.inputFields[1].unitsData.value,
                display: [complaintName, duration],
                data: [
                    {
                        concept_id: 8578,
                        value_coded: this.inputFields[0].value.concept_id,
                        obs_datetime: Service.getSessionDate(),
                        child: [
                            {
                                concept_id: this.inputFields[0].value.concept_id,
                                value_text: duration,
                                obs_datetime: Service.getSessionDate(),
                            },
                        ],
                    },
                ],
            });
        },

        isNameInData(name: any, dataArray: any) {
            return dataArray.some((item: any) => item.name === name);
        },
        updatePresentingComplaintsListStores() {
            const presentingComplaintsListStore = usePresentingComplaintsStore();
            presentingComplaintsListStore.setPresentingComplaints(this.presentingComplaints);
        },
        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        checkComplaints() {
            const selectedComplaint = getFieldValue(this.presentingComplaints, "PresentingComplaints", "value");

            let shouldShowAlert = true;

            if (selectedComplaint) {
                const isValidComplaint = this.complaints.some(
                    (complaint: any) => complaint.name.toLowerCase() === selectedComplaint.name?.toLowerCase()
                );

                if (isValidComplaint || selectedComplaint.name === "Other") {
                    shouldShowAlert = false;
                }
            }

            if (shouldShowAlert) {
                if (!this.presentingComplaints[0].alerts[0] || this.presentingComplaints[0].alerts[0].name !== "NoMatchAlert") {
                    this.presentingComplaints[0].alerts[0] = {
                        backgroundColor: "lightyellow",
                        status: "Warning",
                        colSize: "4px",
                        textColor: "black",
                        value: "Please search thoroughly for the complaint. If it is not listed, search and select the 'Other' option to specify the complaint.",
                        name: "noMatchAlert",
                    };
                }
            } else {
                if (this.presentingComplaints[0].alerts[0]?.value) {
                    this.presentingComplaints[0].alerts[0] = {
                        backgroundColor: "",
                        status: "",
                        icon: "",
                        textColor: "",
                        value: "",
                        name: "",
                    };
                }
            }
        },

        async handleInputData(col: any) {
            if (col.inputHeader === "Presenting Complaints") {
                this.checkPresentingComplaints();
            } else if (col.inputHeader === "Duration") {
                this.validateDuration();
            }

            if (col.inputHeader === "Presenting Complaints") {
                const selectedComplaint = getFieldValue(this.presentingComplaints, "PresentingComplaints", "value");
                if (selectedComplaint?.name === "Other") {
                    modifyFieldValue(this.presentingComplaints, "Other (specify)", "displayNone", false);
                } else {
                    modifyFieldValue(this.presentingComplaints, "Other (specify)", "displayNone", true);
                    modifyFieldValue(this.presentingComplaints, "Other (specify)", "value", "");
                }
            }
        },

        validateDuration() {
            this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = false;
            this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = "";
            if (!this.inputFields[1].unitsData.value) {
                this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = true;
                this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = "Duration Units Required";
                return false;
            }

            if (Validation.isNumber(this.inputFields[1].value) == null && this.inputFields[1].value != "") {
                return true;
            } else {
                this.search_item = true;
                this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = true;
                this.presentingComplaints[0].data.rowData[0].colData[1].alertsErrorMassage = " Value must be a number";
                return false;
            }
        },
        validationRules(event: any) {
            return validateField(this.presentingComplaints, event.name, (this as any)[event.name]);
        },
        validaterowData(event: any) {
            this.validationRules(event);
        },
        editpresentingComplaintsList(test: any) {
            this.deletepresentingComplaintsList(test.item);
            this.presentingComplaints[0].data.rowData[0].colData[0].value = test.item;
            this.presentingComplaints[0].data.rowData[0].colData[1].value = test.item.duration;
            this.presentingComplaints[0].data.rowData[0].colData[1].unitsData.value = test.item.durationUnits;
            this.addItemButton = false;
            this.search_item = true;
            this.updatePresentingComplaintsListStores();
        },
        deletepresentingComplaintsList(presentingComplaints: any) {
            this.presentingComplaints[0].selectedData = this.presentingComplaints[0].selectedData.filter(
                (item: any) => item.display[0] !== presentingComplaints.name
            );
            this.updatePresentingComplaintsListStores();
        },
        setDashedBox() {
            this.presentingComplaints[0].selectedData;
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
            }
        },
        async updateList() {
            // const obs = await ObservationService.getAll(this.patient.patientID, "Presenting complaint");
            // const filteredArray = await obs.filter((obj: any) => {
            //     return HisDate.toStandardHisFormat(HisDate.currentDate()) === HisDate.toStandardHisFormat(obj.obs_datetime);
            // });
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
