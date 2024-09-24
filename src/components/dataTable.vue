<template>
      <ion-row>
        <ion-col>
          <dynamic-button
            class="btn-cls-2"
              v-if="dynamic_button_properties[2].addItemButton"
                  :name="dynamic_button_properties[2].name"
                  :fill="dynamic_button_properties[2].btnFill"
                  :icon="personAddOutline"
                  @clicked:btn="OpenAddUserModal"
                  :color="'secondary'"
            />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ListPicker
              style="margin-left: 30px"
              :multiSelection="list_picker_prperties[0].multi_Selection"
              :show_label="list_picker_prperties[0].show_list_label"
              :uniqueId="list_picker_prperties[0].unqueId"
              :name_of_list="list_picker_prperties[0].name_of_list"
              :choose_place_holder="list_picker_prperties[0].placeHolder"
              :items_-list="searchFieldS"
              :use_internal_filter="list_picker_prperties[0].use_internal_filter"
              :disabled="list_picker_prperties[0].disabled.value"
              @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
              @item-list-filtered="list_picker_prperties[0].listFilteredFN"
              @item-search-text="list_picker_prperties[0].searchTextFN"
          />
        </ion-col>
        
        <ion-col>
            <ion-row>
              <ion-col size="10">
                <BasicInputField
                  :placeholder="note_properties[0].placeHolder"
                  :icon="searchOutline"
                  :inputValue="note_properties[0].dataValue.value"
                  @update:inputValue="note_properties[0].dataHandler"
                  :minHeight="40"
                />
              </ion-col>
            </ion-row>
        </ion-col>
      </ion-row>

      <ion-row>
        <user-card-list :users="items" style="margin-left: 20px;"/>
      </ion-row>

      <addUserModal
            :is_open="isPopooverOpen"
            :user_id="user_id"
            @close-popoover="isPopooverOpen = false"
        />

</template>
<script setup lang="ts">
  import { IonRow, IonPage, IonContent, IonCard, IonCol, IonButton, IonLabel } from "@ionic/vue"
  import { ref, watch, computed, onMounted, onUpdated } from "vue"
  import BasicInputField from "@/components/BasicInputField.vue"
  import ListPicker from "./ListPicker.vue"
  import UserCardList from './userCardList.vue';
  import DynamicButton from "@/components/DynamicButton.vue"
  import addUserModal from "../views/UserManagement/addUserModal.vue"
  import { useRoute } from 'vue-router';
  import {
    addOutline,
    pencilOutline,
    searchOutline,
    returnUpBackOutline,
    returnUpForwardOutline,
    personAddOutline
    
} from "ionicons/icons"

  const searchField = ref("username")
  const searchValue = ref("")

  const searchFieldS = ref([]) as any
  const isPopooverOpen = ref(false)
  const user_id = ref('')


  const props = defineProps<{
    colums: any,
    items: any,
    search_fields: [{}],
  }>()

watch(() => props.search_fields,
    async (newValue) => {
      // searchFieldS.value = newValue 
    }
)

const note_properties = [
    {
        placeHolder: 'search for user (based on search field)',
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'please provide a reason'
    },
]

function OpenAddUserModal() {
    isPopooverOpen.value = true
    user_id.value = ''
}

const dynamic_button_properties = [
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "prev page",
        btnFill: 'clear',
        fn: ()=>{},
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "next page",
        btnFill: 'clear',
        fn: ()=>{},
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "Add User",
        btnFill: 'fill',
        fn: ()=>{},
    },
    
  ]

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: 'qwerty_3' as any,
        name_of_list: 'search for' as any,
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

function notesUpDated_fn1(event: any) {
    const reason = event.target.value
    searchValue.value = reason
}

function listUpdated1(data: any) {
  searchFieldS.value = data
  searchFieldS.value.forEach((item: any) => {
    if (item.selected == true) {
      searchField.value = item.value
    }
  })
}

const emit = defineEmits<{
    (e: "clickRow", ObjectsArray: any): void
}>()

function clickRow(data: any) {
    emit("clickRow", data)
}
</script>
<style scoped>

.btn-cls {
  font-size: 30px;
  font-weight: 400;
  color: #c0c7d2 !important;
}

.btn-cls-2 {
  font-size: 30px;
  font-weight: 400;
  color: #1d1d16 !important;
}

</style>