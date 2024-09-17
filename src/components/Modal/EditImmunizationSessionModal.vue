<template>
    <ion-header>
        <ion-toolbar>
            <ion-title class="modalTitle">Edit Immunization Session Schedule</ion-title>
        </ion-toolbar>
    </ion-header>

    <div>
        <ion-loading :is-open="isSaving" message="Updating, please wait..."> </ion-loading>
        <BasicForm :contentData="immunizationSessions"></BasicForm>
    </div>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <ion-button @click="dismiss()" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px"> Cancel
                </ion-button>
            </ion-col>
            <ion-col>
                <DynamicButton @click="editImmunizationSessionSchedule()" name="Save changes" fill="solid"
                    style="float: right; margin: 2%; width: 130px" />
            </ion-col>
        </ion-row>
    </ion-footer>
</template>

<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonLoading,
    IonRow,
    IonCol,
    IonButton,
    IonSpinner,
    modalController
} from "@ionic/vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { useImmunizationSessionsStore } from "@/stores/ScheduleImmunizationSession";
import { getFieldValue, modifyFieldValue } from '@/services/data_helpers';
import { validateInputFiledData } from "@/services/group_validation";
import { UserService } from '@/services/user_service';
import BasicForm from "@/components/BasicForm.vue";
import { computed, onMounted, ref } from 'vue';
import { SessionSchedule, User } from "@/types";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { SessionScheduleService } from "@/services/session_schedule_service";

const isSaving = ref<boolean>(false);
const props = defineProps({ data: { required: true, type: Object } });
const immunizationSessionStore = useImmunizationSessionsStore();
const immunizationSessions = computed(() => {
    return immunizationSessionStore.immunizationSessions
});
const editImmunizationSessionSchedule = async () => {
    if (validateInputFiledData(immunizationSessions.value)) {
        isSaving.value = true;
        const selectedAssignees = getFieldValue(immunizationSessions.value, "assignees", "value");
        const assignees = getFieldValue(immunizationSessions.value, "assignees", "multiSelectData")
            .filter((assignee: User) =>
                selectedAssignees.some((selectedAssignee: User) => selectedAssignee.name === assignee.username)
            )
            .map((assignee: User) => assignee.user_id)
        const data: SessionSchedule = {
            session_name: getFieldValue(immunizationSessions.value, "batch", "value"),
            start_date: getFieldValue(immunizationSessions.value, "start date", "value"),
            end_date: getFieldValue(immunizationSessions.value, "end date", "value"),
            session_type: getFieldValue(immunizationSessions.value, "product name", "value").name,
            repeat: getFieldValue(immunizationSessions.value, "repeat", "value").name,
            target: getFieldValue(immunizationSessions.value, "target", "value"),
            assignees: assignees
        }
        const sessionSchedule = new SessionScheduleService();
        const response = await sessionSchedule.update(data, props.data.session_schedule_id);
        if(response){
            toastSuccess("Immunization session schedule updated successfully")
            isSaving.value = false;
            immunizationSessionStore.resetFieldValues();
        }else{
            toastWarning("An error occurred while updating immunization session schedule");
            isSaving.value = false;
        }
        modalController.dismiss("dismiss");
    } else {
        toastWarning("Please make sure to fill all required fields");
    }
}


const updateSessionData = () => {
    const sessionMappings: Record<string, any> = {
        "Session name": props.data.session_name,
        "Start Date": props.data.start_date,
        "End date": props.data.end_date,
        "Session type": { name: props.data.session_type },
        "Repeat": { name: props.data.repeat_type },
        "Assignees": props.data.assignees.map((assignee: User) => {
            return {
                name: assignee.username
            }
        }),
    };
    immunizationSessions.value.forEach((session: any) => {
        session.data.rowData.forEach((row: any) => {
            row.colData.forEach((col: any) => {
                const fieldValue = sessionMappings[col.inputHeader];
                if (fieldValue) {
                    col.value = fieldValue;
                }
            });
        });
    });
};
const getAssignees = async (_filter: any = ""): Promise<void> => {
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
    modifyFieldValue(immunizationSessions.value, "assignees", "multiSelectData", modifiedAssignees);
}
const dismiss = (): void => {
    modalController.dismiss({ update: false });
}
onMounted(() => {
    getAssignees();
    updateSessionData();
})
</script>