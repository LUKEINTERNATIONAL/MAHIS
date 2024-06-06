<template>
    <ion-row class="checkbox_content md">
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[0].placeHolder"
                :icon="locationOutline"
                :inputValue="note_properties[0].dataValue.value"
                @update:inputValue="note_properties[0].dataHandler"
            />

            <div>
                <ion-label v-if="note_properties[0].show_error.value" class="error-label">
                    {{ note_properties[0].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col>
            <DatePicker :place_holder="date_properties[0].placeHolder" @date-up-dated="date_properties[0].dataHandler" />

            <div>
                <ion-label v-if="date_properties[0].show_error.value" class="error-label"> {{ date_properties[0].error_message }}</ion-label>
            </div>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col>
            <TimePicker :place_holder="time_properties[0].placeHolder" @time-up-dated="time_properties[0].dataHandler" />

            <div>
                <ion-label v-if="time_properties[0].show_error.value" class="error-label">{{ time_properties[0].error_message }}</ion-label>
            </div>
        </ion-col>
        <ion-col></ion-col>
    </ion-row>

    <ion-row class="checkbox_content md">
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[1].placeHolder"
                :icon="personCircleOutline"
                :inputValue="note_properties[1].dataValue.value"
                @update:inputValue="note_properties[1].dataHandler"
            />

            <div>
                <ion-label v-if="note_properties[1].show_error.value" class="error-label">
                    {{ note_properties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col>
            <ion-checkbox
                :value="checkbox_properties[0].value"
                alignment="start"
                class="ion-lblCls"
                :disabled="checkbox_properties[0].disable_checkbox.value"
            >
                {{ checkbox_properties[0].lblTxt }}
            </ion-checkbox>
        </ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <BasicInputField :placeholder="phone_number_place_holder" :icon="phonePortraitOutline" :inputValue="phone_number_value" />
        </ion-col>
        <ion-col></ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <DatePicker :place_holder="date_properties[1].placeHolder" @date-up-dated="date_properties[1].dataHandler" />

            <div>
                <ion-label v-if="date_properties[1].show_error.value" class="error-label">
                    {{ date_properties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col>
            <TimePicker :place_holder="time_properties[1].placeHolder" @time-up-dated="time_properties[1].dataHandler" />

            <div>
                <ion-label v-if="time_properties[1].show_error.value" class="error-label">
                    {{ time_properties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <VueMultiselect
                v-model="manner_of_death_Selection_value"
                @update:model-value="listUpdated1($event)"
                :multiple="false"
                :taggable="false"
                :hide-selected="true"
                :close-on-select="true"
                openDirection="bottom"
                tag-placeholder="Manner of death"
                placeholder="Manner of death"
                selectLabel=""
                label="name"
                :searchable="true"
                track-by="id"
                :options="mannerOfDeath"
            />
            <div>
                <ion-label v-if="list_picker_prperties[0].show_error.value" class="error-label">
                    {{ list_picker_prperties[0].error_message }}
                </ion-label>
            </div>
        </ion-col>

        <ion-col>
            <VueMultiselect
                v-model="how_did_it_occur_Selection_value"
                @update:model-value="listUpdated2($event)"
                :multiple="false"
                :taggable="false"
                :hide-selected="true"
                :close-on-select="true"
                openDirection="bottom"
                tag-placeholder="How did it occur?"
                placeholder="How did it occur?"
                selectLabel=""
                label="name"
                :disabled="temP_A"
                :searchable="true"
                track-by="id"
                :options="causesOfDeath"
            />

            <div>
                <ion-label v-if="list_picker_prperties[1].show_error.value" class="error-label">
                    {{ list_picker_prperties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[5].placeHolder"
                :icon="pencilOutline"
                :inputValue="note_properties[5].dataValue.value"
                :disabled="temP_AA"
                @update:inputValue="note_properties[5].dataHandler"
            />

            <div>
                <ion-label v-if="note_properties[5].show_error.value" class="error-label">
                    {{ note_properties[5].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <TimePicker :place_holder="time_properties[2].placeHolder" @time-up-dated="time_properties[2].dataHandler" />

            <div>
                <ion-label v-if="time_properties[2].show_error.value" class="error-label">
                    {{ time_properties[2].error_message }}
                </ion-label>
            </div>
        </ion-col>

        <ion-col>
            <BasicInputField
                :placeholder="note_properties[2].placeHolder"
                :icon="personCircleOutline"
                :inputValue="note_properties[2].dataValue.value"
                @update:inputValue="note_properties[2].dataHandler"
            />

            <div>
                <ion-label v-if="note_properties[2].show_error.value" class="error-label">
                    {{ note_properties[2].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[3].placeHolder"
                :icon="medicalOutline"
                :inputValue="note_properties[3].dataValue.value"
                @update:inputValue="note_properties[3].dataHandler"
            />

            <div>
                <ion-label v-if="note_properties[3].show_error.value" class="error-label">
                    {{ note_properties[3].error_message }}
                </ion-label>
            </div>
        </ion-col>

        <ion-col>
            <BasicInputField
                :placeholder="note_properties[4].placeHolder"
                :icon="pencilOutline"
                :inputValue="note_properties[4].dataValue.value"
                @update:inputValue="note_properties[4].dataHandler"
            />

            <div>
                <ion-label v-if="note_properties[4].show_error.value" class="error-label">
                    {{ note_properties[4].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-row class="spc_btwn" v-if="dynamic_button_properties[0].showAddItemButton">
        <dynamic-button
            v-if="dynamic_button_properties[0].addItemButton"
            :name="dynamic_button_properties[0].name"
            :fill="dynamic_button_properties[0].btnFill"
            :icon="addOutline"
            @clicked:btn="dynamic_button_properties[0].fn"
        />

        <dynamic-button
            v-if="dynamic_button_properties[1].addItemButton"
            :name="dynamic_button_properties[1].name"
            :fill="dynamic_button_properties[1].btnFill"
            :icon="removeOutline"
            @clicked:btn="dynamic_button_properties[1].fn"
        />
    </ion-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import { IonRow, IonCol, IonCheckbox, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { ref, watch, computed, onMounted, onUpdated } from "vue";
import TimePicker from "@/components/TimePicker.vue";
import DatePicker from "@/components/DatePicker.vue";
import Note from "@/apps/OPD/components/ConsultationPlan/Note.vue";
import ListPicker from "@/components/ListPicker.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import VueMultiselect from "vue-multiselect";
import DynamicButton from "@/components/DynamicButton.vue";
import { PatientService } from "@/services/patient_service";
import { areFieldsValid, getFieldsValuesObj } from "@/utils/GeneralUti";
import {
    checkmark,
    pulseOutline,
    addOutline,
    closeOutline,
    checkmarkOutline,
    filter,
    chevronDownOutline,
    chevronUpOutline,
    codeSlashOutline,
    phoneLandscape,
    phonePortraitOutline,
    locationOutline,
    personCircleOutline,
    medicalOutline,
    pencilOutline,
    removeOutline,
} from "ionicons/icons";
import _ from "lodash";

const phone_number_value = ref();
const phone_number_place_holder = ref("gurdian phone number");
const isClientFemale = ref(true);
const temP_A = ref(true as any);
const temP_AA = ref(true as any);
const manner_of_death_Selection_value = ref();
const how_did_it_occur_Selection_value = ref();

onMounted(async () => {
    checkPatient();
});

const time_properties = [
    {
        placeHolder: { default: "Enter time of death if known" } as any,
        property_name: "timeOfDeath",
        dataHandler: timeUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Time required",
        type: "time",
        skip_validation: false,
    },
    {
        placeHolder: { default: "Enter time arrived" } as any,
        property_name: "timeArrived",
        dataHandler: timeUpdate_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Time required",
        type: "time",
        skip_validation: false,
    },
    {
        placeHolder: { default: "Enter time confirming death" } as any,
        property_name: "timeOfDeathConfirmation",
        dataHandler: timeUpdate_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Time required",
        skip_validation: false,
    },
];

const date_properties = [
    {
        placeHolder: { default: "Enter date of death" } as any,
        property_name: "dateOfDeath",
        dataHandler: dateUpdate_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Date required",
        type: "date",
        skip_validation: false,
    },
    {
        placeHolder: { default: "Enter date arrived" } as any,
        property_name: "dateArrived",
        dataHandler: dateUpdate_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Date required",
        type: "date",
        skip_validation: false,
    },
    {
        placeHolder: { default: "Enter date confirming death" } as any,
        property_name: "dateOfDeathConfirmation",
        dataHandler: dateUpdate_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Date required",
        type: "date",
        skip_validation: false,
    },
];

const checkbox_properties = [
    {
        lblTxt: "Was the individual pregnant at the time of death?",
        value: ref(false),
        disable_checkbox: ref(true),
    },
];

const note_properties = [
    {
        placeHolder: "Enter place of death",
        property_name: "placeOfDeath",
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false) as any,
        error_message: "Input required, Only letters are allowed",
        type: "text",
        skip_validation: false,
    },
    {
        placeHolder: "Enter name of guardian",
        property_name: "nameOfGuardian",
        dataHandler: notesUpDated_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Input required, Only letters are allowed",
        type: "text",
        skip_validation: false,
    },
    {
        placeHolder: "Enter name of person confirming death",
        property_name: "nameOfPersonConfirmindDeath",
        dataHandler: notesUpDated_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Input required, Only letters are allowed",
        type: "text",
        skip_validation: false,
    },
    {
        placeHolder: "Enter position of the person confirming death",
        property_name: "positionOfthePersonConfirmingDeath",
        dataHandler: notesUpDated_fn4,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Input required, Only letters are allowed",
        type: "text",
        skip_validation: false,
    },
    {
        placeHolder: "Enter medical council registration number of the person confirming death",
        property_name: "medicalConcilRegistrationNumberOfThePersonConfirmingDeath",
        dataHandler: notesUpDated_fn5,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Input required, Only letters and numbers are allowed",
        type: "alphanumeric",
        skip_validation: false,
    },
    {
        placeHolder: "Other (specify)",
        property_name: "otherNotes",
        dataHandler: notesUpDated_fn6,
        dataValue: ref(),
        show_error: ref(false),
        error_message: "Input required, Only letters are allowed",
        dissabled: temP_AA.value,
        type: "text",
        skip_validation: true,
    },
];

const dynamic_button_properties = [
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "save",
        btnFill: "clear",
        fn: validateForm,
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "cancel",
        btnFill: "clear",
        fn: cancelE,
    },
];

const mannerOfDeath = ref([
    { id: 1, name: "Natural" },
    { id: 2, name: "Accident" },
    { id: 3, name: "Homicide" },
    { id: 4, name: "Suicide" },
    { id: 5, name: "Pending investigation" },
    { id: 6, name: "Could not be determined" },
    { id: 7, name: "Other - specify" },
] as any);

const causesOfDeath = ref([
    { id: 1, name: "Motor vehicle (passenger)" },
    { id: 2, name: "Motor vehicle (pedestrian)" },
    { id: 3, name: "Drowning" },
    { id: 4, name: "Other - specify" },
] as any);

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        manner_of_death_Selection_value: ref(),
        show_list_label: true as any,
        unqueId: "qwerty" as any,
        name_of_list: "Manner of death " as any,
        property_name: "mannerOfDeath",
        placeHolder: "Choose one" as any,
        items: mannerOfDeath.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: () => {},
        use_internal_filter: true as any,
        disabled: ref(false) as any,
        show_error: ref(false),
        error_message: "selection required",
    },
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: "qwerty1hjkn" as any,
        name_of_list: "How did it occur?" as any,
        property_name: "howDiditOccur",
        placeHolder: "Choose one" as any,
        items: causesOfDeath.value,
        listUpdatedFN: listUpdated2,
        listFilteredFN: () => {},
        use_internal_filter: true as any,
        disabled: temP_A.value,
        show_error: ref(false),
        error_message: "selection required",
    },
];

function cancelE() {
    dataSaved();
}

const emit = defineEmits<{
    (e: "dataSaved", ObjectsArray: any): void;
}>();

function dataSaved(data = { dataSaved: true }) {
    emit("dataSaved", data);
}

function timeUpdate_fn1(data: any) {
    time_properties[0].dataValue.value = data;
}

function timeUpdate_fn2(data: any) {
    time_properties[1].dataValue.value = data;
}

function timeUpdate_fn3(data: any) {
    time_properties[2].dataValue.value = data;
}

function dateUpdate_fn1(data: any) {
    const date_data = {
        day: data.value.day,
        month: data.value.month,
        year: data.value.year,
        formattedDate: data.formattedDate,
    };
    date_properties[0].dataValue.value = date_data;
}

function dateUpdate_fn2(data: any) {
    const date_data = {
        day: data.value.day,
        month: data.value.month,
        year: data.value.year,
        formattedDate: data.formattedDate,
    };
    date_properties[1].dataValue.value = date_data;
    console.log(date_properties[2].dataValue.value);
}

function dateUpdate_fn3(data: any) {
    const date_data = {
        day: data.value.day,
        month: data.value.month,
        year: data.value.year,
        formattedDate: data.formattedDate,
    };
    date_properties[2].dataValue.value = date_data;

    console.log(date_properties[2].dataValue.value);
}

function notesUpDated_fn1(event: any) {
    const reason = event.target.value;
    note_properties[0].dataValue.value = reason;
}
function notesUpDated_fn2(event: any) {
    const input = event.target.value;
    note_properties[1].dataValue.value = input;
}

function notesUpDated_fn3(event: any) {
    const input = event.target.value;
    note_properties[2].dataValue.value = input;
}

function notesUpDated_fn4(event: any) {
    const input = event.target.value;
    note_properties[3].dataValue.value = input;
}

function notesUpDated_fn5(event: any) {
    const input = event.target.value;
    note_properties[4].dataValue.value = input;
}

function notesUpDated_fn6(event: any) {
    const input = event.target.value;
    note_properties[5].dataValue.value = input;
}

function listUpdated1(data: any) {
    if (data.id == 2) {
        temP_A.value = false;
        temP_AA.value = true;
        return;
    }

    if (data.id == 7) {
        temP_AA.value = false;
        temP_A.value = true;
        return;
    }

    temP_A.value = true;
    temP_AA.value = true;
    return;
}

function resetSelectionForCausesOfDeath() {
    causesOfDeath.value.forEach((item: any) => {
        item.selected = false;
    });
}

function listUpdated2(data: any) {
    console.log("listUpdated", data);
    if (data.id == 4) {
        temP_AA.value = false;
        return;
    }
    temP_AA.value = true;
    return;
}

function checkPatient() {
    const patient = new PatientService();
    const isChildBearing = patient.isChildBearing as any;
    if (isChildBearing == true) {
        checkbox_properties[0].disable_checkbox.value = false;
    }
    if (isChildBearing == false) {
        checkbox_properties[0].disable_checkbox.value = true;
    }
}

function validateForm() {
    areFieldsValid(note_properties);
    areFieldsValid(date_properties);
    areFieldsValid(time_properties);
    isItemSeleted(list_picker_prperties[0]);
    isItemSeleted(list_picker_prperties[1]);

    const payload = _.merge(
        getFieldsValuesObj(note_properties),
        getFieldsValuesObj(date_properties),
        getFieldsValuesObj(time_properties),
        getItemSeletedObj(list_picker_prperties[0]),
        getItemSeletedObj(list_picker_prperties[1])
    );

    console.log(payload);
}

function isItemSeleted(propoerties_item: any) {
    const temp_data_v = [];
    propoerties_item.items.forEach((item: any) => {
        if (item.selected == true) {
            temp_data_v.push(item);
        }
    });
    if (temp_data_v.length > 0) {
        propoerties_item.show_error.value = false;
    } else {
        propoerties_item.show_error.value = true;
    }

    return propoerties_item.show_error.value;
}

function getItemSeletedObj(propoerties_item: any) {
    const temp_data_v: any[] = [];
    let resultObject: { [key: string]: any } = {};
    propoerties_item.items.forEach((item: any) => {
        if (item.selected == true) {
            temp_data_v.push({
                property_name: propoerties_item.property_name,
                name: item.name,
            });
        }
    });
    if (temp_data_v.length > 0) {
        resultObject[temp_data_v[0].property_name] = temp_data_v[0].name;
        return resultObject;
    } else {
        return resultObject;
    }
}
</script>

<style scoped>
.initTxt {
    text-align: center;
}
.spc_btwn {
    margin-top: 2%;
}
.item-al {
    cursor: pointer;
    padding: 5px;
    background-color: #ebebeb;
    margin-top: 8px;
}
.item-al:hover {
    background-color: #55515148;
    padding: 5px;
    border-radius: 3px;
}
ion-popover.popover-al {
    --background: #fff;
}
ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}
.saveContainer {
    display: flex;
    align-items: flex-end;
}
.action_buttons {
    margin-top: 5px;
}
.error-label {
    background: #fecdca;
    color: #b42318;
    text-transform: none;
    padding: 6%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
.spc_btwn {
    margin-top: 2%;
}
.ion-lblCls {
    font-weight: bold;
}
</style>
