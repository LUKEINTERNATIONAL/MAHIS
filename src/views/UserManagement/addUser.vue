<template>
    <ion-row>
        <ion-col size="12" size-md="6">
            <ion-row>
                <ion-col>
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                        >First name<span style="color: #b42318">*</span></ion-label
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
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
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
                        <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
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
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                        >Gender<span style="color: #b42318">*</span></ion-label
                    >
                    <sselectionList
                        :labels="isSSelection_properties[0].labels"
                        :selected-opt="isSSelection_properties[0].selectedOption.value"
                        @selection-event="isSSelection_properties[0].dataHandler"
                    />

                    <div>
                        <ion-label v-if="isSSelection_properties[0].show_error.value" class="error-label">
                            {{ isSSelection_properties[0].error_message }}
                        </ion-label>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <userPhoneInput @validateInput="userPhoneChange"/>
                    <div>
                        <ion-label v-if="phone_input_properties[0].show_error.value" class="error-label">
                            {{ phone_input_properties[0].error_message }}
                        </ion-label>
                    </div>
                </ion-col>
            </ion-row>
        </ion-col>

        <ion-col size="12" size-md="6">
            <ion-row>
                <ion-col v-if="true">
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                        >District(s)<span style="color: #b42318">*</span></ion-label
                    >
                    <VueMultiselect
                        v-model="selected_Districts"
                        @update:model-value="selectedDistrictF($event)"
                        :multiple="false"
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
                        track-by="name"
                        :options="districtList"
                        :disabled="disableFacilitySelection"
                    />

                    <div>
                        <ion-label v-if="district_show_error" class="error-label">
                            {{ district_error_message }}
                        </ion-label>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                        >Facility name<span style="color: #b42318">*</span></ion-label
                    >
                    <VueMultiselect
                        v-model="selected_location"
                        @update:model-value="selectedLocationF($event)"
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
                        :disabled="disableFacilitySelection"
                        @search-change="FindLocation($event)"
                        track-by="code"
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
                <ion-col>
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                        >TA(s)<span style="color: #b42318">*</span></ion-label
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
            </ion-row>

            <ion-row>
                <ion-col>
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
        </ion-col>
    </ion-row>

    <ion-row>
        <ion-col size="12" size-md="6">
            <ion-row>
                <ion-col>
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

                        <div>
                            <ion-label v-if="list_picker_prperties[0].show_error.value" class="error-label" style="margin-top: -10px;">
                                {{ list_picker_prperties[0].error_message }}
                            </ion-label>
                        </div>
                    </ion-col>
                </ion-col>
            </ion-row>

            <ion-row>
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

                    <div>
                        <ion-label v-if="list_picker_prperties[1].show_error.value" class="error-label">
                            {{ list_picker_prperties[1].error_message }}
                        </ion-label>
                    </div>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
                        >Password<span style="color: #b42318">*</span></ion-label
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
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-label style="margin: 10px; margin-left: 0px; margin-top: 0px; margin-bottom: 10px; color: grey"
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
        </ion-col>

        <ion-col size="12" size-md="6">

        </ion-col>
    </ion-row>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { tr } from "date-fns/locale"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
})
</script>
<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonCol, IonLabel, IonRow, IonToolbar, IonMenu, IonAccordionGroup, IonAccordion, AccordionGroupCustomEvent } from "@ionic/vue"
import BasicInputField from "@/components/BasicInputField.vue"
import sselectionList from "@/components/SselectionList.vue"
import { areFieldsValid, getFieldsValuesObj, isPasswordValid, getGenderCode } from "@/utils/GeneralUti"
import _ from "lodash"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import ListPicker from "../../components/ListPicker.vue"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"
import VueMultiselect from "vue-multiselect"
import { LocationService } from "@/services/location_service"
import { isEmpty } from "lodash"
import { useUserStore } from "@/stores/userStore";
import userPhoneInput from "./userPhoneInput.vue"
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
} from "ionicons/icons"
import { UserService } from "@/services/user_service"
import { ProgramService } from "@/services/program_service"
import { PersonService } from "@/services/person_service";

