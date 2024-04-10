<template>
    <ListPicker
        :multiSelection="list_picker_prperties[0].multi_Selection"
        :show_label="list_picker_prperties[0].show_list_label"
        :uniqueId="list_picker_prperties[0].unqueId"
        :name_of_list="list_picker_prperties[0].name_of_list"
        :choose_place_holder="list_picker_prperties[0].placeHolder"
        :items_-list="user_data"
        :use_internal_filter="list_picker_prperties[0].use_internal_filter"
        :disabled="list_picker_prperties[0].disabled.value"
        @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
        @item-list-filtered="list_picker_prperties[0].listFilteredFN"
        @item-search-text="list_picker_prperties[0].searchTextFN"
    />

</template>
<script lang="ts">
import { defineComponent } from "vue";
import { text } from "ionicons/icons";
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

const user_data = ref()

onMounted(async () => {
    getUsers()
})

async function getUsers() {
    user_data.value = await UserService.getAllUsers()
    const temp_array = [] as any
    user_data.value.forEach((item: any) => {
        console.log(item)
        temp_array.push(
            {
                name: item.username,
                label: item.username,
                value: item.user_id,
                other: item
            }
        )
    })
    user_data.value = temp_array
}

const list_picker_prperties = [
    {
        multi_Selection: false as any,
        show_list_label: true as any,
        unqueId: 'qwerty_3' as any,
        name_of_list: 'Choose User' as any,
        placeHolder: 'Choose one' as any,
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

function listUpdated1(data: any) {
    user_data.value = data
}

</script>

<style scoped>
</style>