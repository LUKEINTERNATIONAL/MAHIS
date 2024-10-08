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
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Repeat type</label>
            <VueMultiselect :hide-selected="false" :close-on-select="true" :openDirection="'bottom'"
                :prevent-autofocus="true" :options="repeatTypes.map((value) => value.name)" v-model="selectedRepeatType"
                :searchable="false" :show-labels="false" placeholder="Select repeat type" />
            <div v-if="repeatTypeError" class="alerts_error">{{ repeatTypeError }}</div>
        </div>
        <div style="margin-top: 20px;" v-if="showNumberOfDays">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Number of {{ formattedRepeatText
                }}</label>
            <ion-input v-model="numberOfDays" clear fill="outline" :placeholder="numberOfDaysPlaceholder"></ion-input>
            <div v-if="numberOfDaysError" class="alerts_error">{{ numberOfDaysError }}</div>
        </div>
        <div style="margin-top: 20px;">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Start & End Date</label>
            <VueDatePicker required position="left" placeholder="select start & end date"
                :range="isRangeOrSingle" :ui="{ input: 'datepicker' }"
                format="dd/MM/yyyy" v-model="dateRange" :min-date="new Date()">
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
import { differenceInDays, format } from "date-fns";
import { useImmunizationSessionFieldsValidator } from "./validator";

const immunizationSessionsStore = useImmunizationSessionsStore();
const isSaving = ref<boolean>(false);
const dateRange = ref<Date[] | string>();
const formatDate = (date: Date | string) => format(new Date(date), "MM/dd/yyyy");
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

const isRangeOrSingle = computed((): boolean => {
    if(selectedRepeatType.value === null) return true
    if(selectedRepeatType.value.toLowerCase() === "daily") return false
    return true;
});

const formattedDateRange = computed((): string => {
  if (!dateRange.value) return ''
  if (Array.isArray(dateRange.value)) {
    const [start, end] = dateRange.value
    if (!start && !end) return ''
    if (!start || !end) return formatDate(start || end)
    return `${formatDate(start)} - ${formatDate(end)}`
  }
  return formatDate(dateRange.value)
});

const startDate = computed((): string => {
    if (Array.isArray(dateRange.value) && dateRange.value !== undefined) {
        return formatDate(dateRange.value[0]);
    }

    if (!Array.isArray(dateRange.value) && dateRange.value !== undefined) {
        return dateRange.value !== undefined ? formatDate(String(dateRange.value)) : "";
    }

    return "";
});

const endDate = computed((): string => {
    if (Array.isArray(dateRange.value)) {
        return formatDate(dateRange.value[1]);
    }

    if (!Array.isArray(dateRange.value)) {
        return dateRange.value !== undefined ? formatDate(String(dateRange.value)) : "";
    }

    return "";
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

const numberOfDaysPlaceholder = computed((): string => {
    return `Enter number of ${formattedRepeatText.value}`;
});

const createImmunizationSessionSchedule = async (): Promise<void> => {
    const validationResult = useImmunizationSessionFieldsValidator(
        sessionName.value,
        dateRange.value as Date[] || String,
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
            start_date: format(new Date(startDate.value), "yyyy-MM-dd"),
            end_date: format(new Date(endDate.value), "yyyy-MM-dd"),
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

watch(selectedRepeatType, (newType: string, oldType: string) => {
  if (newType === oldType) return;
  const actions: { [key: string]: () => void } = {
    null: () => {
      showNumberOfDays.value = false;
    },
    Never: () => {
      showNumberOfDays.value = false;
    },
    Daily: () => {
      showNumberOfDays.value = true;
      numberOfDays.value = 1;
      dateRange.value = "";
    },
    Weekly: () => {
      showNumberOfDays.value = true;
      numberOfDays.value = 1;
      if (!Array.isArray(dateRange.value)) {
        dateRange.value = [];
      }
    },
    Monthly: () => {
      showNumberOfDays.value = true;
      numberOfDays.value = 1;
      if (!Array.isArray(dateRange.value)) {
        dateRange.value = [];
      }
    },
    default: () => {
      showNumberOfDays.value = true;
      numberOfDays.value = 1;
    }
  };
  (actions[newType] || actions.default)();
});

watch([sessionName, dateRange, selectedRepeatType, numberOfDays, selectedSessionType, selectedAssignees], () => {
    const validationResult = useImmunizationSessionFieldsValidator(
        sessionName.value,
        dateRange.value as Date[] || String,
        selectedRepeatType.value,
        numberOfDays.value,
        selectedSessionType.value,
        selectedAssignees.value
    );
    handleValidationErrors(validationResult.errors);
});

const warnWeeklyRepeatType = () => {
    toastWarning("Weekly repeat type is not available for more than 7 days");
    dateRange.value = undefined
}

watch(dateRange, (newDateRange) => {
    if (!Array.isArray(newDateRange) || newDateRange.length !== 2) return;

    const [startDate, endDate] = newDateRange;
    const daysDifference = differenceInDays(endDate, startDate);

    if(selectedRepeatType.value === "Weekly" && daysDifference > 7) {
        warnWeeklyRepeatType();
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