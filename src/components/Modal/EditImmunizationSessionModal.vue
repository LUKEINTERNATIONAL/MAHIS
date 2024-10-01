<template>
    <ion-header>
        <ion-toolbar>
            <ion-title class="modalTitle">Edit Immunization Session Schedule</ion-title>
            <ion-button fill="clear" slot="end" @click="dismiss()">
                <ion-icon :icon="close" color="white" />
            </ion-button>
        </ion-toolbar>
    </ion-header>

    <ion-loading v-show="isSaving" trigger="open-loading" message="Saving, please wait..."> </ion-loading>


    <div class="ion-padding">
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
            <ion-input v-model="numberOfDays" clear fill="outline" placeholder="Enter the number of days"></ion-input>
            <div v-if="numberOfDaysError" class="alerts_error">{{ numberOfDaysError }}</div>
        </div>
        <div style="margin-top: 20px;">
            <label style="font-size: 18px; font-weight: 500; margin-bottom: 10px;">Start & End Date</label>
            <VueDatePicker required position="left" placeholder="select start & end date"
                :range="selectedRepeatType.toLowerCase() !== 'daily' ? true : false" :ui="{ input: 'datepicker' }"
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
    </div>
    <ion-footer collapse="fade">
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
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonInput,
    IonRow,
    IonCol,
    IonButton,
    IonLoading,
    IonIcon,
    modalController
} from "@ionic/vue";
import { calendar, close } from "ionicons/icons";
import DynamicButton from "@/components/DynamicButton.vue";
import { UserService } from '@/services/user_service';
import VueMultiselect from "vue-multiselect";
import { computed, onMounted, ref, watch } from 'vue';
import { RepeatType, User } from "@/types";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { SessionScheduleService } from "@/services/session_schedule_service";
import { differenceInDays, format } from "date-fns";
import { useImmunizationSessionFieldsValidator } from "./validator";

const props = defineProps({ data: { required: true, type: Object } });

const isSaving = ref<boolean>(false);
const dateRange = ref<Date[] | string>();
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
const formatDate = (date: Date | string) => format(new Date(date), "MM-dd-yyyy");


const formattedDateRange = computed((): string => {
    if (Array.isArray(dateRange.value)) {
        return dateRange.value.map(formatDate).join(" - ");
    }

    if (!Array.isArray(dateRange.value)) {
        return dateRange.value !== undefined ? formatDate(String(dateRange.value)) : "";
    }
    return '';
});

const startDate = computed((): string => {
    if (Array.isArray(dateRange.value)) {
        return formatDate(dateRange.value[0]);
    }

    if (!Array.isArray(dateRange.value)) {
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

const editImmunizationSessionSchedule = async () => {
    const validationResult = useImmunizationSessionFieldsValidator(
        sessionName.value,
        dateRange.value as Date[] | string,
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
        console.log(props.data)
        await sessionSchedule.update(data, props.data.session_schedule_id);
        data ? toastSuccess("Immunization session schedule updated successfully!") : toastWarning("An error occurred, please try again later");
        isSaving.value = false;
        modalController.dismiss("dismiss");
    } else {
        handleValidationErrors(validationResult.errors);
        toastWarning("Please make sure to fill all required fields");
        isSaving.value = false;
    }
}

const updateSessionData = (): void => {
    sessionName.value = props.data.session_name;
    dateRange.value = props.data.repeat_type.toLowerCase() == "daily" ? props.data.start_date : [new Date(props.data.start_date), new Date(props.data.end_date)];
    selectedRepeatType.value = props.data.repeat_type;
    selectedSessionType.value = props.data.session_type;
    numberOfDays.value = props.data.frequency;
    selectedAssignees.value = props.data.assignees.map((assignee: User) => assignee.username);
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
    assigneesHolder.value = modifiedAssignees;
}

const dismiss = (): void => {
    modalController.dismiss({ update: false });
}

watch(selectedRepeatType, (newType: string, oldType: string) => {
  if (newType === oldType) return;

  const actions: { [key: string]: () => void } = {
    Never: () => {
      showNumberOfDays.value = false;
    },
    Weekly: () => {
      showNumberOfDays.value = true;
      numberOfDays.value = 1;
      if (typeof dateRange.value === "string") {
        dateRange.value = [new Date(dateRange.value), new Date(dateRange.value)];
      }
    },
    Monthly: () => {
      showNumberOfDays.value = true;
      numberOfDays.value = 1;
      if (typeof dateRange.value === "string") {
        dateRange.value = [new Date(dateRange.value), new Date(dateRange.value)];
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
        dateRange.value as Date[] | string,
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

    daysDifference > 7
        && warnWeeklyRepeatType();
});

onMounted(() => {
    getAssignees();
    updateSessionData();
})
</script>