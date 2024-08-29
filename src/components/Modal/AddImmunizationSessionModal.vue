<template>
    <ion-header>
        <ion-title class="modalTitle">Create Immunization Session</ion-title>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div style="padding-bottom: 200px">
            <div>
                <basic-form :contentData="immunizationSessions" @update:inputValue="handleInputData" @search-change="getDrugs"></basic-form>
            </div>
        </div>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="dismiss()"> Cancel </ion-button>
            </ion-col>
            <ion-col>
                <DynamicButton @click="createImmunizationSession()" name="Save changes" fill="solid" style="float: right; margin: 2%; width: 130px" />
            </ion-col>
        </ion-row>
    </ion-footer>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonInput,
    modalController,
    IonFooter,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { iconBloodPressure } from "@/utils/SvgDynamicColor";
import { BMIService } from "@/services/bmi_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useImmunizationSessionsStore } from "@/stores/ScheduleImmunizationSession";
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
import { ImmunizationSessionService } from "@/services/immunization_session_service";
import { DrugService } from "@/services/drug_service";
import { UserService } from "@/services/user_service";
import { useSearchName } from "@/stores/SearchName";

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
        IonFooter,
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
        ...mapState(useImmunizationSessionsStore, ["immunizationSessions"]),
    },
    props:{
        data: {
            default: {} as any,
        },
    },
    async mounted() {
        this.resetData();
        if (this.data){
            this.modifyFieldValue();
        }
        
        await this.getDrugs();
        await this.getAssignees();
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        modifyFieldValue(){
            modifyFieldValue(this.immunizationSessions, "vaccines","value", {id: "", name: this.data.drug_legacy_name});
            modifyFieldValue(this.immunizationSessions, "assignees", "value", {id: this.data.user_id, username: this.data.username });
        },
        async createImmunizationSession() {
            if (validateInputFiledData(this.immunizationSessions)) {
                
                const drug_id = getFieldValue(this.immunizationSessions, "vaccines", "value").drug_id;
                const user_id = getFieldValue(this.immunizationSessions, "assignees","value").id
                const data = [
                    {
                        session_name: getFieldValue(this.immunizationSessions,"batch", "value"),
                        start_date: getFieldValue(this.immunizationSessions, "start date", "value"),
                        end_date: getFieldValue(this.immunizationSessions, "end date", "value"),
                        session_type: getFieldValue(this.immunizationSessions, "product name", "value").name,
                        repeat: getFieldValue(this.immunizationSessions, "repeat", "value" ).name,
                        target: getFieldValue(this.immunizationSessions, "target", "value"),
                        drug_id: drug_id,
                        user_id: user_id,
                    },
                ];

                const immunizationSessionService = new ImmunizationSessionService();
                await immunizationSessionService.postSessions(data);
                toastSuccess("Immunization session saved successfully");
                modalController.dismiss("dismiss");
            } else {
                toastWarning("Batch not save");
                return false;
            }
        },
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        resetData() {
            const rest = useImmunizationSessionsStore();
            // rest.setStock(rest.getInitialStock());
        },
        async getDrugs(filter: any = "") {
            // modifyFieldValue(this.stock, "product name", "value", "");
            const drugs = await DrugService.getDrugs({
                name: filter,
                page: 1,
                page_size: 10,
                concept_set: "Immunizations",
            });
            modifyFieldValue(this.immunizationSessions, "vaccines", "multiSelectData", drugs);
        },

        async getAssignees(filter: any = ""){
            const assignees = await UserService.getUsersByRole({
                role: "Health Surveillance"
            });

            const modifiedAssignees = assignees.map((assignee: any) => {
                return {
                    ...assignee,
                    name: assignee.username,
                    id: assignee.user_id,
                    // Remove the username key if needed:
                    // username: undefined,
                };
            });

            modifyFieldValue(this.immunizationSessions, "assignees", "multiSelectData", modifiedAssignees);

        },
        handleInputData(event: any) {
            //this.getDrugs(" ");
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
