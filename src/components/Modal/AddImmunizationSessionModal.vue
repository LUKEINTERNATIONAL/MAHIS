<template>
    <ion-header>
        <ion-title class="modalTitle">Create Immunization Session Schedule</ion-title>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div style="padding-bottom: 200px">
            <basic-form :contentData="immunizationSessions" @update:inputValue="handleInputData" @search-change="getAssignees"></basic-form>
        </div>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="dismiss()"> Cancel </ion-button>
            </ion-col>
            <ion-col>
                <DynamicButton @click="createImmunizationSessionSchedule()" name="Save changes" fill="solid" style="float: right; margin: 2%; width: 130px" />
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
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useImmunizationSessionsStore } from "@/stores/ScheduleImmunizationSession";
import { mapState } from "pinia";
import { toastWarning, toastSuccess } from "@/utils/Alerts";
import BasicInputField from "@/components/BasicInputField.vue";
import BasicForm from "@/components/BasicForm.vue";
import PreviousVitals from "@/components/Graphs/previousVitals.vue";
import customDatePicker from "@/apps/Immunization/components/customDatePicker.vue";
import {
    getFieldValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import DynamicButton from "@/components/DynamicButton.vue";
import { validateInputFiledData } from "@/services/group_validation";
import { UserService } from "@/services/user_service";
import { SessionScheduleService } from "@/services/session_schedule_service";
import { SessionSchedule } from "@/types";
import { RouteLocationRaw } from "vue-router";
import { 
    IMMUNIZATION_SESSION_SCHEDULE_CREATE_ERROR, 
    IMMUNIZATION_SESSION_SCHEDULE_CREATE_SUCCESS 
} from "@/utils/Constants";

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
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useImmunizationSessionsStore, ["immunizationSessions"]),
    },
    props:{
        data: {
            type: Object,
            default: {},
        },
    },
    async mounted() {
        this.resetData();
        const objectIsEmpty = typeof this.data == "object" && this.isObjectEmpty(this.data);
        if (!objectIsEmpty){
            this.modifyFieldValue();
        }
        await this.getAssignees();
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        isObjectEmpty(obj: object): boolean {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        },
        modifyFieldValue(): void {
            modifyFieldValue(this.immunizationSessions, "assignees", "value", {id: this.data.user_id, username: this.data.username });
        },
        async createImmunizationSessionSchedule(): Promise<void>{
            if (validateInputFiledData(this.immunizationSessions)) {
                const user_id : number = getFieldValue(this.immunizationSessions, "assignees","value").id
                const data: SessionSchedule = {
                        session_name: getFieldValue(this.immunizationSessions,"batch", "value"),
                        start_date: getFieldValue(this.immunizationSessions, "start date", "value"),
                        end_date: getFieldValue(this.immunizationSessions, "end date", "value"),
                        session_type: getFieldValue(this.immunizationSessions, "product name", "value").name,
                        repeat: getFieldValue(this.immunizationSessions, "repeat", "value" ).name,
                        target: getFieldValue(this.immunizationSessions, "target", "value"),
                        user_ids: [user_id],
                    }

                const sessionSchedule = new SessionScheduleService();
                await sessionSchedule.create(data);
                toastSuccess(IMMUNIZATION_SESSION_SCHEDULE_CREATE_SUCCESS);
                modalController.dismiss("dismiss");
            } else {
                toastWarning(IMMUNIZATION_SESSION_SCHEDULE_CREATE_ERROR);
            }
        },
        navigationMenu(url: RouteLocationRaw): void {
            menuController.close();
            this.$router.push(url);
        },
        resetData(): void {
            useImmunizationSessionsStore().$reset();
        },
        async getAssignees(_filter: any = ""){
            const assignees = await UserService.getUsersByRole({
                role: "Health Surveillance"
            });
            const modifiedAssignees = assignees.map((assignee: any) => {
                return {
                    ...assignee,
                    name: assignee.username,
                    id: assignee.user_id
                };
            });
            modifyFieldValue(this.immunizationSessions, "assignees", "multiSelectData", modifiedAssignees);
        },
        handleInputData(event: Object) {
            console.log(event);
        },
        dismiss(): void {
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
</style>