<template>
    <ion-grid>
        <ion-row>

            <ion-col size="3">
                <ion-label class="ion-cls-lbl">
                    {{ main_program }}
                </ion-label>
            </ion-col>

            <ion-col>
                <ListPicker
                    :multiSelection="list_picker_prperties[0].multi_Selection"
                    :show_label="list_picker_prperties[0].show_list_label"
                    :uniqueId="list_picker_prperties[0].unqueId"
                    :name_of_list="list_picker_prperties[0].name_of_list"
                    :choose_place_holder="list_picker_prperties[0].placeHolder"
                    :items_-list="activities"
                    :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                    :disabled="list_picker_prperties[0].disabled.value"
                    @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
                    @item-list-filtered="list_picker_prperties[0].listFilteredFN"
                    @item-search-text="list_picker_prperties[0].searchTextFN"
                />
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
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
    IonLabel,
    IonRow,
    IonGrid
} from "@ionic/vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import ListPicker from "../../components/ListPicker.vue"

const main_program = ref('Manin Framework')
const activities = ref([] as any)

const props = defineProps<{
    user_property: string,
}>()

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: false as any,
        unqueId: 'qwerty_8_78' as any,
        name_of_list: 'Roles' as any,
        placeHolder: 'Search for an activity' as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'select an actvity',
        disabled: ref(false) as any,
    },
]

function listUpdated1(data: any) {
    activities.value = data
}
</script>
<style scoped>
.ion-cls-lbl {
    font-size: 17px;
    font-weight: 600;
}
</style>