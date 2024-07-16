<template>
    <ion-row>
        <ion-col>
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
            <ion-col></ion-col>
    </ion-row>

    <ion-row>
        <ion-col size="6">
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

    <ion-row>

        <ion-col>
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
                <ion-label v-if="list_picker_prperties[0].show_error.value" class="error-label">
                    {{ list_picker_prperties[0].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col></ion-col>
    </ion-row>


    <ion-row>
        <ion-col>
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
            <sselectionList
                :labels="isSSelection_properties[0].labels"
                @selection-event="isSSelection_properties[0].dataHandler"
            />

            <div>
                <ion-label v-if="isSSelection_properties[0].show_error.value" class="error-label">
                    {{ isSSelection_properties[0].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col></ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
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
import { IonContent, IonHeader, IonItem, IonCol, IonToolbar, IonMenu, IonAccordionGroup, IonAccordion, AccordionGroupCustomEvent } from "@ionic/vue"
import BasicInputField from "@/components/BasicInputField.vue"
import sselectionList from "@/components/SselectionList.vue"
import { areFieldsValid, getFieldsValuesObj, isPasswordValid } from "@/utils/GeneralUti"
import _ from "lodash"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import ListPicker from "../../components/ListPicker.vue"
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts"
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
    peopleOutline
} from "ionicons/icons"
import { UserService } from "@/services/user_service"
import { ProgramService } from "@/services/program_service"

const user_name = ref()
const first_name = ref()
const last_name = ref()
const user_roles = ref([] as any)
const user_programs = ref([] as any)
const selectedRoleNames: any[] = []
const selectedProgramIds: any[] = []
const selectedVillageIds: any[] = []
const selectedTAIds: any[] = []
const selectedDistrictIds : any[] = []
const passwordErrorMsgs = [
    'Input must be at least 4 characters long, containing only letters, numbers, and symbols',
    'Password does not match'
]
const selected_location = ref()
const locationData = ref([]) as any
const locationId = ref()
const location_error_message = ref('Select location')
const location_show_error = ref(false)
const village_show_error = ref(false)
const village_error_message = ref('Select village(s)')
const district_show_error = ref(false)
const district_error_message = ref('Select district(s)')
const TAz_show_error = ref(false)
const TAz_error_message = ref('Select TA(s)')
const districtList = ref([] as any)
const villageList = ref([] as any)
const TAList = ref([] as any)
const selected_villages = ref()
const selected_TAz = ref()
const selected_Districts = ref()
const disableVillageSelection = ref(true)
const HSA_found_for_disabling_button = ref(true)

const props = defineProps<{
    action: any
}>()

onMounted(async () => {
    await getUserRoles()
    await getUserPrograms()
    districtList.value = await getdistrictList()
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

function selectedLocation(data: any) {
    locationId.value = data.location_id
}

function selectedVillage(VillagesList: any) {
    selectedVillageIds.length = 0
    VillagesList.forEach((village: any ) => {
        selectedVillageIds.push(village.village_id)
    })
}

function selectedTA(selectedTAList: any) {
    console.log(selectedTAList)
    selectedTAIds.length = 0
    selectedTAList.forEach((village: any ) => {
        selectedTAIds.push(village.traditional_authority_id)
    })
   
    selectedTAList.forEach((TA: any ) => {
            findVillages(TA.district_id)
        }
    )
    
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

async function FindLocation(text: any) {
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

    if (_areFieldsValid_ == true && _ValidatePassword_ == true && _isSSelectionValid_ == true 
        && _isRoleSelected_ == true && _isProgramSelected_ == true && _validateLocation == true
        && _validateDistricts == true && _validateTAz == true && _validateVillages == true) {
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
            gender: isSSelection_properties[0].dataValue.value,
            location_id: selected_location.value.location_id
        }

        try {
            const { user } = await UserService.createUser(payload)
            if (user) {
                // console.log(user.user_id)
                // console.log(user)
                saveEvent(user.user_id)
            }
        } catch (error) {
            //console.error(error)
            toastDanger("User already exists", 8000)
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
        placeHolder: 'confirm password',
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
        dataHandler: sselectionListUpdated,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Please make a selection',
    }
]

function sselectionListUpdated(data: any) {
    isSSelection_properties[0].dataValue.value = data.label 
}

function inputUpDated_fn1(event: any) {
    const input = event.target.value
    input_properties[0].dataValue.value = input
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

    return districtList
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