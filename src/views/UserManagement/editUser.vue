<template>
     <IonCard>
        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="personCircleOutline"
                    :inputValue="note_properties[0].dataValue.value"
                    @update:inputValue="note_properties[0].dataHandler"
                />
            </ion-col>
            <ion-col></ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="personOutline"
                    :inputValue="note_properties[0].dataValue.value"
                    @update:inputValue="note_properties[0].dataHandler"
                />
            </ion-col>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="peopleOutline"
                    :inputValue="note_properties[0].dataValue.value"
                    @update:inputValue="note_properties[0].dataHandler"
                />
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="transgenderOutline"
                    :inputValue="note_properties[0].dataValue.value"
                    @update:inputValue="note_properties[0].dataHandler"
                />
            </ion-col>
            <ion-col></ion-col>
        </ion-row>

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

        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Password</ion-label>
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
import { ref, onMounted } from "vue"
import { icons } from "@/utils/svg"
import DynamicButton from "@/components/DynamicButton.vue"
import BasicInputField from "@/components/BasicInputField.vue"
import { UserService } from "@/services/user_service"

const toggle_local = ref(true)
const user_roles = ref([] as any)
const user_data = ref()

const props = defineProps<{
    toggle: true,
}>()

onMounted(async () => {
    getUsers()
})

// const emit = defineEmits<{
//     (e: "closePopoover", ObjectsArray: any): void
// }>()

async function getUsers() {
    user_data.value = await UserService.getAllRoles()
    const temp_array = [] as any
    user_data.value.forEach((item: any) => {
        temp_array.push(
            {
                name: item.role,
                other: item
            }
        )
    })
    user_roles.value = temp_array
}

const note_properties = [
    {
        placeHolder: 'Reason',
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
        name_of_list: 'search field' as any,
        placeHolder: 'Search for a field' as any,
        items: [],
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
    user_roles.value = data
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
    --toggle-width: 9rem;
    --toggle-height: 2.3rem;
    --toggle-border: 0.525rem;
    --toggle-font-size: 1.75rem;
}
.toggle-container:focus {
    outline: none !important;
}
.previousLabel {
    font-weight: 600;
    color: #000;
}
</style>