const user_name = ref()
const first_name = ref()
const last_name = ref()
const phone_number = ref()
const user_roles = ref([] as any)
const user_programs = ref([] as any)
const selectedRoleNames: any[] = []
const selectedProgramIds: any[] = []
const selectedVillageIds: any[] = []
const selectedTAIds: any[] = []
const selectedDistrictIds : any[] = []
const passwordErrorMsgs = [
    'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character (@#$%^&+=*!-), without spaces',
    'Password does not match'
]
const selected_location = ref()
const locationData = ref([]) as any
const location_error_message = ref('Select location')
const location_show_error = ref(false)
const village_show_error = ref(false)
const village_error_message = ref('Select village(s)')
const district_show_error = ref(false)
const district_error_message = ref('Select district(s)')
const TAz_show_error = ref(false)
const TAz_error_message = ref('Select TA(s)')
const districtList = ref([] as any)
const OLDDistrictsList = ref([] as any)
const villageList = ref([] as any)
const TAList = ref([] as any)
const selected_villages = ref()
const selected_TAz = ref()
const selected_Districts = ref()
const disableVillageSelection = ref(true)
const HSA_found_for_disabling_button = ref(true)
const userStore = useUserStore()
const facilityLocation = computed(() => userStore.facilityLocation);
const disableFacilitySelection = ref(true)

const props = defineProps<{
    action: any
}>()

onMounted(async () => {
    await getUserRoles()
    await getUserPrograms()
    OLDDistrictsList.value = await getdistrictList()
    districtList.value = await getFacilityDistricts()
    if (districtList.value.length > 0) {
        await getFacilityForCurrentuser()
    }
})

watch(
    () => props.action,
    async (newValue) => {
        await trigerSaveFn()
    }
)

watch(
    () => disableVillageSelection.value,
    async (newValue) => {
        if (disableVillageSelection.value == false) {
            checkIfSelectedIsHSA(user_roles.value)
        }
    }
)

async function updateuserPersoninf(personId: number) {
    const data1 = getFieldsValuesObj(input_properties)
    const updatedData = {
        cell_phone_number: data1.phone_number,
        gender: getGenderCode(isSSelection_properties[0].dataValue.value),
    } as any
    const personService = new PersonService(updatedData);
    const data = await personService.update(personId);
    return data
}

function selectedLocationF(data: any) {
    const selectedLocation = locationData.value.find((location: any) => location.code === data.code);
    const filteredDistricts = selectedLocation
        ? districtList.value.filter((district: any) => district.name === selectedLocation.district)
        : [];
    selected_Districts.value = filteredDistricts
    selected_location.value = data
}

