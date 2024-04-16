<template>
     <IonCard>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[1].placeHolder"
                    :icon="personOutline"
                    :inputValue="first_name"
                    @update:inputValue="note_properties[1].dataHandler"
                />
            </ion-col>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[2].placeHolder"
                    :icon="peopleOutline"
                    :inputValue="last_name"
                    @update:inputValue="note_properties[2].dataHandler"
                />
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="personCircleOutline"
                    :inputValue="user_name"
                    @update:inputValue="note_properties[0].dataHandler"
                />
            </ion-col>
            <ion-col></ion-col>
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

        <ion-row>
            <ion-col>
                <Toggle
                    class="toggle-green "
                    :classes="{
                        container: 'inline-block rounded-full outline-none focus:ring focus:ring-green-500 focus:ring-opacity-30',
                    }" 
                    v-model="toggle_local"
                    :offLabel="'inactive'"
                    :onLabel="'active'"
                />
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
            </ion-col>
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
            <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Change Password</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <ion-row>
                        <ion-col>
                            <BasicInputField
                                :placeholder="note_properties[0].placeHolder"
                                :icon="keyOutline"
                                :inputValue="note_properties[0].dataValue.value"
                                @update:inputValue="note_properties[0].dataHandler"
                            />
                        </ion-col>
                        <ion-col>
                            <BasicInputField
                                :placeholder="note_properties[0].placeHolder"
                                :icon="keyOutline"
                                :inputValue="note_properties[0].dataValue.value"
                                @update:inputValue="note_properties[0].dataHandler"
                            />
                        </ion-col>
                    </ion-row>
                </div>
            </ion-accordion>
        </ion-accordion-group>
     </IonCard>
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
import { ref, onMounted, watch } from "vue"
import { icons } from "@/utils/svg"
import DynamicButton from "@/components/DynamicButton.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import { UserService } from "@/services/user_service"
import { ProgramService } from "@/services/program_service"
import { Service } from "@/services/service"

const toggle_local = ref(true)
const user_roles = ref([] as any)
const user_programs = ref([] as any)
const user_data = ref()
const user_name = ref()
const first_name = ref()
const last_name = ref()
const userId = ref() as any
const show_user_programs = ref(false)
const actionN = ref('')

const props = defineProps<{
    toggle: true,
    user_id: any,
    action: any
}>()

onMounted(async () => {
    await getUserRoles()
    await getUserPrograms()
    await getUserData() 
})

watch(
    () => props.action,
    async (newValue) => {
        trigerSaveFn()
    }
)

function trigerSaveFn() {
    actionN.value = props.action
    preSavePrograms()
    preSaveRoles()
}

// const emit = defineEmits<{
//     (e: "closePopoover", ObjectsArray: any): void
// }>()

async function getUserData() {
    userId.value = props.user_id
    user_data.value = await UserService.getUserByID(props.user_id)
    user_name.value = user_data.value.username
    first_name.value =  userFirstname(user_data.value.person.names)
    last_name.value = userLastname(user_data.value.person.names)
    fillUserRoles()
    fillUserPrograms()
    getAPICounterPart() 
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

async function saveRoles(roleNames: any) {
    UserService.updateUser(userId.value, {
        must_append_roles: true,
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

    console.log(selectedProgramIds)
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
    console.log(selectedPrograms)
    selectedPrograms.forEach((item: any, index: number) => {
        // if
        console.log("<><.....")
        console.log(item)
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
        dataHandler: ()=>{},
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'please provide a reason'
    },
    {
        placeHolder: 'firstname',
        dataHandler: ()=>{},
        dataValue: ref(),
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
</style>
