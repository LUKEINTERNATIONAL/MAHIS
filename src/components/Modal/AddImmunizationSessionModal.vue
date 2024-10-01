<template>
    <div v-if="isSaving" class="spinner-overlay">
        <ion-spinner name="bubbles"></ion-spinner>
        <div class="loading-text">Please wait...</div>
    </div>
    <ion-header>
        <ion-toolbar>
            <ion-title class="modalTitle">Create Immunization Session Schedule</ion-title>
            <ion-button fill="clear" slot="end" @click="dismiss()">
                <ion-icon :icon="close" color="white" />
            </ion-button>
        </ion-toolbar>
    </ion-header>
    <ion-loading v-show="isSaving" trigger="open-loading" message="Saving, please wait..."> </ion-loading>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div>
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Session name</label>
            <ion-input clear fill="outline" placeholder="Enter the session name" v-model="sessionName"></ion-input>
            <div v-if="sessionNameError" class="alerts_error">{{ sessionNameError }}</div>
        </div>
        <div style="margin-top: 20px;">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Start & End Date</label>
            <VueDatePicker required position="left" placeholder="select start & end date" :range="true"
                :ui="{ input: 'datepicker' }" format="dd/MM/yyyy" v-model="dateRange" :min-date="new Date()">
                <template #trigger>
                    <ion-input clear fill="outline" placeholder="select start & end date"
                        :value="`${formattedDateRange}`">
                        <ion-icon slot="start" v-bind:icon="calendar"></ion-icon>
                    </ion-input>
                </template>
            </VueDatePicker>
            <div v-if="dateRangeError" class="alerts_error">{{ dateRangeError }}</div>
        </div>
        <div style="margin-top: 20px;">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Repeat type</label>
            <VueMultiselect :hide-selected="false" :close-on-select="true" :openDirection="'bottom'"
                :prevent-autofocus="true" :options="repeatTypes.map((value) => value.name)" v-model="selectedRepeatType"
                :searchable="false" :show-labels="false" placeholder="Select repeat type" />
            <div v-if="repeatTypeError" class="alerts_error">{{ repeatTypeError }}</div>
        </div>
        <div style="margin-top: 20px;" v-if="showNumberOfDays">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Number of {{ formattedRepeatText
                }}</label>
            <ion-input v-model="numberOfDays" clear fill="outline" placeholder="Enter the number of days"></ion-input>
            <div v-if="numberOfDaysError" class="alerts_error">{{ numberOfDaysError }}</div>
        </div>
        <div style="margin-top: 20px;">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Session type</label>
            <VueMultiselect :hide-selected="false" :close-on-select="true" :openDirection="'bottom'"
                :prevent-autofocus="true" :options="sessionTypes.map((value) => value.name)"
                v-model="selectedSessionType" :searchable="false" :show-labels="false"
                placeholder="Select session type" />
            <div v-if="sessionTypeError" class="alerts_error">{{ sessionTypeError }}</div>
        </div>
        <div style="margin-top: 20px;">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Assignees</label>
            <VueMultiselect :hide-selected="false" :close-on-select="true" :openDirection="'bottom'"
                :prevent-autofocus="true" :options="assigneesHolder.map((user: User) => user.username)"
                v-model="selectedAssignees" :searchable="false" :show-labels="false" placeholder="Select assignees" />
            <div v-if="assigneesError" class="alerts_error">{{ assigneesError }}</div>
        </div>
    </ion-content>
    <ion-footer collapse="fade">
        <ion-row>
            <ion-col>
                <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="dismiss()"> Cancel
                </ion-button>
            </ion-col>
            <ion-col>
                <DynamicButton @click="createImmunizationSessionSchedule()" name="Save changes" fill="solid"
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
    IonInput,
    modalController,
    IonFooter,
    IonLoading,
    IonIcon,
    IonButton
} from "@ionic/vue";
import { calendar, close } from "ionicons/icons";
import { computed, onMounted, ref, watch } from "vue";
import { useImmunizationSessionsStore } from "@/stores/ScheduleImmunizationSession";
import { toastWarning, toastSuccess } from "@/utils/Alerts";
import DynamicButton from "@/components/DynamicButton.vue";
import { UserService } from "@/services/user_service";
import { SessionScheduleService } from "@/services/session_schedule_service";
import { RepeatType, User } from "@/types";
import VueMultiselect from "vue-multiselect";

import {
    IMMUNIZATION_SESSION_SCHEDULE_CREATE_ERROR,
    IMMUNIZATION_SESSION_SCHEDULE_CREATE_SUCCESS
} from "@/utils/Constants";
import { format } from "date-fns";
import { useImmunizationSessionFieldsValidator } from "./validator";

const immunizationSessionsStore = useImmunizationSessionsStore();
const isSaving = ref<boolean>(false);
const dateRange = ref<Date[]>([]);
const formattedDateRange = computed((): string => {
    if (dateRange.value.length < 2) return '';
    return dateRange.value
        .map((date: Date) => format(date, "MM-dd-yyyy"))
        .join(" - ");
});
const repeatTypes = ref<Record<string, string>[]>([{
    id: "1",
    name: "Never",
},
{
    id: "2",
    name: "Daily",
},
{
    id: "3",
    name: "Weekly",
},
{
    id: "4",
    name: "Monthly",
}]);
const selectedRepeatType = ref<string>("");
const sessionTypes = ref<Record<string, string>[]>([
    {
        id: "1",
        name: "Static",
    },
    {
        id: "2",
        name: "Outreach",
    },
]);
const selectedSessionType = ref<string>("");
const showNumberOfDays = ref<boolean>(false);
const numberOfDays = ref<number>(1);
const assigneesHolder = ref<User[]>([]);
const sessionName = ref<string>("");
const selectedAssignees = ref<string[]>([]);
const sessionNameError = ref<string>("");
const dateRangeError = ref<string>("");
const repeatTypeError = ref<string>("");
const numberOfDaysError = ref<string>("");
const sessionTypeError = ref<string>("");
const assigneesError = ref<string>("");

