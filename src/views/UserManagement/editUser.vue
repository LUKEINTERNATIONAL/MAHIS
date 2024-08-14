<template>
    <ion-row>
        <ion-col>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                >First Name<span style="color: #b42318">*</span></ion-label
            >
            <BasicInputField
                :placeholder="input_properties[1].placeHolder"
                :icon="personOutline"
                :inputValue="first_name"
                @update:inputValue="input_properties[1].dataHandler"
            />

            <div>
                <ion-label v-if="input_properties[1].show_error.value" class="error-label">
                    {{ input_properties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                >Last name<span style="color: #b42318">*</span></ion-label
            >
            <BasicInputField
                :placeholder="input_properties[2].placeHolder"
                :icon="peopleOutline"
                :inputValue="last_name"
                @update:inputValue="input_properties[2].dataHandler"
            />

            <div>
                <ion-label v-if="input_properties[2].show_error.value" class="error-label">
                    {{ input_properties[2].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-row>
            <ion-col>
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                    >Username<span style="color: #b42318">*</span></ion-label
                >
                <BasicInputField
                    :placeholder="input_properties[0].placeHolder"
                    :icon="personCircleOutline"
                    :inputValue="user_name"
                    @update:inputValue="input_properties[0].dataHandler"
                />

                <div>
                    <ion-label v-if="input_properties[0].show_error.value" class="error-label">
                        {{ input_properties[0].error_message }}
                    </ion-label>
                </div>
            </ion-col>

            <ion-col>
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                >Phone<span style="color: #b42318">*</span></ion-label
            >
                <BasicInputField
                    :placeholder="'phone number'"
                    :icon="phonePortraitOutline"
                    :inputValue="''"
                    @update:inputValue=""
                />
            </ion-col>
    </ion-row>



        <!-- <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="transgenderOutline"
                    :inputValue="note_properties[0].dataValue.value"
                    @update:inputValue="note_properties[0].dataHandler"
                />
            </ion-col>
            <ion-col></ion-col>
        </ion-row> -->

        <ion-row v-if="isSuperUser">
            <ion-col>
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                    >Activate/Deactivate user<span style="color: #b42318">*</span></ion-label
                >
                <Toggle
                    class="toggle-green"
                    :classes="{
                        container: 'inline-block rounded-full outline-none focus:ring focus:ring-green-500 focus:ring-opacity-30',
                    }" 
                    v-model="toggle_local"
                    :offLabel="'inactive'"
                    :onLabel="'active'"
                />
            </ion-col>
        </ion-row>

        <ion-row v-if="isSuperUser">
            <ion-col size="6" v-if="false">
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                    >District(s)<span style="color: #b42318">*</span></ion-label
                >
                <VueMultiselect
                    v-model="selected_Districts"
                    @update:model-value="selectedDistrict($event)"
                    :multiple="true"
                    :taggable="false"
                    :hide-selected="true"
                    :close-on-select="true"
                    openDirection="bottom"
                    tag-placeholder="Find and select District(s)"
                    placeholder="Find and select District(s)"
                    selectLabel=""
                    label="name"
                    :searchable="true"
                    @search-change=""
                    track-by="district_id"
                    :options="districtList"
                    :disabled="HSA_found_for_disabling_button"
                />

                <div>
                    <ion-label v-if="district_show_error" class="error-label">
                        {{ district_error_message }}
                    </ion-label>
                </div>
            </ion-col>

            <ion-col size="6">
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                    >Facility name<span style="color: #b42318">*</span></ion-label
                >
                <VueMultiselect
                    v-model="selected_location"
                    @update:model-value="selectedLocation($event)"
                    :multiple="false"
                    :taggable="false"
                    :hide-selected="true"
                    :close-on-select="true"
                    openDirection="bottom"
                    tag-placeholder="Find and select facility name"
                    placeholder="Find and select facility name"
                    selectLabel=""
                    label="name"
                    :searchable="true"
                    @search-change="FindLocation($event)"
                    track-by="location_id"
                    :options="locationData"
                />

                <div>
                    <ion-label v-if="location_show_error" class="error-label">
                        {{ location_error_message }}
                    </ion-label>
                </div>
            </ion-col>
        </ion-row>

        <ion-row>
        <ion-col size="6">
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                >Traditional Authority(TA)(s)<span style="color: #b42318">*</span></ion-label
            >
            <VueMultiselect
                v-model="selected_TAz"
                @update:model-value="selectedTA($event)"
                :multiple="true"
                :taggable="false"
                :hide-selected="true"
                :close-on-select="true"
                openDirection="bottom"
                tag-placeholder="Find and select Traditional Authority (TA)"
                placeholder="Find and select Traditional Authority (TA)"
                selectLabel=""
                label="name"
                :searchable="true"
                @search-change=""
                track-by="assigned_id"
                :options="TAList"
                :disabled="HSA_found_for_disabling_button"
            />

            <div>
                <ion-label v-if="TAz_show_error" class="error-label">
                    {{ TAz_error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col size="6">
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                >Village(s)<span style="color: #b42318">*</span></ion-label
            >
            <VueMultiselect
                v-model="selected_villages"
                @update:model-value="selectedVillage($event)"
                :multiple="true"
                :taggable="false"
                :hide-selected="true"
                :close-on-select="true"
                openDirection="bottom"
                tag-placeholder="Find and select village(s)"
                placeholder="Find and select village(s)"
                selectLabel=""
                label="name"
                :searchable="true"
                @search-change=""
                track-by="assigned_id"
                :options="villageList"
                :disabled="HSA_found_for_disabling_button"
            />

            <div>
                <ion-label v-if="village_show_error" class="error-label">
                    {{ village_error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

        <ion-row v-if="isSuperUser">
            <ion-col>
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                    >Role(s)<span style="color: #b42318">*</span></ion-label
                >
                <ListPicker
                    :multiSelection="list_picker_prperties[0].multi_Selection"
                    :show_label="list_picker_prperties[0].show_list_label"
                    :uniqueId="list_picker_prperties[0].unqueId"
                    :name_of_list="list_picker_prperties[0].name_of_list"
                    :choose_place_holder="list_picker_prperties[0].placeHolder"
                    :items_-list="user_roles"
                    :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                    :disabled="list_picker_prperties[0].disabled.value"
                    @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
                    @item-list-filtered="list_picker_prperties[0].listFilteredFN"
                    @item-search-text="list_picker_prperties[0].searchTextFN"
                />
            </ion-col>
        </ion-row>

        <ion-row v-if="isSuperUser">
            <ion-col>
                <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                    >Program(s)<span style="color: #b42318">*</span></ion-label
                >
                <ListPicker
                    :multiSelection="list_picker_prperties[1].multi_Selection"
                    :show_label="list_picker_prperties[1].show_list_label"
                    :uniqueId="list_picker_prperties[1].unqueId"
                    :name_of_list="list_picker_prperties[1].name_of_list"
                    :choose_place_holder="list_picker_prperties[1].placeHolder"
                    :items_-list="user_programs"
                    :use_internal_filter="list_picker_prperties[1].use_internal_filter"
                    :disabled="list_picker_prperties[1].disabled.value"
                    @item-list-up-dated="list_picker_prperties[1].listUpdatedFN"
                    @item-list-filtered="list_picker_prperties[1].listFilteredFN"
                    @item-search-text="list_picker_prperties[1].searchTextFN"
                />
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <div v-for="(item, index) in user_programs.slice().reverse()" :key="index">
                    <userActivities
                        v-if="item.selected"
                        :userId="userId"
                        :user_programs="item"
                        :action="actionN"
                    />
                </div>
            </ion-col>
        </ion-row>

        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px;">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Change Password</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <ion-row>
        <ion-col>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                >New password<span style="color: #b42318">*</span></ion-label
            >
            <BasicInputField
                :placeholder="password_input_properties[0].placeHolder"
                :icon="keyOutline"
                :inputValue="password_input_properties[0].dataValue.value"
                @update:inputValue="password_input_properties[0].dataHandler"
            />

            <div>
                <ion-label v-if="password_input_properties[0].show_error.value" class="error-label">
                    {{ password_input_properties[0].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col>
            <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; color: grey"
                >Repeat password<span style="color: #b42318">*</span></ion-label
            >
            <BasicInputField
                :placeholder="password_input_properties[1].placeHolder"
                :icon="keyOutline"
                :inputValue="password_input_properties[1].dataValue.value"
                @update:inputValue="password_input_properties[1].dataHandler"
            />

            <div>
                <ion-label v-if="password_input_properties[1].show_error.value" class="error-label">
                    {{ password_input_properties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>
                </div>
            </ion-accordion>
        </ion-accordion-group>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { text } from "ionicons/icons"
import { it } from "date-fns/locale"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
})
</script>
<script setup lang="ts">
import { IonButtons,
    IonButton, IonList, IonRow,
     IonImg, IonLabel,
     IonPage, IonCard,     IonAccordionGroup,
    AccordionGroupCustomEvent, } from "@ionic/vue"
import { IonContent, IonHeader, IonItem, IonCol, IonToolbar, IonMenu, modalController } from "@ionic/vue"
import Toggle from '@vueform/toggle'
import ListPicker from "../../components/ListPicker.vue"
import userActivities from "./userActivities.vue"
import VueMultiselect from "vue-multiselect"
import { LocationService } from "@/services/location_service"
import { isEmpty } from "lodash"
import {
    addOutline,
    pencilOutline,
    removeOutline,
    personCircleOutline,
    keyOutline,
    transgenderOutline,
    personOutline,
    peopleOutline,
    phonePortraitOutline,
} from "ionicons/icons";
import { ref, onMounted, watch } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { UserService } from "@/services/user_service";
import { ProgramService } from "@/services/program_service";
import { areFieldsValid, getFieldsValuesObj, isPasswordValid } from "@/utils/GeneralUti";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { useUserStore } from "@/stores/userStore";

const toggle_local = ref(false);
const user_roles = ref([] as any);
const user_programs = ref([] as any);
const user_data = ref();
const user_name = ref();
const first_name = ref();
const last_name = ref();
const userId = ref() as any;
const show_user_programs = ref(false);
const actionN = ref('');
const selected_location = ref();
const locationData = ref([]) as any;
const locationId = ref();
const location_error_message = ref('Select location');
const location_show_error = ref(false);
const passwordErrorMsgs = [
    'Input must be at least 4 characters long, containing only letters, numbers, and symbols',
    'Password does not match'
]
const isSuperUser = ref(false);
const districtList = ref([] as any);
const HSA_found_for_disabling_button = ref(true)
const selected_Districts = ref();
const district_show_error = ref(false)
const district_error_message = ref('Select district(s)')
const village_error_message = ref('Select village(s)')
const selected_TAz = ref()
const villageList = ref([] as any)
const village_show_error = ref(false)
const TAz_show_error = ref(false)
const TAz_error_message = ref('Select TA(s)')
const selected_villages = ref()
const TAList = ref([] as any)
const selectedDistrictIds : any[] = []
const selectedTAIds: any[] = []
const disableVillageSelection = ref(true)
const selectedVillageIds: any[] = []

const props = defineProps<{
    toggle: true,
    user_id: any,
    action: any
}>()

onMounted(async () => {
    await getUserRoles()
    await getUserPrograms()
    await getUserData()
    getCurrentUser()
    districtList.value = await getdistrictList() 
})

watch(
    () => props.action,
    async (newValue) => {
        trigerSaveFn()
    }
)

function selectedLocation(data: any) {
    selected_location.value = data
}

async function FindLocation(text: any) {
    console.log(text)
    let srch_text
    if (isEmpty(text) == true) {
        srch_text = ''
    } if (isEmpty(text) == false) {
        srch_text = text
    }
    const temp_data1 = await LocationService.getFacilities({ name: srch_text })
    locationData.value = []
    temp_data1.forEach((item: any) => {
        if (isEmpty(item.name) == false) {
                locationData.value.push(item)
            }
    })
}

async function getUserStatus() {
    const deactivated_on = user_data.value.deactivated_on
    if (deactivated_on == null) {
        toggle_local.value = true
    } else if (deactivated_on != null) {
        toggle_local.value = false
    }
}

async function trigerSaveStatusFn() {
    if (toggle_local.value == false) {
        UserService.deactivateUser(userId.value)
    }
    if (toggle_local.value == true) {
        UserService.activateUser(userId.value)
    }
}

function trigerSaveFn() {
    actionN.value = props.action
    preSavePrograms()
    preSaveRoles()
    trigerSaveStatusFn()
    updateUserDemographics()
    updatePassword()
}

const input_properties = [
    {
        placeHolder: 'username',
        property_name: 'username',
        dataHandler: inputUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
        type: 'text',
    },
    {
        placeHolder: 'firstname',
        property_name: 'firstname',
        dataHandler: inputUpDated_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
        type: 'text',
    },
    {
        placeHolder: 'last name',
        property_name: 'last_name',
        dataHandler: inputUpDated_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
        type: 'text',
    },
]

const password_input_properties = [
    {
        placeHolder: 'new password',
        dataHandler: passwordInputUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: passwordErrorMsgs[0],
    },
    {
        placeHolder: 'repeat password',
        dataHandler: passwordInputUpDated_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: passwordErrorMsgs[0],
    },
]

function passwordInputUpDated_fn1(event: any) {
    const input = event.target.value
    password_input_properties[0].dataValue.value = input
}
function passwordInputUpDated_fn2(event: any) {
    const input = event.target.value
    password_input_properties[1].dataValue.value = input
}

function inputUpDated_fn1(event: any) {
    const input = event.target.value
    input_properties[0].dataValue.value = input
    user_name.value = input
}
function inputUpDated_fn2(event: any) {
    const input = event.target.value
    input_properties[1].dataValue.value = input
    first_name.value = input
}
function inputUpDated_fn3(event: any) {
    const input = event.target.value
    input_properties[2].dataValue.value = input
    last_name.value = input
}

function validateLocation() {
    if (isEmpty(selected_location.value) == true) {
        location_show_error.value = true
        return false
    }
    if (isEmpty(selected_location.value) == false) {
        location_show_error.value = false
        return true
    }
}


function validatePasswordMatch(){
     const password = password_input_properties[0].dataValue.value;
    const confirm = password_input_properties[1].dataValue.value;

       if(password!=confirm) {
         password_input_properties[0].show_error.value=true;
         password_input_properties[0].error_message="Passwords don't match";
         return false
    } 
         password_input_properties[0].show_error.value=false;
         password_input_properties[0].error_message="";
         return true
    
}

async function updatePassword() {

    if(!validatePasswordMatch())  return

    const password =password_input_properties[0].dataValue.value;

    if(password=="") return

    await UserService.updateUser(userId.value, {password});
 }

function ValidatePassword(): boolean {
    let is_valid = false
    let error_foundP_p1 = false
    let error_foundP_p2 = false
    let is_password1_valid
    let is_password2_valid
    

    password_input_properties[0].error_message = passwordErrorMsgs[0]
    password_input_properties[1].error_message = passwordErrorMsgs[0]

    if (password_input_properties[0].dataValue.value == undefined || password_input_properties[0].dataValue.value == "") {
        password_input_properties[0].show_error.value = true
        error_foundP_p1 = true
    }

    if (password_input_properties[1].dataValue.value == undefined || password_input_properties[1].dataValue.value == "") {
        password_input_properties[1].show_error.value = true
        error_foundP_p2 = true
    }


    if (error_foundP_p1 == false) {
        is_password1_valid = isPasswordValid(password_input_properties[0].dataValue.value)

        if (is_password1_valid == false) {
            password_input_properties[0].show_error.value = true
            error_foundP_p1 = true
        }

        if (is_password1_valid == true) {
            password_input_properties[0].show_error.value = false
        }
    }

    if (error_foundP_p2 == false) {
        is_password2_valid = isPasswordValid(password_input_properties[1].dataValue.value)

        if (is_password2_valid == false) {
            password_input_properties[1].show_error.value = true
            error_foundP_p2 = true
        }

        if (is_password2_valid == true) {
            password_input_properties[1].show_error.value = false
        }
    }

    if (error_foundP_p1 == false && error_foundP_p2 == false) {
        if (is_password1_valid == true && is_password2_valid == true) {
            if (password_input_properties[0].dataValue.value === password_input_properties[1].dataValue.value) {
                password_input_properties[0].show_error.value = false
                password_input_properties[1].show_error.value = false
                is_valid = true
            }

            if (password_input_properties[0].dataValue.value != password_input_properties[1].dataValue.value) {
                password_input_properties[0].error_message = passwordErrorMsgs[1]
                password_input_properties[1].error_message = passwordErrorMsgs[1]
                password_input_properties[0].show_error.value = true
                password_input_properties[1].show_error.value = true
                is_valid = false
            }

        }
    }
    return is_valid
}


async function getUserData() {
    userId.value = props.user_id
    user_data.value = await UserService.getUserByID(props.user_id)
    if (user_data.value.location_id != null) {
            const response = await LocationService.getLocation(user_data.value.location_id)
        if (isEmpty(response) == false) {
            selected_location.value = response
        }
    }
    user_name.value = user_data.value.username
    input_properties[0].dataValue.value = user_name.value

    first_name.value =  userFirstname(user_data.value.person.names)
    input_properties[1].dataValue.value = first_name.value

    last_name.value = userLastname(user_data.value.person.names)
    input_properties[2].dataValue.value = last_name.value

    fillUserRoles()
    fillUserPrograms()
    getAPICounterPart() 
    getUserStatus()
}

async function preSaveRoles() {
    const selectedRoles: any[] = []
    const selectedRoleNames: any[] = []
    user_roles.value.forEach((role: any) => {
        if (role.selected == true) {
            selectedRoles.push(role)
        }
    })

    selectedRoles.forEach((role: any) => {
        selectedRoleNames.push(role.other.role)
    })
    saveRoles(selectedRoleNames)
}

async function updateUserDemographics() {
    const _areFieldsValid_ = areFieldsValid(input_properties)
    const _validateLocation = validateLocation()

    if (_areFieldsValid_ == false && _validateLocation == false && !validatePasswordMatch()) {
        saveEvent(false)
    }

    if (_areFieldsValid_ == true && _validateLocation == true && validatePasswordMatch()) {
        saveEvent(true)
        const payload = {
            given_name: first_name.value,
            family_name: last_name.value,
            username: user_name.value,
            location_id: selected_location.value.location_id,
            must_append_roles:false,
        }
        UserService.updateUser(userId.value, payload)

        const username_payload = {
            new_username: user_name.value,
        }

        try {
            const response = await UserService.updateusername(userId.value, username_payload)
            toastSuccess("username updated successfully")
        } catch (error) {
            toastWarning("username update failed, already existing")
            
        }
    } 
}

async function saveRoles(roleNames: any) {
    UserService.updateUser(userId.value, {
        must_append_roles: false,
        roles: roleNames
    })
}

async function preSavePrograms() {
    const selectedPrograms: any[] = []
    const selectedProgramIds: any[] = []
    user_programs.value.forEach((program: any) => {
        if (program.selected == true) {
            selectedPrograms.push(program)
        }
    })

    selectedPrograms.forEach((program: any) => {
        selectedProgramIds.push(program.other.program_id)
    })

    if (selectedProgramIds.length > 0) {
        savePrograms(selectedProgramIds)
    }
}

async function savePrograms(programIds: any) {
    UserService.updateUser(userId.value, {
        programs: programIds
    })
}

function fillUserRoles() {
    user_roles.value.forEach((item: any) => {
        user_data.value.roles.forEach((userR: any) => {
            if (userR.uuid == item.other.uuid) {
                item.selected = true
            }
        })
    })
}

function getCurrentUser() {
    const user_store = useUserStore();
    const current_user = user_store.getUser()
    current_user.roles.forEach((userR: any) => {
            findSuperUserRole(userR)
        })
}

function findSuperUserRole(role: any) {
    const superUserRoles = [
        'Superuser',
        'Superuser,Superuser,'
    ]
    superUserRoles.forEach((SUR: any) => {  
        if (role.role.toLowerCase() == SUR.toLowerCase()) {
            isSuperUser.value = true
        }
    })
}

async function generatePropertiesList() {
    const selectedPrograms = [] as any
    user_programs.value.forEach((item: any) => {
        if (item.selected == true) {
            selectedPrograms.push({item})
        } 
    })
    if (selectedPrograms.length > 0) {
        show_user_programs.value = true
    }
    return selectedPrograms
}

async function getAPICounterPart() {
    const selectedPrograms = await generatePropertiesList()
    selectedPrograms.forEach((item: any, index: number) => {
        
    })
}

function fillUserPrograms() {
    user_programs.value.forEach((item: any) => {
        user_data.value.programs.forEach((userR: any) => {
            if (userR.uuid == item.other.uuid) {
                item.selected = true
            }
        })
    })
}

async function getUserRoles() {
    user_roles.value = await UserService.getAllRoles()
    const temp_array = [] as any
    user_roles.value.forEach((item: any) => {
        temp_array.push(
            {
                name: item.role,
                other: item
            }
        )
    })
    user_roles.value = temp_array
}

async function getUserPrograms() {
    user_programs.value = await ProgramService.getAllPrograms()
    const temp_array = [] as any
    user_programs.value.forEach((item: any) => {
        temp_array.push(
            {
                name: item.name,
                other: item,
                selected: false,
            }
        )
    })
    user_programs.value = temp_array
}

async function setSelectedUserPrograms() {

}


const note_properties = [
    {
        placeHolder: 'username',
        dataHandler: usernameupdated,
        dataValue: ref() as any,
        show_error: ref(false),
        error_message: 'please provide a reason'
    },
    {
        placeHolder: 'firstname',
        dataHandler: ()=>{},
        dattrueaValue: ref() as any,
        show_error: ref(false),
        error_message: 'please provide a reason'
    },
    {
        placeHolder: 'lastname',
        dataHandler: ()=>{},
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'please provide a reason'
    },
]

function usernameupdated(event: any) {
    const input = event.target.value
    user_name.value = input
}

const dynamic_button_properties = [
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "save",
        btnFill: 'clear',
        fn: ()=>{},
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "cancel",
        btnFill: 'clear',
        fn: ()=>{},
    }
]

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: 'qwerty_8_0' as any,
        name_of_list: 'Roles' as any,
        placeHolder: 'Search for a field' as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a User',
        disabled: ref(false) as any,
    },
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: 'qwerty_8_2' as any,
        name_of_list: 'Programs' as any,
        placeHolder: 'Search for programs' as any,
        items: [],
        listUpdatedFN: listUpdated2,
        listFilteredFN: ()=>{},
        searchTextFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a Program',
        disabled: ref(false) as any,
    }
]

function listUpdated1(data: any) {
    user_roles.value = data
    checkIfSelectedIsHSA(user_roles.value)
}

function listUpdated2(data: any) {
    user_programs.value = data
    const j = []
    user_programs.value.forEach((item: any) => {
        if (item.selected == true) {
            j.push(1)
        }
    })
    if (j.length > 0) {
        show_user_programs.value = true
    } if (j.length == 0) {
        show_user_programs.value = false
    }
}

function userFirstname(items: any) {
    let _str_: string = '';
    const lastIndex = items.length - 1;
    if (lastIndex >= 0) {
        _str_ = items[lastIndex].given_name;
    }
    return _str_;
}


function userLastname(items: any) {
    let _str_: string = '';
    const lastIndex = items.length - 1;
    if (lastIndex >= 0) {
        _str_ = items[lastIndex].family_name;
    }
    return _str_;
}

const emit = defineEmits<{
    (e: "save", boolean_value: boolean): void
}>()

function saveEvent(boolean_value: any) {
    emit("save", boolean_value)
}

function selectedDistrict(selectedDistrict: any) {
    selectedDistrictIds.length = 0
    selectedDistrict.forEach((district: any) => {
        selectedDistrictIds.push(district.district_id)
    })

    selectedDistrict.forEach((district: any ) => {
        fetchTraditionalAuthorities(district.district_id, '')
    })
}

async function fetchTraditionalAuthorities(district_id: any,name: string) {  
    TAList.value = []           
    var districtVillages = await LocationService.getTraditionalAuthorities(district_id,"")
    const arrayWithIds = districtVillages.map((item: any, index: any) => ({
        ...item,
        assigned_id: index
    }));
    TAList.value = TAList.value.concat(arrayWithIds)
    // if (villageList.value.length > 0) {
    //     disableVillageSelection.value = false
    // }
}

async function getdistrictList() {
    const districtList = [];
    for (let i of [1, 2, 3]) {
        const districts: any = await LocationService.getDistricts(i);
        districtList.push(...districts);
    }

    //__________________________not ideal

    districtList.forEach((district: any) => {
        selectedDistrictIds.push(district.district_id)
    })

    districtList.forEach((district: any ) => {
        fetchTraditionalAuthorities(district.district_id, '')
    })
    //__________________________

    return districtList
}

function findVillages(district_id: any) {
    disableVillageSelection.value = true;
    selected_villages.value = []
    
    fetchVillages(district_id, '')
}

async function fetchVillages(district_id: any,name: string) {   
    villageList.value = []         
    var districtVillages = await LocationService.getVillages(district_id,"")
    const arrayWithIds = districtVillages.map((item: any, index: any) => ({
        ...item,
        assigned_id: index
    }));
    villageList.value = villageList.value.concat(arrayWithIds)
    if (villageList.value.length > 0) {
        disableVillageSelection.value = false
    }
}

function selectedTA(selectedTAList: any) {
    selectedTAIds.length = 0
    selectedTAList.forEach((village: any ) => {
        selectedTAIds.push(village.traditional_authority_id)
    })
   
    selectedTAList.forEach((TA: any ) => {
            findVillages(TA.district_id)
        }
    ) 
}

function selectedVillage(VillagesList: any) {
    selectedVillageIds.length = 0
    VillagesList.forEach((village: any ) => {
        selectedVillageIds.push(village.village_id)
    })
}

function checkIfSelectedIsHSA(role_list: any) {
    village_show_error.value = false
    let is_found = false
    role_list.forEach((item: any) => {
        if (item?.selected == true && item?.name == 'HSA') {
            HSA_found_for_disabling_button.value = false
            is_found = true
        }
    })

    if (is_found == false) {
        village_show_error.value = false
        HSA_found_for_disabling_button.value = true
    }
    return is_found
}

</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.three-column-layout {
  display: flex;
  justify-content: space-between
}

.column {
  flex: 1;
  margin: 0 10px;
}

.details, .values, .actions {
  padding: 10px;
}

.actions button {
  margin-top: 10px;
}

.detail-prop-c1 {
    font-size: 20px;
    font-weight: 800;
    color: rgb(139, 129, 129);
}

.detail-prop-c2 {
    font-size: 20px;
    font-weight: 800;
    color: rgb(71, 68, 68);
}

.btn-prop-c1 {
    font-size: 20px;
    font-weight: 800;
    color: rgb(71, 68, 68);
}

.toggle-green {
    --toggle-bg-on: #006401;
    --toggle-border-on: #006401;
    --toggle-width: 5.3rem;
    --toggle-height: 1.9rem;
    --toggle-border: 0.525rem;
    --toggle-font-size: 1rem;
}
.toggle-container:focus {
    outline: none !important;
}
.previousLabel {
    font-weight: 600;
    color: #000;
}
.ListPicker.error-label {
    background: #006401;
    color: #006401;
    text-transform: none;
    padding: 6%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
.error-label {
    background: #fecdca;
    color: #b42318;
    text-transform: none;
    padding: 3%;
    border-radius: 10px;
    margin-top: 7px;
    display: flex;
    text-align: center;
}
</style>
