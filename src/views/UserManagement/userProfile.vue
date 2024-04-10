<template>
    <dataTable
        :colums="data_table_properties[0].columns"
        :items="_items_"
        :search_fields="_search_fields_"
    />


    

</template>
<script lang="ts">
import { defineComponent } from "vue";
import { text } from "ionicons/icons";
import { it } from "date-fns/locale";
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

const user_data = ref()
const _search_fields_ = ref([
    {
        value: 'username',
        name: 'username',
    }
])

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

    const temp_aR: Item[] | {
        /* __placeholder__ */
        username:
        /* __placeholder__ */
        any;
        /* __placeholder__ */
        role:
        /* __placeholder__ */
        any;
    }[] = []

    user_data.value.forEach((item: any, index: number) => {

        // if (index < 8)
        temp_aR.push(
            {
                username: item.username,
                role: item.user_id
            }
        )
    })

    _items_.value = temp_aR

    console.log(_items_.value)

    user_data.value = temp_array
}

const _items_  = ref<Item[]>([] as any)

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
        text: 'Full Name',
        value: 'username',
        sortable: true
    },
    {
        text: 'Role',
        value: 'role',
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

</script>

<style scoped>
</style>