const startDate = computed((): string => {
    return dateRange.value[0]
        ? format(dateRange.value[0], "MM-dd-yyyy")
        : "";
});
const endDate = computed((): string => {
    return dateRange.value[1]
        ? format(dateRange.value[1], "MM-dd-yyyy")
        : "";
});

const formattedRepeatText = computed((): string => {
    const repeatMap: Record<RepeatType, string> = {
        "Never": "Never",
        "Daily": "days",
        "Weekly": "weeks",
        "Monthly": "months",
    };
    return repeatMap[selectedRepeatType.value as RepeatType] || "";
});

const createImmunizationSessionSchedule = async (): Promise<void> => {
    const validationResult = useImmunizationSessionFieldsValidator(
        sessionName.value,
        dateRange.value,
        selectedRepeatType.value,
        numberOfDays.value,
        selectedSessionType.value,
        selectedAssignees.value
    );
    if (validationResult.isValid) {
        isSaving.value = true;
        const assignees = assigneesHolder.value
            .filter((user: User) => selectedAssignees.value.includes(user.username))
            .map((user: User) => user.id);

        const data: any = {
            session_name: sessionName.value,
            start_date: startDate.value,
            end_date: endDate.value,
            session_type: selectedSessionType.value,
            repeat: selectedRepeatType.value,
            assignees: assignees,
            frequency: numberOfDays.value
        };

        const sessionSchedule = new SessionScheduleService();
        await sessionSchedule.create(data);
        data ? toastSuccess(IMMUNIZATION_SESSION_SCHEDULE_CREATE_SUCCESS) : toastWarning(IMMUNIZATION_SESSION_SCHEDULE_CREATE_ERROR);
        isSaving.value = false;
        immunizationSessionsStore.resetFieldValues();
        modalController.dismiss("dismiss");
    } else {
        handleValidationErrors(validationResult.errors);
        toastWarning("Please make sure to fill all required fields");
        isSaving.value = false;
    }
};

const handleValidationErrors = (errors: { field: string, message: string }[]): void => {
    const errorFieldsMap: { [key: string]: any } = {
        sessionName: sessionNameError,
        dateRange: dateRangeError,
        repeatType: repeatTypeError,
        numberOfDays: numberOfDaysError,
        sessionType: sessionTypeError,
        assignees: assigneesError,
    };
    Object.keys(errorFieldsMap).forEach(field => {
        errorFieldsMap[field].value = '';
    });
    errors.forEach((error) => {
        if (errorFieldsMap[error.field]) {
            errorFieldsMap[error.field].value = error.message;
        }
    });
};

const getAssignees = async (_filter: any = ""): Promise<void> => {
    const assignees = await UserService.getUsersByRole({
        role: "Health Surveillance"
    });
    const modifiedAssignees = assignees.map((assignee: any) => ({
        ...assignee,
        name: assignee.username,
        id: assignee.user_id
    }));
    assigneesHolder.value = modifiedAssignees;
};

const dismiss = (): void => {
    modalController.dismiss({ update: true });
};

watch(selectedRepeatType, (value: string) => {
    if (value === "Never") {
        showNumberOfDays.value = false;
    } else {
        showNumberOfDays.value = true;
    }
});

watch([sessionName, dateRange, selectedRepeatType, numberOfDays, selectedSessionType, selectedAssignees], () => {
    const validationResult = useImmunizationSessionFieldsValidator(
        sessionName.value,
        dateRange.value,
        selectedRepeatType.value,
        numberOfDays.value,
        selectedSessionType.value,
        selectedAssignees.value
    );
    handleValidationErrors(validationResult.errors);
});

const isDailyRepeatTypePresent = () =>
    repeatTypes.value.some(item => item.name === "Daily");

const addDailyRepeatType = () => {
    if (!isDailyRepeatTypePresent()) {
        repeatTypes.value.push({ id: "2", name: "Daily" });
        repeatTypes.value.sort((a, b) => Number(a.id) - Number(b.id));
    }
};

const removeDailyRepeatType = () => {
    repeatTypes.value = repeatTypes.value.filter(item => item.name !== "Daily");
};

watch(dateRange, (newDateRange) => {
    if (newDateRange) {
        const [startDate, endDate] = newDateRange;
        if (startDate.toDateString() === endDate.toDateString()) {
            removeDailyRepeatType();
        } else {
            addDailyRepeatType();
        }
    }
});

onMounted(async (): Promise<void> => {
    await getAssignees();
});
</script>

<style scoped>
.alerts_error {
    margin-top: 2px;
    color: #b42318;
    display: flex;
    font-size: 15px;
    overflow: hidden;
    overflow: auto;
    padding: 5px;
    border-radius: 3px;
}
</style>