function selectedVillage(VillagesList: any) {
    selectedVillageIds.length = 0
    VillagesList.forEach((village: any ) => {
        selectedVillageIds.push(village.village_id)
    })
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

function selectedDistrictF(selectedDistrict: any) {
    selectedDistrictIds.length = 0
    const filteredDistricts: any[] = [];
    OLDDistrictsList.value.forEach((district: any) => {
        if (selectedDistrict.name.toLowerCase() === district.name.toLowerCase()) {
            filteredDistricts.push(district);
        }
    });

    filteredDistricts.forEach((district: any) => {
        selectedDistrictIds.push(district.district_id)
    })

    filteredDistricts.forEach((district: any ) => {
        fetchTraditionalAuthorities(district.district_id, '')
    })

    getDistrictFacilities(selectedDistrict)
}

async function getDistrictFacilities(district: any) {
    locationData.value = [];

    try {
        const temp_data1 = await LocationService.getDistrictFacilities(district.name.toLowerCase());
        locationData.value.push(...temp_data1.facilities);
    } catch (error) {
        console.error(`Error fetching facilities for district ${district.name}:`, error);
    }
    
    selected_location.value = null;
}


async function getFacilityForCurrentuser() {
    try {
        locationData.value.push(facilityLocation.value)
        selectedLocationF(facilityLocation.value)
    } catch (error) {
        console.error(error)
    }
}

async function getCurrentUserRoles() {
    try {
        const user = await UserService.getCurrentUser();
        if (user) {
            const userRoles = user.roles.map((role) => role.role);
            userStore.setUserRoles(userRoles);

            if (findUserRoleByName('Superuser,Superuser,') == true) {
                disableFacilitySelection.value = false;
            }

            if (findUserRoleByName('Superuser,Superuser,') == false) {
                user_roles.value = findAndRemoveRoleSSU(user_roles.value)
            }
        }
    } catch (error) {
        
    }
}

function findUserRoleByName(name: string) {
    const roles = userStore.getUserRoles();
    return roles.some((role: any) => role.toLowerCase() === name.toLowerCase());
}

function findAndRemoveRoleSSU(data: any[]): any[] {
    const index = data.findIndex((role: any) => 
        typeof role.name === 'string' && role.name.toLowerCase() === 'Superuser,Superuser,'.toLowerCase()
    );
    
    if (index !== -1) {
        data.splice(index, 1);
    }

    return data;
}

async function userPhoneChange(data: any) {
    if (data.is_valid == false) {
        phone_input_properties[0].show_error.value = true
        phone_number.value = data.phone
        phone_input_properties[0].dataValue.value = data.phone
        phone_input_properties[0].is_phone_valid.value = false
    }

    if (data.is_valid == true) {
        phone_input_properties[0].show_error.value = false
        phone_number.value = data.phone
        phone_input_properties[0].dataValue.value = data.phone
        phone_input_properties[0].is_phone_valid.value = true
    }
}

async function FindLocation(text: any) {
    let srch_text
    if (isEmpty(text) == true) {
        srch_text = ''
    } if (isEmpty(text) == false) {
        srch_text = text
    }
}

async function trigerSaveFn() {
    const _isRoleSelected_ = isRoleSelected()
    const _isProgramSelected_ = isProgramSelected()
    const _areFieldsValid_ = areFieldsValid(input_properties)
    const _isSSelectionValid_ = isSSelectionValid()
    const _ValidatePassword_ = ValidatePassword()
    const _validateLocation = validateLocation()
    const _validateDistricts = validateDistricts()
    const _validateTAz = validateTAz()
    const _validateVillages = validateVillages()
    const _validate_user_phone = validateUserPhone()

    if (_areFieldsValid_ == true && _ValidatePassword_ == true && _isSSelectionValid_ == true 
        && _isRoleSelected_ == true && _isProgramSelected_ == true && _validateLocation == true
        && _validateDistricts == true && _validateTAz == true && _validateVillages == true
        && _validate_user_phone == true) {
        const data1 = getFieldsValuesObj(input_properties)
        const payload = {
            family_name: data1.last_name,
            given_name: data1.firstname,
            username: data1.username,
            must_append_roles: false,
            password: password_input_properties[0].dataValue.value,
            programs: selectedProgramIds,
            villages: selectedVillageIds,
            roles: selectedRoleNames,
            gender: getGenderCode(isSSelection_properties[0].dataValue.value),
            location_id: selected_location.value.code,
            phone: phone_input_properties[0].dataValue.value
        }

        try {
            const { user } = await UserService.createUser(payload)
            if (user) {
                await updateuserPersoninf(user.person.person_id)
                saveEvent(user.user_id)
            }
        } catch (error) {
            //console.error(error)
            saveEvent('')
            toastDanger(error as string, 2000)
        }
    }
}

const emit = defineEmits<{
    (e: "saveEvent", ObjectsArray: any): void
}>()

function saveEvent(user_id: any) {
    emit("saveEvent", user_id)
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
    await getCurrentUserRoles()
}

function isRoleSelected() {
    const selectedRoles: any[] = []
    selectedRoleNames.length = 0
    user_roles.value.forEach((role: any) => {
        if (role.selected == true) {
            selectedRoles.push(role)
        }
    })
    selectedRoles.forEach((role: any) => {
        selectedRoleNames.push(role.other.role)
    })
    if (selectedRoleNames.length > 0) {
        list_picker_prperties[0].show_error.value = false
        return true
    }
    if (selectedRoleNames.length == 0) {
        list_picker_prperties[0].show_error.value = true
        return false
    }
}

function isProgramSelected() {
    const selectedPrograms: any[] = []
    selectedProgramIds.length = 0
    user_programs.value.forEach((program: any) => {
        if (program.selected == true) {
            selectedPrograms.push(program)
        }
    })
    selectedPrograms.forEach((program: any) => {
        selectedProgramIds.push(program.other.program_id)
    })

    if (selectedProgramIds.length > 0) {
        list_picker_prperties[1].show_error.value = false
        return true
    }
    if (selectedProgramIds.length == 0) {
        list_picker_prperties[1].show_error.value = true
        return false
    }
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

function isSSelectionValid() {
    let is_valid = false
    if (isSSelection_properties[0].dataValue.value == undefined) {
        isSSelection_properties[0].show_error.value = true
    }
    if (isSSelection_properties[0].dataValue.value != undefined) {
        isSSelection_properties[0].show_error.value = false
        is_valid = true
    }
    return is_valid
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

function validateVillages() {
    if (checkIfSelectedIsHSA(user_roles.value) == false) {
        return true
    }
    if (checkIfSelectedIsHSA(user_roles.value) == true) {
        if (selectedVillageIds.length == 0) {
            village_show_error.value = true
            return false
        }

        if (selectedVillageIds.length > 0) {
            village_show_error.value = false
            return true
        }
    }
}

function validateDistricts() {
    if (checkIfSelectedIsHSA(user_roles.value) == false) {
        return true
    }

    if (checkIfSelectedIsHSA(user_roles.value) == true) {
        if(selectedDistrictIds.length == 0) {
            district_show_error.value = true
            return false
        }

        if (selectedDistrictIds.length > 0) {
            district_show_error.value = false
            return true
        }
    }
}

function validateTAz() {
    if (checkIfSelectedIsHSA(user_roles.value) == false) {
        return true
    }

    if (checkIfSelectedIsHSA(user_roles.value) == true) {
        if(selectedTAIds.length == 0) {
            TAz_show_error.value = true
            return false
        }

        if (selectedTAIds.length > 0) {
            TAz_show_error.value = false
            return true
        }
    }
}

function ValidatePassword() {
    const [password1, password2] = password_input_properties.map(prop => prop.dataValue.value);
    const defaultErrorMsg = passwordErrorMsgs[0];
    const mismatchErrorMsg = passwordErrorMsgs[1];

    password_input_properties.forEach(prop => {
        prop.error_message = defaultErrorMsg;
        prop.show_error.value = false;
    });

    const emptyPasswords = password_input_properties.map((prop, index) => {
        const isEmpty = !prop.dataValue.value;
        prop.show_error.value = isEmpty;
        return isEmpty;
    });

    if (emptyPasswords.some(isEmpty => isEmpty)) {
        return false;
    }

    const validPasswords = password_input_properties.map((prop, index) => {
        const isValid = isPasswordValid(prop.dataValue.value);
        prop.show_error.value = !isValid;
        return isValid;
    });

    if (validPasswords.some(isValid => !isValid)) {
        return false;
    }

    if (password1 !== password2) {
        password_input_properties.forEach(prop => {
            prop.error_message = mismatchErrorMsg;
            prop.show_error.value = true;
        });
        return false;
    }

    return true;
}

const input_properties = [
    {
        placeHolder: 'username',
        property_name: 'username',
        dataHandler: inputUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters allowed',
    },
    {
        placeHolder: 'firstname',
        property_name: 'firstname',
        dataHandler: inputUpDated_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters allowed',
    },
    {
        placeHolder: 'last name',
        property_name: 'last_name',
        dataHandler: inputUpDated_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters allowed',
    },
]

function validateUserPhone() {
    if (phone_input_properties[0].is_phone_valid.value == false) {
        phone_input_properties[0].show_error.value = true
        return false
    }
    if (phone_input_properties[0].is_phone_valid.value == true) {
        phone_input_properties[0].show_error.value = false
        return true
    }
}

const phone_input_properties = [
    {
        placeHolder: 'phone number',
        property_name: 'phone_number',
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, input is invalid',
        is_phone_valid: ref(false)
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

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: 'qwerty_8_3698' as any,
        name_of_list: 'Roles' as any,
        placeHolder: 'Search for a field' as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a Role',
        disabled: ref(false) as any,
    },
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: 'qwerty_8_562' as any,
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

function checkIfSelectedIsHSA(role_list: any) {
    const HSA_ROLES = ['HSA', 'Health Surveillance']
    village_show_error.value = false
    let is_found = false
    role_list.forEach((item: any) => {
        if (item?.selected == true && HSA_ROLES.includes(item?.name)) {
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

function listUpdated2(data: any) {
    user_programs.value = data
    const j = []
    user_programs.value.forEach((item: any) => {
        if (item.selected == true) {
            j.push(1)
        }
    })
}

const isSSelection_properties = [
    {
        labels: ['Male','Female',],
        selectedOption: ref(null),
        dataHandler: sselectionListUpdated,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Please make a selection',
    }
]

function sselectionListUpdated(data: any) {
    try {
        isSSelection_properties[0].dataValue.value = data.label 
    } catch (error) {
        isSSelection_properties[0].dataValue.value = undefined 
    }
    isSSelectionValid()
}

async function validateUsernameIfExists(username: string) {
    try {
        if (username.length > 0) {
            const does_username_exist = await UserService.doesUsernameExist(username);
            if (does_username_exist.exists == true) {
                input_properties[0].show_error.value = true;
                input_properties[0].error_message = "Username already exists";
            } else if (does_username_exist.exists == false) {
                input_properties[0].show_error.value = false;
                input_properties[0].error_message = "Input required, Only letters allowed";
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function inputUpDated_fn1(event: any) {
    const input = event.target.value
    input_properties[0].dataValue.value = input
    await validateUsernameIfExists(input)
}
function inputUpDated_fn2(event: any) {
    const input = event.target.value
    input_properties[1].dataValue.value = input
}
function inputUpDated_fn3(event: any) {
    const input = event.target.value
    input_properties[2].dataValue.value = input
}

function passwordInputUpDated_fn1(event: any) {
    const input = event.target.value
    password_input_properties[0].dataValue.value = input
}
function passwordInputUpDated_fn2(event: any) {
    const input = event.target.value
    password_input_properties[1].dataValue.value = input
}

async function getdistrictList() {
    const districtList = [];
    for (let i of [1, 2, 3]) {
        const districts: any = await LocationService.getDistricts(i);
        districtList.push(...districts);
    }

    districtList.forEach((district: any) => {
        selectedDistrictIds.push(district.district_id)
    })

    districtList.forEach((district: any ) => {
        fetchTraditionalAuthorities(district.district_id, '')
    })

    return districtList
}

async function getFacilityDistricts() {
    const data = await LocationService.getFacilityDistricts()
    return data.districts
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

function findVillages(district_id: any) {
    disableVillageSelection.value = true;
    selected_villages.value = []
    
    fetchVillages(district_id, '')
}

</script>
<style scoped>
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