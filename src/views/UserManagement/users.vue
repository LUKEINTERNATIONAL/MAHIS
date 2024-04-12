<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <div id="" style="margin-top: 30px;">

                <div class="back_profile" @click="nav('patientProfile')">
                    <ion-icon style="font-size: 20px" :icon="chevronBackOutline"> </ion-icon>
                    <span style="cursor: pointer"> Back to profile</span>
                </div>

                <dataTable
                    :colums="data_table_properties[0].columns"
                    :items="_items_"
                    :search_fields="_search_fields_"
                    @click-row="clickRow"
                />
                <editUserModal
                    :is_open="isPopooverOpen"
                    :user_id="user_id"
                    @close-popoover="isPopooverOpen = false"
                />
                    </div>
                </ion-content>
    </ion-page>
</template>
<!-- @click="nav(' -->
<script lang="ts">
import { defineComponent } from "vue"
import { text } from "ionicons/icons"
import { it } from "date-fns/locale"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    IonRow,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import Toolbar from '@/components/Toolbar.vue'
import ToolbarSearch from '@/components/ToolbarSearch.vue'
import BasicInputField from "@/components/BasicInputField.vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { UserService } from "@/services/user_service"
import ListPicker from "@/components/ListPicker.vue"
import dataTable from "@/components/dataTable.vue"
import type { Header, Item } from "vue3-easy-data-table"
import editUserModal from "./editUserModal.vue"
import { chevronBackOutline, checkmark } from "ionicons/icons"
import router from '@/router'

const isPopooverOpen = ref(false)
const user_data = ref()
const _search_fields_ = ref([
    {
        value: 'username',
        name: 'username',
    }
]) as any
const user_id = ref('')

onMounted(async () => {
    getUsers()
})

async function getUsers() {
    user_data.value = await UserService.getAllUsers()
    const temp_array = [] as any
    user_data.value.forEach((item: any) => {
        temp_array.push(
            {
                username: item.username,
                label: item.username,
                value: item.user_id,
                other: item
            }
        )
    })

    const temp_aR: Item[] | {}[] = []

    user_data.value.forEach((item: any, index: number) => {
        temp_aR.push(
            {
                userId: item.user_id,
                username: item.username,
                role: userRolesStr(item.roles),
                programs: userProgramsStr(item.programs),
                gender: item.person.gender,
                status: item.deactivated_on,
                firstname: userFirstname(item.person.names),
                lastname: userLastname(item.person.names),

            }
        )
    })

    _items_.value = temp_aR

    console.log(_items_.value)

    user_data.value = temp_array
}

const _items_  = ref<Item[]>([] as any)

function userRolesStr(items: any) {
    let _str_: string = ''
    items.forEach((item: any, index: number) => {
        if (_str_.length > 0) {
            _str_+=', '+item.role
        }
        else if (_str_.length == 0) {
            _str_+=item.role
        }
    })
    return _str_
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


function userProgramsStr(items: any) {
    let _str_: string = ''
    items.forEach((item: any, index: number) => {
        if (_str_.length > 0) {
            _str_+=', '+item.name
        }
        else if (_str_.length == 0) {
            _str_+=item.name
        }
    })
    return _str_
}

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty_3' as any,
        name_of_list: 'Choose User' as any,
        placeHolder: 'Search for a User' as any,
        items: user_data.value,
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a User',
        disabled: ref(false) as any,
    }
]

const _columns_ = ref<Header[]>([
    {
        text: 'userId',
        value: 'userId',
        sortable: true
    },
    {
        text: 'Username',
        value: 'username',
        sortable: true
    },
    {
        text: 'First name',
        value: 'firstname',
        sortable: true
    },
    {
        text: 'Last name',
        value: 'lastname',
        sortable: true
    },
    {
        text: 'Gender',
        value: 'gender',
        sortable: true
    },
    {
        text: 'Role',
        value: 'role',
        sortable: true
    },
    {
        text: 'Programs',
        value: 'programs',
        sortable: true
    },

] as any)





const data_table_properties = [
    {
        columns: _columns_.value as any,
        items: _items_.value as any,
        search_fields: _search_fields_
    }
]

function listUpdated1(data: any) {
    user_data.value = data
}

function clickRow(data: any) {
    isPopooverOpen.value = true
    user_id.value = data.userId
}

function nav(url: any) {
    router.push(url)
}
</script>

<style scoped>
.back_profile {
    display: flex;
    justify-content: space-between;
    width: 140px;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    margin: 1%;
}
</style>